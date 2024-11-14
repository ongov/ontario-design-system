import { execSync } from 'child_process';
import * as fs from 'fs/promises';

/**
 * Executes a given shell command in a specified directory.
 *
 * @param command - The command to execute.
 * @param directory - The directory in which to execute the command.
 * @returns void
 */
const executeCommand = (command: string, directory: string): string => {
	// console.log(`Executing command: ${command} in directory: ${directory}`);
	// execSync(command, { cwd: directory, stdio: 'inherit' });
	try {
		console.log(`Executing command: "${command}" in directory: "${directory}"`);
		const result = execSync(command, { cwd: directory, stdio: 'inherit' });
		return result.toString();
	} catch (error) {
		console.error(`Error executing command: "${command}" in directory: "${directory}"`);
		console.error(error);
		process.exit(1);
	}
};

/**
 * Retrieves the names of all directories within a given source directory.
 *
 * @param source - The path to the source directory.
 * @returns A promise that resolves to an array of directory names.
 */
const getDirectories = async (source: string): Promise<string[]> => {
	const dirents = await fs.readdir(source, { withFileTypes: true });
	return dirents.filter((dirent) => dirent.isDirectory()).map((dirent) => dirent.name);
};

// Export the functions
export { executeCommand, getDirectories };
