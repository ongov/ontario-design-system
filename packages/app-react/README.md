# React Component Library POC

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and uses the [Ontario Design System React component library](#https://www.npmjs.com/package/@ongov/ontario-design-system-component-library-react) package.

The purpose of this project is to test the React web components library functionality and styles. It is loosely based off of the [Ontario Design System guidance site](#https://designsystem.ontario.ca/), with more of a focus on the web components, their properties and how they work. It is not meant to be treated as official documentation for the web components or their libraries.

Local assets are copied over via scripts using the [copyfiles](https://www.npmjs.com/package/copyfiles) NPM package as outlined in the Ontario Design System React component library README instructions.

## Asset paths (fonts and images)

This app uses a local theme entrypoint to keep asset URLs pointing at `/assets/...` when running in Vite.

- Use `src/styles/ontario-theme.scss` as the single theme import and configure the base path there.
- Any other SCSS files should import the local theme module instead of the package theme directly.
- The React entrypoint calls `setAssetPath(`${window.location.origin}/assets/`)` so Stencil resolves web component image assets correctly in Vite.

If you see font requests going to `/fonts/...` instead of `/assets/fonts/...`, it means a file is still importing the package theme directly.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
