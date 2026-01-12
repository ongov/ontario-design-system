import { expect } from '@playwright/test';
import { matchers, createConfig } from '@stencil/playwright';

// Add custom Stencil matchers to Playwright assertions
expect.extend(matchers);

export default createConfig({
	// Overwrite Playwright config options here

	reporter: [['list'], ['html'], ['junit', { outputFile: 'test-results/playwright/results.xml' }]],
});
