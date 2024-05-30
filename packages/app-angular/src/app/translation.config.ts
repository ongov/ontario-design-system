import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { environment } from '../environments/environment';

export function createTranslateLoader(http: HttpClient) {
	return new TranslateHttpLoader(http, environment.translationPath, '.json');
}

export function isAngularPOCEnvironment() {
	return environment.translationPath.includes('/form-demo-angular/');
}
