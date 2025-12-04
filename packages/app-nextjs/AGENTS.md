# Next.js Integration App - AI Agent Instructions

**Package**: `app-nextjs`

This is the **Next.js integration testing application** with three primary purposes: testing React components with SSR support, running visual regression tests (VRT), and ensuring components work in a Next.js environment. See [root AGENTS.md](../../AGENTS.md) for universal guidelines.

## Quick Reference

```bash
# Development
pnpm run dev          # Start Next.js dev server
pnpm run build        # Production build
pnpm run start        # Start production server

# Testing
pnpm run test         # Run tests
pnpm run test:e2e     # Run E2E tests
pnpm run test:vrt     # Run visual regression tests
```

## Three Key Purposes

### 1. SSR (Server-Side Rendering) Testing

Verify React components work correctly with Next.js SSR:

- Components render on server
- Hydration works properly
- No server/client mismatch errors
- Client-side interactions work after hydration

### 2. Visual Regression Testing (VRT)

Run visual regression tests to catch styling/layout changes:

- Screenshot comparison against baselines
- Detect unintended visual changes
- Test all component variants and states
- Responsive design verification

### 3. Integration Testing

General Next.js integration:

- Routing with components
- Data fetching patterns
- API routes integration
- Static generation (SSG) compatibility

## Structure

```
app-nextjs/
├── pages/
│   ├── components/     # Component showcase pages
│   ├── examples/       # Usage examples
│   └── _app.tsx        # Next.js app wrapper
├── tests/
│   ├── visual/         # Visual regression tests
│   └── e2e/            # E2E tests
└── package.json
```

## SSR Testing

### Basic SSR Component

```typescript
// pages/components/button.tsx
import { OntarioButton } from '@ongov/ontario-design-system-component-library-react';

export default function ButtonPage() {
  return (
    <div>
      <h1>Button Component</h1>
      <OntarioButton variant="primary">
        Server-Rendered Button
      </OntarioButton>
    </div>
  );
}
```

### Client-Side Only Components

If a component requires client-side features:

```typescript
import dynamic from 'next/dynamic';

// Disable SSR for specific component
const OntarioInteractiveComponent = dynamic(
  () => import('@ongov/ontario-design-system-component-library-react').then(
    mod => mod.OntarioInteractiveComponent
  ),
  { ssr: false }
);

export default function Page() {
  return <OntarioInteractiveComponent />;
}
```

### Hydration Testing

Test that components hydrate correctly:

```typescript
// pages/hydration-test.tsx
import { useState, useEffect } from 'react';
import { OntarioButton } from '@ongov/ontario-design-system-component-library-react';

export default function HydrationTest() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div>
      <p>Hydrated: {mounted ? 'Yes' : 'No'}</p>
      <OntarioButton
        variant="primary"
        onButtonClick={() => console.log('Client-side event fired')}
      >
        Test Hydration
      </OntarioButton>
    </div>
  );
}
```

## Visual Regression Testing (VRT)

### Test Structure

```typescript
// tests/visual/button.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Ontario Button Visual Tests', () => {
	test('primary button default state', async ({ page }) => {
		await page.goto('/components/button');

		const button = page.locator('.ontario-button--primary').first();

		// Take screenshot and compare to baseline
		await expect(button).toHaveScreenshot('button-primary-default.png');
	});

	test('primary button hover state', async ({ page }) => {
		await page.goto('/components/button');

		const button = page.locator('.ontario-button--primary').first();
		await button.hover();

		await expect(button).toHaveScreenshot('button-primary-hover.png');
	});

	test('primary button focus state', async ({ page }) => {
		await page.goto('/components/button');

		const button = page.locator('.ontario-button--primary').first();
		await button.focus();

		await expect(button).toHaveScreenshot('button-primary-focus.png');
	});
});
```

### Testing All Variants

```typescript
test.describe('Button Variants', () => {
	const variants = ['primary', 'secondary', 'tertiary'];

	for (const variant of variants) {
		test(`${variant} variant screenshot`, async ({ page }) => {
			await page.goto('/components/button');

			const button = page.locator(`[data-variant="${variant}"]`);
			await expect(button).toHaveScreenshot(`button-${variant}.png`);
		});
	}
});
```

### Responsive Testing

```typescript
test.describe('Button Responsive', () => {
	const viewports = [
		{ name: 'mobile', width: 375, height: 667 },
		{ name: 'tablet', width: 768, height: 1024 },
		{ name: 'desktop', width: 1920, height: 1080 },
	];

	for (const viewport of viewports) {
		test(`button on ${viewport.name}`, async ({ page }) => {
			await page.setViewportSize(viewport);
			await page.goto('/components/button');

			await expect(page).toHaveScreenshot(`button-${viewport.name}.png`);
		});
	}
});
```

### Updating Visual Baselines

When component styles change intentionally:

```bash
# Update all baseline screenshots
pnpm run test:vrt -- --update-snapshots

# Or just specific tests
pnpm run test:vrt -- button.spec.ts --update-snapshots
```

## E2E Testing

### SSR-Specific E2E Tests

```typescript
// tests/e2e/ssr.spec.ts
import { test, expect } from '@playwright/test';

test('component renders on server', async ({ page }) => {
	// Disable JavaScript to test SSR
	await page.context().route('**/*.js', (route) => route.abort());

	await page.goto('/components/button');

	// Component should still be visible (server-rendered)
	const button = page.locator('ontario-button');
	await expect(button).toBeVisible();
});

test('hydration works correctly', async ({ page }) => {
	await page.goto('/components/button');

	// Wait for hydration
	await page.waitForLoadState('networkidle');

	// Test client-side interaction
	const button = page.locator('ontario-button');
	await button.click();

	// Verify event handler fired (client-side)
	// ... assertions
});
```

### Component Interaction Tests

```typescript
test('form submission in Next.js', async ({ page }) => {
	await page.goto('/examples/form');

	await page.locator('ontario-input[type="email"]').fill('test@example.com');
	await page.locator('ontario-input[type="text"]').fill('John Doe');
	await page.locator('ontario-button[type="submit"]').click();

	// Verify form submitted
	await expect(page.locator('.success-message')).toBeVisible();
});
```

## Component Showcase Pages

Create pages for each component with all variants:

```typescript
// pages/components/button.tsx
import { OntarioButton } from '@ongov/ontario-design-system-component-library-react';

export default function ButtonShowcase() {
  return (
    <div className="showcase">
      <h1>Button Component</h1>

      <section>
        <h2>Variants</h2>
        <div className="example-grid">
          <div data-variant="primary">
            <h3>Primary</h3>
            <OntarioButton variant="primary">
              Primary Button
            </OntarioButton>
          </div>

          <div data-variant="secondary">
            <h3>Secondary</h3>
            <OntarioButton variant="secondary">
              Secondary Button
            </OntarioButton>
          </div>

          <div data-variant="tertiary">
            <h3>Tertiary</h3>
            <OntarioButton variant="tertiary">
              Tertiary Button
            </OntarioButton>
          </div>
        </div>
      </section>

      <section>
        <h2>States</h2>
        <div className="example-grid">
          <div>
            <h3>Default</h3>
            <OntarioButton variant="primary">
              Default State
            </OntarioButton>
          </div>

          <div>
            <h3>Hover</h3>
            <OntarioButton variant="primary" className="force-hover">
              Hover State
            </OntarioButton>
          </div>

          <div>
            <h3>Focus</h3>
            <OntarioButton variant="primary" className="force-focus">
              Focus State
            </OntarioButton>
          </div>
        </div>
      </section>
    </div>
  );
}
```

## Running Tests

### Visual Regression Tests

```bash
# Run VRT
pnpm run test:vrt

# Run specific test file
pnpm run test:vrt -- button.spec.ts

# Update baselines after intentional visual changes
pnpm run test:vrt -- --update-snapshots

# Run in headed mode (see browser)
pnpm run test:vrt -- --headed
```

### E2E Tests

```bash
# Run all E2E tests
pnpm run test:e2e

# Run specific test
pnpm run test:e2e -- ssr.spec.ts

# Debug mode
pnpm run test:e2e -- --debug
```

## Common Issues

### Hydration Mismatch

If you see hydration errors:

1. **Check for client-only code in render**:

```typescript
// ❌ BAD - runs on server
const [value, setValue] = useState(window.location.href);

// ✅ GOOD - only runs on client
const [value, setValue] = useState('');
useEffect(() => {
	setValue(window.location.href);
}, []);
```

2. **Use dynamic imports** for client-only components
3. **Verify component props** are serializable

### Visual Test Failures

When VRT fails:

1. **Review diff** in test output
2. **Check if change was intentional**:
   - If yes: Update baselines with `--update-snapshots`
   - If no: Fix the styling issue
3. **Verify across viewports** (mobile, tablet, desktop)

### SSR Errors

Common SSR issues:

1. **Using browser APIs**: Wrap in `useEffect` or use `typeof window !== 'undefined'`
2. **Missing styles**: Ensure CSS is imported in `_app.tsx`
3. **Component not defined**: Check dynamic imports

## Development Workflow

### After Component Changes

```bash
# Rebuild component library + React library
cd packages/ontario-design-system-component-library
pnpm run build

cd ../ontario-design-system-component-library-react
pnpm run build

# Restart Next.js dev server
cd ../app-nextjs
pnpm run dev
```

### Adding New Component Tests

1. Create showcase page in `pages/components/`
2. Add VRT tests in `tests/visual/`
3. Add E2E tests in `tests/e2e/`
4. Run tests and generate baselines
5. Verify in different viewports

## Best Practices

1. **Test SSR First**: Ensure components work server-side
2. **Comprehensive VRT**: Test all variants, states, and viewports
3. **Name Screenshots Well**: Use descriptive names like `button-primary-hover-mobile.png`
4. **Organize Test Files**: One file per component or feature
5. **Update Baselines Carefully**: Review diffs before updating
6. **Document Quirks**: Note any Next.js-specific issues

## Dependencies

**Key Dependencies**:

- `@ongov/ontario-design-system-component-library-react`
- Next.js
- React
- Playwright (for testing)

## Additional Resources

- [React Library AGENTS.md](../ontario-design-system-component-library-react/AGENTS.md)
- [Component Library AGENTS.md](../ontario-design-system-component-library/AGENTS.md)
- [Next.js SSR Documentation](https://nextjs.org/docs/basic-features/pages#server-side-rendering)
- [Playwright Visual Comparisons](https://playwright.dev/docs/test-snapshots)
- [Next.js Dynamic Import](https://nextjs.org/docs/advanced-features/dynamic-import)
