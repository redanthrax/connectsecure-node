import { INodeProperties } from 'n8n-workflow';

export const updateDescription: INodeProperties[] = [
	{
		displayName: 'Data',
		name: 'data',
		type: 'json',
		displayOptions: { show: { resource: ['assetAssets'], operation: ['update'] } },
		default: {},
		description: 'Record fields sent as the \"data\" object in the request body',
	},
];
