import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { getLanguage, isEnglish } from 'src/utils/get-language.utils';
import { handleBackButtonNavigationOnClick } from 'src/utils/routing.utils';

@Component({
	selector: 'app-framefour',
	templateUrl: './framefour.component.html',
})
export class FramefourComponent {
	public lang = getLanguage();

	constructor(private translateService: TranslateService, private router: Router) {}

	getTranslation() {
		const describeRoleLabel = this.translateService.instant('form.questions.describeRole.label');
		const describeRoleOptions = this.translateService.instant('form.questions.describeRole.options');

		return {
			describeRoleLabel,
			describeRoleOptions,
		};
	}

	getRoute(): string {
		return isEnglish() ? '/additional-details' : '/fr/details-supplementaires';
	}

	// Function to handle the custom click event for the back button
	handleBackNavigation() {
		handleBackButtonNavigationOnClick(
			{
				en: '/contact-information',
				fr: '/fr/coordonnees',
			},
			this.router,
		);
	}
}
