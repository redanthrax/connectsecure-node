import { INodeProperties } from 'n8n-workflow';

export const updateDescription: INodeProperties[] = [
	{
		displayName: 'Data',
		name: 'data',
		type: 'json',
		displayOptions: { show: { resource: ['companyAgentCredentialsMapping'], operation: ['update'] } },
		default: {},
		description: 'Record fields sent as the \"data\" object in the request body',
	},
];
