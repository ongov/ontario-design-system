import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { getLanguage, isEnglish } from 'src/utils/get-language.utils';
import { handleBackButtonNavigationOnClick } from 'src/utils/routing.utils';

interface CheckboxOption {
	value: string;
	label: string;
	elementId: string;
	checked: boolean;
}

// Assuming a type for describeRole options
interface DescribeRoleOption {
	value: string;
	label: string;
	elementId: string;
}

// Assuming a type for describeRole
interface DescribeRole {
	label: string;
	options: DescribeRoleOption[];
}

// Assuming a type for the entire translation object
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
	private boundHandleCheckboxChange = this.handleCheckboxChange.bind(this);

	constructor(
		private translateService: TranslateService,
		private router: Router,
		private changeDetectorRef: ChangeDetectorRef,
		private ngZone: NgZone,
	) {}

	ngOnInit() {
		try {
			const storedCheckboxStates = localStorage.getItem('checkboxStates');
			this.checkboxStates = storedCheckboxStates ? JSON.parse(storedCheckboxStates) : {};

			// Manually trigger change detection
			this.changeDetectorRef.detectChanges();
		} catch (error) {
			console.error('Error retrieving checkbox states from localStorage:', error);
		}

		document.addEventListener('checkboxChange', (event: Event) => {
			this.ngZone.run(() => {
				this.handleCheckboxChange(event as CustomEvent);
			});
		});

		document.addEventListener('checkboxChange', this.handleCheckboxChange.bind(this));
	}

	loadCheckboxStates() {
		const storedCheckboxStates = localStorage.getItem('checkboxStates');
		this.checkboxStates = storedCheckboxStates ? JSON.parse(storedCheckboxStates) : {};
	}

	handleCheckboxChange(event: any) {
		if (event.detail) {
			const { id, checked } = event.detail;
			this.ngZone.run(() => {
				this.checkboxStates = { ...this.checkboxStates, [id]: checked };
				this.saveCheckboxStates();
			});
		}
	}

	generateOptions(): CheckboxOption[] {
		const translation: Translation = this.getTranslation();
		const describeRoleOptions: DescribeRoleOption[] = translation?.describeRole?.options || [];

		if (!Array.isArray(describeRoleOptions)) {
			return [];
		}

		return describeRoleOptions.map((option) => {
			return {
				value: option.value,
				label: option.label,
				elementId: option.elementId,
				checked: this.checkboxStates[option.elementId] ?? false,
			};
		});
	}

	saveCheckboxStates() {
		localStorage.setItem('checkboxStates', JSON.stringify(this.checkboxStates));

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
