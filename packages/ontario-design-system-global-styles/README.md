Global Style Package
---------------------

 * Introduction
 * Architecture
 * Naming convention
 * Recommended modules
 * Installation
 * Configuration
 * Troubleshooting
 * FAQ

### Introduction

This is a repository for the global styles package that is required to use the Ontario Design System components. It will include all of the global styles that are used for more generic elements and layouts.

### Artchitecture

For this package, we are using Harry Roberts' Inverted Triangle CSS (ITCSS) method of organizing code. The inverted triangle organizes code along three axes:

- Generic to explicit
- Low specificity to high specificity
- Far-reaching to localized

That means that styles that appear in the beginning of the project tend to be general styles that affect large pieces of the DOM, while styles that appear later target very specific elements in explicit ways.

In ITCSS, there is a concept of breaking down the CSS into layers. With the top layer holding the most general styles, and the bottom layer holding more specific styles. For the global styles package, we have broken the structure into the following layers:

  Variables: 
    Since this layer contains all the variables that will be used in the SCSS partials, it needs to be the first partial to be imported into the style sheet. This includes settings for vendor frameworks like Foundation. If you would like to define variables for re-use in a specific component, please keep it local to that component file, for ease of future maintenance.
    The variables layer holds the following folders: Breakpoints, Colours, Global, Grid, Spacing, Typography.
    
    Note: These files should not generate any CSS 

  Tools: 
    This layer will include globally available functions, mixins, and placeholders that we might want to use throughout our SCSS partials. They should not be specific to one component. 
    The tools layer holds the following folders: Functions, Mixins, Placeholders
    
    Note: These files should not generate any CSS 

  Generics: 
    Load in font-face declarations, any CSS resets, and colours.
    The Generics layer holds the following folders: Colours, Typography, Resets. 

  Elements: 
    This includes all base HTML elements (such as paragraph elements, headings, anchors, inputs, etc). These should only be element-level selectors, not classes or ids.
    The Elements layer holds the following folders: Generic. 

  Layout: 
    Non-structured design patterns, such as wrappers, containers, layout systems, typography, and media. Selectors here should have at most one class. This includes things like the grid and spacing. An object should be non-styling elements (ex. Border, padding, text-align, cursor, etc). 
    The Layout layer holds the following folders: Grid, Spacing.

  Overrides:
    Helper classes that should override all other patterns, for specific behaviours such as clearfixing, text alignment, etc.

These layers can then be imported to the theme.css file based on order of specificity. 

### Naming convention