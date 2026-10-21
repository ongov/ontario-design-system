#!/usr/bin/env node
/**
 * @file Regenerates test/fixtures/primitive-token-snapshot.json, the
 * known-good snapshot of primitive token counts/names asserted by
 * test/token-output-snapshot.test.ts (DS-2693).
 *
 * Run this after an intentional change to the primitive token set (adding,
 * removing, or renaming a primitive token), review the resulting diff to
 * confirm it matches the intended change, then commit the updated fixture
 * alongside the token change:
 *
 *   node scripts/generate-token-snapshot.ts
 */
import { writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import StyleDictionary from 'style-dictionary';

import { primitiveTransforms } from './lib/transforms.ts';
import { primitivePlatformsConfig } from './config/primitive.config.ts';

const packageRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
process.chdir(packageRoot);

for (const transform of primitiveTransforms) {
	StyleDictionary.registerTransform(transform);
}

const sd = new StyleDictionary(primitivePlatformsConfig);
await sd.hasInitialized;
const dictionary = await sd.getPlatformTokens('css/primitives');
const allTokens = dictionary?.allTokens ?? [];

const byCategory: Record<string, string[]> = {};
allTokens.forEach((token) => {
	const category = token.path[0];
	byCategory[category] ??= [];
	byCategory[category].push(token.path.join('.'));
});

const sortedByCategory: Record<string, { count: number; names: string[] }> = {};
Object.keys(byCategory)
	.sort()
	.forEach((category) => {
		const names = byCategory[category].sort();
		sortedByCategory[category] = { count: names.length, names };
	});

const snapshot = {
	totalCount: allTokens.length,
	byCategory: sortedByCategory,
};

const outputPath = path.join(packageRoot, 'test', 'fixtures', 'primitive-token-snapshot.json');
writeFileSync(outputPath, `${JSON.stringify(snapshot, null, 2)}\n`);

console.log(
	`Wrote ${outputPath} (${snapshot.totalCount} tokens across ${Object.keys(sortedByCategory).length} categories).`,
);
