import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { isEnglish } from '../../../utils/get-language.utils';

@Component({
	selector: 'app-frame-one',
	templateUrl: './frameone.component.html',
	standalone: false,
})
export class FrameOneComponent {
	constructor(private translateService: TranslateService) {}

	getRoute(): string {
		const lang = document.documentElement.lang;
		return isEnglish() ? '/create-account' : '/fr/creer-compte';
	}
}
