import { ConsoleMessageClass } from '../console-message/console-message';
import { printArray } from '../helper/utils';
import { Conjunction } from '../helper/utils-types';
import { ComponentMessageSeverity } from './component-message';

export type InvalidPropDescriptor = 'type' | 'value' | 'colour' | 'htmlType';

export interface InvalidPropWarningOptions {
	/** Name of the invalid prop as written in the warning, e.g. `type`. */
	propName: string;
	/** Tag of the component that owns the prop, including angle brackets, e.g. `<ontario-button>`. */
	componentTag: string;
	/** Supported values, typically the `as const` array that the prop type is derived from. */
	allowedValues: readonly (string | number)[];
	/** Value that is assumed when the provided one is invalid. */
	defaultValue: string | number;
	/**
	 * Word interpolated into "was set to an invalid ___" when `propValue` is not provided.
	 * Defaults to `type`.
	 */
	invalidDescriptor?: InvalidPropDescriptor;
	/**
	 * The invalid value to include in the message. When this key is present (even if `undefined`) the "invalid value
	 * of" format is used; when omitted, the "invalid type" format is used.
	 */
	propValue?: unknown;
	/** Joins the last allowed value. Defaults to `and` when `propValue` is provided, otherwise `or`. */
	conjunction?: Conjunction;
	/**
	 * Word interpolated into "The default ___ is assumed" when `propValue` is not provided.
	 * Defaults to the resolved `invalidDescriptor`.
	 */
	defaultDescriptor?: string;
}

/**
 * Prints a standardized invalid prop warning using runtime allowed values.
 */
export function printInvalidPropWarning(options: InvalidPropWarningOptions): void {
	const { propName, componentTag, allowedValues, defaultValue, invalidDescriptor, propValue, defaultDescriptor } =
		options;
	// Presence of the key, not its value, selects the message so an `undefined` value is still reported as a value
	const includesValue = 'propValue' in options;
	const conjunction = options.conjunction ?? (includesValue ? 'and' : 'or');
	const formattedValues = printArray(allowedValues, conjunction);
	const message = new ConsoleMessageClass();

	message
		.addDesignSystemTag()
		.addMonospaceText(` ${propName} `)
		.addRegularText('on')
		.addMonospaceText(` ${componentTag} `);

	if (includesValue) {
		message
			.addRegularText('was set to an invalid value of ')
			.addMonospaceText(` ${propValue} `)
			.addRegularText('. Only ')
			.addMonospaceText(formattedValues)
			.addRegularText(' are supported values. The default value of')
			.addMonospaceText(` ${defaultValue} `)
			.addRegularText('is assumed.');
	} else {
		const descriptor = invalidDescriptor ?? 'type';
		const defaultLabel = defaultDescriptor ?? descriptor;

		message
			.addRegularText(`was set to an invalid ${descriptor}; only `)
			.addMonospaceText(` ${formattedValues} `)
			.addRegularText('are supported. The default ')
			.addRegularText(defaultLabel)
			.addMonospaceText(` ${defaultValue} `)
			.addRegularText('is assumed.');
	}

	message.printMessage(ComponentMessageSeverity['invalid-value']);
}
