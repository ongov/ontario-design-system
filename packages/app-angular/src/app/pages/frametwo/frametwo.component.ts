import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { getLanguage, isEnglish } from 'src/utils/get-language.utils';
import { TemporaryStorageService } from '../../services/temporary-storage.services';

interface NewAccountFormData {
	email: string;
	pin: string;
}

@Component({
	selector: 'app-frame-two',
	templateUrl: './frametwo.component.html',
})
export class FrameTwoComponent implements OnInit {
	public lang = getLanguage();
	public formData: NewAccountFormData = { email: '', pin: '' };

	constructor(private translateService: TranslateService, private temporaryStorageService: TemporaryStorageService) {}

	getTranslation() {
		const PINHintExpanderLabel = this.translateService.instant('form.questions.createAccount.PINHintExpanderLabel');
		const PINHintExpanderContent = this.translateService.instant('form.questions.createAccount.PINHintExpanderContent');

		return {
			PINHintExpanderLabel,
			PINHintExpanderContent,
		};
	}

	getRoute(): string {
		return isEnglish() ? '/contact-information' : '/fr/coordonnees';
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
