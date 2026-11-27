# Patched Dependencies

Some dependencies are patched with [pnpm patches](https://pnpm.io/cli/patch). The patch files live in [`patches/`](../../patches) and are registered under `patchedDependencies` in [`pnpm-workspace.yaml`](../../pnpm-workspace.yaml). pnpm applies them on `pnpm install`.

A patch is tied to an exact dependency version. If that version is bumped, the patch has to be re-created, or dropped if it is no longer needed.

## `@stencil/ssr`: forward `slot` to the wrapper element

**Patch:** [`patches/@stencil__ssr@0.4.0.patch`](../../patches/@stencil__ssr@0.4.0.patch)

### Why

`@stencil/ssr` renders each Stencil component inside a `<div style="display: contents">` wrapper. It does not copy the `slot` attribute onto that wrapper, so in the server-rendered HTML the `slot` ends up on the inner custom element instead of on the wrapper that is the direct child of the parent. The browser only assigns direct children to a slot, so the component is never slotted.

In practice, this breaks any Stencil component that is passed into another component's named slot in the Next.js app:

- an icon in the `leading-icon` or `trailing-icon` slot of `ontario-button`
- a button in the `action` slot of `ontario-summary-list-item`

Plain elements, such as a `<span slot="...">`, are not wrapped and are not affected.

The patch adds `slot={props.slot}` to the three wrapper `div`s that `@stencil/ssr` generates.

### Upstream

- Issue: [stenciljs/output-targets#858](https://github.com/stenciljs/output-targets/issues/858)
- Fix: [stenciljs/output-targets#863](https://github.com/stenciljs/output-targets/pull/863)

### Where it matters in this repo

- `packages/app-nextjs` passes `slot` straight to icon components in the `ontario-button` demo page, which relies on the patch.
- `packages/app-nextjs/tests/stencil-ssr-slot-forwarding` has a fixture page and an e2e suite for the patch. Without it, the tests for slotted Stencil components fail, and the control tests for plain elements still pass.

The patch only applies inside this monorepo. Consumers of the published packages do not get it, so the component docs and the [Next.js SSR guide](../../packages/ontario-design-system-component-library-react/docs/framework-integrations/next-js-ssr/readme.md) tell them to wrap slotted Stencil components in a plain element with `slot` set.

### Removing the patch

Once a release of `@stencil/ssr` includes the upstream fix:

1. Bump `@stencil/ssr` to that version.
2. Remove the patch file and its entry under `patchedDependencies` in `pnpm-workspace.yaml`.
3. Run `pnpm install`.
4. Run the `app-nextjs` e2e tests. The `stencil-ssr-slot-forwarding` suite should pass without the patch.
5. Update the note at the top of `packages/app-nextjs/src/app/components/ontario-button/page.tsx`, and the guidance in the `ontario-button` readme and the Next.js SSR guide that tells consumers to use a wrapper.

### Re-creating the patch for a new version

If `@stencil/ssr` is bumped before the fix is released:

```
pnpm patch @stencil/ssr@<new-version>
```

Apply the same `slot={props.slot}` change to the three wrapper `div`s in the printed directory, then run `pnpm patch-commit <printed-directory>`. Update the entry in `pnpm-workspace.yaml` to the new version and run the `stencil-ssr-slot-forwarding` tests.

## Other patches

`patches/` also holds patches for `@semantic-release/github`, `conventional-changelog-angular` and `ngx-translate-routes`. They are registered in the same place in `pnpm-workspace.yaml`.
