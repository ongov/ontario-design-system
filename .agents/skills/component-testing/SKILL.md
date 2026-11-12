---
name: component-testing
description: 'Review, create, backfill, or migrate tests for an Ontario Design System web component. Use when testing a component with Stencil Vitest unit tests, Stencil Playwright E2E and VRT, consumer application tests and fixture pages, accessibility coverage, or deprecated Stencil Puppeteer tests.'
argument-hint: 'Component name, for example ontario-button'
user-invocable: true
disable-model-invocation: false
---

# Component Testing

Act as a Senior Testing Engineer. Keep component tests consistent with the repository's current testing workflows, favour behaviour over implementation details, and preserve useful existing coverage.

Use [the testing playbook](./references/testing-playbook.md) for suite-specific patterns, paths, commands, and migration guidance.

This skill is written to work in any AI coding harness that supports agent skills, such as GitHub Copilot and OpenCode. When it says to ask the user, use the harness's question tool if it has one, and otherwise ask in plain text and stop until the user answers.

## Libraries and Applications

The published npm packages are libraries, not applications. The library layers (Stencil unit, E2E, and VRT tests) validate one component at a time with self-contained markup. They do not test navigation, flows across pages, server behaviour, or deployment, and they must not depend on application code.

The consumer applications (`app-nextjs`, `app-react`, and `app-angular`) are real applications. They are test vehicles that show the published packages working inside an application, so application-level behaviour such as routing, server rendering, page structure, and inherited application styles is in scope there. The playbook lists which applications have tests today. Whether a component is also exercised in the applications is useful context for a review, but it is not a gap to fill unless the user asks for it.

## Scope

The user can narrow the work in the invocation. Read the request for the layers and areas it names, and limit both phases to them.

- Library layers: Stencil unit tests, Stencil Playwright E2E, and Stencil Playwright VRT.
- Application layers: the fixture page, E2E tests, and VRT tests of each consumer application that the playbook lists as having tests.
- Areas: for example accessibility, keyboard behaviour, form integration, responsive behaviour, localization, or migrating legacy Puppeteer tests.

For example, "Review the unit and E2E tests for ontario-button", "Review only the library layers for ontario-button", "Check whether ontario-header is also covered in the consumer applications", or "Add VRT coverage for the French layout of ontario-blockquote" are narrowed requests, while "Review and create tests for ontario-button" covers every layer. If the request is ambiguous about scope, ask before starting. Gaps outside the requested scope get a single line in the report and are not reviewed in detail or implemented.

## Required Workflow

### Phase 1: Review and Report

Do not edit files, update snapshots, install dependencies, or run commands that change the workspace during this phase.

1. Resolve the requested component name and the scope (see Scope). If either is missing or ambiguous, ask the user.
2. Ask the user whether the existing tests may be run locally. Running a suite needs the Playwright browsers installed and builds the Stencil components, and writes only ignored output folders such as `test-results/`, so it is allowed in this phase only with the user's agreement. Never pass an update flag such as `--update-snapshots` in this phase.
   - If the user agrees, run the existing in-scope suites with the narrowest commands from the playbook and use the results in the report.
   - If the user declines, or the environment cannot run them, review the existing tests and baselines by reading them, and say in the report which conclusions could not be confirmed by a run. Present options for the user to choose from, such as running the suites themselves and sharing the output.
3. Read the component implementation, public properties, slots, events, methods, validation, localization, responsive behaviour, and README or generated documentation. Include the component SCSS, noting media queries and language-dependent rules such as `html[lang='fr']`, `:lang()`, `quotes`, or generated `content`.
4. Inspect related components only when composition affects the component's behaviour.
5. Locate and review all existing coverage:
   - Stencil unit tests.
   - Stencil Playwright E2E tests.
   - Stencil Playwright VRT tests and baselines.
   - The consumer application layers, for the applications that the playbook lists as having tests: the fixture page for the component (a child component may belong on an existing parent component route) and its E2E and VRT tests and baselines. Report this as context. Missing application coverage is a gap only when the application layers are in the requested scope.
6. Search the component's tests for deprecated Puppeteer-era Stencil APIs, including `newE2EPage`, `page.find`, `E2EElement`, `@stencil/core/testing`, and `>>>`. These suites are often left fully or partly commented out, so search commented lines too. Treat commented legacy suites as missing coverage, not as completed tests, and see the playbook for how to tell legacy calls from the same-named current Playwright APIs.
7. Compare the implementation and current tests against the playbook. Classify each applicable pattern as:
   - Covered.
   - Missing.
   - Legacy and requiring migration.
   - Not applicable, with a short reason.
8. Report to the user before making any changes. Include:

   - Component behaviour and public API summary.
   - Existing library test inventory and, as context, any coverage in the consumer applications.
   - Coverage strengths.
   - Missing or weak patterns by suite, labelled as library-level or application-level.
   - Puppeteer-to-Playwright migration work, if any.
   - Suspected component defects, with the evidence and the expected behaviour.
   - Proposed files to create or modify.
   - Focused validation commands.
   - Assumptions, exclusions, or risks. If the tests could not be run, say which findings come from reading the tests only.

   Keep the report short enough to read in one sitting. Summarize the covered patterns in a single line, and spend the detail on gaps, legacy tests, and defects. Offer the findings as options the user can accept, drop, or change.

9. Ask the user whether to continue with the proposal or change anything. Stop and wait for their response.

The approval request must be explicit. Use the harness's question tool if it has one, and otherwise ask in plain text. Offer these choices:

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
5. When the application layers are in the approved scope, create or extend the most appropriate fixture route in the consumer application with deterministic content and stable IDs.
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
- Defects exposed by the tests, how each test handles them, and any Jira issue the user wants drafted.
- Remaining gaps or checks that could not run.

## Testing Principles

- Test the smallest appropriate layer: rendering logic in unit tests, browser behaviour in Stencil E2E, framework binding and application behaviour in the consumer applications' tests, and meaningful visual states in VRT. Keep library tests self-contained, and do not add routing, multi-page flows, or application code to them.
- Avoid duplicating identical assertions across layers unless they validate a framework boundary or critical contract.
- Prefer role, label, text, and scoped locators. Use CSS selectors when validating a documented class or targeting shadow-DOM implementation that has no semantic locator.
- Include English and French cases when the component owns localized output.
- Include axe coverage in Stencil E2E for rendered states that materially differ in structure or interaction.
- Review colour contrast for applicable variants and interaction states; use automated E2E checks where reliable and report required manual checks rather than treating VRT as contrast validation.
- Include keyboard behaviour, focus order, pointer and mouse behaviour, events, methods, form integration, validation, disabled/read-only states, and responsive behaviour only when applicable.
- Derive responsive viewports from the component's media queries and the repository breakpoint tokens. Use E2E for meaningful boundary behaviour and VRT for one stable viewport per distinct layout rather than generic device coverage.
- Never add arbitrary sleeps. Use locator assertions, `page.waitForChanges()`, or the shared interaction-paint helper.
- Do not loosen global screenshot tolerances to make a component test pass. Use a narrowly justified per-snapshot allowance only when necessary. When a screenshot has to tell close colours apart, such as colour variants or hover and focus states, tighten the per-snapshot `threshold` instead, as described in the playbook.
- Use Canadian spelling in test names, fixture text, and comments unless an API or expected string requires otherwise.
- If a test exposes a defect, report it instead of recording the faulty output as the expected result. Do not write assertions or VRT baselines that lock in the defect, and do not add a baseline of a broken rendering until the defect is fixed. Offer the user these options and let them choose:

  - Fix the component, in a separate commit from the tests.
  - Keep the test as `test.fail` with a comment that names the Jira issue. The assertion still runs, so the test proves the defect exists, and the run fails when the defect is fixed, which is the prompt to remove the annotation. Run the assertion as a plain `test` first and confirm that it fails for the stated reason.
  - Leave the case out of scope.

  Avoid `test.skip` and `test.fixme` for defects, because they never run the assertion. If the user wants a Jira issue, offer to draft one and include its key in the comment.

## Repository Conventions

Follow the repository's `AGENTS.md`; the points below apply specifically to test work.

- Formatting: tabs for indentation (width 2), single quotes, semicolons, trailing commas, and a print width of 120. Run Prettier on every touched file, for example `pnpm exec prettier --write <files>`.
- Spelling: Canadian spelling (`colour`, `behaviour`, `centre`) in test names, fixture text, comments, and docs. Keep US spelling only where an API, attribute, or expected string requires it.
- File naming: use the existing suffixes `*.spec.tsx` (unit), `*.e2e.ts`, and `*.vrt.ts`. Keep unit, E2E, and VRT cases in their own files rather than combining layers.
- Markdown: do not hard-wrap markdown. Write each paragraph or list item as a single line.
- Commits: use Conventional Commits with a lowercase imperative subject, for example `test(button): add keyboard coverage`. Use the `test` type for test-only changes, and keep subject and body lines under 100 characters. Keep snapshot updates in their own commit when practical so reviewers can inspect them separately.
- Scope: keep changes limited to the approved component. Do not refactor unrelated tests or components.
