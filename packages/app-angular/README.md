# Ontario Design System – Angular Component Pages App

This project is an **Angular application** that integrates the [Ontario Design System](https://designsystem.ontario.ca) component library, which is built using [Stencil](https://stenciljs.com/) and distributed through the [`@ongov/ontario-design-system-component-library-angular`](https://www.npmjs.com/package/@ongov/ontario-design-system-component-library-angular) npm package.

It is a proof of concept (PoC) that renders every component on its own page, mirroring the component pages in `app-nextjs`.

---

## Tech Stack

- **Angular**: Framework for the app, using standalone components, lazy-loaded routes, and the built-in control flow (`@for`, `@if`).
- **Stencil (Angular Output)**: Web components consumed as Angular components via `@stencil/angular-output-target`.
- **Karma + Jasmine**: Angular's default unit test setup.

---

## Purpose

This project is designed to:

- **Render all available Ontario Design System components** in various states and combinations, one component per page.
- **Match the component page structure of `app-nextjs`**, using the same routes, element ids, and content, so the two apps can be reviewed side by side.
- **Make it easy to view and exercise a single component in isolation**, in both languages where relevant.

---

## File Structure and Code Walkthrough

### Key Files and Directories

- `src/index.html`: The host page. It sets a root `<base href="/">` so path-based routes such as `/components/ontario-button` resolve their assets correctly.
- `src/styles.scss`: Imports the Ontario Design System global theme and sets the asset base path.
- `src/app/app.module.ts`: Bootstraps `AppComponent`. Pages are standalone components, so the module only imports the router.
- `src/app/app.component.html`: A minimal shell with the `<main>` landmark, the Ontario grid row and column, and the `<router-outlet>`. It has no header or footer, so the `ontario-header` and `ontario-footer` pages render those components on their own.
- `src/app/app-routing.module.ts`: Routes `/` to the home page, `/components/*` to the component routes, and anything else back to the home page.
- `src/app/pages/home`: The landing page. It lists a link to every component page.
- `src/app/pages/components/component-routes.ts`: One lazy-loaded route per component page, with its page title.
- `src/app/pages/components/<component-name>/`: One folder per component, holding `<component-name>.component.ts` and `<component-name>.component.html`.

### How a Component Page Is Built

1. Each page is a **standalone component** that imports `ComponentLibraryModule` from the Angular component library package, which makes every `<ontario-*>` element available in its template.
2. The template starts at the page's `<h1>`, because the app shell already provides `<main>` and the grid.
3. Strings are set as plain attributes, while objects, arrays, booleans, and numbers use property bindings, for example `[options]="options"`. Events use Angular event bindings, such as `(click)`.
4. Larger data sets (table rows, accordion items, footer links, and so on) live as fields on the component class so the template stays readable.
5. Element ids, labels, and text match the Next.js page for the same component, so selectors and expectations carry across both apps.
6. Repeated variants, such as the heading levels or highlight colours, use `@for` over an array instead of copied markup.

### Differences from the Next.js Pages

- **No server-side rendering:** the Next.js app has `client-side` and `server-side` pages for `ontario-checkbox`, `ontario-dropdown-list`, `ontario-date-input`, `ontario-radio-buttons`, and `ontario-step-indicator`. The Angular app renders the client-side version on the main route and has no server-side page.
- **Shared `<main>`:** `ontario-in-page-navigation` does not set the `id="skip-to-main"` that the Next.js page puts on its own `<main>`, because the `<main>` is provided by the app shell.
- **Intentionally invalid values:** some pages pass invalid values on purpose, such as malformed JSON or an unknown `type`, to show how the components handle them. A few use `as any`, `as never`, or `$any()` to get past strict template type checking. `ontario-table` logs two JSON parse errors to the console for this reason, and the Next.js page does the same.

### Adding a Component Page

1. Create `src/app/pages/components/<component-name>/<component-name>.component.ts` and `.html`, following an existing page such as `ontario-button`.
2. Register the route in `component-routes.ts`.
3. Add the link to `src/app/pages/home/home.component.html`.

---

## Running the Project Locally

From the repository root, build the libraries first if you have not already:

```bash
pnpm run build-libs
```

Then, from `packages/app-angular`:

```bash
pnpm run serve
```

Open `http://localhost:4200/` for the list of components, or go straight to a page such as `http://localhost:4200/components/ontario-button`. The page for any component is at the same path in `app-nextjs`, which makes side by side comparisons straightforward.

To check that the app builds:

```bash
pnpm run build
```

> [!NOTE] > `pnpm run start` removes `node_modules` and the build output before installing and serving, so use `pnpm run serve` for day-to-day work.

---

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
