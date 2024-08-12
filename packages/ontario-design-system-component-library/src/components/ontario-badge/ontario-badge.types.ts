export const BadgeColours = ['teal', 'light-teal', 'black', 'grey', 'red', 'yellow', 'green'] as const;

export enum BadgeColourToClass {
	teal = 'ontario-badge--default-heavy',
	'light-teal' = 'ontario-badge--default-light',
	black = 'ontario-badge--neutral-heavy',
	grey = 'ontario-badge--neutral-light',
	red = 'ontario-badge--alert-heavy',
	yellow = 'ontario-badge--warning-heavy',
	green = 'ontario-badge--success-heavy',
}

export type BadgeColour = (typeof BadgeColours)[number];
