# Ontario Design System Component Library - React Package

- [Introduction](#introduction)
- [Installation and usage](#installation-and-usage)
- [Support](#support)

## Introduction

This library was generated using Stencil's React output target dependency. It is based off the [Ontario Design System Component Library](https://www.npmjs.com/package/@ontario-digital-service/ontario-design-system-component-library) built using [Stencil](https://stenciljs.com/).

## Installation and usage

To find documentation on individual web components in this component library, please download and refer to our [component documentation](https://designsystem.ontario.ca/docs/documentation/for-developers/web-components.html#component-documentation).

To use the Ontario Design System React component library, follow these steps:

1. Install the NPM package.

   ```bash
   npm install --save @ontario-digital-service/ontario-design-system-component-library-react
   ```

2. Import the desired components from the component library.

   ```tsx
   import { OntarioButton } from '@ontario-digital-service/ontario-design-system-component-library-react';
   import { OntarioBlockquote } from '@ontario-digital-service/ontario-design-system-component-library-react';
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

The assets in the NPM package are located at `@ontario-digital-service/ontario-design-system-component-library-react/dist/assets`, and should be copied to your public assets folder.

In a standard React application this can be done in a number of ways. One way is to use the [copyfiles](https://www.npmjs.com/package/copyfiles) NPM package, which you can with any operating system:

```bash
copyfiles -E -f "node_modules/@ontario-digital-service/ontario-design-system-component-library-react/dist/assets/*" src/assets
```

Another way is to add scripts to copy the assets in your `package.json` file. For example:

```json
"prebuild": "npm run copy:assets",
"copy:images": "copyfiles -E -f \"node_modules/@ontario-digital-service/ontario-design-system-component-library-react/dist/component-library/assets/images/**\" src/assets",
"copy:favicons": "copyfiles -E -f \"node_modules/@ontario-digital-service/ontario-design-system-component-library-react/dist/component-library/assets/favicons/**\" src/assets/favicons",
"copy:fonts": "copyfiles -E -u 6 \"node_modules/@ontario-digital-service/ontario-design-system-component-library-react/dist/component-library/assets/fonts/**/*\" src/assets/fonts",
"copy:assets": "npm run copy:images && npm run copy:favicons && npm run copy:fonts"
```

## Support

Contact us at [design.system@ontario.ca](mailto:design.system@ontario.ca) for assistance with this package.
