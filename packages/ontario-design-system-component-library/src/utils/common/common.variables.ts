import {
	OntarioBreakpointsSmall,
	OntarioBreakpointsMedium,
	OntarioBreakpointsLarge,
} from '@ongov/ontario-design-system-design-tokens/dist/ts/tokens';

export const minimumGridColumns = 1;
export const maximumGridColumns = 12;

/**
 * Numeric screen breakpoint values pulled from the design tokens package.
 * By default these come in as strings (e.g. '40em'). However
 * for comparision calculations we need the true numeric value.
 */
export const screenBreakpoints = {
	small: Number(OntarioBreakpointsSmall.replace('em', '')),
	medium: Number(OntarioBreakpointsMedium.replace('em', '')),
	large: Number(OntarioBreakpointsLarge.replace('em', '')),
};

// standard font size in px (design tokens package has it as 1 em)
export const standardFontSizePx = 16;
