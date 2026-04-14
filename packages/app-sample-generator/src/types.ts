/**
 * Public type contracts for `@ongov/app-sample-generator`.
 *
 * These interfaces define the library-first API:
 * callers provide a configuration object and receive a deterministic result object,
 * while transport concerns (filesystem, HTTP, etc.) are handled by consumers.
 */

/**
 * A single sample definition provided to the generator.
 *
 * This describes what should be rendered and how output should be named,
 * without prescribing where or how the output is consumed.
 */
export interface ComponentSample {
	/** Ontario component tag name (for example: `ontario-button`). */
	component: string;
	/** Input HTML snippet to render/hydrate. */
	html: string;
	/** Output filename consumers can use when persisting generated results. */
	outputFile: string;
	/** Optional human-readable description for tooling or docs. */
	description?: string;
	/**
	 * Controls whether component styles are collected for this sample.
	 * Defaults to `true` when omitted.
	 */
	includeStyles?: boolean;
}

/**
 * Configuration contract for the library API.
 *
 * The library accepts this shape and always returns a `SampleGeneratorResult`.
 * Callers decide where to write or display the returned data.
 */
export interface SampleGeneratorConfig {
	/** List of samples to process in this invocation. */
	samples: ComponentSample[];
	/**
	 * Optional rendering strategy override.
	 * Use this to plug in a custom renderer instead of the default hydrate renderer.
	 */
	renderer?: (html: string) => Promise<string>;
	/**
	 * Optional style loading strategy override.
	 * Use this to source CSS from custom locations or pipelines.
	 */
	styleLoader?: (tagName: string) => string | Promise<string>;
}

/**
 * Per-sample generation outcome.
 *
 * On success, `markup`/`styles`/`renderedHtml` are populated.
 * On failure, `error` is populated.
 */
export interface GeneratedSampleItem {
	/** Original input sample associated with this result item. */
	sample: ComponentSample;
	/** Whether generation succeeded for this sample. */
	success: boolean;
	/** Clean rendered markup with framework artifacts removed. */
	markup?: string;
	/** Collected CSS for the sample and nested Ontario components. */
	styles?: string;
	/** Combined document string (style block + markup) for convenience/legacy consumers. */
	renderedHtml?: string;
	/** Error message when generation fails. */
	error?: string;
}

/**
 * Aggregate library response for a generation run.
 */
export interface SampleGeneratorResult {
	/** Per-sample outcomes in the same processing order as input. */
	items: GeneratedSampleItem[];
	/** Quick run-level counts for reporting and CI checks. */
	summary: {
		/** Number of samples attempted. */
		total: number;
		/** Number of successful sample generations. */
		succeeded: number;
		/** Number of failed sample generations. */
		failed: number;
	};
}
