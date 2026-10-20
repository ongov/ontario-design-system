import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { formatAllowedValues } from '../helper/utils';
import { printInvalidPropWarning } from './invalid-prop-warning';

describe('formatAllowedValues', () => {
	it('joins values with and by default', () => {
		expect(formatAllowedValues(['vertical', 'horizontal'])).toEqual('vertical and horizontal');
	});

	it('joins values with or when requested', () => {
		expect(formatAllowedValues(['string', 'html'], 'or')).toEqual('string or html');
	});

	it('formats numeric allowed values', () => {
		expect(formatAllowedValues([16, 24, 32, 48], 'or')).toEqual('16, 24, 32 or 48');
	});
});

describe('printInvalidPropWarning', () => {
	let warnSpy: ReturnType<typeof vi.spyOn>;

	beforeEach(() => {
		warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
	});

	afterEach(() => {
		warnSpy.mockRestore();
	});

	it('prints a full invalid type warning from allowed values', () => {
		printInvalidPropWarning({
			propName: 'type',
			componentTag: '<ontario-button>',
			allowedValues: ['primary', 'secondary', 'tertiary', 'internalThemeDark'],
			defaultValue: 'secondary',
			conjunction: 'or',
		});

		expect(warnSpy).toHaveBeenCalledTimes(1);
		expect(warnSpy.mock.calls[0][0]).toEqual(
			'%cOntario Design System' +
				'%c type ' +
				'%con' +
				'%c <ontario-button> ' +
				'%cwas set to an invalid type; only ' +
				'%c primary, secondary, tertiary or internalThemeDark ' +
				'%care supported. The default ' +
				'%ctype' +
				'%c secondary ' +
				'%cis assumed.',
		);
	});

	it('prints a full invalid value warning that includes the provided value', () => {
		printInvalidPropWarning({
			propName: 'layout-direction',
			componentTag: '<ontario-card>',
			propValue: 'diagonal',
			allowedValues: ['vertical', 'horizontal'],
			defaultValue: 'vertical',
		});

		expect(warnSpy).toHaveBeenCalledTimes(1);
		expect(warnSpy.mock.calls[0][0]).toEqual(
			'%cOntario Design System' +
				'%c layout-direction ' +
				'%con' +
				'%c <ontario-card> ' +
				'%cwas set to an invalid value of ' +
				'%c diagonal ' +
				'%c. Only ' +
				'%cvertical and horizontal' +
				'%c are supported values. The default value of' +
				'%c vertical ' +
				'%cis assumed.',
		);
	});
});
