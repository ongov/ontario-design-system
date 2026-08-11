// Style Dictionary platform configuration for the primitive output layer
// (DS-2691). These platforms are additive: they emit new `primitives.*` entry
// points under an `ods-` prefix and leave the legacy flat outputs (served from
// the frozen legacy/ snapshot, see build.mjs) byte-for-byte unchanged.
//
// Source token values are authored in px; `size/pxToRem` and `size/pxToEm`
// (registered in build.mjs) apply the unit output policy documented on
// DS-2691 (text-relative categories -> rem, breakpoints -> em, everything
// else -> unitless/left as authored).

/** Shared value/name transforms applied ahead of each platform's naming transform. */
const CSS_LIKE_TRANSFORMS = ['attribute/cti', 'name/kebab', 'color/hsl', 'size/pxToRem', 'size/pxToEm'];
const JS_LIKE_TRANSFORMS = ['attribute/cti', 'name/pascal', 'color/hsl', 'size/pxToRem', 'size/pxToEm'];

/** Style Dictionary config for the primitive layer's `primitives.*` outputs. */
export const primitivePlatformsConfig = {
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
