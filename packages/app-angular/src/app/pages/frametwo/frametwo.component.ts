import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { getLanguage, isEnglish } from 'src/utils/get-language.utils';

@Component({
	selector: 'app-frame-two',
	templateUrl: './frametwo.component.html',
})
export class FrametwoComponent {
	public lang = getLanguage();

	constructor(private translateService: TranslateService) {}

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
}
