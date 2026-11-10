# Ontario Design System Component Testing Playbook

Use this reference after identifying the component under review. Existing nearby tests remain the primary style guide; this playbook identifies the repository-wide baseline.

## Paths and Ownership

| Concern                  | Expected location                                                                                 |
| ------------------------ | ------------------------------------------------------------------------------------------------- |
| Component implementation | `packages/ontario-design-system-component-library/src/components/<component>/`                    |
| Stencil tests            | `packages/ontario-design-system-component-library/src/components/<component>/test/`               |
| Stencil unit             | `<component>.spec.tsx`                                                                            |
| Stencil E2E              | `<component>.e2e.ts`                                                                              |
| Stencil VRT              | `<component>.vrt.ts`                                                                              |
| Stencil VRT baselines    | `packages/ontario-design-system-component-library/src/components/<component>/test/vrt-snapshots/` |
| Next.js fixture          | `packages/app-nextjs/src/app/components/<route>/page.tsx`                                         |
| Next.js tests            | `packages/app-nextjs/tests/<component>/`                                                          |
| Next.js VRT baselines    | `packages/app-nextjs/tests/<component>/vrt-snapshots/`                                            |

Both Playwright configs store baselines beside the test file with the template `{testDir}/{testFileDir}/vrt-snapshots/{arg}-{projectName}{ext}`. The screenshot name comes from the describe and test titles plus a counter, and the browser (`chromium`, `firefox`, or `webkit`) is the suffix. A component that has all three browsers has three files for every screenshot.

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

For each applicable breakpoint width `B`:

- Use Stencil E2E to assert behavioural, semantic, visibility, ordering, overflow, or interaction changes immediately below and above the boundary, normally at `B - 1` px and `B + 1` px.
- Also test exactly `B` when the SCSS uses inclusive `min-width` and `max-width`, visibility changes at the threshold, or overlapping rules make boundary ownership significant.
- Use Stencil VRT for one stable viewport inside each visually distinct layout region. Do not create three nearly identical snapshots merely to cover `B - 1`, `B`, and `B + 1`.
- Use Next.js E2E when the React wrapper, fixture container, global grid, inherited styles, or page composition can change responsive behaviour.
- Use Next.js VRT for responsive layouts that depend on the full app context. Avoid duplicating a self-contained Stencil screenshot when the rendered result is equivalent.

Before recording coverage for a media-query rule, confirm that the rule takes effect. Compare a computed style above and below the boundary in the browser. A rule can compile to a selector that never matches (for example one nested so that it becomes `.x .x`), and a screenshot taken then records the unchanged layout as the expected result. Treat a rule that does not apply as a defect (see Known Defects).

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

The `test:unit` script runs a build step first (`pretest:unit`). If a direct `vitest` run fails on a fresh checkout because generated files are missing, run `pnpm run build:config` once, or run the `test:unit` script.

## Stencil Playwright E2E

Import Playwright assertions and Stencil fixtures separately:

```ts
import AxeBuilder from '@axe-core/playwright';
import { expect, type Locator } from '@playwright/test';
import { test, type E2EPage } from '@stencil/playwright';
```

Render self-contained markup with `page.setContent()`, call `page.waitForChanges()`, then assert attachment and hydration before behaviour. Scope locators to the host. Playwright locators traverse open shadow roots, so do not use `>>>`.

Keep these behaviours of the tooling in mind:

- Call `page.setContent()` once per test. In this setup a second call in the same test did not replace the content. To change the markup part way through a test, assign `document.body.innerHTML` in `page.evaluate()` and then call `page.waitForChanges()`, or move the case into its own test.
- Code passed to `locator.evaluate()` or `page.evaluate()` runs in the browser and cannot see variables from the test file. Pass values as the second argument and receive them as a parameter, for example `locator.evaluate((el, label) => { el.label = label; }, label)`.
- The Stencil build that Playwright starts compiles the test files. A type error in a test file fails that build, and the run then reports a web server timeout instead of a test failure, so read the `[WebServer]` output first.

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

### Language-Dependent Styles

Inspect the component SCSS for French-specific or language-dependent rules, such as `html[lang='fr']`, `:lang()`, `quotes`, and generated `content`. When these rules change the rendered output, set the page language and assert the observable result in English and French.

Pass the language to the shared helper: `withGlobalStyles(markup, { lang: 'fr' })`. It works in E2E as well as VRT, and it sets the language before the components load, which matters for a component that reads the language when it loads. Writing `<html lang="fr">` yourself has no effect, because the test page already has `<html lang="en">` and the browser ignores a second `lang` attribute. For a component that reacts to the language afterwards, set it in the test with `document.documentElement.setAttribute('lang', 'fr')` in `page.evaluate()`.

In shadow-DOM components, a selector that targets an ancestor outside the shadow root, such as `html[lang='fr'] blockquote`, may never apply, so verify the effect in the browser instead of assuming it works. If it does not apply, treat it as a defect.

### Colour Contrast

Treat colour contrast as accessibility coverage with visual-regression support, not as a screenshot assertion.

- Use the axe `color-contrast` rule in Stencil E2E on representative rendered variants. Axe is the primary automated check for text contrast owned by the component.
- Enter applicable hover, focus, active, selected, disabled, error, or open states before scanning when those states change foreground or background colours.
- Add a Next.js E2E contrast check when app-level styles, inherited colours, backgrounds, slots, or React composition can change the contrast that Stencil E2E observes.
- Use unit tests only when the component contains colour-selection or token-calculation logic. Do not reproduce browser contrast calculations in ordinary component unit tests.
- Use VRT to detect unintended colour changes, but never treat a matching screenshot as evidence that a contrast ratio passes WCAG.
- Manually review non-text contrast for controls, focus indicators, boundaries, icons, and meaningful graphics when automated tooling cannot determine the effective colours reliably.

For WCAG 2.2 Level AA, use the applicable requirement: at least 4.5:1 for normal text, 3:1 for large text, and 3:1 for required non-text UI and graphical-object contrast. Record any intentional exception or tooling limitation in the Phase 1 report.

### Asserting Colours and Naming Constants

Computed-style colour checks break whenever a token value changes. Prefer relative assertions: compare a state with the state before it (hover differs from the default, active differs from hover) or one variant with another, and leave exact colours to VRT. Where an absolute value cannot be avoided, describe the SCSS token behind it in a comment.

Give a value that repeats a name at the top of the file, with a comment that says what it represents, for example `const transparent = 'rgba(0, 0, 0, 0)';`. Do the same for repeated labels and attribute names.

### Known Defects

When a test exposes a defect in the component, do not change the assertion to match the faulty output. Agree how to handle it with the user first. To keep the case without failing CI, use `test.fail` with the Jira key in a comment above it:

```ts
// Known defect (DS-1234): the `html[lang='fr']` rule in the component SCSS can't match from inside the shadow root,
// so the English quotation marks stay.
// `test.fail` expects this to fail; once the defect is fixed, the run will fail and the annotation should become `test`.
test.fail('uses French quotation marks when the page language is French', async ({ page }) => {
	// ...
});
```

`test.fail` runs the assertion and passes only while the assertion fails. Unlike `test.skip` and `test.fixme`, it proves that the defect exists, and the run fails once the component is fixed. Before committing it, run the assertion as a plain `test` and confirm that it fails for the reason in the comment. Do not add a VRT baseline of the broken rendering. Add the baseline together with the fix.

Run a single E2E file from the component-library package:

```bash
pnpm exec playwright test src/components/<component>/test/<component>.e2e.ts
```

E2E files run in Chromium only, because the configuration limits Firefox and WebKit to VRT files.

## Puppeteer-to-Playwright Migration

Search the component test directory for these signals, including commented-out lines. Legacy suites are often left fully or partly commented out instead of deleted:

```text
newE2EPage
@stencil/core/testing
E2EElement
page.find
page.findAll
setProperty
getProperty
>>>
```

`spyOnEvent`, `waitForChanges`, and `setContent` exist in both the legacy and the current API, so they only indicate legacy code when they appear together with the signals above.

Use these translations:

| Deprecated pattern                 | Current pattern                                                                                                                  |
| ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `newE2EPage()`                     | Playwright `test` page fixture                                                                                                   |
| `page.find(selector)`              | `page.locator(selector)`                                                                                                         |
| `host >>> child`                   | `page.locator(host).locator(child)`                                                                                              |
| `element.setProperty(name, value)` | Render attributes initially or assign the DOM property in `locator.evaluate()`                                                   |
| `element.getProperty(name)`        | `locator.evaluate()` or observable DOM assertion                                                                                 |
| `element.click()` without awaiting | `await locator.click()`                                                                                                          |
| `describe(...)` and `it(...)`      | `test.describe(...)` and `test(...)`                                                                                             |
| `expect(el).toHaveClass('x')`      | `await expect(locator).toContainClass('x')`; a string given to Playwright's `toHaveClass` must match the whole `class` attribute |
| `expect(el).toEqualAttribute(...)` | `await expect(locator).toHaveAttribute(...)`                                                                                     |
| `expect(el).toEqualText('t')`      | `await expect(locator).toHaveText('t')`                                                                                          |
| legacy event spy assertions        | `EventSpy` and Stencil Playwright matchers                                                                                       |

Preserve the intent of valid legacy cases, not their obsolete mechanics. Remove converted commented code. A file containing only comments is missing coverage.

## Stencil VRT

Use `test` from `@stencil/playwright` and the shared helpers:

```ts
import { expect, Locator } from '@playwright/test';
import { test, E2EPage } from '@stencil/playwright';
import { expectVrtScreenshot, withGlobalStyles } from '../../../utils/tests/vrt-helpers';
```

Wrap the markup of every screenshot with `withGlobalStyles()` so text uses the bundled web fonts. Without it, text renders in the default fonts of whichever machine generated the baseline, and the baselines stop matching on other machines. Render the component inside a wrapper with a fixed width and some padding, wait for hydration and for `document.fonts.ready`, and screenshot the wrapper. The fixed width keeps the layout stable, and the padding keeps shadows and focus rings, which are drawn outside the component, inside the image.

```ts
const renderExample = async (page: E2EPage, attributes: string): Promise<Locator> => {
	await page.setContent(
		withGlobalStyles(`
			<div id="vrt-example" style="width: 640px; padding: 16px;">
				<ontario-example ${attributes}></ontario-example>
			</div>
		`),
	);
	await page.waitForChanges();
	await expect(page.locator('ontario-example')).toHaveClass(/hydrated/);
	await page.evaluate(async () => {
		await document.fonts.ready;
	});
	return page.locator('#vrt-example');
};
```

Render each state from its own markup instead of changing properties after the page loads, and call `expectVrtScreenshot()`. Cover meaningful variants and applicable default, focus, hover, active, disabled, error, open/closed, or responsive states. Use `locator.hover()` for hover snapshots. For active snapshots, hover the actionable element, press with `page.mouse.down()`, wait for the style to paint, capture the host, and release with `page.mouse.up()`. Avoid snapshots that differ only in test data.

Never call bare `toHaveScreenshot()`. Always use `expectVrtScreenshot()` so animations are disabled and carets are hidden.

Organize VRT tests by distinct visual state, not by mirroring E2E test names. Capture each distinct state once. Keep class, text, and element-count assertions in E2E unless they are needed to confirm the state before the screenshot. Take at most one screenshot per test unless the test deliberately captures a state transition.

Cover a narrow-viewport layout and a French layout when the component SCSS contains media queries or language-dependent rules that change the rendered result.

When removing, renaming, or merging a screenshot test, delete its orphaned baselines for every browser. Before reporting, list the baselines in `test/vrt-snapshots/` and confirm each one maps to an active screenshot call.

### Making Screenshots Colour-Sensitive

Playwright treats two pixels as the same when their colour difference is under a `threshold`, which defaults to `0.2`, and the repository also allows 2% of the pixels to differ (`maxDiffPixelRatio`). Both are too loose to notice some colour regressions. The colours of related states or variants are often close (for example a default and a hover background, or two dark border colours), so a screenshot of a button with no hover style at all can still match its hover baseline, and a coloured border is a tiny share of the image.

For screenshots whose purpose is a colour (variants, hover, focus and active states, borders, backgrounds), pass a tighter comparison to the helper, which accepts `threshold` and `maxDiffPixels`:

```ts
const colourSensitiveOptions = { threshold: 0.02, maxDiffPixels: 100 };

await expectVrtScreenshot(wrapper, colourSensitiveOptions);
```

Treat those numbers as a starting point, and keep the allowance as small as the rendering across browsers permits. Do not loosen the global settings.

Prove that a screenshot can fail. Temporarily break the thing it covers (skip the hover, render another colour variant, remove the narrow viewport), run the test in all three browsers, confirm that it fails, and revert the change. A screenshot that still passes cannot detect that regression. After generating baselines, open the images and check that each one shows what its name says and that related ones are distinct, because a baseline of a broken or blank rendering passes too.

### Running and Updating VRT

Run a single VRT file:

```bash
pnpm exec playwright test src/components/<component>/test/<component>.vrt.ts
```

Update snapshots only after approval. Do not pass `--project=chromium` when generating baselines: that generates only the Chromium files, and CI then fails on the missing or stale Firefox and WebKit baselines. A bare `--update-snapshots` means `changed`, so name the mode:

```bash
# add baselines that do not exist yet, for all three browsers
pnpm exec playwright test src/components/<component>/test/<component>.vrt.ts --update-snapshots=missing

# accept intended changes to existing baselines
pnpm exec playwright test src/components/<component>/test/<component>.vrt.ts --update-snapshots=changed
```

The `test:update-snapshots` package script updates every VRT file in the package, so use it only when a shared change is meant to affect every baseline. After any update, run `git status` and confirm that only the intended files changed.

The CI VRT job runs in the pinned Playwright Linux container (`mcr.microsoft.com/playwright`). On Linux, baselines generated locally with the matching Playwright browsers have matched CI when the screenshots load the global styles, and the CI job is the confirmation. On macOS, text rendering differs, so generate baselines with the Docker script (`pnpm run test:update-snapshots:docker`), which runs the VRT suite in the CI image.

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

Run or update a single file from `packages/app-nextjs`. The same rules as for Stencil VRT apply: do not pass `--project` when generating baselines, name the update mode, and check `git status` afterwards.

```bash
pnpm exec playwright test tests/<component>/<component>.vrt.ts
pnpm exec playwright test tests/<component>/<component>.vrt.ts --update-snapshots=missing
```

On macOS, use `pnpm run test:update-snapshots:docker`.

## Final Validation

Run Prettier on every touched file (`pnpm exec prettier --check <files>`). Start with the touched test files, then run the package scripts that the approved scope requires. For a change to one component, the focused file commands above are usually enough:

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

Do not claim cross-browser or Linux snapshot validation when only local Chromium checks ran, and say which browsers actually ran. Report that limitation explicitly.
