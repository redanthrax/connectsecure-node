import { INodeProperties } from 'n8n-workflow';

export const getByIdDescription: INodeProperties[] = [
	{
		displayName: 'Record ID',
		name: 'recordId',
		type: 'number',
		required: true,
		displayOptions: { show: { resource: ['integrationIntegrationCredentials'], operation: ['getById'] } },
		default: 0,
	},
];
