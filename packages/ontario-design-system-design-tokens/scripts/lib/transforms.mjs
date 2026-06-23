// Custom Style Dictionary value transforms for the primitive token layer.
//
// These are registered in build.mjs so they are available when the primitive
// output platforms are configured (DS-2691 / PR 5). They are defined here as
// plain objects so the conversion logic can be unit-tested without running a
// full Style Dictionary build.
//
// Source token values are authored in px; the unit policy (which categories emit
// rem vs em vs unitless) is applied per-platform in DS-2691.

/** Token categories (first path segment) whose px values convert to rem. */
const REM_CATEGORIES = ['space', 'font', 'lineHeight', 'letterSpacing', 'radius', 'border'];
/** Root font size, in px, used as the rem/em conversion base. */
const PX_BASE = 16;

/**
 * Whether a token's value is a px string eligible for conversion.
 * @param {{ value: unknown }} token - The Style Dictionary token.
 * @returns {boolean} True if the value is a string ending in `px`.
 */
const endsWithPx = (token) => typeof token.value === 'string' && token.value.endsWith('px');

/**
 * Style Dictionary value transform: convert px values to rem (base 16) for
 * text-relative categories.
 * @type {{ name: string, type: 'value', filter: (token: any) => boolean, transform: (token: any) => string }}
 */
export const pxToRem = {
	name: 'size/pxToRem',
	type: 'value',
	filter: (token) => REM_CATEGORIES.includes(token.path[0]) && endsWithPx(token),
	transform: (token) => `${parseFloat(token.value) / PX_BASE}rem`,
};

/**
 * Style Dictionary value transform: convert px breakpoint values to em (base 16).
 * Media queries use em to avoid a known Safari zoom bug with rem in `@media`.
 * @type {{ name: string, type: 'value', filter: (token: any) => boolean, transform: (token: any) => string }}
 */
export const pxToEm = {
	name: 'size/pxToEm',
	type: 'value',
	filter: (token) => token.path[0] === 'breakpoint' && endsWithPx(token),
	transform: (token) => `${parseFloat(token.value) / PX_BASE}em`,
};

/** All primitive value transforms, for registration in build.mjs. */
export const primitiveTransforms = [pxToRem, pxToEm];
