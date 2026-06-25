import { HeadingLevel } from '../../utils/common/common.interface';

export const layoutDirectionDefinitions = ['vertical', 'horizontal'] as const;
export const horizontalImagePositionDefinitions = ['left', 'right'] as const;
export const horizontalImageSizeDefinitions = ['one-fourth', 'one-third'] as const;

export type LayoutDirection = (typeof layoutDirectionDefinitions)[number];
export type HorizontalImagePositionType = (typeof horizontalImagePositionDefinitions)[number];
export type HorizontalImageSizeType = (typeof horizontalImageSizeDefinitions)[number];

export const headerColourDefinitions = [
	'darkAccent',
	'lightAccent',
	'lightGold',
	'lightYellow',
	'lightTaupe',
	'lightGreen',
	'lightLime',
	'lightTeal',
	'lightSky',
	'lightBlue',
	'lightPurple',
	'lightOrange',
	'lightRed',
	'lightMagenta',
	'gold',
	'yellow',
	'taupe',
	'green',
	'lime',
	'teal',
	'sky',
	'blue',
	'purple',
	'orange',
	'red',
	'magenta',
] as const;

export type HeaderColour = (typeof headerColourDefinitions)[number];

/**
 * Maps camelCase HeaderColour values to their corresponding CSS class suffixes.
 */
export const headerColourToClass: Record<HeaderColour, string> = {
	darkAccent: 'dark-accent',
	lightAccent: 'light-accent',
	lightGold: 'light-gold',
	lightYellow: 'light-yellow',
	lightTaupe: 'light-taupe',
	lightGreen: 'light-green',
	lightLime: 'light-lime',
	lightTeal: 'light-teal',
	lightSky: 'light-sky',
	lightBlue: 'light-blue',
	lightPurple: 'light-purple',
	lightOrange: 'light-orange',
	lightRed: 'light-red',
	lightMagenta: 'light-magenta',
	gold: 'gold',
	yellow: 'yellow',
	taupe: 'taupe',
	green: 'green',
	lime: 'lime',
	teal: 'teal',
	sky: 'sky',
	blue: 'blue',
	purple: 'purple',
	orange: 'orange',
	red: 'red',
	magenta: 'magenta',
} as const;

// Define properties that you would like to track as component state
export type CardState = {
	headerColour: HeaderColour | undefined;
	headingLevel: HeadingLevel | undefined;
	layoutDirection: LayoutDirection | undefined;
};
