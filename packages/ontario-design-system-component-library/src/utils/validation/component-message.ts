import { ConsoleMessageClass } from '../console-message/console-message';
import { ConsoleType } from '../console-message/console-message.enum';

/**
 * The classes of console messages that components print while validating their props and configuration.
 *
 * - `invalid-value`: a value is outside the supported set and a default is assumed (see `printInvalidPropWarning`).
 * - `missing-prop`: a required prop was not provided.
 * - `parse-failure`: a prop that accepts a JSON string could not be parsed.
 * - `invalid-format`: a prop was provided, but is not in the expected shape or format.
 * - `conflicting-config`: props are combined in a way that is incomplete, ignored or contradictory.
 * - `deprecated`: a prop or value still works, but is discouraged.
 * - `slot-misuse`: slotted or child content is missing or not supported.
 */
export const ComponentMessageKinds = [
	'invalid-value',
	'missing-prop',
	'parse-failure',
	'invalid-format',
	'conflicting-config',
	'deprecated',
	'slot-misuse',
] as const;

export type ComponentMessageKind = (typeof ComponentMessageKinds)[number];

/**
 * The console severity that each message class prints with by default. Only a parse failure is an error, because the
 * data is unusable and the component cannot render it. A helper's `severity` option overrides this for the rare case
 * where a component cannot render at all without the prop.
 */
export const ComponentMessageSeverity: Readonly<Record<ComponentMessageKind, ConsoleType>> = {
	'invalid-value': ConsoleType.Warning,
	'missing-prop': ConsoleType.Warning,
	'parse-failure': ConsoleType.Error,
	'invalid-format': ConsoleType.Warning,
	'conflicting-config': ConsoleType.Warning,
	'deprecated': ConsoleType.Warning,
	'slot-misuse': ConsoleType.Warning,
};

interface ComponentMessageBaseOptions {
	/** Tag of the component that prints the message, including angle brackets, e.g. `<ontario-button>`. */
	componentTag: string;
	/** Overrides the default severity of the message class. */
	severity?: ConsoleType;
}

export interface MissingPropWarningOptions extends ComponentMessageBaseOptions {
	/** Name of the prop that was not provided, e.g. `label`. */
	propName: string;
	/** Sentence describing what happens as a result, e.g. `A default label will be used.` */
	consequence?: string;
}

export interface ParseErrorMessageOptions extends ComponentMessageBaseOptions {
	/** Name of the prop that could not be parsed, e.g. `options`. */
	propName: string;
	/** The error that was caught while parsing. Its stack is appended to the message. */
	error?: unknown;
	/** Description of what the prop must be. Defaults to `valid JSON`. */
	expectedFormat?: string;
}

export interface InvalidFormatWarningOptions extends ComponentMessageBaseOptions {
	/** Name of the prop that is not in the expected format, e.g. `href`. */
	propName: string;
	/** Description of what the prop must be, e.g. `a positive number`. */
	expected: string;
	/** The received value. When this key is present, even if `undefined`, the value is included in the message. */
	received?: unknown;
	/** Sentence describing what happens as a result, e.g. `The prop was ignored.` */
	consequence?: string;
}

export interface ConflictingConfigWarningOptions extends ComponentMessageBaseOptions {
	/** Name of the prop the warning is about. When omitted, the warning is about the component as a whole. */
	propName?: string;
	/** Sentence that continues after the subject, e.g. `is ignored when href is provided.` */
	description: string;
}

export interface DeprecatedWarningOptions extends ComponentMessageBaseOptions {
	/** Name of the deprecated prop, e.g. `colour`. */
	propName: string;
	/** The deprecated value, when only a specific value is deprecated. */
	value?: string | number;
	/** What to use instead, phrased to follow "Please use", e.g. `kebab-case values (e.g., "light-teal")`. */
	guidance: string;
}

export interface SlotWarningOptions extends ComponentMessageBaseOptions {
	/** Sentence that continues after the component tag, e.g. `requires list item links in the default slot.` */
	description: string;
}

function formatValue(value: unknown): string {
	if (typeof value === 'object' && value !== null) {
		try {
			return JSON.stringify(value);
		} catch {
			return String(value);
		}
	}
	return String(value);
}

function formatError(error: unknown): string {
	return error instanceof Error ? (error.stack ?? error.message) : String(error);
}

function startMessage(): ConsoleMessageClass {
	return new ConsoleMessageClass().addDesignSystemTag();
}

function printComponentMessage(
	kind: ComponentMessageKind,
	message: ConsoleMessageClass,
	severity: ConsoleType | undefined,
): void {
	message.printMessage(severity ?? ComponentMessageSeverity[kind]);
}

/**
 * Prints a warning that a required prop was not provided.
 */
export function printMissingPropWarning(options: MissingPropWarningOptions): void {
	const { propName, componentTag, consequence, severity } = options;

	const message = startMessage()
		.addMonospaceText(` ${propName} `)
		.addRegularText('for')
		.addMonospaceText(` ${componentTag} `)
		.addRegularText(consequence ? `was not provided. ${consequence}` : 'was not provided.');

	printComponentMessage('missing-prop', message, severity);
}

/**
 * Prints an error that a prop could not be parsed, including the stack of the caught error when one is provided.
 */
export function printParseErrorMessage(options: ParseErrorMessageOptions): void {
	const { propName, componentTag, error, expectedFormat = 'valid JSON', severity } = options;

	const message = startMessage()
		.addMonospaceText(` ${propName} `)
		.addRegularText('for')
		.addMonospaceText(` ${componentTag} `)
		.addRegularText(`could not be parsed. Please ensure it is ${expectedFormat}.`);

	if (error !== undefined) {
		message.addMonospaceText(`\n${formatError(error)}`);
	}

	printComponentMessage('parse-failure', message, severity);
}

/**
 * Prints a warning that a prop was provided in an unexpected shape or format.
 */
export function printInvalidFormatWarning(options: InvalidFormatWarningOptions): void {
	const { propName, componentTag, expected, consequence, severity } = options;
	// Presence of the key, not its value, selects the message so an `undefined` value is still reported
	const includesValue = 'received' in options;

	const message = startMessage()
		.addMonospaceText(` ${propName} `)
		.addRegularText('on')
		.addMonospaceText(` ${componentTag} `);

	if (includesValue) {
		message
			.addRegularText('received')
			.addMonospaceText(` ${formatValue(options.received)} `)
			.addRegularText(`which is not in a valid format. Expected ${expected}.`);
	} else {
		message.addRegularText(`was not provided in a valid format. Expected ${expected}.`);
	}

	if (consequence) {
		message.addRegularText(consequence);
	}

	printComponentMessage('invalid-format', message, severity);
}

/**
 * Prints a warning that props are combined in a way that is incomplete, ignored or contradictory.
 */
export function printConflictingConfigWarning(options: ConflictingConfigWarningOptions): void {
	const { propName, componentTag, description, severity } = options;

	const message = startMessage();

	if (propName) {
		message.addMonospaceText(` ${propName} `).addRegularText('on');
	}

	message.addMonospaceText(` ${componentTag} `).addRegularText(description);

	printComponentMessage('conflicting-config', message, severity);
}

/**
 * Prints a warning that a prop or value is deprecated.
 */
export function printDeprecatedWarning(options: DeprecatedWarningOptions): void {
	const { propName, componentTag, value, guidance, severity } = options;

	const message = startMessage()
		.addMonospaceText(value === undefined ? ` ${propName} ` : ` ${propName} ${value} `)
		.addRegularText('on')
		.addMonospaceText(` ${componentTag} `)
		.addRegularText(`has been deprecated. Please use ${guidance} instead.`);

	printComponentMessage('deprecated', message, severity);
}

/**
 * Prints a warning that slotted or child content is missing or not supported.
 */
export function printSlotWarning(options: SlotWarningOptions): void {
	const { componentTag, description, severity } = options;

	const message = startMessage().addMonospaceText(` ${componentTag} `).addRegularText(description);

	printComponentMessage('slot-misuse', message, severity);
}
