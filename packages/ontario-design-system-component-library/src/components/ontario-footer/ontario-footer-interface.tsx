export type OntarioFooterType = 'default' | 'twoColumn' | 'threeColumn';

export interface FooterLink {
	text: string;
	href: string;
}

// External interface to be passed to the Footer component
export interface FooterLinks {
	accessibilityLink?: FooterLink;
	privacyLink?: FooterLink;
	contactLink?: FooterLink;
	printerLink?: FooterLink;
	termsOfUseLink?: FooterLink;
}

// Internal interface for SimpleFooter Component
export interface SimpleFooterLinks {
	accessibilityLink: FooterLink;
	privacyLink: FooterLink;
	printerLink: FooterLink;
	contactLink?: FooterLink;
	termsOfUseLink?: FooterLink;
}

export type FooterContentType = 'text' | 'list' | 'html';

export type HeadingLevelType = 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export interface FooterColumnContent {
	heading?: string;
	headingLevel?: HeadingLevelType;
	type: FooterContentType;
	text?: string;
	html?: string | HTMLElement;
	list?: string[];
}

export interface FooterColumnData {
	title: string;
	headingLevel?: HeadingLevelType;
	content: Array<FooterColumnContent>;
	button?: {
		text: string;
		link: string;
	};
}
export interface TwoColumnOptions {
	column1: FooterColumnData;
	column2: FooterColumnData;
}

export interface ThreeColumnOptions extends TwoColumnOptions {
	column3: FooterColumnData;
}
