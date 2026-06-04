import { INodeProperties } from 'n8n-workflow';

export const createDescription: INodeProperties[] = [
	{
		displayName: 'Data',
		name: 'data',
		type: 'json',
		displayOptions: { show: { resource: ['companyDiscoverySettings'], operation: ['create'] } },
		default: {},
		description: 'Record fields sent as the \"data\" object in the request body',
	},
];
