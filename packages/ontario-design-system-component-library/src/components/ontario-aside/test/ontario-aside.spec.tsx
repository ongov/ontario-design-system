import { newSpecPage } from '@stencil/core/testing';
import { OntarioAside } from '../ontario-aside';

describe('ontario-aside', () => {
	describe('snapshot', () => {
		it('should render the expected html', async () => {
			const page = await newSpecPage({
				components: [OntarioAside],
				html: `<ontario-aside heading-type="h3" heading-content-type="string" heading-content="Quick fact:" highlight-colour="gold">As of 2013, Canada is responsible for 1.6% of global emissions, with Ontario responsible for less than 0.4% of global emissions.</ontario-aside>`,
			});

			expect(page.root).toMatchSnapshot();
		});
	});

	it('should render the h2 heading level if no headingType prop is passed', async () => {
		const page = await newSpecPage({
			components: [OntarioAside],
			html: `<ontario-aside heading-content-type="string" heading-content="Quick fact:" highlight-colour="gold"><p>As of 2013, Canada is responsible for 1.6% of global emissions, with Ontario responsible for less than 0.4% of global emissions.</p></ontario-aside>`,
		});

		expect(page.root).toEqualHtml(`
			<ontario-aside heading-content-type="string" heading-content="Quick fact:" highlight-colour="gold">
				<mock:shadow-root>
					<aside class="ontario-aside ontario-border-highlight--gold">
						<h2 class="ontario-aside__title ontario-h5">
							Quick fact:
						</h2>
						<slot></slot>
					</aside>
				</mock:shadow-root>
				<p>As of 2013, Canada is responsible for 1.6% of global emissions, with Ontario responsible for less than 0.4% of global emissions.</p>
			</ontario-aside>
		`);
	});

	it('should render the expected heading level when a headingType prop is passed', async () => {
		const page = await newSpecPage({
			components: [OntarioAside],
			html: `<ontario-aside heading-type="h5" heading-content-type="string" heading-content="Quick fact:"><p>As of 2013, Canada is responsible for 1.6% of global emissions, with Ontario responsible for less than 0.4% of global emissions.</p></ontario-aside>`,
		});

		expect(page.root).toEqualHtml(`
			<ontario-aside heading-type="h5" heading-content-type="string" heading-content="Quick fact:">
				<mock:shadow-root>
					<aside class="ontario-aside ontario-border-highlight--teal">
						<h5 class="ontario-aside__title ontario-h5">
							Quick fact:
						</h5>
						<slot></slot>
					</aside>
				</mock:shadow-root>
				<p>As of 2013, Canada is responsible for 1.6% of global emissions, with Ontario responsible for less than 0.4% of global emissions.</p>
			</ontario-aside>
		`);
	});

	it('should render a string heading if no headingContentType prop is passed', async () => {
		const page = await newSpecPage({
			components: [OntarioAside],
			html: `<ontario-aside heading-content="Quick fact:"><p>As of 2013, Canada is responsible for 1.6% of global emissions, with Ontario responsible for less than 0.4% of global emissions.</p></ontario-aside>`,
		});

		expect(page.root).toEqualHtml(`
			<ontario-aside heading-content="Quick fact:">
				<mock:shadow-root>
					<aside class="ontario-aside ontario-border-highlight--teal">
						<h2 class="ontario-aside__title ontario-h5">
							Quick fact:
						</h2>
						<slot></slot>
					</aside>
				</mock:shadow-root>
				<p>As of 2013, Canada is responsible for 1.6% of global emissions, with Ontario responsible for less than 0.4% of global emissions.</p>
			</ontario-aside>
		`);
	});

	it('should render html in the heading content if the headingContentType prop is set to `html`', async () => {
		const page = await newSpecPage({
			components: [OntarioAside],
			html: `<ontario-aside heading-content-type="html" heading-content="<a href='#'>Quick fact:</a>"><p>As of 2013, Canada is responsible for 1.6% of global emissions, with Ontario responsible for less than 0.4% of global emissions.</p></ontario-aside>`,
		});

		expect(page.root).toEqualHtml(`
			<ontario-aside heading-content-type="html" heading-content="<a href='#'>Quick fact:</a>" heading-content="Quick fact:">
				<mock:shadow-root>
					<aside class="ontario-aside ontario-border-highlight--teal">
						<h2 class="ontario-aside__title ontario-h5">
							<a href="#">Quick fact:</a>
						</h2>
						<slot></slot>
					</aside>
				</mock:shadow-root>
				<p>As of 2013, Canada is responsible for 1.6% of global emissions, with Ontario responsible for less than 0.4% of global emissions.</p>
			</ontario-aside>
		`);
	});

	it('should reflect attributes/props being set', async () => {
		const page = await newSpecPage({
			components: [OntarioAside],
			html: `<ontario-aside heading-type="h4" heading-content-type="html" heading-content="<a href='#'>Quick fact:</a>" highlight-colour="purple" content="As of 2013, Canada is responsible for 1.6% of global emissions, with Ontario responsible for less than 0.4% of global emissions."></ontario-aside>`,
		});

		expect(page.rootInstance.headingType).toBe('h4');
		expect(page.rootInstance.headingContentType).toBe('html');
		expect(page.rootInstance.headingContent).toBe("<a href='#'>Quick fact:</a>");
		expect(page.rootInstance.highlightColour).toBe('purple');
		expect(page.rootInstance.content).toBe(
			'As of 2013, Canada is responsible for 1.6% of global emissions, with Ontario responsible for less than 0.4% of global emissions.',
		);
	});
});
