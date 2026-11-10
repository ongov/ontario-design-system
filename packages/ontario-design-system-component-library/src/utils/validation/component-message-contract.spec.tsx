import { render } from '@stencil/vitest';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

type Severity = 'warn' | 'error';

interface MessageCase {
	kind: string;
	html: string;
	severity: Severity;
	tag: string;
	// text that must appear in the printed message
	includes: string;
}

// One representative, real component usage for each message class, so a regression in a helper's severity or in a
// component's wiring to the helper is caught.
const cases: MessageCase[] = [
	{
		kind: 'invalid-value',
		html: '<ontario-page-alert type="nope"></ontario-page-alert>',
		severity: 'warn',
		tag: '<ontario-page-alert>',
		includes: 'invalid value of',
	},
	{
		kind: 'parse-failure',
		html: '<ontario-radio-buttons name="n" options="not json"></ontario-radio-buttons>',
		severity: 'error',
		tag: '<ontario-radio-buttons>',
		includes: 'could not be parsed. Please ensure it is valid JSON.',
	},
	{
		kind: 'invalid-format',
		html: '<ontario-icon-add icon-width="-5"></ontario-icon-add>',
		severity: 'warn',
		tag: '<ontario-icon-add>',
		includes: 'which is not in a valid format. Expected a positive number.',
	},
	{
		kind: 'conflicting-config',
		html: '<ontario-back-button back-mode="href"></ontario-back-button>',
		severity: 'warn',
		tag: '<ontario-back-button>',
		includes: 'href',
	},
	{
		kind: 'conflicting-config',
		html: '<ontario-icon-visa colour="blue"></ontario-icon-visa>',
		severity: 'warn',
		tag: '<ontario-icon-visa>',
		includes: 'cannot be set. The provided colour is ignored.',
	},
	{
		kind: 'deprecated',
		html: '<ontario-badge label="New" colour="lightTeal"></ontario-badge>',
		severity: 'warn',
		tag: '<ontario-badge>',
		includes: 'has been deprecated.',
	},
	{
		kind: 'slot-misuse',
		html: '<ontario-in-page-navigation></ontario-in-page-navigation>',
		severity: 'warn',
		tag: '<ontario-in-page-navigation>',
		includes: 'requires list item links in the default slot',
	},
];

describe('component console message contract', () => {
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

	it.each(cases)(
		'prints a $kind message with $severity severity for $tag',
		async ({ html, severity, tag, includes }) => {
			await render(html);

			const printed = (severity === 'error' ? errorSpy : warnSpy).mock.calls.map((call) => String(call[0]));
			const other = (severity === 'error' ? warnSpy : errorSpy).mock.calls.map((call) => String(call[0]));

			const message = printed.find((text) => text.includes(tag) && text.includes(includes));
			expect(message, `expected a ${severity} naming ${tag} that includes "${includes}"`).toBeDefined();
			expect(message!.startsWith('%cOntario Design System')).toBe(true);
			expect(other.filter((text) => text.includes(tag) && text.includes(includes))).toEqual([]);
		},
	);
});
