import { DrupalMenuMachineName } from './ontario-header.enum';

export interface menuItems {
	title: string;
	href: string;
	linkIsActive?: boolean;
	onClickHandler?: (event: Event) => void;
}

export interface applicationHeaderInfo {
	title: string;
	href?: string;
	maxSubheaderDesktopLinks?: number;
	maxSubheaderTabletLinks?: number;
	maxSubheaderMobileLinks?: number;
}

export interface languageToggleOptions {
	englishLink: string;
	frenchLink: string;
}

export interface ontarioMenuItems {
	'href': string;
	'title': string;
	'drupal-menu-hierarchy': string[];
	'drupal-menu-machine-name': DrupalMenuMachineName[];
}
