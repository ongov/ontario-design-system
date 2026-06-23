// Exports the primitive tokens as downstream JSON consumables: a typed token tree
// (exports/downstream/) and a Tailwind theme mapping (exports/tailwind/). Use
// --target=all|downstream|tailwind to select outputs. Scoped to the Core
// (primitive) layer for the DS-2685 work.
import fs from 'node:fs';
import path from 'node:path';
import { layerConfig, loadLayerTrees, normaliseReference, rootDir } from './lib/token-tooling.mjs';

const args = process.argv.slice(2);
const targetArg = args.find((arg) => arg.startsWith('--target='));
const target = (targetArg ? targetArg.split('=')[1] : 'all').toLowerCase();

if (!['all', 'downstream', 'tailwind'].includes(target)) {
	console.error('Invalid --target value. Use --target=all|downstream|tailwind');
	process.exit(1);
}

/**
 * Whether a node is a leaf token (a plain object with a `value` property).
 * @param {*} node - The node to test.
 * @returns {boolean} True if the node is a leaf token.
 */
function isLeafToken(node) {
	return (
		!!node && typeof node === 'object' && !Array.isArray(node) && Object.prototype.hasOwnProperty.call(node, 'value')
	);
}

/**
 * Infer a downstream token type from a token's path and value using heuristics.
 * @param {string[]} pathParts - The token's key path.
 * @param {*} value - The token's value.
 * @returns {string|null} The inferred type, or null if none matched.
 */
function inferType(pathParts, value) {
	const pathText = pathParts.join('.').toLowerCase();
	if (pathText.includes('colour') || pathText.includes('color') || /^#([0-9a-f]{3,8})$/i.test(String(value)))
		return 'color';
	if (pathText.includes('shadow') || pathText.includes('elevation')) return 'boxShadow';
	if (pathText.includes('duration')) return 'duration';
	if (pathText.includes('easing')) return 'cubicBezier';
	if (pathText.includes('font') && pathText.includes('family')) return 'fontFamilies';
	if (pathText.includes('font') && pathText.includes('weight')) return 'fontWeights';
	if (pathText.includes('font') && pathText.includes('size')) return 'fontSizes';
	if (pathText.includes('line') && pathText.includes('height')) return 'lineHeights';
	if (pathText.includes('letter') && pathText.includes('spacing')) return 'letterSpacing';
	if (pathText.includes('border') && pathText.includes('width')) return 'borderWidth';
	if (pathText.includes('border') && pathText.includes('style')) return 'strokeStyle';
	if (pathText.includes('radius')) return 'borderRadius';
	if (['space', 'spacing', 'padding', 'margin', 'gap'].some((term) => pathText.includes(term))) return 'spacing';
	return null;
}

/**
 * Recursively convert a token tree into a typed tree, resolving aliases and
 * attaching an explicit or inferred type to each leaf.
 * @param {*} node - The current token node.
 * @param {string[]} [pathParts] - Accumulated key path to the current node.
 * @returns {*} The typed token tree.
 */
function toTypedTree(node, pathParts = []) {
	if (isLeafToken(node)) {
		const cleanedValue = normaliseReference(node.value);
		return {
			value: cleanedValue,
			type: node.type || inferType(pathParts, cleanedValue) || 'unknown',
		};
	}

	if (!node || typeof node !== 'object' || Array.isArray(node)) {
		return node;
	}

	const output = {};
	Object.entries(node).forEach(([key, value]) => {
		output[key] = toTypedTree(value, [...pathParts, key]);
	});
	return output;
}

/**
 * Recursively flatten a token tree to bare values (used for the Tailwind theme).
 * @param {*} node - The current token node.
 * @returns {*} The value-only tree.
 */
function toValueTree(node) {
	if (isLeafToken(node)) {
		return normaliseReference(node.value);
	}

	if (!node || typeof node !== 'object' || Array.isArray(node)) {
		return node;
	}

	const output = {};
	Object.entries(node).forEach(([key, value]) => {
		output[key] = toValueTree(value);
	});
	return output;
}

const layerTrees = loadLayerTrees();

/**
 * Builders for each downstream export shape, keyed by hook name.
 * @type {Record<string, () => Record<string, any>>}
 */
const downstreamHooks = {
	odsTokenTree: () => {
		return {
			Tokens: {
				Core: toTypedTree(layerTrees.Core),
				Semantic: toTypedTree(layerTrees.Semantic),
				Component: toTypedTree(layerTrees.Component),
			},
		};
	},
	odsSemanticOnly: () => ({
		Tokens: {
			Semantic: toTypedTree(layerTrees.Semantic),
		},
	}),
	odsComponentOnly: () => ({
		Tokens: {
			Component: toTypedTree(layerTrees.Component),
		},
	}),
	tailwindTheme: () => {
		const merged = {};
		layerConfig.forEach(({ label }) => {
			merged[label] = toValueTree(layerTrees[label]);
		});

		const core = merged.Core || {};
		const semantic = merged.Semantic || {};
		const component = merged.Component || {};

		return {
			theme: {
				colors: core.colour || {},
				spacing: core.space || {},
				fontFamily: core.font?.family || {},
				fontSize: core.font?.size || {},
				fontWeight: core.font?.weight || {},
				lineHeight: core.lineHeight || {},
				letterSpacing: core.letterSpacing || {},
				borderRadius: core.radius || {},
				borderWidth: core.border?.width || {},
				elevation: core.elevation || {},
				motion: core.motion || {},
				semanticColour: semantic.semantic?.colour || {},
				semanticRadius: semantic.semantic?.radius || {},
				semanticBorder: semantic.semantic?.border || {},
				semanticElevation: semantic.semantic?.elevation || {},
				semanticMotion: semantic.semantic?.motion || {},
				component: component.component || {},
			},
		};
	},
};

/**
 * Write a JSON payload to a path relative to the package root, creating directories.
 * @param {string} relativePath - Path relative to the package root.
 * @param {*} payload - The JSON-serialisable payload.
 * @returns {void}
 */
function writeJson(relativePath, payload) {
	const absolutePath = path.join(rootDir, relativePath);
	fs.mkdirSync(path.dirname(absolutePath), { recursive: true });
	fs.writeFileSync(absolutePath, `${JSON.stringify(payload, null, 2)}\n`);
	console.log(`Wrote ${relativePath}`);
}

if (target === 'all' || target === 'downstream') {
	writeJson('exports/downstream/tokens.ods.json', downstreamHooks.odsTokenTree());
	writeJson('exports/downstream/semantic.ods.json', downstreamHooks.odsSemanticOnly());
	writeJson('exports/downstream/component.ods.json', downstreamHooks.odsComponentOnly());
}

if (target === 'all' || target === 'tailwind') {
	writeJson('exports/tailwind/tailwind.tokens.json', downstreamHooks.tailwindTheme());
}
