import { render } from '@stencil/vitest';

describe('ontario-in-page-navigation', () => {
	it('renders with no information', async () => {
		const page = await render(`<ontario-in-page-navigation></ontario-in-page-navigation>`);

		expect(page.root).toBeTruthy();
	});

	it('renders with slotted list item content', async () => {
		const page = await render(`<ontario-in-page-navigation>
			<li><a href="#section-1">Section 1</a></li>
		</ontario-in-page-navigation>`);

		expect(page.root).toBeTruthy();
	});
});
