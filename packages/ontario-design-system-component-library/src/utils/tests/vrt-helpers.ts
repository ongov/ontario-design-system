export { expectVrtScreenshot } from './vrt-screenshot';

export type GlobalStylesOptions = {
	/**
	 * Language of the page, set as the `lang` attribute on `<html>` before the components load. Use it to test
	 * components that render differently in French, for example `{ lang: 'fr' }`. The test page uses `en` when not
	 * provided.
	 */
	lang?: string;
};

/**
 * Wraps markup in a page that loads the design system global styles, so text uses the bundled web fonts instead of the
 * default fonts of whichever machine runs the test.
 *
 * The test page already has an `<html lang="en">` element, and the browser ignores a second `lang` attribute written in
 * the markup, so the language is set with a script that runs before the components load.
 */
export const withGlobalStyles = (body: string, { lang }: GlobalStylesOptions = {}) => `
	<html>
		<head>
			<link rel="stylesheet" href="/build/ontario-design-system-components.css">
			${lang ? `<script>document.documentElement.setAttribute('lang', ${JSON.stringify(lang)});</script>` : ''}
		</head>
		<body>${body}</body>
	</html>
`;
