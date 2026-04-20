/// <reference types="node" />
// =========================
// Imports
// =========================
import { stringify } from 'svgson';
import path from 'path';
// =========================
// Constants
// =========================
const iconDirectoryDefault = './src/components/ontario-icon/assets';
const iconNamePrefix = 'ontario-icon-';
const iconsWithoutColour = [
	`${iconNamePrefix}alert-error`,
	`${iconNamePrefix}alert-information`,
	`${iconNamePrefix}alert-success`,
	`${iconNamePrefix}alert-warning`,
	`${iconNamePrefix}dropdown-arrow`,
	`${iconNamePrefix}interac-en`,
	`${iconNamePrefix}interac-fr`,
	`${iconNamePrefix}interac-en-alt`,
	`${iconNamePrefix}interac-fr-alt`,
	`${iconNamePrefix}mastercard`,
	`${iconNamePrefix}mastercard-alt`,
	`${iconNamePrefix}visa`,
];
// =========================
// Utility Functions
// =========================
// File system helpers
async function readdir(iconDirectory) {
	const { promises: fs } = await import('fs');
	return fs.readdir(iconDirectory);
}
async function readFile(iconFilePath, options) {
	const { promises: fs } = await import('fs');
	return fs.readFile(iconFilePath, options);
}
async function writeFile(outputPath, iconComponentTemplate) {
	const { promises: fs } = await import('fs');
	await fs.mkdir(path.dirname(outputPath), { recursive: true });
	await fs.writeFile(outputPath, iconComponentTemplate, { encoding: 'utf-8' });
}
// String helpers
const getId = (iconName) => {
	return iconName.startsWith(iconNamePrefix) ? iconName.replace(iconNamePrefix, '') : iconName;
};
const toPascalCase = (str) => (' ' + str).toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
const useIconColour = (iconName) => {
	return !iconsWithoutColour.includes(iconName);
};
// =========================
// Template Generation
// =========================
const getIconComponentTemplate = (iconObject, iconName) => {
	// TODO: Replace this with full Stencil component template if needed
	return stringify(iconObject);
};
const sampleConfig = [];
export async function generateSamples(options = {}) {
	const outputDirectory = options.outputDirectory || './generated-samples';
	for (const entry of sampleConfig) {
		const outputPath = path.join(outputDirectory, `${entry.tag}.html`);
		await writeFile(outputPath, entry.sample);
	}
}
