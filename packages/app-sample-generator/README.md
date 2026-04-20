# stencil-sample-generator

Automated HTML sample generation for Stencil components using `newSpecPage()`.

## Setup

Install dependencies:

```bash
npm install
```

## Define samples

Edit `scripts/sample-config.ts` to add each component you want rendered. Each entry
accepts a component tag, the HTML snippet to render, an output filename, and an
optional description used in the generated page. The runtime script reads
`scripts/sample-config.js`, so keep both files in sync when adding new samples.

## Generate HTML samples

Run the generator to produce HTML documents under `docs/samples/`:

```bash
npm run generate-samples
```

The script first runs the Stencil build (using components generated via
`stencil generate` in `src/components/`), then renders each sample with
`newSpecPage()`, strips Stencil hydration artifacts, wraps the result in a
simple documentation shell, and writes the output file. Shadow DOM output is
flattened into regular HTML by stripping the Stencil test harness'
`<mock:shadow-root>` or `<template shadowroot="open">` wrappers for readability
in docs.

## Conversion process

The conversion flow is implemented in `scripts/generate-samples.ts` and is orchestrated by the
`generate-samples` npm script. The key stages are:

1. Build components into `dist/stencilsample/*.entry.js` via the npm script chain
   ([package.json#L7](package.json#L7), [package.json#L8](package.json#L8)).
2. Load the sample list from `scripts/sample-config.js` and resolve per-tag component modules
   ([scripts/generate-samples.ts#L13](scripts/generate-samples.ts#L13), [scripts/generate-samples.ts#L20](scripts/generate-samples.ts#L20)).
3. Attach Stencil component metadata before rendering so the test harness can
   instantiate each component correctly
   ([scripts/generate-samples.ts#L64](scripts/generate-samples.ts#L64), [scripts/generate-samples.ts#L203](scripts/generate-samples.ts#L203)).
4. Render each sample with `newSpecPage()`, including any declared component dependencies
   for nested output
   ([scripts/generate-samples.ts#L36](scripts/generate-samples.ts#L36), [scripts/generate-samples.ts#L366](scripts/generate-samples.ts#L366)).
5. Strip hydration attributes and flatten the shadow root wrappers so the output is regular HTML,
   then resolve default and named slots for nested samples
   ([scripts/generate-samples.ts#L216](scripts/generate-samples.ts#L216), [scripts/generate-samples.ts#L230](scripts/generate-samples.ts#L230),
   [scripts/generate-samples.ts#L238](scripts/generate-samples.ts#L238), [scripts/generate-samples.ts#L262](scripts/generate-samples.ts#L262),
   [scripts/generate-samples.ts#L287](scripts/generate-samples.ts#L287)).
6. Inline component styles by transforming `:host` selectors into tag names and merging
   dependency CSS into the document
   ([scripts/generate-samples.ts#L314](scripts/generate-samples.ts#L314), [scripts/generate-samples.ts#L318](scripts/generate-samples.ts#L318),
   [scripts/generate-samples.ts#L377](scripts/generate-samples.ts#L377)).
7. Wrap the cleaned markup in a documentation shell and write each file under `docs/samples/`
   ([scripts/generate-samples.ts#L333](scripts/generate-samples.ts#L333), [scripts/generate-samples.ts#L382](scripts/generate-samples.ts#L382)).

## Sample button screenshot

Run the capture script to refresh the sample button screenshot and save it in
`docs/samples/sample-button.png` (generated locally and not tracked in git):

```bash
npm run screenshot:sample-button
```

The resulting image will be written to `docs/samples/sample-button.png` so you
can preview it locally or add it to downstream documentation.

## Additional notes

- A styled input example is available as `sample-input`; mirror the config entry in both `scripts/sample-config.ts` and `scripts/sample-config.js` when adding more examples so the generator picks them up.
- Nested samples are available as `sample-card` and `sample-card-action` to show component composition in the generated HTML.
- Stencil emits a `tsconfig.json "include" required` warning in dev builds; the current setup still builds and generates samples successfully.
