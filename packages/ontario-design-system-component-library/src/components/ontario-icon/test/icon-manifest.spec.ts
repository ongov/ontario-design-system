import { readFileSync } from 'node:fs';
import { parseSync, type INode } from 'svgson';
import manifest from '../icon-manifest.json' with { type: 'json' };

const findIcon = (name: string) => manifest.icons.find((icon) => icon.name === name);

// Artwork that intentionally keeps part of its shape a fixed colour while the rest follows `colour`.
const intentionalFixedPaint: Record<string, string[]> = {
	'ontario-icon-critical-alert-warning': ['path[fill=white]'],
};

const findHardcodedPaint = (node: INode): string[] =>
	node.children.flatMap((child) => [
		...['fill', 'stroke']
			.filter((attribute) => ![undefined, 'none', 'currentColor'].includes(child.attributes[attribute]))
			.map((attribute) => `${child.name}[${attribute}=${child.attributes[attribute]}]`),
		...findHardcodedPaint(child),
	]);

describe('icon-manifest', () => {
	it('does not hardcode paint on the shapes of configurable-colour icons', () => {
		const offenders = manifest.icons
			.filter((icon) => icon.colour === 'configurable')
			.map((icon) => {
				const svg = parseSync(readFileSync(new URL(`../assets/${icon.name}.svg`, import.meta.url), 'utf-8'));
				return [
					icon.name,
					findHardcodedPaint(svg).filter((paint) => !intentionalFixedPaint[icon.name]?.includes(paint)),
				] as const;
			})
			.filter(([, paint]) => paint.length > 0);

		expect(offenders).toEqual([]);
	});

	it('only sets a default colour on configurable-colour icons', () => {
		for (const icon of manifest.icons.filter((candidate) => 'defaultColour' in candidate)) {
			expect(icon.colour).toBe('configurable');
		}
	});

	it.each(['ontario-icon-close-header', 'ontario-icon-menu-header'])('defaults %s to white', (name) => {
		expect(findIcon(name)).toMatchObject({ colour: 'configurable', defaultColour: 'white' });
	});

	it('keeps attach and critical-alert-warning configurable', () => {
		expect(findIcon('ontario-icon-attach')?.colour).toBe('configurable');
		expect(findIcon('ontario-icon-critical-alert-warning')?.colour).toBe('configurable');
	});

	it('classifies dropdown-arrow as a configurable-colour icon', () => {
		expect(findIcon('ontario-icon-dropdown-arrow')?.colour).toBe('configurable');
	});

	it('deprecates search-white in favour of search', () => {
		const searchWhite = findIcon('ontario-icon-search-white');

		expect(searchWhite?.deprecated).toBe(true);
		expect(searchWhite?.replacedBy).toBe('search');
		expect(findIcon('ontario-icon-search')?.deprecated).toBe(false);
	});

	it('only names existing icons as replacements for deprecated icons', () => {
		const names = new Set(manifest.icons.map((icon) => icon.name));
		const replaced = manifest.icons.filter((icon) => 'replacedBy' in icon);

		expect(replaced.length).toBeGreaterThan(0);
		for (const icon of replaced) {
			expect(icon.deprecated).toBe(true);
			expect(names.has(`ontario-icon-${(icon as { replacedBy: string }).replacedBy}`)).toBe(true);
		}
	});
});
