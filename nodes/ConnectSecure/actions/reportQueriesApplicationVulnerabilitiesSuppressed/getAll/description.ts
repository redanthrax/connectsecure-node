import { INodeProperties } from 'n8n-workflow';

export const getAllDescription: INodeProperties[] = [
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		description: 'Whether to return all results or only up to a given limit',
		displayOptions: { show: { resource: ['reportQueriesApplicationVulnerabilitiesSuppressed'], operation: ['getAll'] } },
		default: false,
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		description: 'Max number of results to return',
		displayOptions: { show: { resource: ['reportQueriesApplicationVulnerabilitiesSuppressed'], operation: ['getAll'], returnAll: [false] } },
		typeOptions: { minValue: 1 },
		default: 50,
	},

	{
		displayName: 'Filter Mode',
		name: 'filterMode',
		type: 'options',
		noDataExpression: true,
		options: [
			{ name: 'Manual Condition', value: 'manual' },
			{ name: 'Build Filters', value: 'builder' },
			{ name: 'None', value: 'none' },
		],
		default: 'builder',
		description: 'How to build the API condition query string',
		displayOptions: { show: { resource: ['reportQueriesApplicationVulnerabilitiesSuppressed'], operation: ['getAll'] } },
	},
	{
		displayName: 'Query Condition',
		name: 'condition',
		type: 'string',
		default: '',
		description:
			'SQL-like filter passed as the condition query parameter, e.g. name ILIKE \'%Acme%\' AND company_id = 1',
		displayOptions: {
			show: { resource: ['reportQueriesApplicationVulnerabilitiesSuppressed'], operation: ['getAll'], filterMode: ['manual'] },
		},
	},
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'fixedCollection',
		typeOptions: { multipleValues: true, sortable: true },
		default: {},
		description: 'Build a condition string from field, operator, and value',
		displayOptions: {
			show: { resource: ['reportQueriesApplicationVulnerabilitiesSuppressed'], operation: ['getAll'], filterMode: ['builder'] },
		},
		options: [
			{
				name: 'filter',
				displayName: 'Filter',
				values: [
					{
						displayName: 'Field',
						name: 'field',
						type: 'options',
						noDataExpression: true,
						typeOptions: {
							loadOptionsMethod: 'getFilterFields',
							loadOptionsDependsOn: ['resource', 'operation'],
						},
						default: '',
						description: 'Field names loaded from a sample record on this endpoint (limit=1)',
						required: true,
					},
					{
						displayName: 'Operator',
						name: 'operator',
						type: 'options',
						noDataExpression: true,
						options: [
				{ name: 'Equal (=)', value: 'eq' },
				{ name: 'Not Equal (!=)', value: 'neq' },
				{ name: 'Greater Than (>)', value: 'gt' },
				{ name: 'Greater Than or Equal (>=)', value: 'gte' },
				{ name: 'Less Than (<)', value: 'lt' },
				{ name: 'Less Than or Equal (<=)', value: 'lte' },
				{ name: 'Contains (ILIKE)', value: 'ilike' },
				{ name: 'Like (LIKE)', value: 'like' },
				{ name: 'In (IN)', value: 'in' },
				{ name: 'Not In (NOT IN)', value: 'notIn' },
				{ name: 'Is Null', value: 'isNull' },
				{ name: 'Is Not Null', value: 'isNotNull' },
					],
					default: 'eq',
				},
					{
						displayName: 'Value',
						name: 'value',
						type: 'string',
						default: '',
						description:
							'Filter value. Supports expressions (e.g. from prior nodes). For IN / NOT IN, comma-separate values.',
						displayOptions: {
							hide: { operator: ['isNull', 'isNotNull'] },
						},
					},
					{
						displayName: 'Text Match',
						name: 'likeMatch',
						type: 'options',
						noDataExpression: true,
						options: [
				{ name: 'Contains', value: 'contains' },
				{ name: 'Starts With', value: 'startsWith' },
				{ name: 'Ends With', value: 'endsWith' },
				{ name: 'Exact', value: 'exact' },
					],
					default: 'contains',
					description: 'How to wrap ILIKE / LIKE values with wildcards',
						displayOptions: {
							show: { operator: ['ilike', 'like'] },
						},
					},
				],
			},
		],
	},
	{
		displayName: 'Combine Filters With',
		name: 'combineFiltersWith',
		type: 'options',
		noDataExpression: true,
		options: [
			{ name: 'AND', value: 'AND' },
			{ name: 'OR', value: 'OR' },
		],
		default: 'AND',
		displayOptions: {
			show: { resource: ['reportQueriesApplicationVulnerabilitiesSuppressed'], operation: ['getAll'], filterMode: ['builder'] },
		},
	},
	{
		displayName: 'Skip',
		name: 'skip',
		type: 'number',
		default: 0,
		description: 'Number of records to skip for pagination',
		displayOptions: { show: { resource: ['reportQueriesApplicationVulnerabilitiesSuppressed'], operation: ['getAll'] } },
	},
	{
		displayName: 'Sort Mode',
		name: 'orderByMode',
		type: 'options',
		noDataExpression: true,
		options: [
			{ name: 'Manual', value: 'manual' },
			{ name: 'Build Sort Fields', value: 'builder' },
			{ name: 'None', value: 'none' },
		],
		default: 'manual',
		description: 'How to build the order_by query parameter',
		displayOptions: { show: { resource: ['reportQueriesApplicationVulnerabilitiesSuppressed'], operation: ['getAll'] } },
	},
	{
		displayName: 'Order By',
		name: 'order_by',
		type: 'string',
		default: '',
		description: 'Sort expression passed as order_by, e.g. name desc, severity desc',
		displayOptions: {
			show: { resource: ['reportQueriesApplicationVulnerabilitiesSuppressed'], operation: ['getAll'], orderByMode: ['manual'] },
		},
	},
	{
		displayName: 'Sort Fields',
		name: 'orderByFields',
		type: 'fixedCollection',
		typeOptions: { multipleValues: true, sortable: true },
		default: {},
		description: 'Fields to sort by',
		displayOptions: {
			show: { resource: ['reportQueriesApplicationVulnerabilitiesSuppressed'], operation: ['getAll'], orderByMode: ['builder'] },
		},
		options: [
			{
				name: 'field',
				displayName: 'Field',
				values: [
					{
						displayName: 'Field Name',
						name: 'name',
						type: 'options',
						noDataExpression: true,
						typeOptions: {
							loadOptionsMethod: 'getSortFields',
							loadOptionsDependsOn: ['resource', 'operation'],
						},
						default: '',
						description: 'Field names loaded from a sample record on this endpoint (limit=1)',
						required: true,
					},
					{
						displayName: 'Direction',
						name: 'direction',
						type: 'options',
						noDataExpression: true,
						options: [
							{ name: 'Ascending', value: 'asc' },
							{ name: 'Descending', value: 'desc' },
						],
						default: 'asc',
					},
				],
			},
		],
	},
];
