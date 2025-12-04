# Complete Styles - AI Agent Instructions

**Package**: `@ongov/ontario-design-system-complete-styles`

This package is a **synthetic package** that combines global styles, component styles, and assets into one comprehensive package. It's built via Gulp script and primarily maintained for backwards compatibility. See [root AGENTS.md](../../AGENTS.md) for universal guidelines.

## Quick Reference

```bash
# Build complete styles package
pnpm run build

# Clean build artefacts
pnpm run clean
```

**⚠️ Recommendation**: New projects should use the **modular packages** instead:

- `@ongov/ontario-design-system-design-tokens`
- `@ongov/ontario-design-system-global-styles`
- `@ongov/ontario-design-system-component-library`

## What It Does

The Complete Styles package **recomposes** multiple packages into a single bundle:

**Includes**:

- Global styles from `ontario-design-system-global-styles`
- Component-specific styles from `ontario-design-system-component-library`
- All fonts and assets
- Combined SCSS and compiled CSS

**Use Case**: Legacy projects that need everything in one package.

## Build Process

### Gulp Script

Build is orchestrated by a Gulp script:

**Location**: `gulpfile.js`

**Process**:

1. Copy global styles
2. Extract component styles from component library
3. Combine fonts and assets
4. Compile SCSS to CSS
5. Bundle everything into `dist/`
6. **Clean up intermediate artefacts** (deleted by default)

### Intermediate Artefacts

By default, intermediate build artefacts are **deleted at build completion**.

**Cleanup Location**: `gulpfile.js` (around line 183, may shift with edits)

### Debugging Build Issues

If you need to inspect intermediate artefacts:

1. **Open** `gulpfile.js`
2. **Find** the cleanup task (search for "clean" or look around line 183)
3. **Temporarily disable** the cleanup step:

```javascript
// Comment out or remove the cleanup task
// gulp.task('clean-intermediate', () => {
//   return del(['./intermediate/**']);
// });
```

4. **Run build**:

```bash
pnpm run build
```

5. **Inspect** intermediate files in build directory
6. **Re-enable cleanup** before committing changes

## Usage

### Installation

```bash
npm install @ongov/ontario-design-system-complete-styles
```

### Import Styles

```scss
// Import everything (heavy)
@import '@ongov/ontario-design-system-complete-styles/dist/styles/ontario-design-system.css';
```

```html
<!-- Or in HTML -->
<link
	rel="stylesheet"
	href="node_modules/@ongov/ontario-design-system-complete-styles/dist/styles/ontario-design-system.css"
/>
```

### Fonts

```html
<link rel="stylesheet" href="node_modules/@ongov/ontario-design-system-complete-styles/dist/fonts/fonts.css" />
```

## Structure

```
ontario-design-system-complete-styles/
├── gulpfile.js              # Build orchestration
├── dist/
│   ├── styles/
│   │   ├── ontario-design-system.css     # Complete compiled CSS
│   │   └── scss/                         # Complete SCSS bundle
│   ├── fonts/
│   └── assets/
└── package.json
```

## Build Dependencies

This package depends on:

- `@ongov/ontario-design-system-global-styles`
- `@ongov/ontario-design-system-component-library`
- Gulp and related build tools

## Build Order

Complete styles is built **last** (if at all):

1. Design Tokens
2. Global Styles
3. Component Library
4. ✅ Complete Styles (synthesizes all above)

## Modifying Complete Styles

### Don't Edit Directly

This package **doesn't contain source files** - it's synthesized from other packages.

**To make changes**:

1. Edit source in `ontario-design-system-global-styles` or `ontario-design-system-component-library`
2. Rebuild those packages
3. Rebuild this package to pick up changes

### Adding Components

New component styles are automatically included:

1. Add component to `ontario-design-system-component-library`
2. Rebuild component library
3. Rebuild complete styles → new component styles included

## Migration from Complete Styles

**For new projects**, use modular packages instead:

### Before (Complete Styles)

```scss
@import '@ongov/ontario-design-system-complete-styles/dist/styles/ontario-design-system.css';
```

### After (Modular)

```scss
// Only import what you need
@use '@ongov/ontario-design-system-global-styles/dist/styles/scss/theme.scss';

// Use web components
import { OntarioButton } from '@ongov/ontario-design-system-component-library-react';
```

**Benefits**:

- Smaller bundle size (tree-shakeable)
- Better performance
- Modern build tooling
- Component-level imports

## Troubleshooting

### Build Fails

1. **Check dependencies built**:

```bash
cd ../ontario-design-system-global-styles && pnpm run build
cd ../ontario-design-system-component-library && pnpm run build
```

2. **Clean and rebuild**:

```bash
pnpm run clean
pnpm run build
```

3. **Check Gulp tasks** for errors in `gulpfile.js`

### Styles Not Updating

1. Rebuild source packages (global styles, component library)
2. Rebuild this package
3. Clear consuming app cache

### Missing Intermediate Files (Debugging)

If you disabled cleanup for debugging:

- Files appear in `./intermediate/` or similar location
- Remember to re-enable cleanup before committing
- Don't commit intermediate files

## Gulp Script Details

### Main Tasks

**Common Gulp tasks** (check `gulpfile.js` for complete list):

- `clean` - Remove dist folder
- `copy-global-styles` - Copy global styles
- `extract-component-styles` - Extract from component library
- `compile-scss` - Compile SCSS to CSS
- `copy-assets` - Copy fonts and assets
- `build` - Run all tasks
- `clean-intermediate` - Remove intermediate artefacts (around line 183)

### Task Execution

Tasks run in sequence, orchestrated by Gulp:

```javascript
gulp.task(
	'build',
	gulp.series(
		'clean',
		'copy-global-styles',
		'extract-component-styles',
		'compile-scss',
		'copy-assets',
		'clean-intermediate', // ⚠️ This deletes intermediate files
	),
);
```

## When to Use Complete Styles

**Use Complete Styles If**:

- Maintaining legacy project already using it
- Need quick all-in-one CSS file
- Not using build tools (direct `<link>` tag)

**Use Modular Packages If**:

- Starting new project
- Want tree-shaking/code-splitting
- Using modern build tools (Webpack, Vite, etc.)
- Need component-level imports
- Want smaller bundle sizes

## Additional Resources

- [Global Styles AGENTS.md](../ontario-design-system-global-styles/AGENTS.md)
- [Component Library AGENTS.md](../ontario-design-system-component-library/AGENTS.md)
- [Gulp Documentation](https://gulpjs.com/)
- [Ontario Design System](https://designsystem.ontario.ca/)
