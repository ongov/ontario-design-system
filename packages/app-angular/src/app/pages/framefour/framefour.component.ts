import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { getLanguage, isEnglish } from 'src/utils/get-language.utils';
import { handleBackButtonNavigationOnClick } from 'src/utils/routing.utils';

@Component({
	selector: 'app-framefour',
	templateUrl: './framefour.component.html',
})
export class FrameFourComponent implements OnInit {
	public lang = getLanguage();
	private checkboxStates: Record<string, boolean> = {};

	constructor(private translateService: TranslateService, private router: Router) {}

	ngOnInit() {
		// Initialize checkbox states from localStorage on component load
		document.addEventListener('checkboxChange', (event: Event) => {
			this.handleCheckboxChange(event as CustomEvent); // Cast the event to CustomEvent
		});
	}

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

	// Function to handle any changes in the Checkbox
	handleCheckboxChange(event: any) {
		// Check if the event has detail property
		if (event.detail) {
			const { id, checked } = event.detail;
			this.checkboxStates[id] = checked;
			this.saveCheckboxStates();
		}
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

	private saveCheckboxStates() {
		localStorage.setItem('checkboxStates', JSON.stringify(this.checkboxStates));
	}
}
