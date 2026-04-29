import { getAssetPath } from '@stencil/core';

const assetsPathSegment = '/assets/';

function normalizePath(path: string): string {
	return path.replace(/\/+$/, '');
}

function resolveAssetBasePathFromBaseHref(): string | undefined {
	if (typeof document === 'undefined') {
		return;
	}

	const baseHref = document.querySelector('base[href]')?.getAttribute('href');

	if (!baseHref) {
		return;
	}

	try {
		const baseUrl = new URL(baseHref, window.location.href);
		return normalizePath(new URL(`.${assetsPathSegment}`, baseUrl).pathname);
	} catch {
		return;
	}
}

function resolveAssetBasePathFromLoadedAssets(): string | undefined {
	if (typeof document === 'undefined') {
		return;
	}

	const assetHostElements = Array.from(document.querySelectorAll('script[src], link[href]'));

	for (const element of assetHostElements) {
		const elementSrc = element instanceof HTMLScriptElement ? element.src : (element as HTMLLinkElement).href;

		if (!elementSrc) {
			continue;
		}

		try {
			const { pathname } = new URL(elementSrc, window.location.href);
			const assetsIndex = pathname.indexOf(assetsPathSegment);

			if (assetsIndex === -1) {
				continue;
			}

			return normalizePath(pathname.slice(0, assetsIndex + assetsPathSegment.length));
		} catch {
			continue;
		}
	}
}

function resolveFallbackAssetBasePath(): string | undefined {
	return resolveAssetBasePathFromBaseHref() ?? resolveAssetBasePathFromLoadedAssets();
}

/**
 * Generate the full path to an image asset based on the base asset path.
 *
 * - If `assetBasePath` is provided, it is used as the base path.
 * - If not, attempts to use Stencil's `getAssetPath` (for Stencil/Angular builds).
 * - If that fails (e.g., in React), falls back to `/assets/`, assuming assets are in the public folder.
 *
 * @param imageName - The name of the image file.
 * @param assetBasePath - Optional base path for assets.
 * @returns The full image path as a string.
 */
export function getImageAssetSrcPath(
	imageName: string,
	assetBasePath?: string,
	assetPathResolver: (path: string) => string = getAssetPath,
): string {
	if (assetBasePath) {
		return `${normalizePath(assetBasePath)}/${imageName}`;
	}

	try {
		return assetPathResolver(`./assets/${imageName}`);
	} catch (error) {
		const resolvedAssetBasePath = resolveFallbackAssetBasePath();

		if (resolvedAssetBasePath) {
			console.warn(
				`getAssetPath failed for ${imageName}, falling back to ${resolvedAssetBasePath}/ from document context:`,
				error,
			);
			return `${resolvedAssetBasePath}/${imageName}`;
		}

		console.warn(`getAssetPath failed for ${imageName}, falling back to /assets/:`, error);
		return `/assets/${imageName}`;
	}
}
