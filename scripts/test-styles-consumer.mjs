import { spawnSync } from 'node:child_process';
import { cp, lstat, mkdtemp, readdir, realpath, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const stylesPackage = path.join(root, 'packages/ontario-design-system-global-styles');
const fixture = path.join(root, 'tests/styles-consumer');
const packageName = '@ongov/ontario-design-system-global-styles';
const args = process.argv.slice(2);

if (args.length !== 0 && (args.length !== 2 || args[0] !== '--tarball' || !args[1].endsWith('.tgz'))) {
	throw new Error('Usage: pnpm run test:styles-consumer [--tarball /absolute/path/to/package.tgz]');
}

const suppliedTarball = args.length ? path.resolve(args[1]) : undefined;
const env = { ...process.env };
delete env.SASS_PATH;
delete env.NODE_PATH;
delete env.NODE_OPTIONS;

function run(command, commandArgs, cwd) {
	const result = spawnSync(command, commandArgs, { cwd, env, stdio: 'inherit' });
	if (result.error) {
		throw result.error;
	}
	if (result.status !== 0) {
		throw new Error(`${command} ${commandArgs.join(' ')} failed (${result.signal ?? result.status}).`);
	}
}

const temporaryRoot = await realpath(await mkdtemp(path.join(tmpdir(), 'ontario-styles-consumer-')));
const relativeTemporaryRoot = path.relative(await realpath(root), await realpath(temporaryRoot));

try {
	if (
		relativeTemporaryRoot === '' ||
		(relativeTemporaryRoot !== '..' &&
			!relativeTemporaryRoot.startsWith(`..${path.sep}`) &&
			!path.isAbsolute(relativeTemporaryRoot))
	) {
		throw new Error('The consumer must run outside the repository. Set TMPDIR to an external directory.');
	}

	let tarball = suppliedTarball;
	if (!tarball) {
		console.log('Packing the existing global-styles build (run pnpm run build-libs first).');
		run('pnpm', ['pack', '--pack-destination', temporaryRoot], stylesPackage);
		const archives = (await readdir(temporaryRoot)).filter((name) => name.endsWith('.tgz'));
		if (archives.length !== 1) {
			throw new Error(`Expected one packed archive, found ${archives.length}.`);
		}
		tarball = path.join(temporaryRoot, archives[0]);
	}

	const consumer = path.join(temporaryRoot, 'consumer');
	await cp(fixture, consumer, {
		recursive: true,
		filter: (source) => !['node_modules', '.git'].includes(path.basename(source)) && !source.endsWith('.css'),
	});

	console.log(`Installing the isolated consumer at ${consumer}`);
	run('npm', ['ci', '--ignore-scripts', '--no-audit', '--no-fund'], consumer);
	run(
		'npm',
		['install', '--no-save', '--package-lock=false', '--ignore-scripts', '--no-audit', '--no-fund', tarball],
		consumer,
	);

	const installedPackage = path.join(consumer, 'node_modules', packageName);
	if ((await lstat(installedPackage)).isSymbolicLink() || (await realpath(installedPackage)) !== installedPackage) {
		throw new Error('Expected an extracted package inside the consumer, not a workspace link.');
	}

	console.log('Compiling the consumer examples and full theme using only installed package files.');
	run('npm', ['test'], consumer);
	console.log('PASS: the packaged styles compile in an isolated consumer.');
} finally {
	await rm(temporaryRoot, { recursive: true, force: true });
}
