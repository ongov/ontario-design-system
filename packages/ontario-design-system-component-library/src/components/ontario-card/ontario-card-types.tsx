import { HeadingLevel } from '../../utils/common/common.interface';

export const layoutDirectionDefinitions = ['vertical', 'horizontal'] as const;
export const horizontalImagePositionDefinitions = ['left', 'right'] as const;
export const horizontalImageSizeDefinitions = ['one-fourth', 'one-third'] as const;

export type LayoutDirection = (typeof layoutDirectionDefinitions)[number];
export type HorizontalImagePositionType = (typeof horizontalImagePositionDefinitions)[number];
export type HorizontalImageSizeType = (typeof horizontalImageSizeDefinitions)[number];

export const headerColourDefinitions = [
	'dark-accent',
	'light-accent',
	'light-gold',
	'light-yellow',
	'light-taupe',
	'light-green',
	'light-lime',
	'light-teal',
	'light-sky',
	'light-blue',
	'light-purple',
	'light-orange',
	'light-red',
	'light-magenta',
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

// Define properties that you would like to track as component state
export type CardState = {
	headerColour: HeaderColour | undefined;
	headingLevel: HeadingLevel | undefined;
	layoutDirection: LayoutDirection | undefined;
};
