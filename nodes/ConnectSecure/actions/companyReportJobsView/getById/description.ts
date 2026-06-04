import { INodeProperties } from 'n8n-workflow';

export const getByIdDescription: INodeProperties[] = [
	{
		displayName: 'Record ID',
		name: 'recordId',
		type: 'number',
		required: true,
		displayOptions: { show: { resource: ['companyReportJobsView'], operation: ['getById'] } },
		default: 0,
	},
];
