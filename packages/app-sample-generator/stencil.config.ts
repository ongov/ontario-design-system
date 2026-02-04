import { Config } from '@stencil/core';

export const config: Config = {
	namespace: 'stencilsample',
	srcDir: 'src',
	outputTargets: [
		{
			type: 'dist',
			esmLoaderPath: './loader',
		},
	],
};
