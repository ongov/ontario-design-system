/*
 * Pure utility functions for HTML and CSS processing.
 *
 * These are isolated from I/O and rendering so they can be unit-tested directly.
 * All functions are stateless and deterministic.
 */
/**
 * Removes Stencil hydration artifacts from rendered markup:
 * - `data-*` attributes
 * - `s-id` / `c-id` attributes
 * - `s-*` / `c-*` scope attributes
 * - `hydrated` and `sc-*` class names
 */
export function stripHydrationArtifacts(markup: string): string {
	let cleaned = markup;

	// Remove all data-* attributes
	cleaned = cleaned.replace(/\sdata-[^=\s]+="[^"]*"/g, '');

	// Remove Stencil hydration attributes (s-id, c-id, etc.)
	cleaned = cleaned.replace(/\s[sc]-id="[^"]*"/g, '');

	// Remove Stencil scope attributes
	cleaned = cleaned.replace(/\s[sc]-[a-z0-9-]+(?:="[^"]*")?/g, '');

	// Clean up class attributes — remove `hydrated` and `sc-*` classes
	cleaned = cleaned.replace(/\sclass="([^"]*)"/g, (_match, classValue: string) => {
		const filtered = classValue.split(/\s+/).filter((name) => name && name !== 'hydrated' && !name.startsWith('sc-'));
		return filtered.length ? ` class="${filtered.join(' ')}"` : '';
	});

	// Remove extra whitespace before closing angle brackets
	return cleaned.replace(/\s+>/g, '>').replace(/\s+/g, ' ');
}

/**
 * Removes mock shadow DOM wrappers that Stencil injects during testing,
 * and strips declarative shadow DOM `<template shadowroot>` elements.
 */
export function flattenShadowRoot(markup: string): string {
	return markup
		.replace(/<mock:shadow-root\b[^>]*>/g, '')
		.replace(/<\/mock:shadow-root>/g, '')
		.replace(/<template\b[^>]*shadowroot[^>]*>/gi, '')
		.replace(/<\/template>/gi, '');
}

/**
 * Replaces `:host` CSS selectors with the actual component tag name so that
 * scoped styles work correctly when inlined into a static HTML document.
 */
export function transformHostSelectors(css: string, tagName: string): string {
	return css.replace(/:host\b/g, tagName);
}

/**
 * Strips block CSS comments (`/* ... *\/`) and normalises excessive blank lines.
 */
export function stripCssComments(css: string): string {
	let cleaned = css.replace(/\/\*[\s\S]*?\*\//g, '');
	cleaned = cleaned.replace(/^\s*[\r\n]/gm, '');
	cleaned = cleaned.replace(/\n{3,}/g, '\n\n');
	return cleaned.trim();
}

/**
 * Extracts unique Ontario component tag names from an HTML string.
 * All `ontario-icon-*` variants are normalised to `ontario-icon`.
 */
export function extractOntarioComponents(markup: string): string[] {
	const componentRegex = /<(ontario-[a-z-]+)/gi;
	const matches = markup.matchAll(componentRegex);
	const components = new Set<string>();

	for (const match of matches) {
		let component = match[1].toLowerCase();
		if (component.startsWith('ontario-icon-')) {
			component = 'ontario-icon';
		}
		components.add(component);
	}

	return Array.from(components);
}

/**
 * Wraps markup in a `<style>` block when styles are provided.
 * Returns bare markup when there are no styles.
 * Optionally emits a complete HTML document when `fullDocument` is true.
 */
export function buildDocument(markup: string, styles: string, fullDocument = false): string {
	if (fullDocument) {
		const styleBlock = styles ? `\n\t\t<style>\n${styles}\n\t\t</style>` : '';

		return `<!DOCTYPE html>\n<html lang="en">\n\t<head>\n\t\t<meta charset="utf-8">\n\t\t<meta name="viewport" content="width=device-width, initial-scale=1">${styleBlock}\n\t</head>\n\t<body>\n${markup}\n\t</body>\n</html>`;
	}

	if (!styles) {
		return markup;
	}
	return `<style>\n${styles}\n</style>\n\n${markup}`;
}

/**
 * Formats rendered HTML with consistent indentation and removes framework boilerplate:
 * - Strips `<!doctype>`, `<html>`, `<head>`, `<body>` wrappers
 * - Optionally removes `<style>` tags
 * - Optionally unwraps the outermost Ontario component tag
 * - Re-indents content with tabs
 */
export function formatHtml(html: string, stripOuterComponent = false, removeStyles = true): string {
	let cleaned = html;

	if (removeStyles) {
		cleaned = cleaned.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');
	}

	cleaned = cleaned.replace(/<!doctype[^>]*>/i, '');
	cleaned = cleaned.replace(/<html[^>]*>/i, '');
	cleaned = cleaned.replace(/<\/html>/i, '');
	cleaned = cleaned.replace(/<head[^>]*>[\s\S]*?<\/head>/i, '');
	cleaned = cleaned.replace(/<body[^>]*>/i, '');
	cleaned = cleaned.replace(/<\/body>/i, '');
	cleaned = cleaned.replace(/<!--[\s\S]*?-->/g, '');

	if (stripOuterComponent) {
		cleaned = cleaned.replace(/^[\s]*<[a-z]+-[a-z-]*[^>]*>[\s]*([\s\S]*?)[\s]*<\/[a-z]+-[a-z-]*>[\s]*$/i, '$1');
	}

	cleaned = cleaned.trim();

	const parts = cleaned.split(/(<[^>]+>)/);
	const lines: string[] = [];
	let indentLevel = 0;

	for (const part of parts) {
		if (!part.trim()) continue;

		if (part.startsWith('</')) {
			indentLevel = Math.max(0, indentLevel - 1);
			lines.push('\t'.repeat(indentLevel) + part);
		} else if (part.endsWith('/>') || /^<(br|hr|img|input|meta|link)[\s>]/i.test(part)) {
			lines.push('\t'.repeat(indentLevel) + part);
		} else if (part.startsWith('<')) {
			lines.push('\t'.repeat(indentLevel) + part);
			if (!part.match(/^<(br|hr|img|input|meta|link|area|base|embed|source|track|wbr)[\s>]/i)) {
				indentLevel++;
			}
		} else {
			const trimmed = part.trim();
			if (trimmed) {
				lines.push('\t'.repeat(indentLevel) + trimmed);
			}
		}
	}

	return lines.join('\n');
}
