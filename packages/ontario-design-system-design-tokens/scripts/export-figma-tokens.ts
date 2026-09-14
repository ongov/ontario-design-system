/**
 * @file Exports the primitive tokens as a Figma Variables-compatible JSON
 * bundle (exports/figma/figma-tokens.json). Runs the linter as a pre-flight
 * check and infers Figma token types from token paths and values. Scoped to
 * the Core (primitive) layer for the DS-2685 work.
 */
import fs from 'node:fs';
import path from 'node:path';
import { lintTokens, loadLayerTrees, normaliseReference, rootDir } from './lib/token-tooling.ts';

const outputFile = path.join(rootDir, 'exports', 'figma', 'figma-tokens.json');

const warnings: string[] = [];

/**
 * Normalise a single path segment for heuristic matching (lowercase, no separators).
 * @param part - The path segment.
 * @returns The normalised segment.
 */
function normalisePart(part: string): string {
	return String(part)
		.toLowerCase()
		.replace(/[-_\s]/g, '');
}

/**
 * Infer a Figma token type from a token's path and value using heuristics.
 * @param pathParts - The token's key path.
 * @param value - The token's value.
 * @returns The inferred Figma type, or null if none matched.
 */
function inferTokenType(pathParts: string[], value: unknown): string | null {
	const parts = pathParts.map(normalisePart);
	const valueString = typeof value === 'string' ? value : '';
	const pathString = parts.join('.');

	if (
		parts.includes('colour') ||
		parts.includes('color') ||
		pathString.includes('background') ||
		pathString.includes('text') ||
		pathString.includes('icon') ||
		pathString.includes('border')
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

	if (
		parts.includes('space') ||
		parts.includes('spacing') ||
		pathString.includes('padding') ||
		pathString.includes('margin') ||
		pathString.includes('gap')
	) {
		return 'spacing';
	}

	if (typeof value === 'string' && /^(\d+(\.\d+)?)(px|rem|em|%)$/.test(value)) {
		return 'sizing';
	}

	return null;
}

/**
 * Recursively convert a token tree into Figma token nodes, adding an inferred
 * type to each leaf. Records a warning for any leaf whose type cannot be inferred.
 * @param node - The current token node.
 * @param pathParts - Accumulated key path to the current node.
 * @returns The converted node.
 */
function convertNode(node: unknown, pathParts: string[] = []): unknown {
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
		output[key] = convertNode(value, [...pathParts, key]);
	});
	return output;
}

/**
 * Build the Figma export bundle from the loaded layer trees.
 * @returns The Figma-compatible export payload.
 */
function buildExportBundle(): { version: string; updatedAt: string; updatedBy: string; values: Record<string, any> } {
	const layerTrees = loadLayerTrees();
	const values = {
		Core: convertNode(layerTrees.Core),
		Semantic: convertNode(layerTrees.Semantic),
		Component: convertNode(layerTrees.Component),
	};

	return {
		version: '65',
		updatedAt: new Date().toISOString(),
		updatedBy: process.env.FIGMA_UPDATED_BY || 'ODS Design Token Laboratory',
		values,
	};
}

const lintResults = lintTokens({ fix: false });
if (lintResults.errors.length > 0) {
	console.error(`Token lint failed with ${lintResults.errors.length} errors. Run "pnpm run lint:tokens".`);
	process.exit(1);
}

const exportPayload = buildExportBundle();
fs.mkdirSync(path.dirname(outputFile), { recursive: true });
fs.writeFileSync(outputFile, `${JSON.stringify(exportPayload, null, 2)}\n`);

console.log(`Wrote Figma export: ${path.relative(rootDir, outputFile)}`);
if (warnings.length > 0) {
	console.log(`Type inference warnings: ${warnings.length}`);
	warnings.slice(0, 25).forEach((warning) => console.log(` - ${warning}`));
}
