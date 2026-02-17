import { mkdirSync, readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { renderToString } from '@ongov/ontario-design-system-component-library/hydrate';
import { samples } from './sample-config.js';
/**
 * Dynamically generates CSS file paths for Ontario components.
 * All Ontario components follow the same directory structure in the component library.
 */
function getComponentStylePath(tagName) {
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
function stripHydrationArtifacts(markup) {
	let cleaned = markup;
	// Remove all data-* attributes
	cleaned = cleaned.replace(/\sdata-[^=\s]+="[^"]*"/g, '');
	// Remove Stencil hydration attributes (s-id, c-id, etc.)
	cleaned = cleaned.replace(/\s[sc]-id="[^"]*"/g, '');
	// Remove Stencil scope attributes
	cleaned = cleaned.replace(/\s[sc]-[a-z0-9-]+(?:="[^"]*")?/g, '');
	// Clean up class attributes - remove hydrated and sc-* classes
	cleaned = cleaned.replace(/\sclass="([^"]*)"/g, (_match, classValue) => {
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
function flattenShadowRoot(markup) {
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
function transformHostSelectors(css, tagName) {
	return css.replace(/:host\b/g, tagName);
}
/**
 * Removes CSS comments and normalizes whitespace for cleaner output.
 */
function stripCssComments(css) {
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
function loadComponentStyles(tagName) {
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
 * Wraps HTML markup with inline CSS styles to create a self-contained document.
 */
function buildDocument(sample, markup) {
	if (sample.includeStyles !== false) {
		const css = loadComponentStyles(sample.component);
		if (css) {
			return `<style>\n${css}\n</style>\n\n${markup}`;
		}
	}
	return markup;
}
/**
 * Formats HTML with proper indentation and removes boilerplate markup.
 * Optionally strips the outer component tag and CSS style tags.
 */
function formatHtml(html, stripOuterComponent = false, removeStyles = true) {
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
	const lines = [];
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
async function renderSample(sample) {
	var _a;
	// Use hydrate for SSR rendering of Ontario components
	const hydrated = await renderToString(sample.html, {
		prettyHtml: true,
	});
	// Extract just the rendered HTML from the hydrate result
	const renderedMarkup = stripHydrationArtifacts(
		flattenShadowRoot((_a = hydrated.html) !== null && _a !== void 0 ? _a : ''),
	);
	const formattedHtml = formatHtml(renderedMarkup, true, true);
	// Build final document with CSS if needed
	return buildDocument(sample, formattedHtml);
}
/**
 * Orchestrates the entire sample generation process:
 * 1. Creates output directory
 * 2. Renders each sample component
 * 3. Writes HTML files to disk
 * 4. Reports success/failure statistics
 */
async function generateSamples() {
	const outputDir = path.resolve(process.cwd(), 'docs', 'samples');
	mkdirSync(outputDir, { recursive: true });
	console.log('\nGenerating component samples...\n');
	let successCount = 0;
	let failCount = 0;
	for (const sample of samples) {
		try {
			console.log(`Rendering ${sample.component}...`);
			const html = await renderSample(sample);
			const outputPath = path.join(outputDir, sample.outputFile);
			writeFileSync(outputPath, `${html}\n`, 'utf8');
			const hasStyles = sample.includeStyles !== false;
			const styleMsg = hasStyles ? '(with CSS)' : '';
			console.log(`   ${sample.outputFile} ${styleMsg}`);
			successCount++;
		} catch (error) {
			console.error(`   Failed: ${error instanceof Error ? error.message : String(error)}`);
			failCount++;
		}
	}
	console.log('\nSummary:');
	console.log(`   ${successCount} samples generated`);
	if (failCount > 0) {
		console.log(`   ${failCount} failed`);
	}
	console.log(`   Output: ${outputDir}\n`);
}
/**
 * Run the sample generator and handle errors.
 */
generateSamples().catch((error) => {
	console.error('Failed to generate samples:', error);
	process.exitCode = 1;
});
export { generateSamples };
