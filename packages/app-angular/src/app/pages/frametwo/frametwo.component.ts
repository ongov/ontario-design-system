import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { StorageUtilsService } from '../../services/storage-utils.services'; // Update the path
import { isEnglish, getLanguage } from 'src/utils/get-language.utils';
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

	constructor(private translateService: TranslateService, private storageUtilsService: StorageUtilsService) {}

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
		await this.storageUtilsService.restoreFromTemporaryStorage(this.formData);
	}

	public saveToTemporaryStorage(): void {
		this.storageUtilsService.saveToTemporaryStorage(this.formData);
	}

	ngOnInit(): void {
		this.restoreFromTemporaryStorage();
	}
}
