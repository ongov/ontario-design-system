import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('ontario-label', () => {
	let page: E2EPage;
	let component: E2EElement;
	let labelElement: E2EElement;
	let requiredFlagElement: E2EElement;
  const defaultLabel = 'Default Label';
  const defaultRequiredFlag = '(optional)';

	beforeEach(async () => {
		page = await newE2EPage();
		await page.setContent(`<ontario-label>${defaultLabel}</ontario-label>`);
		component = await page.find('ontario-label');
		labelElement = await page.find('ontario-label >>> label');
		requiredFlagElement = await page.find('ontario-label >>> label > span');
	});

	describe('render default', () => {
		it('renders the default label', async () => {
			expect(component).toHaveClass('hydrated');
			expect(component.textContent).toEqual(defaultLabel);
			expect(component).not.toHaveAttribute('type');
			expect(component).not.toHaveAttribute('for');
			expect(component).not.toHaveAttribute('required');

			expect(labelElement).toHaveClass('ontario-label');
			expect(labelElement.textContent).toEqual(`${defaultLabel}${defaultRequiredFlag}`);
			expect(labelElement).not.toHaveAttribute('for');
			expect(labelElement).not.toHaveAttribute('required');

			expect(requiredFlagElement).toHaveClass('ontario-label__flag');
			expect(requiredFlagElement.textContent).toEqual(defaultRequiredFlag);
		});
	});

	describe('render changes', () => {
		it('renders changes to the caption property', async () => {
			component.setProperty('caption', 'Comments');

			await page.waitForChanges();

			expect(component.textContent).toEqual(defaultLabel);
			expect(labelElement.textContent).toEqual(`Comments${defaultRequiredFlag}`);
		});

		it('renders changes to the caption and for properties', async () => {
			component.setProperty('caption', 'Comments');
			component.setProperty('for', 'comments');

			await page.waitForChanges();

			expect(component.textContent).toEqual(defaultLabel);
			expect(labelElement.textContent).toEqual(`Comments${defaultRequiredFlag}`);
			expect(labelElement).toEqualAttribute('for', 'comments');
		});

		it('renders changes to the type, caption, and for properties', async () => {
			component.setProperty('type', 'large');
			component.setProperty('caption', 'Feedback');
			component.setProperty('for', 'feedback');

			await page.waitForChanges();

			expect(component.textContent).toEqual(defaultLabel);
			expect(labelElement.textContent).toEqual(`Feedback${defaultRequiredFlag}`);
			expect(labelElement).toEqualAttribute('for', 'feedback');
			expect(labelElement).toHaveClasses(['ontario-label', 'ontario-label--large']);
		});

		it('renders changes to the caption and for properties while setting the required attribute to true', async () => {
			component.setProperty('caption', 'Email');
			component.setProperty('for', 'email');
			component.setAttribute('required', true);

			await page.waitForChanges();

			expect(component.textContent).toEqual(defaultLabel);
			expect(component.getAttribute('required')).toBeTruthy;
			expect(labelElement.textContent).toEqual('Email(required)');
			expect(labelElement).toEqualAttribute('for', 'email');
			expect(requiredFlagElement.textContent).toEqual('(required)');
		});

		it('renders changes to the caption and for properties, modifies the type property to heading, and sets the required attribute to true', async () => {
			component.setProperty('type', 'heading');
			component.setProperty('caption', 'Email Address');
			component.setProperty('for', 'email');
			component.setAttribute('required', true);

			await page.waitForChanges();

			const element = await page.find('ontario-label >>> h1');

			expect(element.outerHTML).toEqualHtml(`
        <h1>
          <label for="email" class="ontario-label ontario-label--heading">
            Email Address
            <span class="ontario-label__flag">(required)</span>
          </label>
        </h1>
      `);
		});
	});
});
