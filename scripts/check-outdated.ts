import { executeCommand, getDirectories } from './utils';
import path from 'path';
import fs from 'fs';

// Check outdated dependencies in a specified directory
const checkOutdated = async (directory: string) => {
	console.log(`Checking outdated dependencies in directory: ${directory}`);
	// Execute the command
	executeCommand(`npm outdated`, directory);
};

// Get paths to all workspace packages in `/packages` directory
const getWorkspacePackages = async () => {
	const packagesDir = path.resolve(__dirname, '../packages');
	if (!fs.existsSync(packagesDir)) {
		console.error('Packages directory not found.');
		process.exit(1);
	}
	const packages = await getDirectories('./packages');
	return packages;
};

// Main function to run outdated checks in root and workspace packages
const main = async () => {
	console.log('Checking outdated dependencies...');
	// Check outdated dependencies in root directory
	const rootDirectory = path.join(__dirname, '..');
	// await checkOutdated(rootDirectory);
	// Check outdated dependencies in workspace packages
	const packages = await getWorkspacePackages();
	for (const pkg of packages) {
		console.log(`Checking outdated dependencies in package: ${pkg}`);
		const pkgDirectory = path.resolve(__dirname, `../packages/${pkg}`);
		await checkOutdated(pkgDirectory);
	}

	console.log('Outdated check complete.');
};

main();
