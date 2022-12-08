export interface menuItems {
	name: string;
	href: string;
	linkIsActive?: boolean;
	onClickHandler?: (event: Event) => void;
}

export interface applicationHeaderInfo {
	name: string;
	href: string;
}

export interface languageToggleOptions {
	englishLink: string;
	frenchLink: string;
}
