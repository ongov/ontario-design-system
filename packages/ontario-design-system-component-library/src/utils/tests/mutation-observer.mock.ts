export const mutationObserverMock = jest.fn<MutationObserver, [MutationCallback]>().mockImplementation(() => {
	return {
		observe: jest.fn(),
		disconnect: jest.fn(),
		takeRecords: jest.fn(),
	};
});
