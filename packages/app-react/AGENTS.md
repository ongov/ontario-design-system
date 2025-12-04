# React Integration App - AI Agent Instructions

**Package**: `app-react`

This is a **React integration testing application** for the Ontario Design System React component library. It's used to test components in a React environment and ensure proper integration. See [root AGENTS.md](../../AGENTS.md) for universal guidelines.

## Quick Reference

```bash
# Development
pnpm run start       # Start dev server
pnpm run build       # Production build
pnpm run test        # Run tests (if configured)
pnpm run test:e2e    # Run E2E tests (if configured)
```

## Purpose

This app serves to:

1. **Integration Testing**: Verify React components work correctly in React environment
2. **Development Testing**: Manual testing of component behaviour
3. **Examples**: Demonstrate component usage patterns
4. **Regression Testing**: Catch framework-specific issues before release

## Structure

```
app-react/
├── src/
│   ├── components/     # Test components/pages
│   ├── examples/       # Component usage examples
│   └── App.tsx         # Main application
├── public/
├── tests/              # E2E and integration tests
└── package.json
```

## Development Workflow

### Running the App

```bash
cd packages/app-react
pnpm run start
```

**Default URL**: `http://localhost:3000` (or configured port)

### Testing Components

1. **Import component** from React library:

```typescript
import { OntarioButton, OntarioInput } from '@ongov/ontario-design-system-component-library-react';
```

2. **Create test page** in `src/examples/`:

```typescript
// src/examples/ButtonExamples.tsx
export function ButtonExamples() {
  return (
    <div>
      <h2>Button Examples</h2>

      <h3>Primary Button</h3>
      <OntarioButton variant="primary">
        Primary Action
      </OntarioButton>

      <h3>Secondary Button</h3>
      <OntarioButton variant="secondary">
        Secondary Action
      </OntarioButton>

      <h3>With Event Handler</h3>
      <OntarioButton
        variant="primary"
        onButtonClick={() => alert('Clicked!')}
      >
        Click Me
      </OntarioButton>
    </div>
  );
}
```

3. **Add to app routing** (if using React Router)

### Testing Patterns

#### State Integration

```typescript
import { useState } from 'react';
import { OntarioInput } from '@ongov/ontario-design-system-component-library-react';

export function FormExample() {
  const [value, setValue] = useState('');

  return (
    <div>
      <OntarioInput
        label="Email"
        type="email"
        value={value}
        onInputChange={(e) => setValue(e.detail)}
      />
      <p>Current value: {value}</p>
    </div>
  );
}
```

#### Event Handling

```typescript
export function EventExample() {
  const handleClick = (event: CustomEvent) => {
    console.log('Button clicked', event);
  };

  return (
    <OntarioButton onButtonClick={handleClick}>
      Click Me
    </OntarioButton>
  );
}
```

#### Refs

```typescript
import { useRef } from 'react';

export function RefExample() {
  const buttonRef = useRef<HTMLOntarioButtonElement>(null);

  const focusButton = () => {
    buttonRef.current?.focus();
  };

  return (
    <>
      <OntarioButton ref={buttonRef}>
        Focusable Button
      </OntarioButton>
      <button onClick={focusButton}>
        Focus Ontario Button
      </button>
    </>
  );
}
```

## Testing

### Manual Testing

1. **Visual Testing**: Verify component appearance matches design
2. **Interaction Testing**: Test all user interactions
3. **State Testing**: Verify state updates work correctly
4. **Event Testing**: Confirm events fire and handlers receive correct data

### Integration Tests (Playwright)

```typescript
// tests/button.spec.ts
import { test, expect } from '@playwright/test';

test('button integration test', async ({ page }) => {
	await page.goto('/examples/button');

	const button = page.locator('ontario-button').first();
	await expect(button).toBeVisible();

	await button.click();
	// Verify expected behaviour
});
```

### React Testing Library

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { ButtonExample } from './ButtonExample';

test('renders and handles click', () => {
  const handleClick = jest.fn();
  render(<ButtonExample onClick={handleClick} />);

  const button = screen.getByText('Click Me');
  fireEvent.click(button);

  expect(handleClick).toHaveBeenCalled();
});
```

## Common Testing Scenarios

### Form Integration

Test form components with React state:

```typescript
export function FormTest() {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    subscribe: false,
  });

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      console.log('Form submitted:', formData);
    }}>
      <OntarioInput
        label="Email"
        type="email"
        value={formData.email}
        onInputChange={(e) => setFormData({
          ...formData,
          email: e.detail
        })}
      />

      <OntarioInput
        label="Name"
        type="text"
        value={formData.name}
        onInputChange={(e) => setFormData({
          ...formData,
          name: e.detail
        })}
      />

      <OntarioButton type="submit">
        Submit
      </OntarioButton>
    </form>
  );
}
```

### Dynamic Properties

```typescript
export function DynamicPropsTest() {
  const [variant, setVariant] = useState<'primary' | 'secondary'>('primary');

  return (
    <div>
      <OntarioButton variant={variant}>
        {variant} Button
      </OntarioButton>

      <button onClick={() => setVariant(
        variant === 'primary' ? 'secondary' : 'primary'
      )}>
        Toggle Variant
      </button>
    </div>
  );
}
```

### Component Composition

```typescript
export function CompositionTest() {
  return (
    <OntarioCardCollection>
      <OntarioCard
        cardType="basic"
        heading="Card 1"
      >
        <p>Card content</p>
      </OntarioCard>
      <OntarioCard
        cardType="basic"
        heading="Card 2"
      >
        <p>Card content</p>
      </OntarioCard>
    </OntarioCardCollection>
  );
}
```

## Rebuilding After Component Changes

When component library changes:

```bash
# Rebuild component library (generates React wrappers)
cd packages/ontario-design-system-component-library
pnpm run build

# Rebuild React library
cd ../ontario-design-system-component-library-react
pnpm run build

# Clear React app cache and restart
cd ../app-react
rm -rf dist .cache node_modules/.cache
pnpm run start
```

## Common Issues

### Components Not Updating

1. Rebuild component library
2. Rebuild React library
3. Clear app cache: `rm -rf dist node_modules/.cache`
4. Restart dev server

### Event Handlers Not Firing

Check event name mapping:

- Stencil: `@Event() buttonClick`
- React: `onButtonClick`

### TypeScript Errors

1. Ensure React library was rebuilt (regenerates types)
2. Restart TypeScript server in IDE
3. Clear TypeScript cache: `rm -rf node_modules/.cache`

### Hot Module Replacement Issues

If changes don't appear:

1. Hard refresh browser (Cmd+Shift+R or Ctrl+Shift+R)
2. Restart dev server
3. Clear browser cache

## Best Practices

1. **Create Example Pages**: One page per component type
2. **Test All Variants**: Include all prop combinations
3. **Test Events**: Verify all events fire correctly
4. **Test State**: Ensure React state integration works
5. **Test Composition**: Verify components compose properly
6. **Document Issues**: Note any React-specific quirks

## Dependencies

**Key Dependencies**:

- `@ongov/ontario-design-system-component-library-react`
- React
- React DOM
- (Testing libraries as needed)

**Dev Dependencies**:

- Build tools (Webpack, Vite, etc.)
- Testing frameworks (Jest, Playwright, etc.)

## Additional Resources

- [React Library AGENTS.md](../ontario-design-system-component-library-react/AGENTS.md)
- [Component Library AGENTS.md](../ontario-design-system-component-library/AGENTS.md)
- [Next.js App AGENTS.md](../app-nextjs/AGENTS.md) - For SSR testing
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Playwright](https://playwright.dev/)
