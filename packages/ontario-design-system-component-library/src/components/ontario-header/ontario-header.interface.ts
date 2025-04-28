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
	maxSubheaderLinks?: {
		desktop?: number;
		tablet?: number;
		mobile?: number;
	};
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

export type DeviceType = 'desktop' | 'tablet' | 'mobile';
