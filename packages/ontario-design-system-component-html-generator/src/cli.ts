#!/usr/bin/env node
import { mkdirSync, writeFileSync } from 'fs';
import { existsSync } from 'fs';
import { readFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { Command } from 'commander';
import { generateSamples } from './index.js';
import type { ComponentSample, SampleFormatterOptions } from './types.js';

const INIT_TEMPLATE = `/**
 * Ontario Design System — Sample Generator config
 *
 * Each entry in the \`samples\` array defines one HTML sample to generate.
 * Run the generator with:
 *
 *   ontario-design-system-component-html-generator --samplesFile ./samples.config.js --outputDirectory ./output
 *
 * @type {import('@ongov/ontario-design-system-component-html-generator').ComponentSample[]}
 */

export const samples = [
  {
    component: 'ontario-button',
    html: '<ontario-button type="primary" label="Click me"></ontario-button>',
    outputFile: 'ontario-button.html',
    description: 'Primary button from Ontario Design System',
    includeStyles: true,
  },
  // Add more component samples here:
  // {
  //   component: 'ontario-input',
  //   html: '<ontario-input name="email" label="Email address"></ontario-input>',
  //   outputFile: 'ontario-input.html',
  //   description: 'Text input from Ontario Design System',
  //   includeStyles: true,
  // },
];
`;

const DEFAULT_SAMPLES_PATH = fileURLToPath(new URL('./sample-config.js', import.meta.url));

async function loadSamples(samplesFilePath: string): Promise<ComponentSample[] | null> {
	const resolvedPath = path.resolve(samplesFilePath);

	if (resolvedPath.toLowerCase().endsWith('.json')) {
		const raw = await readFile(resolvedPath, 'utf8');
		const parsed = JSON.parse(raw) as unknown;

		if (Array.isArray(parsed)) {
			return parsed as ComponentSample[];
		}

		if (parsed && typeof parsed === 'object' && Array.isArray((parsed as { samples?: unknown }).samples)) {
			return (parsed as { samples: ComponentSample[] }).samples;
		}

		return null;
	}

	const samplesUrl = pathToFileURL(resolvedPath).href;
	const samplesModule = await import(samplesUrl);
	const samples = samplesModule.samples ?? samplesModule.default;

	if (!Array.isArray(samples)) {
		return null;
	}

	return samples as ComponentSample[];
}

const program = new Command();

program
	.name('ontario-design-system-component-html-generator')
	.description('Generate static HTML samples for Ontario Design System web components.')
	.version('1.0.0');

program
	.command('init')
	.description('Scaffold a starter samples config file that you can customise and expand upon.')
	.argument('[output]', 'Path to write the config file to', 'samples.config.js')
	.option('-f, --force', 'Overwrite the file if it already exists')
	.action((output: string, options: { force: boolean }) => {
		const dest = path.resolve(output);

		if (existsSync(dest) && !options.force) {
			console.error(`File already exists: ${dest}\nUse --force to overwrite.`);
			process.exitCode = 1;
			return;
		}

		mkdirSync(path.dirname(dest), { recursive: true });
		writeFileSync(dest, INIT_TEMPLATE, 'utf8');
		console.info(`Created samples config: ${dest}`);
		console.info(`Edit it, then run:\n  ontario-design-system-component-html-generator --samplesFile ${output}`);
	});

program
	.command('generate', { isDefault: true })
	.description('Generate HTML samples (default command).')
	.option(
		'-o, --outputDirectory <path>',
		'Directory to write generated HTML samples to',
		path.resolve(process.cwd(), 'generated-samples'),
	)
	.option(
		'-s, --samplesFile <path>',
		'Path to a JS/TS module exporting `samples` (or default) or a JSON file containing `samples` or an array',
		DEFAULT_SAMPLES_PATH,
	)
	.option('--no-strip-outer-component', 'Keep the outer component tag in formatted markup')
	.option('--no-remove-styles', 'Keep inline <style> tags from renderer output during formatting')
	.option('--full-document', 'Wrap generated output in a full HTML document with DOCTYPE/html/head/body')
	.action(
		async (options: {
			outputDirectory: string;
			samplesFile: string;
			stripOuterComponent: boolean;
			removeStyles: boolean;
			fullDocument: boolean;
		}) => {
			const outputDirectory = path.resolve(options.outputDirectory);
			mkdirSync(outputDirectory, { recursive: true });

			const samples = await loadSamples(options.samplesFile);

			if (!Array.isArray(samples)) {
				console.error(
					`Could not load samples from: ${options.samplesFile}. Expected one of: JS/TS module with \`samples\` export, default array export, JSON array, or JSON object with \`samples\` array.`,
				);
				process.exitCode = 1;
				return;
			}

			const formatterOptions: SampleFormatterOptions = {
				stripOuterComponent: options.stripOuterComponent,
				removeStyles: options.removeStyles,
				fullDocument: options.fullDocument,
			};

			const result = await generateSamples({ samples, formatterOptions });

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
		},
	);

program.parse();
