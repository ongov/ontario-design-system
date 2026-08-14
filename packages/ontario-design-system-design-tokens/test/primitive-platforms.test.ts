/**
 * @file Tests for the primitive layer's Style Dictionary output platforms
 * (DS-2691): the `primitives.*` CSS/SCSS/JS/TS entry points built from
 * scripts/config/primitive.config.ts, registered via the transforms in
 * scripts/lib/transforms.ts.
 */
import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import StyleDictionary from 'style-dictionary';

import { primitiveTransforms } from '../scripts/lib/transforms.ts';
import { primitivePlatformsConfig } from '../scripts/config/primitive.config.ts';

const packageRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

// Style Dictionary resolves its `source` glob relative to process.cwd().
beforeAll(() => {
	process.chdir(packageRoot);
	// Always (re-)register: `size/pxToRem` overrides a built-in Style Dictionary
	// transform of the same name, matching build.mjs's unconditional registration.
	for (const transform of primitiveTransforms) {
		StyleDictionary.registerTransform(transform);
	}
});

describe('primitive output platforms', () => {
	it('wraps the CSS output in the ods-tokens layer under an ods- prefix', async () => {
		const sd = new StyleDictionary(primitivePlatformsConfig);
		await sd.hasInitialized;
		await sd.buildAllPlatforms();

		const css = readFileSync(path.join(packageRoot, 'dist', 'css', 'primitives.css'), 'utf8');
		expect(css).toMatch(/@layer ods-tokens\s*{\s*:root\s*{/);
		expect(css).toContain('--ods-space-400: 1rem;');
		expect(css).toContain('--ods-breakpoint-medium: 73em;');
		expect(css).toContain('--ods-z-index-above-high: 4;');
		// Shadow values are not text-relative, so px/hsl composites pass through untouched.
		expect(css).toContain('--ods-elevation-shadow-100: 0 1px 2px hsl(215 45% 20% / 0.14);');
	});

	it('emits matching SCSS variables under the same ods- prefix', () => {
		const scss = readFileSync(path.join(packageRoot, 'dist', 'scss', 'primitives.scss'), 'utf8');
		expect(scss).toContain('$ods-space-400: 1rem;');
		expect(scss).not.toContain('@layer');
	});

	it('emits JS/TS constants with matching values and type declarations', () => {
		const js = readFileSync(path.join(packageRoot, 'dist', 'js', 'primitives.js'), 'utf8');
		const dts = readFileSync(path.join(packageRoot, 'dist', 'ts', 'primitives.d.ts'), 'utf8');

		expect(js).toContain('export const OdsSpace400 = "1rem";');
		expect(dts).toContain('export const OdsSpace400: string;');
	});

	it('leaves the legacy flat outputs untouched (byte-for-byte)', () => {
		const legacyCss = readFileSync(path.join(packageRoot, 'legacy', 'css', '_variables.css'), 'utf8');
		const distCss = readFileSync(path.join(packageRoot, 'dist', 'css', '_variables.css'), 'utf8');
		expect(distCss).toBe(legacyCss);
	});

	it('resolves the new primitive entry points from the package exports map', () => {
		const pkg = JSON.parse(readFileSync(path.join(packageRoot, 'package.json'), 'utf8'));
		expect(pkg.exports['./css/primitives'].style).toBe('./dist/css/primitives.css');
		expect(pkg.exports['./scss/primitives'].sass).toBe('./dist/scss/primitives.scss');
		expect(pkg.exports['./primitives'].types).toBe('./dist/ts/primitives.d.ts');
	});
});
