import { vi } from 'vitest';
import { validateFixedIconColour, validateIconColour, validateIconWidth } from '../icon-validation';

describe('shared icon validation', () => {
	afterEach(() => vi.restoreAllMocks());

	it('preserves positive widths, including existing non-preset widths', () => {
		expect(validateIconWidth(36, 'ontario-icon-search')).toBe(36);
	});

	it.each([0, -1, Number.NaN])('falls back to 24 for invalid width %s', (width) => {
		const warning = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
		expect(validateIconWidth(width, 'ontario-icon-search')).toBe(24);
		expect(warning).toHaveBeenCalledOnce();
	});

	it('accepts theme tokens and custom CSS colours', () => {
		expect(validateIconColour('inherit', 'ontario-icon-search')).toEqual({ colour: 'inherit' });
		expect(validateIconColour('#123456', 'ontario-icon-search')).toEqual({ customColour: '#123456' });
	});

	it('warns and falls back to black for an invalid colour', () => {
		const warning = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
		expect(validateIconColour('not-a-colour', 'ontario-icon-search')).toEqual({ colour: 'black' });
		expect(warning).toHaveBeenCalledOnce();
	});

	it('falls back to the icon default colour when one is supplied', () => {
		const warning = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
		expect(validateIconColour('not-a-colour', 'ontario-icon-menu-header', 'white')).toEqual({ colour: 'white' });
		expect(warning).toHaveBeenCalledOnce();
	});

	it('warns for a colour attribute on a fixed-colour icon only when supplied', () => {
		const warning = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
		const host = document.createElement('div');
		validateFixedIconColour(host, 'ontario-icon-alert-error');
		expect(warning).not.toHaveBeenCalled();
		host.setAttribute('colour', 'blue');
		validateFixedIconColour(host, 'ontario-icon-alert-error');
		expect(warning).toHaveBeenCalledOnce();
	});
});
