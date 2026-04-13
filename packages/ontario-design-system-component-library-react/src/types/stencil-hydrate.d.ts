declare module '@ongov/ontario-design-system-component-library/hydrate' {
	export function renderToString(
		html: string,
		options: {
			serializeShadowRoot?: 'declarative-shadow-dom' | 'scoped' | boolean;
			fullDocument?: boolean;
			prettyHtml?: boolean;
		},
	): Promise<{ html: string | null; styles: Array<{ href: string | null; id: string; content: string }> }>;
	export function serializeProperty(value: unknown): string;
	export function transformTag(tagName: string): string;
	export function setTagTransformer(transformer: (tagName: string) => string): void;
}
