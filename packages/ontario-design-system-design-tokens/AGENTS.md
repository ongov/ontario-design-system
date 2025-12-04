# Design Tokens - AI Agent Instructions

**Package**: `@ongov/ontario-design-system-design-tokens`

This package contains the **design tokens** (colours, spacing, typography, etc.) that form the foundation of the Ontario Design System. Tokens are defined in JavaScript and compiled to SCSS variables. See [root AGENTS.md](../../AGENTS.md) for universal guidelines.

## Quick Reference

```bash
# Build tokens (JS → SCSS)
pnpm run build

# Clean build artefacts
pnpm run clean
```

## Structure

```
ontario-design-system-design-tokens/
├── tokens/
│   ├── colour/
│   │   ├── base.js
│   │   └── ...
│   ├── spacing/
│   │   └── spacing.js
│   ├── typography/
│   │   └── typography.js
│   └── ...
├── dist/
│   └── scss/
│       └── _variables.scss
└── package.json
```

## Token Definition

Tokens are defined as JavaScript objects:

```javascript
// tokens/colour/base.js
module.exports = {
	'ontario-greyscale-0': { value: '#FFFFFF' },
	'ontario-greyscale-5': { value: '#F2F2F2' },
	'ontario-greyscale-10': { value: '#E6E6E6' },
	'ontario-colour-primary': { value: '#0066CC' },
	'ontario-colour-secondary': { value: '#1A1A1A' },
	// ...
};
```

```javascript
// tokens/spacing/spacing.js
module.exports = {
	'ontario-spacing-0': { value: '0' },
	'ontario-spacing-1': { value: '0.25rem' },
	'ontario-spacing-2': { value: '0.5rem' },
	'ontario-spacing-3': { value: '0.75rem' },
	'ontario-spacing-4': { value: '1rem' },
	// ...
};
```

## Build Process

The build process compiles JavaScript tokens to SCSS variables:

```bash
pnpm run build
```

**Output**: `dist/scss/_variables.scss`

```scss
// Generated SCSS
$ontario-greyscale-0: #ffffff;
$ontario-greyscale-5: #f2f2f2;
$ontario-colour-primary: #0066cc;
$ontario-spacing-4: 1rem;
// ...
```

## Usage

### In Global Styles Package

Design tokens are **consumed by the global styles package**, which proxies them through layer 1 variables:

```scss
// In ontario-design-system-global-styles
@import '@ongov/ontario-design-system-design-tokens/dist/scss/variables';

// Layer 1 re-exports with additional organization
$ontario-colour-primary: $ontario-colour-primary;
```

### In Component Library (via Global Styles)

**Do not import tokens directly**. Access them through global styles:

```scss
// ✅ CORRECT - Import from global styles (layer 1)
@use 'pkg:@ongov/ontario-design-system-global-styles/dist/styles/scss/1-variables/colours.variables' as colours;

.ontario-button {
	background-color: colours.$ontario-colour-primary;
}
```

```scss
// ❌ INCORRECT - Don't import tokens directly
@import '@ongov/ontario-design-system-design-tokens/dist/scss/variables';
```

**Why**: Global styles provide an organized proxy layer with better structure and naming.

### In JavaScript (Rare)

Direct JavaScript usage is rare but possible:

```typescript
import tokens from '@ongov/ontario-design-system-design-tokens/tokens/colour/base';

const primaryColour = tokens['ontario-colour-primary'].value;
```

## Adding New Tokens

1. **Create or edit token file** in `tokens/` directory:

```javascript
// tokens/colour/brand.js
module.exports = {
	'ontario-colour-brand-blue': { value: '#0066CC' },
	'ontario-colour-brand-teal': { value: '#008B8B' },
};
```

2. **Build tokens**:

```bash
pnpm run build
```

3. **Rebuild consuming packages**:

```bash
# Rebuild global styles (proxies tokens)
cd ../ontario-design-system-global-styles
pnpm run build

# Rebuild component library (uses global styles)
cd ../ontario-design-system-component-library
pnpm run build
```

4. **Verify in components**:

```scss
@use 'pkg:@ongov/ontario-design-system-global-styles/dist/styles/scss/1-variables/colours.variables' as colours;

.ontario-component {
	color: colours.$ontario-colour-brand-blue;
}
```

## Modifying Existing Tokens

1. **Edit token value** in appropriate file
2. **Rebuild tokens**
3. **Rebuild consuming packages**
4. **Test visually** in demo apps to ensure no regressions

**Warning**: Changing tokens affects the entire design system. Test thoroughly.

## Token Categories

### Colours

- **Location**: `tokens/colour/`
- **Types**: Base colours, greyscale, semantic colours (primary, secondary, error, warning, success)

### Spacing

- **Location**: `tokens/spacing/`
- **Values**: Incremental spacing scale (0, 1, 2, 4, 8, 12, 16, 24, 32, 48, 64px converted to rem)

### Typography

- **Location**: `tokens/typography/`
- **Properties**: Font families, font sizes, line heights, font weights

### Breakpoints

- **Location**: `tokens/breakpoints/`
- **Values**: Responsive breakpoints (small, medium, large, extra-large)

## Best Practices

1. **Use semantic names**: `ontario-colour-primary` not `ontario-colour-blue`
2. **Follow naming convention**: `ontario-[category]-[name]`
3. **Use rem for spacing**: Ensures scalability
4. **Document purpose**: Add comments for non-obvious tokens
5. **Test thoroughly**: Token changes affect entire system

## Dependencies

This package has **no runtime dependencies** - it's pure token definitions and build scripts.

## Build Order

Design tokens are **first in the build order**:

1. ✅ Design Tokens (no dependencies)
2. Global Styles (depends on tokens)
3. Component Library (depends on global styles)
4. Framework wrappers (depend on component library)

## Troubleshooting

### Tokens Not Updating

1. Rebuild tokens: `pnpm run build`
2. Rebuild global styles: `cd ../ontario-design-system-global-styles && pnpm run build`
3. Rebuild component library: `cd ../ontario-design-system-component-library && pnpm run build`
4. Clear browser cache

### Build Errors

Check for:

- Valid JavaScript syntax in token files
- Proper module exports
- No circular dependencies

## Additional Resources

- [Global Styles AGENTS.md](../ontario-design-system-global-styles/AGENTS.md)
- [Component Library AGENTS.md](../ontario-design-system-component-library/AGENTS.md)
- [Ontario Design System](https://designsystem.ontario.ca/)
