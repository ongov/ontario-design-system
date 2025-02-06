# Ontario Design System Complete Style

- [Introduction](#introduction)
- [Installation and usage](#installation-and-usage)
- [Known issues](#known-issues)
- [Support](#support)

## Introduction

The Ontario Design System complete styles package can be used in place of the Ontario Design System component library packages if there is a need to still support HTML components from the [Ontario Design System distribution package](https://designsystem.ontario.ca/docs/documentation/for-developers/getting-started.html#about-the-distribution-package). This can be helpful for a SPA project that is transitioning to supporting the web components packages, or still needs to support HTML components but will utilize pnpm to control the styles.

The complete styles package includes the [Ontario Design System global styles](https://www.npmjs.com/package/@ongov/ontario-design-system-global-styles), along with component styles, assets, fonts, favicons and scripts that will provide all the necessary styles and functionality of the Ontario Design System.

## Installation and usage

To install the Ontario Design System complete styles package, run the following command:

```bash
pnpm install --save @ongov/ontario-design-system-complete-styles
```

### How to use this package

#### Styles & Assets

To incorporate the Ontario Design System global and component styles into your project, you can either import CSS from the `dist/css/compiled` folder, or SCSS under `dist/styles/scss/theme.scss`.

The styles will automatically be linked to the fonts and assets (for most components).

Certain components - such as the header HTML - will likely require updating for the images (Ontario logos) to point to the correct asset directory within this package.

#### Scripts

Certain components in the [Ontario Design System distribution package](https://designsystem.ontario.ca/docs/documentation/for-developers/getting-started.html#about-the-distribution-package) require JavaScript scripts for their functionality to work. These scripts are included in the complete styles package under `dist/scripts`.

These scripts can also be ported over to your projects public assets for use.

### Incorporating assets into your project

You may want to move the assets mentioned above into your project so that they are available for bundling upon building your SPA application.

This can be done in a number of ways. One way is to use the [copyfiles](https://www.npmjs.com/package/copyfiles) pnpm package, which can be used with any operating system:

```bash
copyfiles -E -f \"node_modules/@ongov/ontario-design-system-complete-styles/dist/assets/**\" public/assets

copyfiles -E -f \"node_modules/@ongov/ontario-design-system-complete-styles/dist/favicons/**\" public/favicons

copyfiles -E -f \"node_modules/@ongov/ontario-design-system-complete-styles/dist/fonts/**\" public/fonts

copyfiles -E -f \"node_modules/@ongov/ontario-design-system-complete-styles/dist/scripts/**\" public/scripts
```

Another way is to add scripts to copy the assets in your `package.json` file. For example:

```json
"prebuild": "pnpm run copy:assets",
"copy:images": "copyfiles -E -f \"node_modules/@ongov/ontario-design-system-complete-styles/dist/assets/**\" public/assets",
"copy:favicons": "copyfiles -E -f \"node_modules/@ongov/ontario-design-system-complete-styles/dist/favicons/**\" public/favicons",
"copy:fonts": "copyfiles -E -f \"node_modules/@ongov/ontario-design-system-complete-styles/dist/fonts/**\" public/fonts",
"copy:scripts": "copyfiles -E -f \"node_modules/@ongov/ontario-design-system-complete-styles/dist/scripts/**\" public/scripts",
"copy:assets": "pnpm run copy:images && pnpm run copy:favicons && pnpm run copy:fonts && pnpm run copy:scripts"
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
