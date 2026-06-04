import {
	IAuthenticateGeneric,
	ICredentialDataDecryptedObject,
	ICredentialTestRequest,
	ICredentialType,
	IHttpRequestHelper,
	INodeProperties,
	Icon,
} from 'n8n-workflow';
import { assertApiBaseUrl } from '../nodes/ConnectSecure/urlUtils';

function buildClientAuthToken(tenant: string, clientId: string, clientSecret: string): string {
	// Swagger: base64(tenant+client_id:client_secret) — literal plus between tenant and client ID.
	const raw = `${tenant}+${clientId}:${clientSecret}`;
	return Buffer.from(raw, 'utf8').toString('base64');
}

function parseAuthorizeResponse(response: unknown): { accessToken: string; userId: string } {
	const body = response as {
		status?: boolean;
		message?: string;
		data?: { access_token?: string; user_id?: string };
	};

	if (body.status === false) {
		throw new Error(body.message ?? 'Connect Secure authorization failed');
	}

	const accessToken = body.data?.access_token;
	const userId = body.data?.user_id;

	if (!accessToken || !userId) {
		throw new Error('Connect Secure authorization did not return access_token and user_id');
	}

	return { accessToken, userId };
}

function getAuthorizeErrorMessage(error: unknown): string {
	const err = error as {
		statusCode?: number;
		status?: number;
		message?: string;
		response?: { statusCode?: number; body?: unknown; data?: unknown };
	};

	const statusCode = err.statusCode ?? err.status ?? err.response?.statusCode ?? 0;

	if (statusCode === 403 || statusCode === 401) {
		return (
			'Connect Secure rejected the credentials (HTTP ' +
			statusCode +
			'). Verify tenant name, client ID, and client secret from Settings → Users → ⋮ → API Key.'
		);
	}

	if (err.message) {
		return err.message;
	}

	return 'Connect Secure authorization failed';
}

export class ConnectSecureApi implements ICredentialType {
	name = 'connectSecureApi';
	displayName = 'Connect Secure API';
	documentationUrl = 'https://github.com/redanthrax/connectsecure-node';
	icon = 'file:../nodes/ConnectSecure/connectsecure.svg' as Icon;
	properties: INodeProperties[] = [
		{
			displayName: 'Base API URL',
			name: 'baseUrl',
			type: 'string',
			default: '',
			placeholder: 'https://pod106.myconnectsecure.com',
			required: true,
			description:
				'Pod API URL from Connect Secure → Profile → API Documentation (e.g. https://pod106.myconnectsecure.com). Do not use the portal login URL (portal.myconnectsecure.com). Include https://',
		},
		{
			displayName: 'Tenant',
			name: 'tenant',
			type: 'string',
			default: '',
			required: true,
			description:
				'Tenant / organization name you use to log in at portal.myconnectsecure.com (e.g. acme). Not the pod URL.',
		},
		{
			displayName: 'Client ID',
			name: 'clientId',
			type: 'string',
			default: '',
			required: true,
			description: 'API client ID from Settings → Users → ⋮ → API Key',
		},
		{
			displayName: 'Client Secret',
			name: 'clientSecret',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			required: true,
			description: 'API client secret from Settings → Users → ⋮ → API Key',
		},
		{
			displayName: 'Access Token',
			name: 'accessToken',
			type: 'hidden',
			typeOptions: {
				expirable: true,
				password: true,
			},
			default: '',
		},
		{
			displayName: 'User ID',
			name: 'userId',
			type: 'hidden',
			default: '',
		},
	];

	async preAuthentication(
		this: IHttpRequestHelper,
		credentials: ICredentialDataDecryptedObject,
	): Promise<{ accessToken: string; userId: string }> {
		const baseUrl = assertApiBaseUrl(credentials.baseUrl as string);
		const tenant = (credentials.tenant as string).trim();
		const clientId = (credentials.clientId as string).trim();
		const clientSecret = (credentials.clientSecret as string).trim();

		try {
			const response = await this.helpers.httpRequest({
				method: 'POST',
				url: `${baseUrl}/w/authorize`,
				headers: {
					'Client-Auth-Token': buildClientAuthToken(tenant, clientId, clientSecret),
				},
				json: true,
			});

			return parseAuthorizeResponse(response);
		} catch (error) {
			throw new Error(getAuthorizeErrorMessage(error));
		}
	}

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials.accessToken}}',
				'X-USER-ID': '={{$credentials.userId}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.baseUrl}}',
			url: '/r/company/companies',
			method: 'GET',
			qs: {
				limit: 1,
			},
		},
	};
}
