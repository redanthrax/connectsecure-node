import { INodeProperties } from 'n8n-workflow';

export const deleteDescription: INodeProperties[] = [
	{
		displayName: 'Record ID',
		name: 'recordId',
		type: 'number',
		required: true,
		displayOptions: { show: { resource: ['integrationIntegrationCredentials'], operation: ['delete'] } },
		default: 0,
	},
];
