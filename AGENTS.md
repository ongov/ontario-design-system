# Ontario Design System - AI Agent Instructions

This is the **root-level** documentation for AI coding agents. Package-specific instructions are located in each package's directory under `packages/*/AGENTS.md`.

## Project Overview

The Ontario Design System is a Stencil-based web component library that serves multiple frameworks (React, Angular, vanilla JS) through auto-generated wrappers. Built as a monorepo using pnpm workspaces and Lerna.

**Tech Stack**: Stencil, React, Angular, Next.js, TypeScript, SCSS, pnpm, Lerna

**Key Packages**:

- `ontario-design-system-component-library` - Core Stencil components
- `ontario-design-system-component-library-react` - React wrappers
- `ontario-design-system-component-library-angular` - Angular wrappers
- `ontario-design-system-design-tokens` - Design tokens (JS → SCSS)
- `ontario-design-system-global-styles` - Global SCSS, fonts, assets
- `ontario-design-system-complete-styles` - Legacy comprehensive package

**Applications** (Integration Testing):

- `app-react` - React integration tests
- `app-angular` - Angular integration tests
- `app-nextjs` - Next.js integration tests + SSR + VRT

## Quick Start

```bash
# Setup
pnpm install
pnpm run refresh  # Clean + install + build all libs

# Development
cd packages/ontario-design-system-component-library
pnpm run start    # Dev server at http://localhost:3333

# Testing
pnpm run test:unit   # All unit tests
pnpm run test:e2e    # All E2E tests
pnpm run test:all    # Both unit and E2E

# Building
pnpm run build-libs  # Build all @ongov packages
```

**System Requirements**:

- Node.js: v20.18.1 (see `.nvmrc`)
- pnpm: v10.2.0 (see `package.json`)

## Code Style Guidelines

### Coding style

- Review [.editorconfig](.editorconfig) to match the base coding style.
- The project uses Prettier to maintain consistent code formatting.

### TypeScript

- Use strict typing
- Prefer interfaces over types for object shapes
- Use enums for string constants
- Document public APIs with JSDoc comments (auto-generated into component README by Stencil)

### SCSS

- **BEM Methodology**: All class names follow BEM (Block Element Modifier)
  ```scss
  .ontario-button {
  } // Block
  .ontario-button__icon {
  } // Element
  .ontario-button--primary {
  } // Modifier
  ```
- **Prefer `rem` over `px`**: Use `px-to-rem(12)` for accessibility (respects user font-size)
- **Import from partials**: Use `@use 'pkg:@ongov/...'` with specific variable partials
- **Add SASS docs**: Document new mixins/functions

### Component Props

- Use sensible defaults based on [Ontario Design System guidance](https://designsystem.ontario.ca/)
- Avoid defaults that violate design patterns (e.g., button defaults to 'secondary', not 'primary')
- Document with JSDoc (parsed by Stencil)

### Event Naming

- Pattern: `component` + `eventName` (e.g., `buttonClick`, `inputChange`)
- No `on` prefix (frameworks add automatically)
- Mirror HTML events for ShadowDOM boundary crossings

## Git Workflow

### Branching

**Main Branches**: `master` (production), `develop` (integration), `alpha`, `beta`

**Branch Naming**: `[name]/[type]/[issue-number]-[description]`

**Types**: `feature`, `bugfix`, `hotfix`, `task`, `patch`

**Example**: `scott/feature/DS-456-angular-value-accessors`

### Pull Requests

1. Sync with appropriate base (`develop` for features, `master` for hotfixes, `alpha`/`beta` for pre-release)
2. Run `pnpm run test:all`
3. Open PR with clear description
4. Request reviews
5. Ensure CI/CD passes

### Rebasing

✅ **Safe**: Branches building after release commits  
❌ **Unsafe**: Release commits themselves (breaks semantic-release Git Notes)

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

[optional body]

[optional footer]
```

**Types**: `feat` (minor bump), `fix` (patch bump), `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`

**Breaking Changes**: Add `BREAKING CHANGE:` in footer (major bump)

**Rules**:

- Subject starts with lowercase
- Max 100 characters per line
- Present tense, imperative mood
- Reference Jira issues in footer

**Example**:

```
feat(ontario-button): add loading state prop

Added loading state to show spinner during async operations.

JIRA: DS-1234
```

## Testing Strategy (High-Level)

**4-Layer Approach** (Libraries ≠ Applications):

1. **Unit Tests** (Stencil library) - Component logic, HTML, props, events
2. **E2E Tests** (Stencil library) - User interactions, accessibility
3. **VRT** (Next.js app) - Visual consistency, styling regression
4. **Framework Integration** (All apps) - Framework bindings, SSR, forms

**Tool**: Playwright (fast, native integration, functional + visual)

**Pattern**: AAA (Arrange, Act, Assert)

See package-specific AGENTS.md files for detailed testing guidance.

## Accessibility Requirements

**WCAG 2.1 Level AA Compliance** - Non-negotiable

- Semantic HTML
- Proper ARIA labels and roles
- Keyboard navigation (Tab, Enter, Space)
- Focus management
- Colour contrast compliance

### Disabled Elements - DO NOT USE

**Never use `disabled` on buttons or form elements**. It violates [Ontario Design System guidance](https://designsystem.ontario.ca/components/detail/buttons.html#disabled-buttons).

**Why**: Creates barriers for assistive technology and users with physical/cognitive impairments.

**Instead**:

- Keep elements enabled
- Use error validation on submit
- Provide clear feedback messages

## Important Notes for AI Assistants

1. **Bilingual Support**: All user-facing strings need English and French translations (`.i18n.json` files)
2. **Shadow DOM**: Global styles don't penetrate Shadow DOM - use component SCSS or slotted styles
3. **Rebuild After Config Changes**: Changes to `stencil.config.ts` require full rebuild
4. **Test Across Frameworks**: Verify changes in React, Angular, and Next.js apps
5. **Follow Design System Guidance**: Visual design must match [official guidance](https://designsystem.ontario.ca/)
6. **Never Compromise WCAG**: Accessibility takes precedence over aesthetics
7. **Document Breaking Changes**: Update CHANGELOG.md with migration guide
8. **Conventional Commits**: Messages must pass `commitlint` validation
9. **Reference Jira Issues**: Include issue numbers in branches, commits, PRs
10. **BEM Methodology**: All SCSS class names must follow BEM
11. **Leverage Existing Utilities**: Check `src/utils` before creating duplicates
12. **State Naming**: Follow `propertyName` + `State` pattern (e.g., `variantState`)
13. **Component Decomposition**: Break into Item/Collection patterns where appropriate
14. **No Direct Token Usage**: Access design tokens through global styles proxy layer
15. **Versioning is Automatic**: semantic-release handles version bumps based on commits

## Canadian English Spelling

Documentation and code comments use Canadian English:

- colour (not color)
- centre (not center)
- licence (not license - noun)
- organise (not organize)
- behaviour (not behavior)
- favour (not favor)

Code identifiers follow web standards (e.g., `color` in CSS, `center` in alignment).

## Package-Specific Documentation

Each package has detailed instructions in its own AGENTS.md:

**Core Libraries**:

- [Component Library](./packages/ontario-design-system-component-library/AGENTS.md) - Stencil development, patterns, Shadow DOM
- [React Library](./packages/ontario-design-system-component-library-react/AGENTS.md) - React wrappers, SSR
- [Angular Library](./packages/ontario-design-system-component-library-angular/AGENTS.md) - Angular wrappers, forms, value accessors
- [Design Tokens](./packages/ontario-design-system-design-tokens/AGENTS.md) - Token structure, build
- [Global Styles](./packages/ontario-design-system-global-styles/AGENTS.md) - SCSS structure, BEM patterns
- [Complete Styles](./packages/ontario-design-system-complete-styles/AGENTS.md) - Legacy package, Gulp build

**Integration Apps**:

- [React App](./packages/app-react/AGENTS.md) - React integration testing
- [Next.js App](./packages/app-nextjs/AGENTS.md) - SSR testing, VRT
- [Angular App](./packages/app-angular/AGENTS.md) - Angular integration, forms testing

## Additional Resources

- [Stencil Documentation](https://stenciljs.com/docs/introduction)
- [Ontario Design System Guidance](https://designsystem.ontario.ca/)
- [Component Developer Docs](https://designsystem.ontario.ca/developer-docs/)
- Internal documentation: `documentation/internal-documentation/`
- Component READMEs: Each component directory contains usage examples and API docs
- [Commit Guidelines](./COMMIT-GUIDELINES.md) - Detailed commit message guide

## Troubleshooting

### Build Failures

```bash
pnpm run refresh  # Quick fix: clean + install + rebuild
```

For persistent issues:

```bash
pnpm run clean        # Remove build artefacts
pnpm run clean:full   # Remove artefacts + package node_modules
pnpm install          # Reinstall dependencies
pnpm run build-libs   # Rebuild libraries
```

**Note**: `clean:full` doesn't remove root `node_modules`. If needed: `rm -rf node_modules`

### Component Not Updating

1. Rebuild component library: `cd packages/ontario-design-system-component-library && pnpm run build`
2. Build framework wrappers: `cd packages/ontario-design-system-component-library-react && pnpm run build`
3. Restart demo app dev server

### More Help

Check package-specific AGENTS.md files for detailed troubleshooting.
