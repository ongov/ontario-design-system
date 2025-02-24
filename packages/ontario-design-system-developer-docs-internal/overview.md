# Ontario Design System Internal Developer Documentation

Welcome to the developer documentation for the Ontario Design System monorepo!  
This guide is intended to help you understand the structure of the monorepo, set up your development environment, and contribute to the project.

---

## 🏗 **Monorepo Overview**

This monorepo contains multiple projects that work together to deliver a cohesive design sytem. Below is a brief description of each project:

### 1. Ontario Design System Design Tokens

- Contains raw values for design tokens (colors, fonts, layouts) used throughout the design system.
- Forms the foundation of all Ontario Design System npm packages.
- Can be used directly in projects that don’t require global styles.

### 2. Ontario Design System Global Styles

- Shared base styles of the Ontario Design System (global styles, fonts, and assets for generic elements and layouts).
- Does not include component-specific styles.
- Suitable for building additional components using base styles.

### 3. Ontario Design System Complete Styles

- Comprehensive package with all Ontario Design System styles and assets.
- Includes global styles, fonts, logos, icons, and component-specific styles.
- Recommended starting point for upgrading from the distribution package.

### 4. Web Component Libraries

- **Ontario Design System Component Library**: for HTML or frameworks without React/Angular.
- **Ontario Design System Component Library (React)**: for React applications (including Gatsby, Next.js).
- **Ontario Design System Component Library (Angular)**: for Angular applications.

### 5. Example Projects

- **Angular App:** Tests and builds examples using the Angular Web Component Library.
- **React App**: Tests and builds examples using the React Web Component Library.

### 6. Ontario Design System Web Components Documentation

- Developer documentation for guidance, examples, and API documentation for the web components and the component library packages.

### 7. Internal Developer Documentation (this project)

Provides information for developers working on the monorepo, including:

- Project structure and setup instructions
- Coding guidelines and best practices
- Testing practices using Jest
- Release processes for npm packages

---

## 🧩 **Technology Stack**

- **Package Manager:** PNPM
- **Monorepo Management:** Lerna
- **Component Library:** Stencil
- **Frontend Frameworks:** React, Angular
- **Styling:** SCSS, Design Tokens
- **Testing:** Jest for unit and e2e tests

---

## 🚀 **Getting Started**

- Follow the [Setup Guide](./setup-guide.md) to configure your development environment.
- Refer to [Contributing Guidelines](./contributing-guidelines.md) for information on submitting changes.

If you encounter any issues, please reach out to the development team.
