---
title: Next.js Server-Side Rendering (SSR)
---

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
