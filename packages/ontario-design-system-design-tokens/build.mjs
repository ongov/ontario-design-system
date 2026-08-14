// Build entry point for the design-tokens package. While the package is being
// rearchitected for the layered token model (DS-2685), this serves the shipped
// flat output from the committed legacy/ snapshot, and additionally builds the
// new `primitives.*` outputs (DS-2691) under an `ods-` prefix, wrapped in a CSS
// `@layer` for the CSS variant.
import { mkdir, copyFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import StyleDictionary from 'style-dictionary';

import { primitiveTransforms } from './scripts/lib/transforms.ts';
import { primitivePlatformsConfig } from './scripts/config/primitive.config.mjs';

// Register the primitive value transforms so they are available to the
// primitive output platforms configured below (DS-2691 / PR 5).
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

// Build the new primitive layer outputs (DS-2691). These are additive
// `primitives.*` entry points alongside the legacy flat outputs above, and do
// not affect them.
const primitivesDictionary = new StyleDictionary(primitivePlatformsConfig);
await primitivesDictionary.hasInitialized;
await primitivesDictionary.buildAllPlatforms();
console.log('Built primitive layer output (primitives.*).');
