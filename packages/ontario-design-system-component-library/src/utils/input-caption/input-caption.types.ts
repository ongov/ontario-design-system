export const CaptionTypes = ['default', 'large', 'heading'] as const;
export type CaptionType = typeof CaptionTypes[number];

export const MessageContentTypes = ['undefinedCaptionObject', 'undefinedCaption', 'emptyCaption', 'undefinedCaptionType', 'incorrectCaptionType'] as const;
export type MessageContentType = typeof MessageContentTypes[number];
