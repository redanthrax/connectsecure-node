import * as create from './create';

import { INodeProperties } from 'n8n-workflow';

export { create };

export const description: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['companyRemoveSchedule'] } },
		options: [
			{ name: 'Create', value: 'create', action: 'Create a record' },
		],
		default: 'create',
	},
	...create.description,
];
