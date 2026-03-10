# Custom Setup Guide for Using Ontario Design System in a Next.js Project

This guide outlines how to extend a standard Next.js setup to integrate the Ontario Design System React component library with support for server-side rendering (SSR). It introduces the core concepts behind SSR in Next.js, then walks through the practical setup needed to get the Ontario Design System working correctly in an App Router project.

## Key Steps:

1. [Install the Ontario Design System React Component Library](#1-install-the-ontario-design-system-react-library)
2. [Configure SSR with Stencil Web Components](#2-configure-ssr-with-stencil-web-components)
3. [Adjust `tsconfig.json` for Compatibility](#3-adjust-tsconfigjson-for-compatibility)
4. [Set Up Global Styles](#4-set-up-global-styles)
5. [Copy Design System Assets](#5-copy-design-system-assets)
6. [Configure Runtime Asset Path in App Router](#6-configure-runtime-asset-path-in-app-router)
7. [Language Prop in SSR](#7-language-prop-in-ssr)
8. [SSR and Hydration Notes for Forms](#8-ssr-and-hydration-notes-for-forms)
9. [Troubleshoot Common Issues](#9-troubleshoot-common-issues)
10. [Additional App Router Notes](#10-additional-app-router-notes)

---

## Why SSR Matters for the Ontario Design System

The Ontario Design System includes Stencil-based Web Components, which are designed to be framework-agnostic and highly performant. When using these components in a Next.js application, enabling SSR brings several key benefits:

- **Improved SEO**: SSR ensures that content is rendered on the server and is crawlable by search engines, which is critical for public sector websites that must be accessible and discoverable.
- **Faster Time-to-Interactive**: By rendering components on the server, users see meaningful content sooner, improving the perceived performance of your application.
- **Accessibility Compliance**: SSR helps ensure that assistive technologies such as screen readers can access the full page structure immediately without waiting for JavaScript to load.

## When SSR Might Not Be Necessary

SSR provides many benefits in terms of performance, SEO, and accessibility. However, there are cases where its use may not be necessary. Understanding when to opt out of SSR can help reduce server load and simplify client-heavy experiences.

- **Client-only Pages**: Pages that rely heavily on user interaction, such as dashboards or app-like authenticated views, can often be rendered on the client without affecting search visibility.
- **Non-critical UI Elements**: Components that do not impact SEO or accessibility, such as decorative or delayed-load elements, may not need SSR.

While these cases may not require SSR, it is still strongly recommended for most public-facing pages.

## Minimum Setup Checklist

- install the ODS React package and the Stencil Next.js SSR adapter
- import ODS global styles in the root layout
- wrap Next.js config with `@stencil/ssr/next`
- copy ODS runtime assets into `public`
- call `setAssetPath('/assets/ods/')` on the client
- use `/assets/ods/images/` for header and footer image assets

---

## 1. Install the Ontario Design System React Library

To get started, install the React component library:

```bash
npm install --save @ongov/ontario-design-system-component-library-react
```

Install the Stencil SSR adapter as a development dependency:

```bash
npm install --save-dev @stencil/ssr
```

If you plan to use Sass theme imports, also install:

```bash
npm install --save @ongov/ontario-design-system-global-styles sass
```

If you want to use the asset-copy scripts shown later in this guide, also install:

```bash
npm install --save-dev copyfiles
```

Then import and use components in your project:

```tsx
import { OntarioButton } from '@ongov/ontario-design-system-component-library-react';

<OntarioButton type="primary">Click me!</OntarioButton>;
```

---

## 2. Configure SSR with Stencil Web Components

To enable server-side rendering of Stencil Web Components in your Next.js project, use `@stencil/ssr/next`.

Install `@stencil/ssr` before updating `next.config.mjs`.

### Update `next.config.mjs`

Modify your `next.config.mjs` with the following configuration:

```tsx
import stencilSSR from '@stencil/ssr/next';

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default stencilSSR({
	module: import('@ongov/ontario-design-system-component-library-react'),
	from: '@ongov/ontario-design-system-component-library-react',
	hydrateModule: import('@ongov/ontario-design-system-component-library/hydrate'),
	serializeShadowRoot: {
		scoped: ['ontario-button'],
		default: 'declarative-shadow-dom',
	},
})(nextConfig);
```

### Explanation of Options

- **`hydrateModule`**: Specifies the Stencil hydration bundle used during server rendering.
- **`module` / `from`**: Identify the Ontario Design System React wrapper package that should be processed for SSR.
- **`serializeShadowRoot`**: Controls how shadow DOM is serialized. Use the `scoped` key for components that rely on scoped styles, and use Declarative Shadow DOM as the default for other components.

---

## 3. Adjust `tsconfig.json` for Compatibility

To ensure compatibility with Stencil and Next.js, adjust your `tsconfig.json` as follows:

```json
{
	"compilerOptions": {
		"moduleResolution": "bundler",
		"module": "ESNext",
		"jsx": "preserve",
		"plugins": [{ "name": "next" }],
		"paths": {
			"@/*": ["./src/*"]
		}
	}
}
```

### Key Points

- **`moduleResolution: "bundler"`** is recommended for compatibility with ESM packages such as Stencil output.
- **`jsx: "preserve"`** allows Next.js to manage JSX transformation.
- **`paths`** are optional aliases you can keep if your project already uses them.

---

## 4. Set Up Global Styles

The design system global styles include foundational styles such as typography, spacing, and base element resets. These styles are not applied automatically, so in a Next.js project you need to import them once at the application level so ODS components render with the expected visual treatment.

### App Router (`app/layout.tsx`)

```tsx
import '@ongov/ontario-design-system-component-library-react/styles';

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
```

If your toolchain has Sass `pkg:` resolution issues, use a documented fallback in your project and track the limitation so future maintainers understand why your style import differs from the default example.

---

## 5. Copy Design System Assets

The Ontario Design System includes required runtime assets such as images, fonts, and favicons. These files are not automatically copied into your Next.js public directory, so you need to make them available at build time or before local development starts.

### Asset Location

`node_modules/@ongov/ontario-design-system-component-library-react/dist/assets`

### Example automation in `package.json`

```json
{
	"scripts": {
		"prebuild": "npm run copy:assets",
		"copy:assets": "npm run copy:images && npm run copy:favicons && npm run copy:fonts",
		"copy:favicons": "copyfiles -E -f \"./node_modules/@ongov/ontario-design-system-component-library-react/dist/assets/favicons/**\" public/assets/ods/favicons",
		"copy:fonts": "copyfiles -E -f \"./node_modules/@ongov/ontario-design-system-component-library-react/dist/assets/fonts/**/*\" public/assets/ods/fonts",
		"copy:images": "copyfiles -E -f \"./node_modules/@ongov/ontario-design-system-component-library-react/dist/assets/images/**\" public/assets/ods/images"
	}
}
```

You can also run asset copy before `dev` and `start` to avoid missing assets in both local and production runtime. The important thing is that the copied files are available under `public` before the application tries to render components that depend on them.

---

## 6. Configure Runtime Asset Path in App Router

In App Router projects, add a small client provider to set the asset path once at runtime. This tells the component library where to load its runtime assets from after the application has been bundled and served by Next.js.

### Example `src/components/ods-provider.tsx`

```tsx
'use client';

import { useEffect } from 'react';
import { setAssetPath } from '@ongov/ontario-design-system-component-library-react';

export function OdsProvider() {
	useEffect(() => {
		setAssetPath('/assets/ods/');
	}, []);

	return null;
}
```

Then include it in `app/layout.tsx` so the asset path is initialized once for the whole application:

```tsx
<body>
	<OdsProvider />
	{children}
</body>
```

### Header and Footer image path note

For `OntarioHeader` and `OntarioFooter`, set:

```tsx
assetBasePath = '/assets/ods/images/';
```

Using `/assets/ods/` without `/images/` can cause missing logo and supergraphic requests because those components expect their image assets to resolve from the images directory specifically.

---

## 7. Language Prop in SSR

If your application supports multiple languages, pass the resolved `language` prop explicitly during SSR. Doing this ensures the server-rendered markup and the hydrated client state agree on which language should be shown from the first render onward.

- avoid relying on client-only locale detection for initial render
- ensure shell components and form controls receive the same resolved language
- keep the language value consistent between server render and hydration

```tsx
const language = resolvedLanguage === 'fr' ? 'fr' : 'en';

<OntarioHeader language={language} ... />
<OntarioFooter language={language} ... />
```

---

## 8. SSR and Hydration Notes for Forms

Form components deserve extra attention in SSR because their behaviour can differ before and after hydration. When validating a setup, test and document behaviour in both phases:

- **pre-hydration** (server-rendered output)
- **hydrated** (component runtime attached)

Recommended strategy:

- keep server-side validation authoritative
- treat component validation as a user-experience enhancement rather than the only source of truth
- do not assume native form submission behaviour is identical before and after hydration unless that behaviour is explicitly documented for the component

---

## 9. Troubleshoot Common Issues

### Hydration Errors

**Symptom:** Text content did not match, or other hydration mismatch warnings appear.

**Cause:** Mismatch between the server-rendered output and the client-rendered output.

**Fix:**

- Wrap browser-only logic in `useEffect`.
- Avoid non-deterministic content during SSR.
- **Important**: Using `'use client'` in a component forces that component to render client-side, which means it no longer benefits from SSR. Use it only where browser APIs or client-only interactivity are required.

  ```tsx
  'use client';

  useEffect(() => {
  	// Safe browser-only logic
  }, []);
  ```

### Missing Styles

**Symptom:** Components appear unstyled.

**Cause:** Global styles were not imported, or the required runtime assets were not copied correctly.

**Fix:**

- Ensure global styles are imported in the root layout.
- Verify that asset-copy scripts are running and that the expected files exist in `public`.
- If your build toolchain has style-resolution issues, use the documented fallback used by your project.

### Missing Header/Footer Images

**Symptom:** Logo or supergraphic does not load.

**Cause:** Header and footer assets use the images directory specifically, so a generic asset base path can point to the wrong location.

**Fix:**

- Verify that image assets exist under `public/assets/ods/images`.
- Set `assetBasePath` to `/assets/ods/images/` for `OntarioHeader` and `OntarioFooter`.

### Performance Considerations

**Symptom:** Large bundle size or slower-than-expected page loads.

**Fix:**

- Import only the components you need.
- Consider dynamic imports for components that are used infrequently or only in specific client-side flows.

  ```tsx
  import dynamic from 'next/dynamic';

  const OntarioButton = dynamic(() =>
  	import('@ongov/ontario-design-system-component-library-react').then((mod) => mod.OntarioButton),
  );
  ```

### SSR Configuration Issues

**Symptom:** Components do not render correctly, or hydration errors persist after basic checks.

**Cause:** SSR configuration is incomplete or inconsistent across `next.config.mjs`, `tsconfig.json`, and runtime asset setup.

**Fix:**

- Double-check `next.config.mjs`, `tsconfig.json`, and your asset-path setup.
- Ensure `serializeShadowRoot` is configured correctly for the components you are rendering.
- Confirm `setAssetPath('/assets/ods/')` runs on the client in App Router projects.

---

## 10. Additional App Router Notes

These patterns are useful in App Router projects, but they are not required to complete a basic ODS SSR setup. They are included here as reference material for teams that run into common routing or navigation questions after the core integration is already working.

### Step indicator back navigation in SPA flows

`OntarioStepIndicator` supports `backButtonUrl` (anchor) and `customOnClick` (app-controlled).

For SPA multi-step flows where client state should be preserved, prefer `customOnClick` with Next.js router navigation instead of relying solely on anchor-style back links.

### Next.js 16 dynamic params in client components

When a client component receives `params` as a Promise, unwrap it with `use(params)` so the component reads the resolved values in the way Next.js expects:

```tsx
'use client';

import { use } from 'react';

export default function Page({ params }: { params: Promise<{ locale: string }> }) {
	const resolvedParams = use(params);
	return <div>{resolvedParams.locale}</div>;
}
```

---

## Support

Contact us at [design.system@ontario.ca](mailto:design.system@ontario.ca) for assistance with this package or via opening a [GitHub](https://github.com/ongov/ontario-design-system) [issue](https://github.com/ongov/ontario-design-system/issues).
