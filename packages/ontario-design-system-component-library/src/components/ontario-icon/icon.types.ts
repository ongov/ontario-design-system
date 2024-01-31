export const IconColours = ['black', 'blue', 'grey', 'white', 'inherit'] as const;
export const IconSizes = [16, 24, 32, 48] as const;

export type IconColour = (typeof IconColours)[number];
export type IconSize = (typeof IconSizes)[number];
