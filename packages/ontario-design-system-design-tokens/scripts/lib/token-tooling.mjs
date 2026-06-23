// Shared library for the token tooling. Provides token file discovery, layer
// loading and deep-merging, alias normalisation/resolution, and the alias/
// integrity linter used by the generator, linter CLI, and exporters.
import fs from 'node:fs';
import path from 'node:path';

/** Absolute path to the package root (the current working directory at run time). */
export const rootDir = process.cwd();
/** Absolute path to the package's tokens/ directory. */
export const tokensDir = path.join(rootDir, 'tokens');
/**
 * Token layers to load, in cascade order. Only the Core (primitive) layer exists
 * during the DS-2685 primitive-layer work; Semantic and Component layers are added
 * by later Epics. Keep this list in sync with the directories under tokens/.
 * @type {{ label: string, dir: string }[]}
 */
export const layerConfig = [{ label: 'Core', dir: 'primitives' }];

/**
 * Strip the legacy `.value` suffix from a Style Dictionary alias reference.
 * @param {*} value - A token value; only strings are transformed.
 * @returns {*} The value with any `.value` alias suffix removed.
 */
export function normaliseReference(value) {
	if (typeof value !== 'string') return value;
	return value.replace(/\.value(?=}|$)/g, '');
}

/**
 * Recursively merge `source` into `target`, combining nested objects.
 * @param {Record<string, any>} target - The object mutated in place.
 * @param {Record<string, any>} source - The object merged into the target.
 * @returns {Record<string, any>} The mutated target.
 */
export function deepMerge(target, source) {
	Object.entries(source).forEach(([key, value]) => {
		if (value && typeof value === 'object' && !Array.isArray(value)) {
			if (!(key in target) || !target[key] || typeof target[key] !== 'object' || Array.isArray(target[key])) {
				target[key] = {};
			}
			deepMerge(target[key], value);
			return;
		}

		target[key] = value;
	});

	return target;
}

/**
 * Recursively collect `.json` token files under a directory, sorted for a stable
 * order. Returns an empty array if the directory does not exist.
 * @param {string} dir - Absolute directory path to search.
 * @returns {string[]} Absolute paths of the JSON files found.
 */
function collectJsonFiles(dir) {
	if (!fs.existsSync(dir)) {
		return [];
	}
	const found = [];
	fs.readdirSync(dir)
		.sort((a, b) => a.localeCompare(b))
		.forEach((entry) => {
			const absolute = path.join(dir, entry);
			if (fs.statSync(absolute).isDirectory()) {
				found.push(...collectJsonFiles(absolute));
			} else if (entry.endsWith('.json')) {
				found.push(absolute);
			}
		});
	return found;
}

/**
 * List every token JSON file across the configured layers.
 * @returns {string[]} Absolute paths of all token files.
 */
export function listTokenFiles() {
	const filePaths = [];

	layerConfig.forEach(({ dir }) => {
		filePaths.push(...collectJsonFiles(path.join(tokensDir, dir)));
	});

	return filePaths;
}

/**
 * Read and deep-merge all token files in a single layer directory.
 * @param {string} layerDir - Layer directory name under tokens/ (e.g. 'primitives').
 * @returns {Record<string, any>} The merged token tree for the layer.
 */
export function readLayer(layerDir) {
	const layerTree = {};

	collectJsonFiles(path.join(tokensDir, layerDir)).forEach((filePath) => {
		const source = JSON.parse(fs.readFileSync(filePath, 'utf8'));
		deepMerge(layerTree, source);
	});

	return layerTree;
}

/**
 * Load each configured layer as its own merged token tree, keyed by layer label.
 * @returns {Record<string, Record<string, any>>} Map of layer label to token tree.
 */
export function loadLayerTrees() {
	const result = {};
	layerConfig.forEach(({ label, dir }) => {
		result[label] = readLayer(dir);
	});
	return result;
}

/**
 * Load all layers merged into a single token tree (used for alias resolution).
 * @returns {Record<string, any>} The merged token tree across all layers.
 */
export function loadMergedTokens() {
	const merged = {};
	layerConfig.forEach(({ dir }) => {
		deepMerge(merged, readLayer(dir));
	});
	return merged;
}

/**
 * Depth-first walk an object tree, invoking `visit` for every object node.
 * @param {*} node - The current node.
 * @param {(node: Record<string, any>, pathParts: string[]) => void} visit - Visitor callback.
 * @param {string[]} [pathParts] - Accumulated key path to the current node.
 * @returns {void}
 */
export function walkObject(node, visit, pathParts = []) {
	if (node && typeof node === 'object' && !Array.isArray(node)) {
		visit(node, pathParts);
		Object.entries(node).forEach(([key, value]) => {
			walkObject(value, visit, [...pathParts, key]);
		});
	}
}

/**
 * Resolve a dot-delimited token path against a token tree.
 * @param {Record<string, any>} root - The token tree to resolve against.
 * @param {string} dotPath - Dot path, with or without a legacy `.value` suffix.
 * @returns {*} The resolved node, or `undefined` if the path does not exist.
 */
export function getByPath(root, dotPath) {
	const cleanPath = normaliseReference(dotPath);
	return cleanPath.split('.').reduce((current, segment) => {
		if (!current || typeof current !== 'object') {
			return undefined;
		}
		return current[segment];
	}, root);
}

/**
 * Rewrite legacy `.value` alias suffixes in place within a parsed token tree.
 * @param {*} node - The current node to inspect and mutate.
 * @returns {number} The number of alias values repaired.
 */
function traverseAndMutateAlias(node) {
	let fixes = 0;

	if (!node || typeof node !== 'object' || Array.isArray(node)) {
		return fixes;
	}

	if (Object.prototype.hasOwnProperty.call(node, 'value') && typeof node.value === 'string') {
		const alias = node.value.match(/^\{(.+)\}$/);
		if (alias) {
			const repairedPath = normaliseReference(alias[1]);
			const repairedValue = `{${repairedPath}}`;
			if (repairedValue !== node.value) {
				node.value = repairedValue;
				fixes += 1;
			}
		}
	}

	Object.values(node).forEach((value) => {
		fixes += traverseAndMutateAlias(value);
	});

	return fixes;
}

/**
 * Lint every token file for alias integrity and structural issues.
 *
 * Detects missing alias targets (error), legacy `.value` alias suffixes
 * (warning, auto-fixable), and tokens with a type but no value (warning).
 * @param {{ fix?: boolean }} [options] - When `fix` is true, repairs legacy alias
 *   suffixes in place.
 * @returns {{ errors: object[], warnings: object[], fixesApplied: number, filesChecked: number }}
 *   The collected lint results.
 */
export function lintTokens({ fix = false } = {}) {
	const mergedTokens = loadMergedTokens();
	const issues = {
		errors: [],
		warnings: [],
		fixesApplied: 0,
		filesChecked: 0,
	};

	listTokenFiles().forEach((filePath) => {
		issues.filesChecked += 1;
		const relativePath = path.relative(rootDir, filePath);
		const parsed = JSON.parse(fs.readFileSync(filePath, 'utf8'));

		if (fix) {
			const applied = traverseAndMutateAlias(parsed);
			if (applied > 0) {
				issues.fixesApplied += applied;
				fs.writeFileSync(filePath, `${JSON.stringify(parsed, null, 2)}\n`);
			}
		}

		walkObject(parsed, (node, pathParts) => {
			if (!Object.prototype.hasOwnProperty.call(node, 'value')) {
				if (Object.prototype.hasOwnProperty.call(node, 'type')) {
					issues.warnings.push({
						code: 'type_without_value',
						message: 'Token has a type field but no value field.',
						file: relativePath,
						tokenPath: pathParts.join('.'),
					});
				}
				return;
			}

			const value = node.value;
			const tokenPath = pathParts.join('.');
			if (typeof value !== 'string') {
				return;
			}

			const aliasMatch = value.match(/^\{(.+)\}$/);
			if (!aliasMatch) {
				return;
			}

			const aliasPathRaw = aliasMatch[1];
			const aliasPath = normaliseReference(aliasPathRaw);

			if (aliasPathRaw !== aliasPath) {
				issues.warnings.push({
					code: 'legacy_alias_suffix',
					message: 'Alias includes legacy .value suffix.',
					file: relativePath,
					tokenPath,
					alias: aliasPathRaw,
					repairedAlias: aliasPath,
				});
			}

			const aliasTarget = getByPath(mergedTokens, aliasPath);
			if (aliasTarget === undefined) {
				issues.errors.push({
					code: 'missing_alias_target',
					message: 'Alias target path does not exist.',
					file: relativePath,
					tokenPath,
					alias: aliasPath,
				});
			}
		});
	});

	return issues;
}
