import { createRequire } from 'node:module';
import { parseSync, type INode } from 'svgson';
import { vi } from 'vitest';
import { validateIconWidth } from '../icon-validation';

const require = createRequire(import.meta.url);
const { getIconComponentTemplate, validateManifest } = require('../scripts/generate-icons.cjs') as {
	getIconComponentTemplate: (svg: INode, icon: { name: string; colour: string }) => string;
	validateManifest: (icons: unknown, assetFiles: string[]) => void;
};

describe('icon generator colour styles', () => {
	const icon = { name: 'ontario-icon-test', colour: 'configurable' };

	it('rejects configurable artwork without the SVG class marker', () => {
		expect(() => getIconComponentTemplate(parseSync('<svg><path /></svg>'), icon)).toThrow(
			'Configurable icon ontario-icon-test has no class="svg-icon" to apply colour to.',
		);
	});

	it.each(['svg-icon', 'svg-icon ontario-icon'])('injects colour styles and preserves class="%s"', (className) => {
		const template = getIconComponentTemplate(parseSync(`<svg class="${className}"><path /></svg>`), icon);

		expect(template).toContain(`class="${className}" style={{ fill:`);
		expect(template).toContain('stroke: `${this.iconCustomColourState}`');
	});

	it.each(['fixed', 'multicolour'])('allows %s artwork without the SVG class marker', (colour) => {
		expect(() => getIconComponentTemplate(parseSync('<svg><path /></svg>'), { ...icon, colour })).not.toThrow();
	});
});

describe('icon generator width defaults', () => {
	afterEach(() => vi.restoreAllMocks());

	it.each(['configurable', 'fixed', 'multicolour'])(
		'keeps the %s literal default aligned with the fallback',
		(colour) => {
			vi.spyOn(console, 'warn').mockImplementation(() => undefined);
			const iconName = 'ontario-icon-test';
			const fallbackWidth = validateIconWidth(Number.NaN, iconName);
			const template = getIconComponentTemplate(parseSync('<svg class="svg-icon"><path /></svg>'), {
				name: iconName,
				colour,
			});

			expect(template).toContain(`@Prop() iconWidth: IconSize = ${fallbackWidth};`);
		},
	);
});

describe('icon manifest replacement names', () => {
	const icon = {
		name: 'ontario-icon-old',
		category: 'primary',
		viewBox: '0 0 24 24',
		colour: 'configurable',
		aliases: [],
		deprecated: true,
	};
	const replacement = { ...icon, name: 'ontario-icon-search', deprecated: false };
	const assetFiles = ['ontario-icon-old.svg', 'ontario-icon-search.svg'];

	it.each(['search', 'ontario-icon-search'])('accepts a later manifest entry named %s', (replacedBy) => {
		expect(() => validateManifest([{ ...icon, replacedBy }, replacement], assetFiles)).not.toThrow();
	});

	it.each(['searhc', ''])('rejects an unknown replacement name "%s"', (replacedBy) => {
		expect(() => validateManifest([{ ...icon, replacedBy }, replacement], assetFiles)).toThrow(
			`Unknown replacement icon ${replacedBy} on ontario-icon-old.`,
		);
	});

	it('allows replacement metadata to be omitted', () => {
		expect(() => validateManifest([icon, replacement], assetFiles)).not.toThrow();
	});
});
