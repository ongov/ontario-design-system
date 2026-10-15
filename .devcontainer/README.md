# VS Code Dev Container

This folder configures a [VS Code Dev Container](https://containers.dev/) that
gives contributors one complete, native environment for building, linting,
unit testing, and running e2e/vrt tests on the design system monorepo &mdash;
no separate Docker Compose scripts required.

## What it provides

- The standard Microsoft base image
  (`mcr.microsoft.com/devcontainers/base:ubuntu-24.04`), which ships a
  non-root `vscode` user (with passwordless `sudo`), git, and general VS Code
  Server compatibility out of the box.
- The official [`node` dev container feature](https://github.com/devcontainers/features/tree/main/src/node)
  for `nvm`/`corepack`/`pnpm` tooling with proper shell/PATH integration.
- `postCreate.sh` resolves the exact Node.js and pnpm versions to install
  from this repo's own `.nvmrc` and package.json `packageManager` field,
  rather than hardcoding version numbers in `devcontainer.json`, so there is
  a single source of truth to keep in sync.
- Playwright's browsers are installed directly (matching the exact version
  pinned in the component library's package.json), so e2e/vrt tests run
  natively in this one container.
- Named volumes shadow the root `node_modules` and the pnpm content-addressable
  store (`.pnpm-store`, pnpm's default workspace-relative store location as of
  pnpm 11) so dependencies/native binaries built for Linux inside the
  container never touch or overwrite a Mac/Windows host's own copies, and
  persist across container rebuilds. A separate volume caches Playwright's
  downloaded browser binaries for the same reason.
- Forwarded ports for the local dev servers: `3000` (`app-nextjs`), `4200`
  (`app-angular`), and `5173` (`app-react`, Vite).
- Recommended extensions: ESLint, Prettier, Stencil tooling, Angular
  language service, EditorConfig, Code Spell Checker, and Playwright.

## Usage

Open the repository (or a worktree of it) in VS Code and choose
**Dev Containers: Reopen in Container**. On first run, `postCreateCommand`
installs Node/pnpm, runs `pnpm install`, and installs Playwright's browsers
automatically &mdash; this can take a few minutes the first time, but is
cached afterward via the named volumes above.

Once created, run any `pnpm`, `stencil`, or `playwright` command directly
from an in-container terminal, for example:

```bash
pnpm run build-libs
pnpm --filter @ongov/ontario-design-system-component-library run test:unit
pnpm --filter @ongov/ontario-design-system-component-library run test:e2e
```

## Keeping versions in sync

`.nvmrc` and package.json's `packageManager` field remain the single source
of truth for tool versions; `postCreate.sh` reads them at container-creation
time; there is nothing to update in `devcontainer.json` when they change.

`.devcontainer/devcontainer-lock.json` pins the exact resolved version of the
`node` feature and is generated/updated automatically by the Dev Containers
CLI/extension; commit it alongside `devcontainer.json` changes.
