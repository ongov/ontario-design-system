import { ConsoleMessageClass } from '../console-message/console-message';
import { formatAllowedValues } from '../helper/utils';
import { Conjunction } from '../helper/utils-types';

export type InvalidPropDescriptor = 'type' | 'value' | 'colour' | 'htmlType';

export interface InvalidPropWarningOptions {
	propName: string;
	componentTag: string;
	allowedValues: readonly (string | number)[];
	defaultValue: string | number;
	invalidDescriptor?: InvalidPropDescriptor;
	propValue?: unknown;
	conjunction?: Conjunction;
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
	const formattedValues = formatAllowedValues(allowedValues, conjunction);
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

	message.printMessage();
}
