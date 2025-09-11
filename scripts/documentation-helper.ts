#!/usr/bin/env ts-node

/**
 * documentation-helper.ts
 *
 * A utility script for processing documentation files in Ontario Design System repositories.
 *
 * Features:
 * - Prepend front matter or arbitrary text to a single file (see --prepend option)
 * - Batch process files using a YAML mapping file, prepending front matter and copying to a destination directory
 *
 * Usage Examples:
 *
 *  Single file prepend:
 *    ts-node documentation-helper.ts -f <file> -p "---\\ntitle: My Title\\n---" [-df <destinationFile>]
 *
 *  Batch mode (recommended for repo-wide documentation management):
 *    ts-node documentation-helper.ts -i <inputDir> -o <destinationDir> [-m <mappingFile>]
 *
 *  - <inputDir>: Directory containing the source documentation files and the mapping YAML file
 *  - <destinationDir>: Directory to write processed files to (directory structure is preserved)
 *  - <mappingFile>: (Optional) YAML mapping file name (default: docs-metadata.yaml)
 *
 *  Example:
 *    ts-node documentation-helper.ts -i ./docs -o ../../app-web-components-documentation/docs
 *
 *  The mapping YAML file (docs-metadata.yaml) should be structured as follows:
 *
 *    files:
 *      relative/path/to/file.md:
 *        frontmatter: |
 *          ---
 *          title: My Title
 *          ---
 *
 *  - The key is the relative path to the file (from inputDir)
 *  - The value is an object with a 'frontmatter' property (YAML block string)
 *  - You can map multiple files, including files with the same name in different subdirectories
 *
 * Example docs-metadata.yaml:
 *
 *    files:
 *      framework-integrations/next-js-ssr/readme.md:
 *        frontmatter: |
 *          ---
 *          title: Next.js Server-Side Rendering (SSR)
 *          ---
 *      another-section/readme.md:
 *        frontmatter: |
 *          ---
 *          title: Another Section
 *          ---
 *
 * This script is intended to be run with ts-node or as a Node.js CLI tool.
 */

import { program } from 'commander';
import { promises as fs } from 'fs';
const colour = require('bash-color');
import * as path from 'path';
import * as yaml from 'js-yaml';

const DEFAULT_MAPPING_FILE = 'docs-metadata.yaml';

// Define the commandline arguments for the script
program
	.description('Documentation processing utilities')
	.option('-f, --file <string>', `File to Process`)
	.option('-df, --destinationFile <string>', `Destination file to write to, if different from source file`)
	.option('-p, --prepend <string>', `Text to prepend to file`)
	.option('-d, --debug', 'Enable Debug Mode')
	.option('-i, --inputDir <string>', 'Input directory containing files to process')
	.option('-m, --mappingFile <string>', 'YAML mapping file', DEFAULT_MAPPING_FILE)
	.option('-o, --destinationDir <string>', 'Destination directory for output files');

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
 * A simple documentation utility class to allow for easy processing of documentation
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

	/**
	 * Recursively walks through a directory and returns a list of all file paths relative to the specified base directory.
	 *
	 * @param currentDirectory - The directory to start walking from.
	 * @param baseDirectory - The base directory to which all returned file paths will be relative.
	 * @returns A promise that resolves to an array of relative file paths found within the directory tree.
	 */
	private static async walkDirectory(currentDirectory: string, baseDirectory: string): Promise<string[]> {
		let fileList: string[] = [];
		const directoryEntries = await fs.readdir(currentDirectory, { withFileTypes: true });

		for (const entry of directoryEntries) {
			const relativePath = path.relative(baseDirectory, path.join(currentDirectory, entry.name));

			if (entry.isDirectory()) {
				fileList.push(
					...(await DocumentationUtils.walkDirectory(path.join(currentDirectory, entry.name), baseDirectory)),
				);
			} else {
				fileList.push(relativePath);
			}
		}

		return fileList;
	}

	/**
	 * Batch process files using a mapping YAML file, prepending front matter and copying to destination.
	 *
	 * For files listed in the mapping file, prepend the specified front matter.
	 * For all other files in the inputDir, copy as-is, preserving directory structure.
	 *
	 * @param inputDirectory Input directory containing files to process
	 * @param destinationDirectory Destination directory for output files
	 * @param mappingFile YAML mapping file (default: docs-metadata.yaml)
	 */
	static async processBatch(
		inputDirectory: string,
		destinationDirectory: string,
		mappingFile?: string,
	): Promise<boolean> {
		type MappingFileType = {
			files: {
				[fileRelativePath: string]: {
					frontmatter: string;
				};
			};
		};

		try {
			const resolvedMappingFilePath = path.resolve(inputDirectory, mappingFile ?? DEFAULT_MAPPING_FILE);
			let mapping: MappingFileType = { files: {} };

			try {
				const mappingFileContents = await fs.readFile(resolvedMappingFilePath, 'utf-8');
				mapping = yaml.load(mappingFileContents) as MappingFileType;
			} catch (e) {
				Logging.debugMessage('No mapping file found or failed to parse, proceeding with copy-only mode.');
			}

			const allRelativeFilePaths = await DocumentationUtils.walkDirectory(inputDirectory, inputDirectory);

			for (const relativeFilePath of allRelativeFilePaths) {
				const sourceFilePath = path.resolve(inputDirectory, relativeFilePath);
				const destinationFilePath = path.resolve(destinationDirectory, relativeFilePath);

				let fileContents = await fs.readFile(sourceFilePath, 'utf-8');
				const mappingConfig = mapping.files[relativeFilePath];

				if (mappingConfig && typeof mappingConfig === 'object' && typeof mappingConfig.frontmatter === 'string') {
					fileContents = `${mappingConfig.frontmatter}\n${fileContents}`;
					Logging.infoMessage(`Prepended front matter: ${sourceFilePath} -> ${destinationFilePath}`);
				} else {
					Logging.infoMessage(`Copied: ${sourceFilePath} -> ${destinationFilePath}`);
				}

				await fs.mkdir(path.dirname(destinationFilePath), { recursive: true });
				await fs.writeFile(destinationFilePath, fileContents, 'utf-8');
			}

			return true;
		} catch (e) {
			Logging.errorMessage('Batch processing failed:', e);
			return false;
		}
	}
}

function exitSuccess() {
	process.exit(0);
}

function exitFailure(message?: string) {
	if (message) {
		console.error(message);
	}
	process.exit(1);
}

function printUsageModes() {
	console.error('Use either:');
	console.error('  Single file mode:   -f <file> -p <text> -df <destinationFile>');
	console.error('  Batch mode:         -i <inputDir> -o <destinationDir> [-m <mappingFile>]');
}

// Parse command line arguments
program.parse();

// Process command arguments
const options = program.opts();
debug = options.debug;
sourceFilePath = options.file;
destinationFilePath = options.destinationFile;

// Restriction: Only one mode (single file or batch) can be used at a time
const isSingleFileMode = !!options.file && !!options.prepend;
const isBatchMode = !!options.inputDir && !!options.destinationDir;

if (isSingleFileMode && isBatchMode) {
	console.error('Error: You cannot use both single-file and batch options at the same time.');
	printUsageModes();
	exitFailure();
}

if (!isSingleFileMode && !isBatchMode) {
	console.error('Error: You must specify either single-file mode or batch mode.');
	printUsageModes();
	exitFailure();
}

if (isSingleFileMode) {
	(async () => {
		const result = await DocumentationUtils.prependTextToFile(options.prepend, sourceFilePath, destinationFilePath);
		if (result) exitSuccess();
		else exitFailure('Failed to prepend text to file.');
	})();
} else if (isBatchMode) {
	const mappingFile = options.mappingFile;
	(async () => {
		const result = await DocumentationUtils.processBatch(options.inputDir, options.destinationDir, mappingFile);
		if (result) exitSuccess();
		else exitFailure('Batch processing failed.');
	})();
}
