export const CaptionTypes = ['default', 'large', 'heading'] as const;
export type CaptionType = (typeof CaptionTypes)[number];
