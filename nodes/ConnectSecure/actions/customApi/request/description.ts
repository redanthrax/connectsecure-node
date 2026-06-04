import { INodeProperties } from 'n8n-workflow';

export const requestDescription: INodeProperties[] = [
	{
		displayName: 'Method',
		name: 'method',
		type: 'options',
		options: [
			{ name: 'GET', value: 'GET' },
			{ name: 'POST', value: 'POST' },
			{ name: 'PATCH', value: 'PATCH' },
			{ name: 'DELETE', value: 'DELETE' },
		],
		default: 'GET',
		required: true,
		displayOptions: {
			show: {
				resource: ['customApi'],
				operation: ['request'],
			},
		},
		description: 'HTTP method for the request',
	},
	{
		displayName: 'Endpoint',
		name: 'endpoint',
		type: 'string',
		default: '/r/company/companies',
		required: true,
		displayOptions: {
			show: {
				resource: ['customApi'],
				operation: ['request'],
			},
		},
		placeholder: '/r/company/companies',
		description:
			'API path (e.g. /r/company/companies, /w/company/companies). See docs/swagger.yaml for available endpoints.',
	},
	{
		displayName: 'Query Parameters',
		name: 'queryParameters',
		type: 'json',
		default: {},
		displayOptions: {
			show: {
				resource: ['customApi'],
				operation: ['request'],
			},
		},
		description:
			'Query string parameters as a JSON object, e.g. {"limit": 25, "condition": "name ILIKE \'%Acme%\'"}. For list endpoints you can also use Get Many with the filter builder.',
	},
	{
		displayName: 'Body',
		name: 'body',
		type: 'json',
		default: {},
		displayOptions: {
			show: {
				resource: ['customApi'],
				operation: ['request'],
				method: ['POST', 'PATCH', 'DELETE'],
			},
		},
		description:
			'Request body as JSON. Write endpoints typically expect {"data": {...}}. See docs/swagger.yaml for field details.',
	},
];
