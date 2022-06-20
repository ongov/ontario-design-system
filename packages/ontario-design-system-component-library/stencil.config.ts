import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import { reactOutputTarget } from '@stencil/react-output-target';
import { inlineSvg } from 'stencil-inline-svg';

export const config: Config = {
	namespace: 'ontario-design-system-components',
	plugins: [
		sass({
			includePaths: ['./node_modules', './node_modules/@ontario-digital-service/ontario-design-system-global-styles/node_modules'],
		}),
		inlineSvg(),
	],
	globalStyle: './src/global.scss',
	buildEs5: 'prod',
	outputTargets: [
		reactOutputTarget({
			componentCorePackage: '@ontario-digital-service/ontario-design-system-component-library',
			proxiesFile: '../ontario-design-system-component-library-react/src/components.ts',
			includeDefineCustomElements: true,
		}),
		{
			type: 'dist',
			esmLoaderPath: '../loader',
			copy: [
				{
					src: '../node_modules/@ontario-digital-service/ontario-design-system-global-styles/dist/fonts',
					dest: 'fonts',
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
			type: 'dist-custom-elements-bundle',
		},
		{
			type: 'docs-readme',
		},
		{
			type: 'www',
			serviceWorker: null, // disable service workers
			copy: [
				{
					src: '../node_modules/@ontario-digital-service/ontario-design-system-global-styles/dist/fonts',
					dest: 'fonts',
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
	],
	testing: {
		transform: {
			'^.+\\.svg$': '<rootDir>/src/utils/svgTransform.js',
		},
		reporters: ['default', 'jest-junit'],
	},
};
