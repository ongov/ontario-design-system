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

export type FooterContentType = 'text' | 'list' | 'html';

export interface FooterColumnContent {
	heading?: string;
	type: FooterContentType;
	text?: string;
	html?: string;
	list?: string[];
}

export interface FooterColumnData {
	title: string;
	content: Array<FooterColumnContent>;
	button?: {
		text: string;
		link: string;
	};
}
export interface TwoColumnOptions {
	col1: FooterColumnData;
	col2: FooterColumnData;
}

export interface ThreeColumnOptions extends TwoColumnOptions {
	col3: FooterColumnData;
}
