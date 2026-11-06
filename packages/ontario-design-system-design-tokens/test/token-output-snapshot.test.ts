/**
 * @file CI guardrail (DS-2693): asserts the primitive Style Dictionary
 * output's token counts and names, per category, match a known-good
 * snapshot (test/fixtures/primitive-token-snapshot.json). Catches an
 * accidental deletion/rename of a primitive token that wouldn't otherwise
 * fail the build — a missing/renamed token still produces valid
 * CSS/SCSS/JS/TS output, just with fewer or different variables.
 *
 * If a change intentionally adds/removes/renames primitive tokens,
 * regenerate the fixture:
 *
 *   node scripts/generate-token-snapshot.ts
 *
 * or update it by hand to match the new expected shape.
 */
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import StyleDictionary from 'style-dictionary';
import type { TransformedToken } from 'style-dictionary/types';

import { primitiveTransforms } from '../scripts/lib/transforms.ts';
import { primitivePlatformsConfig } from '../scripts/config/primitive.config.ts';

/** Shape of test/fixtures/primitive-token-snapshot.json. */
interface TokenSnapshot {
	totalCount: number;
	byCategory: Record<string, { count: number; names: string[] }>;
}

const packageRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const originalCwd = process.cwd();
const snapshot: TokenSnapshot = JSON.parse(
	readFileSync(path.join(packageRoot, 'test', 'fixtures', 'primitive-token-snapshot.json'), 'utf8'),
);

let allTokens: TransformedToken[];

// Style Dictionary resolves its `source` glob relative to process.cwd().
beforeAll(async () => {
	process.chdir(packageRoot);
	for (const transform of primitiveTransforms) {
		StyleDictionary.registerTransform(transform);
	}

	const sd = new StyleDictionary(primitivePlatformsConfig);
	await sd.hasInitialized;
	const dictionary = await sd.getPlatformTokens('css/primitives');
	allTokens = dictionary.allTokens;
});

// Restore the original cwd so this suite doesn't leak global process state into
// other test files running in the same worker.
afterAll(() => {
	process.chdir(originalCwd);
});

describe('primitive token output snapshot', () => {
	it('emits the expected total token count', () => {
		expect(allTokens.length).toBe(snapshot.totalCount);
	});

	Object.entries(snapshot.byCategory).forEach(([category, expected]) => {
		it(`emits the expected count and names for the "${category}" category`, () => {
			const actualNames = allTokens
				.filter((token) => token.path[0] === category)
				.map((token) => token.path.join('.'))
				.sort();

			expect(actualNames.length).toBe(expected.count);
			expect(actualNames).toEqual(expected.names);
		});
	});

	it('does not introduce any category missing from the snapshot', () => {
		const actualCategories = new Set(allTokens.map((token) => token.path[0]));
		const snapshotCategories = new Set(Object.keys(snapshot.byCategory));
		expect([...actualCategories].sort()).toEqual([...snapshotCategories].sort());
	});
});

/**
 * The name snapshot above won't catch a value typo (e.g. a wrong hue or
 * spacing step), so pin a small set of representative transformed values across
 * categories. These are asserted on the Style Dictionary output, so they also
 * cover the px -> rem conversion. Keep this list short; it is a spot-check, not
 * a second full snapshot.
 */
describe('primitive token output values', () => {
	it.each([
		['colour.greyscale.0', 'hsl(0, 0%, 100%)'],
		['colour.greyscale.100', 'hsl(0, 0%, 10%)'],
		['colour.accent.blue.50', 'hsl(202, 61%, 50%)'],
		['colour.accent.gold.50', 'hsl(45, 63%, 49%)'],
		['space.400', '1rem'],
		['radius.100', '0.25rem'],
		['border.width.100', '0.0625rem'],
		['font.size.400', '1rem'],
		// Breakpoints are authored in em, so they are not converted.
		['breakpoint.medium', '73em'],
	])('%s resolves to %s', (name, expected) => {
		const token = allTokens.find((candidate) => candidate.path.join('.') === name);
		expect(token, `token "${name}" should exist`).toBeDefined();
		expect(token?.value).toBe(expected);
	});
});
