import { mkdirSync, readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { renderToString } from '@ongov/ontario-design-system-component-library/hydrate';
import { samples, type ComponentSample } from './sample-config.js';

/**
 * Dynamically generates CSS file paths for Ontario components.
 * All Ontario components follow the same directory structure in the component library.
 */
function getComponentStylePath(tagName: string): string {
	return path.join(
		process.cwd(),
		'node_modules',
		'@ongov',
		'ontario-design-system-component-library',
		'dist',
		'collection',
		'components',
		tagName,
		`${tagName}.css`,
	);
}

/**
 * Series of functions to clean up rendered HTML by removing Stencil framework
 * markers and artifacts that are only needed during rendering.
 */
function stripHydrationArtifacts(markup: string): string {
	let cleaned = markup;

	// Remove all data-* attributes
	cleaned = cleaned.replace(/\sdata-[^=\s]+="[^"]*"/g, '');

	// Remove Stencil hydration attributes (s-id, c-id, etc.)
	cleaned = cleaned.replace(/\s[sc]-id="[^"]*"/g, '');

	// Remove Stencil scope attributes
	cleaned = cleaned.replace(/\s[sc]-[a-z0-9-]+(?:="[^"]*")?/g, '');

	// Clean up class attributes - remove hydrated and sc-* classes
	cleaned = cleaned.replace(/\sclass="([^"]*)"/g, (_match, classValue: string) => {
		const filtered = classValue.split(/\s+/).filter((name) => name && name !== 'hydrated' && !name.startsWith('sc-'));

		return filtered.length ? ` class="${filtered.join(' ')}"` : '';
	});

	// Remove extra whitespace
	return cleaned.replace(/\s+>/g, '>').replace(/\s+/g, ' ');
}

/**
 * Removes mock shadow DOM wrappers that Stencil adds during testing.
 * Also removes template elements with shadowroot attribute.
 */
function flattenShadowRoot(markup: string): string {
	return markup
		.replace(/<mock:shadow-root\b[^>]*>/g, '')
		.replace(/<\/mock:shadow-root>/g, '')
		.replace(/<template\b[^>]*shadowroot[^>]*>/gi, '')
		.replace(/<\/template>/gi, '');
}

/**
 * Transforms :host selectors in component CSS to the actual component tag name.
 * This allows scoped component styles to work when CSS is inlined.
 */
function transformHostSelectors(css: string, tagName: string): string {
	return css.replace(/:host\b/g, tagName);
}

/**
 * Removes CSS comments and normalizes whitespace for cleaner output.
 */
function stripCssComments(css: string): string {
	// Remove multi-line comments /* ... */
	let cleaned = css.replace(/\/\*[\s\S]*?\*\//g, '');

	// Remove empty lines
	cleaned = cleaned.replace(/^\s*[\r\n]/gm, '');

	// Remove extra whitespace
	cleaned = cleaned.replace(/\n{3,}/g, '\n\n');

	return cleaned.trim();
}

/**
 * Loads CSS file for a component, transforms :host selectors, and strips comments.
 */
function loadComponentStyles(tagName: string): string {
	const cssPath = getComponentStylePath(tagName);
	if (!cssPath) {
		return '';
	}

	try {
		const css = readFileSync(cssPath, 'utf8');
		const transformed = transformHostSelectors(css, tagName);
		return stripCssComments(transformed);
	} catch (error) {
		console.warn(`Warning: unable to read styles for ${tagName} at ${cssPath}:`, error);
		return '';
	}
}

/**
 * Extracts all Ontario component tags from HTML markup.
 * Maps icon variants to base ontario-icon component.
 */
function extractOntarioComponents(markup: string): string[] {
	const componentRegex = /<(ontario-[a-z-]+)/gi;
	const matches = markup.matchAll(componentRegex);
	const components = new Set<string>();

	for (const match of matches) {
		let component = match[1];
		// Map all ontario-icon-* variants to base ontario-icon
		if (component.startsWith('ontario-icon-')) {
			component = 'ontario-icon';
		}
		components.add(component);
	}

	return Array.from(components);
}

/**
 * Wraps HTML markup with inline CSS styles to create a self-contained document.
 * Automatically includes styles for nested Ontario components (e.g., icons).
 */
function buildDocument(sample: ComponentSample, markup: string): string {
	if (sample.includeStyles !== false) {
		// Get styles for main component
		const mainCss = loadComponentStyles(sample.component);

		// Detect and load styles for any nested Ontario components
		const nestedComponents = extractOntarioComponents(markup);
		const nestedCss = nestedComponents
			.filter((tag) => tag !== sample.component) // Don't duplicate main component
			.map((tag) => loadComponentStyles(tag))
			.filter((css) => css.length > 0)
			.join('\n\n');

		const allCss = [mainCss, nestedCss].filter(Boolean).join('\n\n');

		if (allCss) {
			return `<style>\n${allCss}\n</style>\n\n${markup}`;
		}
	}

	return markup;
}

/**
 * Formats HTML with proper indentation and removes boilerplate markup.
 * Optionally strips the outer component tag and CSS style tags.
 */
function formatHtml(html: string, stripOuterComponent: boolean = false, removeStyles: boolean = true): string {
	let cleaned = html;

	// Remove <style> tags only if requested (during rendering, not document building)
	if (removeStyles) {
		cleaned = cleaned.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');
	}

	// Remove HTML structure tags that wrap the component
	cleaned = cleaned.replace(/<!doctype[^>]*>/i, '');
	cleaned = cleaned.replace(/<html[^>]*>/i, '');
	cleaned = cleaned.replace(/<\/html>/i, '');
	cleaned = cleaned.replace(/<head[^>]*>[\s\S]*?<\/head>/i, '');
	cleaned = cleaned.replace(/<body[^>]*>/i, '');
	cleaned = cleaned.replace(/<\/body>/i, '');

	// Remove comments
	cleaned = cleaned.replace(/<!--[\s\S]*?-->/g, '');

	// Strip outer component tag if requested (e.g., <ontario-button>...</ontario-button>)
	if (stripOuterComponent) {
		cleaned = cleaned.replace(/^[\s]*<[a-z]+-[a-z-]*[^>]*>[\s]*([\s\S]*?)[\s]*<\/[a-z]+-[a-z-]*>[\s]*$/i, '$1');
	}

	// Clean up extra whitespace before processing
	cleaned = cleaned.trim();

	// Split into lines and tags for processing
	const parts = cleaned.split(/(<[^>]+>)/);
	const lines: string[] = [];
	let indentLevel = 0;

	for (const part of parts) {
		if (!part.trim()) continue;

		// Check if this is a closing tag
		if (part.startsWith('</')) {
			indentLevel = Math.max(0, indentLevel - 1);
			lines.push('\t'.repeat(indentLevel) + part);
		}
		// Check if this is a self-closing tag or void element
		else if (part.endsWith('/>') || /^<(br|hr|img|input|meta|link)[\s>]/i.test(part)) {
			lines.push('\t'.repeat(indentLevel) + part);
		}
		// Check if this is an opening tag
		else if (part.startsWith('<')) {
			lines.push('\t'.repeat(indentLevel) + part);
			// Don't increment indent for self-closing-like tags (no closing tag)
			if (!part.match(/^<(br|hr|img|input|meta|link|area|base|embed|source|track|wbr)[\s>]/i)) {
				indentLevel++;
			}
		}
		// Text content
		else {
			const trimmed = part.trim();
			if (trimmed) {
				lines.push('\t'.repeat(indentLevel) + trimmed);
			}
		}
	}

	return lines.join('\n');
}

/**
 * Renders Ontario Design System components using server-side rendering (renderToString)
 * for fast, clean HTML output.
 */
async function renderSample(sample: ComponentSample): Promise<string> {
	const hydrated = await renderToString(sample.html, {
		prettyHtml: true,
	});

	const renderedMarkup = stripHydrationArtifacts(flattenShadowRoot(hydrated.html ?? ''));
	const formattedHtml = formatHtml(renderedMarkup, true, true);

	return buildDocument(sample, formattedHtml);
}

/**
 * Orchestrates the sample generation process.
 */
export async function generateSamples(options: { outputDirectory?: string } = {}): Promise<void> {
	const outputDirectory = options.outputDirectory || path.resolve(process.cwd(), 'generated-samples');
	mkdirSync(outputDirectory, { recursive: true });

	let successCount = 0;
	let failCount = 0;

	for (const sample of samples) {
		try {
			const html = await renderSample(sample);
			const outputPath = path.join(outputDirectory, sample.outputFile);
			writeFileSync(outputPath, `${html}\n`, 'utf8');
			successCount++;
		} catch (error) {
			console.error(`Failed to render ${sample.component}:`, error);
			failCount++;
		}
	}

	if (failCount > 0) {
		console.warn(`Sample generation completed with ${failCount} failures.`);
	}
}
