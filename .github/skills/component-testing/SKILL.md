---
name: component-testing
description: 'Review, create, backfill, or migrate tests for an Ontario Design System web component. Use when testing a component with Stencil Vitest unit tests, Stencil Playwright E2E and VRT, Next.js Playwright E2E and VRT, Next.js fixture pages, accessibility coverage, or deprecated Stencil Puppeteer tests.'
argument-hint: 'Component name, for example ontario-button'
user-invocable: true
disable-model-invocation: false
---

# Component Testing

Act as a Senior Testing Engineer. Keep component tests consistent with the repository's current testing workflows, favour behaviour over implementation details, and preserve useful existing coverage.

Use [the testing playbook](./references/testing-playbook.md) for suite-specific patterns, paths, commands, and migration guidance.

## Required Workflow

### Phase 1: Review and Report

Do not edit files, update snapshots, install dependencies, or run commands that change the workspace during this phase.

1. Resolve the requested component name. If it is missing or ambiguous, ask the user which component to review.
2. Read the component implementation, public properties, slots, events, methods, validation, localization, responsive behaviour, and README or generated documentation.
3. Inspect related components only when composition affects the component's behaviour.
4. Locate and review all existing coverage:
   - Stencil unit tests.
   - Stencil Playwright E2E tests.
   - Stencil Playwright VRT tests and baselines.
   - The relevant Next.js fixture page. A child component may belong on an existing parent component route.
   - Next.js Playwright E2E tests.
   - Next.js Playwright VRT tests and baselines.
5. Search the component's tests for deprecated Puppeteer-era Stencil APIs, including `newE2EPage`, `page.find`, `E2EElement`, `@stencil/core/testing`, and `>>>`. Treat commented legacy suites as missing coverage, not as completed tests.
6. Compare the implementation and current tests against the playbook. Classify each applicable pattern as:
   - Covered.
   - Missing.
   - Legacy and requiring migration.
   - Not applicable, with a short reason.
7. Report to the user before making any changes. Include:
   - Component behaviour and public API summary.
   - Existing test and Next.js fixture inventory.
   - Coverage strengths.
   - Missing or weak patterns by suite.
   - Puppeteer-to-Playwright migration work, if any.
   - Proposed files to create or modify.
   - Focused validation commands.
   - Assumptions, exclusions, or risks.
8. Ask the user whether to continue with the proposal or change anything. Stop and wait for their response.

The approval request must be explicit. When the question tool is available, offer these choices:

- Continue with the proposed tests.
- Change the proposed coverage.
- Stop after the review.

Do not interpret the initial invocation as approval to implement. Approval must follow the Phase 1 report.

### Phase 2: Implement After Approval

Enter this phase only after the user explicitly approves the proposal or supplies requested changes.

1. Apply the approved scope and incorporate any requested changes.
2. Augment valid existing tests rather than replacing them wholesale.
3. Convert relevant Puppeteer-era tests to active Playwright tests and remove the converted commented blocks.
4. Add only test patterns that apply to the component's actual contract.
5. Create or extend the most appropriate Next.js fixture route with deterministic content and stable IDs.
6. Use the repository's shared VRT helpers and established snapshot layout.
7. Run the narrowest relevant validation after the first substantive edit, then repair and rerun that same check if it exposes a local defect.
8. Run all approved component-level suites that the environment supports.
9. Do not update VRT baselines unless the user approved VRT implementation. Clearly identify newly generated or changed snapshots.
10. Report:

- Files changed.
- Coverage added or backfilled.
- Legacy tests migrated.
- Commands run and results.
- Snapshot changes.
- Remaining gaps or checks that could not run.

## Testing Principles

- Test the smallest appropriate layer: rendering logic in unit tests, browser behaviour in Stencil E2E, React integration in Next.js E2E, and meaningful visual states in VRT.
- Avoid duplicating identical assertions across layers unless they validate a framework boundary or critical contract.
- Prefer role, label, text, and scoped locators. Use CSS selectors when validating a documented class or targeting shadow-DOM implementation that has no semantic locator.
- Include English and French cases when the component owns localized output.
- Include axe coverage in Stencil E2E for rendered states that materially differ in structure or interaction.
- Review colour contrast for applicable variants and interaction states; use automated E2E checks where reliable and report required manual checks rather than treating VRT as contrast validation.
- Include keyboard behaviour, focus order, pointer and mouse behaviour, events, methods, form integration, validation, disabled/read-only states, and responsive behaviour only when applicable.
- Derive responsive viewports from the component's media queries and the repository breakpoint tokens. Use E2E for meaningful boundary behaviour and VRT for one stable viewport per distinct layout rather than generic device coverage.
- Never add arbitrary sleeps. Use locator assertions, `page.waitForChanges()`, or the shared interaction-paint helper.
- Do not loosen global screenshot tolerances to make a component test pass. Use a narrowly justified per-snapshot allowance only when necessary.
- Use Canadian spelling in test names, fixture text, and comments unless an API or expected string requires otherwise.
