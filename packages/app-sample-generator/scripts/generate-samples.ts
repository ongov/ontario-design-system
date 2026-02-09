import { newSpecPage } from '@stencil/core/testing';
import { mkdirSync, readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';
import { BUILD } from '@stencil/core/internal/app-data';
import { renderToString } from '@ongov/ontario-design-system-component-library/hydrate';
type ComponentSample = {
	component: string;
	html: string;
	outputFile: string;
	description?: string;
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
const componentModulePaths: Record<string, string> = {
	'ontario-button': path.join(
		process.cwd(),
		'node_modules',
		'@ongov',
		'ontario-design-system-component-library',
		'dist',
		'collection',
		'components',
		'ontario-button',
		'ontario-button.js',
	),
	'ontario-accordion': path.join(
		process.cwd(),
		'node_modules',
		'@ongov',
		'ontario-design-system-component-library',
		'dist',
		'collection',
		'components',
		'ontario-accordion',
		'ontario-accordion.js',
	),
};

/**
 * COMPONENT STYLE PATHS
 * Maps component tag names to their CSS file paths. These styles are loaded
 * and inlined into the generated HTML output for self-contained sample files.
 */
const componentStylePaths: Record<string, string> = {
	'ontario-button': path.join(
		process.cwd(),
		'node_modules',
		'@ongov',
		'ontario-design-system-component-library',
		'dist',
		'collection',
		'components',
		'ontario-button',
		'ontario-button.css',
	),
	'ontario-accordion': path.join(
		process.cwd(),
		'node_modules',
		'@ongov',
		'ontario-design-system-component-library',
		'dist',
		'collection',
		'components',
		'ontario-accordion',
		'ontario-accordion.css',
	),
};

/**
 * COMPONENT DEPENDENCIES
 * Maps components to their dependent components. If component A uses component B
 * internally, B's styles will be included when generating A's sample.
 */
const componentDependencies: Record<string, string[]> = {};

/**
 * COMPONENT LOADING & METADATA ATTACHMENT
 * Loads component modules and attaches Stencil metadata for proper rendering.
 * Stencil's newSpecPage() requires components to have COMPILER_META attached.
 */
async function loadComponent(tagName: string): Promise<any> {
	const modulePath = componentModulePaths[tagName];
	if (!modulePath) {
		throw new Error(`No component module configured for tag: ${tagName}`);
	}

	const moduleUrl = pathToFileURL(modulePath).href;
	const module = await import(moduleUrl);

	// Try to find the component in the module
	// First try snake_case exports (from dist build)
	let component =
		module.my_component ??
		module.sample_button ??
		module.sample_input ??
		module.sample_card ??
		module.sample_card_action;

	// If not found, try PascalCase exports (from custom-elements build)
	if (!component) {
		const pascalCaseMap: Record<string, string> = {
			'ontario-button': 'OntarioButton',
		};
		const pascalName = pascalCaseMap[tagName];
		if (pascalName) {
			component = module[pascalName];
		}
	}

	// Fall back to default export
	if (!component) {
		component = module.default;
	}

	if (!component) {
		throw new Error(`Unable to resolve component export for tag: ${tagName}`);
	}

	attachMetadata(tagName, component);
	return component;
}

/**
 * COMPONENT METADATA REGISTRY
 * Pre-configured metadata for each component. This tells Stencil how to
 * render components in the test environment (newSpecPage). Each entry includes
 * component properties, encapsulation mode, and other rendering information.
 */
const metadataByTag: Record<string, any> = {
	'ontario-button': createMetadata(
		'ontario-button',
		['button'],
		[
			{
				name: 'type',
				type: 1,
				mutable: false,
				reflect: false,
				attr: 'type',
				state: false,
				connected: false,
				complexType: {
					original: 'ButtonType',
					resolved: '"primary" | "secondary" | "tertiary" | "internalThemeDark"',
					references: {},
				},
			},
			{
				name: 'label',
				type: 1,
				mutable: false,
				reflect: false,
				attr: 'label',
				state: false,
				connected: false,
				complexType: { original: 'string | undefined', resolved: 'string', references: {} },
			},
		],
	),
};

function createMetadata(tagName: string, htmlTagNames: string[], properties: any[]) {
	return {
		tagName,
		encapsulation: 'shadow',
		hasShadowDom: true,
		shadowDelegatesFocus: false,
		htmlTagNames,
		hasRenderFn: true,
		hasMode: false,
		hasModernPropertyDecls: true,
		properties,
		states: [],
		listeners: [],
		watchers: [],
		methods: [],
		elementRef: undefined,
		events: [],
		connectMembers: [],
		contextMembers: [],
		legacyConnectProperties: [],
		legacyContextProperties: [],
		styles: [],
		formAssociated: false,
	} as const;
}

/**
 * METADATA ATTACHMENT
 * Attaches metadata to a component's COMPILER_META property. Stencil checks
 * this property during rendering to understand component structure.
 */
function attachMetadata(tagName: string, component: any) {
	if (component.COMPILER_META) {
		return;
	}

	const metadata = metadataByTag[tagName];
	if (!metadata) {
		throw new Error(`No metadata configured for tag: ${tagName}`);
	}

	component.COMPILER_META = metadata;
}

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
 * SLOT RESOLUTION
 * Processes slot content to extract named slots and default slot content.
 * This prepares data for replacing <slot> tags in the rendered component.
 */
type SlotContent = {
	allContent: string;
	defaultContent: string;
	namedSlots: Record<string, string>;
};

/**
 * Parses slot content to separate named slots from default content.
 */
function parseSlotContent(slotContent: string): SlotContent {
	const namedSlots: Record<string, string[]> = {};
	const slotRegex = /<([a-z0-9-]+)[^>]*\bslot="([^"]+)"[^>]*>[\s\S]*?<\/\1>/gi;
	let match: RegExpExecArray | null;

	while ((match = slotRegex.exec(slotContent)) !== null) {
		const [fullMatch, _tagName, slotName] = match;
		if (!namedSlots[slotName]) {
			namedSlots[slotName] = [];
		}
		namedSlots[slotName].push(fullMatch);
	}

	const defaultContent = slotContent.replace(slotRegex, '').trim();
	const flattenedNamedSlots = Object.fromEntries(
		Object.entries(namedSlots).map(([slotName, entries]) => [slotName, entries.join('')]),
	);

	return {
		allContent: slotContent,
		defaultContent,
		namedSlots: flattenedNamedSlots,
	};
}

/**
 * Replaces <slot> tags with actual content that was passed to the component.
 * Handles both named slots (slot="name") and default slots (no name attribute).
 */
function resolveSlots(markup: string, sample: ComponentSample, renderedMarkup: string): string {
	const slotContent = extractSlotContent(renderedMarkup, sample.component);
	if (!slotContent) {
		return markup;
	}

	const cleanedSlotContent = stripHydrationArtifacts(flattenShadowRoot(slotContent));
	const { allContent, defaultContent, namedSlots } = parseSlotContent(cleanedSlotContent);

	let withSlotReplaced = markup.replace(
		/<slot\b[^>]*name="([^"]+)"[^>]*><\/slot>/g,
		(_match, slotName: string) => namedSlots[slotName] ?? '',
	);

	withSlotReplaced = withSlotReplaced.replace(/<slot\b(?![^>]*name=)[^>]*><\/slot>/g, defaultContent);

	if (!allContent) {
		return withSlotReplaced;
	}

	const trailingLightDomPattern = new RegExp(`${escapeRegex(allContent)}\\s*</${sample.component}>`, 'i');
	return withSlotReplaced.replace(trailingLightDomPattern, `</${sample.component}>`);
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
	const cssPath = componentStylePaths[tagName];
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
 * Main rendering orchestration. Handles two different rendering paths:
 * 1. Ontario components: Use renderToString() for fast SSR
 * 2. Other components: Use newSpecPage() for flexible test rendering
 */
async function renderSample(sample: ComponentSample): Promise<string> {
	// Special handling for ontario components - use hydrate for SSR rendering
	if (sample.component === 'ontario-button' || sample.component === 'ontario-accordion') {
		const hydrated = await renderToString(sample.html, {
			prettyHtml: true,
		});

		// Extract just the rendered HTML from the hydrate result
		const renderedMarkup = stripHydrationArtifacts(flattenShadowRoot(hydrated.html));
		const formattedHtml = formatHtml(renderedMarkup, true, true);

		// Build final document with CSS if needed
		return buildDocument(sample, formattedHtml);
	}

	const componentTags = [sample.component, ...(componentDependencies[sample.component] ?? [])];
	const components = await Promise.all(componentTags.map((tagName) => loadComponent(tagName)));

	const page = await newSpecPage({
		components,
		html: sample.html,
	});

	const renderedMarkup = page.root?.outerHTML ?? page.body.innerHTML;
	const cleanedMarkup = resolveSlots(
		stripHydrationArtifacts(flattenShadowRoot(renderedMarkup)),
		sample,
		renderedMarkup,
	);

	const formattedHtml = formatHtml(cleanedMarkup, true, true);

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
