# Scripts

This directory contains maintenance scripts for the
`@ongov/ontario-design-system-global-styles` package.

## `generate-scss-exports.mjs`

Regenerates SCSS-related entries in
`packages/ontario-design-system-global-styles/package.json` under the
`exports` field.

What it does:

- Scans `src/styles/scss` for underscore-prefixed SCSS partials (for example, `_tokens.scss`).
- Creates extensionless export aliases for those partials.
- Keeps canonical style export keys in a stable order.
- Preserves unrecognized existing export keys.
- Is idempotent: if SCSS inputs and existing canonical exports are unchanged, rerunning produces no diff.

Run from the repository root:

```bash
node packages/ontario-design-system-global-styles/scripts/generate-scss-exports.mjs
```

After running:

- Review changes in `packages/ontario-design-system-global-styles/package.json`.
- Commit the updated exports if they changed.
