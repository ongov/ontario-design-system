# @ongov/ontario-design-system-component-html-generator

Automated HTML sample generation for Ontario Design System components with **automatic CSS inlining**.

Works as both a **CLI tool** (run it directly from the terminal) and a **library** (import `generateSamples()` into your own scripts or build pipeline).

## What it does

Takes your Web Components and generates clean, standalone HTML samples with:

- ✅ Rendered component markup
- ✅ Inline CSS styles (automatically transformed from shadow DOM)
- ✅ No Stencil framework artifacts
- ✅ Proper indentation and formatting
- ✅ Ready to use in documentation, Fractal, or anywhere

## Quick Start

### Install (when using as a library)

```bash
pnpm add @ongov/ontario-design-system-component-html-generator
```

### 1. Define your samples

Edit `src/sample-config.ts`:

```typescript
{
  component: 'ontario-button',
  html: '<ontario-button type="primary">Click me</ontario-button>',
  outputFile: 'ontario-button.html',
  description: 'Primary button example',
  includeStyles: true  // ← CSS will be inlined
}
```

### 2. Generate samples

```bash
pnpm build

# Write to the default generated-samples/ directory
pnpm start

# Or specify a custom output directory
pnpm start -- --outputDirectory path/to/output

# Or generate preview-ready full HTML documents
pnpm start -- --full-document
```

### 3. Get clean HTML output

Default output goes to `generated-samples/` (or a custom `--outputDirectory`):

```html
<style>
	ontario-button {
		/* Styles automatically transformed */
	}
	.button {
		padding: 0.6rem 1.25rem;
	}
</style>
<button class="button primary" type="button">Click me</button>
```

When using `--full-document`, output is wrapped for direct browser preview:

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<style>
			/* inlined component styles */
		</style>
	</head>
	<body>
		<button class="button primary" type="button">Click me</button>
	</body>
</html>
```

## Runtime Flow (Where the logic lives)

- `src/cli.ts` is the command entrypoint.
- `src/cli.ts` loads sample data from `src/sample-config.ts`.
- `src/cli.ts` calls `generateSamples({ samples })` from `src/index.ts`.
- `src/index.ts` is library-first: config in, deterministic result object out.
- `src/cli.ts` handles batch orchestration and file writes.
- `pnpm build` compiles all of this to `dist/*`.
- `pnpm start` runs `dist/cli.js`.

## Real-World Usage

If you want to generate files quickly from the default sample list, use the CLI.

From `packages/ontario-design-system-component-html-generator`, update `src/sample-config.ts`, then run:

```bash
pnpm build
pnpm start -- --outputDirectory ./generated-samples-team
```

This reads `samples` from `src/sample-config.ts`, runs the generator, and writes one HTML file per successful sample.

If you want full control (for example, storing `markup` and `styles` separately, or sending output to another system), use the library API.

```typescript
import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { generateSamples } from '@ongov/ontario-design-system-component-html-generator';

const samples = [
	{
		component: 'ontario-button',
		html: '<ontario-button type="primary" label="Save"></ontario-button>',
		outputFile: 'ontario-button.html',
		includeStyles: true,
	},
];

const result = await generateSamples({ samples });
mkdirSync('./out', { recursive: true });

for (const item of result.items) {
	if (!item.success) {
		console.error(`Failed: ${item.sample.component} -> ${item.error}`);
		continue;
	}

	writeFileSync(path.join('./out', item.sample.outputFile), `${item.renderedHtml}\n`, 'utf8');

	// Also available for custom workflows:
	// item.markup
	// item.styles
}

console.log(result.summary);
```

Use CLI when you want fast file generation from local config. Use the library when you need to control where and how generated output is consumed.

## Programmatic Usage (Library mode)

Once installed, you can import and call the generator directly from your own scripts or build pipeline:

```typescript
import { generateSamples } from '@ongov/ontario-design-system-component-html-generator';

const samples = [
	{
		component: 'ontario-button',
		html: '<ontario-button type="primary" label="Click me"></ontario-button>',
		outputFile: 'ontario-button.html',
	},
];

const result = await generateSamples({ samples });

const succeededSamples = result.items.filter((item) => item.success && item.renderedHtml);

for (const item of succeededSamples) {
	console.log(item.sample.outputFile, item.renderedHtml);
}
```

This is useful when you want the library to stay transport-agnostic and control your own output targets.

## Features

### Automatic CSS Inlining

- Loads component CSS from your component library
- Transforms `:host` selectors to component tags
- Includes dependency styles automatically
- Toggle with `includeStyles: true/false`

### Clean HTML Output

- No Stencil hydration artifacts (`s-id`, `c-id`, `data-*`)
- No shadow DOM wrappers
- Proper indentation
- Strips outer component wrapper tags

### Smart Rendering

- Uses `renderToString()` for Ontario components (SSR)
- Handles nested components and slots
- Resolves component dependencies

## Configuration

### Sample Definition

Each sample in `src/sample-config.ts` has:

```typescript
interface ComponentSample {
	component: string; // Component tag name
	html: string; // HTML to render
	outputFile: string; // Output filename (e.g., 'button.html')
	description?: string; // Optional description
	includeStyles?: boolean; // Include CSS (default: true)
}
```

### Example

```typescript
export const samples: ComponentSample[] = [
	{
		component: 'ontario-button',
		html: '<ontario-button type="primary">Click me</ontario-button>',
		outputFile: 'ontario-button.html',
		description: 'Primary button with label',
		includeStyles: true, // CSS will be inlined
	},
	{
		component: 'ontario-accordion',
		html: '<ontario-accordion name="Test" accordion-data="[...]"></ontario-accordion>',
		outputFile: 'ontario-accordion.html',
		includeStyles: false, // No CSS (HTML only)
	},
];
```

## How It Works

### 1. Component Rendering

**For Ontario components** (from component library):

- Uses `renderToString()` from hydrate build
- Server-side rendering for production components

**For local sample entries**:

- Uses the HTML defined in `src/sample-config.ts` as input to `renderToString()`
- Keeps output consistent with Ontario component library rendering

### 2. Cleanup Process

1. **Strip framework artifacts**: Removes `s-id`, `c-id`, `data-*`, `sc-*` classes
2. **Flatten shadow DOM**: Removes `<mock:shadow-root>` wrappers
3. **Resolve slots**: Replaces `<slot>` with actual content
4. **Format HTML**: Adds proper indentation
5. **Strip wrapper**: Removes outer `<ontario-button>` tag
6. **Inline CSS**: Adds component styles with transformed selectors

### 3. CSS Transformation

Shadow DOM styles use `:host`:

```css
:host {
	display: block;
}
```

Generator transforms to:

```css
ontario-button {
	display: block;
}
```

Dependency styles are merged automatically.

## Output

### File Structure

```
generated-samples/
├── my-component.html
├── sample-button.html
├── sample-input.html
├── sample-card.html
├── ontario-button.html
└── ontario-accordion.html
```

### Example Output (ontario-button.html)

```html
<style>
	ontario-button {
		display: inline-block;
	}
	.button {
		padding: 0.6rem 1.25rem;
		border-radius: 9999px;
		/* ... more styles ... */
	}
</style>
<button class="button primary" type="button">Click me</button>
```

## Use Cases

### 1. Documentation Sites

Point iframes to generated HTML:

```html
<iframe src="generated-samples/ontario-button.html"></iframe>
```

### 2. Fractal Integration

Load samples in Fractal templates:

```hbs
{{> @iframe src="/samples/ontario-button.html" }}
```

### 3. Style Guides

Use as static examples in design system docs

### 4. Testing

Visual regression testing with clean, reproducible HTML

## Advanced Usage

### Adding New Components

1. Add to `src/sample-config.ts`:

```typescript
{
  component: 'my-new-component',
  html: '<my-new-component prop="value"></my-new-component>',
  outputFile: 'my-new-component.html',
  includeStyles: true
}
```

2. Run generator:

```bash
pnpm build
pnpm start
```

## Troubleshooting

### Component not rendering

- Check the component tag and HTML in `src/sample-config.ts`
- Verify generator is built: `pnpm build`

### Styles not showing

- Verify the component exists in `@ongov/ontario-design-system-component-library`
- Reinstall dependencies if needed: `pnpm install`
- Set `includeStyles: true` in sample config

### Slots not resolving

- Check slot names and content in your sample HTML

## Development

### Build

```bash
pnpm build
```

### Generate samples

```bash
pnpm start
```

## Future Enhancements

- [ ] Support dynamic Fractal rendering
- [ ] Add batch processing for entire component library
- [ ] Generate index page with sample browser
- [ ] Add TypeScript definitions for samples

## License

Apache-2.0
