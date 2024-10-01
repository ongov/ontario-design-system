module.exports = {
	ontarioGlobalTokens: {
		radius: { value: '4px' },
		/**
		 * Use this value when transitioning between breakpoint value classes.
		 * e.g. show-for-small-only
		 *
		 * Foundation 6 recommends using a value smaller than a pixel, to avoid breakpoint
		 * styling issues around the edge of the breakpoint range.
		 *
		 * https://github.com/foundation/foundation-sites/blob/c2db616af8ab0071927c62c429ed3b1920dc62ba/scss/components/_visibility.scss#L9
		 */
		breakpointTransitionValue: { value: '0.00125em' },
		pixelValue: { value: '0.0625em' },
		maxValue: { value: '999999999999' },
		widthNarrower: { value: '26.25em' },
		widthNarrow: { value: '38.75em' },
		widthStandard: { value: '48rem' },
		widthMax: { value: '100%' },
		borderSize: { value: '2px' },
		touchTargetSize: { value: '36px' },
		touchTargetSizeMobile: { value: '40px' },
		lineHeightDefault: { value: '1.5' },
	},
};
