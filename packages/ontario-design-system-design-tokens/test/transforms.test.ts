import { describe, it, expect } from 'vitest';
import type { TransformedToken } from 'style-dictionary/types';

import { pxToRem, pxToEm, primitiveTransforms } from '../scripts/lib/transforms.ts';

/**
 * Minimal token shape exercised by these unit tests. pxToRem/pxToEm only read
 * `path`/`value`, so the tests call them directly rather than through a full
 * Style Dictionary build (which also supplies config/options/volume args).
 */
type MinimalToken = Pick<TransformedToken, 'path' | 'value'>;
const remTransform = pxToRem.transform as (token: MinimalToken) => string;
const remFilter = pxToRem.filter as (token: MinimalToken) => boolean;
const emTransform = pxToEm.transform as (token: MinimalToken) => string;
const emFilter = pxToEm.filter as (token: MinimalToken) => boolean;

describe('primitive size transforms', () => {
	describe('pxToRem', () => {
		it('converts px values to rem at base 16 for text-relative categories', () => {
			expect(remTransform({ path: ['space'], value: '16px' })).toBe('1rem');
			expect(remTransform({ path: ['radius'], value: '4px' })).toBe('0.25rem');
			expect(remTransform({ path: ['border'], value: '1px' })).toBe('0.0625rem');
		});

		it('only matches the configured categories with px values', () => {
			expect(remFilter({ path: ['space'], value: '16px' })).toBe(true);
			expect(remFilter({ path: ['font'], value: '20px' })).toBe(true);
			expect(remFilter({ path: ['breakpoint'], value: '768px' })).toBe(false);
			expect(remFilter({ path: ['space'], value: '50%' })).toBe(false);
			expect(remFilter({ path: ['elevation'], value: '2px' })).toBe(false);
		});
	});

	describe('pxToEm', () => {
		it('converts breakpoint px values to em at base 16', () => {
			expect(emTransform({ path: ['breakpoint'], value: '768px' })).toBe('48em');
		});

		it('only matches breakpoint px values', () => {
			expect(emFilter({ path: ['breakpoint'], value: '768px' })).toBe(true);
			expect(emFilter({ path: ['space'], value: '16px' })).toBe(false);
		});
	});

	it('registers both transforms with the Style Dictionary value shape', () => {
		expect(primitiveTransforms).toHaveLength(2);
		for (const transform of primitiveTransforms) {
			expect(transform.type).toBe('value');
			expect(typeof transform.name).toBe('string');
			expect(typeof transform.filter).toBe('function');
			expect(typeof transform.transform).toBe('function');
		}
	});
});
