import validateColor from 'validate-color';
import { ConsoleMessageClass } from '../../utils/console-message/console-message';
import { validateValueAgainstArray } from '../../utils/validation/validation-functions';
import { IconColours } from './icon.types';

export const validateIconWidth = (width: number, iconName: string): number => {
	if (!isNaN(width) && width > 0) {
		return width;
	}

	new ConsoleMessageClass()
		.addDesignSystemTag()
		.addMonospaceText(' icon-width ')
		.addRegularText('on')
		.addMonospaceText(` <${iconName}> `)
		.addRegularText('was set to an invalid value; a positive number is allowed. The default size of')
		.addMonospaceText(' 24px ')
		.addRegularText('was assumed.')
		.printMessage();
	return 24;
};

export interface IconColourValidation {
	colour?: string;
	customColour?: string;
}

export const validateIconColour = (
	colour: string,
	iconName: string,
	fallbackColour = 'black',
): IconColourValidation => {
	if (validateValueAgainstArray(colour, IconColours)) {
		return { colour };
	}
	if (validateColor(colour)) {
		return { customColour: colour };
	}

	new ConsoleMessageClass()
		.addDesignSystemTag()
		.addMonospaceText(' colour ')
		.addRegularText('on')
		.addMonospaceText(` <${iconName}> `)
		.addRegularText('was set to an invalid colour; only')
		.addMonospaceText(' black, blue, grey or white ')
		.addRegularText('are supported. The default colour')
		.addMonospaceText(` ${fallbackColour} `)
		.addRegularText('is assumed.')
		.printMessage();
	return { colour: fallbackColour };
};

export const validateFixedIconColour = (host: HTMLElement, iconName: string): void => {
	if (host.hasAttribute('colour')) {
		new ConsoleMessageClass()
			.addDesignSystemTag()
			.addMonospaceText(' colour ')
			.addRegularText('on')
			.addMonospaceText(` <${iconName}> `)
			.addRegularText('cannot be set. The provided colour is ignored.')
			.printMessage();
	}
};
