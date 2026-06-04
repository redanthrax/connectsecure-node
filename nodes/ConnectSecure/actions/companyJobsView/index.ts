import * as getAll from './getAll';
import * as getById from './getById';

import { INodeProperties } from 'n8n-workflow';

export { getAll, getById };

export const description: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['companyJobsView'] } },
		options: [
			{ name: 'Get Many', value: 'getAll', action: 'Get many records' },
			{ name: 'Get', value: 'getById', action: 'Get a record by ID' },
		],
		default: 'getAll',
	},
	...getAll.description,
	...getById.description,
];
