export const IconColours = ['black', 'blue', 'grey', 'white'] as const;
export const IconSizes = [24, 32] as const;

export type IconColour = (typeof IconColours)[number];
export type IconSize = (typeof IconSizes)[number];
