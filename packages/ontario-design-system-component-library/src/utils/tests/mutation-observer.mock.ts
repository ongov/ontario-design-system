import { vi } from 'vitest';

export const mutationObserverMock = vi.fn().mockImplementation(function () {
	return {
		observe: vi.fn(),
		disconnect: vi.fn(),
		takeRecords: vi.fn(),
	};
});
