/**
 * @file Generates the colour primitive tokens (greyscale, 12 accent ramps, and
 * system colours) from seed anchors using HSL interpolation, writing one JSON
 * file per hue to tokens/primitives/colour/. Idempotent: only rewrites files
 * that change.
 */
import fs from 'node:fs';
import path from 'node:path';

/** An RGB colour: each channel in the 0–255 range. */
interface Rgb {
	r: number;
	g: number;
	b: number;
}

/** An HSL colour: hue in 0–360, saturation/lightness as fractions (0–1). */
interface Hsl {
	h: number;
	s: number;
	l: number;
}

/** A Style Dictionary colour token. */
interface ColourToken {
	value: string;
	type: 'color';
}

const rootDir = process.cwd();
const outputDir = path.join(rootDir, 'tokens', 'primitives', 'colour');

const rampSteps = [0, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 100];

const rampSeeds = {
	grey: {
		0: '#FFFFFF',
		5: '#F2F2F2',
		20: '#CCCCCC',
		40: '#999999',
		60: '#666666',
		70: '#4D4D4D',
		100: '#1A1A1A',
	},
	accent: {
		red: { 0: '#FFFFFF', 10: '#FFE0E2', 50: '#F0454B', 90: '#D81A21', 100: '#000000' },
		magenta: { 0: '#FFFFFF', 10: '#FEDFF0', 50: '#F03093', 90: '#C00264', 100: '#000000' },
		orange: { 0: '#FFFFFF', 10: '#FEE1D9', 50: '#F15A22', 90: '#C64A1C', 100: '#000000' },
		purple: { 0: '#FFFFFF', 10: '#F1E3F2', 50: '#B975B7', 90: '#92278F', 100: '#000000' },
		blue: { 0: '#FFFFFF', 10: '#DBE9F5', 50: '#3193CC', 90: '#0369AC', 100: '#000000' },
		sky: { 0: '#FFFFFF', 10: '#C5EEFA', 50: '#00B2E3', 90: '#1080A6', 100: '#000000' },
		teal: { 0: '#FFFFFF', 10: '#CFEDED', 50: '#49A7A2', 90: '#367A76', 100: '#000000' },
		lime: { 0: '#FFFFFF', 10: '#DDEDC7', 50: '#8DC63F', 90: '#5F8129', 100: '#000000' },
		green: { 0: '#FFFFFF', 10: '#D1EFD4', 50: '#39B54A', 90: '#2B8737', 100: '#000000' },
		taupe: { 0: '#FFFFFF', 10: '#EBE7DB', 50: '#C1B28F', 90: '#7B725C', 100: '#000000' },
		yellow: { 0: '#FFFFFF', 10: '#F8E5C3', 50: '#FCAF17', 90: '#8A600D', 100: '#000000' },
		gold: { 0: '#FFFFFF', 10: '#F0E7CC', 50: '#CBA52E', 90: '#86743D', 100: '#000000' },
	},
};

/**
 * Wrap a value in a Style Dictionary colour token.
 * Every token this generator emits is a colour. The `type: 'color'` keyword is
 * Style Dictionary's fixed identifier (American spelling), required so the colour
 * transforms (e.g. color/hsl) match these tokens.
 * @param value - The token value (an `hsl(...)` string or `{alias}`).
 * @returns The colour token object.
 */
function token(value: string): ColourToken {
	return { value, type: 'color' };
}

/**
 * Clamp a colour channel to an integer in the 0–255 range.
 * @param channel - The raw channel value.
 * @returns The clamped, rounded channel.
 */
function clampChannel(channel: number): number {
	return Math.max(0, Math.min(255, Math.round(channel)));
}

/**
 * Parse a 6-digit hex colour into RGB channels.
 * @param hex - A `#rrggbb` colour string.
 * @returns The RGB channels.
 * @throws {Error} If the hex string is not a 6-digit colour.
 */
function hexToRgb(hex: string): Rgb {
	const clean = String(hex).trim().replace(/^#/, '');
	if (!/^[0-9a-fA-F]{6}$/.test(clean)) {
		throw new Error(`Unsupported hex colour format: ${hex}`);
	}
	return {
		r: Number.parseInt(clean.slice(0, 2), 16),
		g: Number.parseInt(clean.slice(2, 4), 16),
		b: Number.parseInt(clean.slice(4, 6), 16),
	};
}

/**
 * Format RGB channels as an uppercase `#rrggbb` hex string.
 * @param rgb - The RGB channels.
 * @returns The hex colour string.
 */
function rgbToHex(rgb: Rgb): string {
	const format = (channel: number) => clampChannel(channel).toString(16).padStart(2, '0').toUpperCase();
	return `#${format(rgb.r)}${format(rgb.g)}${format(rgb.b)}`;
}

/**
 * Convert RGB channels to HSL components.
 * @param rgb - The RGB channels.
 * @returns Hue (0–360), saturation and lightness (0–1).
 */
function rgbToHsl(rgb: Rgb): Hsl {
	const r = clampChannel(rgb.r) / 255;
	const g = clampChannel(rgb.g) / 255;
	const b = clampChannel(rgb.b) / 255;

	const max = Math.max(r, g, b);
	const min = Math.min(r, g, b);
	const delta = max - min;
	const lightness = (max + min) / 2;

	let hue = 0;
	if (delta !== 0) {
		if (max === r) {
			hue = ((g - b) / delta) % 6;
		} else if (max === g) {
			hue = (b - r) / delta + 2;
		} else {
			hue = (r - g) / delta + 4;
		}
		hue *= 60;
		if (hue < 0) {
			hue += 360;
		}
	}

	const saturation = delta === 0 ? 0 : delta / (1 - Math.abs(2 * lightness - 1));
	return { h: hue, s: saturation, l: lightness };
}

/**
 * Format RGB channels as a space-separated `hsl(h s% l%)` string.
 * @param rgb - The RGB channels.
 * @returns The HSL colour string.
 */
function toHslString(rgb: Rgb): string {
	const hsl = rgbToHsl(rgb);
	const h = Math.round(hsl.h);
	const s = Math.round(hsl.s * 100);
	const l = Math.round(hsl.l * 100);
	return `hsl(${h} ${s}% ${l}%)`;
}

/** A ramp anchor point: the step it sits at, and its RGB colour. */
interface RampPoint {
	step: number;
	rgb: Rgb;
}

/**
 * Linearly interpolate a ramp colour at a given step between sorted anchor points.
 * Steps outside the anchor range are extrapolated from the nearest segment.
 * @param step - The ramp step to compute.
 * @param points - Sorted anchor points.
 * @returns The interpolated `#rrggbb` colour.
 * @throws {Error} If fewer than two anchor points are supplied.
 */
function interpolate(step: number, points: RampPoint[]): string {
	if (points.length < 2) {
		throw new Error('At least two colour anchors are required to build a ramp.');
	}

	if (step <= points[0].step) {
		const [low, high] = points;
		const t = (step - low.step) / (high.step - low.step);
		return rgbToHex({
			r: low.rgb.r + (high.rgb.r - low.rgb.r) * t,
			g: low.rgb.g + (high.rgb.g - low.rgb.g) * t,
			b: low.rgb.b + (high.rgb.b - low.rgb.b) * t,
		});
	}

	if (step >= points[points.length - 1].step) {
		const low = points[points.length - 2];
		const high = points[points.length - 1];
		const t = (step - low.step) / (high.step - low.step);
		return rgbToHex({
			r: low.rgb.r + (high.rgb.r - low.rgb.r) * t,
			g: low.rgb.g + (high.rgb.g - low.rgb.g) * t,
			b: low.rgb.b + (high.rgb.b - low.rgb.b) * t,
		});
	}

	for (let index = 0; index < points.length - 1; index += 1) {
		const low = points[index];
		const high = points[index + 1];
		if (step >= low.step && step <= high.step) {
			const t = (step - low.step) / (high.step - low.step);
			return rgbToHex({
				r: low.rgb.r + (high.rgb.r - low.rgb.r) * t,
				g: low.rgb.g + (high.rgb.g - low.rgb.g) * t,
				b: low.rgb.b + (high.rgb.b - low.rgb.b) * t,
			});
		}
	}

	return rgbToHex(points[points.length - 1].rgb);
}

/**
 * Build a full ramp of colour tokens from a sparse map of anchor colours.
 * @param anchorMap - Map of step to anchor hex colour.
 * @returns The ramp keyed by step.
 */
function buildRamp(anchorMap: Record<string, string>): Record<string, ColourToken> {
	const points = Object.entries(anchorMap)
		.map(([step, colour]) => ({
			step: Number.parseInt(step, 10),
			rgb: hexToRgb(colour),
		}))
		.sort((a, b) => a.step - b.step);

	const ramp: Record<string, ColourToken> = {};
	rampSteps.forEach((step) => {
		const rgb = hexToRgb(interpolate(step, points));
		ramp[String(step)] = token(toHslString(rgb));
	});
	return ramp;
}

/**
 * Build a single colour token from a hex value (converted to HSL).
 * @param hex - A `#rrggbb` colour string.
 * @returns The colour token.
 */
function tokenFromHex(hex: string): ColourToken {
	return token(toHslString(hexToRgb(hex)));
}

/** An accent ramp's steps, plus its light/base/dark semantic aliases. */
type AccentRamp = Record<string, ColourToken>;

/**
 * Build the 12 accent hue ramps, each with light/base/dark aliases.
 * @returns The accent ramps keyed by hue.
 */
function buildAccentRamps(): Record<string, AccentRamp> {
	const accent: Record<string, AccentRamp> = {};

	Object.entries(rampSeeds.accent).forEach(([family, anchors]) => {
		const familyRamp: AccentRamp = buildRamp(anchors);
		familyRamp.light = token(`{colour.accent.${family}.10}`);
		familyRamp.base = token(`{colour.accent.${family}.50}`);
		familyRamp.dark = token(`{colour.accent.${family}.90}`);
		accent[family] = familyRamp;
	});

	return accent;
}

/**
 * Build the system colour tokens (alert, success, warning, information, link,
 * focus, and the secondary/tertiary button states).
 * @returns The system colour token tree.
 */
function buildSystemTokens(): Record<string, any> {
	return {
		alert: {
			base: tokenFromHex('#CD0000'),
			light: tokenFromHex('#FCEFF0'),
		},
		success: {
			base: tokenFromHex('#118847'),
			light: tokenFromHex('#E5F0E9'),
		},
		warning: {
			base: tokenFromHex('#FFD440'),
			light: tokenFromHex('#FEF6DC'),
		},
		information: {
			base: tokenFromHex('#1080A6'),
			light: tokenFromHex('#E2F0F4'),
		},
		link: {
			default: tokenFromHex('#0066CC'),
			hover: tokenFromHex('#00478F'),
			active: tokenFromHex('#002142'),
			visited: tokenFromHex('#551A8B'),
		},
		focus: tokenFromHex('#009ADB'),
		secondary: {
			hover: tokenFromHex('#E0F0FF'),
			active: tokenFromHex('#C2E0FF'),
		},
		tertiary: {
			hover: tokenFromHex('#E8E8E8'),
			active: tokenFromHex('#D1D1D1'),
		},
	};
}

/**
 * Assemble the full colour token tree (greyscale, neutral aliases, accents, system).
 * @returns The complete colour token tree.
 */
function buildTokenTree(): { colour: Record<string, any> } {
	const greyscaleRamp = buildRamp(rampSeeds.grey);
	const accent = buildAccentRamps();

	return {
		colour: {
			greyscale: greyscaleRamp,
			neutral: {
				white: token('{colour.greyscale.0}'),
				black: token('{colour.greyscale.100}'),
			},
			accent,
			system: buildSystemTokens(),
		},
	};
}

/**
 * Write a file only if its content differs, so the generator stays idempotent.
 * @param filePath - Absolute path of the file to write.
 * @param content - The desired file content.
 * @returns True if the file was written (changed), false if unchanged.
 */
function writeIfChanged(filePath: string, content: string): boolean {
	const current = fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : '';
	if (current === content) {
		return false;
	}

	fs.mkdirSync(path.dirname(filePath), { recursive: true });
	fs.writeFileSync(filePath, content);
	return true;
}

const tokenTree = buildTokenTree();
const { colour } = tokenTree;

const files = {
	'grey.json': { colour: { greyscale: colour.greyscale, neutral: colour.neutral } },
	'system.json': { colour: { system: colour.system } },
	...Object.fromEntries(
		Object.entries(colour.accent).map(([hue, ramp]) => [`${hue}.json`, { colour: { accent: { [hue]: ramp } } }]),
	),
};

const results = Object.entries(files).map(([filename, tree]) => {
	const filePath = path.join(outputDir, filename);
	const content = `${JSON.stringify(tree, null, 2)}\n`;
	const changed = writeIfChanged(filePath, content);
	return { filename, changed };
});

const updated = results.filter((r) => r.changed).map((r) => r.filename);
if (updated.length > 0) {
	console.log(`Updated ${updated.length} file(s) in tokens/primitives/colour/: ${updated.join(', ')}`);
} else {
	console.log('tokens/primitives/colour/ is already up to date.');
}
