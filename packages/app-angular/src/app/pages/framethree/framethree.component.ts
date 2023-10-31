import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { getLanguage, isEnglish } from 'src/utils/get-language.utils';
import { handleBackButtonNavigationOnClick } from 'src/utils/routing.utils';

@Component({
	selector: 'app-framethree',
	templateUrl: './framethree.component.html',
})
export class FramethreeComponent {
	public lang = getLanguage();

	constructor(private translateService: TranslateService, private router: Router) {}

	getTranslation() {
		const contactTypeOptions = this.translateService.instant('form.questions.contactInformation.contactType.options');
		const provinceTerritoryOptions = this.translateService.instant(
			'form.questions.contactInformation.provinceTerritory.options',
		);

		return {
			contactTypeOptions,
			provinceTerritoryOptions,
		};
	}

	getRoute(): string {
		return isEnglish() ? '/describe-role' : '/fr/decrivez-role';
	}

	// Function to handle the custom click event for the back button
	handleBackNavigation() {
		handleBackButtonNavigationOnClick(
			{
				en: '/create-account',
				fr: '/fr/creer-compte',
			},
			this.router,
		);
	}
}
