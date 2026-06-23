// Custom Style Dictionary value transforms for the primitive token layer.
//
// These are registered in build.mjs so they are available when the primitive
// output platforms are configured (DS-2691 / PR 5). They are defined here as
// plain objects so the conversion logic can be unit-tested without running a
// full Style Dictionary build.
//
// Source token values are authored in px; the unit policy (which categories emit
// rem vs em vs unitless) is applied per-platform in DS-2691.

const REM_CATEGORIES = ['space', 'font', 'lineHeight', 'letterSpacing', 'radius', 'border'];
const PX_BASE = 16;

const endsWithPx = (token) => typeof token.value === 'string' && token.value.endsWith('px');

// Convert px values to rem (base 16) for text-relative categories.
export const pxToRem = {
	name: 'size/pxToRem',
	type: 'value',
	filter: (token) => REM_CATEGORIES.includes(token.path[0]) && endsWithPx(token),
	transform: (token) => `${parseFloat(token.value) / PX_BASE}rem`,
};

// Convert px breakpoint values to em (base 16) — media queries use em to avoid a
// known Safari zoom bug with rem in @media.
export const pxToEm = {
	name: 'size/pxToEm',
	type: 'value',
	filter: (token) => token.path[0] === 'breakpoint' && endsWithPx(token),
	transform: (token) => `${parseFloat(token.value) / PX_BASE}em`,
};

export const primitiveTransforms = [pxToRem, pxToEm];
