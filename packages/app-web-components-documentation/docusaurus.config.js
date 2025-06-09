// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const { themes } = require('prism-react-renderer');
const googleTagManagerCode = process.env.DOCUSAURUS_GTM_ID ?? 'GTM-12345';

/** @type {import('@docusaurus/types').Config} */
const config = {
	title: 'Ontario Design System Web Component Documentation',
	tagline: 'Web Components',
	favicon: 'img/favicon.ico',

	staticDirectories: ['static'],

	// Set the production url of your site here
	url: 'https://designsystem.ontario.ca/',
	// Set the /<baseUrl>/ pathname under which your site is served
	// For GitHub pages deployment, it is often '/<projectName>/'
	baseUrl: '/developer-docs',

	// GitHub pages deployment config.
	// If you aren't using GitHub pages, you don't need these.
	organizationName: 'Government of Ontario', // Usually your GitHub org/user name.
	projectName: 'ods-web-components', // Usually your repo name.

	onBrokenLinks: 'throw',
	onBrokenMarkdownLinks: 'warn',

	// Even if you don't use internalization, you can use this field to set useful
	// metadata like html lang. For example, if your site is Chinese, you may want
	// to replace "en" with "zh-Hans".
	i18n: {
		defaultLocale: 'en',
		locales: ['en'],
	},
	markdown: {
		mermaid: true,
	},
	themes: ['@docusaurus/theme-mermaid'],
	presets: [
		[
			'classic',
			/** @type {import('@docusaurus/preset-classic').Options} */
			({
				docs: {
					sidebarPath: require.resolve('./sidebars.js'),
					routeBasePath: '/',
					// Please change this to your repo.
					// Remove this to remove the "edit this page" links.
					// editUrl:
					//   "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
				},
				blog: false,
				theme: {
					customCss: require.resolve('./src/css/custom.css'),
				},
				googleTagManager: {
					containerId: googleTagManagerCode,
				},
			}),
		],
	],
	themeConfig:
		/** @type {import('@docusaurus/preset-classic').ThemeConfig} */
		({
			// Replace with Design System social card, once one is developed
			// image: 'img/docusaurus-social-card.jpg',
			colorMode: {
				disableSwitch: false,
				respectPrefersColorScheme: true,
			},
			navbar: {
				title: 'Ontario Design System Web Component Docs',
			},
			prism: {
				theme: themes.github,
				darkTheme: themes.dracula,
			},
		}),
};

module.exports = config;
