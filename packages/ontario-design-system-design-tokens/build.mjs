// Build entry point for the design-tokens package. While the package is being
// rearchitected for the layered token model (DS-2685), this serves the shipped
// flat output from the committed legacy/ snapshot and registers the primitive
// value transforms for the upcoming primitive output platforms (DS-2691).
import { mkdir, copyFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import StyleDictionary from 'style-dictionary';

import { primitiveTransforms } from './scripts/lib/transforms.mjs';

// Register the primitive value transforms so they are available when the
// primitive output platforms are configured (DS-2691 / PR 5). They are not yet
// applied to any platform, so this build produces no transformed output.
for (const transform of primitiveTransforms) {
	StyleDictionary.registerTransform(transform);
}

// While the design-tokens package is rearchitected for the layered token model
// (DS-2685), the shipped flat outputs are served from a committed frozen
// snapshot (legacy/) so external consumers are unaffected by the renovation.
// Copy that snapshot into dist/ to produce the published package outputs.
const packageRoot = path.dirname(fileURLToPath(import.meta.url));
const legacyDir = path.join(packageRoot, 'legacy');
const distDir = path.join(packageRoot, 'dist');

/**
 * Recursively copy a directory tree.
 * @param {string} from - Absolute source directory path.
 * @param {string} to - Absolute destination directory path.
 * @returns {Promise<void>}
 */
async function copyDir(from, to) {
	await mkdir(to, { recursive: true });
	for (const entry of await readdir(from)) {
		const source = path.join(from, entry);
		const destination = path.join(to, entry);
		if ((await stat(source)).isDirectory()) {
			await copyDir(source, destination);
		} else {
			await copyFile(source, destination);
		}
	}
}

await copyDir(legacyDir, distDir);
console.log('Copied frozen legacy token output to dist/.');
