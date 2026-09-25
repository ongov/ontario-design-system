import { compile, compileString } from 'sass-embedded';
import { NodePackageImporter } from 'sass-embedded';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { mkdir, writeFile } from 'node:fs/promises';

/**
 * Compiles the Ontario Design System theme Sass entry point into a single,
 * distributable CSS file.
 *
 * This is a monolithic output (one `theme.css` containing base styles, global
 * styles, and all component styles) chosen as the initial CSS output strategy
 * so that Next.js (and other) consumers can `import` a ready-to-use stylesheet
 * without needing a Sass compiler configured in their own build pipeline.
 *
 * The `NodePackageImporter` is required here because the copied `theme.scss`
 * entry point uses `pkg:` specifiers (e.g. `pkg:@ongov/ontario-design-system-global-styles/...`)
 * to resolve styles from sibling workspace packages.
 *
 * `$asset-base-path` is explicitly overridden to `/assets` here, matching the
 * asset-copying convention documented in this package's README (consumers are
 * instructed to copy `dist/assets/*` into their app's `public/assets` folder).
 * The Sass default for this variable (`../../..`) is a *relative* path meant
 * for the source repo's own folder structure, and does not resolve correctly
 * once the styles are precompiled and consumed from an arbitrary app's public
 * directory — so without this override, font/image `url()` references in the
 * compiled CSS would 404 in a consuming app.
 */
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const packageRoot = path.resolve(__dirname, '..');

const input = path.join(packageRoot, 'dist/styles/theme.scss');
const outDir = path.join(packageRoot, 'dist/styles');
const outFile = path.join(outDir, 'theme.css');

const DEFAULT_ASSET_BASE_PATH = '/assets';

async function buildCss() {
	// Compile a small synthetic entry point that forwards the real theme.scss
	// while overriding `$asset-base-path`, rather than compiling theme.scss
	// directly, so the resulting CSS contains asset URLs that work out of the
	// box for consumers following the documented asset-copying convention.
	const entrySource = `@forward "${input.replace(/\\/g, '\\\\')}" with ($asset-base-path: "${DEFAULT_ASSET_BASE_PATH}");\n`;

	const result = compileString(entrySource, {
		style: 'expanded',
		sourceMap: true,
		sourceMapIncludeSources: true,
		importers: [new NodePackageImporter()],
		url: new URL(`file://${outDir}/__theme-entry.scss`),
	});

	await mkdir(outDir, { recursive: true });
	await writeFile(outFile, result.css, 'utf8');

	if (result.sourceMap) {
		await writeFile(`${outFile}.map`, JSON.stringify(result.sourceMap), 'utf8');
	}

	console.log(`[build-css] Compiled ${path.relative(packageRoot, input)} -> ${path.relative(packageRoot, outFile)}`);
	console.log(`[build-css] Asset base path baked into output: ${DEFAULT_ASSET_BASE_PATH}`);
}

buildCss().catch((error) => {
	console.error('[build-css] Failed to compile theme CSS:', error);
	process.exit(1);
});
