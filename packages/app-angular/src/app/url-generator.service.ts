import { AppConfigService } from './app-config.service';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class UrlGeneratorService {
	constructor(private appConfigService: AppConfigService) {}

	generateAppUrl(route: string): string {
		const baseLink = this.appConfigService.baseUrlSegment;

		return `${baseLink}/#${route}`;
	}
}
