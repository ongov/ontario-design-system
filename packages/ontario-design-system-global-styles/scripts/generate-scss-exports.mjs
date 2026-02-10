import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const THIS_FILE = fileURLToPath(import.meta.url);
const PACKAGE_ROOT = path.resolve(path.dirname(THIS_FILE), '..');
const PACKAGE_JSON_PATH = path.join(PACKAGE_ROOT, 'package.json');
const SCSS_SOURCE_ROOT = path.join(PACKAGE_ROOT, 'src/styles/scss');
const DIST_SCSS_ROOT = './dist/styles/scss';

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

const DIST_WILDCARD_EXPORTS = [
	'./dist/styles/scss/1-variables/*',
	'./dist/styles/scss/2-tools/functions/*',
	'./dist/styles/scss/2-tools/mixins/*',
	'./dist/styles/scss/2-tools/placeholder/*',
	'./dist/styles/scss/3-generics/*',
	'./dist/styles/scss/4-elements/*',
	'./dist/styles/scss/5-layout/*',
	'./dist/styles/scss/6-components/*',
	'./dist/styles/scss/7-overrides/*',
];

async function collectPartialFiles(rootDir) {
	const partialFiles = [];

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

function toExtensionlessSpecifier(relativePartialPath) {
	const directory = path.posix.dirname(relativePartialPath);
	const partialFilename = path.posix.basename(relativePartialPath);
	const extensionless = partialFilename.slice(1, -'.scss'.length);
	return `${directory}/${extensionless}`;
}

function buildOrderedExports(existingExports, extensionlessSpecifiers) {
	const nextExports = {};
	const consumedKeys = new Set();

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

	setExport('./dist/styles/scss/theme.scss', `${DIST_SCSS_ROOT}/theme.scss`);
	setExport('./dist/styles/scss/theme', `${DIST_SCSS_ROOT}/theme.scss`);

	for (const specifier of extensionlessSpecifiers) {
		setExport(
			`./dist/styles/scss/${specifier}`,
			`${DIST_SCSS_ROOT}/${path.posix.dirname(specifier)}/_${path.posix.basename(specifier)}.scss`,
		);
	}

	for (const wildcardKey of DIST_WILDCARD_EXPORTS) {
		setExport(wildcardKey, wildcardKey.replace('./dist/styles/scss', DIST_SCSS_ROOT));
	}

	for (const [key, value] of Object.entries(existingExports)) {
		if (!consumedKeys.has(key)) {
			setExport(key, value);
		}
	}

	return nextExports;
}

async function main() {
	const packageJson = JSON.parse(await readFile(PACKAGE_JSON_PATH, 'utf8'));
	const partialFiles = await collectPartialFiles(SCSS_SOURCE_ROOT);
	const extensionlessSpecifiers = partialFiles.map(toExtensionlessSpecifier);

	packageJson.exports = buildOrderedExports(packageJson.exports, extensionlessSpecifiers);

	await writeFile(PACKAGE_JSON_PATH, `${JSON.stringify(packageJson, null, '\t')}\n`, 'utf8');

	console.log(
		`Generated ${extensionlessSpecifiers.length * 2} explicit extensionless SCSS export aliases in ${PACKAGE_JSON_PATH}`,
	);
}

await main();
