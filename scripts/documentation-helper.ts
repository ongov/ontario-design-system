#!/usr/bin/env ts-node

import { program } from 'commander';
import { promises as fs } from 'fs';
const colour = require('bash-color');

// Define the commandline arguments for the script
program
	.description('Documentation processing utilities')
	.requiredOption('-f, --file <string>', `File to Process`)
	.option('-df, --destinationFile <string>', `Destination file to write to, if differnt from source file`)
	.option('-p, --prepend <string>', `Text to prepend to file`)
	.option('-d, --debug', 'Enable Debug Mode');

// Set later on after arguments parsed
let debug: boolean = false;
let sourceFilePath: string = '';
let destinationFilePath: string = '';

/**
 * A simple logging class to make logging consistent throughout the file.
 */
class Logging {
	/**
	 * Output informational messages.
	 *
	 * Info messages are printed regardless of the `debug` state.
	 *
	 * Usage is basically the same as using `console.log()`.
	 *
	 * Prints to `stdout` with newline. Multiple arguments can be passed, with the
	 * first used as the primary message and all additional messages appended.
	 * @param message primary message
	 * @param optionalParams additional messages
	 */
	static infoMessage(message?: any, ...optionalParams: any[]): void {
		console.log(message, ...optionalParams);
	}

	/**
	 * Output debug messages.
	 *
	 * Debug messages are printed only when the  of the `debug` state is true.
	 *
	 * Usage is basically the same as using `console.log()`.
	 *
	 * Prints to `stdout` with newline. Multiple arguments can be passed, with the
	 * first used as the primary message and all additional messages appended.
	 * @param message primary message
	 * @param optionalParams additional messages
	 */
	static debugMessage(message?: any, ...optionalParams: any[]): void {
		if (debug) console.log(message, ...optionalParams);
	}

	/**
	 * Output error messages.
	 *
	 * Error messages are printed printed regardless of the `debug` state.
	 *
	 * Usage is basically the same as using `console.error()`.
	 *
	 * Prints to `stderr` with newline. Multiple arguments can be passed, with the
	 * first used as the primary message and all additional messages appended.
	 * @param message primary message
	 * @param optionalParams additional messages
	 */
	static errorMessage(message?: any, ...optionalParams: any[]): void {
		console.error(message, ...optionalParams);
	}
}

/**
 * A simple documenation utility class to allow for easy processing of documenation
 * materials such as `readme.md` files.
 */
class DocumentationUtils {
	/**
	 * Prepend text to the contents of a file.
	 *
	 * Eg. Use this to add front matter to `readme.md` files.
	 *
	 * @param prependText text to prepend to the file
	 * @param fileContents main contents of the file
	 * @returns text with text prepended to it
	 */
	private static prependText(prependText: string, fileContents: string): string {
		const text = `${prependText.replace(/\\n/g, '\n')}${fileContents}`;
		Logging.debugMessage('Preended File Text:', `${colour.green(`${text}`)}`);
		return text;
	}

	/**
	 * Read a file as a `utf-8` string.
	 *
	 * @param filePath file path to read
	 * @returns contents of read file
	 */
	private static async readFile(filePath: string): Promise<string> {
		Logging.debugMessage('Reading', `${colour.green(`${filePath}`)}`);
		return fs.readFile(filePath, 'utf-8');
	}

	/**
	 * Write `utf-8` string to a file.
	 *
	 * @param fileContents contents to write to a file, expects a `utf-8` string
	 * @param filePath path to the file to write
	 * @returns empty Promise if successful
	 */
	private static async writeFile(fileContents: string, filePath: string): Promise<void> {
		Logging.debugMessage('Writing', `${colour.green(`${filePath}`)}`);
		return fs.writeFile(filePath, fileContents, 'utf-8');
	}

	/**
	 * Prepend text to a given file and write it out to a new file, or the same file if no destination provided.
	 *
	 * @param prependText text to prepend to a file
	 * @param sourceFilePath source file to prepend text to
	 * @param destinationFilePath destination file to write the result to, if not provided the  `sourceFilePath` will be used
	 * @returns `true` if successful, `false` if not successful
	 */
	static async prependTextToFile(
		prependText: string,
		sourceFilePath: string,
		destinationFilePath?: string,
	): Promise<boolean> {
		try {
			const destinationFilePathUpdated = destinationFilePath ?? sourceFilePath;
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

// Handle the `prepend` option
if (options.prepend) {
	(async () => {
		const result = await DocumentationUtils.prependTextToFile(options.prepend, sourceFilePath, destinationFilePath);
		if (result) process.exit(0);
		else process.exit(1);
	})();
}
