# Ontario Design System – Next.js Visual Testing App

This project is a **Next.js application** that integrates the [Ontario Design System](https://designsystem.ontario.ca) component library, which is built using [Stencil](https://stenciljs.com/) and distributed as React components.

It is primarily used to enable **visual regression testing (VRT)** of the component library and ensure rendering consistency in different states.

---

## Tech Stack

- **Next.js**: Framework for React-based server-side rendering.
- **Stencil (React Output)**: Web components consumed as React components via `@stencil/react-output-target`.
- **@stencil/ssr/next**: Enables SSR support for Stencil components in Next.js.
- **Playwright**: End-to-end and VRT test framework.
- **Lerna + PNPM Workspaces**: Manages the monorepo structure and dependencies.

---

## Purpose

This project is designed to:

- **Render all available Ontario Design System components** in various states and combinations.
- **Run visual regression tests** on these components using Playwright.
- **Integrate with GitHub Actions CI** to catch UI discrepancies via automated testing.

---

## File Structure and Code Walkthrough

This application is intentionally small so it can act as a reference implementation for Next.js SSR and as a stable test harness for component coverage.

### Key Files and Directories

- `src/app/layout.tsx`: The App Router root layout. This is where the global Ontario Design System theme is imported so the app renders with the expected styles during SSR and after hydration.
- `src/app/page.tsx`: The landing page for the PoC. It acts as the starting point for navigating to component examples.
- `src/app/components/*/page.tsx`: Individual component example pages used to exercise components in realistic states. These pages are also the primary targets for Playwright E2E and VRT coverage.
- `src/app/ssr-test/page.tsx`: A focused SSR test page used to verify server-rendered component output and hydration behaviour.
- `src/app/client-test/page.tsx`: A client-side comparison page used when validating behaviour that only becomes available after hydration.
- `src/app/grid.tsx`: Shared layout helper used by example pages to keep demo content consistent.
- `next.config.mjs`: Configures Next.js SSR for the Stencil-generated React package through `@stencil/ssr/next`, including the hydrate module and shadow-root serialisation strategy.
- `package.json`: Defines the asset-copy workflow and the local, Docker, E2E, and VRT scripts used by the app.
- `playwright.config.ts`: Central Playwright configuration for browser coverage, snapshot paths, and the local web server used during tests.
- `public/assets`: Static Ontario Design System assets copied from the React package before build and start, including fonts, favicons, and shared images used by components.
- `tests`: Playwright coverage for the PoC. E2E tests verify behaviour, while VRT tests and `vrt-snapshots` capture rendering regressions.

### How the Pieces Fit Together

1. The app imports Ontario Design System global styles in `src/app/layout.tsx` so the server-rendered output and hydrated client output share the same theme baseline.
2. `next.config.mjs` wraps the app with Stencil SSR support so React wrappers can render component markup on the server using the hydrate module.
3. Before `build` and `start`, the scripts in `package.json` copy required fonts, favicons, and images into `public/assets` so component asset paths resolve correctly.
4. Example routes under `src/app/components` provide a living catalogue of component usage patterns and double as test fixtures for automation.
5. Playwright uses those routes to run E2E and VRT coverage, with Docker-based scripts available to keep snapshot generation aligned with CI.

---

# Running the Project Locally

To run the project with all required assets (fonts, images, favicons), after installing all use the **build and start flow**:

```bash
pnpm run build
pnpm run start
```

This ensures:

- Assets from the Ontario Design System library are copied correctly to the public/ folder
- The app is fully production-ready and mirrors what gets deployed or tested in CI

---

# Testing

## Updating VRT Snapshots with Docker

This project uses [Playwright](https://playwright.dev/) for visual regression testing (VRT). To ensure consistent snapshot updates across environments, tests are run in a Docker container that mirrors the GitHub Actions setup. Running tests in Docker ensures that snapshot generation is consistent with the GitHub Actions CI environment — minimizing pixel diffs due to OS/browser rendering discrepancies. Snapshot updates and test runs are controlled via `pnpm` scripts in this package.

### Prerequisites

Before running tests or starting local development, ensure you have [Rancher Desktop](https://rancherdesktop.io/) installed and running on your machine. Rancher Desktop provides the container runtime environment required for this project.

#### Install Rancher Desktop

- Download Rancher Desktop from the official site: https://rancherdesktop.io/
- Follow the installation instructions for your operating system.
- During setup, you can disable Kubernetes.
- The default container runtime is containerd — no changes are needed.

Start Rancher Desktop to ensure the container runtime is active.

---

### Step 1: Build the VRT Docker Container

```bash
pnpm run docker:build-playwright
```

This builds the Docker container using `docker/playwright/Dockerfile` and mounts the repo via `docker/docker-compose.yml`.

### Step 2: Run VRT Tests

To run tests only (no snapshot updates):

```bash
pnpm run test:vrt:docker
```

To update snapshots:

```bash
pnpm run test:update-snapshots:docker
```

Both commands use Docker Compose under the hood and will:

- Mount the current repo into the container
- Navigate to `/app/packages/app-nextjs`
- Run the associated Playwright script
- Remove the container after it finishes (via --rm)

In most cases, the snapshot script will need to be run and the new snapshots committed in order for the CI pipelines to pass.

### Optional: Clean Up Docker Resources

If you're running into disk space issues or stale containers/images, you can clean up:

```bash
docker system prune
```

This removes:

- Stopped containers
- Unused networks
- Dangling images and build cache

Use with care — read the prompt before confirming.

#### Notes

- Snapshots are saved to the `vrt-snapshots/` folder inside each component within the `tests` folder.
- Docker ensures consistency with CI snapshots by running the same base OS and browser environment.
- You do not need to run pnpm install manually — all dependencies are handled in the container.

## Running E2E and VRT tests locally

This project provides scripts to run Playwright-based E2E and VRT tests. However, visual regression tests (VRT) are not recommended to run locally unless you're explicitly updating snapshots.

### Why avoid local VRT test runs?

Visual tests rely on pixel-perfect rendering, which can vary based on:

- Your local operating system
- Browser rendering engines
- Installed system fonts or rendering backends (e.g., CoreText vs. Freetype)

As a result, tests may pass locally but fail in CI — even if nothing is visually broken.

Run VRT locally only inside the provided Docker container, which matches the CI environment (same OS, Playwright version, browsers, and fonts). This makes your local snapshots consistent with CI.

### Local Test Commands

| Purpose                                        | Script                                  |
| ---------------------------------------------- | --------------------------------------- |
| Update snapshots in CI-matching Docker env     | `pnpm run test:update-snapshots:docker` |
| Run VRT in CI-matching Docker env              | `pnpm run test:vrt:docker`              |
| Run VRT tests locally (might not match CI env) | `pnpm run test:vrt`                     |
| Run E2E tests locally                          | `pnpm run test:e2e`                     |
| Update snapshots using local engine            | `pnpm run test:update-snapshots`        |
