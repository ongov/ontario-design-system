import { expect, Locator } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { test, E2EPage } from '@stencil/playwright';

const expectNoAxeViolations = async (page: E2EPage, selector: string) => {
	const results = await new AxeBuilder({ page }).include(selector).analyze();
	expect(results.violations).toHaveLength(0);
};

/**
 * Removes a dismissed tag the way a consumer would. `delay` is in milliseconds; a negative delay never removes it.
 */
const removeOnDismiss = (delay = 0) => `
	<script>
		document.addEventListener('tagDismissed', (event) => {
			const tag = event.target;
			if (${delay} < 0) return;
			${delay} ? setTimeout(() => tag.remove(), ${delay}) : tag.remove();
		});
	</script>
`;

const appliedFilters = `
	<ontario-tag-group heading="Applied filters" heading-level="h2">
		<ontario-tag label="Category: Health" value="health" dismissible></ontario-tag>
		<ontario-tag label="Region: Northern Ontario" value="north" dismissible></ontario-tag>
		<ontario-tag label="Category: Filter" value="category-filter" dismissible></ontario-tag>
	</ontario-tag-group>
`;

const getHeading = (page: E2EPage) => page.locator('ontario-tag-group').locator('.ontario-tag-group__heading');
const getStatus = (page: E2EPage) => page.locator('ontario-tag-group').locator('.ontario-tag-group__status');
const getRemoveButton = (page: E2EPage, label: string) => page.getByRole('button', { name: `Remove ${label}` });

const dismissWithKeyboard = async (page: E2EPage, button: Locator) => {
	await button.focus();
	await page.keyboard.press('Enter');
	await page.waitForChanges();
};

test.describe('ontario-tag-group - count and removal', () => {
	test('counts the tags and does not remove a dismissed tag itself', async ({ page }) => {
		await page.setContent(appliedFilters);
		await page.waitForChanges();

		await expect(getHeading(page)).toHaveText('Applied filters (3)');

		await getRemoveButton(page, 'Category: Health').click();
		await page.waitForChanges();

		await expect(page.locator('ontario-tag')).toHaveCount(3);
		await expect(getHeading(page)).toHaveText('Applied filters (3)');
		await expect(getStatus(page)).toHaveText('');
	});

	test('announces each removal and moves focus next, then previous, then to the heading', async ({ page }) => {
		await page.setContent(appliedFilters + removeOnDismiss());
		await page.waitForChanges();

		await dismissWithKeyboard(page, getRemoveButton(page, 'Region: Northern Ontario'));
		await expect(getHeading(page)).toHaveText('Applied filters (2)');
		await expect(getStatus(page)).toHaveText('Removed: Region: Northern Ontario. 2 remaining.');
		await expect(getRemoveButton(page, 'Category: Filter')).toBeFocused();

		await page.keyboard.press('Enter');
		await page.waitForChanges();
		await expect(getHeading(page)).toHaveText('Applied filters (1)');
		await expect(getStatus(page)).toHaveText('Removed: Category: Filter. 1 remaining.');
		await expect(getRemoveButton(page, 'Category: Health')).toBeFocused();

		await page.keyboard.press('Enter');
		await page.waitForChanges();
		await expect(getHeading(page)).toHaveText('Applied filters (0)');
		await expect(getStatus(page)).toHaveText('Removed: Category: Health. No tags remaining.');
		await expect(getHeading(page)).toBeFocused();
	});

	test('moves focus to the group container when the last tag is removed and there is no heading', async ({ page }) => {
		await page.setContent(`
			<ontario-tag-group group-label="Topics">
				<ontario-tag label="Health" dismissible></ontario-tag>
			</ontario-tag-group>
			${removeOnDismiss()}
		`);
		await page.waitForChanges();

		await dismissWithKeyboard(page, getRemoveButton(page, 'Health'));

		await expect(getStatus(page)).toHaveText('Removed: Health. No tags remaining.');
		await expect(page.locator('ontario-tag-group').locator('.ontario-tag-group')).toBeFocused();
	});

	test('works when the consumer removes the tag in a listener on the group itself', async ({ page }) => {
		await page.setContent(`
			${appliedFilters}
			<script>
				document.querySelector('ontario-tag-group').addEventListener('tagDismissed', (event) => event.target.remove());
			</script>
		`);
		await page.waitForChanges();

		await dismissWithKeyboard(page, getRemoveButton(page, 'Category: Health'));

		await expect(getStatus(page)).toHaveText('Removed: Category: Health. 2 remaining.');
		await expect(getRemoveButton(page, 'Region: Northern Ontario')).toBeFocused();
	});

	test('follows a removal that happens after a short delay', async ({ page }) => {
		await page.setContent(appliedFilters + removeOnDismiss(500));
		await page.waitForChanges();

		await dismissWithKeyboard(page, getRemoveButton(page, 'Category: Health'));

		await expect(getStatus(page)).toHaveText('Removed: Category: Health. 2 remaining.');
		await expect(getRemoveButton(page, 'Region: Northern Ontario')).toBeFocused();
	});

	test('does not move focus or announce when the removal comes after the one-second expiry', async ({ page }) => {
		await page.setContent(appliedFilters + removeOnDismiss(1500));
		await page.waitForChanges();

		const button = getRemoveButton(page, 'Category: Health');
		await dismissWithKeyboard(page, button);
		await expect(page.locator('ontario-tag')).toHaveCount(2, { timeout: 3000 });

		await expect(getHeading(page)).toHaveText('Applied filters (2)');
		await expect(getStatus(page)).toHaveText('');
		await expect(getRemoveButton(page, 'Region: Northern Ontario')).not.toBeFocused();
	});

	test('does not move focus or announce when the consumer never removes the tag', async ({ page }) => {
		await page.setContent(appliedFilters + removeOnDismiss(-1));
		await page.waitForChanges();

		await dismissWithKeyboard(page, getRemoveButton(page, 'Category: Health'));

		await expect(page.locator('ontario-tag')).toHaveCount(3);
		await expect(getStatus(page)).toHaveText('');
		await expect(getRemoveButton(page, 'Category: Health')).toBeFocused();
	});

	test('follows a removal when the consumer replaces the tags instead of removing one', async ({ page }) => {
		await page.setContent(`
			${appliedFilters}
			<script>
				document.addEventListener('tagDismissed', (event) => {
					const group = document.querySelector('ontario-tag-group');
					const remaining = [...group.querySelectorAll('ontario-tag')].filter((tag) => tag !== event.target);
					group.replaceChildren(
						...remaining.map((tag) => {
							const copy = document.createElement('ontario-tag');
							copy.setAttribute('label', tag.getAttribute('label'));
							copy.setAttribute('value', tag.getAttribute('value'));
							copy.setAttribute('dismissible', '');
							return copy;
						}),
					);
				});
			</script>
		`);
		await page.waitForChanges();

		await dismissWithKeyboard(page, getRemoveButton(page, 'Category: Health'));

		await expect(getHeading(page)).toHaveText('Applied filters (2)');
		await expect(getStatus(page)).toHaveText('Removed: Category: Health. 2 remaining.');
		await expect(getRemoveButton(page, 'Region: Northern Ontario')).toBeFocused();
	});

	test('updates the count without an announcement when a tag is added', async ({ page }) => {
		await page.setContent(appliedFilters);
		await page.waitForChanges();

		await page.locator('ontario-tag-group').evaluate((group) => {
			const tag = document.createElement('ontario-tag');
			tag.setAttribute('label', 'Health');
			group.appendChild(tag);
		});
		await page.waitForChanges();

		await expect(getHeading(page)).toHaveText('Applied filters (4)');
		await expect(getStatus(page)).toHaveText('');
	});
});

test.describe('ontario-tag-group - French', () => {
	test('announces removals in French', async ({ page }) => {
		await page.setContent(`
			<ontario-tag-group group-label="Sujets" language="fr">
				<ontario-tag label="Santé et bien-être" value="health" language="fr" dismissible></ontario-tag>
				<ontario-tag label="Éducation et formation" value="education" language="fr" dismissible></ontario-tag>
			</ontario-tag-group>
			${removeOnDismiss()}
		`);
		await page.waitForChanges();

		const button = page.getByRole('button', { name: 'Supprimer Santé et bien-être' });
		await dismissWithKeyboard(page, button);

		await expect(getStatus(page)).toHaveText('Supprimé\u00a0: Santé et bien-être. 1 restante.');
		await expect(page.getByRole('button', { name: 'Supprimer Éducation et formation' })).toBeFocused();
	});
});

test.describe('ontario-tag-group - semantics and keyboard', () => {
	test('is a group named by its heading and described by its hint text', async ({ page }) => {
		await page.setContent(`
			<ontario-tag-group heading="Applied filters" hint-text="Hint text example.">
				<ontario-tag label="Category: Health" dismissible></ontario-tag>
			</ontario-tag-group>
		`);
		await page.waitForChanges();

		const group = page.getByRole('group', { name: 'Applied filters (1)' });
		await expect(group).toBeVisible();
		await expect(group).toHaveAccessibleDescription('Hint text example.');
	});

	test('is a group named by groupLabel when there is no heading', async ({ page }) => {
		await page.setContent(`
			<ontario-tag-group group-label="Topics">
				<ontario-tag label="Health"></ontario-tag>
				<ontario-tag label="Education" selected></ontario-tag>
			</ontario-tag-group>
		`);
		await page.waitForChanges();

		await expect(page.getByRole('group', { name: 'Topics' })).toBeVisible();
	});

	test('each tag is its own Tab stop and the heading is not', async ({ page }) => {
		await page.setContent(appliedFilters);
		await page.waitForChanges();

		const buttons = page.locator('ontario-tag').locator('button');
		for (let i = 0; i < 3; i++) {
			await page.keyboard.press('Tab');
			await expect(buttons.nth(i)).toBeFocused();
		}
	});
});

test.describe('ontario-tag-group - accessibility', () => {
	test('has no accessibility violations - heading, hint text and dismissible tags', async ({ page }) => {
		await page.setContent(`
			<ontario-tag-group heading="Applied filters" hint-text="Hint text example.">
				<ontario-tag label="Category: Health" dismissible></ontario-tag>
				<ontario-tag label="Region: Northern Ontario" dismissible></ontario-tag>
			</ontario-tag-group>
		`);
		await page.waitForChanges();

		await expectNoAxeViolations(page, 'ontario-tag-group');
	});

	test('has no accessibility violations - groupLabel and non-dismissible tags', async ({ page }) => {
		await page.setContent(`
			<ontario-tag-group group-label="Topics">
				<ontario-tag label="Health"></ontario-tag>
				<ontario-tag label="Education" selected></ontario-tag>
			</ontario-tag-group>
		`);
		await page.waitForChanges();

		await expectNoAxeViolations(page, 'ontario-tag-group');
	});

	test('has no accessibility violations - empty group after every tag is removed', async ({ page }) => {
		await page.setContent(`
			<ontario-tag-group heading="Applied filters">
				<ontario-tag label="Category: Health" dismissible></ontario-tag>
			</ontario-tag-group>
			${removeOnDismiss()}
		`);
		await page.waitForChanges();

		await dismissWithKeyboard(page, getRemoveButton(page, 'Category: Health'));

		await expectNoAxeViolations(page, 'ontario-tag-group');
	});
});
