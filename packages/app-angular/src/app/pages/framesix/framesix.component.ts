import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { getLanguage, isEnglish } from 'src/utils/get-language.utils';

@Component({
	selector: 'app-framesix',
	templateUrl: './framesix.component.html',
})
export class FramesixComponent {
	isLoading: boolean = false;
	public lang = getLanguage();

	// Example: Call startLoading when the component is initialized
	ngOnInit() {
		this.startLoading();
	}

	startLoading() {
		this.isLoading = true;
		setTimeout(() => {
			this.isLoading = false;
		}, 3000);
	}

	getRoute() {
		return isEnglish()
			? {
					createAccount: '/create-account',
					login: '/get-started',
			  }
			: {
					createAccount: '/fr/creer-compte',
					login: '/fr/demarrer',
			  };
	}
}
