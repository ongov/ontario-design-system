import { AppConstants } from '../app/app.constants.js';

export const environment = {
	staging: false,
	prod: true,
	translationPath: `${AppConstants.BASE_URL_SEGMENT}/assets/i18n/`,
};
