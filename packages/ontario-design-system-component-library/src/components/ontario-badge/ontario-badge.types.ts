export const badgeColourDefinitions = [
	'teal',
	'light-teal',
	'black',
	'grey',
	'red',
	'yellow',
	'green',
	'white',
	'dark-grey',
] as const;

export type BadgeColour = (typeof badgeColourDefinitions)[number];
