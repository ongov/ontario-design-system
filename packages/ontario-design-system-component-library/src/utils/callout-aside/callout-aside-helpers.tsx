import { h } from '@stencil/core';
import {
	CalloutAsideType,
	HeadingLevel,
	HeadingLevelOptions,
	HighlightColours,
	HighlightColourOptions,
} from './callout-aside.interface';

export const isValidHighlightColour = (colour: HighlightColourOptions): colour is HighlightColourOptions =>
	HighlightColours.includes(colour);

export const isValidHeadingLevel = (level: HeadingLevelOptions): level is HeadingLevelOptions =>
	HeadingLevel.includes(level);

const generateClasses = (type: CalloutAsideType, highlightColor?: HighlightColourOptions) => {
	const componentType = type === 'callout' ? `ontario-callout` : `ontario-aside`;
	const borderColor = `ontario-border-highlight--${highlightColor}`;

	return highlightColor ? `${componentType} ${borderColor}` : `${componentType}`;
};

const generateHeading = (
	type: CalloutAsideType,
	headingType: HeadingLevelOptions,
	headingContent: string | HTMLElement,
) => {
	const headingContentIsString = typeof headingContent === 'string';
	const headingContentIsHTML = headingContent instanceof HTMLElement;

	const HTMLHeading = headingContentIsHTML ? { dangerouslySetInnerHTML: { __html: headingContent } } : {};

	switch (headingType) {
		case 'h2':
			return (
				<h2 class={`ontario-${type}__title ontario-h5`} {...HTMLHeading}>
					{headingContentIsString && headingContent}
				</h2>
			);
		case 'h3':
			return (
				<h3 class={`ontario-${type}__title ontario-h5`} {...HTMLHeading}>
					{headingContentIsString && headingContent}
				</h3>
			);
		case 'h4':
			return (
				<h4 class={`ontario-${type}__title ontario-h5`} {...HTMLHeading}>
					{headingContentIsString && headingContent}
				</h4>
			);
		case 'h5':
			return (
				<h5 class={`ontario-${type}__title ontario-h5`} {...HTMLHeading}>
					{headingContentIsString && headingContent}
				</h5>
			);
		case 'h6':
			return (
				<h6 class={`ontario-${type}__title ontario-h5`} {...HTMLHeading}>
					{headingContentIsString && headingContent}
				</h6>
			);
		default:
			return (
				<h2 class={`ontario-${type}__title ontario-h5`} {...HTMLHeading}>
					{headingContentIsString && headingContent}
				</h2>
			);
	}
};

export const generateCalloutAside = (
	type: CalloutAsideType,
	headingType: HeadingLevelOptions,
	headingContent: string | HTMLElement,
	content?: string | HTMLElement,
	highlightColour?: HighlightColourOptions,
) => {
	const contentIsString = typeof content === 'string';
	const contentIsHTML = content instanceof HTMLElement;

	return (
		<div class={generateClasses(type, highlightColour)}>
			{generateHeading(type, headingType, headingContent)}
			{contentIsString ? <p>{content}</p> : contentIsHTML ? { content } : <slot />}
		</div>
	);
};
