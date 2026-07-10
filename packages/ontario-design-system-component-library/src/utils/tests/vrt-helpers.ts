import { expect, type Locator } from '@playwright/test';

type VrtScreenshotOptions = {
	maxDiffPixels?: number;
};

export const withGlobalStyles = (body: string) => `
	<html>
		<head>
			<link rel="stylesheet" href="/build/ontario-design-system-components.css">
		</head>
		<body>${body}</body>
	</html>
`;

export const expectVrtScreenshot = async (locator: Locator, options: VrtScreenshotOptions = {}) => {
	await expect(locator).toHaveScreenshot({
		animations: 'disabled',
		caret: 'hide',
		...options,
	});
};
