# Ontario Design System Component Library

![Built With Stencil](https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=flat-square)

- [Introduction](#introduction)
- [Installation and usage](#installation-and-usage)
- [Component documentation](#component-documentation)
- [Getting started for Design System developers](#getting-started-for-design-system-developers)
- [Support](#support)
- [References](#references)

## Introduction

Web Components are a set of web platform APIs that enable the creation of custom, reusable, encapsulated HTML tags to use in web pages and web apps. They allow for all logic, styles and component-specific layout to be handled in one place.

They are used in a similar way to other HTML elements, like `<input>` or `<button>`, that form the building blocks of the web.

The Ontario Design System component library package contains all the available Ontario Design System components and can be used anywhere that HTML and JavaScript are available.

The package also makes use of the [Ontario Design System global styles package](https://www.npmjs.com/package/@ongov/ontario-design-system-global-styles) for global styles and assets necessary for the Ontario Design System look and feel.

For more information on this package, [find it on NPM](https://www.npmjs.com/package/@ongov/ontario-design-system-component-library).

### Framework specific packages

Use this package if you are working with plain HTML or any framework/tooling that does not use a SPA framework. To use the Ontario Design System Web components for either Angular or React, please review instructions in the respective packages:

- [Ontario Design System Angular component library](https://www.npmjs.com/package/@ongov/ontario-design-system-component-library-angular)
- [Ontario Design System React component library](https://www.npmjs.com/package/@ongov/ontario-design-system-component-library-react)

## Installation and usage

There are two ways to install the Ontario Design System component library package into your project: through [npm](#installing-the-npm-package) or through a [CDN](#cdn).

### Installing the npm package

1. Install the npm package.

   ```bash
   npm install --save @ongov/ontario-design-system-component-library
   ```

2. Add the following script tags to your HTML to import the component library, adjusting the paths to fit your setup.

   ```html
   <link
   	rel="stylesheet"
   	href="node_modules/@ongov/ontario-design-system-global-styles/dist/styles/css/compiled/ontario-theme.css"
   />
   <script
   	type="module"
   	src="node_modules/@ongov/ontario-design-system-component-library/dist/ontario-design-system-components/ontario-design-system-components.esm.js"
   ></script>
   <script
   	nomodule
   	src="node_modules/@ongov/ontario-design-system-component-library/dist/ontario-design-system-components/ontario-design-system-components.js"
   ></script>
   ```

_Note_: When working with bundlers, like [Vite](https://vitejs.dev/), the component library and framework specific versions should work out of the box.

### CDN

A quick and easy way to get started with the Web Components without having to use a package is to use the published CDN version. The CDN used in this example is Unpkg, but other CDNs should work.

_Note_: The version number should be updated to match the version of the Web Components you want to use, for example, the version used here is `2.7.0`.

```html
<link
	rel="stylesheet"
	href="https://unpkg.com/@ongov/ontario-design-system-global-styles@2.7.0/dist/styles/css/compiled/ontario-theme.css"
/>
<script
	type="module"
	src="https://unpkg.com/@ongov/ontario-design-system-component-library@2.7.0/dist/ontario-design-system-components/ontario-design-system-components.esm.js"
></script>
<script
	nomodule
	src="https://unpkg.com/@ongov/ontario-design-system-component-library@2.7.0/dist/ontario-design-system-components/ontario-design-system-components.js"
></script>
```

### Usage

After installing the necessary styles and web components package, components can then be used as HTML elements within your site.

```html
<ontario-button type="primary">Click me!</ontario-button>
```

```html
<ontario-radio-buttons
	name="radios"
	hint-text="Hint text for the radio button group."
	caption='{
      "captionText": "Radio legend",
      "captionType": "heading"
   }'
	required="false"
	options='[
      {
         "value": "radio-option-1",
         "elementId": "radio-1",
         "label": "Radio option 1 label"
      },
      {
         "value": "radio-option-2",
         "elementId": "radio-2",
         "label": "Radio option 2 label",
         "hintExpander": {
            "hint": "Hint expander for radio option 2",
            "content": "Example hint expander content for radio option 2."
         }
      },
      {
         "value": "radio-option-3",
         "elementId": "radio-3",
         "label": "Radio option 3 label"
      },
      {
         "value": "radio-option-4",
         "elementId": "radio-4",
         "label": "Radio option 4 label"
      }
   ]'
	hint-expander='{
      "hint": "Hint expander for the radio button group",
      "content": "Example hint expander content for the radio button group."
   }'
>
</ontario-radio-buttons>
```

## Component documentation

For more information about using the Ontario Design System component library package web components, see [Using the components](https://designsystem.ontario.ca/docs/documentation/for-developers/web-components.html#using-the-components) in the [Ontario Design System Guidance](https://designsystem.ontario.ca).

## Getting started for Design System developers

To run the components in development mode, run:

```bash
npm start
```

To build the component for production, run:

```bash
npm run build
```

To run the unit tests for the components, run:

```bash
npm run test
```

## Support

Contact us at [design.system@ontario.ca](mailto:design.system@ontario.ca) for assistance with this package.

## References

[Stencil](https://stenciljs.com/) is a compiler for building fast web apps using Web Components.

Stencil combines the best concepts of the most popular frontend frameworks into a compile-time rather than run-time tool. Stencil takes TypeScript, JSX, a tiny virtual DOM layer, efficient one-way data binding, an asynchronous rendering pipeline (similar to React Fiber), and lazy-loading out of the box, and generates 100% standards-based Web Components that run in any browser supporting the Custom Elements v1 spec.

Stencil components are just Web Components, so they work in any major framework or with no framework at all.
