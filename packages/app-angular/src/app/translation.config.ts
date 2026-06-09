import { AppConstants } from './app.constants';
import { environment } from '../environments/environment';

export function isAngularPOCEnvironment() {
	return environment.translationPath.includes(AppConstants.BASE_URL_SEGMENT);
}
