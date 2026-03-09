import { createRequire } from 'node:module';

// Create a CommonJS-style `require` resolver that works in ESM modules.
// This allows us to use `require.resolve()` to locate files inside node_modules.
const require = createRequire(import.meta.url);

/**
 * Custom Sass importer used to resolve `pkg:` references in Sass imports.
 *
 * Example:
 *   @use "pkg:@ongov/ontario-design-system/styles/theme";
 *
 * The `pkg:` prefix is not understood by Sass by default, so this importer
 * intercepts those imports and resolves them using Node's module resolution.
 *
 * The importer attempts several resolution strategies in order:
 * 1. Resolve the path exactly as provided
 * 2. Resolve the path with a `.scss` extension
 * 3. Resolve the path as a Sass partial (`_file.scss`)
 *
 * If none of the attempts succeed, the importer returns `null` so Sass
 * continues its normal resolution process.
 *
 * Optional debug logging can be enabled to help troubleshoot resolution issues.
 */
export const pkgImporter = (url: string, options: { debug?: boolean } = {}) => {
	const { debug = false } = options;

	// Ignore imports that are not using the `pkg:` prefix.
	if (!url?.startsWith('pkg:')) return null;

	// Remove the `pkg:` prefix so we can resolve the module path.
	const spec = url.slice('pkg:'.length);

	// Helper logger that only outputs when debug mode is enabled.
	const log = (message: string) => {
		if (debug) {
			console.warn(`[pkgImporter] ${message}`);
		}
	};

	// Attempt 1: resolve the specifier exactly as provided.
	try {
		return { file: require.resolve(spec) };
	} catch {
		log(`Failed to resolve "${spec}" directly`);
	}

	// Attempt 2: resolve by appending `.scss`
	try {
		return { file: require.resolve(`${spec}.scss`) };
	} catch {
		log(`Failed to resolve "${spec}.scss"`);
	}

	// Attempt 3: resolve as a Sass partial (e.g. `_file.scss`)
	try {
		const parts = spec.split('/');
		const base = parts.pop();
		const dir = parts.join('/');
		const partialPath = `${dir}/_${base}.scss`;

		return { file: require.resolve(partialPath) };
	} catch {
		log(`Failed to resolve partial "_${spec}.scss"`);
	}

	// If all attempts fail, return null so Sass can continue trying other importers.
	log(`Unable to resolve pkg reference: ${url}`);
	return null;
};
