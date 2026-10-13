import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const packageRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const originalCwd = process.cwd();

// The tooling resolves paths from process.cwd(), so run from the package root.
beforeAll(() => {
	process.chdir(packageRoot);
});

// Restore the original cwd so this suite doesn't leak global process state into
// other test files running in the same worker.
afterAll(() => {
	process.chdir(originalCwd);
});

/** The `type` vocabulary expected for each non-colour primitive category, keyed by top-level file. */
const NON_COLOUR_TYPES: Record<string, string[]> = {
	'space.json': ['spacing'],
	'radius.json': ['borderRadius'],
	'border.json': ['borderWidth', 'other'],
	'elevation.json': ['boxShadow'],
	'typography.json': ['fontFamilies', 'fontWeights', 'fontSizes', 'lineHeights', 'letterSpacing'],
	'motion.json': ['duration', 'cubicBezier'],
	'z-index.json': ['other'],
	'breakpoint.json': ['sizing'],
};

/**
 * Recursively collect every leaf token (a node with a `value` property) in a token tree.
 * @param node - The current node to inspect.
 * @param pathParts - The accumulated dot-path segments leading to this node.
 * @returns A flat list of `{ path, token }` pairs for every leaf token found.
 */
function collectLeafTokens(
	node: unknown,
	pathParts: string[] = [],
): { path: string; token: { value: unknown; type?: unknown } }[] {
	if (!node || typeof node !== 'object' || Array.isArray(node)) {
		return [];
	}

	const tree = node as Record<string, unknown>;
	if (Object.prototype.hasOwnProperty.call(tree, 'value')) {
		return [{ path: pathParts.join('.'), token: tree as { value: unknown; type?: unknown } }];
	}

	return Object.entries(tree).flatMap(([key, value]) => collectLeafTokens(value, [...pathParts, key]));
}

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

describe('non-colour primitive tokens', () => {
	const primitivesDir = path.join(packageRoot, 'tokens', 'primitives');

	it('ships one file per category (space, typography, radius, border, elevation, motion, z-index, breakpoint)', () => {
		const files = readdirSync(primitivesDir)
			.filter((file) => file.endsWith('.json'))
			.sort();

		expect(files).toEqual(Object.keys(NON_COLOUR_TYPES).sort());
	});

	it.each(Object.entries(NON_COLOUR_TYPES))(
		'every token in %s has a string value and an explicit, expected type',
		(file, allowedTypes) => {
			const tree = JSON.parse(readFileSync(path.join(primitivesDir, file), 'utf8'));
			const leafTokens = collectLeafTokens(tree);

			expect(leafTokens.length).toBeGreaterThan(0);

			for (const { path: tokenPath, token } of leafTokens) {
				expect(typeof token.value, `${file}#${tokenPath} should have a string value`).toBe('string');
				expect(typeof token.type, `${file}#${tokenPath} should have an explicit type`).toBe('string');
				expect(allowedTypes, `${file}#${tokenPath} has unexpected type "${token.type}"`).toContain(token.type);
			}
		},
	);
});

describe('token linter', () => {
	it('passes with no alias/integrity errors against the committed primitives', async () => {
		const { lintTokens } = await import('../scripts/lib/token-tooling.ts');
		const results = lintTokens({ fix: false });

		expect(results.filesChecked).toBeGreaterThan(0);
		expect(results.errors).toEqual([]);
	});

	describe('type enforcement (checkTokenType)', () => {
		it('flags a token with a value but no declared type', async () => {
			const { checkTokenType } = await import('../scripts/lib/token-tooling.ts');
			const issue = checkTokenType({ value: '10px' }, 'space.400', 'space.json');

			expect(issue).toEqual({
				code: 'missing_type',
				message: 'Token has a value but no declared type.',
				file: 'space.json',
				tokenPath: 'space.400',
			});
		});

		it('flags a token whose declared type is outside the closed vocabulary', async () => {
			const { checkTokenType } = await import('../scripts/lib/token-tooling.ts');
			const issue = checkTokenType({ value: '10px', type: 'bogus' }, 'space.400', 'space.json');

			expect(issue?.code).toBe('invalid_type');
			expect(issue?.message).toContain('bogus');
		});

		it('passes a token with a valid declared type', async () => {
			const { checkTokenType } = await import('../scripts/lib/token-tooling.ts');
			const issue = checkTokenType({ value: '10px', type: 'spacing' }, 'space.400', 'space.json');

			expect(issue).toBeNull();
		});
	});
});

describe('token type vocabulary (scripts/lib/token-types.ts)', () => {
	it('accepts every type currently declared across the primitive tier', async () => {
		const { isTokenType } = await import('../scripts/lib/token-types.ts');
		const colourDir = path.join(packageRoot, 'tokens', 'primitives', 'colour');
		const primitivesDir = path.join(packageRoot, 'tokens', 'primitives');

		const files = [
			...readdirSync(colourDir)
				.filter((file) => file.endsWith('.json'))
				.map((file) => path.join(colourDir, file)),
			...Object.keys(NON_COLOUR_TYPES).map((file) => path.join(primitivesDir, file)),
		];

		const declaredTypes = new Set<unknown>();
		for (const file of files) {
			const tree = JSON.parse(readFileSync(file, 'utf8'));
			collectLeafTokens(tree).forEach(({ token }) => declaredTypes.add(token.type));
		}

		expect(declaredTypes.size).toBeGreaterThan(0);
		for (const type of declaredTypes) {
			expect(isTokenType(type), `"${type}" should be a valid TokenType`).toBe(true);
		}
	});

	it('rejects an unknown type string', async () => {
		const { isTokenType } = await import('../scripts/lib/token-types.ts');
		expect(isTokenType('not-a-real-type')).toBe(false);
		expect(isTokenType(undefined)).toBe(false);
	});
});
