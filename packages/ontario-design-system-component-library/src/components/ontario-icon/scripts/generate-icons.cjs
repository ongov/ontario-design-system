/**
 * Generate icon components from icon-manifest.json and their SVG assets.
 * Run with `pnpm run generate:icons`; use `--check` for a non-writing drift check.
 */
const { mkdir, readdir, readFile, rm, writeFile } = require('fs/promises');
const path = require('path');
const { parse, stringify } = require('svgson');
const prettier = require('prettier');

const iconNamePrefix = 'ontario-icon-';
const componentDirectory = path.resolve(__dirname, '..');
const assetDirectory = path.join(componentDirectory, 'assets');
const manifestPath = path.join(componentDirectory, 'icon-manifest.json');
const componentDemoPath = path.resolve(componentDirectory, '../../index.html');
const allowedCategories = new Set(['primary', 'secondary', 'social', 'payment', 'flag', 'alert', 'other']);
const allowedColourCapabilities = new Set(['configurable', 'fixed', 'multicolour']);
const allowedPreviewBackgrounds = new Set(['dark']);
const allowedDefaultColours = new Set(['black', 'blue', 'grey', 'white', 'inherit']);
const galleryStartMarker = '<!-- ICON_GALLERY_START -->';
const galleryEndMarker = '<!-- ICON_GALLERY_END -->';

const getId = (iconName) => (iconName.startsWith(iconNamePrefix) ? iconName.slice(iconNamePrefix.length) : iconName);

const toPascalCase = (string) =>
	(' ' + string).toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (match, character) => character.toUpperCase());

const getIconGalleryMarkup = (icons) => {
	const categoryLabels = {
		primary: 'Primary',
		secondary: 'Secondary',
		social: 'Social',
		payment: 'Payment',
		flag: 'Flags',
		alert: 'Alerts',
		other: 'Other',
	};
	const categoryOrder = Object.keys(categoryLabels);

	return categoryOrder
		.map((category) => {
			const categoryIcons = icons.filter((icon) => icon.category === category);
			if (!categoryIcons.length) {
				return '';
			}

			const iconItems = categoryIcons
				.map((icon) => {
					const previewClass =
						icon.previewBackground === 'dark'
							? 'ontario-icon-gallery__item ontario-icon-gallery__item--dark'
							: 'ontario-icon-gallery__item';
					const iconTag =
						icon.name.length > 36
							? [
									`\t\t\t\t\t\t\t\t\t\t<${icon.name}`,
									'\t\t\t\t\t\t\t\t\t\t\ticon-width="32"',
									`\t\t\t\t\t\t\t\t\t\t></${icon.name}>`,
								].join('\n')
							: `\t\t\t\t\t\t\t\t\t\t<${icon.name} icon-width="32"></${icon.name}>`;

					return [
						`\t\t\t\t\t\t\t\t\t<figure class="${previewClass}">`,
						iconTag,
						`\t\t\t\t\t\t\t\t\t\t<figcaption><code>${icon.name}</code></figcaption>`,
						'\t\t\t\t\t\t\t\t\t</figure>',
					].join('\n');
				})
				.join('\n');

			return [
				`\t\t\t\t\t\t\t<section class="ontario-icon-gallery__group" aria-labelledby="icon-category-${category}">`,
				`\t\t\t\t\t\t\t\t<h3 id="icon-category-${category}">${categoryLabels[category]}</h3>`,
				'\t\t\t\t\t\t\t\t<div class="ontario-icon-gallery__grid">',
				iconItems,
				'\t\t\t\t\t\t\t\t</div>',
				'\t\t\t\t\t\t\t</section>',
			].join('\n');
		})
		.filter(Boolean)
		.join('\n');
};

const updateIconGallery = async (icons, { check = false } = {}) => {
	const demoHtml = await readFile(componentDemoPath, 'utf-8');
	const start = demoHtml.indexOf(galleryStartMarker);
	const end = demoHtml.indexOf(galleryEndMarker);
	if (start === -1 || end === -1 || end < start) {
		throw new Error('Icon gallery markers are missing or out of order in src/index.html.');
	}

	const contentStart = start + galleryStartMarker.length;
	const generatedMarkup = `\n${getIconGalleryMarkup(icons)}\n\t\t\t\t\t\t\t`;
	const updatedHtml = `${demoHtml.slice(0, contentStart)}${generatedMarkup}${demoHtml.slice(end)}`;
	if (check && updatedHtml !== demoHtml) {
		throw new Error('Icon gallery in src/index.html is out of date. Run `pnpm run generate:icons`.');
	}
	if (!check && updatedHtml !== demoHtml) {
		await writeFile(componentDemoPath, updatedHtml);
	}
};

const validateManifest = (icons, assetFiles) => {
	if (!Array.isArray(icons)) {
		throw new Error('icon-manifest.json must contain an icons array.');
	}

	const manifestNames = new Set();
	for (const icon of icons) {
		if (!icon.name?.startsWith(iconNamePrefix) || manifestNames.has(icon.name)) {
			throw new Error(`Invalid or duplicate icon name in manifest: ${icon.name}`);
		}
		if (!allowedCategories.has(icon.category) || !allowedColourCapabilities.has(icon.colour)) {
			throw new Error(`Invalid category or colour capability for ${icon.name}`);
		}
		if (
			!icon.viewBox ||
			(icon.previewBackground !== undefined && !allowedPreviewBackgrounds.has(icon.previewBackground)) ||
			!Array.isArray(icon.aliases) ||
			!icon.aliases.every((alias) => typeof alias === 'string') ||
			typeof icon.deprecated !== 'boolean' ||
			(icon.replacedBy !== undefined && typeof icon.replacedBy !== 'string') ||
			(icon.defaultColour !== undefined &&
				(icon.colour !== 'configurable' || !allowedDefaultColours.has(icon.defaultColour)))
		) {
			throw new Error(`Incomplete manifest entry for ${icon.name}`);
		}
		manifestNames.add(icon.name);
	}

	for (const icon of icons) {
		const replacement = getReplacementName(icon);
		if (replacement && (!icon.deprecated || replacement === icon.name || !manifestNames.has(replacement))) {
			throw new Error(`replacedBy on ${icon.name} must name another icon and requires deprecated: true.`);
		}
	}

	const assetNames = new Set(assetFiles.map((file) => path.basename(file, '.svg')));
	const missingAssets = [...manifestNames].filter((name) => !assetNames.has(name));
	const missingEntries = [...assetNames].filter((name) => !manifestNames.has(name));
	if (missingAssets.length || missingEntries.length) {
		throw new Error(
			`Manifest and SVG assets differ. Missing assets: ${missingAssets.join(', ') || 'none'}. Missing entries: ${missingEntries.join(', ') || 'none'}.`,
		);
	}
};

const getReplacementName = (icon) =>
	icon.replacedBy &&
	(icon.replacedBy.startsWith(iconNamePrefix) ? icon.replacedBy : `${iconNamePrefix}${icon.replacedBy}`);

const getIconComponentTemplate = (svgObject, icon) => {
	let svgElement = stringify(svgObject);
	const hasColour = icon.colour === 'configurable';
	const replacement = getReplacementName(icon);
	const deprecationNotice = icon.deprecated
		? `/**\n * @deprecated${replacement ? ` Use ${replacement} instead.` : ''}\n */\n`
		: '';

	if (hasColour) {
		svgElement = svgElement.replace(
			/class="svg-icon"/,
			'class="svg-icon" style={{ fill: `${this.iconCustomColourState}`, stroke: `${this.iconCustomColourState}` }}',
		);
	}

	svgElement = svgElement.replace(/\srole="img"/, '');
	svgElement = svgElement.replace(
		/<svg\b/,
		'<svg role={svgAccessibility.role} aria-label={svgAccessibility.ariaLabel} aria-hidden={svgAccessibility.ariaHidden} focusable={svgAccessibility.focusable}',
	);

	return `// content automatically generated by \`generate-icons.cjs\` begins
import { Component, Prop, h, Watch, State${hasColour ? '' : ', Element'} } from '@stencil/core';
import { ${hasColour ? 'IconWithColour' : 'Icon'} } from '../icon.interface';
import { IconSize${hasColour ? ', IconColour' : ''} } from '../icon.types';
import { RenderIcon, warnIsDecorativeDeprecated${icon.deprecated ? ', warnIconDeprecated' : ''} } from '../render-icon';
import { validateIconWidth, ${hasColour ? 'validateIconColour' : 'validateFixedIconColour'} } from '../icon-validation';

${deprecationNotice}@Component({
	tag: '${icon.name}',
	styleUrl: '../ontario-icon.scss',
	shadow: true,
})
export class ${toPascalCase(icon.name)} implements ${hasColour ? 'IconWithColour' : 'Icon'} {
	/**
	 * The icon width will autogenerate the height since the icons are in square format, thus preserving
	 * the aspect ratio.
	 */
	@Prop() iconWidth: IconSize = 24;

	/**
	 * Mutable variable, for internal use only.
	 * Set the icon's width depending on validation result.
	 */
	@State() iconWidthState: number;

	/**
	 * Accessible name for a meaningful icon. Without a label, the icon is decorative.
	 */
	@Prop() label?: string;

	/**
	 * @deprecated Use the label prop to provide an accessible name. Icons without a label are decorative by default.
	 */
	@Prop() isDecorative?: boolean;
	private hasWarnedIsDecorativeDeprecation = false;

	@Watch('iconWidth')
	validateWidth() {
		this.iconWidthState = validateIconWidth(this.iconWidth, '${icon.name}');
	}
	${
		hasColour
			? `
	/** Set the icon's colour. */
	@Prop() colour: IconColour = '${icon.defaultColour ?? 'black'}';

	@State() iconColourState: string;
	@State() iconCustomColourState: string;

	@Watch('colour')
	validateColour() {
		const validatedColour = validateIconColour(this.colour, '${icon.name}'${icon.defaultColour ? `, '${icon.defaultColour}'` : ''});
		if (validatedColour.colour !== undefined) {
			this.iconColourState = validatedColour.colour;
		}
		if (validatedColour.customColour !== undefined) {
			this.iconCustomColourState = validatedColour.customColour;
		}
	}
	`
			: `
	@Element() host: HTMLElement;

	validateColour() {
		validateFixedIconColour(this.host, '${icon.name}');
	}
	`
	}
	componentWillLoad() {
		${icon.deprecated ? `warnIconDeprecated('${icon.name}', ${replacement ? `'${replacement}'` : 'undefined'});\n\t\t` : ''}this.warnDeprecatedIsDecorative();
		this.validateColour();
		this.validateWidth();
	}

	@Watch('isDecorative')
	warnDeprecatedIsDecorative() {
		if (this.isDecorative !== undefined && !this.hasWarnedIsDecorativeDeprecation) {
			this.hasWarnedIsDecorativeDeprecation = true;
			warnIsDecorativeDeprecated();
		}
	}

	render() {
		const colourClass = ${hasColour ? '`ontario-icon--${this.iconColourState}`' : 'undefined'};
		return (
			<RenderIcon
				iconWidth={this.iconWidthState}
				colourClass={colourClass}
				label={this.label}
				renderSvg={(svgAccessibility) => ${svgElement}}
			/>
		);
	}
}
// content automatically generated by \`generate-icons.cjs\` ends
`.replace(/^[\t ]+$/gm, '');
};

const getGeneratedFilePath = (icon) => path.join(componentDirectory, icon.name, `${icon.name}.tsx`);

const getExistingGeneratedFiles = async () => {
	const entries = await readdir(componentDirectory, { withFileTypes: true });
	const generatedFiles = [];
	for (const entry of entries) {
		if (entry.isFile() && entry.name.startsWith(iconNamePrefix) && entry.name.endsWith('.tsx')) {
			generatedFiles.push(path.join(componentDirectory, entry.name));
		}
		if (entry.isDirectory() && entry.name.startsWith(iconNamePrefix)) {
			const nestedEntries = await readdir(path.join(componentDirectory, entry.name), { withFileTypes: true });
			generatedFiles.push(
				...nestedEntries
					.filter(
						(nestedEntry) =>
							nestedEntry.isFile() && nestedEntry.name.startsWith(iconNamePrefix) && nestedEntry.name.endsWith('.tsx'),
					)
					.map((nestedEntry) => path.join(componentDirectory, entry.name, nestedEntry.name)),
			);
		}
	}
	return generatedFiles;
};

const buildIconSvg = async (icon) => {
	const svgFilePath = path.join(assetDirectory, `${icon.name}.svg`);
	const svgFileContent = await readFile(svgFilePath, 'utf-8');
	return parse(svgFileContent, {
		transformNode: (node) => {
			if (node.name === 'svg') {
				node.attributes.viewBox = icon.viewBox;
				delete node.attributes.viewbox;
				node.attributes.id = getId(icon.name);
			}
			return node;
		},
	});
};

const createIconComponents = async ({ check = false, clean = false } = {}) => {
	const manifest = JSON.parse(await readFile(manifestPath, 'utf-8'));
	const icons = manifest.icons;
	const prettierOptions = (await prettier.resolveConfig(manifestPath)) ?? {};
	const assetFiles = (await readdir(assetDirectory)).filter(
		(file) => file.startsWith(iconNamePrefix) && file.endsWith('.svg'),
	);
	validateManifest(icons, assetFiles);
	if (!clean) {
		await updateIconGallery(icons, { check });
	}

	const expectedFiles = [];
	for (const icon of icons) {
		const svgObject = await buildIconSvg(icon);
		const output = getGeneratedFilePath(icon);
		expectedFiles.push(output);
		if (clean) {
			continue;
		}
		const content = await prettier.format(getIconComponentTemplate(svgObject, icon), {
			...prettierOptions,
			filepath: output,
		});
		if (check) {
			try {
				const existingContent = await readFile(output, 'utf-8');
				if (existingContent !== content) {
					console.error(`Generated icon is out of date: ${path.relative(componentDirectory, output)}`);
					process.exitCode = 1;
				}
			} catch {
				console.error(`Generated icon is missing: ${path.relative(componentDirectory, output)}`);
				process.exitCode = 1;
			}
		} else {
			await mkdir(path.dirname(output), { recursive: true });
			await writeFile(output, content);
		}
	}

	const expectedFileSet = new Set(expectedFiles);
	const existingFiles = await getExistingGeneratedFiles();
	const staleFiles = existingFiles.filter((file) => !expectedFileSet.has(file));
	if (check) {
		for (const file of staleFiles) {
			console.error(`Unexpected generated icon: ${path.relative(componentDirectory, file)}`);
			process.exitCode = 1;
		}
		if (process.exitCode) {
			throw new Error('Icon generation drift detected. Run `pnpm run generate:icons` and commit the generated files.');
		}
		console.log(`Icon generation is up to date (${icons.length} components).`);
		return;
	}

	for (const file of clean ? existingFiles : staleFiles) {
		await rm(file, { force: true });
	}
	if (!clean) {
		console.log(`Generated ${icons.length} icon components from icon-manifest.json.`);
	}
};

if (require.main === module) {
	const args = new Set(process.argv.slice(2));
	createIconComponents({ check: args.has('--check'), clean: args.has('--clean') }).catch((error) => {
		console.error(error.message);
		process.exitCode = 1;
	});
}
