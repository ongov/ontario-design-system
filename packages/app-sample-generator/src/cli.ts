#!/usr/bin/env node
import { mkdirSync, writeFileSync } from 'fs';
import path from 'path';
import { generateSamples } from './index.js';
import { samples } from './sample-config.js';

// Basic CLI argument parsing
const args = process.argv.slice(2);
const options: any = {};

for (let i = 0; i < args.length; i++) {
	if (args[i] === '--outputDirectory' && args[i + 1]) {
		options.outputDirectory = args[i + 1];
		i++;
	}
}

const outputDirectory = options.outputDirectory || path.resolve(process.cwd(), 'generated-samples');
mkdirSync(outputDirectory, { recursive: true });

const result = await generateSamples({ samples });

for (const item of result.items) {
	if (!item.success || !item.renderedHtml) {
		console.error(`Failed to render ${item.sample.component}: ${item.error ?? 'Unknown error'}`);
		continue;
	}

	const outputPath = path.join(outputDirectory, item.sample.outputFile);
	writeFileSync(outputPath, `${item.renderedHtml}\n`, 'utf8');
}

if (result.summary.failed > 0) {
	console.warn(`Sample generation completed with ${result.summary.failed} failures.`);
	process.exitCode = 1;
} else {
	console.info(`Generated ${result.summary.succeeded} samples in ${outputDirectory}.`);
}
