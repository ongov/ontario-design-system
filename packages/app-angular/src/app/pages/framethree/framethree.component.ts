import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { getLanguage, isEnglish } from 'src/utils/get-language.utils';
import { handleBackButtonNavigationOnClick } from 'src/utils/routing.utils';

interface RadioButtonOption {
	value: string;
	label: string;
	elementId: string;
	checked: boolean;
}

interface DropdownOption {
	value: string;
	label: string;
	selected: boolean;
}

interface Translation {
	contactType: {
		label: string;
		options: RadioButtonOption[];
	};
}

@Component({
	selector: 'app-framethree',
	templateUrl: './framethree.component.html',
})
export class FrameThreeComponent implements OnInit {
	public lang = getLanguage();
	public selectedRadioValue: string = '';
	public radioOptions: Record<string, RadioButtonOption> = {};

	constructor(
		private translateService: TranslateService,
		private router: Router,
		private changeDetectorRef: ChangeDetectorRef,
		private ngZone: NgZone,
	) {}

	ngOnInit() {
		const storedRadioValue = localStorage.getItem('selectedRadioValue');

		if (storedRadioValue) {
			this.selectedRadioValue = storedRadioValue;
		}
	}

	loadRadioOptions() {
		const storedRadioOptions = localStorage.getItem('radioOptions');
		this.radioOptions = storedRadioOptions ? JSON.parse(storedRadioOptions) : {};
	}

	handleRadioChange(event: Event) {
		const customEvent = event as CustomEvent<any>;
		console.log('custom event detail', customEvent);

		if (customEvent.detail) {
			// Update the component's state
			this.selectedRadioValue = customEvent.detail;

			// Update local storage
			localStorage.setItem('selectedRadioValue', this.selectedRadioValue);
		}
	}

	loadSelectedRadioValue() {
		// Load the selected radio value from localStorage
		const storedRadioValue = localStorage.getItem('selectedRadioValue');
		if (storedRadioValue) {
			this.selectedRadioValue = storedRadioValue;
		}
	}

	generateRadioOptions(): RadioButtonOption[] {
		const translation: Translation = this.getTranslation();
		const contactTypeOptions: RadioButtonOption[] = translation?.contactType?.options || [];

		if (!Array.isArray(contactTypeOptions)) {
			return [];
		}

		const radioOptions = contactTypeOptions.map((option) => {
			return {
				value: option.value,
				label: option.label,
				elementId: option.elementId,
				checked: this.selectedRadioValue === option.value,
			};
		});

		return radioOptions;
	}

	saveRadioOptions() {
		localStorage.setItem('radioOptions', JSON.stringify(this.radioOptions));

		// Manually trigger change detection after saving radio options
		this.changeDetectorRef.detectChanges();
	}

	getSelectedRadioValue() {
		// Get the selected radio value based on the saved options
		const selectedOption = Object.values(this.radioOptions).find((option) => option.checked);
		return selectedOption?.value || '';
	}

	getTranslation(): Translation {
		const contactTypeOptions = this.translateService.instant('form.questions.contactInformation.contactType.options');

		return {
			contactType: {
				label: this.translateService.instant('form.questions.contactInformation.contactType.label'),
				options: contactTypeOptions,
			},
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
