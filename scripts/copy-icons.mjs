#!/usr/bin/env node
/**
 * Copies node and credential icons (png/svg) into dist, preserving directory structure.
 */
import { cpSync, existsSync, statSync } from 'node:fs';
import { resolve, dirname, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const ICON_EXTENSIONS = new Set(['.png', '.svg']);

for (const dir of ['nodes', 'credentials']) {
	const source = resolve(root, dir);
	if (!existsSync(source)) continue;

	cpSync(source, resolve(root, 'dist', dir), {
		recursive: true,
		filter: (path) => statSync(path).isDirectory() || ICON_EXTENSIONS.has(extname(path).toLowerCase()),
	});
}
