# Ontario Design System Angular Component Library

![Built With Stencil](https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=flat-square)

- [Introduction](#introduction)
- [Installation and usage](#installation-and-usage)
- [Debugging FAQs](#debugging-faqs)
- [Support](#support)

## Introduction

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.0. It is based off the [Ontario Design System Component Library](https://www.npmjs.com/package/@ongov/ontario-design-system-component-library) built using [Stencil](https://stenciljs.com/). For more information, [find it on NPM](https://www.npmjs.com/package/@ongov/ontario-design-system-component-library-angular).

## Installation and usage

To find documentation on individual web components in this component library, please download and refer to our [component documentation](https://designsystem.ontario.ca/docs/documentation/for-developers/web-components.html#component-documentation).

To use the Ontario Design System Angular component library, follow these steps:

### 1. Install the npm package.

```bash
npm install --save @ongov/ontario-design-system-component-library-angular
```

### 2. Importing the component library styles

There are three supported ways to include the Ontario Design System theme in your Angular application.

**Option A: Direct Import in Angular Styles**

      Add the following to your global `styles.scss` file:

      ```scss
      @import 'pkg:@ongov/ontario-design-system-component-library-angular/styles/theme.scss';
      ```

**Option B: Create a Separate Styles File**

Alternatively, you can create a new SCSS file (e.g., `theme.scss`). If you need to override the global styles theme with a custom asset base path, you can create a local theme wrapper that forwards the global styles and sets `$asset-base-path`, then import that wrapper in your app entry point.

```scss
@forward 'pkg:@ongov/ontario-design-system-component-library-angular/styles/theme.scss' with (
	$asset-base-path: '/assets'
);
```

Then, include this file in your Angular project by adding it to the `styles` array in `angular.json`:

```json
"styles": [
   "src/theme.scss"
]
```

**Option C: Add the Design System theme CSS**

Add the following to the styles array in your project’s angular.json file:

```bash
"build": {
"options": {
   "styles": [
      "node_modules/@ongov/ontario-design-system-global-styles/dist/styles/css/compiled/ontario-theme.css"
   ]
}
```

You may also use the minified version in production if desired: `ontario-theme.min.css`.

### 3. Import the `ComponentLibraryModule`, or whichever specific component you wish to use into your root module. The `ComponentLibraryModule` import will include all the Ontario Design System web components.

```typescript
import { ComponentLibraryModule } from '@ongov/ontario-design-system-component-library-angular';

@NgModule({
	imports: [ComponentLibraryModule],
})
export class AppModule {}
```

## Asset path configuration (optional)

If your app serves component assets (fonts, images, favicons) from a non-root path, configure the asset base path before components render.

```typescript
import { setAssetPath } from '@ongov/ontario-design-system-component-library-angular';

setAssetPath(`${window.location.origin}/assets/`);
```

## Usage

You can now use the Angular Components in your component template files.

```html
<ontario-button type="primary">Primary Button</ontario-button>
```

## Local assets

Along with the components, the local assets (logos, fonts, etc.) need to be copied into your project so that they are available for bundling upon building your Angular application.

The assets in the npm package are located at `@ongov/ontario-design-system-component-library-angular/dist/assets`, and should be copied to your public assets folder.

In a standard Angular application this can be done in a number of ways. One way is to use the [copyfiles](https://www.npmjs.com/package/copyfiles) npm package, which you can with any operating system:

```bash
copyfiles -E -f "node_modules/@ongov/ontario-design-system-component-library-angular/dist/assets/*" src/assets
```

Another way is to add scripts to copy the assets in your `package.json` file. For example:

```json
"prebuild": "npm run copy:assets",
"copy:images": "copyfiles -E -f \"node_modules/@ongov/ontario-design-system-component-library-angular/dist/component-library/assets/images/**\" src/assets",
"copy:favicons": "copyfiles -E -f \"node_modules/@ongov/ontario-design-system-component-library-angular/dist/component-library/assets/favicons/**\" src/assets/favicons",
"copy:fonts": "copyfiles -E -u 6 \"node_modules/@ongov/ontario-design-system-component-library-angular/dist/component-library/assets/fonts/**/*\" src/assets/fonts",
"copy:assets": "npm run copy:images && npm run copy:favicons && npm run copy:fonts"
```

## Debugging FAQs

You may run into a few errors when first using the Ontario Design System Angular web components library with your Angular project.

Here are a few common ones and how to fix them:

### _An attribute or property cannot be resolved during compilation (NG8002)._

This error arises when attempting to bind to a property that does not exist.

To fix this issue, the `CUSTOM_ELEMENTS_SCHEMA` must be added to the module schemas for the component. Ex:

```typescript
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
```

### _Error: inject() must be called from an injection context (NG0203)_

You see this error when you try to use the inject() function outside of the allowed injection context. The injection context is available during the class creation and initialization.

To fix this issue, add mappings to the angular library in the `tsconfig.json` file. Note that this only applies when using TypeScript path mappings instead of linking to the libraries.

```json
 "compilerOptions": {
     "paths": {
        "@angular/*": ["./node_modules/@angular/*"]
    },
 }
```

### _Typescript compiler issues_

You may encounter errors building the component library if your compiler options `lib` is set to a version below ES2022.

If this is the case, you can add the following to your _tsconfig.json_ file:

```json
"complierOptions": {
   "skipLibCheck": true
}
```

Adding this will skip the type checking of the Angular component library declaration files. This can save time during compilation at the expense of type-system accuracy.

## Support

Contact us at [design.system@ontario.ca](mailto:design.system@ontario.ca) for assistance with this package.
