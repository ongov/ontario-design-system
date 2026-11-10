import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { ConsoleType } from '../console-message/console-message.enum';
import {
	ComponentMessageKinds,
	ComponentMessageSeverity,
	printConflictingConfigWarning,
	printDeprecatedWarning,
	printInvalidFormatWarning,
	printMissingPropWarning,
	printParseErrorMessage,
	printSlotWarning,
} from './component-message';
import { printInvalidPropWarning } from './invalid-prop-warning';

describe('component message classes', () => {
	let warnSpy: ReturnType<typeof vi.spyOn>;
	let errorSpy: ReturnType<typeof vi.spyOn>;

	beforeEach(() => {
		warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
		errorSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined);
	});

	afterEach(() => {
		warnSpy.mockRestore();
		errorSpy.mockRestore();
	});

	it('defines a severity for every message class, with only parse failures as errors', () => {
		expect(Object.keys(ComponentMessageSeverity).sort()).toEqual([...ComponentMessageKinds].sort());
		expect(ComponentMessageKinds.filter((kind) => ComponentMessageSeverity[kind] === ConsoleType.Error)).toEqual([
			'parse-failure',
		]);
	});

	describe('printMissingPropWarning', () => {
		it('prints a warning that the prop was not provided', () => {
			printMissingPropWarning({ propName: 'label', componentTag: '<ontario-button>' });

			expect(errorSpy).not.toHaveBeenCalled();
			expect(warnSpy).toHaveBeenCalledTimes(1);
			expect(warnSpy.mock.calls[0][0]).toEqual(
				'%cOntario Design System' + '%c label ' + '%cfor' + '%c <ontario-button> ' + '%cwas not provided.',
			);
		});

		it('appends the consequence', () => {
			printMissingPropWarning({
				propName: 'heading',
				componentTag: '<ontario-in-page-navigation>',
				consequence: 'A localized default heading will be used.',
			});

			expect(warnSpy.mock.calls[0][0]).toContain('%cwas not provided. A localized default heading will be used.');
		});

		it('prints as an error when the severity is overridden', () => {
			printMissingPropWarning({ propName: 'data', componentTag: '<ontario-table>', severity: ConsoleType.Error });

			expect(errorSpy).toHaveBeenCalledTimes(1);
			expect(warnSpy).not.toHaveBeenCalled();
		});
	});

	describe('printParseErrorMessage', () => {
		it('prints an error with the default JSON expectation and no stack when there is no error', () => {
			printParseErrorMessage({ propName: 'options', componentTag: '<ontario-checkboxes>' });

			expect(warnSpy).not.toHaveBeenCalled();
			expect(errorSpy).toHaveBeenCalledTimes(1);
			expect(errorSpy.mock.calls[0][0]).toEqual(
				'%cOntario Design System' +
					'%c options ' +
					'%cfor' +
					'%c <ontario-checkboxes> ' +
					'%ccould not be parsed. Please ensure it is valid JSON.',
			);
		});

		it('appends the stack of a caught error', () => {
			const error = new Error('Unexpected token');
			error.stack = 'Error: Unexpected token\n    at parse';

			printParseErrorMessage({ propName: 'tableData', componentTag: '<ontario-table>', error });

			expect(errorSpy.mock.calls[0][0]).toMatch(/%c\nError: Unexpected token\n {4}at parse$/);
			// the message plus one style per segment
			expect(errorSpy.mock.calls[0]).toHaveLength(7);
		});

		it('falls back to the error message when there is no stack, and stringifies non-errors', () => {
			const error = new Error('bad');
			error.stack = undefined;

			printParseErrorMessage({ propName: 'a', componentTag: '<x-a>', error });
			printParseErrorMessage({ propName: 'b', componentTag: '<x-b>', error: 'plain failure' });

			expect(errorSpy.mock.calls[0][0]).toContain('%c\nbad');
			expect(errorSpy.mock.calls[1][0]).toContain('%c\nplain failure');
		});

		it('uses a custom expected format', () => {
			printParseErrorMessage({
				propName: 'value',
				componentTag: '<ontario-checkboxes>',
				expectedFormat: 'a string array or JSON string array',
			});

			expect(errorSpy.mock.calls[0][0]).toContain('Please ensure it is a string array or JSON string array.');
		});
	});

	describe('printInvalidFormatWarning', () => {
		it('prints a warning without a value when no value was received', () => {
			printInvalidFormatWarning({
				propName: 'options',
				componentTag: '<ontario-dropdown-list>',
				expected: 'an array or JSON string array',
			});

			expect(warnSpy).toHaveBeenCalledTimes(1);
			expect(warnSpy.mock.calls[0][0]).toEqual(
				'%cOntario Design System' +
					'%c options ' +
					'%con' +
					'%c <ontario-dropdown-list> ' +
					'%cwas not provided in a valid format. Expected an array or JSON string array.',
			);
		});

		it('includes the received value and the consequence', () => {
			printInvalidFormatWarning({
				propName: 'icon-width',
				componentTag: '<ontario-icon-add>',
				received: -5,
				expected: 'a positive number',
				consequence: 'The default size of 24px was assumed.',
			});

			expect(warnSpy.mock.calls[0][0]).toEqual(
				'%cOntario Design System' +
					'%c icon-width ' +
					'%con' +
					'%c <ontario-icon-add> ' +
					'%creceived' +
					'%c -5 ' +
					'%cwhich is not in a valid format. Expected a positive number.' +
					'%c The default size of 24px was assumed.',
			);
		});

		it('reports an explicitly undefined value and serializes objects', () => {
			printInvalidFormatWarning({ propName: 'a', componentTag: '<x-a>', expected: 'e', received: undefined });
			printInvalidFormatWarning({ propName: 'b', componentTag: '<x-b>', expected: 'e', received: { href: 1 } });

			expect(warnSpy.mock.calls[0][0]).toContain('%c undefined ');
			expect(warnSpy.mock.calls[1][0]).toContain('%c {"href":1} ');
		});
	});

	describe('printConflictingConfigWarning', () => {
		it('prints a warning about the component when no prop is given', () => {
			printConflictingConfigWarning({
				componentTag: '<ontario-step-indicator>',
				description: 'was provided with an incomplete step configuration.',
			});

			expect(warnSpy.mock.calls[0][0]).toEqual(
				'%cOntario Design System' +
					'%c <ontario-step-indicator> ' +
					'%cwas provided with an incomplete step configuration.',
			);
		});

		it('prints a warning about a prop when one is given', () => {
			printConflictingConfigWarning({
				propName: 'htmlType',
				componentTag: '<ontario-button>',
				description: 'is ignored when href is provided.',
			});

			expect(warnSpy.mock.calls[0][0]).toEqual(
				'%cOntario Design System' +
					'%c htmlType ' +
					'%con' +
					'%c <ontario-button> ' +
					'%cis ignored when href is provided.',
			);
		});
	});

	describe('printDeprecatedWarning', () => {
		it('prints the deprecated value and the guidance', () => {
			printDeprecatedWarning({
				propName: 'colour',
				value: 'lightTeal',
				componentTag: '<ontario-badge>',
				guidance: 'kebab-case values (e.g., "light-teal")',
			});

			expect(warnSpy.mock.calls[0][0]).toEqual(
				'%cOntario Design System' +
					'%c colour lightTeal ' +
					'%con' +
					'%c <ontario-badge> ' +
					'%chas been deprecated. Please use kebab-case values (e.g., "light-teal") instead.',
			);
		});

		it('omits the value when the whole prop is deprecated', () => {
			printDeprecatedWarning({ propName: 'old', componentTag: '<x-a>', guidance: 'new' });

			expect(warnSpy.mock.calls[0][0]).toContain('%c old ');
		});
	});

	describe('printSlotWarning', () => {
		it('prints a warning about the slotted content', () => {
			printSlotWarning({
				componentTag: '<ontario-in-page-navigation>',
				description: 'requires list item links in the default slot.',
			});

			expect(warnSpy.mock.calls[0][0]).toEqual(
				'%cOntario Design System' +
					'%c <ontario-in-page-navigation> ' +
					'%crequires list item links in the default slot.',
			);
		});
	});

	it('keeps invalid value warnings on the shared warning severity', () => {
		printInvalidPropWarning({
			propName: 'type',
			componentTag: '<ontario-button>',
			allowedValues: ['a', 'b'],
			defaultValue: 'a',
		});

		expect(warnSpy).toHaveBeenCalledTimes(1);
		expect(errorSpy).not.toHaveBeenCalled();
	});
});
