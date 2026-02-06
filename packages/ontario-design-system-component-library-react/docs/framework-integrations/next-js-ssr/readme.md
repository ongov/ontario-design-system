# Custom Setup Guide for Using Ontario Design System in a Next.js Project

This guide outlines how to extend a standard NextJS setup to integrate the Ontario Design System React component library with support for server-side rendering (SSR). Below are the high-level steps, followed by detailed explanations to get started.

## Key Steps:

1. [Install the Ontario Design System React Component Library](#1-install-the-ontario-design-system-react-library)
2. [Configure SSR with Stencil Web Components](#2-configure-ssr-with-stencil-web-components)
3. [Adjust `tsconfig.json` for Compatibility](#3-adjust-tsconfigjson-for-compatibility)
4. [Set Up Global Styles](#4-set-up-global-styles)
5. [Copy Design System Assets](#5-copy-design-system-assets)
6. [Troubleshoot Common Issues](#6-troubleshoot-common-issues)

---

## Why SSR Matters for the Ontario Design System

The Ontario Design System includes Stencil-based Web Components, which are designed to be framework-agnostic and highly performant. When using these components in a Next.js application, enabling SSR brings several key benefits:

- **Improved SEO**: SSR ensures that content is rendered on the server and is crawlable by search engines, which is critical for public sector websites that must be accessible and discoverable.
- **Faster Time-to-Interactive**: By rendering components on the server, users see meaningful content sooner, improving the perceived performance of your application.
- **Accessibility Compliance**: SSR helps ensure that assistive technologies (such as screen readers) can immediately access the full page structure without waiting for JavaScript to load.

## When SSR Might Not Be Necessary

SSR provides many benefits in terms of performance, SEO, and accessibility, however, there are cases where its use may not be necessary. Understanding when to opt out of SSR can help improve client-side performance and reduce server load. Below are situations where SSR might be unnecessary:

- **Client-only Pages**: Pages that rely on user interaction (e.g., modals, dashboards) can be rendered client-side without affecting SEO or performance.
- **Non-critical UI Elements**: Components that don't impact SEO or accessibility, such as decorative elements, can be rendered client-side.

While these cases may not need SSR, it is strongly recommended for most public-facing pages.

---

## 1. Install the Ontario Design System React Library

To get started, install the React component library:

```bash
npm install --save @ongov/ontario-design-system-component-library-react
```

Then, import and use the components in your project:

```tsx
import { OntarioButton } from '@ongov/ontario-design-system-component-library-react';

<OntarioButton type="primary">Click me!</OntarioButton>;
```

For detailed documentation on individual components, please refer to the official component documentation.

---

## 2. Configure SSR with Stencil Web Components

To enable server-side rendering of Stencil Web Components in your Next.js project, use the @stencil/ssr Next utility.

### Update `next.config.mjs`

Modify your `next.config.mjs` with the following configuration:

```tsx
import stencilSSR from '@stencil/ssr/next';

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

### Explanation of Options:

**`hydrateModule`:** Specifies the hydration module from Stencil.

**`module`:** Dynamically imports the Ontario Design System React wrapper.

**`from`:** Specifies the source package for the components.

**`serializeShadowRoot`:** Use the scoped key for components that use scoped shadow DOM. All other components default to Declarative Shadow DOM.

---

## 3. Adjust `tsconfig.json` for Compatibility

To ensure compatibility with Stencil and Next.js, adjust your tsconfig.json as follows:

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

### Key Points:

**`moduleResolution`:** `"bundler"`: Required for compatibility with certain ESM packages (like Stencil output).

**`jsx`:** `"preserve"`: Allows Next.js to control JSX transformation.

**`paths`:** Optional aliasing for cleaner imports.

---

## 4. Set Up Global Styles

The Ontario Design System provides a global stylesheet that includes foundational styles such as typography, spacing, and base element resets. These styles are not automatically applied and must be manually imported into your application.

### Install Global Styles Package (If Not Already Installed)

The global styles package is typically installed as a transitive dependency of the component library. It its missing or you encounter style-related errors, install it directly:

```bash
npm add @ongov/ontario-design-system-global-styles
```

### Import Styles

#### App Router Example (`app/layout.tsx`)

If you're using the App Router:

```tsx
import '@ongov/ontario-design-system-global-styles/styles/scss/theme.scss';

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
```

#### Pages Router Example (`pages/_app.tsx`)

If you're using the Pages Router:

```tsx
import '@ongov/ontario-design-system-global-styles/styles/scss/theme.scss';

function MyApp({ Component, pageProps }) {
	return <Component {...pageProps} />;
}
export default MyApp;
```

---

## 5. Copy Design System Assets

The Ontario Design System includes essential assets (logos, fonts, etc.) that must be bundled with your app. Here's how to copy them:

### Locate the Assets

The assets are located in:
`node_modules/@ongov/ontario-design-system-component-library-react/dist/assets`

### Option 1: Manual Asset Copy Command

Run the following command to copy assets manually:

```bash
copyfiles -E -f "node_modules/@ongov/ontario-design-system-component-library-react/dist/assets/*" src/assets
```

### Option 2: Automate with `package.json` Scripts

Add these scripts to automate asset copying:

```json
"scripts": {
  "prebuild": "npm run copy:assets",
  "copy:assets": "npm run copy:images && npm run copy:favicons && npm run copy:fonts",
  "copy:favicons": "copyfiles -E -f \"./node_modules/@ongov/ontario-design-system-component-library-react/dist/assets/favicons/**\" public/assets/favicons",
  "copy:fonts": "copyfiles -E -f \"./node_modules/@ongov/ontario-design-system-component-library-react/dist/assets/fonts/**/*\" public/assets/fonts",
  "copy:images": "copyfiles -E -f \"./node_modules/@ongov/ontario-design-system-component-library-react/dist/assets/images/**\" public/assets"
}
```

---

## 6. Troubleshoot Common Issues

### Hydration Errors

**Symptom:** Text content did not match.

**Cause:** Mismatch between server-rendered and client-rendered output.

**Fix:**

- Wrap browser-only logic in `useEffect`.
- Avoid dynamic content during SSR.
- **Important**: Using `'use client'` in a component forces the component to be rendered client-side, effectively disabling SSR for that component. This should be used sparingly, as it overrides the SSR benefits.

  ```tsx
  'use client';

  useEffect(() => {
  	// Safe browser-only logic
  }, []);
  ```

### Missing Styles

**Symptom:** Components appear unstyled.

**Cause:** Global styles or assets not properly imported.

**Fix:**

- Ensure global styles are imported in layout files.
- Verify asset copying scripts are working.

### Performance Considerations

**Symptom:** Large bundle size or slow page loads.

**Fix:**

- Import only the needed components.
- Use dynamic imports for rarely used components:

  ```tsx
  const OntarioButton = dynamic(() =>
  	import('@ongov/ontario-design-system-component-library-react').then((mod) => mod.OntarioButton),
  );
  ```

### SSR Configuration Issues

**Symptom:** Components don’t render or throw hydration errors.

**Fix:**

- Double-check `next.config.mjs` and `tsconfig.json`.
- Ensure `serializeShadowRoot` is correctly configured.

## Support

Contact us at [design.system@ontario.ca](mailto:design.system@ontario.ca) for assistance with this package or via opening a [GitHub](https://github.com/ongov/ontario-design-system) [issue](https://github.com/ongov/ontario-design-system/issues).
