/**
 * @file Style Dictionary platform configuration — primitive tier (DS-2691).
 *
 * Additive `primitives.*` build outputs (css/scss/js/ts) under an `ods-`
 * prefix, wrapped in the `ods-tokens` CSS layer. Does not modify the frozen
 * `legacy/` snapshot served by build.mjs.
 *
 * Source values are authored in px. Unit conversion (`size/pxToRem`,
 * `size/pxToEm` — see scripts/lib/transforms.mjs, registered in build.mjs)
 * applies the policy: text-relative categories -> rem, breakpoints -> em,
 * everything else -> unitless/left as authored.
 */

import type { Config } from 'style-dictionary/types';

/** Shared value/name transforms applied ahead of each platform's naming transform. */
const CSS_LIKE_TRANSFORMS = ['attribute/cti', 'name/kebab', 'color/hsl', 'size/pxToRem', 'size/pxToEm'];
const JS_LIKE_TRANSFORMS = ['attribute/cti', 'name/pascal', 'color/hsl', 'size/pxToRem', 'size/pxToEm'];

/** Style Dictionary config for the primitive layer's `primitives.*` outputs. */
export const primitivePlatformsConfig: Config = {
	source: ['tokens/primitives/**/*.json'],
	platforms: {
		'css/primitives': {
			transforms: CSS_LIKE_TRANSFORMS,
			prefix: 'ods',
			buildPath: 'dist/css/',
			files: [
				{
					destination: 'primitives.css',
					format: 'css/variables',
					options: { selector: ['@layer ods-tokens', ':root'] },
				},
			],
		},
		'scss/primitives': {
			transforms: CSS_LIKE_TRANSFORMS,
			prefix: 'ods',
			buildPath: 'dist/scss/',
			files: [{ destination: 'primitives.scss', format: 'scss/variables' }],
		},
		'js/primitives': {
			transforms: JS_LIKE_TRANSFORMS,
			prefix: 'ods',
			buildPath: 'dist/js/',
			files: [{ destination: 'primitives.js', format: 'javascript/es6' }],
		},
		'ts/primitives': {
			transforms: JS_LIKE_TRANSFORMS,
			prefix: 'ods',
			buildPath: 'dist/ts/',
			files: [
				{ destination: 'primitives.ts', format: 'javascript/es6' },
				{ destination: 'primitives.d.ts', format: 'typescript/es6-declarations' },
			],
		},
	},
};
