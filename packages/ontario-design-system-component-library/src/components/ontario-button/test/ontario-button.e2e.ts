import { newE2EPage } from '@stencil/core/testing';

describe('ontario-button', () => {
	it('renders default button', async () => {
		const page = await newE2EPage();
		await page.setContent('<ontario-button></ontario-button>');
		const component = await page.find('ontario-button');
		const element = await page.find('ontario-button >>> button');

		expect(component).toHaveClass('hydrated');
		expect(element).toHaveClasses(['ontario-button', 'ontario-button--secondary']);
		expect(element.textContent).toEqual('');
		expect(element).toEqualAttributes({
			'aria-label': '',
			'type': 'button',
		});
		expect(element).not.toHaveAttribute('id');
	});

	it('renders changes to the button', async () => {
		const page = await newE2EPage();
		await page.setContent('<ontario-button>Element Content</ontario-button>');
		const component = await page.find('ontario-button');
		const element = await page.find('ontario-button >>> button');

		expect(element).toHaveClasses(['ontario-button', 'ontario-button--secondary']);
		expect(element.textContent).toEqual('Element Content');
		expect(element).toEqualAttributes({
			'aria-label': 'Element Content',
			'type': 'button',
		});
		expect(element).not.toHaveAttribute('id');

		component.setProperty('label', 'Label');
		await page.waitForChanges();
		expect(element).toHaveClasses(['ontario-button', 'ontario-button--secondary']);
		expect(element.textContent).toEqual(`Label`);
		expect(element).toEqualAttributes({
			'aria-label': 'Element Content',
			'type': 'button',
		});

		component.setProperty('ariaLabel', 'Aria Label');
		await page.waitForChanges();
		expect(element).toHaveClasses(['ontario-button', 'ontario-button--secondary']);
		expect(element.textContent).toEqual('Label');
		expect(element).toEqualAttributes({
			'aria-label': 'Aria Label',
			'type': 'button',
		});
		expect(element).not.toHaveAttribute('id');

		component.setProperty('buttonId', 'defaultButton');
		await page.waitForChanges();
		expect(element).toHaveClasses(['ontario-button', 'ontario-button--secondary']);
		expect(element.textContent).toEqual('Label');
		expect(element).toEqualAttributes({
			'aria-label': 'Aria Label',
			'type': 'button',
			'id': 'defaultButton',
		});

		component.setProperty('type', 'primary');
		component.setProperty('htmlType', 'submit');
		await page.waitForChanges();
		expect(element).toHaveClasses(['ontario-button', 'ontario-button--primary']);
		expect(element.textContent).toEqual('Label');
		expect(element).toEqualAttributes({
			'aria-label': 'Aria Label',
			'type': 'submit',
			'id': 'defaultButton',
		});

		component.setProperty('type', 'tertiary');
		component.setProperty('htmlType', 'button');
		component.setProperty('label', 'Back');
		component.setProperty('ariaLabel', 'Back');
		component.setProperty('buttonId', 'BackButton');
		await page.waitForChanges();
		expect(element).toHaveClasses(['ontario-button', 'ontario-button--tertiary']);
		expect(element.textContent).toEqual('Back');
		expect(element).toEqualAttributes({
			'aria-label': 'Back',
			'type': 'button',
			'id': 'BackButton',
		});
	});

	it('fires the onclick event', async () => {
		const page = await newE2EPage();
		await page.setContent('<ontario-button>Element Content</ontario-button>');
		const changedEvent = await page.spyOnEvent('click');
		const component = await page.find('ontario-button');
		component.click();
		await page.waitForChanges();
		expect(changedEvent).toHaveReceivedEventTimes(1);
	});
});
