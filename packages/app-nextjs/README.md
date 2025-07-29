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

Before running tests or starting local development, ensure you have Rancher Desktop installed and running on your machine. Rancher Desktop provides the container runtime environment required for this project.

Install Rancher Desktop

- Download Rancher Desktop from the official site: https://rancherdesktop.io/
- Follow the installation instructions for your operating system.
- During setup, you can disable Kubernetes.
- The default container runtime is containerd — no changes are needed.

Start Rancher Desktop to ensure the container runtime is active.

---

### Step 1: Build the VRT Docker Container

```bash
pnpm run docker:build-vrt
```

This builds the Docker container using the root `Dockerfile.vrt` and mounts the repo via the root `docker-compose.yml` file.

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
