# Ontario Design System Internal Developer Documentation

Welcome to the developer documentation for the Ontario Design System monorepo!  
This guide is intended to help you understand the structure of the monorepo, set up your development environment, and contribute to the project.

## 🏗 **Monorepo Overview**

This monorepo contains multiple projects that work together to deliver a cohesive design sytem. Below is a brief description of each project:

### 1. [Ontario Design System Design Tokens](../../packages/ontario-design-system-design-tokens)

- Contains raw values for design tokens (colours, fonts, layouts) used throughout the design system.
- Forms the foundation of all Ontario Design System npm packages.
- Can be used directly in projects that don’t require global styles.

### 2. [Ontario Design System Global Styles](../../packages/ontario-design-system-global-styles)

- Shared base styles of the Ontario Design System (global styles, fonts, and assets for generic elements and layouts).
- Does not include component-specific styles.
- Suitable for building additional components using base styles.

### 3. [Ontario Design System Complete Styles](../../packages/ontario-design-system-complete-styles)

- Comprehensive package with all Ontario Design System styles and assets.
- Includes global styles, fonts, logos, icons, and component-specific styles.
- Recommended starting point for upgrading from the distribution package.

### 4. Web Component Libraries

- **[Ontario Design System Component Library](../../packages/ontario-design-system-component-library)**: for HTML or frameworks without React/Angular.
- **[Ontario Design System React Component Library](../../packages/ontario-design-system-component-library-react)**: for React applications (including Gatsby, Next.js).
- **[Ontario Design System Angular Component Library](../../packages/ontario-design-system-component-library-angular)**: for Angular applications.

### 5. Example Projects

- **[Angular PoC App](../../packages/app-angular):** Tests and builds examples using the Angular Web Component Library.
- **[React Poc App](../../packages/app-react)**: Tests and builds examples using the React Web Component Library.

### 6. [Ontario Design System Web Components Documentation](../../packages/app-web-components-documentation)

- Developer documentation for guidance, examples, and API documentation for the web components and the component library packages.

### 7. Internal Developer Documentation (this project)

Provides information for developers working on the monorepo, including:

- Project structure and setup instructions
- Coding guidelines and best practices
- Testing practices using Jest
- Release processes for npm packages

---

## 🧩 **Technology Stack**

- **Package Manager:** [PNPM](https://pnpm.io/)
- **Monorepo Management:** [Lerna](https://lerna.js.org/)
- **Component Library:** [Stencil](https://stenciljs.com/)
- **Frontend Frameworks:** [React](https://react.dev/), [Angular](https://angular.dev/)
- **Styling:** [SCSS](https://sass-lang.com/documentation/syntax/), Design Tokens
- **Testing:** [Jest](https://jestjs.io/) for unit tests, [Playwright](https://playwright.dev/) for E2E tests

---

## 🚀 **Getting Started**

- Follow the [Setup Guide](./setup-guide.md) to configure your development environment.
- Refer to [Contributing Guidelines](./contributing-guidelines.md) for information on submitting changes.

If you run into any issues, please contact the development team. You can reach us on Slack by tagging `@designsystem-dev` in the **#shared-co-design-system** channel or by emailing the Design System team at design.system@ontario.ca.

---

## 📦 **Publishing Strategy**

- **Versioning:** We use [Semantic Versioning](https://semver.org/) for all packages.
- **Publishing:** Packages are published to npm using [Lerna](https://lerna.js.org/) through our CI pipelines.
- **Release Process:** Ensure all tests pass and the code is reviewed before publishing. Follow the [release process guide](./release-process.md) for detailed steps.

## 🔄 **Development Workflow**

1. **Clone the Repository:** Clone the [monorepo](https://github.com/ongov/ontario-design-system) to your local machine.
2. **Install Dependencies:** Run `pnpm install` to install all dependencies.
3. **Create a Branch:** Create a new branch for your feature or bug fix. Information on branching can be found [here](./contributing-guidelines.md#branching).
4. **Develop:** Make your changes, following the [coding guidelines and best practices](./contributing-guidelines.md#code-standards).
5. **Test:** Run unit tests with `pnpm run test:unit` and E2E tests with `pnpm run test:e2e`.
6. **Commit and Push:** [Commit your changes](./contributing-guidelines.md#-contributing-guidelines) and push your branch to the remote repository.
7. **Create a Pull Request:** Open a pull request for your branch and request a code review. Make sure to label your pull request.
