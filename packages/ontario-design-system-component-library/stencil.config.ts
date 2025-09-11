import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import { reactOutputTarget } from '@stencil/react-output-target';
import { angularOutputTarget } from '@stencil/angular-output-target';
import { inlineSvg } from 'stencil-inline-svg';
import dotEnvPlugin from 'rollup-plugin-dotenv';
import path from 'path';

export const config: Config = {
	namespace: 'ontario-design-system-components',
	sourceMap: true,
	plugins: [
		sass({
			includePaths: ['./node_modules'],
		}),
		inlineSvg(),
		dotEnvPlugin(),
	],
	globalStyle: './src/global.scss',
	globalScript: './src/global.ts',
	buildEs5: false,
	outputTargets: [
		reactOutputTarget({
			outDir: '../ontario-design-system-component-library-react/src/components',
			hydrateModule: '@ongov/ontario-design-system-component-library/hydrate',
		}),
		angularOutputTarget({
			componentCorePackage: '@ongov/ontario-design-system-component-library',
			directivesProxyFile:
				'../ontario-design-system-component-library-angular/projects/component-library/src/lib/stencil-generated/components.ts',
			directivesArrayFile:
				'../ontario-design-system-component-library-angular/projects/component-library/src/lib/stencil-generated/index.ts',
		}),
		{
			type: 'dist-custom-elements',
			dir: 'components',
			customElementsExportBehavior: 'auto-define-custom-elements',
			externalRuntime: false,
		},
		// Hydrate script for SSR
		{
			type: 'dist-hydrate-script',
		},
		{
			type: 'dist',
			esmLoaderPath: '../loader',
			copy: [
				{
					src: path.resolve(__dirname, './node_modules/@ongov/ontario-design-system-global-styles/dist/fonts'),
					dest: 'fonts',
					warn: true,
				},
				{
					src: path.resolve(__dirname, './node_modules/@ongov/ontario-design-system-global-styles/dist/favicons'),
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
			],
		},
		{
			type: 'docs-readme',
		},
		{
			type: 'docs-readme',
			dir: '../app-web-components-documentation/docs/',
			overwriteExisting: true,
		},
		{
			type: 'www',
			serviceWorker: null, // disable service workers
			copy: [
				{
					src: path.resolve(__dirname, './node_modules/@ongov/ontario-design-system-global-styles/dist/fonts'),
					dest: 'fonts',
					warn: true,
				},
				{
					src: path.resolve(__dirname, './node_modules/@ongov/ontario-design-system-global-styles/dist/favicons'),
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
			],
		},
	],
	extras: {
		enableImportInjection: true,
	},
	testing: {
		transform: {
			'^.+\\.svg$': '<rootDir>/src/utils/svgTransform.cjs',
		},
		reporters: ['default', 'jest-junit'],
	},
};
