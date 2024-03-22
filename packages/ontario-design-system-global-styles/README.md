# Ontario Design System Global Styles

- [Introduction](#introduction)
- [Installation and usage](#installation-and-usage)
- [Architecture](#architecture)
- [Naming Convention](#naming-convention)
- [Support](#support)
- [References](#references)

## Introduction

The Ontario Design System global styles package is required to use the Ontario Design System components.

It includes the Ontario Design System global styles that are used for more generic elements and layouts, as well as font assets and favicons.

## Installation and usage

To install the Ontario Design System global styles package, run the following command:

```bash
npm install --save @ongov/ontario-design-system-global-styles
```

### Using the global styles package

There are two ways to consume the Ontario Design System global styles package:

#### 1. Import everything

You can import the entire global styles package by including the following import statements.

**SCSS:**

```bash
@forward "@ongov/ontario-design-system-global-styles/dist/styles/scss/theme.scss";
```

**CSS:**

```bash
@forward "@ongov/ontario-design-system-global-styles/dist/styles/css/compiled/ontario-theme.css";
```

This will give you access to the complete package, and will load in all layers of the project, as defined in our [architecture section](#architecture).

#### 2. Import specific styles

Alternatively, you can be more granular by explicitly importing specific styles from the package instead. Note that this can only be done if using SCSS.

For example, if you only require our global variables, you can include the following [`@use`](https://sass-lang.com/documentation/at-rules/use) rule to import specific styles:

```bash
@use '@ongov/ontario-design-system-global-styles/dist/styles/scss/1-variables/global.variables' as globalVariables;
```

The `@use` rule loads mixins, functions, and variables from other Sass stylesheets, and combines CSS from multiple stylesheets together. In your SCSS, you would then reference one of these variables by including the namespace, followed by the variable you intend to use. For example:

```scss
.platform-banner {
	width: globalVariables.$full-width;
	max-width: globalVariables.$full-width;
}
```

## Architecture

For this package, we are using Harry Roberts' [Inverted Triangle CSS](https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture/) (ITCSS) method of organizing code. The inverted triangle organizes code along three axes:

- Generic to explicit
- Low specificity to high specificity
- Far-reaching to localized

That means that styles that appear in the beginning of the project tend to be general styles that affect larger pieces of the Design System, while styles that appear later target very specific elements in explicit ways.

In ITCSS, there is a concept of breaking down the CSS into layers, with the top layer holding the most general styles, and the bottom layer holding more specific styles. For the global styles package, we have broken the structure into the following layers:

### Variables:

This layer contains all variables that will be used throughought the SCSS partials. For that reason, it needs to be the first partial to be imported into the theme style sheet.

It is worth noting that the values in our variables are using tokens from the [Ontario Design Tokens Design Tokens package](https://www.npmjs.com/package/@ongov/ontario-design-system-design-tokens). Please check that package for more information.

The variables layer holds the following folders for the following variables: breakpoints, colours, font sizes, font weights, global, grid, letter spacing, line heights, spacing, typography and z-index helper variables.

**_Note: These files should not generate any CSS_**

### Tools:

This layer will include globally available functions, mixins, and placeholders that we use throughout our SCSS partials. These are not specific to one component.

**_Note: These files should not generate any CSS_**

### Generics:

This layer loads in font-face declarations, any CSS resets, and colours.

### Elements:

This layer includes all base HTML elements (such as paragraph elements, headings, anchors, inputs, etc). These only include element-level selectors, not classes or ids.

### Layout:

This layer includes styles for non-structured design patterns, such as wrappers, containers, layout systems, typography, and media. Selectors here have one class at most.

### Components:

This layer includes design patterns and UI pieces necessary for components. Note that the styles for components in this section are generic. To include specific styles for components, it is better to use the [Ontario Design System Component Library](https://www.npmjs.com/package/@ongov/ontario-design-system-component-library) or [Ontario Design System complete styles](https://www.npmjs.com/package/@ongov/ontario-design-system-complete-styles) packages.

### Overrides:

This layer includes helper classes that should override all other patterns for specific behaviours. It currently includes classes for spacing and visibility overrides.

## Naming convention

The Ontario Design System global styles package uses the Block Element Modifier (BEM) methodology for naming CSS classes and variables.

BEM allows for developers to see at a glance how classes relate to one another while maintaining the modularity of blocks.

The basic BEM convention goes: `.block-name__element-name--modifier-state`, with double underscores denoting relationships between elements, and double hyphens indicating variants and states.

- Blocks are independent components of the page.
  - _Example_: `.ontario-header`, `.ontario-footer`, `.ontario-row`, etc.
- Elements are children of blocks. An element can only have one parent block, and can’t be used independently outside of that block.
  - _Example_: `.ontario-fieldset__legend`, `.ontario-label__flag`, etc.
- A Modifier defines the look, state and behaviour of a block or an element. It contains only additional styles that change the original block implementation in some way. This allows you to set the appearance of a universal block only once, and add only those features that differ from the original block code into the modifier styles.

  - _Example_: `.ontario-input--2-char-width`, `.ontario-fieldset__legend--heading`. etc.

  ## Support

Contact us at [design.system@ontario.ca](mailto:design.system@ontario.ca) for assistance with this package.

## References

- BEM naming convention (http://getbem.com/)
- SASS compiler (https://sass-lang.com/)
- ITCSS architecture (https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture/)
- Design Tokens (https://css-tricks.com/what-are-design-tokens/)
