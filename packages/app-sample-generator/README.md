# stencil-sample-generator

Automated HTML sample generation for Stencil components with **automatic CSS inlining**.

## What it does

Takes your Web Components and generates clean, standalone HTML samples with:

- ✅ Rendered component markup
- ✅ Inline CSS styles (automatically transformed from shadow DOM)
- ✅ No Stencil framework artifacts
- ✅ Proper indentation and formatting
- ✅ Ready to use in documentation, Fractal, or anywhere

## Quick Start

### 1. Define your samples

Edit `scripts/sample-config.ts`:

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
npm run generate-samples
```

### 3. Get clean HTML output

Output goes to `docs/samples/`:

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
- Uses `newSpecPage()` for local test components
- Handles nested components and slots
- Resolves component dependencies

## Configuration

### Sample Definition

Each sample in `scripts/sample-config.ts` has:

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

**For local test components**:

- Uses `newSpecPage()` from Stencil testing
- Perfect for prototypes and examples

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
docs/samples/
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
<iframe src="docs/samples/ontario-button.html"></iframe>
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

1. Add to `sample-config.ts`:

```typescript
{
  component: 'my-new-component',
  html: '<my-new-component prop="value"></my-new-component>',
  outputFile: 'my-new-component.html',
  includeStyles: true
}
```

2. Add module path in `generate-samples.ts`:

```typescript
const componentModulePaths = {
	'my-new-component': path.join(process.cwd(), 'dist', 'stencilsample', 'my-new-component.entry.js'),
	// ...
};
```

3. Add style path:

```typescript
const componentStylePaths = {
	'my-new-component': path.join(process.cwd(), 'src', 'components', 'my-new-component', 'my-new-component.css'),
	// ...
};
```

4. Run generator:

```bash
npm run generate-samples
```

### Nested Components

For components with dependencies:

```typescript
const componentDependencies = {
	'sample-card': ['sample-card-action'], // Card contains action buttons
};
```

Generator loads both and resolves slots automatically.

## Troubleshooting

### Component not rendering

- Check module path in `componentModulePaths`
- Verify component is built: `npm run build-components`

### Styles not showing

- Check style path in `componentStylePaths`
- Verify CSS file exists
- Set `includeStyles: true` in sample config

### Slots not resolving

- Add dependencies in `componentDependencies`
- Check slot names match between parent/child

## Development

### Build components

```bash
npm run build-components
```

### Generate samples

```bash
npm run generate-samples
```

### Screenshot sample

```bash
npm run screenshot:sample-button
```

## Future Enhancements

- [ ] Extract into reusable library package
- [ ] Support dynamic Fractal rendering
- [ ] Add batch processing for entire component library
- [ ] Generate index page with sample browser
- [ ] Add TypeScript definitions for samples

## License

ISC

    K -->|final HTML| L["writeFileSync()"]

    L -->|saves to| M["docs/samples/<br/>component-name.html"]

    style D fill:#e1f5ff
    style E fill:#f3e5f5
    style G fill:#fff3e0
    style H fill:#e8f5e9
    style M fill:#fce4ec
