/**
 * @file Style Dictionary platform configuration for the downstream/Tailwind
 * JSON exports (DS-2692). A prototype bespoke script for this existed
 * briefly but was intentionally removed (see commit 66165e8b, "remove
 * downstream exporter scaffold") in favour of Style Dictionary
 * platforms/custom formats, matching the DS-2691 primitive platforms and the
 * approach used by the GC Design System's token exports
 * (github.com/cds-snc/gcds-tokens), which drive both their Figma and
 * Tailwind JSON exports from Style Dictionary custom formats.
 *
 * Two custom formats are registered:
 *  - `json/downstream-typed` -> exports/downstream/tokens.ods.json, a typed
 *    `{ value, type }` tree using the same category vocabulary as the Figma
 *    export (scripts/export-figma-tokens.ts / scripts/lib/token-export.ts).
 *  - `json/tailwind-theme` -> exports/tailwind/tailwind.tokens.json, a
 *    Tailwind `theme.extend`-shaped mapping built from the same primitives.
 */
import StyleDictionary from 'style-dictionary';
import type { Config } from 'style-dictionary/types';
import { buildTypedTreeFromTokens, buildValueTreeFromTokens } from './token-export.ts';

/** Maps a Tailwind `theme.extend` key to the Core-layer sub-path it is built from. */
const TAILWIND_SOURCE_PATHS: Record<string, string[]> = {
	spacing: ['space'],
	fontFamily: ['font', 'family'],
	fontSize: ['font', 'size'],
	fontWeight: ['font', 'weight'],
	lineHeight: ['lineHeight'],
	letterSpacing: ['letterSpacing'],
	borderRadius: ['radius'],
	borderWidth: ['border', 'width'],
	screens: ['breakpoint'],
	zIndex: ['zIndex'],
	transitionDuration: ['motion', 'duration'],
	transitionTimingFunction: ['motion', 'easing'],
	boxShadow: ['elevation', 'shadow'],
};

/**
 * Resolve a dot path against a nested value tree.
 * @param tree - The token value tree to resolve against.
 * @param pathParts - The path segments to walk.
 * @returns The resolved node, or undefined if the path does not exist.
 */
function resolvePath(tree: Record<string, any>, pathParts: string[]): unknown {
	return pathParts.reduce((node, segment) => (node && typeof node === 'object' ? node[segment] : undefined), tree);
}

/**
 * Build the Tailwind colour scale from the primitive colour tree: accent hues
 * are lifted a level (`colour.accent.blue` -> `colors.blue`) while greyscale,
 * neutral, and system tokens keep their existing sub-tree shape.
 * @param colourTree - The `colour` sub-tree of the value tree.
 * @returns The Tailwind `colors` theme entry.
 */
function buildTailwindColours(colourTree: Record<string, any>): Record<string, any> {
	if (!colourTree) {
		return {};
	}

	const colours: Record<string, any> = {};
	Object.entries(colourTree).forEach(([category, value]) => {
		if (category === 'accent') {
			Object.entries(value as Record<string, any>).forEach(([hue, hueValue]) => {
				colours[hue] = hueValue;
			});
			return;
		}
		colours[category] = value;
	});
	return colours;
}

// Register the custom formats once at module load; Style Dictionary formats
// are process-global, so this file must only be imported once per process
// (build.mjs does so alongside the primitive transforms/platforms).
StyleDictionary.registerFormat({
	name: 'json/downstream-typed',
	format({ dictionary }) {
		const { tree, warnings } = buildTypedTreeFromTokens(dictionary.allTokens);
		if (warnings.length > 0) {
			console.log(`[export:downstream] Type inference warnings: ${warnings.length}`);
			warnings.slice(0, 25).forEach((warning) => console.log(` - ${warning}`));
		}

		const payload = {
			version: '1',
			updatedAt: new Date().toISOString(),
			// Only the Core (primitive) layer exists so far; Semantic/Component
			// are added here once those layers land in later Epics.
			tokens: { Core: tree },
		};
		return `${JSON.stringify(payload, null, 2)}\n`;
	},
});

StyleDictionary.registerFormat({
	name: 'json/tailwind-theme',
	format({ dictionary }) {
		const valueTree = buildValueTreeFromTokens(dictionary.allTokens);
		const theme: Record<string, any> = {};

		Object.entries(TAILWIND_SOURCE_PATHS).forEach(([themeKey, sourcePath]) => {
			const node = resolvePath(valueTree, sourcePath);
			if (node !== undefined) {
				theme[themeKey] = node;
			}
		});
		theme.colors = buildTailwindColours(valueTree.colour);

		return `${JSON.stringify({ theme: { extend: theme } }, null, 2)}\n`;
	},
});

/** Style Dictionary config for the downstream/Tailwind JSON exports (DS-2692). */
export const exportPlatformsConfig: Config = {
	source: ['tokens/primitives/**/*.json'],
	platforms: {
		// Neither custom format reads `token.name` (they key off `token.path`),
		// but applying the standard naming transforms gives each token a unique
		// `name` too, so Style Dictionary's own output-name collision check
		// (based on `name`, not `path`) doesn't produce noisy false positives
		// for e.g. `colour.accent.blue.0` vs `colour.greyscale.0`.
		'json/downstream': {
			transforms: ['attribute/cti', 'name/kebab'],
			buildPath: 'exports/downstream/',
			files: [{ destination: 'tokens.ods.json', format: 'json/downstream-typed' }],
		},
		'json/tailwind': {
			transforms: ['attribute/cti', 'name/kebab'],
			buildPath: 'exports/tailwind/',
			files: [{ destination: 'tailwind.tokens.json', format: 'json/tailwind-theme' }],
		},
	},
};
