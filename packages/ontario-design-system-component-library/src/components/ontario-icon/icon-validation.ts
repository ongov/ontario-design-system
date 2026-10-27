import validateColor from 'validate-color';
import { ConsoleMessageClass } from '../../utils/console-message/console-message';
import { printArray } from '../../utils/helper/utils';
import { validateValueAgainstArray } from '../../utils/validation/validation-functions';
import { IconColours } from './icon.types';

const DEFAULT_ICON_WIDTH = 24;

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
		.addMonospaceText(` ${DEFAULT_ICON_WIDTH}px `)
		.addRegularText('was assumed.')
		.printMessage();
	return DEFAULT_ICON_WIDTH;
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
		.addMonospaceText(` ${printArray([...IconColours], 'or')} `)
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
