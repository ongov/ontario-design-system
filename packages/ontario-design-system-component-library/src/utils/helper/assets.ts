import { getAssetPath } from '@stencil/core';

const assetsPathSegment = '/assets/';

/**
 * Remove trailing slashes so path segments can be joined consistently.
 *
 * @param path - The path to normalize.
 * @returns The path without trailing slashes.
 */
function normalizePath(path: string): string {
	return path.replace(/\/+$/, '');
}

/**
 * Resolve the assets base path from the document base href when the app is
 * mounted under a subpath.
 *
 * @returns The normalized assets base path when a usable base href exists.
 */
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

/**
 * Inspect loaded scripts and stylesheets to recover the current assets base
 * path from URLs already present in the document.
 *
 * @returns The normalized assets base path when one can be inferred.
 */
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

	return;
}

/**
 * Try document-derived asset base paths before falling back to the legacy
 * root-level assets directory.
 *
 * @returns The normalized assets base path when one can be inferred.
 */
function resolveFallbackAssetBasePath(): string | undefined {
	return resolveAssetBasePathFromBaseHref() ?? resolveAssetBasePathFromLoadedAssets();
}

/**
 * Generate the full path to an image asset based on the base asset path.
 *
 * - If `assetBasePath` is provided, it is used as the base path.
 * - If not, attempts to use Stencil's `getAssetPath` (for Stencil/Angular builds).
 * - If that fails, attempts to recover the asset base path from the current
 *   document context before falling back to `/assets/`.
 *
 * @param imageName - The name of the image file.
 * @param assetBasePath - Optional base path for assets.
 * @param assetPathResolver - Injectable resolver used for testability.
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
