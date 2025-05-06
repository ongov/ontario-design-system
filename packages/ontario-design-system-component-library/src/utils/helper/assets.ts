import { getAssetPath } from '@stencil/core';

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
export function getImageAssetSrcPath(imageName: string, assetBasePath?: string): string {
	if (assetBasePath) {
		return `${assetBasePath.replace(/\/$/, '')}/${imageName}`;
	}

	try {
		return getAssetPath(`./assets/${imageName}`);
	} catch (error) {
		console.warn(`getAssetPath failed for ${imageName}, falling back to /assets/:`, error);
		return `/assets/${imageName}`;
	}
}
