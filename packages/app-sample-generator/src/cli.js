#!/usr/bin/env node
import { generateSamples } from './index';
// Basic CLI argument parsing
const args = process.argv.slice(2);
const options = {};
for (let i = 0; i < args.length; i++) {
	if (args[i] === '--iconDirectory' && args[i + 1]) {
		options.iconDirectory = args[i + 1];
		i++;
	}
	if (args[i] === '--outputDirectory' && args[i + 1]) {
		options.outputDirectory = args[i + 1];
		i++;
	}
}
generateSamples(options);
