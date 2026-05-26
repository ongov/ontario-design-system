import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { OntarioSummaryList } from '../ontario-summary-list';

const defaultCaption = 'Personal information';
const overrideCaption = 'Contact details';
const actionLinkCaption = 'Address';
const actionLinkHref = '/change-address';

describe('ontario-summary-list', () => {
	let page: SpecPage;
	let host: HTMLElement;

	beforeEach(async () => {
		page = await newSpecPage({
			components: [OntarioSummaryList],
			html: `<ontario-summary-list caption="${defaultCaption}"></ontario-summary-list>`,
		});
		host = page.root as HTMLElement;
		await page.waitForChanges();
	});

	it('should render', () => {
		expect(host).not.toBeNull();
		expect(host.tagName).toBe('ONTARIO-SUMMARY-LIST');
		expect(host.shadowRoot).not.toBeNull();
	});

	it('should render the caption as an h3 heading by default', () => {
		const heading = host.shadowRoot?.querySelector('h3');
		expect(heading).not.toBeNull();
		expect(heading?.textContent).toBe(defaultCaption);
	});

	it('should render the caption using the specified headingLevel', async () => {
		const overridePage = await newSpecPage({
			components: [OntarioSummaryList],
			html: `<ontario-summary-list caption="${overrideCaption}" heading-level="h2"></ontario-summary-list>`,
		});
		await overridePage.waitForChanges();
		const heading = (overridePage.root as HTMLElement).shadowRoot?.querySelector('h2');
		expect(heading).not.toBeNull();
		expect(heading?.textContent).toBe(overrideCaption);
	});

	it('should render a change link when captionActionLink is provided', async () => {
		const linkPage = await newSpecPage({
			components: [OntarioSummaryList],
			html: `<ontario-summary-list caption="${actionLinkCaption}" caption-action-link='{"href":"${actionLinkHref}"}'></ontario-summary-list>`,
		});
		await linkPage.waitForChanges();
		const link = (linkPage.root as HTMLElement).shadowRoot?.querySelector('a.ontario-summary-list__change-button');
		expect(link).not.toBeNull();
		expect(link?.getAttribute('href')).toBe(actionLinkHref);
	});
});
