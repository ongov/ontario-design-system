import { DrupalMenuMachineName } from './ontario-header.enum';

export interface ApplicationHeaderInfo {
	title: string;
	href?: string;
	maxSubheaderLinks?: maxSubheaderLinks;
}

interface maxSubheaderLinks {
	desktop?: number;
	tablet?: number;
	mobile?: number;
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

export interface OntarioSignInMenuItems {
	href: string;
	title: string;
	description: string;
}

export type OntarioHeaderType = 'application' | 'ontario' | 'serviceOntario';
