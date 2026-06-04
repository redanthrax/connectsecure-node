import * as getAll from './getAll';
import * as getById from './getById';
import * as create from './create';
import * as update from './update';
import * as deleteRecord from './delete';

import { INodeProperties } from 'n8n-workflow';

export { getAll, getById, create, update, deleteRecord };

export const description: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['companyCredentials'] } },
		options: [
			{ name: 'Get Many', value: 'getAll', action: 'Get many records' },
			{ name: 'Get', value: 'getById', action: 'Get a record by ID' },
			{ name: 'Create', value: 'create', action: 'Create a record' },
			{ name: 'Update', value: 'update', action: 'Update a record' },
			{ name: 'Delete', value: 'delete', action: 'Delete a record' },
		],
		default: 'getAll',
	},
	...getAll.description,
	...getById.description,
	...create.description,
	...update.description,
	...deleteRecord.description,
];
