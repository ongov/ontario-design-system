# Ontario Design System Component Testing Playbook

Use this reference after identifying the component under review. Existing nearby tests remain the primary style guide; this playbook identifies the repository-wide baseline.

## Paths and Ownership

| Concern                  | Expected location                                                                   |
| ------------------------ | ----------------------------------------------------------------------------------- |
| Component implementation | `packages/ontario-design-system-component-library/src/components/<component>/`      |
| Stencil tests            | `packages/ontario-design-system-component-library/src/components/<component>/test/` |
| Stencil unit             | `<component>.spec.tsx`                                                              |
| Stencil E2E              | `<component>.e2e.ts`                                                                |
| Stencil VRT              | `<component>.vrt.ts`                                                                |
| Stencil VRT baselines    | `test/vrt-snapshots/`                                                               |
| Next.js fixture          | `packages/app-nextjs/src/app/components/<route>/page.tsx`                           |
| Next.js tests            | `packages/app-nextjs/tests/<component>/`                                            |
| Next.js VRT baselines    | `tests/<component>/vrt-snapshots/`                                                  |

A child or tightly composed component may use a parent fixture route. Prefer extending a coherent existing route over creating an artificial standalone page.

## Coverage Matrix

Build a component-specific matrix. Do not mechanically add every row.

| Pattern                   | Unit                          | Stencil E2E                  | Stencil VRT                | Next.js E2E                   | Next.js VRT                |
| ------------------------- | ----------------------------- | ---------------------------- | -------------------------- | ----------------------------- | -------------------------- |
| Empty/default render      | Yes                           | Hydration smoke check        | Default appearance         | Wrapper smoke check           | Default appearance         |
| Properties and defaults   | Yes                           | Browser-observable effects   | Visual variants            | React prop binding            | Visual variants            |
| Slots/children            | Conditional DOM               | Projection and interaction   | Meaningful layouts         | React child/slot integration  | Meaningful layouts         |
| Events                    | Emission logic when practical | Event name, count, detail    | No                         | React callback integration    | No                         |
| Public methods            | Logic when practical          | Browser result               | Resulting state if visual  | Wrapper exposure if relevant  | Resulting state if visual  |
| Validation/warnings       | Yes                           | User-visible result          | Invalid state if visual    | Wrapper behaviour             | Invalid state if visual    |
| Keyboard/focus            | No                            | Yes                          | Focus/active states        | Framework integration         | Focus/active states        |
| Pointer/mouse             | No                            | Click and pointer behaviour  | Hover/active states        | Framework integration         | Hover/active states        |
| Accessibility             | Structural assertions         | Roles, names, ARIA, axe      | No                         | Integration semantics         | No                         |
| Colour contrast           | Token logic only              | Axe and state checks         | Regression signal only     | Check when context affects it | Regression signal only     |
| Localization              | Owned string logic            | English/French output        | Distinct layouts if needed | Prop forwarding               | Distinct layouts if needed |
| Breakpoint responsiveness | No                            | Boundaries used by component | One viewport per layout    | Context and wrapper changes   | One viewport per layout    |
| Form integration          | Logic only                    | Native browser behaviour     | Relevant states            | React form behaviour          | Relevant states            |

Avoid repeating implementation-class assertions in every layer. Duplication is justified when it proves that a public contract survives Stencil rendering and React wrapping.

## Responsive Breakpoints

Use the breakpoint tokens from `packages/ontario-design-system-design-tokens/tokens/breakpoints/breakpoints.js` and the ranges from `packages/ontario-design-system-global-styles/src/styles/scss/1-variables/_breakpoints.variables.scss`. Do not substitute generic device presets for the component's actual media-query boundaries.

At Playwright's default 16px root size, the canonical breakpoints are:

| Token    | Value   | Pixel equivalent | Coverage expectation                                                  |
| -------- | ------- | ---------------- | --------------------------------------------------------------------- |
| `xsmall` | `20em`  | 320px            | Header-specific; test only when the component uses it                 |
| `small`  | `40em`  | 640px            | Primary mobile/stacked-to-larger-layout boundary; commonly applicable |
| `medium` | `73em`  | 1168px           | Common wide-layout, navigation, card, and footer boundary             |
| `large`  | `96em`  | 1536px           | Test when component or global-grid behaviour changes here             |
| `xlarge` | `120em` | 1920px           | Test when component or global-grid behaviour changes here             |

During Phase 1, inspect the component SCSS and its fixture context for `min-width`, `max-width`, breakpoint variables, grid classes, visibility helpers, container constraints, and responsive JavaScript. Propose coverage only for boundaries that can change the component or its integration layout.

For each applicable breakpoint $B$:

- Use Stencil E2E to assert behavioural, semantic, visibility, ordering, overflow, or interaction changes immediately below and above the boundary, normally at $B - 1$px and $B + 1$px.
- Also test exactly $B$ when the SCSS uses inclusive `min-width` and `max-width`, visibility changes at the threshold, or overlapping rules make boundary ownership significant.
- Use Stencil VRT for one stable viewport inside each visually distinct layout region. Do not create three nearly identical snapshots merely to cover $B - 1$, $B$, and $B + 1$.
- Use Next.js E2E when the React wrapper, fixture container, global grid, inherited styles, or page composition can change responsive behaviour.
- Use Next.js VRT for responsive layouts that depend on the full app context. Avoid duplicating a self-contained Stencil screenshot when the rendered result is equivalent.

Use `page.setViewportSize({ width, height })` before rendering or navigation. Keep height stable unless vertical viewport behaviour is part of the contract. A practical narrow reflow check at 320px is appropriate for applicable content, but it does not replace testing the component's actual breakpoint transitions.

The global styles also define a `0.00125em` transition offset and grid ranges beginning `0.063em` above some named breakpoints. When a component relies on those helpers, inspect the generated media query rather than assuming the named breakpoint is the exact pixel where both layouts switch.

## Stencil Unit Tests

Use Vitest with `render` from `@stencil/vitest`:

```tsx
import { render } from '@stencil/vitest';

const page = await render(`<ontario-example label="Example"></ontario-example>`);
await page.waitForChanges();

expect(page.root).not.toBeNull();
expect(page.root?.shadowRoot?.querySelector('[part="label"]')).toHaveTextContent('Example');
```

Cover rendering branches, property defaults and updates, conditional classes/markup, slots, owned localization, and validation warnings. Use `vi.spyOn` for warnings and restore spies. Prefer explicit assertions to broad snapshots; use snapshots only when they provide maintainable structural value.

Run a single unit file from the component-library package:

```bash
pnpm exec vitest run src/components/<component>/test/<component>.spec.tsx
```

## Stencil Playwright E2E

Import Playwright assertions and Stencil fixtures separately:

```ts
import AxeBuilder from '@axe-core/playwright';
import { expect, type Locator } from '@playwright/test';
import { test, type E2EPage } from '@stencil/playwright';
```

Render self-contained markup with `page.setContent()`, call `page.waitForChanges()`, then assert attachment and hydration before behaviour. Scope locators to the host. Playwright locators traverse open shadow roots, so do not use `>>>`.

For events:

```ts
const eventSpy = await page.spyOnEvent('exampleChange');
await control.click();
await page.waitForChanges();
await expect(eventSpy).toHaveReceivedEvent();
await expect(eventSpy).toHaveReceivedEventDetail({ value: 'example' });
```

For pointer and mouse interactions, test the observable result rather than only proving that Playwright can click an element. Include applicable behaviours such as:

- Click activation, including emitted events, navigation, form actions, open/closed state, and disabled controls that must not activate.
- Hover-driven content or state, including tooltips, menus, disclosure affordances, and pointer-only visual changes.
- Pressed or active behaviour using `hover()`, `page.mouse.down()`, and `page.mouse.up()` when the state itself matters.
- Pointer entry, exit, movement, or coordinates only when the component implements behaviour based on those details.

Prefer `locator.click()` and `locator.hover()` because they include actionability checks. Use `page.mouse` only when lower-level pointer control is required, and always release a pressed button before the test ends. Pair mouse activation with keyboard coverage when the control must support both input modes.

Use `AxeBuilder` on a representative complete state. Disable an axe rule only when the component is intentionally tested outside required parent semantics, and state that reason in the test helper or review report.

### Colour Contrast

Treat colour contrast as accessibility coverage with visual-regression support, not as a screenshot assertion.

- Use the axe `color-contrast` rule in Stencil E2E on representative rendered variants. Axe is the primary automated check for text contrast owned by the component.
- Enter applicable hover, focus, active, selected, disabled, error, or open states before scanning when those states change foreground or background colours.
- Add a Next.js E2E contrast check when app-level styles, inherited colours, backgrounds, slots, or React composition can change the contrast that Stencil E2E observes.
- Use unit tests only when the component contains colour-selection or token-calculation logic. Do not reproduce browser contrast calculations in ordinary component unit tests.
- Use VRT to detect unintended colour changes, but never treat a matching screenshot as evidence that a contrast ratio passes WCAG.
- Manually review non-text contrast for controls, focus indicators, boundaries, icons, and meaningful graphics when automated tooling cannot determine the effective colours reliably.

For WCAG 2.2 Level AA, use the applicable requirement: at least 4.5:1 for normal text, 3:1 for large text, and 3:1 for required non-text UI and graphical-object contrast. Record any intentional exception or tooling limitation in the Phase 1 report.

Run a single E2E file from the component-library package:

```bash
pnpm exec playwright test src/components/<component>/test/<component>.e2e.ts --project=chromium
```

## Puppeteer-to-Playwright Migration

Search the component test directory for:

```text
newE2EPage
@stencil/core/testing
E2EElement
page.find
page.findAll
spyOnEvent
setProperty
>>>
```

Use these translations:

| Deprecated pattern                 | Current pattern                                                                |
| ---------------------------------- | ------------------------------------------------------------------------------ |
| `newE2EPage()`                     | Playwright `test` page fixture                                                 |
| `page.find(selector)`              | `page.locator(selector)`                                                       |
| `host >>> child`                   | `page.locator(host).locator(child)`                                            |
| `element.setProperty(name, value)` | Render attributes initially or assign the DOM property in `locator.evaluate()` |
| `element.getProperty(name)`        | `locator.evaluate()` or observable DOM assertion                               |
| `element.click()` without awaiting | `await locator.click()`                                                        |
| legacy event spy assertions        | `EventSpy` and Stencil Playwright matchers                                     |

Preserve the intent of valid legacy cases, not their obsolete mechanics. Remove converted commented code. A file containing only comments is missing coverage.

## Stencil VRT

Use `test` from `@stencil/playwright` and the shared helpers:

```ts
import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';
import { expectVrtScreenshot, withGlobalStyles } from '../../../utils/tests/vrt-helpers';
```

Wrap markup with `withGlobalStyles()` when inherited typography or global assets affect rendering. Wait for hydration, capture a stable host, and call `expectVrtScreenshot()`. Cover meaningful variants and applicable default, focus, hover, active, disabled, error, open/closed, or responsive states. Use `locator.hover()` for hover snapshots. For active snapshots, hover the actionable element, press with `page.mouse.down()`, wait for the style to paint, capture the host, and release with `page.mouse.up()`. Avoid snapshots that differ only in test data.

Run a single VRT file:

```bash
pnpm exec playwright test src/components/<component>/test/<component>.vrt.ts --project=chromium
```

Update its snapshots only after approval:

```bash
pnpm exec playwright test src/components/<component>/test/<component>.vrt.ts --project=chromium --update-snapshots
```

The full configured VRT matrix is Chromium, Firefox, and WebKit. Baselines should be generated in the repository's pinned Playwright Linux environment when they are intended for CI.

## Next.js Fixture Pages

Use the React wrappers from `@ongov/ontario-design-system-component-library-react`. Add deterministic examples for each tested contract and assign stable, descriptive IDs to screenshot hosts and integration targets.

Use a client component only when callbacks, local state, browser APIs, or form behaviour require `'use client'`. Keep fixture content stable: no current dates, random values, network dependencies, or animation-dependent initial states.

The fixture must expose enough states for both E2E and VRT without embedding test-only instructions in the visible UI.

## Next.js Playwright E2E

Navigate in `beforeEach` to `/components/<route>`. Test the React boundary rather than duplicating all Stencil internals:

- Primitive, object, boolean, and optional prop forwarding.
- React children and named-slot composition.
- Callback/event integration.
- Hydration and post-hydration interaction.
- Mouse and pointer integration, including click outcomes, hover behaviour, and disabled controls when applicable.
- Form, navigation, and client-state integration.
- Semantic output that could be affected by the wrapper.

Prefer web-first assertions. Set up dialog, navigation, or event waits before triggering the action.

Run a single file from `packages/app-nextjs`:

```bash
pnpm exec playwright test tests/<component>/<component>.e2e.ts --project=chromium
```

## Next.js VRT

Use the shared app helper:

```ts
import { test } from '@playwright/test';
import { expectVrtScreenshot, waitForInteractionPaint } from '../vrt-helpers';
```

The relative helper path may vary with test depth. Capture stable component hosts. After focus or mouse-down state changes, call `waitForInteractionPaint(page)` before the screenshot. Always release `page.mouse` after active-state assertions.

Run or update a single file from `packages/app-nextjs`:

```bash
pnpm exec playwright test tests/<component>/<component>.vrt.ts --project=chromium
pnpm exec playwright test tests/<component>/<component>.vrt.ts --project=chromium --update-snapshots
```

## Final Validation

Start with the touched files and Chromium. Then run the package scripts required by the approved scope:

```bash
# packages/ontario-design-system-component-library
pnpm run test:unit
pnpm run test:e2e
pnpm run test:vrt

# packages/app-nextjs
pnpm run lint
pnpm run test:e2e
pnpm run test:vrt
```

Do not claim cross-browser or Linux snapshot validation when only local Chromium checks ran. Report that limitation explicitly.
