import { expect, devices } from '@playwright/test';
import { matchers, createConfig } from '@stencil/playwright';

// Add custom Stencil matchers to Playwright assertions
expect.extend(matchers);

export default await createConfig({
	// Overwrite Playwright config options here
	retries: process.env.CI ? 2 : 0,
	// @stencil/playwright defaults testMatch to '*.e2e.ts'. Broaden it so the VRT
	// suite (*.vrt.ts) is also discovered. The e2e and vrt suites are then split
	// at invocation time via a Playwright filter (see the package.json scripts).
	testMatch: ['*.e2e.ts', '*.vrt.ts'],
	// Place VRT baseline snapshots next to each test file in a `vrt-snapshots`
	// folder, mirroring the app-nextjs VRT layout. `{projectName}` keeps the
	// browser explicit so baselines stay stable across the project matrix.
	snapshotPathTemplate: '{testDir}/{testFileDir}/vrt-snapshots/{arg}-{projectName}{ext}',
	use: {
		trace: 'retain-on-failure',
		// Override the baseURL computed from devServer.address ('0.0.0.0') to use
		// 'localhost' instead. Chrome 107+ blocks navigation to 0.0.0.0 on Linux,
		// causing setContent's page.goto() to hang until the 30s test timeout fires.
		baseURL: 'http://localhost:3333',
	},
	// Pin the browser projects explicitly so the `{projectName}` token in the
	// snapshot path is stable. The VRT suite is captured across the same browser
	// matrix as the apps VRT (chromium, firefox, webkit).
	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] },
		},
		{
			name: 'firefox',
			use: { ...devices['Desktop Firefox'] },
		},
		{
			name: 'webkit',
			use: { ...devices['Desktop Safari'] },
		},
	],
	webServer: {
		command: 'stencil build --dev --watch --serve --no-open --testing',
		timeout: 300 * 1000, // 5 minute timeout: a cold Stencil dev build can take well over 2 minutes before it starts serving.
	},
	reporter: [['list'], ['html'], ['junit', { outputFile: 'test-results/playwright/results.xml' }]],
});
