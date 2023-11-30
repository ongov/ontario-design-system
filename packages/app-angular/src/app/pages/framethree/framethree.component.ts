import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { getLanguage, isEnglish } from 'src/utils/get-language.utils';
import { handleBackButtonNavigationOnClick } from 'src/utils/routing.utils';

@Component({
	selector: 'app-framethree',
	templateUrl: './framethree.component.html',
})
export class FrameThreeComponent {
	public lang = getLanguage();
	selectedRadioValue: string = '';

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

	ngOnInit() {
		console.log('ngOnInit called');

		const storedValue = localStorage.getItem('selectedRadioValue');

		if (storedValue) {
			console.log('Stored value found:', storedValue);
			this.selectedRadioValue = storedValue;
		} else {
			console.log('No stored value found');
		}
	}

	handleSelectedRadioChange(event: Event) {
		const customEvent = event as CustomEvent<any>;

		if (customEvent.detail) {
			console.log('Selected value changed:', customEvent.detail);

			// Handle the selected radio button value here

			// Update the component's state
			this.selectedRadioValue = customEvent.detail;

			// Update local storage
			localStorage.setItem('selectedRadioValue', customEvent.detail);
		}
	}

	private loadSelectedRadioValue() {
		// Load the selected radio value from localStorage
		const storedValue = localStorage.getItem('selectedRadioValue');
		if (storedValue) {
			this.selectedRadioValue = storedValue;
		}
	}
}
