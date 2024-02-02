import { Injectable } from '@angular/core';

export abstract class AbstractTemporaryStorageService {
	abstract get<T>(key: string): Promise<T | null>;
	abstract remove(key: string): void;
	abstract set<T>(key: string, value: T): void;
}
