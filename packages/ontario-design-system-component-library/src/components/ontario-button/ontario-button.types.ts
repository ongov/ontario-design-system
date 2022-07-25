export const ButtonTypes = ['primary', 'secondary', 'tertiary'] as const;
export const HtmlTypes = ['button', 'reset', 'submit'] as const;

export type ButtonType = typeof ButtonTypes[number];
export type HtmlType = typeof HtmlTypes[number];
