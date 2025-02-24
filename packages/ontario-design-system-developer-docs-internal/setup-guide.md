# Setup Guide

## 1. System Requirements

- **Node.js:** v20.18.1
- **PNPM:** v10.2.0

## 2. Project Structure Overview

- `/packages` — Contains all projects (component libraries, styles, tokens, examples, documentation)
  - `/packages/app-web-components-documentation`, `/packages/ontario-design-system-developer-docs-internal` — Component library + internal developer documentation
  - `/packages/ontario-design-system-design-tokens`, `/packages/ontario-design-system-global-styles`, `/packages/ontario-design-system-complete-styles` — Design system styles
  - `/packages/ontario-design-system-component-library`, `/packages/ontario-design-system-component-library-react`, `/packages/ontario-design-system-component-library-angular` — Component libraries
  - `/packages/app-angular`, `/packages/app-react` — Example projects

## 3. 🚀 Running the Project

### Quick Start

Using [Lerna](https://github.com/lerna/lerna), this monorepo is composed of multiple packages that are linked together. Lerna manages the installation of dependencies and links internal packages within the repository.

To quickly get started, run:

```bash
pnpm install # Install the root packages
pnpm run refresh # Ready the project for development
```

_Note_: The refresh script combines cleaning, bootstrapping, and building to prepare the repository for development.

### Detailed Start

1. Installing Lerna

Lerna is required at the root level of the project. To install it, run:

```bash
pnpm install
```

2. Building Ontario Design System Packages

To build all the Ontario Design System packages, run:

```bash
pnpm run build-libs
```

This command will build all public packages and make them available for development within any application.

### Individual Project Scripts

Each project within the packages directory also contains scripts within its package.json file for specific tasks. Navigate to the desired project and refer to its README.md for detailed instructions. For example:

```bash
cd packages/app-react
pnpm start # Run the React example project
```

```bash
cd packages/ontario-design-system-component-library
pnpm run build # Build the component library
pnpm run start # Run the component library
```

These project-specific scripts ensure that you can work independently within any package as needed.

## 4. Testing

- Run all tests across the monorepo:

```bash
pnpm run test:e2e # Runs all e2e tests across monorepo
pnpm run test:unit # Runs all unit tests across monorepo
```

## 5. Common Issues & Troubleshooting

- **Dependency issues:** Clear lockfile or `node_modules` if needed
- **Permission issues:** Ensure PNPM is correctly installed and configured
- **Build/test failures:** Check logs for specific errors and verify that dependencies are correctly installed
