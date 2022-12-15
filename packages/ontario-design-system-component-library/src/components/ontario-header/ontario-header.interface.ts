export interface menuItems {
	name: string;
	href: string;
	linkIsActive?: boolean;
	onClickHandler?: (event: Event) => void;
}

export interface applicationHeaderInfo {
	name: string;
	href?: string;
	maxSubheaderDesktopLinks?: number;
	maxSubheaderTabletLinks?: number;
	maxSubheaderMobileLinks?: number;
}

export interface languageToggleOptions {
	englishLink: string;
	frenchLink: string;
}
