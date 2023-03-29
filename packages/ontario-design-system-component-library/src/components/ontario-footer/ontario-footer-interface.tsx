export type OntarioFooterType = 'default' | 'twoColumn' | 'threeColumn';

export interface FooterLink {
	text: string;
	href: string;
}

export interface FooterLinks {
	accessibilityLink: string;
	privacyLink: string;
	contactLink?: string;
	printerLink?: string;
}

export interface SimpleFooterLinks {
	accessibilityLink: FooterLink;
	privacyLink: FooterLink;
	printerLink: FooterLink;
	contactLink?: FooterLink;
}

export type FooterContentType = 'text' | 'list' | 'html';

export type HeadingLevelType = 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export interface FooterColumnContent {
	heading?: string;
	headingLevel?: HeadingLevelType;
	type: FooterContentType;
	text?: string;
	html?: string;
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
