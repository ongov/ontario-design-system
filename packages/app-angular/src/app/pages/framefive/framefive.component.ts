import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { getLanguage, isEnglish } from 'src/utils/get-language.utils';
import { handleBackButtonNavigationOnClick } from 'src/utils/routing.utils';
import { TemporaryStorageService } from '../../services/temporary-storage.services';

interface NewAccountFormData {
	additionalDetails: string;
}

@Component({
	selector: 'app-framefive',
	templateUrl: './framefive.component.html',
})
export class FrameFiveComponent implements OnInit {
	public lang = getLanguage();
	public formData: NewAccountFormData = { additionalDetails: '' };

	constructor(
		private translateService: TranslateService,
		private temporaryStorageService: TemporaryStorageService,
		private router: Router,
	) {}

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

	public async restoreFromTemporaryStorage(): Promise<void> {
		const cachedFormData = await this.temporaryStorageService.get<NewAccountFormData>('registrationData');
		if (cachedFormData) {
			Object.assign(this.formData, cachedFormData);
		}
	}

	public saveToTemporaryStorage(): void {
		this.temporaryStorageService.set('registrationData', this.formData);
	}

	ngOnInit(): void {
		this.restoreFromTemporaryStorage();
	}
}
