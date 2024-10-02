import { h } from '@stencil/core';
import {
	CalloutAsideType,
	HeadingLevel,
	HeadingLevelOptions,
	HeadingContentType,
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
	headingType: HeadingLevelOptions | undefined,
	headingContentType: HeadingContentType,
	headingContent: string,
) => {
	const headingContentIsHTML = headingContentType === 'html';

	switch (headingType) {
		case 'h2':
			return headingContentIsHTML ? (
				<h2 class={`ontario-${type}__title ontario-h5`} innerHTML={headingContent}></h2>
			) : (
				<h2 class={`ontario-${type}__title ontario-h5`}>{headingContent}</h2>
			);
		case 'h3':
			return headingContentIsHTML ? (
				<h3 class={`ontario-${type}__title ontario-h5`} innerHTML={headingContent}></h3>
			) : (
				<h3 class={`ontario-${type}__title ontario-h5`}>{headingContent}</h3>
			);
		case 'h4':
			return headingContentIsHTML ? (
				<h4 class={`ontario-${type}__title ontario-h5`} innerHTML={headingContent}></h4>
			) : (
				<h4 class={`ontario-${type}__title ontario-h5`}>{headingContent}</h4>
			);
		case 'h5':
			return headingContentIsHTML ? (
				<h5 class={`ontario-${type}__title ontario-h5`} innerHTML={headingContent}></h5>
			) : (
				<h5 class={`ontario-${type}__title ontario-h5`}>{headingContent}</h5>
			);
		case 'h6':
			return headingContentIsHTML ? (
				<h6 class={`ontario-${type}__title ontario-h5`} innerHTML={headingContent}></h6>
			) : (
				<h6 class={`ontario-${type}__title ontario-h5`}>{headingContent}</h6>
			);
		default:
			return headingContentIsHTML ? (
				<h2 class={`ontario-${type}__title ontario-h5`} innerHTML={headingContent}></h2>
			) : (
				<h2 class={`ontario-${type}__title ontario-h5`}>{headingContent}</h2>
			);
	}
};

export const generateCalloutAside = (
	type: CalloutAsideType,
	headingContentType: HeadingContentType,
	headingType?: HeadingLevelOptions,
	headingContent?: string,
	content?: string | HTMLElement,
	highlightColour?: HighlightColourOptions,
) => {
	const contentIsString = typeof content === 'string';

	return type === 'callout' ? (
		<div class={generateClasses(type, highlightColour)}>
			{headingContent ? generateHeading(type, headingType, headingContentType, headingContent) : ''}
			{contentIsString ? <p>{content}</p> : <slot />}
		</div>
	) : (
		<aside class={generateClasses(type, highlightColour)}>
			{headingContent ? generateHeading(type, headingType, headingContentType, headingContent) : ''}
			{contentIsString ? content ? <p>{content}</p> : '' : <slot />}
		</aside>
	);
};
