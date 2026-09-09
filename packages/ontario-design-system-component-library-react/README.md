# Ontario Design System React Component Library

![Built With Stencil](https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=flat-square)

- [Introduction](#introduction)
- [Installation and usage](#installation-and-usage)
  - [React usage](#react-usage)
  - [Next.js usage](#nextjs-usage)
- [Support](#support)

## Introduction

This library was generated using Stencil's React output target dependency. It is based on the [Ontario Design System Component Library](https://www.npmjs.com/package/@ongov/ontario-design-system-component-library) built using [Stencil](https://stenciljs.com/). For more information, [find it on NPM](https://www.npmjs.com/package/@ongov/ontario-design-system-component-library-react).

### React 19 support and tooling

This package targets React 19 and ships bindings that align with React 19's JSX/runtime expectations and tooling. React 18 is no longer supported by this package's peer dependencies.

### Next.js App Router guide

For Next.js-specific setup guidance, including SSR configuration and asset handling, use the official [Next.js integration guide](https://designsystem.ontario.ca/developer-docs/framework-integrations/next-js-ssr/).

### AI guidance file

This package ships a package-level `llms.txt` file with AI-oriented integration guidance.
Related package guidance is also available in:

- `@ongov/ontario-design-system-component-library`
- `@ongov/ontario-design-system-global-styles`

## Installation and usage

To find documentation on individual web components in this component library, please download and refer to our [component documentation](https://designsystem.ontario.ca/docs/documentation/for-developers/web-components.html#component-documentation).

To use the Ontario Design System React component library, follow these steps:

1. Install the npm package.

   ```bash
   npm install --save @ongov/ontario-design-system-component-library-react
   ```

2. Import the theme file into your project’s entry point.

   This package ships a precompiled, ready-to-use CSS file — no Sass compiler is required in your app's build pipeline:

   ```tsx
   import '@ongov/ontario-design-system-component-library-react/theme.css';
   ```

   This resolves to a single, monolithic `theme.css` file containing the Ontario Design System's base styles, global styles, and all component styles. It is pre-built with an `/assets` base path, so it expects fonts, images, and favicons to be available at `/assets` (see [Local assets](#local-assets) below for the copy step).

   > **TypeScript note:** if your project doesn't already have an ambient module declaration for `*.css` (some starter templates only declare `*.module.css`), add one to a `.d.ts` file included in your `tsconfig.json`, otherwise TypeScript will report "Cannot find module" for this side-effect import:
   >
   > ```ts
   > declare module '*.css';
   > ```

   If you need to override the asset base path (for example, if you serve fonts/images/favicons from a path other than `/assets`), you'll need to compile the Sass entry point yourself instead, so the `$asset-base-path` variable can be overridden at compile time. Create a local theme wrapper:

   ```scss
   // src/styles/ontario-theme.scss
   // Update `$asset-base-path` to match where your app serves Ontario Design System assets.
   @forward 'pkg:@ongov/ontario-design-system-component-library-react/styles/theme.scss' with (
   	$asset-base-path: '/your-assets-path'
   );
   ```

   Then import that wrapper in your app entry point, and make sure your bundler is configured to compile Sass (see [Next.js usage](#nextjs-usage) below for the `pkg:` resolution helper needed in that case).

3. Configure the asset path (recommended when assets are not served from `/`).

   ```tsx
   import { setAssetPath } from '@ongov/ontario-design-system-component-library-react';

   setAssetPath(`${window.location.origin}`);
   ```

   Call `setAssetPath` once, before rendering any components. This ensures Stencil can resolve component assets (fonts, images, favicons) when they are hosted under a custom base path. Pass `window.location.origin` (no `/assets/` suffix) — the library's internal asset helper appends the correct path segment automatically.

4. Import the desired components from the component library.

   ```tsx
   import { OntarioButton } from '@ongov/ontario-design-system-component-library-react';
   import { OntarioBlockquote } from '@ongov/ontario-design-system-component-library-react';
   ```

### React usage

No additional configuration is required.

Components can be improted directly:

```tsx
<OntarioButton type="primary">Click me!</OntarioButton>
```

```tsx
<OntarioBlockquote
	attribution="Survey respondent"
	quote="Access to high-quality child care is an issue that impacts our entire society."
></OntarioBlockquote>
```

### Next.js usage

The recommended path for most Next.js apps is to import the precompiled `theme.css` (see step 2 above) — no Sass configuration is required for this path, including with Turbopack.

The steps below (particularly the `pkg:` Sass resolution config) are only needed if you're compiling the Sass entry point yourself, for example to override `$asset-base-path`.

When using this package with Next.js App Router, three additional steps are recommended:

1. Configure Next.js for SSR and Sass `pkg:` support (only needed if compiling Sass yourself)

   Create or update `next.config.mjs` to include the following:

   ```mjs
   import stencilSSR from '@stencil/ssr/next';
   import { pkgImporter } from '@ongov/ontario-design-system-component-library-react/next/sass-pkg-importer';

   /** @type {import('next').NextConfig} */
   const nextConfig = {
   	sassOptions: {
   		importer: [pkgImporter],
   	},
   };

   export default stencilSSR({
   	module: import('@ongov/ontario-design-system-component-library-react'),
   	from: '@ongov/ontario-design-system-component-library-react',
   	hydrateModule: import('@ongov/ontario-design-system-component-library/hydrate'),
   })(nextConfig);
   ```

   #### Why this configuration is required

   The Ontario Design System Sass uses the `pkg:` import convention. This allows Sass files to resolve through the package `exports` field instead of relying on filesystem paths.

   While this works out of the box in other tools, Next.js does not currently resolve `pkg:` imports automatically.

   The `pkgImporter` helper adds this support by resolving `pkg:` specifiers to the correct Sass files in `node_modules`.

   If you're importing the precompiled `theme.css` instead (the default recommended path), skip this step — `pkg:` resolution is only relevant when compiling Sass.

2. Import theme styles

   ```scss
   // src/styles/ontario-theme.scss
   // Update `$asset-base-path` to match where your app serves Ontario Design System assets
   @forward 'pkg:@ongov/ontario-design-system-component-library-react/styles/theme.scss' with (
   	$asset-base-path: '/your-assets-path'
   );
   ```

3. Configure asset path (SSR-safe)

   ```ts
   import { setAssetPath } from '@ongov/ontario-design-system-component-library-react';

   if (typeof window !== 'undefined') {
      setAssetPath(`${window.location.origin/assets/}`);
   }
   ```

<hr />

### Sass (optional, only needed for customization)

Most consumers should use the precompiled `theme.css` described above and do not need Sass at all — this avoids the `sass`/`sass-embedded` `pkg:` importer workaround entirely.

If you need to customize the theme at compile time (for example, overriding `$asset-base-path`, or building your own modular subset of styles), you can still consume the Sass source directly:

```scss
@use 'pkg:@ongov/ontario-design-system-component-library-react/styles/theme.scss' as ods;
```

### Local assets

Along with the components, the local assets (logos, fonts, etc.) need to be copied into your project so that they are available for bundling upon building your React application.

The assets in the npm package are located at `@ongov/ontario-design-system-component-library-react/dist/assets`, and should be copied to your public assets folder.

In a standard React application this can be done in a number of ways. One way is to use the [copyfiles](https://www.npmjs.com/package/copyfiles) npm package, which you can with any operating system:

```bash
copyfiles -E -f "node_modules/@ongov/ontario-design-system-component-library-react/dist/assets/images/**" public/assets
```

Another way is to add scripts to copy the assets in your `package.json` file. For example:

```json
"prebuild": "npm run copy:assets",
"copy:images": "copyfiles -E -f \"node_modules/@ongov/ontario-design-system-component-library-react/dist/assets/images/**\" public/assets",
"copy:favicons": "copyfiles -E -f \"node_modules/@ongov/ontario-design-system-component-library-react/dist/assets/favicons/**\" public/assets/favicons",
"copy:fonts": "copyfiles -E -u 6 \"node_modules/@ongov/ontario-design-system-component-library-react/dist/assets/fonts/**/*\" public/assets/fonts",
"copy:assets": "npm run copy:images && npm run copy:favicons && npm run copy:fonts"
```

## Support

Contact us at [design.system@ontario.ca](mailto:design.system@ontario.ca) for assistance with this package or via opening a [GitHub](https://github.com/ongov/ontario-design-system) [issue](https://github.com/ongov/ontario-design-system/issues).
