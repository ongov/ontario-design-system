# Contributing to Ontario Design System

Thanks for contributing. This guide covers the minimum steps to get set up and submit changes.

## Quick Start

1. Clone the repository.
2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Build all libraries to verify your environment:

   ```bash
   pnpm run build-libs
   ```

   _Optional alternative_: run `pnpm refresh` for the full refresh flow (`clean`, `install`, and `build-libs`) defined in `package.json`. This is not required for initial setup because it already includes `pnpm install`.

4. Review key documentation:
   - Setup: [Setup Guide](documentation/internal-documentation/setup-guide.md)
   - Workflow and branching: [Contributing Guidelines](documentation/internal-documentation/contributing-guidelines.md)
   - Commit messages: [Commit Guidelines](COMMIT-GUIDELINES.md)
   - Package-specific docs: review each package README in [packages/](packages/) for local commands and conventions.

## Branch Naming

Internal team branches should use:

`[your-name]/[branch-type]/[issue-number]-[description]`

Examples:

- `scott/feature/DS-123-add-tooltip-a11y-text`
- `erin/bugfix/DS-456`

## External Contributions (Forks)

If you are contributing from outside the project team:

1. Fork the repository to your own GitHub account.
2. Create a descriptive branch in your fork (recommended), or contribute from your fork's default branch.
3. Push your branch to your fork.
4. Open a pull request from your fork branch to this repository's `develop` branch.

There is no required external branch naming convention.

## Commit Messages

This repository follows Conventional Commits.
External contributors should follow the same commit message rules as internal contributors.

Examples:

- `feat(ontario-button): add icon-only variant`
- `fix(ontario-input): prevent duplicate error message`

See full rules in [Commit Guidelines](COMMIT-GUIDELINES.md).

## Testing

Run tests before opening a pull request:

```bash
pnpm run test:unit
pnpm run test:e2e
```

## Pull Requests

1. Keep your branch up to date with `develop` (or `master` for hotfixes).
2. Open a pull request with:
   - A clear summary.
   - A linked Jira issue (internal contributors) or relevant GitHub issue/context (external contributors).
   - Testing notes.
3. Request review from appropriate team members.

## Code Standards

- Follow existing patterns and naming conventions.
- Use BEM and project SCSS guidance.
- Keep changes focused and scoped.

## Release Notes Impact

Use an appropriate Conventional Commit type for the change. Not everything should be `feat` or `fix`.

If your change should appear in release notes, use `feat` or `fix` with a clear subject line.

For other valid commit types (for example `docs`, `chore`, `refactor`, `test`), see [Non `feat` or `fix` commit prefixes](COMMIT-GUIDELINES.md#non-feat-or-fix-commit-prefixes).
