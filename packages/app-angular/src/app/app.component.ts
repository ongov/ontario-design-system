import { Component, Renderer2, OnInit, NgZone, ChangeDetectorRef } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { AppConfigService } from './app-config.service';
import { UrlGeneratorService } from './url-generator.service';
import { Router } from '@angular/router';

import { getLanguage, isEnglish } from '../utils/get-language.utils';

import { isAngularPOCEnvironment } from './translation.config';

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
		const contactUs = this.translate.instant('footer.contactUs.text');
		const contactUsLink = this.translate.instant('footer.contactUs.link');

		return {
			appName,
			menuItemOne,
			menuItemTwo,
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

		return {
			home: isAngularPOCEnvironment() ? this.urlGenerator.generateAppUrl(getStarted) : `/#/${getStarted}`,
			register: isAngularPOCEnvironment() ? this.urlGenerator.generateAppUrl(register) : `/#/${register}`,
			homeIsActive: window.location.hash.includes(this.urlGenerator.generateAppUrl(getStarted)),
			registerIsActive: window.location.hash.includes(this.urlGenerator.generateAppUrl(register)),
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

	ngOnInit() {
		const lang = this.getLanguageFromURL();

		// Set the default language
		this.translate.setDefaultLang(lang);
		this.translate.use(lang);

		// update the header language prop
		const header = document.getElementsByTagName('ontario-header')[0];
		this.renderer.setProperty(header, 'language', lang);
	}
}
