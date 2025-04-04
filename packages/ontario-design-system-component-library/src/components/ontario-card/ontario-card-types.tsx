import { HeadingLevelType } from '../../utils/common/common.interface';

export const layouts = ['vertical', 'horizontal'] as const;
export const horizontalImagePositions = ['left', 'right'] as const;
export const horizontalImageSizes = ['one-fourth', 'one-third'] as const;

export type LayoutType = (typeof layouts)[number];
export type HorizontalImagePositionType = (typeof horizontalImagePositions)[number];
export type HorizontalImageSizeType = (typeof horizontalImageSizes)[number];

export const headerColours = [
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

export type HeaderColourType = (typeof headerColours)[number];

// Define properties that you would like to track as component state
export type CardStateType = {
	headerColour: HeaderColourType | undefined;
	headingLevel: HeadingLevelType | undefined;
	layout: LayoutType | undefined;
};
