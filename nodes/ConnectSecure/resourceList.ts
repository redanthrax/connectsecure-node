import { IDataObject } from 'n8n-workflow';

/** Connect Secure responses wrap payloads in `{ status, data }`. */
export function extractResourceList(response: unknown, resourceKey: string): IDataObject[] {
	if (resourceKey) {
		if (Array.isArray(response)) {
			return response as IDataObject[];
		}
		const bag = response as IDataObject;
		const items = bag?.[resourceKey];
		if (Array.isArray(items)) {
			return items as IDataObject[];
		}
		return [];
	}

	if (Array.isArray(response)) {
		return response as IDataObject[];
	}

	if (response && typeof response === 'object') {
		const bag = response as IDataObject;
		if (Array.isArray(bag.data)) {
			return bag.data as IDataObject[];
		}
		if (bag.data && typeof bag.data === 'object') {
			return [bag.data as IDataObject];
		}
		return [bag];
	}

	return [];
}

export function unwrapResponseData(response: unknown): IDataObject {
	if (!response || typeof response !== 'object') {
		return {};
	}

	const bag = response as IDataObject;
	if (bag.data !== undefined && typeof bag.data === 'object' && !Array.isArray(bag.data)) {
		return bag.data as IDataObject;
	}

	return bag;
}
