export const ButtonTypes = ['primary', 'secondary', 'tertiary'] as const;
export const HtmlTypes = ['button', 'reset', 'submit'] as const;
export const ButtonColours = ['internalBlack', 'internalWhite'] as const;
export const ButtonLinkColours = ['internalBlack', 'internalWhite'] as const;

export type ButtonType = typeof ButtonTypes[number];
export type HtmlType = typeof HtmlTypes[number];
export type ButtonColour = typeof ButtonColours[number];
export type ButtonLinkColour = typeof ButtonLinkColours[number];
