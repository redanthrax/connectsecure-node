import { ILoadOptionsFunctions, INodePropertyOptions } from 'n8n-workflow';
import { fetchFieldOptionsFromEndpoint } from './fieldDiscovery';
import { getGetAllEndpoint } from './resourceGetAllEndpoints';
import { normalizeEndpoint } from './actions/customApi/normalizeEndpoint';

async function loadFieldsForGetAll(
	this: ILoadOptionsFunctions,
): Promise<INodePropertyOptions[]> {
	const resource = this.getCurrentNodeParameter('resource') as string;
	const operation = this.getCurrentNodeParameter('operation') as string;

	if (!resource || operation !== 'getAll' || resource === 'customApi') {
		return [];
	}

	const endpoint = getGetAllEndpoint(resource);
	if (!endpoint) {
		return [];
	}

	try {
		return await fetchFieldOptionsFromEndpoint(this, endpoint);
	} catch {
		return [];
	}
}

async function loadFieldsForCustomApi(
	this: ILoadOptionsFunctions,
): Promise<INodePropertyOptions[]> {
	const operation = this.getCurrentNodeParameter('operation') as string;
	if (operation !== 'request') {
		return [];
	}

	const endpointRaw = this.getCurrentNodeParameter('endpoint') as string;
	if (!endpointRaw?.trim()) {
		return [];
	}

	try {
		const endpoint = normalizeEndpoint(endpointRaw);
		return await fetchFieldOptionsFromEndpoint(this, endpoint);
	} catch {
		return [];
	}
}

export const connectSecureLoadOptions = {
	getResources: async function (
		this: ILoadOptionsFunctions,
	): Promise<INodePropertyOptions[]> {
		const { getResourcesForGroup } = await import('./resourceGroups');
		const resourceGroup = this.getCurrentNodeParameter('resourceGroup') as string;
		return getResourcesForGroup(resourceGroup);
	},

	getFilterFields: loadFieldsForGetAll,

	getSortFields: loadFieldsForGetAll,

	getCustomApiFilterFields: loadFieldsForCustomApi,

	getCustomApiSortFields: loadFieldsForCustomApi,
};
