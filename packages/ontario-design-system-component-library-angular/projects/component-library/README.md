# Ontario Design System Component Library - Angular

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.0. It is based off the [Ontario Design System Component Library](https://www.npmjs.com/package/@ontario-digital-service/ontario-design-system-component-library) built using [Stencil](https://stenciljs.com/).

## Using the Angular Component Library

To find documentation on individual web components in this component library, please download and refer to our [component documentation](https://designsystem.ontario.ca/docs/documentation/for-developers/web-components.html#component-documentation).

To use the Angular Component Library, follow these steps:

1. Install the NPM package.

   ```bash
   npm install --save @ontario-digital-service/ontario-design-system-component-library-angular
   ```

2. Import the `ComponentLibraryModule`, or whichever specific component you wish to use into your root module. The `ComponentLibraryModule` import will include all the Ontario Design System web components.

   ```ts
   import { ComponentLibraryModule } from '@ontario-digital-service/ontario-design-system-component-library-angular/dist/component-library';

   @NgModule({
   	imports: [ComponentLibraryModule],
   })
   export class AppModule {}
   ```

3. You can now use the Angular Components in your component template files.

   ```html
   <ontario-button type="primary">Primary Button</ontario-button>
   ```

## Local assets

Along with the components, the local assets (logos, fonts, etc.) need to be copied into your project so that they are available for bundling upon building your Angular application.

The assets in the NPM package are located at `@ontario-digital-service/ontario-design-system-component-library-angular/dist/assets`, and should be copied to your public assets folder.

In a standard Angular application this can be done in a number of ways. One way is to use the [copyfiles](https://www.npmjs.com/package/copyfiles) NPM package, which you can with any operating system:

```bash
copyfiles -E -f "node_modules/@ontario-digital-service/ontario-design-system-component-library-react/dist/assets/*" src/assets
```

Another way is to add scripts to copy the assets in your `package.json` file. For example:

```json
"prebuild": "npm run copy:assets",
"copy:images": "copyfiles -E -f \"node_modules/@ontario-digital-service/ontario-design-system-component-library-angular/dist/component-library/assets/images/**\" src/assets",
"copy:favicons": "copyfiles -E -f \"node_modules/@ontario-digital-service/ontario-design-system-component-library-angular/dist/component-library/assets/favicons/**\" src/assets/favicons",
"copy:fonts": "copyfiles -E -u 6 \"node_modules/@ontario-digital-service/ontario-design-system-component-library-angular/dist/component-library/assets/fonts/**/*\" src/assets/fonts",
"copy:assets": "npm run copy:images && npm run copy:favicons && npm run copy:fonts"
```

## Debugging FAQs

You may run into a few errors when first using web components with your Angular project.

Here are a few common ones and how to fix them:

### _An attribute or property cannot be resolved during compilation (NG8002)._

This error arises when attempting to bind to a property that does not exist.

To fix this issue, the `CUSTOM_ELEMENTS_SCHEMA` must be added to the module schemas for the component. Ex:

```ts
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
```

<br>

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
