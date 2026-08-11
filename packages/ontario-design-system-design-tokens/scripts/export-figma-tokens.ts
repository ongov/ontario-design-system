/**
 * @file Exports the primitive tokens as a Figma Variables-compatible JSON
 * bundle (exports/figma/figma-tokens.json). Runs the linter as a pre-flight
 * check and infers Figma token types from token paths and values via the
 * shared scripts/lib/token-export.ts heuristic. Scoped to the Core
 * (primitive) layer for the DS-2685 work; Semantic and Component layers are
 * added by later Epics (see scripts/lib/token-tooling.ts's layerConfig).
 */
import fs from 'node:fs';
import path from 'node:path';
import { lintTokens, loadLayerTrees, rootDir } from './lib/token-tooling.ts';
import { convertTokenTree } from './lib/token-export.ts';

const outputFile = path.join(rootDir, 'exports', 'figma', 'figma-tokens.json');

/**
 * Build the Figma export bundle from the loaded layer trees.
 * @returns The Figma-compatible export payload and any type-inference warnings.
 */
function buildExportBundle(): {
	payload: { version: string; updatedAt: string; updatedBy: string; values: Record<string, any> };
	warnings: string[];
} {
	const layerTrees = loadLayerTrees();
	const warnings: string[] = [];

	// Only the Core (primitive) layer exists so far; Semantic/Component are
	// added here once those layers land in later Epics.
	const values = {
		Core: convertTokenTree(layerTrees.Core, { warnings }),
	};

	return {
		payload: {
			version: '65',
			updatedAt: new Date().toISOString(),
			updatedBy: process.env.FIGMA_UPDATED_BY || 'ODS Design Token Laboratory',
			values,
		},
		warnings,
	};
}

const lintResults = lintTokens({ fix: false });
if (lintResults.errors.length > 0) {
	console.error(`Token lint failed with ${lintResults.errors.length} errors. Run "pnpm run lint:tokens".`);
	process.exit(1);
}

const { payload, warnings } = buildExportBundle();
fs.mkdirSync(path.dirname(outputFile), { recursive: true });
fs.writeFileSync(outputFile, `${JSON.stringify(payload, null, 2)}\n`);

console.log(`Wrote Figma export: ${path.relative(rootDir, outputFile)}`);
if (warnings.length > 0) {
	console.log(`Type inference warnings: ${warnings.length}`);
	warnings.slice(0, 25).forEach((warning) => console.log(` - ${warning}`));
}
