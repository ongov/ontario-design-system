# Global Style Package

- [Introduction](#introduction)
- [Architecture](#architecture)
- [Naming Convention](#naming-convention)
- [Configuration](#configuration)
- [References](#references)

## Introduction

The global styles package that is required to use the Ontario Design System components. It it includes the Ontario Design System global styles that are used for more generic elements and layouts, as well as fonts and favicon files.

## Installation

```bash
npm install --save @ontario-digital-service/ontario-design-system-global-styles
```

## Architecture

For this package, we are using Harry Roberts' [Inverted Triangle CSS](https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture/) (ITCSS) method of organizing code. The inverted triangle organizes code along three axes:

- Generic to explicit
- Low specificity to high specificity
- Far-reaching to localized

That means that styles that appear in the beginning of the project tend to be general styles that affect large pieces of the DOM, while styles that appear later target very specific elements in explicit ways.

In ITCSS, there is a concept of breaking down the CSS into layers. With the top layer holding the most general styles, and the bottom layer holding more specific styles. For the global styles package, we have broken the structure into the following layers:

#### Variables:

Since this layer contains all the variables that will be used in the SCSS partials, it needs to be the first partial to be imported into the style sheet. This includes settings for vendor frameworks like Foundation. If you would like to define variables for re-use in a specific component, please keep it local to that component file, for ease of future maintenance.
It is worth noting that the values in our variables are using Design Tokens, which are defined in the Global Design Token package. Please check that package for more information.
The variables layer holds the following folders: Breakpoints, Colours, Global, Grid, Spacing, Typography.

_Note: These files should not generate any CSS_

#### Tools:

This layer will include globally available functions, mixins, and placeholders that we might want to use throughout our SCSS partials. They should not be specific to one component.
The tools layer holds the following folders: Functions, Mixins, Placeholders

_Note: These files should not generate any CSS_

#### Generics:

Load in font-face declarations, any CSS resets, and colours.
The Generics layer holds the following folders: Colours, Typography, Resets.

#### Elements:

This includes all base HTML elements (such as paragraph elements, headings, anchors, inputs, etc). These should only be element-level selectors, not classes or ids.

The Elements layer holds the following folders: Generic.

#### Layout:

Non-structured design patterns, such as wrappers, containers, layout systems, typography, and media. Selectors here should have at most one class. This includes things like the grid and spacing. An object should be non-styling elements (ex. Border, padding, text-align, cursor, etc).
The Layout layer holds the following folders: Grid, Spacing.

These layers can then be imported to the theme.css file based on order of specificity.

## Naming convention

The Global Styles Package, we are using the Block Element Modifier (BEM) methodology, which is used for naming CSS classes and variables. It works by breaking all classes in a codebase down into one of three groups:

#### Block

Sole root of the component and they are independent

##### Example

`.ontario-header`, `.ontario-site-nav`, `.ontario-image`, etc.

#### Element

A component part of the Block. An element can only have one parent block, and can’t be used independently outside of that block.

##### Example

`.ontario-footer__notice-links`, `.ontario-panel__image`, `.ontario-fact-block__heading`

#### Modifier

A variant or extension of the Block. The modifier defines the look, state and behaviour of a block or an element. It contains only additional styles that change the original block implementation in some way. This allows you to set the appearance of a universal block only once, and add only those features that differ from the original block code into the modifier styles.

##### Example

`.ontario-form-label--required`, `.ontario-form-input__button--clear`.

​​The basic BEM convention goes: `.block-name__element-name--modifier-state`, with double underscores denoting relationships between elements, and double hyphens indicating variants and states.

## Configuration

## References

- BEM naming convention (http://getbem.com/)
- SASS compiler (https://sass-lang.com/)
- ITCSS architecture (https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture/)
- Design Tokens (https://css-tricks.com/what-are-design-tokens/)
