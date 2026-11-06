/**
 * @file Tests for the DS-2692 export tooling: the Figma JSON export
 * (`scripts/export-figma-tokens.ts`) and the typed JSON/Tailwind Style
 * Dictionary platforms (`scripts/lib/export-platforms.ts`), both built on
 * the shared type-inference helpers in `scripts/lib/token-export.ts`.
 */
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { execFileSync } from 'node:child_process';
import { readFileSync, rmSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import StyleDictionary from 'style-dictionary';

import { primitiveTransforms } from '../scripts/lib/transforms.ts';
import { exportPlatformsConfig } from '../scripts/lib/export-platforms.ts';
import { convertTokenTree, inferTokenType } from '../scripts/lib/token-export.ts';
import { loadLayerTrees } from '../scripts/lib/token-tooling.ts';

const packageRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const originalCwd = process.cwd();

// Style Dictionary resolves its `source` glob relative to process.cwd().
beforeAll(() => {
	process.chdir(packageRoot);
	for (const transform of primitiveTransforms) {
		StyleDictionary.registerTransform(transform);
	}
});

// Restore the original cwd so this suite doesn't leak global process state into
// other test files running in the same worker.
afterAll(() => {
	process.chdir(originalCwd);
});

describe('shared type-inference (scripts/lib/token-export.ts)', () => {
	it('does not mis-type border width/style primitives as colour', () => {
		expect(inferTokenType(['border', 'width', '100'], '1px')).toBe('borderWidth');
		expect(inferTokenType(['border', 'style', 'solid'], 'solid')).not.toBe('color');
	});

	it('still types explicit border colour tokens as colour', () => {
		expect(inferTokenType(['borderColour', 'default'], 'hsl(0 0% 0%)')).toBe('color');
	});

	it('converts a token tree into typed { value, type } nodes', () => {
		const converted = convertTokenTree({ space: { 400: { value: '16px' } } }) as any;
		expect(converted.space['400']).toEqual({ value: '16px', type: 'spacing' });
	});
});

describe('Figma export (scripts/export-figma-tokens.ts)', () => {
	it('exports Core-only, correctly-typed border tokens', () => {
		rmSync(path.join(packageRoot, 'dist', 'figma'), { recursive: true, force: true });
		execFileSync('node', ['scripts/export-figma-tokens.ts'], { cwd: packageRoot });

		const bundle = JSON.parse(readFileSync(path.join(packageRoot, 'dist', 'figma', 'figma-tokens.json'), 'utf8'));
		expect(Object.keys(bundle.values)).toEqual(['Core']);
		expect(bundle.values.Core.border.width['100']).toEqual({ value: '1px', type: 'borderWidth' });
		expect(bundle.values.Core.border.width['100'].type).not.toBe('color');
	});
});

describe('typed JSON/Tailwind platforms (scripts/lib/export-platforms.ts)', () => {
	beforeAll(async () => {
		const sd = new StyleDictionary(exportPlatformsConfig);
		await sd.hasInitialized;
		await sd.buildAllPlatforms();
	});

	it('emits a Core-only typed JSON bundle', () => {
		const bundle = JSON.parse(readFileSync(path.join(packageRoot, 'dist', 'json', 'tokens.ods.json'), 'utf8'));
		expect(Object.keys(bundle.tokens)).toEqual(['Core']);
		expect(bundle.tokens.Core.space['400']).toEqual({ value: '16px', type: 'spacing' });
		expect(bundle.tokens.Core.border.width['100']).toEqual({ value: '1px', type: 'borderWidth' });
	});

	it('emits a Tailwind theme.extend mapping built from the same primitives', () => {
		const theme = JSON.parse(readFileSync(path.join(packageRoot, 'dist', 'tailwind', 'tailwind.tokens.json'), 'utf8'))
			.theme.extend;

		expect(theme.spacing['400']).toBe('16px');
		expect(theme.borderWidth['100']).toBe('1px');
		expect(theme.screens.medium).toBe('73em');
		// Accent hues are lifted a level (colour.accent.blue -> colors.blue).
		expect(theme.colors.blue['0']).toBe('hsl(0 0% 100%)');
		expect(theme.colors.greyscale['0']).toBe('hsl(0 0% 100%)');
	});

	it('matches the Core layer loaded directly from tokens/primitives', () => {
		const { Core } = loadLayerTrees();
		const theme = JSON.parse(readFileSync(path.join(packageRoot, 'dist', 'tailwind', 'tailwind.tokens.json'), 'utf8'))
			.theme.extend;
		expect(theme.spacing['400']).toBe(Core.space['400'].value);
	});
});

describe('published export entry points (package.json)', () => {
	it('maps each export file to its built path under dist/', () => {
		const pkg = JSON.parse(readFileSync(path.join(packageRoot, 'package.json'), 'utf8'));
		expect(pkg.exports['./figma-tokens.json']).toBe('./dist/figma/figma-tokens.json');
		expect(pkg.exports['./tokens.ods.json']).toBe('./dist/json/tokens.ods.json');
		expect(pkg.exports['./tailwind.tokens.json']).toBe('./dist/tailwind/tailwind.tokens.json');
	});
});
