import { h } from '@stencil/core';
import {
	CalloutAsideType,
	HeadingLevel,
	HeadingLevelOptions,
	HighlightColours,
	HighlightColourOptions,
} from './callout-aside.interface';

export const isValidHighlightColour = (colour: any): colour is HighlightColourOptions =>
	HighlightColours.includes(colour);

export const isValidHeadingLevel = (level: any): level is HeadingLevelOptions => HeadingLevel.includes(level);

const generateClasses = (type: CalloutAsideType, highlightColor?: HighlightColourOptions) => {
	const componentType = type === 'callout' ? `ontario-callout` : `ontario-aside`;
	const borderColor = `ontario-border-highlight--${highlightColor}`;

	return highlightColor ? `${componentType} ${borderColor}` : `${componentType}`;
};

const generateHeading = (type: string, headingType: HeadingLevelOptions, headingContent: string | HTMLElement) => {
	switch (headingType) {
		case 'h2':
			return <h2 class={`ontario-${type}__title ontario-h5`}>{headingContent}</h2>;
		case 'h3':
			return <h3 class={`ontario-${type}__title ontario-h5`}>{headingContent}</h3>;
		case 'h4':
			return <h4 class={`ontario-${type}__title ontario-h5`}>{headingContent}</h4>;
		case 'h5':
			return <h5 class={`ontario-${type}__title ontario-h5`}>{headingContent}</h5>;
		case 'h6':
			return <h6 class={`ontario-${type}__title ontario-h5`}>{headingContent}</h6>;
		default:
			return <h2 class={`ontario-${type}__title ontario-h5`}>{headingContent}</h2>;
	}
};

export const generateComponent = (
	type: CalloutAsideType,
	headingType: HeadingLevelOptions,
	headingContent: string | HTMLElement,
	content?: string,
	highlightColour?: HighlightColourOptions,
) => {
	return (
		<div class={generateClasses(type, highlightColour)}>
			{generateHeading(type, headingType, headingContent)}
			{content ? <p>{content}</p> : <slot />}
		</div>
	);
};
