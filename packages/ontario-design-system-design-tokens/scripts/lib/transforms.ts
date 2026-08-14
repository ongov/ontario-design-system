/**
 * @file Custom Style Dictionary value transforms.
 *
 * Home for any hand-written transform this package needs, registered in
 * build.mjs so they're available to whichever platform configs
 * (scripts/config/*.config.mjs) reference them by name. Defined here as
 * plain objects so the conversion logic can be unit-tested without running a
 * full Style Dictionary build.
 *
 * Currently home to the primitive tier's px unit transforms (DS-2691):
 * source token values are authored in px, and the unit policy (which
 * categories emit rem vs em vs unitless) is applied per-platform.
 */
import type { TransformedToken, ValueTransform } from 'style-dictionary/types';

/** Token categories (first path segment) whose px values convert to rem. */
const REM_CATEGORIES = ['space', 'font', 'lineHeight', 'letterSpacing', 'radius', 'border'];
/** Root font size, in px, used as the rem/em conversion base. */
const PX_BASE = 16;

/** Whether a token's value is a px string eligible for conversion. */
const endsWithPx = (token: TransformedToken): boolean => typeof token.value === 'string' && token.value.endsWith('px');

/**
 * Style Dictionary value transform: convert px values to rem (base 16) for
 * text-relative categories.
 */
export const pxToRem: ValueTransform = {
	name: 'size/pxToRem',
	type: 'value',
	filter: (token) => REM_CATEGORIES.includes(token.path[0]) && endsWithPx(token),
	transform: (token) => `${parseFloat(token.value as string) / PX_BASE}rem`,
};

/**
 * Style Dictionary value transform: convert px breakpoint values to em (base 16).
 * Media queries use em to avoid a known Safari zoom bug with rem in `@media`.
 */
export const pxToEm: ValueTransform = {
	name: 'size/pxToEm',
	type: 'value',
	filter: (token) => token.path[0] === 'breakpoint' && endsWithPx(token),
	transform: (token) => `${parseFloat(token.value as string) / PX_BASE}em`,
};

/** All primitive value transforms, for registration in build.mjs. */
export const primitiveTransforms: ValueTransform[] = [pxToRem, pxToEm];
