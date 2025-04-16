import { retrieveEnumKeys } from '../../utils/helper/utils';

export enum BadgeColourToClass {
	teal = 'ontario-badge--default-heavy',
	'light-teal' = 'ontario-badge--default-light',
	black = 'ontario-badge--neutral-heavy',
	grey = 'ontario-badge--neutral-light',
	red = 'ontario-badge--alert-heavy',
	yellow = 'ontario-badge--warning-heavy',
	green = 'ontario-badge--success-heavy',
	white = 'ontario-badge--white',
	'dark-grey' = 'ontario-badge--grey',
}

export const BadgeColours = retrieveEnumKeys(BadgeColourToClass);

export type BadgeColour = keyof typeof BadgeColourToClass;
