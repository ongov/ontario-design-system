import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import { reactOutputTarget } from '@stencil/react-output-target';
import { inlineSvg } from 'stencil-inline-svg';

export const config: Config = {
	namespace: 'ontario-design-system-components',
	plugins: [sass(), inlineSvg()],
	globalStyle: './src/global.scss',
	buildEs5: 'prod',
	outputTargets: [
		reactOutputTarget({
			componentCorePackage: 'ontario-design-system-component-library',
			proxiesFile: '../ontario-design-system-component-library-react/src/components.ts',
			includeDefineCustomElements: true,
		}),
		{
			type: 'dist',
			esmLoaderPath: '../loader',
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
		},
	],
};
