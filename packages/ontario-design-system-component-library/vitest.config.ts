import { defineVitestConfig } from '@stencil/vitest/config';
import { config as stencilConfig } from './stencil.config';

// `defineVitestConfig` derives Vitest's `exclude` globs from the Stencil output
// directories. This package emits its `dist-custom-elements` target to
// `dir: 'components'`, which would inject a `**/components/**` exclude and wrongly
// skip every spec under `src/components/`. Pass a copy of the Stencil config with
// that target removed so the exclude is scoped to the real build output only. This
// copy is used purely to compute the test config; the actual build still runs the
// full `stencil.config.ts` via the `build:stencil` script.
const testStencilConfig = {
	...stencilConfig,
	outputTargets: (stencilConfig.outputTargets ?? []).filter((target) => target.type !== 'dist-custom-elements'),
};

export default defineVitestConfig({
	stencilConfig: testStencilConfig,
	test: {
		globals: true,
		reporters: ['default', ['junit', { outputFile: './junit.xml' }]],
		projects: [
			{
				test: {
					name: 'spec',
					globals: true,
					include: ['src/**/*.spec.{ts,tsx}'],
					environment: 'stencil',
					setupFiles: ['./vitest-setup.ts'],
				},
			},
		],
	},
});
