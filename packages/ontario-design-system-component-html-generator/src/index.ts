import { readFileSync } from 'fs';
import path from 'path';
import { renderToString } from '@ongov/ontario-design-system-component-library/hydrate';
import type {
	ComponentSample,
	GeneratedSampleItem,
	SampleFormatterOptions,
	SampleGeneratorConfig,
	SampleGeneratorResult,
} from './types.js';
import {
	buildDocument,
	extractOntarioComponents,
	flattenShadowRoot,
	formatHtml,
	stripCssComments,
	stripHydrationArtifacts,
	transformHostSelectors,
} from './utils.js';

/**
 * Library entrypoint for sample generation.
 *
 * Responsibilities:
 * - Render input sample HTML using a pluggable renderer.
 * - Normalize/clean the rendered markup.
 * - Resolve and transform component styles.
 * - Return a deterministic result object (`items` + `summary`) without doing filesystem I/O.
 *
 * Filesystem writes and batch orchestration are intentionally handled by the CLI layer.
 */

export type {
	ComponentSample,
	GeneratedSampleItem,
	SampleFormatterOptions,
	SampleGeneratorConfig,
	SampleGeneratorResult,
} from './types.js';

interface RenderedSampleParts {
	markup: string;
	styles: string;
	renderedHtml: string;
}

type SampleRenderer = NonNullable<SampleGeneratorConfig['renderer']>;
type SampleStyleLoader = NonNullable<SampleGeneratorConfig['styleLoader']>;

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

async function defaultRenderer(html: string): Promise<string> {
	const hydrated = await renderToString(html, {
		prettyHtml: true,
	});

	return hydrated.html ?? '';
}

function defaultStyleLoader(tagName: string): string {
	const cssPath = getComponentStylePath(tagName);
	if (!cssPath) {
		return '';
	}

	try {
		const css = readFileSync(cssPath, 'utf8');
		const transformed = transformHostSelectors(css, tagName);
		return stripCssComments(transformed);
	} catch {
		return '';
	}
}

/**
 * Loads CSS file for a component, transforms :host selectors, and strips comments.
 */
async function loadComponentStyles(tagName: string, styleLoader: SampleStyleLoader): Promise<string> {
	try {
		const css = await styleLoader(tagName);
		if (!css) {
			return '';
		}

		const transformed = transformHostSelectors(css, tagName);
		return stripCssComments(transformed);
	} catch {
		return '';
	}
}

/**
 * Resolves CSS for a sample and nested Ontario components (e.g., icons).
 */
async function buildStyles(sample: ComponentSample, markup: string, styleLoader: SampleStyleLoader): Promise<string> {
	if (sample.includeStyles !== false) {
		const mainCss = await loadComponentStyles(sample.component, styleLoader);

		const nestedComponents = extractOntarioComponents(markup);
		const nestedCss = (
			await Promise.all(
				nestedComponents.filter((tag) => tag !== sample.component).map((tag) => loadComponentStyles(tag, styleLoader)),
			)
		)
			.filter((css) => css.length > 0)
			.join('\n\n');

		const allCss = [mainCss, nestedCss].filter(Boolean).join('\n\n');

		return allCss;
	}

	return '';
}

/**
 * Renders Ontario Design System components using server-side rendering (renderToString)
 * for fast, clean HTML output.
 */
async function renderSample(
	sample: ComponentSample,
	renderer: SampleRenderer,
	styleLoader: SampleStyleLoader,
	formatterOptions: SampleFormatterOptions,
): Promise<RenderedSampleParts> {
	const hydratedHtml = await renderer(sample.html);

	const renderedMarkup = stripHydrationArtifacts(flattenShadowRoot(hydratedHtml));
	const markup = formatHtml(
		renderedMarkup,
		formatterOptions.stripOuterComponent ?? true,
		formatterOptions.removeStyles ?? true,
	);
	const styles = await buildStyles(sample, markup, styleLoader);
	const renderedHtml = buildDocument(markup, styles);

	return {
		markup,
		styles,
		renderedHtml,
	};
}

/**
 * Orchestrates the sample generation process.
 */
export async function generateSamples(config: SampleGeneratorConfig): Promise<SampleGeneratorResult> {
	const renderer = config.renderer ?? defaultRenderer;
	const styleLoader = config.styleLoader ?? defaultStyleLoader;
	const formatterOptions = config.formatterOptions ?? {};
	const items: GeneratedSampleItem[] = [];

	for (const sample of config.samples) {
		try {
			const renderedSample = await renderSample(sample, renderer, styleLoader, formatterOptions);
			items.push({
				sample,
				success: true,
				markup: renderedSample.markup,
				styles: renderedSample.styles,
				renderedHtml: renderedSample.renderedHtml,
			});
		} catch (error) {
			items.push({
				sample,
				success: false,
				error: error instanceof Error ? error.message : String(error),
			});
		}
	}

	const succeeded = items.filter((item) => item.success).length;
	const failed = items.length - succeeded;

	return {
		items,
		summary: {
			total: items.length,
			succeeded,
			failed,
		},
	};
}
