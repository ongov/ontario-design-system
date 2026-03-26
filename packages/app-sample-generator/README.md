# @ongov/app-sample-generator

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
pnpm add @ongov/app-sample-generator
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

## Runtime Flow (Where the logic lives)

- `src/cli.ts` is the command entrypoint.
- `src/cli.ts` calls `generateSamples()` from `src/index.ts`.
- `src/index.ts` loads sample data from `src/sample-config.ts`.
- `src/index.ts` renders + cleans HTML and writes output files.
- `pnpm build` compiles all of this to `dist/*`.
- `pnpm start` runs `dist/cli.js`.

## Programmatic Usage (Library mode)

Once installed, you can import and call the generator directly from your own scripts or build pipeline:

```typescript
import { generateSamples } from '@ongov/app-sample-generator';

// Uses generated-samples/ by default
await generateSamples();

// Or write to a custom directory
await generateSamples({ outputDirectory: 'path/to/output' });
```

This is useful if you want to run generation as part of a larger build step rather than invoking it from the terminal.

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

- [ ] Extract into reusable library package
- [ ] Support dynamic Fractal rendering
- [ ] Add batch processing for entire component library
- [ ] Generate index page with sample browser
- [ ] Add TypeScript definitions for samples

## License

Apache-2.0
