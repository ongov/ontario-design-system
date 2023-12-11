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
	provinceTerritory: {
		label: string;
		options: DropdownOption[];
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
	public selectedDropdownValue: string = '';
	public dropdownOptions: Record<string, DropdownOption> = {};

	constructor(
		private translateService: TranslateService,
		private router: Router,
		private changeDetectorRef: ChangeDetectorRef,
		private ngZone: NgZone,
	) {}

	ngOnInit() {
		const storedRadioValue = localStorage.getItem('selectedRadioValue');
		const storedDropdownValue = localStorage.getItem('selectedDropdownValue');

		if (storedRadioValue) {
			this.selectedRadioValue = storedRadioValue;
		}

		if (storedDropdownValue) {
			this.selectedDropdownValue = storedDropdownValue;
		}

		// Log the dropdown value and options
		console.log('Dropdown Value on Page Refresh:', this.selectedDropdownValue);
		console.log('Dropdown Options on Page Refresh:', this.dropdownOptions);
	}

	loadRadioOptions() {
		const storedRadioOptions = localStorage.getItem('radioOptions');
		this.radioOptions = storedRadioOptions ? JSON.parse(storedRadioOptions) : {};
	}

	loadDropdownOptions() {
		const storedDropdownOptions = localStorage.getItem('dropdownOptions');
		this.dropdownOptions = storedDropdownOptions ? JSON.parse(storedDropdownOptions) : [];
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

	handleDropdownChange(event: Event) {
		const customEvent = event as CustomEvent<string>;

		if (customEvent.detail) {
			this.selectedDropdownValue = customEvent.detail;
			localStorage.setItem('selectedDropdownValue', this.selectedDropdownValue);
		}
	}

	loadSelectedRadioValue() {
		// Load the selected radio value from localStorage
		const storedRadioValue = localStorage.getItem('selectedRadioValue');
		if (storedRadioValue) {
			this.selectedRadioValue = storedRadioValue;
		}
	}

	loadSelectedDropdownValue() {
		// Load the selected dropdown value from localStorage
		const storedDropdownValue = localStorage.getItem('selectedDropdownValue');
		if (storedDropdownValue) {
			this.selectedDropdownValue = storedDropdownValue;
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

	generateDropdownOptions(): DropdownOption[] {
		const translation: Translation = this.getTranslation();
		const dropdownOptions: DropdownOption[] = translation?.provinceTerritory?.options || [];

		if (!Array.isArray(dropdownOptions)) {
			return [];
		}

		const mappedOptions = dropdownOptions.map((option) => {
			const isSelected = this.selectedDropdownValue === option.value;
			return {
				value: option.value,
				label: option.label,
				selected: isSelected,
			};
		});

		// this.changeDetectorRef.detectChanges();

		return mappedOptions;
	}

	saveRadioOptions() {
		localStorage.setItem('radioOptions', JSON.stringify(this.radioOptions));

		// Manually trigger change detection after saving radio options
		this.changeDetectorRef.detectChanges();
	}

	saveDropdownOptions() {
		localStorage.setItem('dropdownOptions', JSON.stringify(this.dropdownOptions));

		// Manually trigger change detection after saving dropdown options
		this.changeDetectorRef.detectChanges();
	}

	getSelectedRadioValue() {
		// Get the selected radio value based on the saved options
		const selectedOption = Object.values(this.radioOptions).find((option) => option.checked);
		return selectedOption?.value || '';
	}

	getSelectedDropdownValue() {
		const selectedOption = Object.values(this.dropdownOptions).find((option) => option.selected);

		// Get the selected dropdown value based on the saved options
		return selectedOption?.value || '';
	}

	getTranslation(): Translation {
		const contactTypeOptions = this.translateService.instant('form.questions.contactInformation.contactType.options');
		const dropdownOptions = this.translateService.instant(
			'form.questions.contactInformation.provinceTerritory.options',
		); // Adjust the translation key

		return {
			contactType: {
				label: this.translateService.instant('form.questions.contactInformation.contactType.label'),
				options: contactTypeOptions,
			},
			provinceTerritory: {
				label: this.translateService.instant('form.questions.contactInformation.provinceTerritory.options'),
				options: dropdownOptions,
			},
		};
	}

	getRoute(): string {
		return isEnglish() ? '/describe-role' : '/fr/decrivez-role';
	}

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
