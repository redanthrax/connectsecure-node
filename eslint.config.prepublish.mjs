import baseConfig from './eslint.config.mjs';

/** @type {import('eslint').Linter.Config[]} */
export default [
	...baseConfig,
	{
		files: ['nodes/ConnectSecure/resourceGetAllEndpoints.ts'],
		rules: {
			'no-secrets/no-secrets': 'off',
		},
	},
	{
		files: ['package.json'],
		rules: {
			'@n8n/community-nodes/package-name-convention': 'error',
			'@n8n/community-nodes/valid-description': 'error',
		},
	},
];
