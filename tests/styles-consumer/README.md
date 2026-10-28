# Isolated Sass consumer check

## Purpose

Check the global-styles package as an outside project would use it: install an
archive, import its public Sass modules, and compile with the consumer's own Sass
compiler. This is not a workspace application and is intentionally outside the
`packages/*` workspace pattern.

The fixture lives in the repository for version control, but the runner copies it
into a temporary directory **outside** the repository before installing anything.
Do not run the fixture in place as a substitute for this check.

## Running the check

Use the repository's Node and pnpm versions, with npm available on PATH:

```sh
pnpm install --frozen-lockfile
pnpm run build-libs
pnpm run test:styles-consumer
```

The check deliberately does not build automatically. It tests the existing build,
so CI can reuse the same artifacts intended for publication. Rebuild after source
changes; otherwise the check will test stale output.

To check a previously created package archive instead:

```sh
pnpm run test:styles-consumer --tarball /absolute/path/to/global-styles.tgz
```

No package is published by this command.

## What happens, step by step

1. Create a temporary directory and verify it is outside the repository.
2. Run `pnpm pack` in global-styles, unless an archive was supplied. Packing uses
   the package's publication file selection rather than copying its source tree.
3. Copy this fixture into the temporary directory, excluding local dependencies
   and generated CSS.
4. Run `npm ci` against the fixture lockfile to install its pinned Sass compiler.
   Sass 1.99.0 is already used elsewhere in the repository and supports `pkg:`
   imports. It is a fixed starting point, not a claim of coverage for every Sass
   version. During initial validation, Sass 1.83.4 reported ambiguous resolutions
   for this package's overlapping exact and wildcard exports before reaching the
   regression. Supporting older compiler versions needs a separate decision.
5. Install the archive as an extracted package, not a workspace link. Lifecycle
   scripts are disabled so installation cannot repair missing build output.
6. Compile both Sass examples with Node package resolution. No repository load
   paths are provided; inherited `SASS_PATH`, `NODE_PATH`, and `NODE_OPTIONS` are
   removed.
7. Return a nonzero exit status on installation or compilation failure. Remove
   the temporary project on success or failure.

The consumer install needs registry access for Sass and its dependencies. Network
or installation failures fail the check; they are not reported as compilation
success.

## What the examples cover

- `focus-regression.scss` imports the focus-placeholders module and directly uses
  its re-exported `$ontario-focus-box-shadow`. Merely importing the module or
  extending its placeholder would not detect the missing public variable. It also
  exercises the focus transition and placeholder.
- `grid-variables.scss` imports the grid variables module and uses its row width,
  gutter, column counts, float direction, and `$medium-up` media query. A theme
  compile alone would not notice if one of these stopped being exposed.
- `theme.scss` compiles the full public theme entry point, checking that its
  packaged dependencies resolve without the monorepo's development dependencies.

The regression deliberately does not import box-shadow variables directly:
that would bypass the missing `@forward` and hide the original failure.

## Proving regression coverage

Run the check against a fixed build first; it must pass. Then supply an archive
of the broken build with the focus-variable forward missing. The regression must
fail with `Undefined variable` at `focus.$ontario-focus-box-shadow`.

Use a disposable copy of the package to construct a broken archive if a historical
archive is unavailable. Do not remove the fix from production source or publish
the intentionally broken archive. The same fixture should pass again against the
fixed archive.

Initial validation exercised this failure naturally: the existing local build
still lacked the forward, and the isolated consumer failed with `Undefined
variable`. Rebuilding global-styles from the already patched source made both
examples pass. This verifies the missing-forward regression, but does not claim
that a historical 9.2.x npm archive was tested.

## Scope and next steps

This first step checks the locally packaged Sass consumer contract. It does not
check browser appearance, framework bundlers, every public Sass API, or npm's
published copy. It does not change styles or release workflows.

After agreeing the proposal:

- Run this command against built artifacts in CI and make publishing depend on
  its success. Ensure the release process does not alter the tested Sass payload
  afterward.
- Reuse the fixture after release by installing the exact published version in an
  isolated project; agree bounded registry-availability retries and alert routing.
- Add consumer examples for other supported imports and APIs as compatibility
  requirements are identified.
