const PORTAL_HOSTS = new Set([
	'portal.myconnectsecure.com',
	'portal.connectsecure.com',
	'connectsecure.com',
]);

export function normalizeBaseUrl(raw: string): string {
	let url = raw.trim();
	if (!url) {
		throw new Error('Base API URL is required');
	}

	if (!/^https?:\/\//i.test(url)) {
		url = `https://${url}`;
	}

	return url.replace(/\/+$/, '');
}

export function getApiBaseUrlHint(raw: string): string | undefined {
	let hostname: string;
	try {
		hostname = new URL(normalizeBaseUrl(raw)).hostname.toLowerCase();
	} catch {
		return 'Base API URL is invalid. Use the pod hostname from Connect Secure API Documentation (e.g. https://pod106.myconnectsecure.com).';
	}

	if (PORTAL_HOSTS.has(hostname)) {
		return `Host "${hostname}" is the Connect Secure web portal, not the API. In the portal open Profile → API Documentation and copy the pod URL (e.g. https://pod106.myconnectsecure.com).`;
	}

	return undefined;
}

export function assertApiBaseUrl(raw: string): string {
	const normalized = normalizeBaseUrl(raw);
	const hint = getApiBaseUrlHint(raw);
	if (hint) {
		throw new Error(hint);
	}
	return normalized;
}
