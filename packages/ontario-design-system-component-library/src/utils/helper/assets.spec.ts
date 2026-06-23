import { getImageAssetSrcPath } from './assets';

describe('getImageAssetSrcPath', () => {
	const imageName = 'ontario-material-dropdown-arrow-48px.svg';

	beforeEach(() => {
		document.head.innerHTML = '';
		document.body.innerHTML = '';
		// The Stencil test environment leaves `window.location.href` empty, which makes
		// `new URL(path, window.location.href)` throw. Seed a valid origin so the asset
		// path resolution behaves like a real browser.
		(window as unknown as { location: { href: string } }).location.href = 'http://localhost:3000/';
	});

	it('returns asset path from explicit assetBasePath when provided', () => {
		const result = getImageAssetSrcPath(imageName, '/developer-docs/assets/');

		expect(result).toBe('/developer-docs/assets/ontario-material-dropdown-arrow-48px.svg');
	});

	it('returns stencil asset path when getAssetPath succeeds', () => {
		const resolver = vi.fn().mockReturnValue('/build/assets/ontario-material-dropdown-arrow-48px.svg');

		const result = getImageAssetSrcPath(imageName, undefined, resolver);

		expect(result).toBe('/build/assets/ontario-material-dropdown-arrow-48px.svg');
		expect(resolver).toHaveBeenCalledWith('./assets/ontario-material-dropdown-arrow-48px.svg');
	});

	it('falls back using base href when getAssetPath fails', () => {
		const resolver = vi.fn(() => {
			throw new Error('asset path unavailable');
		});
		document.head.innerHTML = '<base href="/developer-docs/">';

		const result = getImageAssetSrcPath(imageName, undefined, resolver);

		expect(result).toBe('/developer-docs/assets/ontario-material-dropdown-arrow-48px.svg');
	});

	it('falls back using loaded asset URLs when base href is unavailable', () => {
		const resolver = vi.fn(() => {
			throw new Error('asset path unavailable');
		});
		document.head.innerHTML = '<script src="/developer-docs/assets/js/common.js"></script>';

		const result = getImageAssetSrcPath(imageName, undefined, resolver);

		expect(result).toBe('/developer-docs/assets/ontario-material-dropdown-arrow-48px.svg');
	});

	it('falls back to root assets when no document hint is available', () => {
		const resolver = vi.fn(() => {
			throw new Error('asset path unavailable');
		});

		const result = getImageAssetSrcPath(imageName, undefined, resolver);

		expect(result).toBe('/assets/ontario-material-dropdown-arrow-48px.svg');
	});
});
