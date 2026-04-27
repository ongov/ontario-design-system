import {
	buildDocument,
	extractOntarioComponents,
	flattenShadowRoot,
	formatHtml,
	stripCssComments,
	stripHydrationArtifacts,
	transformHostSelectors,
} from './utils.js';

// ─── stripHydrationArtifacts ────────────────────────────────────────────────

describe('stripHydrationArtifacts', () => {
	it('removes data-* attributes', () => {
		const input = '<div data-foo="bar" data-stencil-id="1">text</div>';
		expect(stripHydrationArtifacts(input)).not.toContain('data-');
	});

	it('removes s-id and c-id attributes', () => {
		const input = '<ontario-button s-id="1" c-id="2">click</ontario-button>';
		const result = stripHydrationArtifacts(input);
		expect(result).not.toContain('s-id');
		expect(result).not.toContain('c-id');
	});

	it('removes s-* and c-* scope attributes', () => {
		const input = '<span s-cr c-x="foo">text</span>';
		const result = stripHydrationArtifacts(input);
		expect(result).not.toMatch(/\bs-cr\b/);
		expect(result).not.toContain('c-x');
	});

	it('removes "hydrated" class name but preserves other classes', () => {
		const input = '<ontario-button class="hydrated my-class sc-ontario-button">click</ontario-button>';
		const result = stripHydrationArtifacts(input);
		expect(result).toContain('class="my-class"');
		expect(result).not.toContain('hydrated');
		expect(result).not.toContain('sc-ontario-button');
	});

	it('removes class attribute entirely when only artifact classes remain', () => {
		const input = '<div class="hydrated sc-foo"></div>';
		const result = stripHydrationArtifacts(input);
		expect(result).not.toContain('class=');
	});

	it('leaves markup without artifacts unchanged (aside from whitespace normalisation)', () => {
		const input = '<p>Hello world</p>';
		expect(stripHydrationArtifacts(input)).toBe('<p>Hello world</p>');
	});
});

// ─── flattenShadowRoot ───────────────────────────────────────────────────────

describe('flattenShadowRoot', () => {
	it('removes <mock:shadow-root> open and close tags', () => {
		const input = '<ontario-button><mock:shadow-root><button>click</button></mock:shadow-root></ontario-button>';
		const result = flattenShadowRoot(input);
		expect(result).not.toContain('mock:shadow-root');
		expect(result).toContain('<button>click</button>');
	});

	it('removes <template shadowroot> and </template>', () => {
		const input = '<div><template shadowroot="open"><p>inner</p></template></div>';
		const result = flattenShadowRoot(input);
		expect(result).not.toContain('<template');
		expect(result).not.toContain('</template>');
		expect(result).toContain('<p>inner</p>');
	});

	it('is a no-op on plain markup', () => {
		const input = '<p>No shadow DOM here</p>';
		expect(flattenShadowRoot(input)).toBe(input);
	});
});

// ─── transformHostSelectors ─────────────────────────────────────────────────

describe('transformHostSelectors', () => {
	it('replaces :host with the component tag name', () => {
		const css = ':host { display: block; }';
		expect(transformHostSelectors(css, 'ontario-button')).toBe('ontario-button { display: block; }');
	});

	it('replaces multiple :host occurrences', () => {
		const css = ':host { color: red; } :host(:hover) { color: blue; }';
		const result = transformHostSelectors(css, 'ontario-input');
		expect(result).toBe('ontario-input { color: red; } ontario-input(:hover) { color: blue; }');
	});

	it('does not alter rules without :host', () => {
		const css = '.button { font-size: 16px; }';
		expect(transformHostSelectors(css, 'ontario-button')).toBe(css);
	});
});

// ─── stripCssComments ───────────────────────────────────────────────────────

describe('stripCssComments', () => {
	it('removes single block comments', () => {
		const css = '/* This is a comment */ .foo { color: red; }';
		expect(stripCssComments(css)).toBe('.foo { color: red; }');
	});

	it('removes multi-line block comments', () => {
		const css = '/*\n * Multi-line\n * comment\n */\n.bar { display: flex; }';
		expect(stripCssComments(css)).toBe('.bar { display: flex; }');
	});

	it('normalises excess blank lines', () => {
		// The empty-line strip pass removes ALL blank lines; excess runs are then collapsed.
		// Four consecutive newlines become two after normalisation.
		const css = '.a {}\n\n\n\n\n.b {}';
		const result = stripCssComments(css);
		expect(result).not.toMatch(/\n{3,}/);
		expect(result).toContain('.a {}');
		expect(result).toContain('.b {}');
	});

	it('trims leading and trailing whitespace', () => {
		const css = '   .x { margin: 0; }   ';
		expect(stripCssComments(css)).toBe('.x { margin: 0; }');
	});

	it('returns empty string for comment-only input', () => {
		expect(stripCssComments('/* nothing else */')).toBe('');
	});
});

// ─── extractOntarioComponents ───────────────────────────────────────────────

describe('extractOntarioComponents', () => {
	it('extracts a single Ontario component', () => {
		const markup = '<ontario-button type="primary">Click</ontario-button>';
		expect(extractOntarioComponents(markup)).toEqual(['ontario-button']);
	});

	it('extracts multiple distinct components', () => {
		const markup = '<ontario-button>A</ontario-button><ontario-input name="x"></ontario-input>';
		const result = extractOntarioComponents(markup);
		expect(result).toContain('ontario-button');
		expect(result).toContain('ontario-input');
		expect(result).toHaveLength(2);
	});

	it('deduplicates repeated components', () => {
		const markup = '<ontario-button>A</ontario-button><ontario-button>B</ontario-button>';
		expect(extractOntarioComponents(markup)).toEqual(['ontario-button']);
	});

	it('normalises ontario-icon-* variants to ontario-icon', () => {
		const markup = '<ontario-icon-warning></ontario-icon-warning><ontario-icon-info></ontario-icon-info>';
		expect(extractOntarioComponents(markup)).toEqual(['ontario-icon']);
	});

	it('returns an empty array when no Ontario components are present', () => {
		expect(extractOntarioComponents('<div><p>Hello</p></div>')).toEqual([]);
	});
});

// ─── buildDocument ───────────────────────────────────────────────────────────

describe('buildDocument', () => {
	it('wraps markup in a style block when styles are provided', () => {
		const result = buildDocument('<p>hello</p>', 'p { color: red; }');
		expect(result).toBe('<style>\np { color: red; }\n</style>\n\n<p>hello</p>');
	});

	it('returns bare markup when styles are empty', () => {
		expect(buildDocument('<p>hello</p>', '')).toBe('<p>hello</p>');
	});

	it('returns a complete HTML document when fullDocument is true', () => {
		const result = buildDocument('<main><p>hello</p></main>', 'p { color: red; }', true);
		expect(result).toContain('<!DOCTYPE html>');
		expect(result).toContain('<html lang="en">');
		expect(result).toContain('<head>');
		expect(result).toContain('<body>');
		expect(result).toContain('<style>');
		expect(result).toContain('<main><p>hello</p></main>');
	});
});

// ─── formatHtml ──────────────────────────────────────────────────────────────

describe('formatHtml', () => {
	it('removes DOCTYPE, html, head, and body wrappers', () => {
		const input = '<!doctype html><html><head><title>x</title></head><body><p>content</p></body></html>';
		const result = formatHtml(input);
		expect(result).not.toMatch(/<!doctype/i);
		expect(result).not.toMatch(/<html/i);
		expect(result).not.toMatch(/<head/i);
		expect(result).not.toMatch(/<body/i);
		expect(result).toContain('<p>');
	});

	it('removes HTML comments', () => {
		const input = '<div><!-- comment --><p>text</p></div>';
		expect(formatHtml(input)).not.toContain('<!--');
	});

	it('removes <style> tags by default', () => {
		const input = '<style>body { color: red; }</style><p>text</p>';
		expect(formatHtml(input)).not.toContain('<style>');
	});

	it('preserves <style> tags when removeStyles is false', () => {
		const input = '<style>body { color: red; }</style><p>text</p>';
		expect(formatHtml(input, false, false)).toContain('<style>');
	});

	it('indents nested tags with tabs', () => {
		const input = '<div><p>text</p></div>';
		const result = formatHtml(input);
		expect(result).toContain('\t<p>');
	});

	it('strips outer component tag when stripOuterComponent is true', () => {
		const input = '<ontario-button><button class="btn">Click</button></ontario-button>';
		const result = formatHtml(input, true);
		expect(result).not.toMatch(/^<ontario-button/);
		expect(result).toContain('<button');
	});

	it('preserves outer component tag when stripOuterComponent is false', () => {
		const input = '<ontario-button><button>Click</button></ontario-button>';
		const result = formatHtml(input, false);
		expect(result).toMatch(/^<ontario-button/);
	});

	it('handles self-closing tags without increasing indent', () => {
		const input = '<div><img src="a.png" /><p>text</p></div>';
		const result = formatHtml(input);
		const lines = result.split('\n');
		const imgLine = lines.find((l) => l.includes('<img'));
		const pLine = lines.find((l) => l.includes('<p>'));
		// Both img and p should be at the same indent level (one tab inside div)
		expect(imgLine?.startsWith('\t')).toBe(true);
		expect(pLine?.startsWith('\t')).toBe(true);
	});
});
