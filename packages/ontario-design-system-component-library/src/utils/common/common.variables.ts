import {
	OntarioBreakpointsSmall,
	OntarioBreakpointsMedium,
	OntarioBreakpointsLarge,
} from '@ongov/ontario-design-system-design-tokens/dist/ts/tokens';

export const minimumGridColumns = 1;
export const maximumGridColumns = 12;

/**
 * Numeric screen breakpoint values pulled from the design tokens package.
 * By default these come in as strings as they have units attached to them
 * (e.g. '40em').
 *
 * However for comparision calculations we need the true numeric value.
 *
 * The Number() method only matches numerical values to begin with.
 * However for further clarity I'm showing a replace on the
 * regex /\D/g match, which matches againt any non-numeric characters,
 * and is replacing it with nothing.
 */
export const ScreenBreakpoints = {
	Small: Number(OntarioBreakpointsSmall.replace(/\D/g, '')),
	Medium: Number(OntarioBreakpointsMedium.replace(/\D/g, '')),
	Large: Number(OntarioBreakpointsLarge.replace(/\D/g, '')),
};

// standard font size in px (design tokens package has it as 1 em)
export const standardFontSizePx = 16;
