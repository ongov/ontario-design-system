export const CardTypes = ['basic', 'image', 'title', 'horizontal'] as const;
export const HeaderTypes = ['default', 'light', 'dark'] as const;
export const CardsPerRowValues = [2, 3, 4] as const;

export type CardType = (typeof CardTypes)[number];
export type HeaderType = (typeof HeaderTypes)[number];
export type CardsPerRow = (typeof CardsPerRowValues)[number];
