import { newSpecPage } from '@stencil/core/testing';
import { OntarioCallout } from '../ontario-callout';

describe('ontario-callout', () => {
	describe('snapshot', () => {
		it('should render the expected html', async () => {
			const page = await newSpecPage({
				components: [OntarioCallout],
				html: `<ontario-callout heading-type="h3" heading-content-type="string" heading-content="Get notified" highlight-colour="gold"><p><a href="#">Sign up for email reminders</a> and we’ll notify you 60 and 30 days before your licence expires.</p></ontario-callout>`,
			});

			expect(page.root).toMatchSnapshot();
		});
	});

	it('should render the h2 heading level if no headingType prop is passed', async () => {
		const page = await newSpecPage({
			components: [OntarioCallout],
			html: `<ontario-callout heading-content-type="string" heading-content="Get notified" highlight-colour="gold"><p><a href="#">Sign up for email reminders</a> and we’ll notify you 60 and 30 days before your licence expires.</p></ontario-callout>`,
		});

		expect(page.root).toEqualHtml(`
			<ontario-callout heading-content-type="string" heading-content="Get notified" highlight-colour="gold">
				<mock:shadow-root>
					<div class="ontario-callout ontario-border-highlight--gold">
						<h2 class="ontario-callout__title ontario-h5">
							Get notified
						</h2>
						<slot></slot>
					</div>
				</mock:shadow-root>
				<p>
					<a href="#">Sign up for email reminders</a> and we’ll notify you 60 and 30 days before your licence expires.
				</p>
			</ontario-callout>
		`);
	});

	it('should render the expected heading level when a headingType prop is passed', async () => {
		const page = await newSpecPage({
			components: [OntarioCallout],
			html: `<ontario-callout heading-type="h5" heading-content-type="string" heading-content="Get notified"><p><a href="#">Sign up for email reminders</a> and we’ll notify you 60 and 30 days before your licence expires.</p></ontario-callout>`,
		});

		expect(page.root).toEqualHtml(`
			<ontario-callout heading-type="h5" heading-content-type="string" heading-content="Get notified">
				<mock:shadow-root>
					<div class="ontario-callout ontario-border-highlight--teal">
						<h5 class="ontario-callout__title ontario-h5">
							Get notified
						</h5>
						<slot></slot>
					</div>
				</mock:shadow-root>
				<p>
					<a href="#">Sign up for email reminders</a> and we’ll notify you 60 and 30 days before your licence expires.
				</p>
			</ontario-callout>
		`);
	});

	it('should render a string heading if no headingContentType prop is passed', async () => {
		const page = await newSpecPage({
			components: [OntarioCallout],
			html: `<ontario-callout heading-content="Get notified"><p><a href="#">Sign up for email reminders</a> and we’ll notify you 60 and 30 days before your licence expires.</p></ontario-callout>`,
		});

		expect(page.root).toEqualHtml(`
			<ontario-callout heading-content="Get notified">
				<mock:shadow-root>
					<div class="ontario-callout ontario-border-highlight--teal">
						<h2 class="ontario-callout__title ontario-h5">
							Get notified
						</h2>
						<slot></slot>
					</div>
				</mock:shadow-root>
				<p>
					<a href="#">Sign up for email reminders</a> and we’ll notify you 60 and 30 days before your licence expires.
				</p>
			</ontario-callout>
		`);
	});

	it('should render html in the heading content if the headingContentType prop is set to `html`', async () => {
		const page = await newSpecPage({
			components: [OntarioCallout],
			html: `<ontario-callout heading-content-type="html" heading-content="<a href='#'>Get notified</a>"><p><a href="#">Sign up for email reminders</a> and we’ll notify you 60 and 30 days before your licence expires.</p></ontario-callout>`,
		});

		expect(page.root).toEqualHtml(`
			<ontario-callout heading-content-type="html" heading-content="<a href='#'>Get notified</a>" heading-content="Get notified">
				<mock:shadow-root>
					<div class="ontario-callout ontario-border-highlight--teal">
						<h2 class="ontario-callout__title ontario-h5">
							<a href="#">Get notified</a>
						</h2>
						<slot></slot>
					</div>
				</mock:shadow-root>
				<p>
					<a href="#">Sign up for email reminders</a> and we’ll notify you 60 and 30 days before your licence expires.
				</p>
			</ontario-callout>
		`);
	});

	it('should reflect attributes/props being set', async () => {
		const page = await newSpecPage({
			components: [OntarioCallout],
			html: `<ontario-callout heading-type="h4" heading-content-type="html" heading-content="<a href='#'>Get notified</a>" highlight-colour="purple" content="Sign up for email reminders and we'll notify you 60 and 30 days before your licence expires."></ontario-callout>`,
		});

		expect(page.rootInstance.headingType).toBe('h4');
		expect(page.rootInstance.headingContentType).toBe('html');
		expect(page.rootInstance.headingContent).toBe("<a href='#'>Get notified</a>");
		expect(page.rootInstance.highlightColour).toBe('purple');
		expect(page.rootInstance.content).toBe(
			"Sign up for email reminders and we'll notify you 60 and 30 days before your licence expires.",
		);
	});
});
