/**
 * @file Closed vocabulary of design token export `type` values (DS-2692).
 *
 * This is the single list every primitive token's declared `type` must
 * belong to. `scripts/lib/token-tooling.ts`'s linter enforces it at build
 * time (`missing_type` / `invalid_type` errors), and every export format in
 * `scripts/lib/export-platforms.ts` / `scripts/export-figma-tokens.ts` reads
 * a token's declared `type` directly rather than re-deriving it, so this
 * vocabulary is the one place an export type is decided.
 *
 * To add a new type: add it to `TOKEN_TYPES` below, then use it as the
 * `"type"` value on the relevant token(s) in `tokens/primitives/`.
 */

/** The closed vocabulary of valid token export `type` values. */
export const TOKEN_TYPES = [
	'color',
	'spacing',
	'sizing',
	'borderRadius',
	'borderWidth',
	'boxShadow',
	'fontFamilies',
	'fontSizes',
	'fontWeights',
	'lineHeights',
	'letterSpacing',
	'duration',
	'cubicBezier',
	'opacity',
	'other',
] as const;

/** A valid token export type, drawn from the closed {@link TOKEN_TYPES} vocabulary. */
export type TokenType = (typeof TOKEN_TYPES)[number];

/**
 * Type guard: whether a value is one of the closed {@link TOKEN_TYPES}.
 * @param value - The value to check (typically a token's declared `type`).
 * @returns Whether `value` is a valid {@link TokenType}.
 */
export function isTokenType(value: unknown): value is TokenType {
	return typeof value === 'string' && (TOKEN_TYPES as readonly string[]).includes(value);
}
