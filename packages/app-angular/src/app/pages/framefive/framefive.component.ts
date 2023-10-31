import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { getLanguage, isEnglish } from 'src/utils/get-language.utils';
import { handleBackButtonNavigationOnClick } from 'src/utils/routing.utils';

@Component({
	selector: 'app-framefive',
	templateUrl: './framefive.component.html',
})
export class FramefiveComponent {
	public lang = getLanguage();

	constructor(private translateService: TranslateService, private router: Router) {}

	getTranslation() {
		const additionalDetailsLabel = this.translateService.instant('form.questions.additionalDetails.label');

		return {
			additionalDetailsLabel,
		};
	}

	getRoute(): string {
		return isEnglish() ? '/account-creation' : '/fr/creation-de-compte';
	}

	// Function to handle the custom click event for the back button
	handleBackNavigation() {
		handleBackButtonNavigationOnClick(
			{
				en: '/describe-role',
				fr: '/fr/decrivez-role',
			},
			this.router,
		);
	}
}
