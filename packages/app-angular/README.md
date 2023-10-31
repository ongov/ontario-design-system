# AppAngular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.1.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Handling Environment-based Translations in Angular

When building an Angular application, you might need different translations for different environments (e.g., `develop` and `staging`). This guide shows you how to set up environment-based translations using Angular's environment files.

In the `src/environments/` folder, we've created two environment files: environment.ts for development and `environment.staging.ts` for staging.

In the `angular.json` file, we've defined configurations for the different environments. Under the configurations section, we've set up the file replacements for each environment.

In order to use the environment variables for translations, we've created a file called `translation.config.ts` in the `src/app` folder. The necessary modules are imported and defined in the translation loader function using the environment variables.

Now, you can build the Angular app for different environments using the `ng build` command with the `--configuration` flag.

Ex.
`ng build --configuration=staging`

Another way to solve this could be to follow the solution outlined in this article here: https://wildermuth.com/2021/08/08/Using-Angular-s-Base-HREF-in-Paths/

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
