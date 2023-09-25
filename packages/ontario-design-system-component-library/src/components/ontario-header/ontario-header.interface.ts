import { DrupalMenuMachineName } from './ontario-header.enum';

export interface MenuItem {
	title: string;
	href: string;
	linkIsActive?: boolean;
	onClickHandler?: (event: Event) => void;
}

export interface ApplicationHeaderInfo {
	title: string;
	href?: string;
	maxSubheaderDesktopLinks?: number;
	maxSubheaderTabletLinks?: number;
	maxSubheaderMobileLinks?: number;
}

export interface LanguageToggleOptions {
	englishLink: string;
	frenchLink: string;
}

export interface OntarioMenuItems {
	'href': string;
	'title': string;
	'drupal-menu-hierarchy': string[];
	'drupal-menu-machine-name': DrupalMenuMachineName[];
}

export type OntarioHeaderType = 'application' | 'ontario' | 'serviceOntario';
