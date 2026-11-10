import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { describe, it, expect } from 'vitest';

const srcDir = join(__dirname, '..', '..');
const componentsDir = join(srcDir, 'components');

// Files that are allowed to build console messages directly
const allowedMessageBuilders = [
	join('utils', 'console-message'),
	join('utils', 'validation', 'component-message.ts'),
	join('utils', 'validation', 'invalid-prop-warning.ts'),
];

function listSourceFiles(dir: string): string[] {
	return readdirSync(dir).flatMap((entry) => {
		const path = join(dir, entry);
		if (statSync(path).isDirectory()) {
			return listSourceFiles(path);
		}
		return /\.tsx?$/.test(entry) && !/\.(spec|e2e|vrt)\.tsx?$/.test(entry) && entry !== 'components.d.ts' ? [path] : [];
	});
}

describe('component console messages', () => {
	it('are printed through the shared message helpers instead of being built by hand', () => {
		const offenders = listSourceFiles(srcDir)
			.filter((file) => !allowedMessageBuilders.some((allowed) => relative(srcDir, file).startsWith(allowed)))
			.filter((file) => /ConsoleMessageClass|printConsoleMessage/.test(readFileSync(file, 'utf8')))
			.map((file) => relative(srcDir, file));

		expect(offenders).toEqual([]);
	});

	it('name the component that owns the code', () => {
		const mismatches: string[] = [];

		readdirSync(componentsDir)
			.filter((entry) => statSync(join(componentsDir, entry)).isDirectory())
			.forEach((componentDir) => {
				const files = listSourceFiles(join(componentsDir, componentDir));
				const ownedTags = new Set(
					files.flatMap((file) =>
						[...readFileSync(file, 'utf8').matchAll(/@Component\(\{[^}]*?tag:\s*'([^']+)'/gs)].map(
							(match) => `<${match[1]}>`,
						),
					),
				);

				files.forEach((file) => {
					[...readFileSync(file, 'utf8').matchAll(/componentTag:\s*'(<[^']+>)'/g)].forEach((match) => {
						if (!ownedTags.has(match[1])) {
							mismatches.push(`${relative(srcDir, file)} names ${match[1]}`);
						}
					});
				});
			});

		expect(mismatches).toEqual([]);
	});
});
