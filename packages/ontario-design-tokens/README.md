Design Tokens Package
---------------------

 * [Introduction](#introduction)
 * [Tooling](#tooling)
 * [Architecture](#architecture)
 * [Configuration](#configuration)
 * [References](#references)

## Introduction

This is a repository for the design tokens package and is required for use of the Ontario Design System. It will include all of the design tokens that are used for more generic elements and layouts. 

### What is a design token? 

Design tokens are an agnostic way to store variables such as typography, colour, and spacing so that your design system can be shared across platforms like iOS, Android, and websites (referenced from here: https://css-tricks.com/what-are-design-tokens/). 

## Tooling

### Building the design tokens with Style Dictionary

Style Dictionary! Style Dictionary is a build system that allows you to define styles once, in a way for any platform or language to consume. A single place to create and edit your styles, and a single command exports these rules to all the places you need them - iOS, Android, CSS, JS, HTML, sketch files, style documentation, or anything you can think of. It is available as a CLI through NPM, but can also be used like any normal node module if you want to extend its functionality (referenced from here: https://amzn.github.io/style-dictionary/)

## Architecture

For this package, we have a 'tokens' folder, that holds sub-folders for different types of tokens that we have. The current token folder structure that we have is: 

- _Breakpoints_: This includes tokenss for different breakpoints in screen sizes, grid-columns, and text directions. 
- _Colour_: This includes all of the base colours used throughout the Design System. 
- _Global_: These are global design tokens for global values, such as a pixel value or a max value. 
- _Sizes_: This includes design tokens for font-sizes. 
- _Spacing_: This includes design tokens for different spacing values. 
- _Weights_: This includes design tokens for font-weights. 

## Configuration

If you want to add a new design token, you must go into one of the correct sub-folders, and include the token in JSON format. This means that the token will need a name, and a value. 

Let's say we want to add a new colour. First, we would go to the colour folder, and open up the `base.json` file. In this file, there are 3 sub-categories of colours: `greyscale`, `system`, and `accent`. Within these categories there are even more sub-categories. Let's say our colour is a dark colour, we would add this in by including the following object to the code:

```json
  "new-colour": {
    "value": "#111111"
  }
```

We would then save this file, and run the following command in the terminal: `npm run build`, which will then compile all of the tokens into the `build/variables.scss` file.

You can then access this token in the global styles package by referencing the following variables: `$ontario-colour-accent-dark-new-colour`


## References

 * [Style Dictionary](https://amzn.github.io/style-dictionary/)
 * [Design Tokens](https://css-tricks.com/what-are-design-tokens/)