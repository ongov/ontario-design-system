import { Component, HostListener } from '@angular/core';
import { ComponentLibraryModule } from '@ongov/ontario-design-system-component-library-angular';

type Language = 'en' | 'fr';

// Trimmed from the original Angular POC translations (`header`, `footer` and `homepage`).
const TRANSLATIONS = {
	en: {
		appName: 'Ontario Design System Angular demo',
		menuItems: { home: 'Home', register: 'Register' },
		footer: {
			accessibility: { text: 'Accessibility', link: 'https://www.ontario.ca/page/accessibility' },
			privacy: { text: 'Confidentiality', link: 'https://www.ontario.ca/page/privacy-statement' },
			contactUs: { text: 'Contact us', link: 'https://www.ontario.ca/feedback/contact-us' },
		},
		homepage: {
			heading: 'How to start an Angular POC with the Design System',
			leadStatement: 'Create an account in 4 simple steps to help start your Angular proof of concept applications.',
			callout: { heading: 'Last updated: May 1, 2023', content: 'Version 1.1' },
			button: 'Get started',
		},
	},
	fr: {
		appName: 'Preuve de concept avec Angular',
		menuItems: { home: "Page d'accueil", register: 'Enregistrer' },
		footer: {
			accessibility: { text: 'Accessibilité', link: 'https://www.ontario.ca/fr/page/accessibilite' },
			privacy: {
				text: 'Confidentialité',
				link: 'https://www.ontario.ca/fr/page/declaration-concernant-la-protection-de-la-vie-privee',
			},
			contactUs: {
				text: 'Contactez-nous',
				link: 'https://www.ontario.ca/fr/commentaires/pour-nous-joindre?id=7471&nid=7583',
			},
		},
		homepage: {
			heading: 'Comment démarrer une preuve de concept avec Angular en utilisant le Système de conception',
			leadStatement:
				'Créez un compte en quatre étapes simples pour vous aider à démarrer vos applications de preuve de concept avec Angular.',
			callout: { heading: 'Dernière mise à jour : 1ᵉʳ mai 2023', content: 'Version 1.1' },
			button: 'Démarrer',
		},
	},
};

/**
 * Mirrors how the original Angular POC translated its own content, but leaves `language` off the header and
 * footer so tests can check that they follow the page language (`<html lang>`) and the header's language toggle.
 */
@Component({
	selector: 'app-language-sync-page',
	templateUrl: './language-sync.component.html',
	imports: [ComponentLibraryModule],
})
export class LanguageSyncPageComponent {
	// `<html lang>` is set before Angular bootstraps, so it is the source of truth on load.
	t = TRANSLATIONS[document.documentElement.lang === 'fr' ? 'fr' : 'en'];
	applicationHeaderInfo = this.getApplicationHeaderInfo();
	menuItems = this.getMenuItems();
	footerLinks = this.getFooterLinks();

	@HostListener('window:headerLanguageToggled', ['$event'])
	onHeaderLanguageToggled(event: Event) {
		this.t = TRANSLATIONS[(event as CustomEvent<{ newLanguage: Language }>).detail.newLanguage];
		this.applicationHeaderInfo = this.getApplicationHeaderInfo();
		this.menuItems = this.getMenuItems();
		this.footerLinks = this.getFooterLinks();
	}

	// The toggle's default `href="#"` resolves against `<base href="/">` and would leave the page.
	preventToggleNavigation = (event: Event) => event.preventDefault();

	private getApplicationHeaderInfo() {
		return { title: this.t.appName, href: '/components/language-sync' };
	}

	private getMenuItems() {
		return [
			{ title: this.t.menuItems.home, href: '/components/language-sync', linkIsActive: true },
			{ title: this.t.menuItems.register, href: '/components/language-sync' },
		];
	}

	private getFooterLinks() {
		const { accessibility, privacy, contactUs } = this.t.footer;

		return {
			accessibilityLink: { text: accessibility.text, href: accessibility.link },
			privacyLink: { text: privacy.text, href: privacy.link },
			contactLink: { text: contactUs.text, href: contactUs.link },
		};
	}
}
