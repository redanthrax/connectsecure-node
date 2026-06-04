/**
 * Normalizes a Connect Secure API path for transport.apiRequest.
 * Accepts /r/company/companies or r/company/companies.
 */
export function normalizeEndpoint(raw: string): string {
	let path = raw.trim();
	if (!path) {
		throw new Error('Endpoint is required');
	}

	if (path.includes('://')) {
		try {
			path = new URL(path).pathname;
		} catch {
			throw new Error('Endpoint must be a path (e.g. /r/company/companies), not a full URL');
		}
	}

	if (!path.startsWith('/')) {
		path = `/${path}`;
	}

	return path;
}
