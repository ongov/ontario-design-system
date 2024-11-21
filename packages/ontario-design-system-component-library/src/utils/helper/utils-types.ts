export const conjunctions = ['and', 'or'] as const;
export type Conjunction = (typeof conjunctions)[number];
