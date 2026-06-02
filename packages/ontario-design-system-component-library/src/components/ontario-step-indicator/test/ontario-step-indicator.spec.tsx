import { newSpecPage } from '@stencil/core/testing';
import { OntarioStepIndicator } from '../ontario-step-indicator';

describe('ontario-step-indicator', () => {
	let warnSpy: jest.SpyInstance;

	beforeEach(() => {
		warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => undefined);
	});

	afterEach(() => {
		warnSpy.mockRestore();
	});

	describe('renders', () => {
		it('the default output', async () => {
			const page = await newSpecPage({
				components: [OntarioStepIndicator],
				html: `<ontario-step-indicator></ontario-step-indicator>`,
			});

			expect(page.root).toMatchSnapshot();
		});

		it('the step output shape', async () => {
			const page = await newSpecPage({
				components: [OntarioStepIndicator],
				html: `<ontario-step-indicator current-step="2" number-of-steps="5"></ontario-step-indicator>`,
			});

			expect(page.root).toMatchSnapshot();
		});

		it('the percentage output shape with a back link', async () => {
			const page = await newSpecPage({
				components: [OntarioStepIndicator],
				html: `<ontario-step-indicator show-back-button="true" back-button-url="https://designsystem.ontario.ca/" percentage-complete="70"></ontario-step-indicator>`,
			});

			expect(page.root).toMatchSnapshot();
		});

		it('step mode by default', async () => {
			const page = await newSpecPage({
				components: [OntarioStepIndicator],
				html: `<ontario-step-indicator></ontario-step-indicator>`,
			});

			expect(page.root?.shadowRoot?.querySelector('.ontario-h4')?.textContent?.replace(/\s+/g, ' ').trim()).toBe(
				'Step ? of ?',
			);
			expect(warnSpy).toHaveBeenCalledTimes(0);
		});

		it('a placeholder when currentStep is missing', async () => {
			const page = await newSpecPage({
				components: [OntarioStepIndicator],
				html: `<ontario-step-indicator number-of-steps="5"></ontario-step-indicator>`,
			});

			expect(page.root?.shadowRoot?.querySelector('.ontario-h4')?.textContent?.replace(/\s+/g, ' ').trim()).toBe(
				'Step ? of 5',
			);
		});

		it('a placeholder when numberOfSteps is missing', async () => {
			const page = await newSpecPage({
				components: [OntarioStepIndicator],
				html: `<ontario-step-indicator current-step="2"></ontario-step-indicator>`,
			});

			expect(page.root?.shadowRoot?.querySelector('.ontario-h4')?.textContent?.replace(/\s+/g, ' ').trim()).toBe(
				'Step 2 of ?',
			);
		});

		it('percentage mode when percentageComplete is defined', async () => {
			const page = await newSpecPage({
				components: [OntarioStepIndicator],
				html: `<ontario-step-indicator percentage-complete="70"></ontario-step-indicator>`,
			});

			expect(page.root?.shadowRoot?.querySelector('.ontario-h4')?.textContent?.replace(/\s+/g, ' ').trim()).toBe(
				'70% complete',
			);
		});

		it('percentage mode when percentageComplete is 0', async () => {
			const page = await newSpecPage({
				components: [OntarioStepIndicator],
				html: `<ontario-step-indicator percentage-complete="0"></ontario-step-indicator>`,
			});

			expect(page.root?.shadowRoot?.querySelector('.ontario-h4')?.textContent?.replace(/\s+/g, ' ').trim()).toBe(
				'0% complete',
			);
		});

		it('a back link when backButtonUrl is provided', async () => {
			const page = await newSpecPage({
				components: [OntarioStepIndicator],
				html: `<ontario-step-indicator show-back-button="true" back-button-url="https://designsystem.ontario.ca/" current-step="2" number-of-steps="5"></ontario-step-indicator>`,
			});

			const link = page.root?.shadowRoot?.querySelector('a');
			const button = page.root?.shadowRoot?.querySelector('button');

			expect(link).not.toBeNull();
			expect(link?.getAttribute('href')).toBe('https://designsystem.ontario.ca/');
			expect(button).toBeNull();
			expect(warnSpy).toHaveBeenCalledTimes(0);
		});

		it('a back button when only customOnClick is provided', async () => {
			const page = await newSpecPage({
				components: [OntarioStepIndicator],
				html: `<ontario-step-indicator current-step="2" number-of-steps="5"></ontario-step-indicator>`,
			});

			page.rootInstance.showBackButton = true;
			page.rootInstance.customOnClick = jest.fn();
			page.rootInstance.backButtonUrl = undefined;
			warnSpy.mockClear();
			page.rootInstance.componentWillLoad();
			await page.waitForChanges();

			const link = page.root?.shadowRoot?.querySelector('a');
			const button = page.root?.shadowRoot?.querySelector('button');

			expect(button).not.toBeNull();
			expect(link).toBeNull();
			expect(warnSpy).toHaveBeenCalledTimes(0);
		});
	});

	describe('warns', () => {
		it('when percentage and step props are mixed', async () => {
			const page = await newSpecPage({
				components: [OntarioStepIndicator],
				html: `<ontario-step-indicator percentage-complete="70" current-step="2" number-of-steps="5"></ontario-step-indicator>`,
			});

			expect(warnSpy).toHaveBeenCalledTimes(1);
			expect(page.root?.shadowRoot?.querySelector('.ontario-h4')?.textContent?.replace(/\s+/g, ' ').trim()).toBe(
				'70% complete',
			);
		});

		it('when currentStep is missing', async () => {
			const page = await newSpecPage({
				components: [OntarioStepIndicator],
				html: `<ontario-step-indicator number-of-steps="5"></ontario-step-indicator>`,
			});

			expect(warnSpy).toHaveBeenCalledTimes(1);
			expect(page.root?.shadowRoot?.querySelector('.ontario-h4')?.textContent?.replace(/\s+/g, ' ').trim()).toBe(
				'Step ? of 5',
			);
		});

		it('when numberOfSteps is missing', async () => {
			const page = await newSpecPage({
				components: [OntarioStepIndicator],
				html: `<ontario-step-indicator current-step="2"></ontario-step-indicator>`,
			});

			expect(warnSpy).toHaveBeenCalledTimes(1);
			expect(page.root?.shadowRoot?.querySelector('.ontario-h4')?.textContent?.replace(/\s+/g, ' ').trim()).toBe(
				'Step 2 of ?',
			);
		});

		it('when a back button has no backButtonUrl or customOnClick', async () => {
			const page = await newSpecPage({
				components: [OntarioStepIndicator],
				html: `<ontario-step-indicator show-back-button="true" current-step="2" number-of-steps="5"></ontario-step-indicator>`,
			});

			expect(page.root?.shadowRoot?.querySelector('button')).not.toBeNull();
			expect(warnSpy).toHaveBeenCalledTimes(1);
		});

		it('when backButtonUrl and customOnClick are both provided', async () => {
			const page = await newSpecPage({
				components: [OntarioStepIndicator],
				html: `<ontario-step-indicator show-back-button="true" back-button-url="https://designsystem.ontario.ca/" current-step="2" number-of-steps="5"></ontario-step-indicator>`,
			});

			page.rootInstance.customOnClick = jest.fn();
			warnSpy.mockClear();
			page.rootInstance.componentWillLoad();
			await page.waitForChanges();

			expect(warnSpy).toHaveBeenCalledTimes(1);
			expect(page.root?.shadowRoot?.querySelector('a')).not.toBeNull();
			expect(page.root?.shadowRoot?.querySelector('button')).toBeNull();
		});
	});

	describe('prefers', () => {
		it('percentage mode when percentage and step props are mixed', async () => {
			const page = await newSpecPage({
				components: [OntarioStepIndicator],
				html: `<ontario-step-indicator percentage-complete="70" current-step="2" number-of-steps="5"></ontario-step-indicator>`,
			});

			expect(page.root?.shadowRoot?.querySelector('.ontario-h4')?.textContent?.replace(/\s+/g, ' ').trim()).toBe(
				'70% complete',
			);
		});

		it('the anchor when backButtonUrl and customOnClick are both provided', async () => {
			const page = await newSpecPage({
				components: [OntarioStepIndicator],
				html: `<ontario-step-indicator show-back-button="true" back-button-url="https://designsystem.ontario.ca/" current-step="2" number-of-steps="5"></ontario-step-indicator>`,
			});

			page.rootInstance.customOnClick = jest.fn();
			warnSpy.mockClear();
			page.rootInstance.componentWillLoad();
			await page.waitForChanges();

			expect(page.root?.shadowRoot?.querySelector('a')).not.toBeNull();
			expect(page.root?.shadowRoot?.querySelector('button')).toBeNull();
		});
	});
});
