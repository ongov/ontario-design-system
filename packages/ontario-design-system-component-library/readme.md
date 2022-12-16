![Built With Stencil](https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=flat-square)

# Ontario Design System Web Components

Web Components are a set of web platform APIs that enable the creation of custom, reusable, encapsulated HTML tags to use in web pages and web apps. They allow for all logic, styles and component-specific layout to be handled in one place.

They are used in a similar way to other HTML elements, like `<input>` or `<button>`, that form the building blocks of the web.

The component library contains all the available Ontario Design System Web Components that can be used anywhere that HTML and JavaScript are available.

It also contains assets that can be copied for use within your project, such as logos and more.

Use this package if you are working with plain HTML or any framework/tooling that does not use React.

## Getting started for users

1. Install the NPM package.
   ```bash
   npm install --save @ontario-digital-service/ontario-design-system-component-library
   ```
1. Add the following script tags to your HTML to import the component library, adjusting the paths to fit your setup.
   ```html
   <script
   	type="module"
   	src="node_modules/@ontario-digital-service/ontario-design-system-component-library/dist/ontario-design-system-component-library/ontario-design-system-component-library.esm.js"
   ></script>
   <script
   	nomodule
   	src="node_modules/@ontario-digital-service/ontario-design-system-component-library/dist/ontario-design-system-component-library/ontario-design-system-component-library.js"
   ></script>
   ```
1. Components can then be used as HTML elements within your site.
   ```html
   <ontario-button type="primary">Click me!</ontario-button>
   ```

### CDN

A quick and easy way to get started with the Web Components without having to use a package is to use the published CDN version. The CDN used in this example is Unpkg, but other CDNs should work. _Note_: The version number should be updated to match the version of the Web Components you want to use, for example, the version used here is `2.2.0`.

```html
<script
	type="module"
	src="https://unpkg.com/@ontario-digital-service/ontario-design-system-component-library@2.2.0/dist/ontario-design-system-components/ontario-design-system-components.esm.js"
></script>
<script
	nomodule
	src="https://unpkg.com/@ontario-digital-service/ontario-design-system-component-library@2.2.0/dist/ontario-design-system-components/ontario-design-system-components.js"
></script>
```

### Local assets

Along with the components, the local assets (logos, fonts, etc.) need to be copied into your project so that they are available for bundling upon building your React application.

The assets in the NPM package are located at `@ontario-digital-service/ontario-design-system-component-library-react/dist/assets`, and should be copied to your public assets folder.

In a standard React application this can be done in a number of ways. One way is to use the copyfiles NPM package, which you can use with any operating system:

```bash
copyfiles -E -f "node_modules/@ontario-digital-service/ontario-design-system-component-library-react/dist/assets/*" public/assets
```

_**Pro tip**: If using a `package.json` file, add a script to make keeping the assets up-to-date simpler, for example use a `prebuild` script to copy the assets before each build._

### Using the components

For more information about using the Web Components see [Using the components](https://designsystem.ontario.ca/docs/documentation/for-developers/web-components.html#using-the-components) in the [Ontario Design System Guidance](https://designsystem.ontario.ca).

## Getting started for Design System developers

To start developing the Ontario Design System Components, clone this repo and run:

```bash
npm install
```

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
npm test
```

## Naming Components

When creating new component tags, they should be prefixed with the name `ontario`, eg. `<ontario-button>`. This gives the components a unique name within the DOM tree and makes working with them easier.

## Stencil

[Stencil](https://stenciljs.com/) is a compiler for building fast web apps using Web Components.

Stencil combines the best concepts of the most popular frontend frameworks into a compile-time rather than run-time tool. Stencil takes TypeScript, JSX, a tiny virtual DOM layer, efficient one-way data binding, an asynchronous rendering pipeline (similar to React Fiber), and lazy-loading out of the box, and generates 100% standards-based Web Components that run in any browser supporting the Custom Elements v1 spec.

Stencil components are just Web Components, so they work in any major framework or with no framework at all.
