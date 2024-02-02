export const CardTypes = ['basic', 'image', 'title', 'horizontal'] as const;
export const HeaderTypes = ['default', 'light', 'dark'] as const;
export const HorizontalImagePositionTypes = ['left', 'right'] as const;
export const HorizontalImageSizeTypes = ['one-fourth', 'one-third'] as const;

export type CardType = (typeof CardTypes)[number];
export type HeaderType = (typeof HeaderTypes)[number];
export type HorizontalImagePositionType = (typeof HorizontalImagePositionTypes)[number];
export type HorizontalImageSizeType = (typeof HorizontalImageSizeTypes)[number];
