# Global Styles - AI Agent Instructions

**Package**: `@ongov/ontario-design-system-global-styles`

This package contains **shared base styles** including global styles, fonts, assets, and the organized proxy layer for design tokens. See [root AGENTS.md](../../AGENTS.md) for universal guidelines.

## Quick Reference

```bash
# Build styles
pnpm run build

# Clean build artefacts
pnpm run clean
```

## Structure

```
ontario-design-system-global-styles/
├── src/
│   ├── styles/
│   │   └── scss/
│   │       ├── 1-variables/      # Layer 1: Token proxies
│   │       │   ├── global.variables.scss
│   │       │   ├── colours.variables.scss
│   │       │   ├── spacing.variables.scss
│   │       │   └── typography.variables.scss
│   │       ├── 2-tools/          # Mixins & functions
│   │       ├── 3-generic/        # Reset, normalize
│   │       ├── 4-base/           # Base element styles
│   │       └── theme.scss        # Complete theme import
│   ├── fonts/
│   └── assets/
└── dist/
```

## Layer 1: Design Token Proxy

Layer 1 variables **proxy design tokens** with better organization:

```scss
// 1-variables/colours.variables.scss
@use 'pkg:@ongov/ontario-design-system-design-tokens/dist/scss/variables' as tokens;

// Primary palette
$ontario-colour-primary: tokens.$ontario-colour-primary;
$ontario-colour-secondary: tokens.$ontario-colour-secondary;

// Greyscale
$ontario-greyscale-0: tokens.$ontario-greyscale-0;
$ontario-greyscale-5: tokens.$ontario-greyscale-5;
// ...
```

**Why Layer 1?**

- Organized by category (colours, spacing, typography)
- Consistent namespace for consumers
- Can add computed values or additional organization
- Single source of truth for components

## Usage in Components

### Import Specific Partials

**✅ Correct Pattern**:

```scss
@use 'pkg:@ongov/ontario-design-system-global-styles/dist/styles/scss/1-variables/colours.variables' as colours;
@use 'pkg:@ongov/ontario-design-system-global-styles/dist/styles/scss/1-variables/spacing.variables' as spacing;

.ontario-button {
	background-color: colours.$ontario-colour-primary;
	padding: spacing.$spacing-4 spacing.$spacing-6;
}
```

### Don't Import Full Theme

**❌ Avoid**:

```scss
// Too heavy - imports everything
@import '@ongov/ontario-design-system-global-styles/dist/styles/scss/theme.scss';
```

Use specific partials instead for better performance and clarity.

## BEM Methodology

All global styles follow BEM (Block Element Modifier):

```scss
// Block
.ontario-header {
}

// Element
.ontario-header__logo {
}
.ontario-header__nav {
}

// Modifier
.ontario-header--compact {
}

// Element with modifier
.ontario-header__logo--small {
}
```

**Rules**:

- Block names: kebab-case
- Elements: `block__element`
- Modifiers: `block--modifier`
- Keep nesting shallow (max 3 levels)
- Never nest more than one `&` deep in modifiers

## Mixins & Functions

### px-to-rem

Convert pixels to rem for accessibility:

```scss
@use 'sass:math';

/// Converts pixels to rem units
/// @param {Number} $px - Pixel value (unitless number)
/// @return {Number} - Rem value
@function px-to-rem($px) {
	@return math.div($px, 16) * 1rem;
}

// Usage
.ontario-component {
	padding: px-to-rem(12) px-to-rem(24); // Pass unitless numbers
	font-size: px-to-rem(16);
}
```

**Important**: Pass unitless numbers, not `12px`.

### Responsive Mixins

```scss
// Mixin for media queries
@mixin respond-to($breakpoint) {
	@if $breakpoint == 'small' {
		@media (min-width: 40em) {
			@content;
		}
	}
	@if $breakpoint == 'medium' {
		@media (min-width: 60em) {
			@content;
		}
	}
	@if $breakpoint == 'large' {
		@media (min-width: 80em) {
			@content;
		}
	}
}

// Usage
.ontario-component {
	width: 100%;

	@include respond-to('medium') {
		width: 50%;
	}
}
```

## Fonts & Assets

### Fonts

**Location**: `src/fonts/`

Fonts are included and served with the package. Import in consuming apps:

```scss
@import '@ongov/ontario-design-system-global-styles/dist/fonts/fonts.css';
```

### Assets

**Location**: `src/assets/`

Includes logos, icons, and other static assets. Copy to public directory in consuming apps or reference from node_modules.

## Adding New Styles

### Adding Variables

1. **Add to appropriate Layer 1 file**:

```scss
// 1-variables/colours.variables.scss
$ontario-colour-custom: #ff5733;
```

2. **Rebuild package**:

```bash
pnpm run build
```

3. **Use in components**:

```scss
@use 'pkg:@ongov/ontario-design-system-global-styles/dist/styles/scss/1-variables/colours.variables' as colours;

.ontario-custom {
	color: colours.$ontario-colour-custom;
}
```

### Adding Mixins

1. **Add to Layer 2 (tools)**:

```scss
// 2-tools/custom-mixin.scss
@mixin custom-shadow {
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
```

2. **Export from tools index**
3. **Document with SASS docs**:

```scss
/// Applies a custom shadow effect
/// @group shadows
@mixin custom-shadow {
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
```

## Base Styles

Layer 4 contains base element styles applied globally:

```scss
// 4-base/typography.scss
body {
	font-family: $ontario-font-family-base;
	font-size: px-to-rem(16);
	line-height: 1.6;
	color: $ontario-colour-text;
}

h1,
h2,
h3,
h4,
h5,
h6 {
	font-family: $ontario-font-family-heading;
	margin-top: 0;
}
```

## Build Process

```bash
pnpm run build
```

**Outputs**:

- `dist/styles/scss/` - SCSS partials
- `dist/styles/css/` - Compiled CSS
- `dist/fonts/` - Web fonts
- `dist/assets/` - Static assets

## Dependencies

**Runtime Dependencies**:

- `@ongov/ontario-design-system-design-tokens` - Design tokens

**Build Dependencies**:

- SASS compiler
- Build scripts

## Build Order

Global styles come **second** in build order:

1. Design Tokens (no dependencies)
2. ✅ Global Styles (depends on tokens)
3. Component Library (depends on global styles)
4. Framework wrappers

## Common Patterns

### Component-Specific Shared Styles

Some styles are component-specific but shared across multiple instances. Keep them in component library, not here:

**Location**: `packages/ontario-design-system-component-library/src/styles/`

**Reason**: Better encapsulation, doesn't bloat global styles.

### Slotted Styles

Slotted content styles that need to pierce Shadow DOM:

**Location**: `packages/ontario-design-system-component-library/src/styles/slotted-styles/`

See [Component Library AGENTS.md](../ontario-design-system-component-library/AGENTS.md#slotted-content) for details.

## Troubleshooting

### Styles Not Applying

1. Check import path is correct
2. Ensure package was rebuilt after changes
3. Clear component library cache
4. Verify variable names match exactly (SCSS is case-sensitive)

### Variable Not Found

Check Layer 1 structure:

- Colours: `1-variables/colours.variables.scss`
- Spacing: `1-variables/spacing.variables.scss`
- Typography: `1-variables/typography.variables.scss`
- Global: `1-variables/global.variables.scss`

### Build Errors

Common issues:

- Missing `@use` or `@import`
- Circular dependencies
- Invalid SCSS syntax
- Token dependency not built

## Best Practices

1. **Use Layer 1 variables**: Don't import tokens directly
2. **Import specific partials**: Avoid `theme.scss` in components
3. **Follow BEM**: All class names must use BEM methodology
4. **Prefer rem over px**: Use `px-to-rem()` function
5. **Document mixins**: Use SASS doc comments
6. **Keep nesting shallow**: Max 3 levels deep
7. **Mobile-first**: Write base styles for mobile, use media queries for larger screens

## Additional Resources

- [Design Tokens AGENTS.md](../ontario-design-system-design-tokens/AGENTS.md)
- [Component Library AGENTS.md](../ontario-design-system-component-library/AGENTS.md)
- [BEM Methodology](http://getbem.com/introduction/)
- [Ontario Design System](https://designsystem.ontario.ca/)
