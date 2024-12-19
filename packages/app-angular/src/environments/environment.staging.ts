import { AppConstants } from '../app/app.constants.js';

export const environment = {
	staging: true,
	prod: false,
	translationPath: `${AppConstants.BASE_URL_SEGMENT}/assets/i18n/`,
};
