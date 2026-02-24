/**
 * Compatibility shim for `@ongov/ontario-design-system-component-library/hydrate`.
 *
 * Why this exists:
 * - `@stencil/react-output-target/ssr` expects a hydrate module shape that includes
 *   `renderToString`, `serializeProperty` (string return), `transformTag`, and
 *   `setTagTransformer`.
 * - The generated hydrate typings in this repo may not always match that exact
 *   contract, which causes TypeScript errors in generated React SSR wrappers.
 *
 * Future impact:
 * - This file is intentionally small and local, but it can drift if upstream
 *   Stencil/output-target contracts change. Revisit on major Stencil upgrades,
 *   and remove once upstream types align reliably.
 */
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
