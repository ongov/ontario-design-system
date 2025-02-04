import { Injectable, NgZone } from '@angular/core';
import { AbstractTemporaryStorageService } from './abstract-temporary-storage.services';

interface StorageWrapper {
	get<T>(key: string): Promise<T | null>;
	remove(key: string): void;
	set(key: string, value: any): void;
}

interface StorageCache {
	[key: string]: any;
}

@Injectable({
	providedIn: 'root',
})
export class TemporaryStorageService extends AbstractTemporaryStorageService {
	private storage: StorageWrapper;
	private key: string;

	constructor(zone: NgZone) {
		super();
		this.storage = window.sessionStorage ? new SessionStorageWrapper(zone) : new InMemoryWrapper();
		this.key = 'registrationData'; // Initialize the key here
	}

	async get<T>(key: string): Promise<T | null> {
		return this.storage.get<T>(key);
	}

	remove(key: string): void {
		this.storage.remove(key);
	}

	async set<T>(key: string, value: T): Promise<void> {
		this.storage.set(key, value);
	}
}

@Injectable({
	providedIn: 'root',
})
class SessionStorageWrapper implements StorageWrapper {
	private debounceDuration: number;
	private cache: StorageCache;
	private storageKey: string;
	private timerID: number | null = null;

	constructor(zone: NgZone) {
		this.debounceDuration = 1000; // 1-second.
		this.cache = Object.create(null);
		this.storageKey = 'temp_session_storage';

		this.loadFromCache();
	}

	async get<T>(key: string): Promise<T | null> {
		return <T>this.cache[key] ?? null;
	}

	remove(key: string): void {
		if (key in this.cache) {
			delete this.cache[key];
			this.persistToCache();
		}
	}

	set(key: string, value: any): void {
		this.cache[key] = value;
		this.persistToCache();
	}

	private debounceOutsideNgZone(callback: Function): void {
		if (this.timerID !== null) {
			clearTimeout(this.timerID);
		}

		this.timerID = window.setTimeout(() => {
			this.timerID = null;
			callback();
		}, this.debounceDuration);
	}

	private loadFromCache(): void {
		try {
			const serializedCache = sessionStorage.getItem(this.storageKey);
			if (serializedCache) {
				Object.assign(this.cache, <StorageCache>JSON.parse(serializedCache));
			}
		} catch (error) {
			console.warn('SessionStorageWrapper was unable to read from SessionStorage API.');
			console.error(error);
		}
	}

	private persistToCache(): void {
		this.debounceOutsideNgZone(() => {
			try {
				if (this.timerID) {
					clearTimeout(this.timerID);
					this.timerID = null;
				}

				sessionStorage.setItem(this.storageKey, JSON.stringify(this.cache));
			} catch (error) {
				console.warn('SessionStorageWrapper was unable to write to SessionStorage API.');
				console.error(error);
			}
		});
	}
}

class InMemoryWrapper implements StorageWrapper {
	private cache: StorageCache;

	constructor() {
		this.cache = Object.create(null);
	}

	async get<T>(key: string): Promise<T | null> {
		return <T>this.cache[key] ?? null;
	}

	remove(key: string): void {
		delete this.cache[key];
	}

	set(key: string, value: any): void {
		this.cache[key] = value;
	}
}
