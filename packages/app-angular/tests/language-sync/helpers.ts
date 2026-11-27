import { Page } from '@playwright/test';

export const PAGE_URL = '/components/language-sync';

// The page language comes from `<html lang>`, which the app serves as `en`, so French loads are simulated by
// rewriting it in the HTML response (before any component hydrates).
export const gotoWithHtmlLang = async (page: Page, lang: 'en' | 'fr') => {
	await page.route(`**${PAGE_URL}`, async (route) => {
		if (route.request().resourceType() !== 'document') return route.continue();

		const response = await route.fetch();
		const body = (await response.text()).replace(/<html lang="[^"]*"/, `<html lang="${lang}"`);
		await route.fulfill({ response, body });
	});

	await page.goto(PAGE_URL);
	await page.waitForSelector('#language-sync-footer.hydrated');
	await page.waitForSelector('#language-sync-header.hydrated');
};
