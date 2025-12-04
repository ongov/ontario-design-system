# Component Library - AI Agent Instructions

**Package**: `@ongov/ontario-design-system-component-library`

This is the **core Stencil component library**. Components built here are automatically wrapped for React and Angular. See [root AGENTS.md](../../AGENTS.md) for universal guidelines.

## Quick Reference

```bash
# Development
pnpm run start          # Dev server at http://localhost:3333
pnpm run build          # Build library + generate framework wrappers
pnpm run test           # Unit tests
pnpm run test.watch     # Unit tests in watch mode
pnpm run test:e2e       # E2E tests
npx stencil generate <name>  # Scaffold new component
```

## Component Development

### Creating a New Component

```bash
npx stencil generate ontario-my-component
```

**Generated files**:

- `ontario-my-component.tsx` - Component logic
- `ontario-my-component.scss` - Styles (BEM methodology)
- `ontario-my-component.spec.tsx` - Unit tests
- `ontario-my-component.e2e.ts` - E2E tests
- `readme.md` - Auto-generated API docs

### Component Structure

```typescript
import { Component, Prop, State, Event, EventEmitter, Watch, h } from '@stencil/core';

@Component({
  tag: 'ontario-button',
  styleUrl: 'ontario-button.scss',
  shadow: true,  // Always use Shadow DOM
})
export class OntarioButton {
  /**
   * The variant of the button.
   * Defaults to 'secondary' per Design System guidance.
   * @example "secondary"
   */
  @Prop() variant?: ButtonVariant | string = ButtonVariant.Secondary;

  // State naming: propertyName + 'State'
  @State() variantState: ButtonVariant = ButtonVariant.Secondary;

  /**
   * Emitted when the button is clicked.
   * Event naming: component + eventName (no 'on' prefix)
   */
  @Event() buttonClick: EventEmitter<void>;

  @Watch('variant')
  validateVariant() {
    // Validate and update state
    if (this.variant && Object.values(ButtonVariant).includes(this.variant as ButtonVariant)) {
      this.variantState = this.variant as ButtonVariant;
    } else {
      console.warn(`Invalid variant: ${this.variant}`);
      this.variantState = ButtonVariant.Secondary;
    }
  }

  componentWillLoad() {
    this.validateVariant();
  }

  render() {
    return (
      <button
        class={`ontario-button ontario-button--${this.variantState}`}
        onClick={() => this.buttonClick.emit()}
        aria-label={this.ariaLabel}
      >
        <slot />
      </button>
    );
  }
}
```

## Key Patterns

### 1. Component Decomposition

Break components into reusable, composable parts:

**Item/Collection Pattern**:

- `ontario-card` (item) + `ontario-card-collection` (container)
- `ontario-task` (item) + `ontario-task-list` (container)

**Future Pattern** (not yet implemented):

- `ontario-accordion-section` (item) + `ontario-accordion` (container with slots)

**API Design**: Prefer semantic HTML over complex object parameters where possible.

### 2. State Management & Property Mirroring

Properties are mirrored as state to activate Stencil's reactive lifecycle:

```typescript
@Prop() options?: Option[] | string;  // Accepts JSON string or object
@State() optionsState: Option[] = [];  // Internal state

@Watch('options')
parseOptions() {
  if (typeof this.options === 'string') {
    this.optionsState = JSON.parse(this.options);
  } else if (Array.isArray(this.options)) {
    this.optionsState = this.options;
  }
}

componentWillLoad() {
  this.parseOptions();
}
```

**Why**:

- Activates `@Watch` decorators on property changes
- Supports both HTML (JSON strings) and JS (objects)
- Controlled updates through parsing methods

**State Naming**: Always use `propertyName` + `State` pattern

### 3. Enum Validation & Type Mapping

```typescript
export enum ButtonVariant {
  Primary = 'primary',
  Secondary = 'secondary',
  Tertiary = 'tertiary',
}

// Pattern 1: Enum Keys → Type (for Stencil docs)
export type BadgeColour = keyof typeof BadgeColourToClass;

// Pattern 2: Enum Values → Type
type BadgeColour2 = `${BadgeColourToClass}`;

// Usage in component
@Prop() variant?: ButtonVariant | string = ButtonVariant.Secondary;
@State() variantState: ButtonVariant = ButtonVariant.Secondary;
```

Check existing components for validation utility functions.

### 4. Event Naming

**Pattern**: `component` + `eventName`

**Examples**: `buttonClick`, `inputChange`, `checkboxChange`

**No `on` prefix** - Framework wrappers add automatically

**ShadowDOM Context**: Events often mirror HTML events (e.g., `change`) because they don't propagate across Shadow DOM boundaries.

```typescript
@Event() inputChange: EventEmitter<string>;

private handleInput = (event: Event) => {
  const value = (event.target as HTMLInputElement).value;
  this.inputChange.emit(value);
};
```

### 5. Sensible Defaults

Follow [Ontario Design System guidance](https://designsystem.ontario.ca/):

```typescript
// Button defaults to 'secondary' to avoid multiple primaries
@Prop() variant?: 'primary' | 'secondary' | 'tertiary' = 'secondary';

// Type defaults to 'button' for safety
@Prop() type?: 'button' | 'submit' | 'reset' = 'button';
```

### 6. Accessibility

**Never use `disabled` attribute** - violates accessibility guidance:

```typescript
// ❌ BAD
<button disabled={this.disabled}>

// ✅ GOOD - Keep enabled, validate on submit
<button
  aria-label={this.ariaLabel}
  aria-pressed={!!this.pressed}
>
```

**Use `!!` pattern** for boolean conversion.

## SCSS & Styling

### Imports

Use decomposed partials with `pkg:` prefix:

```scss
@use 'sass:math';
@use 'pkg:@ongov/ontario-design-system-global-styles/dist/styles/scss/1-variables/global.variables' as globalVariables;
@use 'pkg:@ongov/ontario-design-system-global-styles/dist/styles/scss/1-variables/spacing.variables' as spacing;
@use 'pkg:@ongov/ontario-design-system-global-styles/dist/styles/scss/1-variables/colours.variables' as colours;

.ontario-button {
	background-color: colours.$ontario-colour-primary;
	padding: spacing.$spacing-4 spacing.$spacing-6;
	// Use px-to-rem for scalability
	font-size: px-to-rem(16); // Pass unitless numbers
}
```

**Check proxy layer first**: Design tokens are exposed via global styles layer 1.

### BEM Methodology

```scss
.ontario-button {
} // Block
.ontario-button__icon {
} // Element
.ontario-button--primary {
} // Modifier
.ontario-button__icon--large {
} // Element modifier
```

### Slotted Content

Slotted content renders outside Shadow DOM. Use global stylesheets:

**Location**: `src/styles/slotted-styles/`

```scss
// src/styles/slotted-styles/callouts-asides.scss
ontario-callout {
	::slotted(p) {
		margin-bottom: 1rem;
	}
}
```

Build script compiles into `theme.scss` distribution.

## Internationalisation

**Location**: Component directories contain `*.i18n.json` files

```json
{
	"en": {
		"required": "required",
		"optional": "optional"
	},
	"fr": {
		"required": "obligatoire",
		"optional": "optionnel"
	}
}
```

**Global translations**: `src/translations/global.i18n.json`

Access via `@State() translations` and utility functions. Check existing components for patterns.

## Testing

### Unit Tests (`.spec.tsx`)

Test component logic, HTML, props, events:

```typescript
import { newSpecPage } from '@stencil/core/testing';

describe('ontario-button', () => {
	it('should render with secondary variant by default', async () => {
		const page = await newSpecPage({
			components: [OntarioButton],
			html: `<ontario-button>Click me</ontario-button>`,
		});

		expect(page.root).toHaveClass('ontario-button--secondary');
	});
});
```

**Pattern**: AAA (Arrange, Act, Assert)

### E2E Tests (`.e2e.ts`)

Test user interactions with Playwright:

```typescript
import { test, expect } from '@playwright/test';

test('should emit event on click', async ({ page }) => {
	await page.setContent('<ontario-button>Click</ontario-button>');

	const button = page.locator('ontario-button');
	const eventFired = await page.evaluate(() => {
		return new Promise((resolve) => {
			document.querySelector('ontario-button').addEventListener('buttonClick', () => resolve(true));
			setTimeout(() => resolve(false), 1000);
		});
	});

	await button.click();
	expect(eventFired).toBe(true);
});
```

### Accessibility Tests

```typescript
import AxeBuilder from '@axe-core/playwright';

test('should not have accessibility violations', async ({ page }) => {
	await page.setContent('<ontario-button>Click me</ontario-button>');
	const results = await new AxeBuilder({ page }).analyze();
	expect(results.violations).toEqual([]);
});
```

## Build & Distribution

### Build Process

```bash
pnpm run build
```

**Outputs** (from `stencil.config.ts`):

1. `dist/` - Standard distribution (CJS/ESM)
2. `dist-custom-elements/` - Custom elements bundle
3. `dist-hydrate-script/` - SSR hydration support
4. `www/` - Development server output
5. Framework wrappers generated:
   - `../ontario-design-system-component-library-react/src/components/`
   - `../ontario-design-system-component-library-angular/src/directives/`

### Development Server

```bash
pnpm run start  # http://localhost:3333
```

**What it serves**: `src/index.html` - Acts as:

- Testing ground for component development
- Demo gallery with multiple examples
- Real-time preview of property options
- Browsable showcase of all components

## Framework Integration

Components automatically generate wrappers for:

**React**: `reactOutputTarget` in `stencil.config.ts`

- Generated to `../ontario-design-system-component-library-react/`
- Proper TypeScript types and event handling

**Angular**: `angularOutputTarget` in `stencil.config.ts`

- Generated to `../ontario-design-system-component-library-angular/`
- Includes value accessor configs for form components

See respective package AGENTS.md files for framework-specific details.

## Common Tasks

### Adding a Form Component with Value Accessor

1. Create component with Stencil generator
2. Implement form value logic (props, events)
3. Add to `stencil.config.ts` → `angularOutputTarget.valueAccessorConfigs`:

```typescript
valueAccessorConfigs: [
	{
		elementSelectors: ['ontario-input[type="text"]'],
		event: 'inputChange', // Must match @Event() name
		targetAttr: 'value', // Property that holds the value
		type: 'text',
	},
];
```

4. Rebuild libraries
5. Test in Angular app with reactive/template-driven forms

### Modifying Styles

1. Check if change belongs in global styles (`ontario-design-system-global-styles`)
2. Or in component-specific SCSS
3. Use design tokens from global styles proxy layer
4. Follow BEM naming
5. Ensure accessibility (focus states, colour contrast)
6. Test across all demo apps

## Troubleshooting

### Framework Wrappers Not Updating

Wrappers regenerate on build, but still need to be built:

```bash
cd packages/ontario-design-system-component-library
pnpm run build  # Generates wrappers

cd ../ontario-design-system-component-library-react
pnpm run build  # Builds React distribution

cd ../ontario-design-system-component-library-angular
pnpm run build  # Builds Angular distribution
```

### Shadow DOM Style Issues

Global styles don't penetrate Shadow DOM. Options:

1. Add styles to component `.scss` file
2. Use slotted styles in `src/styles/slotted-styles/`
3. Use CSS custom properties for theming

## Additional Resources

- Component READMEs: Each component directory has auto-generated API documentation
- [Stencil Component API](https://stenciljs.com/docs/component)
- [Stencil Testing](https://stenciljs.com/docs/testing-overview)
- [Ontario Design System](https://designsystem.ontario.ca/)
