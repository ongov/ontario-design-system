# Ontario Design System Internal Developer Documentation

Welcome to the developer documentation for the Ontario Design System monorepo!  
This guide is intended to help you understand the structure of the monorepo, set up your development environment, and contribute to the project.

---

## 🏗 **Monorepo Overview**

This monorepo contains multiple projects that work together to deliver a cohesive design sytem. Below is a brief description of each project:

### 1. [Ontario Design System Design Tokens](../../ontario-design-system-design-tokens)

- Contains raw values for design tokens (colours, fonts, layouts) used throughout the design system.
- Forms the foundation of all Ontario Design System npm packages.
- Can be used directly in projects that don’t require global styles.

### 2. [Ontario Design System Global Styles](../../ontario-design-system-global-styles)

- Shared base styles of the Ontario Design System (global styles, fonts, and assets for generic elements and layouts).
- Does not include component-specific styles.
- Suitable for building additional components using base styles.

### 3. [Ontario Design System Complete Styles](../../ontario-design-system-complete-styles)

- Comprehensive package with all Ontario Design System styles and assets.
- Includes global styles, fonts, logos, icons, and component-specific styles.
- Recommended starting point for upgrading from the distribution package.

### 4. Web Component Libraries

- **[Ontario Design System Component Library**](../../ontario-design-system-component-library): for HTML or frameworks without React/Angular.
- **[Ontario Design System React Component Library](../../ontario-design-system-component-library-react)**: for React applications (including Gatsby, Next.js).
- **[Ontario Design System Angular Component Library](../../ontario-design-system-component-library-angular)**: for Angular applications.

### 5. Example Projects

- **[Angular PoC App](../../app-angular):** Tests and builds examples using the Angular Web Component Library.
- **[React Poc App](../../app-react)**: Tests and builds examples using the React Web Component Library.

### 6. [Ontario Design System Web Components Documentation](../../app-web-components-documentation)

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

If you encounter any issues, please reach out to the development team.
