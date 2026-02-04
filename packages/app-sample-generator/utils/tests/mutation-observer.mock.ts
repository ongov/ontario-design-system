import { jest } from '@jest/globals';

// A function that, when called with a callback, returns a MutationObserver-like object
type CreateMutationObserver = (callback: MutationCallback) => MutationObserver;

export const mutationObserverMock = jest.fn<CreateMutationObserver>().mockImplementation((_cb) => ({
	observe: jest.fn<(target: Node, options?: MutationObserverInit) => void>(),
	disconnect: jest.fn<() => void>(),
	takeRecords: jest.fn<() => MutationRecord[]>().mockReturnValue([]),
}));
