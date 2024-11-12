![A depiction of the lower peddle of the Ontario Trillium logo, stylized in the colours of the Ontario Design System](readme-assets/ods-hero-banner.png 'Ontario Design System Hero Banner')

# Ontario Design System Components

This project contains the Ontario Design System Web Components and npm packages.

Web Components provide strong encapsulation for reusable components that can be integrated into web applications.

## Documentation

The Ontario Design System components are an implementation of the best practices of the Ontario Design System.

- Visit our [Component Developer Documentation](https://designsystem.ontario.ca/developer-docs/) for more information about the npm packages and each available component.
- Visit our [Ontario Design System Guidance](https://designsystem.ontario.ca/) for more information about the Ontario Design System, our best practices, and other design system features.

## Built using Stencil

[Stencil](https://stenciljs.com) is _a toolchain for building reusable, scalable Design Systems._

Learn more in the [Stencil Docs](https://stenciljs.com/docs/introduction).

## Quick Start

Using [Lerna](https://github.com/lerna/lerna), this project is made up of multiple packages that are linked together, called a _monorepo_. Lerna takes care of bootstrapping the packages within this repository together with their dependencies. It will install the `node_modules` for each package, then link the internal project packages together.

The fastest way to hit the ground running is to run,

```bash
npm install # Install install the root packages
npm run refresh # Ready the project for development
```

_Note_: The `refresh` script encompass cleaning, bootstrapping, and building of all the core Ontario Design System npm packages within the repository.

## Detailed Start

### Installing Lerna

Firstly, Lerna needs to be installed at the root level of the project.

At the repository root run,

```bash
npm install
```

### Bootstrapping Project Packages

Next, each repository needs to be bootstrapped to setup and link all the dependencies.

While at repository root run,

```bash
npm run bootstrap
```

### Building `ontario-design-system` Packages

The `ontario-design-system` packages are all designed to be published as npm packages. In order to do any development, or to just build the project in general, the packages have to be built/updated before they can be used.

Simply run at the root of the repository,

```bash
npm run build-libs
```

This will build the packages that are marked as public and prep them for use with any app.

### Next Steps

Checkout each package in the [`packages`](#packages) folder. They each have their own Readme and instructions on how to get started.

## Packages

This project is made up of five packages.

### `ontario-design-system-design-tokens`

#### Building the Library

Wanting to build and test within one of the framework applications? Running the [`build-libs`](#building-ontario-design-system-packages) script from the root triggers this behaviour.

The library can be built independently by running,

```bash
npm run build
```

### `ontario-design-system-global-styles`

_Content coming soon._

#### Building the Library

Wanting to build and test within one of the framework applications? Running the [`build-libs`](#building-ontario-design-system-packages) script from the root triggers this behaviour.

The library can be built independently by running,

```bash
npm run build
```

### `ontario-design-system-component-library`

The `ontario-design-system-component-library` is the heart of the project, it contains each of the the custom web components. It uses the Stencil toolchain to allow for easy creation and compilation of custom components.

The build process of this library emits npm package compatible packages as well as component libraries for other JavaScript UI Frameworks.

#### Building the Library

Wanting to build and test within one of the framework applications? Running the [`build-libs`](#building-ontario-design-system-packages) script from the root triggers this behaviour.

The library can be built independently by running,

```bash
npm run build
```

#### Component Development

The project contains an HTML file called `index.html` that is immediately loaded when the development server is started it. It is a simple place to stage a component for development.

A development server can be run by running,

```bash
npm run start
```

##### Generating a New Component

Stencil CLI can generate a new component within the `src/components` folder. With the `ontario-design-system-component-library` being your current directory run,

```bash
stencil generate name-of-component
```

If you don't have `stencil` installed globally, prefix the command with `npx`,

```bash
npx stencil generate name-of-component
```

### `ontario-design-system-component-library-react`

The `ontario-design-system-component-library-react` package is a React wrapper for custom web components generated by the `ontario-design-system-component-library`. It handles all the boilerplate code to wrap the components for import into any React app. Material emitted from the `ontario-design-system-component-library` build process is injected into this process every time there is a new build made within that package.

See the [Stencil Docs on React](https://stenciljs.com/docs/react) for more information.

_Note: This library doesn't currently support Next.js Server-Side Rendering. For now, use `use client` in wrappers around the components._

#### Building the Library

Wanting to build and test within one of the framework applications? Running the [`build-libs`](#building-ontario-design-system-packages) script from the root triggers this behaviour.

The library can be built independently by running,

```bash
npm run build
```

### `ontario-design-system-component-library-angular`

The `ontario-design-system-component-library-angular` package is a Angular wrapper for custom web components generated by the `ontario-design-system-component-library`. It handles all the boilerplate code to wrap the components for import into any React app. Material emitted from the `ontario-design-system-component-library` build process is injected into this process every time there is a new build made within that package.

See the [Stencil Docs on Angular](https://stenciljs.com/docs/angular) for more information.

#### Building the Library

Wanting to build and test within one of the framework applications? Running the [`build-libs`](#building-ontario-design-system-packages) script from the root triggers this behaviour.

The library can be built independently by running,

```bash
npm run build
```

### `app-react`

A React frontend to show off the whole process, from `ontario-design-system-component-library` components to React components. It is a simple [Create React App](https://github.com/facebook/create-react-app) application and demos the simplicity of using the generated components.

#### Running the App for Development

The application can be run in development by running,

```bash
npm run start
```

#### Building the App for Production

The application can be build for production by running,

```bash
npm run build
```

### `app-angular`

A Angular frontend to show off the whole process, from `ontario-design-system-component-library` components to Angular components. It is a simple Angular application and demos the simplicity of using the generated components.

#### Running the App for Development

The application can be run in development by running,

```bash
npm run start
```

#### Building the App for Production

The application can be build for production by running,

```bash
npm run build
```

### `app-web-components-documentation`

Built using [Docusaurus](https://docusaurus.io/), this package contains the React based documentation platform for easy deployment of the npm package and web components component documentation.

#### Running the App for Development

The documentation is sourced from the npm packages Readme files, as well as the Readme files of each component. To populate the documentation see the [Quick Start](#quick-start) section or each package section about building the package.

To update the documentation, simply rebuild the libraries and then re-run the development server.

The application can be run in development by running,

```bash
npm run start
```

This will start a development server that can be used to test out changes to the documentation.

#### Building the App for Production

The application can be build for production by running,

```bash
npm run build
```

## Package/Project Clean-up

Each package, as well as the root of the repository, contain `package.json` scripts to clean up each package/project.

### `clean`

The `clean` script is used to clean up any build artefacts that might be produced. It should not touch any installed dependencies and is good for making sure the builds build cleanly. Try this is you're running into any weird, non package related build issues.

In any project, or at the root of the repository run,

```bash
npm run clean
```

If run at the root of the repository Lerna will execute each package's `clean` script, allowing the entire project to be cleaned up.

### `clean:full`

The `clean:full` script is used to clean any build artefacts as well as nuke the package's `node_modules` folder. For a non module clean see [`clean`](#clean).

In any project, or at the root of the repository run,

```bash
npm run clean:full
```

If run at root this will run the `clean:full` script on each package, which will clean build artefacts and nuke the `node_modules` directory. _The root level `node_modules` directory will not be touched._ This makes sure that Lerna is left around.

## Resources

Here are some helpful resources one can use to learn more.

- [Ontario Design System Guidance](https://designsystem.ontario.ca/)
- [Ontario Design System Developer Documentation](https://designsystem.ontario.ca/developer-docs/)
- [Stencil](https://stenciljs.com/)
- [webcomponents.org](https://www.webcomponents.org/)
- [MDN: Web Components](https://developer.mozilla.org/en-US/docs/Web/API/Web_components)
- [ReactJS: Web Components](https://reactjs.org/docs/web-components.html)
