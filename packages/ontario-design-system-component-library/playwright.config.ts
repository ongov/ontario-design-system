import { expect } from '@playwright/test';
import { matchers, createConfig } from '@stencil/playwright';

// Add custom Stencil matchers to Playwright assertions
expect.extend(matchers);

export default await createConfig({
	// Overwrite Playwright config options here
	retries: process.env.CI ? 2 : 0,
	use: {
		trace: 'retain-on-failure',
		// Override the baseURL computed from devServer.address ('0.0.0.0') to use
		// 'localhost' instead. Chrome 107+ blocks navigation to 0.0.0.0 on Linux,
		// causing setContent's page.goto() to hang until the 30s test timeout fires.
		baseURL: 'http://localhost:3333',
	},
	webServer: {
		command: 'stencil build --dev --watch --serve --no-open --testing',
		timeout: 120 * 1000, // 2 minute timeout for the server to start
	},
	reporter: [['list'], ['html'], ['junit', { outputFile: 'test-results/playwright/results.xml' }]],
});
