import { ChangeDetectorRef, Component, OnInit, NgZone } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UrlGeneratorService } from './url-generator.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';

import { isAngularPOCEnvironment } from './translation.config';

type AppLanguage = 'en' | 'fr';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	standalone: false,
})
export class AppComponent implements OnInit {
	title = 'app-angular';
	public currentLang: AppLanguage = 'en';
	private languageRequestId = 0;

	constructor(
		private translate: TranslateService,
		private router: Router,
		private zone: NgZone,
		private cdr: ChangeDetectorRef,
		private urlGenerator: UrlGeneratorService,
		private titleService: Title,
	) {
		translate.setDefaultLang('en');
	}

	get footerLinks() {
		const translation = this.getTranslation();

		return {
			accessibilityLink: {
				text: translation.accessibility,
				href: translation.accessibilityLink,
			},
			privacyLink: {
				text: translation.privacy,
				href: translation.privacyLink,
			},
			contactLink: {
				text: translation.contactUs,
				href: translation.contactUsLink,
			},
		};
	}

	getTranslation() {
		const appName = this.translate.instant('header.appName');
		const menuItemOne = this.translate.instant('header.menuItems.home');
		const menuItemTwo = this.translate.instant('header.menuItems.register');
		const accessibility = this.translate.instant('footer.accessibility.text');
		const accessibilityLink = this.translate.instant('footer.accessibility.link');
		const privacy = this.translate.instant('footer.privacy.text');
		const privacyLink = this.translate.instant('footer.privacy.link');
		const termsOfUse = this.translate.instant('footer.termsOfUse.text');
		const termsOfUseLink = this.translate.instant('footer.termsOfUse.link');
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
			termsOfUse,
			termsOfUseLink,
			contactUs,
			contactUsLink,
		};
	}

	getLanguageFromURL(): AppLanguage {
		return window.location.hash.includes('/fr/') ? 'fr' : 'en';
	}

	getRoute() {
		const getStarted = this.currentLang === 'en' ? 'get-started' : 'fr/demarrer';
		const register = this.currentLang === 'en' ? 'create-account' : 'fr/creer-compte';
		const homeIsActive = window.location.hash.includes(getStarted);
		const registerIsActive = window.location.hash.includes(register);

		return {
			home: isAngularPOCEnvironment() ? this.urlGenerator.generateAppUrl(getStarted) : `/#/${getStarted}`,
			register: isAngularPOCEnvironment() ? this.urlGenerator.generateAppUrl(register) : `/#/${register}`,
			homeIsActive,
			registerIsActive,
		};
	}

	useLanguage = (e: Event) => {
		e.preventDefault();
		const language: AppLanguage = this.currentLang === 'en' ? 'fr' : 'en';
		this.setLanguage(language, true);
	};

	private setLanguage(language: AppLanguage, navigateToTranslatedRoute = false) {
		const languageRequestId = ++this.languageRequestId;
		this.currentLang = language;
		// Keeps <html lang> aligned on toggle; the initial value is set in index.html before hydration.
		document.documentElement.lang = language;
		this.translate.setDefaultLang(language);

		this.translate.use(language).subscribe(() => {
			if (languageRequestId !== this.languageRequestId) return;

			this.cdr.detectChanges();

			if (navigateToTranslatedRoute) {
				const routes = this.translate.instant('routes') as Record<string, string>;
				const pathname = window.location.hash.replace('#', '');

				this.zone.run(() => {
					this.router.navigateByUrl(routes[pathname]);
				});
			}
		});
	}

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
		this.setLanguage(this.getLanguageFromURL());

		// Listen for route changes
		this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
			this.updateTitleFromRoute();
		});

		// Initial title update
		this.updateTitleFromRoute();
	}
}
