// Generates package.json `exports` entries for SCSS sources and built SCSS output.
// The script discovers underscore-prefixed SCSS partials and creates extensionless
// aliases (e.g., `./styles/scss/2-tools/mixins/foo`) that point to dist files.
// The generator is idempotent: with no SCSS input changes, reruns produce no diff.
//
// How to use:
// 1) Run from the repository root:
//    node packages/ontario-design-system-global-styles/scripts/generate-scss-exports.mjs
// 2) Commit the updated `packages/ontario-design-system-global-styles/package.json`.
import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Resolve package-local paths from this script's location.
const THIS_FILE = fileURLToPath(import.meta.url);
const PACKAGE_ROOT = path.resolve(path.dirname(THIS_FILE), '..');
const PACKAGE_JSON_PATH = path.join(PACKAGE_ROOT, 'package.json');
const SCSS_SOURCE_ROOT = path.join(PACKAGE_ROOT, 'src/styles/scss');
const DIST_SCSS_ROOT = './dist/styles/scss';
const ANSI = {
	reset: '\x1b[0m',
	blue: '\x1b[34m',
	cyan: '\x1b[36m',
	green: '\x1b[32m',
	yellow: '\x1b[33m',
};

/**
 * Writes a coloured status line for script progress.
 *
 * @param {string} label - Short step label.
 * @param {string} message - Step details.
 * @param {string} [colour=ANSI.blue] - ANSI colour prefix.
 * @returns {void}
 */
function logStep(label, message, colour = ANSI.blue) {
	console.log(`${colour}[${label}]${ANSI.reset} ${message}`);
}

// Wildcard exports for source-facing SCSS imports.
const STYLE_WILDCARD_EXPORTS = [
	'./styles/scss/1-variables/*',
	'./styles/scss/2-tools/functions/*',
	'./styles/scss/2-tools/mixins/*',
	'./styles/scss/2-tools/placeholder/*',
	'./styles/scss/3-generics/*',
	'./styles/scss/4-elements/*',
	'./styles/scss/5-layout/*',
	'./styles/scss/6-components/*',
	'./styles/scss/7-overrides/*',
];

/**
 * Recursively collects underscore-prefixed `.scss` partial file paths from a root directory.
 *
 * @param {string} rootDir - Absolute path to the SCSS source root.
 * @returns {Promise<string[]>} Sorted list of root-relative partial file paths with POSIX separators.
 */
async function collectPartialFiles(rootDir) {
	const partialFiles = [];

	/**
	 * Depth-first directory walk that collects matching partial files.
	 *
	 * @param {string} currentDir - Directory to scan recursively.
	 * @returns {Promise<void>}
	 */
	async function walk(currentDir) {
		const entries = await readdir(currentDir, { withFileTypes: true });
		for (const entry of entries) {
			const fullPath = path.join(currentDir, entry.name);
			if (entry.isDirectory()) {
				await walk(fullPath);
				continue;
			}

			if (!entry.isFile() || !entry.name.endsWith('.scss') || !entry.name.startsWith('_')) {
				continue;
			}

			partialFiles.push(path.relative(rootDir, fullPath).split(path.sep).join('/'));
		}
	}

	await walk(rootDir);
	return partialFiles.sort();
}

/**
 * Converts a partial path like `2-tools/mixins/_foo.scss` to an extensionless
 * specifier like `2-tools/mixins/foo`.
 *
 * @param {string} relativePartialPath - Root-relative SCSS partial path.
 * @returns {string} Extensionless specifier used in package exports.
 */
function toExtensionlessSpecifier(relativePartialPath) {
	const directory = path.posix.dirname(relativePartialPath);
	const partialFilename = path.posix.basename(relativePartialPath);
	const extensionless = partialFilename.slice(1, -'.scss'.length);
	return `${directory}/${extensionless}`;
}

/**
 * Builds an ordered `exports` object for package.json.
 * Canonical keys are written first, generated style aliases are appended,
 * and unrecognized existing keys are preserved (except legacy dist SCSS keys).
 *
 * @param {Record<string, string | Record<string, string>>} existingExports - Current package exports map.
 * @param {string[]} extensionlessSpecifiers - Generated extensionless SCSS specifiers.
 * @returns {Record<string, string | Record<string, string>>} Ordered exports map.
 */
function buildOrderedExports(existingExports, extensionlessSpecifiers) {
	const nextExports = {};
	const consumedKeys = new Set();

	/**
	 * Adds an export entry and marks the key as handled.
	 *
	 * @param {string} key - Export key.
	 * @param {string | Record<string, string>} value - Export target value.
	 * @returns {void}
	 */
	function setExport(key, value) {
		nextExports[key] = value;
		consumedKeys.add(key);
	}

	setExport('.', existingExports['.']);
	setExport(
		'./styles/css/compiled/ontario-theme.min.css',
		`${DIST_SCSS_ROOT.replace('/scss', '/css/compiled')}/ontario-theme.min.css`,
	);
	setExport('./styles/scss/theme.scss', `${DIST_SCSS_ROOT}/theme.scss`);
	setExport('./styles/scss/theme', `${DIST_SCSS_ROOT}/theme.scss`);

	for (const specifier of extensionlessSpecifiers) {
		setExport(
			`./styles/scss/${specifier}`,
			`${DIST_SCSS_ROOT}/${path.posix.dirname(specifier)}/_${path.posix.basename(specifier)}.scss`,
		);
	}

	for (const wildcardKey of STYLE_WILDCARD_EXPORTS) {
		setExport(wildcardKey, wildcardKey.replace('./styles/scss', DIST_SCSS_ROOT));
	}

	for (const [key, value] of Object.entries(existingExports)) {
		if (!consumedKeys.has(key) && !key.startsWith('./dist/styles/scss/')) {
			setExport(key, value);
		}
	}

	return nextExports;
}

/**
 * Regenerates SCSS-related exports in package.json and writes the updated file.
 *
 * @returns {Promise<void>}
 */
async function main() {
	logStep('start', 'Generating SCSS exports map', ANSI.cyan);
	logStep('read', `Loading ${PACKAGE_JSON_PATH}`);
	const packageJson = JSON.parse(await readFile(PACKAGE_JSON_PATH, 'utf8'));
	logStep('scan', `Scanning partials in ${SCSS_SOURCE_ROOT}`);
	const partialFiles = await collectPartialFiles(SCSS_SOURCE_ROOT);
	const extensionlessSpecifiers = partialFiles.map(toExtensionlessSpecifier);
	logStep('build', `Preparing ${extensionlessSpecifiers.length} extensionless aliases`, ANSI.yellow);

	packageJson.exports = buildOrderedExports(packageJson.exports, extensionlessSpecifiers);

	logStep('write', `Writing ${PACKAGE_JSON_PATH}`);
	await writeFile(PACKAGE_JSON_PATH, `${JSON.stringify(packageJson, null, '\t')}\n`, 'utf8');

	logStep('done', `Generated ${extensionlessSpecifiers.length} explicit extensionless SCSS export aliases`, ANSI.green);
}

await main();
