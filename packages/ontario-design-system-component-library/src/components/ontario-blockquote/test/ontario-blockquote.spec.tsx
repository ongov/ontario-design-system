import { newSpecPage } from '@stencil/core/testing';
import { OntarioBlockquote } from '../ontario-blockquote';
import { mutationObserverMock } from '../../../utils/tests/mutation-observer.mock';

global.MutationObserver = mutationObserverMock;

describe('ontario-blockquote', () => {
	describe('snapshot', () => {
		it('should render the expected html', async () => {
			const page = await newSpecPage({
				components: [OntarioBlockquote],
				html: `<ontario-blockquote quote="This is a test quote" attribution="DS Tech Team"></ontario-blockquote>`,
			});

			expect(page.root).toMatchSnapshot();
		});
	});

	it('should render a byline when the byline prop is passed', async () => {
		const page = await newSpecPage({
			components: [OntarioBlockquote],
			html: `<ontario-blockquote attribution="DS Tech Team" byline="The best team at the ODS!">This is a test quote</ontario-blockquote>`,
		});
		expect(page.root).toEqualHtml(`
      <ontario-blockquote attribution="DS Tech Team" byline="The best team at the ODS!">
        <mock:shadow-root>
          <blockquote class="ontario-blockquote ontario-blockquote--short">
						<p>This is a test quote</p>
						<cite class="ontario-blockquote__attribution">DS Tech Team</cite>
						<cite class="ontario-blockquote__byline">The best team at the ODS!</cite>
					</blockquote>
        </mock:shadow-root>
				This is a test quote
      </ontario-blockquote>
    `);
	});

	it('should reflect attributes/props being set', async () => {
		const page = await newSpecPage({
			components: [OntarioBlockquote],
			html: `<ontario-blockquote quote="This is another test quote" attribution="DS Tech Team" byline="Ontario Digital Service"></ontario-blockquote>`,
		});

		expect(page.rootInstance.quote).toBe('This is another test quote');
		expect(page.rootInstance.attribution).toBe('DS Tech Team');
		expect(page.rootInstance.byline).toBe('Ontario Digital Service');
	});

	it('should set the shortQuote state to `true` when the character count is under 140', async () => {
		const page = await newSpecPage({
			components: [OntarioBlockquote],
			html: `<ontario-blockquote quote="This is another test quote" attribution="DS Tech Team" byline="Ontario Digital Service"></ontario-blockquote>`,
		});

		expect(page.rootInstance.shortQuote).toBe(true);
	});

	it('should set the shortQuote state to `false` when the character count is over 140', async () => {
		const page = await newSpecPage({
			components: [OntarioBlockquote],
			html: `<ontario-blockquote attribution="Homer Simpson">I saw this movie about a bus that had to speed around a city, keeping its speed over fifty, and if its speed dropped, it would explode! I think it was called, "The Bus That Couldn’t Slow Down".</ontario-blockquote>`,
		});

		expect(page.rootInstance.shortQuote).toBe(false);
	});
});
