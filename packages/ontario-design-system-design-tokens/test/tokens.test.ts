import { describe, it, expect, beforeAll } from 'vitest';
import { readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const packageRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

// The tooling resolves paths from process.cwd(), so run from the package root.
beforeAll(() => {
	process.chdir(packageRoot);
});

describe('primitive colour tokens', () => {
	it('ships one file per hue plus grey and system (14 files)', () => {
		const colourDir = path.join(packageRoot, 'tokens', 'primitives', 'colour');
		const files = readdirSync(colourDir)
			.filter((file) => file.endsWith('.json'))
			.sort();

		expect(files).toEqual(
			[
				'blue.json',
				'gold.json',
				'green.json',
				'grey.json',
				'lime.json',
				'magenta.json',
				'orange.json',
				'purple.json',
				'red.json',
				'sky.json',
				'system.json',
				'taupe.json',
				'teal.json',
				'yellow.json',
			].sort(),
		);
	});
});

describe('token linter', () => {
	it('passes with no alias/integrity errors against the committed primitives', async () => {
		const { lintTokens } = await import('../scripts/lib/token-tooling.ts');
		const results = lintTokens({ fix: false });

		expect(results.filesChecked).toBeGreaterThan(0);
		expect(results.errors).toEqual([]);
	});
});
