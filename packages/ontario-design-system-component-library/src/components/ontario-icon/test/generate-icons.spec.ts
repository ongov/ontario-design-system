import { createRequire } from 'node:module';
import { spawnSync } from 'node:child_process';
import { copyFileSync, mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { parseSync, type INode } from 'svgson';
import { vi } from 'vitest';
import { validateIconWidth } from '../icon-validation';
import { IconColours } from '../icon.types';

const requireGenerator = createRequire(import.meta.url);
const { getIconComponentTemplate, validateManifest } = requireGenerator('../scripts/generate-icons.cjs') as {
    getIconComponentTemplate: (
        svg: INode,
        icon: { name: string; colour: string; [key: string]: unknown },
    ) => string;
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

describe('icon generator default colours', () => {
    const icon = {
        name: 'ontario-icon-test',
        category: 'primary',
        viewBox: '0 0 24 24',
        colour: 'configurable',
        aliases: [],
        deprecated: false,
    };
    const assets = ['ontario-icon-test.svg'];

    it.each(IconColours)('accepts the runtime colour token %s as a configurable default', (defaultColour) => {
        expect(() => validateManifest([{ ...icon, defaultColour }], assets)).not.toThrow();
    });

    it.each([
        { colour: 'configurable', defaultColour: 'purple' },
        { colour: 'fixed', defaultColour: 'white' },
        { colour: 'multicolour', defaultColour: 'white' },
    ])('reports an invalid defaultColour for $colour icons using $defaultColour', (overrides) => {
        expect(() => validateManifest([{ ...icon, ...overrides }], assets)).toThrow(
            `Invalid defaultColour for ontario-icon-test: only configurable icons accept ${IconColours.join(', ')}.`,
        );
    });

    it.each(['configurable', 'fixed', 'multicolour'])('allows %s icons without an explicit default', (colour) => {
        expect(() => validateManifest([{ ...icon, colour }], assets)).not.toThrow();
    });
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
        expect(() => validateManifest([{ ...icon, replacedBy }, replacement], assetFiles)).toThrow();
    });

    it('allows replacement metadata to be omitted', () => {
        expect(() => validateManifest([icon, replacement], assetFiles)).not.toThrow();
    });
});

describe('icon generator deprecation metadata', () => {
    const icon = {
        name: 'ontario-icon-old',
        category: 'primary',
        viewBox: '0 0 24 24',
        colour: 'configurable',
        aliases: [],
        deprecated: true,
        replacedBy: 'ontario-icon-search',
    };
    const replacement = { ...icon, name: 'ontario-icon-search', deprecated: false, replacedBy: undefined };
    const assets = ['ontario-icon-old.svg', 'ontario-icon-search.svg'];
    const deprecationNote = 'Set colour="white" to preserve the white icon.';

    it('accepts a full replacement tag that appears later in the manifest', () => {
        expect(() => validateManifest([{ ...icon, deprecationNote }, replacement], assets)).not.toThrow();
    });

    it.each(['search', 'ontario-icon-typo', 'ontario-icon-old', ''])('rejects invalid replacement "%s"', (replacedBy) => {
        expect(() => validateManifest([{ ...icon, replacedBy }, replacement], assets)).toThrow();
    });

    it('rejects replacement metadata on a non-deprecated icon', () => {
        expect(() => validateManifest([{ ...icon, deprecated: false }, replacement], assets)).toThrow();
    });

    it.each([42, '', '   ', 'first line\nsecond line', 'closes */ comment'])(
        'rejects invalid deprecation guidance %j',
        (deprecationNote) => {
            expect(() => validateManifest([{ ...icon, deprecationNote }, replacement], assets)).toThrow(
                'Incomplete manifest entry for ontario-icon-old',
            );
        },
    );

    it('rejects migration guidance on a non-deprecated icon', () => {
        expect(() => validateManifest([{ ...replacement, deprecationNote }], ['ontario-icon-search.svg'])).toThrow();
    });

    it('includes migration guidance in the generated notice and warning call', () => {
        const template = getIconComponentTemplate(parseSync('<svg class="svg-icon"><path /></svg>'), {
            ...icon,
            deprecationNote,
        });

        expect(template).toContain(`@deprecated Use ontario-icon-search instead. ${deprecationNote}`);
        expect(template).toContain(
            `warnIconDeprecated('ontario-icon-old', 'ontario-icon-search', ${JSON.stringify(deprecationNote)})`,
        );
    });

    it('keeps migration guidance optional', () => {
        expect(() => validateManifest([icon, replacement], assets)).not.toThrow();
        const template = getIconComponentTemplate(parseSync('<svg class="svg-icon"><path /></svg>'), icon);

        expect(template).toContain('@deprecated Use ontario-icon-search instead.');
        expect(template).toContain("warnIconDeprecated('ontario-icon-old', 'ontario-icon-search')");
    });
});

const packageRoot = process.cwd();
const sourceDirectory = path.join(packageRoot, 'src/components/ontario-icon');
const iconNames = [37, 38, 39].map((length) => `ontario-icon-${'a'.repeat(length - 'ontario-icon-'.length)}`);

describe('icon generator CLI', () => {
    let fixture: string;
    let iconDirectory: string;
    let demoPath: string;

    const runGenerator = (...args: string[]) =>
        spawnSync(process.execPath, [path.join(iconDirectory, 'scripts/generate-icons.cjs'), ...args], {
            encoding: 'utf-8',
            env: {
                ...process.env,
                NODE_PATH: [path.join(packageRoot, 'node_modules'), process.env.NODE_PATH].filter(Boolean).join(path.delimiter),
            },
        });

    beforeEach(() => {
        fixture = mkdtempSync(path.join(tmpdir(), 'ontario-icon-generator-'));
        iconDirectory = path.join(fixture, 'src/components/ontario-icon');
        demoPath = path.join(fixture, 'src/index.html');
        mkdirSync(path.join(iconDirectory, 'scripts'), { recursive: true });
        mkdirSync(path.join(iconDirectory, 'assets'));
        copyFileSync(
            path.join(sourceDirectory, 'scripts/generate-icons.cjs'),
            path.join(iconDirectory, 'scripts/generate-icons.cjs'),
        );
        copyFileSync(path.join(packageRoot, '../../.prettierrc.json'), path.join(fixture, '.prettierrc.json'));
        writeFileSync(
            path.join(iconDirectory, 'icon-manifest.json'),
            JSON.stringify({
                icons: iconNames.map((name, index) => ({
                    name,
                    category: index === 1 ? 'secondary' : 'primary',
                    viewBox: '0 0 24 24',
                    colour: 'configurable',
                    aliases: [],
                    deprecated: false,
                })),
            }),
        );
        for (const name of iconNames) {
            writeFileSync(
                path.join(iconDirectory, 'assets', `${name}.svg`),
                '<svg class="svg-icon" viewBox="0 0 24 24"></svg>',
            );
        }
        writeFileSync(
            demoPath,
            '<html><body><main><!-- ICON_GALLERY_START --><!-- ICON_GALLERY_END --></main></body></html>',
        );
    });

    afterEach(() => rmSync(fixture, { recursive: true, force: true }));

    it('formats and regenerates names near the previous line-break threshold consistently', () => {
        expect(runGenerator().status).toBe(0);
        const generated = readFileSync(demoPath, 'utf-8');
        for (const name of iconNames) {
            expect(generated).toContain(`<${name} icon-width="32"></${name}>`);
        }
        expect(generated.indexOf('icon-category-primary')).toBeLessThan(generated.indexOf('icon-category-secondary'));
        expect(runGenerator('--check').status).toBe(0);
        expect(runGenerator().status).toBe(0);
        expect(readFileSync(demoPath, 'utf-8')).toBe(generated);
    });

    it('reports gallery and component drift together without writing files', () => {
        expect(runGenerator().status).toBe(0);
        const componentPath = path.join(iconDirectory, iconNames[0], `${iconNames[0]}.tsx`);
        const staleDemo = readFileSync(demoPath, 'utf-8').replace(iconNames[0], 'ontario-icon-stale');
        const staleComponent = 'stale component';
        writeFileSync(demoPath, staleDemo);
        writeFileSync(componentPath, staleComponent);
        const result = runGenerator('--check');
        expect(result.status).toBe(1);
        expect(result.stderr).toContain('Icon gallery in src/index.html is out of date');
        expect(result.stderr).toContain(`Generated icon is out of date: ${iconNames[0]}/${iconNames[0]}.tsx`);
        expect(readFileSync(demoPath, 'utf-8')).toBe(staleDemo);
        expect(readFileSync(componentPath, 'utf-8')).toBe(staleComponent);
    });

    it('detects unformatted demo HTML outside the gallery', () => {
        expect(runGenerator().status).toBe(0);
        const unformattedDemo = readFileSync(demoPath, 'utf-8').replace('<body>', '<body   >');
        writeFileSync(demoPath, unformattedDemo);
        const result = runGenerator('--check');
        expect(result.status).toBe(1);
        expect(result.stderr).toContain('Icon gallery in src/index.html is out of date');
        expect(readFileSync(demoPath, 'utf-8')).toBe(unformattedDemo);
    });

    it('fails when gallery markers are missing', () => {
        writeFileSync(demoPath, '<html><body></body></html>');
        const result = runGenerator('--check');
        expect(result.status).toBe(1);
        expect(result.stderr).toContain('Icon gallery markers are missing or out of order');
    });

    it('rejects categories inherited from the object prototype', () => {
        const manifestPath = path.join(iconDirectory, 'icon-manifest.json');
        const manifest = JSON.parse(readFileSync(manifestPath, 'utf-8'));
        manifest.icons[0].category = 'toString';
        writeFileSync(manifestPath, JSON.stringify(manifest));
        const result = runGenerator('--check');
        expect(result.status).toBe(1);
        expect(result.stderr).toContain('Invalid category or colour capability');
    });
});