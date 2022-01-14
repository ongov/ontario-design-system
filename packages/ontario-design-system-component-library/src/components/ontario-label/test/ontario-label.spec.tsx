import { newSpecPage } from '@stencil/core/testing';
import { OntarioLabel } from '../ontario-label';

describe('ontario-label snapshot', () => {
	it('should render the expected html of ontario-label', async () => {
		const page = await newSpecPage({
			components: [OntarioLabel],
			html: `<ontario-label>Default Label</ontario-label>`,
		});
		expect(page.root).toMatchSnapshot();
	});
});

describe('ontario-label', () => {
	it('should render the default label element', async () => {
		const page = await newSpecPage({
			components: [OntarioLabel],
			html: `<ontario-label>Default Label</ontario-label>`,
		});
		expect(page.root).toEqualHtml(`
      		<ontario-label>
        		<mock:shadow-root>
          			<label class="ontario-label">Default Label
            			<span class="ontario-label__flag">(optional)</span>
          			</label>
        		</mock:shadow-root>
        		Default Label
      		</ontario-label>
    	`);
	});

	it('should render the large label element', async () => {
		const page = await newSpecPage({
			components: [OntarioLabel],
			html: `<ontario-label type="large">Large Label</ontario-label>`,
		});
		expect(page.root).toEqualHtml(`
      		<ontario-label type="large">
        		<mock:shadow-root>
          			<label class="ontario-label ontario-label--large">Large Label
            			<span class="ontario-label__flag">(optional)</span>
          			</label>
        		</mock:shadow-root>
        		Large Label
      		</ontario-label>
    	`);
	});

	it('should render the heading label element', async () => {
		const page = await newSpecPage({
			components: [OntarioLabel],
			html: `<ontario-label type="heading">Heading Label</ontario-label>`,
		});
		expect(page.root).toEqualHtml(`
      		<ontario-label type="heading">
        		<mock:shadow-root>
          			<h1>
            			<label class="ontario-label ontario-label--heading">Heading Label
              				<span class="ontario-label__flag">(optional)</span>
            			</label>
          			</h1>
        		</mock:shadow-root>
        		Heading Label
      		</ontario-label>
    	`);
	});

	it('should render a default required label element', async () => {
		const page = await newSpecPage({
			components: [OntarioLabel],
			html: `<ontario-label required>Default Label</ontario-label>`,
		});
		expect(page.root).toEqualHtml(`
      		<ontario-label required>
        		<mock:shadow-root>
          			<label class="ontario-label">Default Label
            			<span class="ontario-label__flag">(required)</span>
          			</label>
        		</mock:shadow-root>
        		Default Label
      		</ontario-label>
    	`);
	});

	it('should render a default required label element', async () => {
		const page = await newSpecPage({
			components: [OntarioLabel],
			html: `<ontario-label required>Default Label</ontario-label>`,
		});
		expect(page.root).toEqualHtml(`
      <ontario-label required>
        <mock:shadow-root>
          <label class="ontario-label">Default Label
            <span class="ontario-label__flag">(required)</span>
          </label>
        </mock:shadow-root>
        Default Label
      </ontario-label>
    `);
	});

	it('should render a default label element with caption overriding the element content', async () => {
		const page = await newSpecPage({
			components: [OntarioLabel],
			html: `<ontario-label caption="Label Caption">Default Label</ontario-label>`,
		});
		expect(page.root).toEqualHtml(`
    		<ontario-label caption="Label Caption">
        		<mock:shadow-root>
          			<label class="ontario-label">Label Caption
            			<span class="ontario-label__flag">(optional)</span>
          			</label>
        		</mock:shadow-root>
        		Default Label
      		</ontario-label>
    	`);
	});

	it('should render a default label element setting the htmlFor attribute', async () => {
		const page = await newSpecPage({
			components: [OntarioLabel],
			html: `<ontario-label for="comments">Comments</ontario-label>`,
		});
		expect(page.root).toEqualHtml(`
      		<ontario-label for="comments">
        		<mock:shadow-root>
          			<label class="ontario-label" htmlFor="comments">Comments
            			<span class="ontario-label__flag">(optional)</span>
          			</label>
        		</mock:shadow-root>
        		Comments
      		</ontario-label>
    	`);
	});

	it('should throw an error when label is not supplied', async () => {
		try {
			await newSpecPage({
				components: [OntarioLabel],
				html: `<ontario-label></ontario-label>`,
			});
		} catch (validationError) {
			expect(validationError).toEqual(new Error('Label cannot be empty. Please set the label through its caption property or by inserting text between the <ontario-label> tags.'));
		}
	});
});
