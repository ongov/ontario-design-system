import { Base } from '../../common/common.interface';

export const HeadingLevel = ['h2', 'h3', 'h4', 'h5', 'h6'] as const;

export type HeadingLevelOptions = (typeof HeadingLevel)[number];

export const HighlightColours = ['teal', 'gold', 'yellow', 'taupe', 'green', 'lime', 'sky', 'blue', 'purple'] as const;

export type HighlightColourOptions = (typeof HighlightColours)[number];

export type CalloutAsideType = 'callout' | 'aside';

export type HeadingContentType = 'string' | 'html';

export const HeadingContentTypes = ['string', 'html'] as const;

export interface CalloutAside extends Base {
	/**
	 * The heading level of the callout/aside heading.
	 */
	headingType: HeadingLevelOptions;

	/**
	 * The type of the heading content. If no prop is passed, it will default to string.
	 */
	headingContentType: HeadingContentType;

	/**
	 * Text or HTML to be displayed as the heading of the callout/aside. If the heading content should be displayed as HTML, the `headingContentType` needs to be set to `html`.
	 */
	headingContent: string;

	/**
	 * Optional text to be displayed as the content for the callout/aside component. If a string is passed, it will automatically be nested in a paragraph tag.
	 *
	 * HTML content can also be passed as the child/children of the callout/aside component if additional/different elements for the content are needed.
	 */
	content?: string | HTMLElement;

	/**
	 * Optional prop to choose the border colour of the callout/aside. If none is passed, the default colour will be teal.
	 */
	highlightColor?: HighlightColourOptions | undefined;
}
