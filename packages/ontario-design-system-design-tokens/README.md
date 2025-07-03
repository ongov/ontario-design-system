# Ontario Design System Design Tokens

- [Introduction](#introduction)
- [Installation and usage](#installation-and-usage)
- [Architecture](#architecture)
- [Tooling](#tooling)
- [Support](#support)
- [References](#references)

## Introduction

The Ontario Design System design tokens package includes all of the design tokens that are used for generic variables, elements and layouts in Design System styles.

It forms the base of the the Ontario Design System npm packages, but can also be used to access the design tokens directly in projects not using these packages.

### What is a design token?

[Design tokens](https://css-tricks.com/what-are-design-tokens/) are an agnostic way to store variables (such as typography, colours and spacing) so that your design system can be shared across platforms like iOS, Android and websites.

## Installation and usage

The Ontario Design System design tokens package can be installed by running the following command in your terminal:

```bash
npm install --save @ongov/ontario-design-system-design-tokens
```

### Using the design tokens package

After installing the package, any styles that you have in your stylesheet should be able to reference any of the values from the `variables.scss` file in the `ontario-design-system-design-tokens` package.

If you are using [CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties), you can reference any of the CSS variables outlined in the `variables.css` file.

#### Format types

Formats define the output of your created files. For example, to use your styles in CSS, you use the `css/variables` format. This will create a CSS file containing the variables from your style dictionary. All of the different format types and how to output them are outlined here: https://amzn.github.io/style-dictionary/#/formats.

For the Ontario Design System design tokens package, the tokens are configured to output both SCSS and CSS variables.

### Configuring design tokens in your project

#### Adding a new design token

If you want to add a new design token specific to your project, you must go into one of the correct sub-folders, and include the token in JSON format. This means that the token will need a name, and a value.

Let's say we want to add a new colour. First, you would go to the colour folder, and open up the `base.json` file. In this file, there are 3 sub-categories of colours: `greyscale`, `system`, and `accent`. Within these categories there are even more sub-categories.

Let's say our colour is a dark colour. You would add this in by including the following plain object to the code:

```js
newColour: { value: "#111111"},
```

You would then save this file, and run the following command in the terminal:

```bash
npm run build
```

This will then compile all of the tokens into both the `dist/scss/variables.scss` and `dist/css/variables.css` files.

You can then access this token in your stylesheet by referencing the following variables: `$ontario-colour-accent-dark-new-colour`.

## Architecture

For this package, we have a `tokens`` folder that holds sub-folders for different types of tokens that we have. The current token folder structure that we have is:

- **_Breakpoints_**: This includes tokens for different breakpoints in screen sizes, grid-columns, and text directions.
- **_Colour_**: This includes all of the base colours used throughout the Ontario Design System styles.
- **_Fonts_**: This includes tokens for the fonts used in the Ontario Design System styles.
- **_Global_**: These are global design tokens for global values, such as a pixel value or a max value.
- **_Sizes_**: This includes design tokens for font-sizes.
- **_Spacing_**: This includes design tokens for different spacing values.
- **_Weights_**: This includes design tokens for font-weights.
- **_Z-index_**: This includes design tokens for z-index values.

## Tooling

### Building the design tokens with Style Dictionary

[Style Dictionary](https://amzn.github.io/style-dictionary/) is a build system that allows you to define styles once, in a way for any platform or language to consume. It is a single place to create and edit your styles, with a single command exports these rules to all the places you need them - iOS, Android, CSS, JS, HTML, sketch files, style documentation, etc. It is available as a CLI through npm, but can also be used like any normal node module if you want to extend its functionality.

## Support

Contact us at [design.system@ontario.ca](mailto:design.system@ontario.ca) for assistance with this package.

## References

- [Style Dictionary](https://amzn.github.io/style-dictionary/)
- [Design Tokens](https://css-tricks.com/what-are-design-tokens/)
