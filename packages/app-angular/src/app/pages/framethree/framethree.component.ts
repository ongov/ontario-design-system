import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { getLanguage, isEnglish } from '../../../utils/get-language.utils';
import { handleBackButtonNavigationOnClick } from '../../../utils/routing.utils';

interface RadioButtonOption {
	value: string;
	label: string;
	elementId: string;
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
	standalone: false,
})
export class FrameThreeComponent implements OnInit {
	public lang = getLanguage();
	public selectedRadioValue: string = '';
	public radioOptions: RadioButtonOption[] = [];

	constructor(
		private translateService: TranslateService,
		private router: Router,
		private changeDetectorRef: ChangeDetectorRef,
		private ngZone: NgZone,
	) {}

	ngOnInit() {
		this.loadRadioOptions();
		this.loadSelectedRadioValue();
		this.changeDetectorRef.detectChanges();

		// Listen for the custom radioOnChange event
		document.addEventListener('radioOnChange', (event: Event) => {
			this.ngZone.run(() => {
				this.handleRadioChange(event as CustomEvent);
			});
		});
	}

	loadRadioOptions() {
		const translation: Translation = this.getTranslation();
		this.radioOptions = translation?.contactType?.options || [];
	}

	handleRadioChange(event: CustomEvent) {
		if (event) {
			const { id } = event.detail;
			this.ngZone.run(() => {
				this.updateRadioOptionState(id);
			});
		}
	}

	updateRadioOptionState(id: string) {
		this.selectedRadioValue = id;
		this.saveSelectedRadioValue();
	}

	loadSelectedRadioValue() {
		const storedRadioValue = localStorage.getItem('selectedRadioValue');
		if (storedRadioValue) {
			this.selectedRadioValue = storedRadioValue;
		}
	}

	saveSelectedRadioValue() {
		localStorage.setItem('selectedRadioValue', this.selectedRadioValue);
	}

	getSelectedRadioValue() {
		return this.selectedRadioValue;
	}

	generateRadioOptions(): RadioButtonOption[] {
		const translation: Translation = this.getTranslation();
		const contactTypeOptions: RadioButtonOption[] = translation?.contactType?.options || [];

		if (!Array.isArray(contactTypeOptions)) {
			return [];
		}

		this.radioOptions = contactTypeOptions.map((option) => {
			return {
				value: option.value,
				label: option.label,
				elementId: option.elementId,
				checked: this.selectedRadioValue === option.value,
			};
		});

		return this.radioOptions;
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
