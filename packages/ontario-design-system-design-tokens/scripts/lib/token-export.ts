/**
 * @file Shared token-tree conversion helpers for the primitive export
 * scripts (export-figma-tokens.ts, export-platforms.ts). Both exports need
 * the same "infer a portable type from path/value" heuristic so a primitive
 * token (for example `border.width.100`) is described identically regardless
 * of which downstream tool consumes it. Type vocabulary (`fontFamilies`,
 * `fontSizes`, `borderRadius`, `spacing`, `sizing`, etc.) follows the
 * convention used by the GC Design System's token export
 * (github.com/cds-snc/gcds-tokens).
 */
import { normaliseReference, type TokenTree } from './token-tooling.ts';

/**
 * Normalise a single path segment for heuristic matching (lowercase, no separators).
 * @param part - The path segment.
 * @returns The normalised segment.
 */
export function normalisePart(part: string): string {
	return String(part)
		.toLowerCase()
		.replace(/[-_\s]/g, '');
}

/**
 * Infer a portable export type from a token's path and value using heuristics.
 * Shared by every export format (Figma, downstream JSON, Tailwind) so a given
 * token is categorised identically everywhere.
 * @param pathParts - The token's key path.
 * @param value - The token's value.
 * @returns The inferred type, or null if none matched.
 */
export function inferTokenType(pathParts: string[], value: unknown): string | null {
	const parts = pathParts.map(normalisePart);
	const valueString = typeof value === 'string' ? value : '';
	const pathString = parts.join('.');

	if (
		parts.includes('colour') ||
		parts.includes('color') ||
		pathString.includes('background') ||
		pathString.includes('text') ||
		pathString.includes('icon') ||
		pathString.includes('bordercolour') ||
		pathString.includes('bordercolor')
	) {
		return 'color';
	}

	if ((parts.includes('font') && parts.includes('family')) || pathString.includes('fontfamily')) {
		return 'fontFamilies';
	}

	if (
		(parts.includes('font') && parts.includes('size')) ||
		pathString.includes('fontsize') ||
		valueString.includes('fontSize')
	) {
		return 'fontSizes';
	}

	if ((parts.includes('font') && parts.includes('weight')) || pathString.includes('fontweight')) {
		return 'fontWeights';
	}

	if (
		(parts.includes('line') && parts.includes('height')) ||
		parts.includes('lineheight') ||
		pathString.includes('lineheight')
	) {
		return 'lineHeights';
	}

	if (
		(parts.includes('letter') && parts.includes('spacing')) ||
		parts.includes('letterspacing') ||
		pathString.includes('letterspacing')
	) {
		return 'letterSpacing';
	}

	if (parts.includes('opacity')) {
		return 'opacity';
	}

	if (parts.includes('radius') || pathString.includes('borderradius')) {
		return 'borderRadius';
	}

	if (parts.includes('width') && pathString.includes('border')) {
		return 'borderWidth';
	}

	if (
		parts.includes('space') ||
		parts.includes('spacing') ||
		pathString.includes('padding') ||
		pathString.includes('margin') ||
		pathString.includes('gap')
	) {
		return 'spacing';
	}

	if (parts.includes('duration')) {
		return 'duration';
	}

	if (parts.includes('easing')) {
		return 'cubicBezier';
	}

	if (typeof value === 'string' && /^(\d+(\.\d+)?)(px|rem|em|%)$/.test(value)) {
		return 'sizing';
	}

	return null;
}

/**
 * Recursively convert a token tree into typed export nodes (`{ value, type }`),
 * resolving any alias `.value` suffixes. Records a warning for any leaf whose
 * type cannot be inferred.
 * @param node - The current token node.
 * @param context - Accumulated key path and the shared warnings list mutated
 *   during the walk.
 * @returns The converted node.
 */
export function convertTokenTree(node: unknown, context: { pathParts?: string[]; warnings?: string[] } = {}): unknown {
	const pathParts = context.pathParts ?? [];
	const warnings = context.warnings ?? [];

	if (node && typeof node === 'object' && !Array.isArray(node) && Object.prototype.hasOwnProperty.call(node, 'value')) {
		const tree = node as Record<string, unknown>;
		const tokenValue = normaliseReference(tree.value);
		const tokenType = inferTokenType(pathParts, tokenValue);

		if (!tokenType) {
			warnings.push(pathParts.join('.'));
			return { value: tokenValue };
		}

		return {
			value: tokenValue,
			type: tokenType,
		};
	}

	if (!node || typeof node !== 'object' || Array.isArray(node)) {
		return node;
	}

	const output: Record<string, unknown> = {};
	Object.entries(node as Record<string, unknown>).forEach(([key, value]) => {
		output[key] = convertTokenTree(value, { pathParts: [...pathParts, key], warnings });
	});
	return output;
}

/**
 * Set a value at a dot/array path within a nested object, creating
 * intermediate objects as needed.
 * @param tree - The tree to mutate.
 * @param pathParts - The path segments to set the value at.
 * @param value - The value to set.
 */
function setAtPath(tree: TokenTree, pathParts: string[], value: unknown): void {
	let node = tree;
	pathParts.slice(0, -1).forEach((segment) => {
		node[segment] = node[segment] ?? {};
		node = node[segment];
	});
	node[pathParts[pathParts.length - 1]] = value;
}

/** A single resolved Style Dictionary token (from `dictionary.allTokens`). */
export interface ResolvedToken {
	path: string[];
	value?: unknown;
	type?: string;
}

/**
 * Reconstruct a nested token tree from a Style Dictionary dictionary's flat
 * `allTokens` list, wrapping each leaf as a typed `{ value, type }` node.
 * Falls back to the shared heuristic (`inferTokenType`) for any token whose
 * source JSON does not define an explicit `type`.
 * @param allTokens - The resolved Style Dictionary tokens (`dictionary.allTokens`).
 * @returns The typed nested tree and any type-inference warnings.
 */
export function buildTypedTreeFromTokens(allTokens: ResolvedToken[]): { tree: TokenTree; warnings: string[] } {
	const tree: TokenTree = {};
	const warnings: string[] = [];

	allTokens.forEach((token) => {
		const tokenType = token.type || inferTokenType(token.path, token.value);
		if (!tokenType) {
			warnings.push(token.path.join('.'));
		}
		setAtPath(tree, token.path, tokenType ? { value: token.value, type: tokenType } : { value: token.value });
	});

	return { tree, warnings };
}

/**
 * Reconstruct a nested tree of plain values (no `{ value, type }` wrapper)
 * from a Style Dictionary dictionary's flat `allTokens` list. Used to build
 * Tailwind theme entries directly from resolved token values.
 * @param allTokens - The resolved Style Dictionary tokens (`dictionary.allTokens`).
 * @returns The nested plain-value tree.
 */
export function buildValueTreeFromTokens(allTokens: ResolvedToken[]): TokenTree {
	const tree: TokenTree = {};
	allTokens.forEach((token) => {
		setAtPath(tree, token.path, token.value);
	});
	return tree;
}
