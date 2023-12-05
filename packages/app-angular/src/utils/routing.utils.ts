import { Router } from '@angular/router';

import { getLanguage } from './get-language.utils';

export interface LocationObject {
	en: string;
	fr: string;
	[key: string]: string; // Index signature to allow indexing with any string key
}

export const handleBackButtonNavigationOnClick = (location: LocationObject, router: Router) => {
	const lang = getLanguage();

	if (location?.[lang]) router.navigateByUrl(location[lang]);
};
