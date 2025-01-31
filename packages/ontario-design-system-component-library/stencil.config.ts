import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import { reactOutputTarget } from '@stencil/react-output-target';
import { angularOutputTarget } from '@stencil/angular-output-target';
import { inlineSvg } from 'stencil-inline-svg';
import dotEnvPlugin from 'rollup-plugin-dotenv';

export const config: Config = {
	namespace: 'ontario-design-system-components',
	plugins: [
		sass({
			includePaths: ['./node_modules', './node_modules/@ongov/ontario-design-system-global-styles/node_modules'],
		}),
		inlineSvg(),
		dotEnvPlugin(),
	],
	globalStyle: './src/global.scss',
	globalScript: './src/global.ts',
	buildEs5: false,
	outputTargets: [
		reactOutputTarget({
			componentCorePackage: '@ongov/ontario-design-system-component-library',
			proxiesFile: '../ontario-design-system-component-library-react/src/components.ts',
			includeDefineCustomElements: true,
		}),
		angularOutputTarget({
			componentCorePackage: '@ongov/ontario-design-system-component-library',
			directivesProxyFile:
				'../ontario-design-system-component-library-angular/projects/component-library/src/lib/stencil-generated/components.ts',
			directivesArrayFile:
				'../ontario-design-system-component-library-angular/projects/component-library/src/lib/stencil-generated/index.ts',
		}),
		{
			type: 'dist',
			esmLoaderPath: '../loader',
			copy: [
				{
					src: '../node_modules/@ongov/ontario-design-system-global-styles/dist/fonts',
					dest: 'fonts',
					warn: true,
				},
				{
					src: '../node_modules/@ongov/ontario-design-system-global-styles/dist/favicons',
					dest: 'favicons',
					warn: true,
				},
				{
					src: '**/*.i18n.json',
					dest: 'i18n',
				},
				{
					src: 'translations/*.i18n.json',
					dest: 'i18n',
				},
				{
					src: '../src/styles/theme.scss',
					dest: 'styles/theme.scss',
				},
				{
					src: '../src/styles/slotted-styles',
					dest: 'styles/slotted-styles',
				},
			],
		},
		{
			type: 'dist-custom-elements',
		},
		{
			type: 'docs-readme',
		},
		{
			type: 'docs-readme',
			dir: '../app-web-components-documentation/docs/',
		},
		{
			type: 'www',
			serviceWorker: null, // disable service workers
			copy: [
				{
					src: '../node_modules/@ongov/ontario-design-system-global-styles/dist/fonts',
					dest: 'fonts',
					warn: true,
				},
				{
					src: '../node_modules/@ongov/ontario-design-system-global-styles/dist/favicons',
					dest: 'favicons',
					warn: true,
				},
				{
					src: '**/*.i18n.json',
					dest: 'i18n',
				},
				{
					src: 'translations/*.i18n.json',
					dest: 'i18n',
				},
				{
					src: 'french.html',
					dest: 'french.html',
				},
				{
					src: '../src/global.scss',
					dest: 'scss/theme.scss',
				},
			],
		},
	],
	extras: {
		enableImportInjection: true,
	},
	testing: {
		transform: {
			'^.+\\.svg$': '<rootDir>/src/utils/svgTransform.js',
		},
		reporters: ['default', 'jest-junit'],
	},
};
