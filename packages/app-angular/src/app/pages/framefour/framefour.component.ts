import { Component, OnInit, ChangeDetectorRef, NgZone, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { getLanguage, isEnglish } from 'src/utils/get-language.utils.js';
import { handleBackButtonNavigationOnClick } from 'src/utils/routing.utils.js';

interface CheckboxOption {
	value: string;
	label: string;
	elementId: string;
	checked: boolean;
}

interface DescribeRoleOption {
	value: string;
	label: string;
	elementId: string;
}

interface DescribeRole {
	label: string;
	options: DescribeRoleOption[];
}

interface Translation {
	describeRole: DescribeRole;
}

@Component({
	selector: 'app-framefour',
	templateUrl: './framefour.component.html',
})
export class FrameFourComponent implements OnInit {
	public lang = getLanguage();
	public checkboxStates: Record<string, boolean> = {};

	constructor(
		private translateService: TranslateService,
		private router: Router,
		private changeDetectorRef: ChangeDetectorRef,
		private ngZone: NgZone,
	) {}

	ngOnInit() {
		this.loadCheckboxStates();
		this.changeDetectorRef.detectChanges();

		document.addEventListener('checkboxOnChange', (event: Event) => {
			this.ngZone.run(() => {
				this.handleCheckboxOnChange(event as CustomEvent);
			});
		});
	}

	loadCheckboxStates() {
		const storedCheckboxStates = localStorage.getItem('checkboxStates');

		try {
			this.checkboxStates = storedCheckboxStates ? JSON.parse(storedCheckboxStates) : {};
		} catch (error) {
			console.error('Error parsing storedCheckboxStates:', error);
		}
	}

	handleCheckboxOnChange(event: any) {
		if (event) {
			const { id, checked } = event.detail;
			this.ngZone.run(() => {
				this.updateCheckboxState(id, checked);
			});
		}
	}

	updateCheckboxState(id: string, checked: boolean) {
		this.checkboxStates = { ...this.checkboxStates, [id]: checked };
		this.saveCheckboxStates();
	}

	generateOptions(): CheckboxOption[] {
		const translation: Translation = this.getTranslation();
		const describeRoleOptions: DescribeRoleOption[] = translation?.describeRole?.options || [];

		if (!Array.isArray(describeRoleOptions)) {
			return [];
		}

		const options = describeRoleOptions.map((option) => {
			return {
				value: option.value,
				label: option.label,
				elementId: option.elementId,
				checked: this.checkboxStates[option.elementId] ?? false,
			};
		});

		return options;
	}

	saveCheckboxStates() {
		try {
			localStorage.setItem('checkboxStates', JSON.stringify(this.checkboxStates));
		} catch (error) {
			console.error('Error saving checkbox states to localStorage:', error);
		}

		// Manually trigger change detection after saving checkbox states
		this.changeDetectorRef.detectChanges();
	}

	getCheckboxState(id: string): boolean {
		return this.checkboxStates[id] || false;
	}

	getTranslation(): Translation {
		const describeRoleLabel = this.translateService.instant('form.questions.describeRole.label');
		const describeRoleOptions: DescribeRoleOption[] = this.translateService.instant(
			'form.questions.describeRole.options',
		);

		return {
			describeRole: {
				label: describeRoleLabel,
				options: describeRoleOptions,
			},
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
