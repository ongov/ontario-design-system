import { Injectable } from '@angular/core';
import { TemporaryStorageService } from '../services/temporary-storage.services.js';

@Injectable({
	providedIn: 'root',
})
export class StorageUtilsService {
	constructor(private temporaryStorageService: TemporaryStorageService) {}

	async restoreFromTemporaryStorage<T extends object>(formData: T): Promise<void> {
		const cachedFormData = await this.temporaryStorageService.get<T>('registrationData');
		if (cachedFormData) {
			Object.assign(formData, cachedFormData);
		}
	}

	saveToTemporaryStorage<T>(formData: T): void {
		this.temporaryStorageService.set('registrationData', formData);
	}
}
