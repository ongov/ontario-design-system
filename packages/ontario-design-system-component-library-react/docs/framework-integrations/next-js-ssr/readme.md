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

- Install the React component library: `npm install --save @ongov/ontario-design-system-component-library-react`
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

   ```json
   "prebuild": "npm run copy:assets",
   "copy:assets": "npm run copy:images && npm run copy:favicons && npm run copy:fonts",
   "copy:favicons": "copyfiles -E -f \"./node_modules/@ongov/ontario-design-system-component-library-react/dist/assets/favicons/**\" public/assets/favicons",
   "copy:fonts": "copyfiles -E -f \"./node_modules/@ongov/ontario-design-system-component-library-react/dist/assets/fonts/**/\*\" public/assets/fonts",
   "copy:images": "copyfiles -E -f \"./node_modules/@ongov/ontario-design-system-component-library-react/dist/assets/images/\*\*\" public/assets"
   ```

## Global Styles & SSR Integration Guide for Ontario Design System in Next.js

This section explains how to properly import global styles and configure server-side rendering (SSR) for Stencil-based components in a Next.js project using the Ontario Design System.

### Global Styles Import

The Ontario Design System provides a global stylesheet that includes foundational styles such as typography, spacing, and base element resets. These styles are not automatically applied and must be manually imported into your application.

1. Install the Global Styles Package

   The global styles package is typically installed as a transitive dependency of the component library. It its missing or you encounter style-related errors, install it directly:

   `npm add @ongov/ontario-design-system-global-styles`

2. Import the Stylesheet

   Add the following import to your main layout file to apply the global styles:

   `import '@ongov/ontario-design-system-global-styles/dist/styles/scss/theme.scss';`

### App Router Example (`app/layout.tsx`)

If you're using the App Router (e.g., `app/layout.tsx`), this import should go at the top of that file:

```tsx
// app/layout.tsx
import '@ongov/ontario-design-system-global-styles/dist/styles/scss/theme.scss';

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
```

### Pages Router Example (`pages/_app.tsx`)

If using the Pages Router, place the import at the top of `pages/_app.tsx`.

```tsx
import '@ongov/ontario-design-system-global-styles/dist/styles/scss/theme.scss';
function MyApp({ Component, pageProps }) {
	return <Component {...pageProps} />;
}
export default MyApp;
```

## Key Customizations

### Stencil SSR Integration

To enable server-side rendering of Stencil Web Components in your [Next.js project](http://next.js/), use the `@stencil/ssr` Next utility.

1. Configure next.config.mjs and update the code as follows:

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

- **hydrateModule** references the hydration code from the core Stencil package.
- **module**: Dynamically imports the Ontario Design System React wrapper.
- **from**: Specifies the source package for the components
- **`serializeShadowRoot`** is customized:
  - Components you wish to use the scoped shadow DOM should be added to this scoped key.
  - All other components default to Declarative Shadow DOM.

### Custom `tsconfig.json` Adjustments

To support modern bundler resolution and module formats required by Stencil + Next.js:

```json
"moduleResolution": "bundler",
"module": "ESNext",
"jsx": "preserve",
"plugins": [{ "name": "next" }],
"paths": {
     "@/*": ["./src/*"]
}
```

- **`"moduleResolution"`**: **`"bundler"`** is **not default** in Next.js — it's needed for compatibility with certain ESM packages (like Stencil output).
- **`"jsx"`**: **`"preserve"`** allows Next.js to control JSX transformation.
  Aliases (`@/*`) for cleaner imports — optional but worth documenting.

## Common Issues & Troubleshooting

1.  **Hydration Errors**

    **Symptom**: Text content did not match. Server: "..." Client: "..."

    **Cause**: Mismatch between server-rendered and client-rendered output.

    **Fix**:

    - Wrap browser-only logic in `useEffect`.
    - Avoid dynamic content during SSR.

    ```tsx
    useEffect(() => {
    	// Safe browser-only logic
    }, []);
    ```

2.  **Missing Styles**

    **Symptom**: Components appear unstyled.

    **Cause**: Global styles or assets not properly imported.

    **Fix**:

    - Ensure global styles are imported in layout files.
    - Verify asset copying scripts are working.

3.  **Browser-Only APIs in SSR**

    **Symptom**: SSR build fails or crashes.

    **Cause**: Use of window, document, or other browser APIs during SSR.

    **Fix**:

    ```tsx
    if (typeof window !== 'undefined') {
    	// Safe to use browser APIs
    }
    ```

4.  **Performance Considerations**

    **Symptom**: Large bundle size or slow page loads.

    **Fix**:

    - Import only needed components.
    - Use `dynamic` imports for rarely used components:

      ```tsx
      const OntarioButton = dynamic(() =>
      	import('@ongov/ontario-design-system-component-library-react').then((mod) => mod.OntarioButton),
      );
      ```

5.  **SSR Configuration Issues**

    **Symptom**: Components don’t render or throw hydration errors.

    **Fix**:

    - Double-check `next.config.mjs` and `tsconfig.json`.
    - Ensure `serializeShadowRoot` is correctly configured.

## Support

Contact us at [design.system@ontario.ca](mailto:design.system@ontario.ca) for assistance with this package or via opening a [GitHub](https://github.com/ongov/ontario-design-system) [issue](https://github.com/ongov/ontario-design-system/issues).
