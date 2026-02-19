import { expect } from '@playwright/test';
import { matchers, createConfig } from '@stencil/playwright';

// Add custom Stencil matchers to Playwright assertions
expect.extend(matchers);

export default createConfig({
	// Overwrite Playwright config options here
	retries: process.env.CI ? 2 : 0,
	use: {
		trace: 'retain-on-failure',
	},
	webServer: {
		timeout: 120 * 1000, // 2 minute timeout for the server to start
	},
	reporter: [['list'], ['html'], ['junit', { outputFile: 'test-results/playwright/results.xml' }]],
});
