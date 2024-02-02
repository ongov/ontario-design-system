export const CardsPerRowValues = [2, 3, 4] as const;
export type CardsPerRow = (typeof CardsPerRowValues)[number];
