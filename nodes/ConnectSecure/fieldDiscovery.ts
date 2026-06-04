import { IDataObject, ILoadOptionsFunctions, INodePropertyOptions } from 'n8n-workflow';
import { extractResourceList } from './resourceList';
import { apiRequest } from './transport';

function describeValue(value: unknown): string {
	if (value === null) {
		return 'null';
	}
	if (Array.isArray(value)) {
		return 'array';
	}
	if (typeof value === 'object') {
		return 'object';
	}
	return typeof value;
}

export function fieldKeysToOptions(record: IDataObject): INodePropertyOptions[] {
	return Object.keys(record)
		.sort((a, b) => a.localeCompare(b))
		.map((key) => ({
			name: key,
			value: key,
			description: describeValue(record[key]),
		}));
}

export async function fetchFieldOptionsFromEndpoint(
	ctx: ILoadOptionsFunctions,
	endpoint: string,
	additionalQs: IDataObject = {},
): Promise<INodePropertyOptions[]> {
	const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;

	const response = await apiRequest.call(ctx, 'GET', normalizedEndpoint, {}, {
		limit: 1,
		skip: 0,
		...additionalQs,
	});

	const items = extractResourceList(response, '');
	if (items.length === 0) {
		return [];
	}

	return fieldKeysToOptions(items[0]);
}
