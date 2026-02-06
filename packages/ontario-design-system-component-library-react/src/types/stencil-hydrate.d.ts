declare module '@ongov/ontario-design-system-component-library/hydrate' {
	export const renderToString: (html: string | unknown, options?: unknown) => Promise<unknown>;
	export const serializeProperty: (value: unknown) => string;
	export const transformTag: (tagName: string) => string;
	export const setTagTransformer: (transformer: (tagName: string) => string) => void;
}
