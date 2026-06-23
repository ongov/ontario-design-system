import { describe, it, expect } from 'vitest';

import { pxToRem, pxToEm, primitiveTransforms } from '../scripts/lib/transforms.mjs';

describe('primitive size transforms', () => {
	describe('pxToRem', () => {
		it('converts px values to rem at base 16 for text-relative categories', () => {
			expect(pxToRem.transform({ path: ['space'], value: '16px' })).toBe('1rem');
			expect(pxToRem.transform({ path: ['radius'], value: '4px' })).toBe('0.25rem');
			expect(pxToRem.transform({ path: ['border'], value: '1px' })).toBe('0.0625rem');
		});

		it('only matches the configured categories with px values', () => {
			expect(pxToRem.filter({ path: ['space'], value: '16px' })).toBe(true);
			expect(pxToRem.filter({ path: ['font'], value: '20px' })).toBe(true);
			expect(pxToRem.filter({ path: ['breakpoint'], value: '768px' })).toBe(false);
			expect(pxToRem.filter({ path: ['space'], value: '50%' })).toBe(false);
			expect(pxToRem.filter({ path: ['elevation'], value: '2px' })).toBe(false);
		});
	});

	describe('pxToEm', () => {
		it('converts breakpoint px values to em at base 16', () => {
			expect(pxToEm.transform({ path: ['breakpoint'], value: '768px' })).toBe('48em');
		});

		it('only matches breakpoint px values', () => {
			expect(pxToEm.filter({ path: ['breakpoint'], value: '768px' })).toBe(true);
			expect(pxToEm.filter({ path: ['space'], value: '16px' })).toBe(false);
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
