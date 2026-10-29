import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const packageDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sourceDirectory = path.join(packageDirectory, 'src/components/ontario-icon');
const destinationDirectory = path.resolve(packageDirectory, '../docusaurus/docs/components/ontario-icon');
const manifest: { icons: { name: string }[] } = JSON.parse(
	await readFile(path.join(sourceDirectory, 'icon-manifest.json'), 'utf8'),
);

for (const relativePath of ['readme.md', ...manifest.icons.map((icon) => `${icon.name}/readme.md`)]) {
	const source = await readFile(path.join(sourceDirectory, relativePath), 'utf8');
	const mdxContent = source.replaceAll('<span style="color:red">**[DEPRECATED]**</span>', '**[DEPRECATED]**');
	const destination = path.join(destinationDirectory, relativePath);
	await mkdir(path.dirname(destination), { recursive: true });
	await writeFile(destination, mdxContent);
}

console.log(`Prepared icon overview and ${manifest.icons.length} per-icon pages for Docusaurus.`);
