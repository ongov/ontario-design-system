import { Config } from '@stencil/core';
import { config as baseConfig } from './stencil.config';

// A trimmed Stencil config used only to produce the build that the Vitest spec
// suite loads (see `vitest-setup.ts`). It reuses the full configuration but keeps
// only the `dist` (lazy-loader) output target, so running the tests does not
// trigger the heavier, side-effecting output targets from the main build — namely
// the React/Angular wrapper generation into sibling packages and the docs-readme
// target that overwrites the Docusaurus docs.
export const config: Config = {
	...baseConfig,
	outputTargets: (baseConfig.outputTargets ?? []).filter((target) => target.type === 'dist'),
};
