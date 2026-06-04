import {
	GenericValue,
	IDataObject,
	IExecuteFunctions,
	IHookFunctions,
	IHttpRequestMethods,
	IHttpRequestOptions,
	ILoadOptionsFunctions,
	IWebhookFunctions,
	JsonObject,
	NodeApiError,
} from 'n8n-workflow';
import { extractResourceList } from './resourceList';
import { assertApiBaseUrl, getApiBaseUrlHint, normalizeBaseUrl } from './urlUtils';

type ConnectSecureRequestContext =
	| IHookFunctions
	| IExecuteFunctions
	| ILoadOptionsFunctions
	| IWebhookFunctions;

function getHttpStatusCode(error: unknown): number {
	const err = error as {
		status?: number;
		statusCode?: number;
		httpCode?: string;
	};
	return err?.status || err?.statusCode || parseInt(err?.httpCode as string, 10) || 0;
}

function getUnderlyingErrorCode(error: unknown): string | undefined {
	const err = error as { code?: string; cause?: { code?: string } };
	return err?.code ?? err?.cause?.code;
}

function wrapRequestError(
	ctx: ConnectSecureRequestContext,
	error: unknown,
	baseUrl: string,
): NodeApiError {
	const hint = getApiBaseUrlHint(baseUrl);
	const code = getUnderlyingErrorCode(error);

	if (code === 'ENOTFOUND' || code === 'EAI_AGAIN') {
		const hostname = (() => {
			try {
				return new URL(normalizeBaseUrl(baseUrl)).hostname;
			} catch {
				return baseUrl;
			}
		})();

		return new NodeApiError(ctx.getNode(), error as JsonObject, {
			message:
				hint ??
				`Could not resolve API host "${hostname}". Use the pod URL from Connect Secure API Documentation (e.g. https://pod106.myconnectsecure.com), not the portal login URL.`,
		});
	}

	return new NodeApiError(ctx.getNode(), error as JsonObject);
}

export async function apiRequest(
	this: ConnectSecureRequestContext,
	method: IHttpRequestMethods,
	endpoint: string,
	body: IDataObject | GenericValue | GenericValue[] = {},
	qs: IDataObject = {},
): Promise<any> {
	const creds = await this.getCredentials('connectSecureApi');
	let baseUrl: string;

	try {
		baseUrl = assertApiBaseUrl(creds.baseUrl as string);
	} catch (error) {
		throw new NodeApiError(this.getNode(), error as JsonObject, {
			message: error instanceof Error ? error.message : 'Invalid Base API URL',
		});
	}

	const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;

	const options: IHttpRequestOptions = {
		method,
		body,
		qs,
		url: `${baseUrl}${normalizedEndpoint}`,
		headers: {
			'Content-Type': 'application/json',
		},
		json: true,
	};

	try {
		return await this.helpers.httpRequestWithAuthentication.call(
			this,
			'connectSecureApi',
			options,
		);
	} catch (error) {
		const statusCode = getHttpStatusCode(error);

		if (statusCode === 401) {
			throw new NodeApiError(this.getNode(), error as JsonObject, {
				message: 'Authentication failed - check your Connect Secure credentials',
			});
		}
		if (statusCode === 400) {
			const err = error as {
				response?: { data?: unknown; body?: unknown };
				error?: unknown;
			};
			let errorText = '';

			if (err.response?.data) {
				if (typeof err.response.data === 'string') {
					errorText = err.response.data.trim();
				}
			}
			if (!errorText && err.error) {
				if (typeof err.error === 'string') {
					errorText = err.error.trim();
				} else if (typeof err.error === 'object') {
					errorText = JSON.stringify(err.error);
				}
			}
			if (!errorText && err.response?.body) {
				if (typeof err.response.body === 'string') {
					errorText = err.response.body.trim();
				}
			}

			const message = errorText
				? `Bad request - ${errorText}`
				: 'Bad request - please check your parameters';

			throw new NodeApiError(this.getNode(), error as JsonObject, {
				message,
			});
		}

		throw wrapRequestError(this, error, baseUrl);
	}
}

export async function apiRequestAllItems(
	this: IHookFunctions | IExecuteFunctions | ILoadOptionsFunctions | IWebhookFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	resourceKey: string,
	body: IDataObject | GenericValue | GenericValue[] = {},
	qs: IDataObject = {},
): Promise<any[]> {
	const allItems: any[] = [];
	const pageSize = 100;
	let skip = 0;
	let hasMorePages = true;

	while (hasMorePages) {
		const paginatedQs = {
			...qs,
			limit: pageSize,
			skip,
		};

		const response = await apiRequest.call(this, method, endpoint, body, paginatedQs);
		const items = extractResourceList(response, resourceKey);
		allItems.push(...items);

		hasMorePages = items.length === pageSize;
		skip += pageSize;
	}

	return allItems;
}
