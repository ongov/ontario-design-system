#!/usr/bin/env ts-node

import { program } from 'commander';
import { promises as fs } from 'fs';
const colour = require('bash-color');

program
	.description('Documentation processing utilities')
	.option('-p, --prepend <string>', `Text to prepend to file`)
	.requiredOption('-f, --file <string>', `File to Process`)
	.option('-df, --destinationFile <string>', `Destination file to write to, if differnt from source file`)
	.option('-d, --debug', 'Enable Debug Mode');

// Set later on after arguments parsed
let debug: boolean = false;
let sourceFilePath: string = '';
let destinationFilePath: string = '';

class Logging {
	static infoMessage(message?: any, ...optionalParams: any[]) {
		console.log(message, ...optionalParams);
	}

	static debugMessage(message?: any, ...optionalParams: any[]) {
		if (debug) console.log(message, ...optionalParams);
	}

	static errorMessage(message?: any, ...optionalParams: any[]) {
		console.error(message, ...optionalParams);
	}
}

class DocumentationUtils {
	private static prependText(prependText: string, fileContents: string): string {
		const text = `${prependText.replace(/\\n/g, '\n')}${fileContents}`;
		Logging.debugMessage('Preended File:', `${colour.green(`${text}`)}`);
		return text;
	}

	private static async readFile(filePath: string): Promise<string> {
		Logging.debugMessage('Reading', `${colour.green(`${filePath}`)}`);
		return fs.readFile(filePath, 'utf-8');
	}

	private static async writeFile(fileContents: string, filePath: string): Promise<void> {
		Logging.debugMessage('Writing', `${colour.green(`${filePath}`)}`);
		return fs.writeFile(filePath, fileContents, 'utf-8');
	}

	static async prependTextToFile(
		prependText: string,
		sourceFilePath: string,
		destinationfilePath?: string,
	): Promise<boolean> {
		try {
			const destinationFilePathUpdated = destinationfilePath ?? sourceFilePath;
			const fileContents = await this.readFile(sourceFilePath);
			const prependedFileContents = this.prependText(prependText, fileContents);
			await this.writeFile(prependedFileContents, destinationFilePathUpdated);
		} catch (e) {
			const error = e as Error;
			Logging.errorMessage(error.stack);
			return false;
		}

		return true;
	}
}

// Parse command line arguments
program.parse();

// Process command arguments
const options = program.opts();
debug = options.debug;
sourceFilePath = options.file;
destinationFilePath = options.destinationFile;
if (options.prepend) {
	(async () => {
		const result = await DocumentationUtils.prependTextToFile(options.prepend, sourceFilePath, destinationFilePath);
		if (result) process.exit(0);
		else process.exit(1);
	})();
}
