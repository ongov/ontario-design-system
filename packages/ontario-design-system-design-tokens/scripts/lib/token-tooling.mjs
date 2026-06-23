// Shared library for the token tooling. Provides token file discovery, layer
// loading and deep-merging, alias normalisation/resolution, and the alias/
// integrity linter used by the generator, linter CLI, and exporters.
import fs from 'node:fs';
import path from 'node:path';

export const rootDir = process.cwd();
export const tokensDir = path.join(rootDir, 'tokens');
// Only the Core (primitive) layer exists during the DS-2685 primitive-layer work.
// Semantic and Component layers are added by later Epics; keep this list in sync
// with the directories that actually exist under tokens/.
export const layerConfig = [{ label: 'Core', dir: 'primitives' }];

export function normaliseReference(value) {
	if (typeof value !== 'string') return value;
	return value.replace(/\.value(?=}|$)/g, '');
}

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

// Recursively collect .json token files under a directory, sorted for stable order.
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

export function listTokenFiles() {
	const filePaths = [];

	layerConfig.forEach(({ dir }) => {
		filePaths.push(...collectJsonFiles(path.join(tokensDir, dir)));
	});

	return filePaths;
}

export function readLayer(layerDir) {
	const layerTree = {};

	collectJsonFiles(path.join(tokensDir, layerDir)).forEach((filePath) => {
		const source = JSON.parse(fs.readFileSync(filePath, 'utf8'));
		deepMerge(layerTree, source);
	});

	return layerTree;
}

export function loadLayerTrees() {
	const result = {};
	layerConfig.forEach(({ label, dir }) => {
		result[label] = readLayer(dir);
	});
	return result;
}

export function loadMergedTokens() {
	const merged = {};
	layerConfig.forEach(({ dir }) => {
		deepMerge(merged, readLayer(dir));
	});
	return merged;
}

export function walkObject(node, visit, pathParts = []) {
	if (node && typeof node === 'object' && !Array.isArray(node)) {
		visit(node, pathParts);
		Object.entries(node).forEach(([key, value]) => {
			walkObject(value, visit, [...pathParts, key]);
		});
	}
}

export function getByPath(root, dotPath) {
	const cleanPath = normaliseReference(dotPath);
	return cleanPath.split('.').reduce((current, segment) => {
		if (!current || typeof current !== 'object') {
			return undefined;
		}
		return current[segment];
	}, root);
}

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
