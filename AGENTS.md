# Repository Guidelines

## Project Structure & Module Organization

This repository is a `pnpm`/Lerna monorepo. Most work happens in [`packages/`](./packages):

- `ontario-design-system-component-library`: core Stencil web components (`src/`, `components/`, Playwright tests).
- `ontario-design-system-component-library-react` and `...-angular`: framework wrappers.
- `ontario-design-system-design-tokens`, `...-global-styles`, `...-complete-styles`: shared design assets.
- `app-nextjs`, `app-react`, `app-angular`: demo/integration apps.

Repo-level docs live in `documentation/`, automation scripts in `scripts/`, Docker helpers in `docker/`, and patches in `patches/`.

## Build, Test, and Development Commands

Use Node `22.22.x` and `pnpm 10.2.x` as defined by `.nvmrc` and `package.json`.

- `pnpm install`: install workspace dependencies.
- `pnpm run build-libs`: build all Ontario Design System libraries.
- `pnpm run build-apps`: build demo apps.
- `pnpm run refresh`: clean, reinstall, and rebuild libraries.
- `pnpm run test:unit`: run workspace unit tests.
- `pnpm run test:e2e`: run workspace end-to-end tests.
- `pnpm run test:all`: run unit and e2e suites together.
- `pnpm run format`: apply Prettier across TS/JS/JSON/MD files.

For package-specific work, run commands inside the package, for example `cd packages/app-nextjs && pnpm run dev`.

## Coding Style & Naming Conventions

Formatting is enforced with Prettier and `.editorconfig`: tabs for indentation, width `2`, single quotes, semicolons, trailing commas, and `printWidth: 120`. Follow existing TypeScript, Angular, React, and Stencil patterns in nearby files. Use BEM naming for SCSS classes. Keep changes narrow in scope and update package READMEs or docs when behavior changes.

- **Spelling:** Use Canadian spelling for anything that does not require American spelling, including UI strings, variables, and comments. Examples: `colour`, `centre`, `behaviour`.

## Testing Guidelines

Test tools vary by package:

- Stencil library: `stencil test --spec` and Playwright e2e tests.
- Angular packages/apps: `ng test` with Karma.
- Next.js app: Playwright `test:e2e` and `test:vrt`.

Name tests by framework convention already in the package, such as `*.spec.ts`, `*.e2e.ts`, and `*.vrt.ts`. Run the smallest relevant package suite first, then the root command before opening a PR.

## Commit & Pull Request Guidelines

Commits follow Conventional Commits and are linted by Husky/Commitlint. Preferred format: `type(scope): subject`, for example `feat(header): improve overflow menu accessibility`. Use lowercase imperative subjects and keep subject/body lines under 100 characters.

Open PRs against `develop` unless the change is a hotfix.

- **PR title format:** `DS-1234: concise subject`.
- **PR labels:** add labels before requesting review. Every non-Renovate PR must include at least one type label and one impacted package/area label. Add other applicable labels (for example release notes, breaking change, priority).
- **PR description:** include a clear summary, outlining the changes within the PR, the motivation for the change, and any relevant context.
- **Spelling in PR content:** use Canadian spelling in PR titles, descriptions, comments, docs, and code unless US spelling is required by an external API, third-party contract, or fixed identifier.
