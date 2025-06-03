# Ontario Design System React Component Library

![Built With Stencil](https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=flat-square)

- [Introduction](#introduction)
- [Installation and usage](#installation-and-usage)
- [Support](#support)

## Introduction

This library was generated using Stencil's React output target dependency. It is based off the [Ontario Design System Component Library](https://www.npmjs.com/package/@ongov/ontario-design-system-component-library) built using [Stencil](https://stenciljs.com/). For more information, [find it on NPM](https://www.npmjs.com/package/@ongov/ontario-design-system-component-library-react).

## Installation and usage

To find documentation on individual web components in this component library, please download and refer to our [component documentation](https://designsystem.ontario.ca/docs/documentation/for-developers/web-components.html#component-documentation).

To use the Ontario Design System React component library, follow these steps:

1. Install the pnpm package.

   ```bash
   pnpm install --save @ongov/ontario-design-system-component-library-react
   ```

2. Import the desired components from the component library.

   ```tsx
   import { OntarioButton } from '@ongov/ontario-design-system-component-library-react';
   import { OntarioBlockquote } from '@ongov/ontario-design-system-component-library-react';
   ```

### Usage

You can now use the React components in your component and template files.

```tsx
<OntarioButton type="primary">Click me!</OntarioButton>
```

```tsx
<OntarioBlockquote
	attribution="Survey respondent"
	quote="Access to high-quality child care is an issue that impacts our entire society."
></OntarioBlockquote>
```

### Local assets

Along with the components, the local assets (logos, fonts, etc.) need to be copied into your project so that they are available for bundling upon building your React application.

The assets in the pnpm package are located at `@ongov/ontario-design-system-component-library-react/dist/assets`, and should be copied to your public assets folder.

In a standard React application this can be done in a number of ways. One way is to use the [copyfiles](https://www.npmjs.com/package/copyfiles) pnpm package, which you can with any operating system:

```bash
copyfiles -E -f "node_modules/@ongov/ontario-design-system-component-library-react/dist/assets/*" src/assets
```

Another way is to add scripts to copy the assets in your `package.json` file. For example:

```json
"prebuild": "pnpm run copy:assets",
"copy:images": "copyfiles -E -f \"node_modules/@ongov/ontario-design-system-component-library-react/dist/component-library/assets/images/**\" src/assets",
"copy:favicons": "copyfiles -E -f \"node_modules/@ongov/ontario-design-system-component-library-react/dist/component-library/assets/favicons/**\" src/assets/favicons",
"copy:fonts": "copyfiles -E -u 6 \"node_modules/@ongov/ontario-design-system-component-library-react/dist/component-library/assets/fonts/**/*\" src/assets/fonts",
"copy:assets": "pnpm run copy:images && pnpm run copy:favicons && pnpm run copy:fonts"
```

## Custom Setup Guide for Using Ontario Design System in a Next.js Project

This guide outlines how to extend a standard [create-next-app](https://nextjs.org/docs/app/api-reference/cli/create-next-app) setup to integrate the [Ontario Design System React component library](https://www.npmjs.com/package/@ongov/ontario-design-system-component-library-react) with support for server-side rendering (SSR). Below are the key configuration steps and customizations to help get your project running

### Why SSR Matters for the Ontario Design System

The Ontario Design System includes Stencil-based Web Components, which are designed to be framework-agnostic and highly performant. However, when used in a Next.js application, enabling server-side rendering (SSR) offers several key benefits:

- Improved SEO: SSR ensures that content is rendered and crawlable by search engines, which is especially important for public sector websites that must be accessible and discoverable.
- Faster Time-to-Interactive: By rendering components on the server, users see meaningful content sooner, improving perceived performance.
- Accessibility Compliance: SSR helps ensure that assistive technologies can access the full structure of the page immediately.

### When SSR Might Not Be Necessary

When SSR Might Not Be Necessary

- **Client-only Pages**: If a page or component is only used after user interaction (e.g., modals, dashboards), rendering it on the client may be sufficient.
- **Non-critical UI Elements**: Decorative or non-essential components that don’t impact SEO or accessibility can be deferred to client-side rendering.

That said, for most public-facing pages using the Ontario Design System, enabling SSR is strongly recommended to meet performance, accessibility, and SEO standards.

### Installation and Usage

To begin using the Ontario Design System in your [Next.js](http://Next.js) project:

- Install the React component library: : `npm install --save @ongov/ontario-design-system-component-library-react`
- Import the desired components from the component library:
  `import { OntarioButton } from '@ongov/ontario-design-system-component-library-react';`

The React components can now be used in the component and template files of your project.
`<OntarioButton type="primary">Click me!</OntarioButton>`

For detailed documentation on individual components, please refer to the official [component documentation](https://designsystem.ontario.ca/docs/documentation/for-developers/web-components.html#component-documentation).

### Asset Copying for Design System

The Ontario Design System includes local assets, such as logos and fonts, that must be bundled with your application.

1. Locate the assets: The assets in the npm package are located at `@ongov/ontario-design-system-component-library-react/dist/assets`
2. Copy assets to your project, there are two ways to do this:
   a. Manual copy command:
   `copyfiles -E -f "node_modules/@ongov/ontario-design-system-component-library-react/dist/assets/*" src/assets`
   b. Automate with package.json scripts:
   `"prebuild": "npm run copy:assets",
   "copy:assets": "npm run copy:images && npm run copy:favicons && npm run copy:fonts",
   "copy:favicons": "copyfiles -E -f \"./node_modules/@ongov/ontario-design-system-component-library-react/dist/assets/favicons/**\" public/assets/favicons",
   "copy:fonts": "copyfiles -E -f \"./node_modules/@ongov/ontario-design-system-component-library-react/dist/assets/fonts/**/\*\" public/assets/fonts",
   "copy:images": "copyfiles -E -f \"./node_modules/@ongov/ontario-design-system-component-library-react/dist/assets/images/\*\*\" public/assets"

## Support

Contact us at [design.system@ontario.ca](mailto:design.system@ontario.ca) for assistance with this package or via opening a [GitHub](https://github.com/ongov/ontario-design-system) [issue](https://github.com/ongov/ontario-design-system/issues).
