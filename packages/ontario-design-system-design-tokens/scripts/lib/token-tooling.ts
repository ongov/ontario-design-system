/**
 * @file Shared library for the token tooling.
 *
 * Provides token file discovery, layer loading and deep-merging, alias
 * normalisation/resolution, and the alias/integrity linter used by the
 * generator, linter CLI, and exporters.
 */
import fs from 'node:fs';
import path from 'node:path';

/** A parsed token tree (or subtree) node. Kept loose since token shapes vary by layer. */
export type TokenTree = Record<string, any>;

/** Absolute path to the package root (the current working directory at run time). */
export const rootDir = process.cwd();
/** Absolute path to the package's tokens/ directory. */
export const tokensDir = path.join(rootDir, 'tokens');

/** A single token layer's config: its display label and its directory name under tokens/. */
export interface LayerConfigEntry {
	label: string;
	dir: string;
}

/**
 * Token layers to load, in cascade order. Only the Core (primitive) layer exists
 * during the DS-2685 primitive-layer work; Semantic and Component layers are added
 * by later Epics. Keep this list in sync with the directories under tokens/.
 */
export const layerConfig: LayerConfigEntry[] = [{ label: 'Core', dir: 'primitives' }];

/**
 * Strip the legacy `.value` suffix from a Style Dictionary alias reference.
 * @param value - A token value; only strings are transformed.
 * @returns The value with any `.value` alias suffix removed.
 */
export function normaliseReference(value: unknown): unknown {
	if (typeof value !== 'string') return value;
	return value.replace(/\.value(?=}|$)/g, '');
}

/**
 * Recursively merge `source` into `target`, combining nested objects.
 * @param target - The object mutated in place.
 * @param source - The object merged into the target.
 * @returns The mutated target.
 */
export function deepMerge(target: TokenTree, source: TokenTree): TokenTree {
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
 * @param dir - Absolute directory path to search.
 * @returns Absolute paths of the JSON files found.
 */
function collectJsonFiles(dir: string): string[] {
	if (!fs.existsSync(dir)) {
		return [];
	}
	const found: string[] = [];
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
 * @returns Absolute paths of all token files.
 */
export function listTokenFiles(): string[] {
	return layerConfig.flatMap(({ dir }) => collectJsonFiles(path.join(tokensDir, dir)));
}

/**
 * Read and deep-merge all token files in a single layer directory.
 * @param layerDir - Layer directory name under tokens/ (e.g. 'primitives').
 * @returns The merged token tree for the layer.
 */
export function readLayer(layerDir: string): TokenTree {
	const layerTree: TokenTree = {};

	collectJsonFiles(path.join(tokensDir, layerDir)).forEach((filePath) => {
		const source = JSON.parse(fs.readFileSync(filePath, 'utf8'));
		deepMerge(layerTree, source);
	});

	return layerTree;
}

/**
 * Load each configured layer as its own merged token tree, keyed by layer label.
 * @returns Map of layer label to token tree.
 */
export function loadLayerTrees(): Record<string, TokenTree> {
	return Object.fromEntries(layerConfig.map(({ label, dir }) => [label, readLayer(dir)]));
}

/**
 * Load all layers merged into a single token tree (used for alias resolution).
 * @returns The merged token tree across all layers.
 */
export function loadMergedTokens(): TokenTree {
	return layerConfig.reduce((merged, { dir }) => deepMerge(merged, readLayer(dir)), {} as TokenTree);
}

/**
 * Depth-first walk an object tree, invoking `visit` for every object node.
 * @param node - The current node.
 * @param visit - Visitor callback.
 * @param pathParts - Accumulated key path to the current node.
 */
export function walkObject(
	node: unknown,
	visit: (node: TokenTree, pathParts: string[]) => void,
	pathParts: string[] = [],
): void {
	if (node && typeof node === 'object' && !Array.isArray(node)) {
		visit(node as TokenTree, pathParts);
		Object.entries(node as TokenTree).forEach(([key, value]) => {
			walkObject(value, visit, [...pathParts, key]);
		});
	}
}

/**
 * Resolve a dot-delimited token path against a token tree.
 * @param root - The token tree to resolve against.
 * @param dotPath - Dot path, with or without a legacy `.value` suffix.
 * @returns The resolved node, or `undefined` if the path does not exist.
 */
export function getByPath(root: TokenTree, dotPath: string): unknown {
	const cleanPath = normaliseReference(dotPath) as string;
	return cleanPath.split('.').reduce((current: any, segment) => {
		if (!current || typeof current !== 'object') {
			return undefined;
		}
		return current[segment];
	}, root);
}

/**
 * Rewrite legacy `.value` alias suffixes in place within a parsed token tree.
 * @param node - The current node to inspect and mutate.
 * @returns The number of alias values repaired.
 */
function traverseAndMutateAlias(node: unknown): number {
	let fixes = 0;

	if (!node || typeof node !== 'object' || Array.isArray(node)) {
		return fixes;
	}

	const tree = node as TokenTree;

	if (Object.prototype.hasOwnProperty.call(tree, 'value') && typeof tree.value === 'string') {
		const alias = tree.value.match(/^\{(.+)\}$/);
		if (alias) {
			const repairedPath = normaliseReference(alias[1]) as string;
			const repairedValue = `{${repairedPath}}`;
			if (repairedValue !== tree.value) {
				tree.value = repairedValue;
				fixes += 1;
			}
		}
	}

	Object.values(tree).forEach((value) => {
		fixes += traverseAndMutateAlias(value);
	});

	return fixes;
}

/** A single lint issue (error or warning) reported against a token file. */
export interface LintIssue {
	code: string;
	message: string;
	file: string;
	tokenPath: string;
	alias?: string;
	repairedAlias?: string;
}

/** The collected results of a lintTokens() run. */
export interface LintResults {
	errors: LintIssue[];
	warnings: LintIssue[];
	fixesApplied: number;
	filesChecked: number;
}

/**
 * Lint every token file for alias integrity and structural issues.
 *
 * Detects missing alias targets (error), legacy `.value` alias suffixes
 * (warning, auto-fixable), and tokens with a type but no value (warning).
 * @param options - When `fix` is true, repairs legacy alias suffixes in place.
 * @returns The collected lint results.
 */
export function lintTokens({ fix = false }: { fix?: boolean } = {}): LintResults {
	const mergedTokens = loadMergedTokens();
	const issues: LintResults = {
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
			const aliasPath = normaliseReference(aliasPathRaw) as string;

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
