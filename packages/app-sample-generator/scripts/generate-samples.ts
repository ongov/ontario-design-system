import { mkdirSync, readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { BUILD } from '@stencil/core/internal/app-data';
import { renderToString } from '@ongov/ontario-design-system-component-library/hydrate';
type ComponentSample = {
	component: string;
	html: string;
	outputFile: string;
	description?: string;
	includeStyles?: boolean;
};

import { samples } from './sample-config.js';

import { mutationObserverMock } from '../utils/tests/mutation-observer.mock';

global.MutationObserver = mutationObserverMock;

/**
 * STENCIL RUNTIME CONFIGURATION
 * Disable Stencil's lazy loading and async queue features for SSR rendering.
 * This tells Stencil to render components synchronously without waiting for
 * async initialization, which is necessary for generating static HTML samples.
 */
BUILD.lazyLoad = false;
BUILD.asyncLoading = false;
BUILD.taskQueue = false;

/**
 * COMPONENT MODULE PATHS
 * Maps component tag names to their JavaScript module paths in node_modules.
 * Ontario components are loaded from the installed @ongov/ontario-design-system-
 * component-library package.
 */

/**
 * COMPONENT STYLE PATHS
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
 * COMPONENT DEPENDENCIES
 * Maps components to their dependent components. If component A uses component B
 * internally, B's styles will be included when generating A's sample.
 */
const componentDependencies: Record<string, string[]> = {};

/**
 * HTML CLEANING & PROCESSING
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
 * Extracts the light DOM content from within a component's opening and closing tags.
 * This content was passed into the component and needs to be resolved to replace <slot> tags.
 */
function extractSlotContent(renderedMarkup: string, tagName: string): string | null {
	const match = renderedMarkup.match(new RegExp(`<${tagName}\\b[^>]*>([\\s\\S]*?)</${tagName}>`, 'i'));
	if (!match) {
		return null;
	}

	let innerContent = match[1];
	innerContent = innerContent.replace(/<mock:shadow-root\b[^>]*>[\s\S]*?<\/mock:shadow-root>/i, '');
	innerContent = innerContent.replace(/<template\b[^>]*shadowroot[^>]*>[\s\S]*?<\/template>/i, '');

	const trimmed = innerContent.trim();
	return trimmed ? trimmed : null;
}

/**
 * Escapes special regex characters to safely use strings in regex patterns.
 */
function escapeRegex(value: string): string {
	return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * CSS PROCESSING
 * Functions to load, transform, and clean CSS for inlining into HTML output.
 */

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
 * DOCUMENT BUILDING
 * Wraps HTML markup with inline CSS styles to create a self-contained document.
 * This makes the generated HTML file completely standalone.
 */
function buildDocument(sample: ComponentSample, markup: string): string {
	// Inline CSS if requested
	if (sample.includeStyles !== false) {
		const css = loadComponentStyles(sample.component);

		// Load dependency styles too
		const deps = componentDependencies[sample.component] ?? [];
		const depStyles = deps.map((dep) => loadComponentStyles(dep)).filter(Boolean);

		const allStyles = [css, ...depStyles].filter(Boolean).join('\n\n');

		if (allStyles) {
			// Add newline after style block for cleaner separation
			return `<style>\n${allStyles}\n</style>\n\n${markup}`;
		}
	}

	return markup;
}

/**
 * HTML FORMATTING
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
 * SAMPLE RENDERING
 * Renders Ontario Design System components using server-side rendering (renderToString)
 * for fast, clean HTML output.
 */
async function renderSample(sample: ComponentSample): Promise<string> {
	// Use hydrate for SSR rendering of Ontario components
	const hydrated = await renderToString(sample.html, {
		prettyHtml: true,
	});

	// Extract just the rendered HTML from the hydrate result
	const renderedMarkup = stripHydrationArtifacts(flattenShadowRoot(hydrated.html));
	const formattedHtml = formatHtml(renderedMarkup, true, true);

	// Build final document with CSS if needed
	return buildDocument(sample, formattedHtml);
}

/**
 * MAIN ENTRY POINT
 * Orchestrates the entire sample generation process:
 * 1. Creates output directory
 * 2. Renders each sample component
 * 3. Writes HTML files to disk
 * 4. Reports success/failure statistics
 */
async function generateSamples(): Promise<void> {
	const outputDir = path.resolve(process.cwd(), 'docs', 'samples');
	mkdirSync(outputDir, { recursive: true });

	console.log('\n🚀 Generating component samples...\n');

	let successCount = 0;
	let failCount = 0;

	for (const sample of samples) {
		try {
			console.log(`📦 Rendering ${sample.component}...`);
			const html = await renderSample(sample);
			const outputPath = path.join(outputDir, sample.outputFile);
			writeFileSync(outputPath, `${html}\n`, 'utf8');

			const hasStyles = sample.includeStyles !== false;
			const styleMsg = hasStyles ? '(with CSS)' : '';
			console.log(`   ✅ ${sample.outputFile} ${styleMsg}`);
			successCount++;
		} catch (error) {
			console.error(`   ❌ Failed: ${error instanceof Error ? error.message : String(error)}`);
			failCount++;
		}
	}

	console.log(`\n📊 Summary:`);
	console.log(`   ✅ ${successCount} samples generated`);
	if (failCount > 0) {
		console.log(`   ❌ ${failCount} failed`);
	}
	console.log(`   📁 Output: ${outputDir}\n`);
}

/**
 * EXECUTION
 * Run the sample generator and handle errors.
 */
generateSamples().catch((error) => {
	console.error('Failed to generate samples:', error);
	process.exitCode = 1;
});

export { generateSamples };
