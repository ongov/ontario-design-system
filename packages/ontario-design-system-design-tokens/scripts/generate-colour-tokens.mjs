import fs from 'node:fs';
import path from 'node:path';

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

function token(value) {
	// Every token this generator emits is a colour. The `type: 'color'` keyword is
	// Style Dictionary's fixed identifier (American spelling), required so the
	// colour transforms (e.g. color/hsl) match these tokens.
	return { value, type: 'color' };
}

function clampChannel(channel) {
	return Math.max(0, Math.min(255, Math.round(channel)));
}

function hexToRgb(hex) {
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

function rgbToHex(rgb) {
	const format = (channel) => clampChannel(channel).toString(16).padStart(2, '0').toUpperCase();
	return `#${format(rgb.r)}${format(rgb.g)}${format(rgb.b)}`;
}

function rgbToHsl(rgb) {
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

function toHslString(rgb) {
	const hsl = rgbToHsl(rgb);
	const h = Math.round(hsl.h);
	const s = Math.round(hsl.s * 100);
	const l = Math.round(hsl.l * 100);
	return `hsl(${h} ${s}% ${l}%)`;
}

function interpolate(step, points) {
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

function buildRamp(anchorMap) {
	const points = Object.entries(anchorMap)
		.map(([step, colour]) => ({
			step: Number.parseInt(step, 10),
			rgb: hexToRgb(colour),
		}))
		.sort((a, b) => a.step - b.step);

	const ramp = {};
	rampSteps.forEach((step) => {
		const rgb = hexToRgb(interpolate(step, points));
		ramp[String(step)] = token(toHslString(rgb));
	});
	return ramp;
}

function tokenFromHex(hex) {
	return token(toHslString(hexToRgb(hex)));
}

function buildAccentRamps() {
	const accent = {};

	Object.entries(rampSeeds.accent).forEach(([family, anchors]) => {
		const familyRamp = buildRamp(anchors);
		familyRamp.light = token(`{colour.accent.${family}.10}`);
		familyRamp.base = token(`{colour.accent.${family}.50}`);
		familyRamp.dark = token(`{colour.accent.${family}.90}`);
		accent[family] = familyRamp;
	});

	return accent;
}

function buildSystemTokens() {
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

function buildTokenTree() {
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

function writeIfChanged(filePath, content) {
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
