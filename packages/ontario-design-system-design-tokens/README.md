# Design Tokens Package

- [Introduction](#introduction)
- [Tooling](#tooling)
- [Architecture](#architecture)
- [Configuration](#configuration)
- [References](#references)

## Introduction

The design tokens package includes all of the design tokens that are used for more generic elements and layouts. It is forms the base of the the Ontario Design System NPM packages, but can also be used to just access the design tokens directly in projects that don't want to use the Global Styles package, also provided by the Ontario Design System.

### What is a design token?

Design tokens are an agnostic way to store variables such as typography, colour, and spacing so that your design system can be shared across platforms like iOS, Android, and websites (referenced from here: https://css-tricks.com/what-are-design-tokens/).

## Tooling

### Building the design tokens with Style Dictionary

Style Dictionary is a build system that allows you to define styles once, in a way for any platform or language to consume. A single place to create and edit your styles, and a single command exports these rules to all the places you need them - iOS, Android, CSS, JS, HTML, sketch files, style documentation, or anything you can think of. It is available as a CLI through NPM, but can also be used like any normal node module if you want to extend its functionality (referenced from here: https://amzn.github.io/style-dictionary/)

## Architecture

For this package, we have a 'tokens' folder, that holds sub-folders for different types of tokens that we have. The current token folder structure that we have is:

- _Breakpoints_: This includes tokenss for different breakpoints in screen sizes, grid-columns, and text directions.
- _Colour_: This includes all of the base colours used throughout the Design System.
- _Global_: These are global design tokens for global values, such as a pixel value or a max value.
- _Sizes_: This includes design tokens for font-sizes.
- _Spacing_: This includes design tokens for different spacing values.
- _Weights_: This includes design tokens for font-weights.

## Configuration

### Adding a new design token

If you want to add a new design token, you must go into one of the correct sub-folders, and include the token in JSON format. This means that the token will need a name, and a value.

Let's say we want to add a new colour. First, we would go to the colour folder, and open up the `base.json` file. In this file, there are 3 sub-categories of colours: `greyscale`, `system`, and `accent`. Within these categories there are even more sub-categories. Let's say our colour is a dark colour, we would add this in by including the following plain object to the code:

```js
newColour: { value: "#111111"},
```

We would then save this file, and run the following command in the terminal:

```bash
npm run build
```

which will then compile all of the tokens into both the `dist/scss/variables.scss` and `dist/css/variables.css` files.

You can then access this token in the global styles package by referencing the following variables: `$ontario-colour-accent-dark-new-colour`

### Adding design tokens to your project

In order to use the design tokens in your project, it is first required to install the Ontario Design Tokens package. Within the context of using the Ontario Design System, design tokens are a dependency in the Ontario Design Global Styles Package. Therefore, any of the tokens added in this package, are being used as values in the variables that are set in the Ontario Design Global Styles Package. If you are not using the Ontario Design Global Styles Package, you can reference the tokens in the individual stylesheets for the component that you are using.

### Configuring Design Tokens in your project

In the the root of your projects repository, start by installing the Ontario Design Tokens package by running the following command in your terminal:

```bash
npm install @ontario-digital-service/ontario-design-system-design-tokens
```

Any styles that you have in your style sheet can now reference any of the values from the `variables.scss` file in the `ontario-design-system-design-tokens` package. If you are using [CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties), you can reference any of the CSS variables outlined in the `variables.css` file.

### Format types

Formats define the output of your created files. For example, to use your styles in CSS you use the `css/variables` format. This will create a CSS file containing the variables from your style dictionary. All of the different format types and how to output them are outlined here: https://amzn.github.io/style-dictionary/#/formats.

For the Design Tokens package, the tokens are configured to output both SCSS and CSS variables.

## References

- [Style Dictionary](https://amzn.github.io/style-dictionary/)
- [Design Tokens](https://css-tricks.com/what-are-design-tokens/)
