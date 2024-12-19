import { Injectable } from '@angular/core';
import { AppConstants } from './app.constants.js';

@Injectable({
	providedIn: 'root',
})
export class AppConfigService {
	public baseUrlSegment = AppConstants.BASE_URL_SEGMENT;
}
