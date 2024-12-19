import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppConstants } from './app.constants.js';

import { environment } from '../environments/environment.js';

export function createTranslateLoader(http: HttpClient) {
	return new TranslateHttpLoader(http, environment.translationPath, '.json');
}

export function isAngularPOCEnvironment() {
	return environment.translationPath.includes(AppConstants.BASE_URL_SEGMENT);
}
