export const Layouts = ['vertical', 'horizontal'] as const;
export const HorizontalImagePositionTypes = ['left', 'right'] as const;
export const HorizontalImageSizeTypes = ['one-fourth', 'one-third'] as const;

export type Layout = (typeof Layouts)[number];
export type HorizontalImagePositionType = (typeof HorizontalImagePositionTypes)[number];
export type HorizontalImageSizeType = (typeof HorizontalImageSizeTypes)[number];

export const HeaderColours = [
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
];

export type HeaderColour = (typeof HeaderColours)[number];
