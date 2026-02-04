# Ontario Design System Complete Styles

- [Introduction](#introduction)
- [Installation and usage](#installation-and-usage)
- [Sass package resolution and the `NodePackageImporter`](#sass-package-resolution-and-the-nodepackageimporter)
- [Known issues](#known-issues)
- [Support](#support)

## Introduction

The Ontario Design System complete styles package can be used in place of the Ontario Design System component library packages if there is a need to still support HTML components from the [Ontario Design System distribution package](https://designsystem.ontario.ca/docs/documentation/for-developers/getting-started.html#about-the-distribution-package). This can be helpful for a SPA project that is transitioning to supporting the web components packages, or still needs to support HTML components but will utilize npm to control the styles.

The complete styles package includes the [Ontario Design System global styles](https://www.npmjs.com/package/@ongov/ontario-design-system-global-styles), along with component styles, assets, fonts, favicons and scripts that will provide all the necessary styles and functionality of the Ontario Design System.

## Installation and usage

To install the Ontario Design System complete styles package, run the following command:

```bash
npm install --save @ongov/ontario-design-system-complete-styles
```

### How to use this package

#### Styles & assets

To incorporate the Ontario Design System global and component styles into your project, you can either import CSS from the `dist/css/compiled` folder, or SCSS under `dist/styles/scss/theme.scss`.

The styles will automatically be linked to the fonts and assets (for most components).

Certain components - such as the header HTML - will likely require updating for the images (Ontario logos) to point to the correct asset directory within this package.

#### Scripts

Certain components in the [Ontario Design System distribution package](https://designsystem.ontario.ca/docs/documentation/for-developers/getting-started.html#about-the-distribution-package) require JavaScript scripts for their functionality to work. These scripts are included in the complete styles package under `dist/scripts`.

These scripts can also be ported over to your projects public assets for use.

### Incorporating assets into your project

You may want to move the assets mentioned above into your project so that they are available for bundling upon building your SPA application.

This can be done in a number of ways. One way is to use the [copyfiles](https://www.npmjs.com/package/copyfiles) npm package, which can be used with any operating system:

```bash
copyfiles -E -f \"node_modules/@ongov/ontario-design-system-complete-styles/dist/assets/**\" public/assets

copyfiles -E -f \"node_modules/@ongov/ontario-design-system-complete-styles/dist/favicons/**\" public/favicons

copyfiles -E -f \"node_modules/@ongov/ontario-design-system-complete-styles/dist/fonts/**\" public/fonts

copyfiles -E -f \"node_modules/@ongov/ontario-design-system-complete-styles/dist/scripts/**\" public/scripts
```

Another way is to add scripts to copy the assets in your `package.json` file. For example:

```json
"prebuild": "npm run copy:assets",
"copy:images": "copyfiles -E -f \"node_modules/@ongov/ontario-design-system-complete-styles/dist/assets/**\" public/assets",
"copy:favicons": "copyfiles -E -f \"node_modules/@ongov/ontario-design-system-complete-styles/dist/favicons/**\" public/favicons",
"copy:fonts": "copyfiles -E -f \"node_modules/@ongov/ontario-design-system-complete-styles/dist/fonts/**\" public/fonts",
"copy:scripts": "copyfiles -E -f \"node_modules/@ongov/ontario-design-system-complete-styles/dist/scripts/**\" public/scripts",
"copy:assets": "npm run copy:images && npm run copy:favicons && npm run copy:fonts && npm run copy:scripts"
```

## Sass package resolution and the `NodePackageImporter`

Modern Sass projects often rely on importing styles from npm packages. However, traditional Sass import resolution does not always align with Node.js' module resolution, making it difficult to use `@use` or `@forward` with package-based imports.

To address this, [Dart Sass](https://github.com/sass/dart-sass) introduced the `pkg:` URL scheme and the [`NodePackageImporter`](https://sass-lang.com/documentation/js-api/classes/nodepackageimporter/) in version **1.71.0**. This allows Sass to resolve imports using Node's algorithm, making it possible to reference SCSS files in npm packages in a way that's robust and future-proof.

### Why is this needed?

- Ensures that Sass can find and import styles from npm packages using the `pkg:` scheme.
- Prevents import errors when package locations or structures change.
- Enables more maintainable and portable Sass code in large, modular projects like the Ontario Design System.

### Minimum requirements

- Dart Sass (`sass` npm package) version: **1.71.0 or higher**
- Your build tool (webpack, Vite, etc.) must be configured to use the `NodePackageImporter`.

### How to use

For more details and advanced usage, see the official Sass documentation:  
https://sass-lang.com/documentation/js-api/classes/nodepackageimporter/

#### Using `pkg:` in Sass

Once enabled, you can reference npm packages in your Sass code with the `pkg:` scheme:

```scss
@use 'pkg:@ongov/ontario-design-system-complete-styles/dist/styles/scss/theme.scss';
```

#### JavaScript example

Add a new `NodePackageImporter()` instance to the `importers` option when compiling Sass:

```js
import * as sass from 'sass';

const result = await sass.compileAsync('input.scss', {
	importers: [new sass.NodePackageImporter()],
});
```

#### CLI example

```sh
sass --pkg-importer=node src/styles:dist/styles
```

**Note**: _If you do not use the `NodePackageImporter` or are on an older Sass version, the `pkg:` URL scheme will not work and you will see errors like_:

```
"Can't find stylesheet to import."
```

## Known issues

There are a few limitations to the complete styles project that we are working to resolve. These include:

### Broken SVGs

We are still working to fix how component SVGs work in SPA frameworks. A current workaround to this may be to download the SVG's needed for certain components from the [Ontario Design System Icons page](https://designsystem.ontario.ca/components/detail/icons-primary.html) and paste that SVG code into your HTML as needed.

### Broken scripts

The `back-to-top` and `ontario-expand-collapse` scripts were developed as a sample to fit the needs of a static HTML page. For now, you will need to customize the JavaScript code to fit within the constraints of your project.

### Missing styles

There are also a few missing component styles in the complete styles package. We are still working on building parity between the Ontario Design System distribution package and our web components packages. These missing component styles currently include:

- Tables
- Accordions
- Date Inputs
- Error states

## Support

Contact us at [design.system@ontario.ca](mailto:design.system@ontario.ca) for assistance with this package.
