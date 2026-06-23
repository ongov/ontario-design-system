import { lintTokens } from './lib/token-tooling.mjs';

const args = new Set(process.argv.slice(2));
const fix = args.has('--fix');
const json = args.has('--json');

const results = lintTokens({ fix });

if (json) {
	process.stdout.write(`${JSON.stringify(results, null, 2)}\n`);
} else {
	console.log(`Token files checked: ${results.filesChecked}`);
	if (fix) {
		console.log(`Repairs applied: ${results.fixesApplied}`);
	}
	console.log(`Warnings: ${results.warnings.length}`);
	console.log(`Errors: ${results.errors.length}`);

	if (results.warnings.length > 0) {
		console.log('Warning samples:');
		results.warnings.slice(0, 8).forEach((warning) => {
			const aliasPart = warning.alias ? ` alias=${warning.alias}` : '';
			console.log(` - [${warning.code}] ${warning.file} :: ${warning.tokenPath}${aliasPart}`);
		});
	}

	if (results.errors.length > 0) {
		console.log('Error samples:');
		results.errors.slice(0, 12).forEach((error) => {
			const aliasPart = error.alias ? ` alias=${error.alias}` : '';
			console.log(` - [${error.code}] ${error.file} :: ${error.tokenPath}${aliasPart}`);
		});
	}
}

if (results.errors.length > 0) {
	process.exit(1);
}
