import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
	testDir: './tests',
	testMatch: '**/*.@(spec|test|e2e|vrt).?(c|m)[jt]s?(x)',
	snapshotPathTemplate: '{testDir}/{testFileDir}/vrt-snapshots/{arg}-{projectName}{ext}',
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 1 : undefined,

	reporter: [['html'], ['junit', { outputFile: 'test-results/playwright/results.xml' }]],

	use: {
		baseURL: 'http://localhost:3000',
		trace: 'on-first-retry',
	},

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
		command: 'pnpm run build && pnpm run start',
		port: 3000,
		timeout: 300 * 1000,
		reuseExistingServer: !process.env.CI,
	},
});
