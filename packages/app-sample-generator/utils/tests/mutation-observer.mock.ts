// A function that, when called with a callback, returns a MutationObserver-like object
// Simple mock implementation that doesn't depend on Jest
export const mutationObserverMock = class MutationObserverMock {
	constructor(callback: MutationCallback) {}
	observe() {}
	disconnect() {}
	takeRecords() {
		return [];
	}
} as any;
