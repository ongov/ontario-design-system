import { Component, Renderer2, OnInit, NgZone, ChangeDetectorRef } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { AppConfigService } from './app-config.service.js';
import { UrlGeneratorService } from './url-generator.service.js';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';

import { getLanguage, isEnglish } from '../utils/get-language.utils.js';

import { isAngularPOCEnvironment } from './translation.config.js';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
	title = 'app-angular';
	public currentLang!: string;

	constructor(
		private translate: TranslateService,
		private renderer: Renderer2,
		private router: Router,
		private zone: NgZone,
		private cdr: ChangeDetectorRef,
		private urlGenerator: UrlGeneratorService,
		private appConfigService: AppConfigService,
		private titleService: Title,
	) {
		translate.setDefaultLang('en');
		translate.use('en');

		translate.onLangChange.subscribe((event: LangChangeEvent) => {
			this.currentLang = event.lang;
			this.cdr.detectChanges();
		});
	}

	getTranslation() {
		const appName = this.translate.instant('header.appName');
		const menuItemOne = this.translate.instant('header.menuItems.home');
		const menuItemTwo = this.translate.instant('header.menuItems.register');
		const accessibility = this.translate.instant('footer.accessibility.text');
		const accessibilityLink = this.translate.instant('footer.accessibility.link');
		const privacy = this.translate.instant('footer.privacy.text');
		const privacyLink = this.translate.instant('footer.privacy.link');
		const contactUs = this.translate.instant('footer.contactUs.text');
		const contactUsLink = this.translate.instant('footer.contactUs.link');

		return {
			appName,
			menuItemOne,
			menuItemTwo,
			accessibility,
			accessibilityLink,
			privacy,
			privacyLink,
			contactUs,
			contactUsLink,
		};
	}

	getLanguageFromURL() {
		return window.location.hash.includes('/fr/') ? 'fr' : 'en';
	}

	getRoute() {
		const getStarted = isEnglish() ? 'get-started' : 'fr/demarrer';
		const register = isEnglish() ? 'create-account' : 'fr/creer-compte';
		const homeIsActive = window.location.hash.includes(getStarted);
		const registerIsActive = window.location.hash.includes(register);

		return {
			home: isAngularPOCEnvironment() ? this.urlGenerator.generateAppUrl(getStarted) : `/#/${getStarted}`,
			register: isAngularPOCEnvironment() ? this.urlGenerator.generateAppUrl(register) : `/#/${register}`,
			homeIsActive,
			registerIsActive,
		};
	}

	useLanguage = (e: any) => {
		e.preventDefault();
		const lang = getLanguage();
		this.translate.use(lang);
		this.translate.setDefaultLang(lang);

		// Manually trigger change detection
		this.cdr.detectChanges();

		// get and navigate to the translated route
		const routes = this.translate.instant(`routes`);

		this.zone.run(() => {
			const pathname = window.location.hash.replace('#', '');
			this.router.navigateByUrl(routes[pathname]);
		});
	};

	updateTitleFromRoute() {
		const route = this.router.routerState.snapshot.root;
		const title = this.getTitleFromRoute(route);
		if (title) {
			this.titleService.setTitle(this.translate.instant(title));
		}
	}

	getTitleFromRoute(route: any): string | null {
		let title = null;
		while (route) {
			if (route.data && route.data.title) {
				title = route.data.title;
			}
			route = route.firstChild;
		}
		return title;
	}

	ngOnInit() {
		const lang = this.getLanguageFromURL();

		// Set the default language
		this.translate.setDefaultLang(lang);
		this.translate.use(lang);

		// Update the header language prop
		const header = document.getElementsByTagName('ontario-header')[0];
		this.renderer.setProperty(header, 'language', lang);

		// Listen for route changes
		this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
			this.updateTitleFromRoute();
		});

		// Initial title update
		this.updateTitleFromRoute();
	}
}
