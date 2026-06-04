import {
	IDataObject,
	IExecuteFunctions,
	INodeExecutionData,
	NodeOperationError,
} from 'n8n-workflow';
import { IHttpRequestMethods } from 'n8n-workflow';
import { apiRequest } from '../../../transport';
import { normalizeEndpoint } from '../normalizeEndpoint';
import { extractResourceList } from '../../../resourceList';

function parseJsonField(
	ctx: IExecuteFunctions,
	value: unknown,
	fieldLabel: string,
): IDataObject | IDataObject[] | undefined {
	if (value === undefined || value === null || value === '') {
		return undefined;
	}

	if (typeof value === 'object') {
		return value as IDataObject | IDataObject[];
	}

	if (typeof value === 'string') {
		const trimmed = value.trim();
		if (!trimmed) {
			return undefined;
		}
		try {
			return JSON.parse(trimmed) as IDataObject | IDataObject[];
		} catch {
			throw new NodeOperationError(ctx.getNode(), `Invalid JSON in ${fieldLabel}`);
		}
	}

	return undefined;
}

function parseQueryParameters(
	ctx: IExecuteFunctions,
	value: unknown,
): IDataObject {
	const parsed = parseJsonField(ctx, value, 'Query Parameters');
	if (!parsed || Array.isArray(parsed)) {
		return {};
	}
	return parsed;
}

function responseToItems(
	response: unknown,
	index: number,
): INodeExecutionData[] {
	const items = extractResourceList(response, '');
	if (items.length > 1) {
		return items.map((item: IDataObject) => ({
			json: item,
			pairedItem: { item: index },
		}));
	}

	return [
		{
			json: items[0] ?? (response as IDataObject) ?? {},
			pairedItem: { item: index },
		},
	];
}

export async function execute(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const method = this.getNodeParameter('method', index) as IHttpRequestMethods;
	const endpointRaw = this.getNodeParameter('endpoint', index) as string;
	const queryParameters = this.getNodeParameter('queryParameters', index, {}) as unknown;

	let endpoint: string;
	try {
		endpoint = normalizeEndpoint(endpointRaw);
	} catch (error) {
		throw new NodeOperationError(
			this.getNode(),
			error instanceof Error ? error.message : 'Invalid endpoint',
		);
	}

	const qs = parseQueryParameters(this, queryParameters);

	let body: IDataObject | IDataObject[] = {};
	if (method === 'POST' || method === 'PATCH' || method === 'DELETE') {
		const bodyParam = this.getNodeParameter('body', index, {}) as unknown;
		const parsedBody = parseJsonField(this, bodyParam, 'Body');
		if (parsedBody !== undefined) {
			body = parsedBody;
		}
	}

	const response = await apiRequest.call(this, method, endpoint, body, qs);

	return responseToItems(response, index);
}
