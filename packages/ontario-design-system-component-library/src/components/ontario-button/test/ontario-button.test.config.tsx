import { h } from '@stencil/core';
import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { OntarioButton } from '../ontario-button';

export const types = ['primary', 'secondary', 'tertiary'];
export const htmlTypes = ['button', 'submit', 'reset'];
export const typeDefault = 'secondary';
export const htmlTypeDefault = 'button';
export const elementContentDefault = 'Element Content';
export const labelDefault = 'Label';
export const ariaLabelDefault = 'Aria Label';

export class Test {
	/**
	 * Generates the test case that is to be executed by the test framework
	 * @param testCase case configuration data
	 * @returns the test case to be executed by the test framework
	 */
	private getUnitTestCases(testCase: any) {
		let unitTestCase;
		const elementContent = testCase.hasElementContent ? elementContentDefault : null;

		if (testCase.hasTypes && testCase.hasHTMLTypes) {
			types.forEach((type: any) => {
				htmlTypes.forEach((htmlType: any) => {
					unitTestCase = it(`renders ${type} ${htmlType} button`, async () => {
						const page = await newSpecPage(
							this.getPage(
								<ontario-button type={type} htmlType={htmlType}>
									{elementContent}
								</ontario-button>,
							),
						);
						this.getExpectedResults(page, type, htmlType, elementContent);
					});
				});
			});
		} else if (testCase.hasTypes && !testCase.hasHTMLTypes) {
			types.forEach((type: any) => {
				unitTestCase = it(`renders ${type} button`, async () => {
					const page = await newSpecPage(this.getPage(<ontario-button type={type}>{elementContent}</ontario-button>));
					this.getExpectedResults(page, type, htmlTypeDefault, elementContent);
				});
			});
		} else if (!testCase.hasTypes && testCase.hasHTMLTypes) {
			htmlTypes.forEach((htmlType: any) => {
				unitTestCase = it(`renders ${htmlType} button`, async () => {
					const page = await newSpecPage(this.getPage(<ontario-button htmlType={htmlType}>{elementContent}</ontario-button>));
					this.getExpectedResults(page, typeDefault, htmlType, elementContent);
				});
			});
		} else {
			unitTestCase = it(`${testCase.name}`, async () => {
				const page = await newSpecPage(this.getPage(<ontario-button>{elementContent}</ontario-button>));
				this.getExpectedResults(page, typeDefault, htmlTypeDefault, elementContent);
			});
		}

		return unitTestCase;
	}

	/**
	 * Generates the HTML template that the test framework uses
	 * @param htmlTemplate HTML code that is used to generate the template
	 * @returns template that the test framework will use
	 */
	private getPage(htmlTemplate: any) {
		return {
			components: [OntarioButton],
			template: () => htmlTemplate,
		};
	}

	/**
	 * Generates the expected result that the test framework uses as the baseline
	 * @param page HTML template that the test framework uses
	 * @param type type of button with default being `secondary`
	 * @param htmlType html type of button with default being `button`
	 * @param elementContent text that user provides between the `<button>` tags
	 * @returns returns the expected HTML code that the `OntarioButton` component should generate based on the test case parameters
	 */
	private getExpectedResults(page: SpecPage, type: any, htmlType: any, elementContent?: any) {
		const openingTags = `<ontario-button><mock:shadow-root>`;
		const buttonTags = elementContent
			? `<button aria-label="${elementContent}" class="ontario-button ontario-button--${type}" type="${htmlType}">${elementContent}</button>`
			: `<button aria-label="" class="ontario-button ontario-button--${type}" type="${htmlType}"></button>`;
		const closingTags = elementContent ? `</mock:shadow-root>${elementContent}</ontario-button>` : `</mock:shadow-root></ontario-button>`;

		return expect(page.root).toEqualHtml(`${openingTags}${buttonTags}${closingTags}`);
	}

	/**
	 * The only function that the `Test` class exposes for end user to generate unit test suites in their unit test file.
	 * It will rely on multiple private properties and functions within the class to generate the test suites.
	 * @param testSuite configuration data provided
	 * @returns unit test suites that contains all possible combinations
	 */
	getUnitTestSuite(testSuite: any) {
		return describe(testSuite.name, () => {
			testSuite.cases?.forEach((testCase: any) => {
				this.getUnitTestCases(testCase);
			});
		});
	}
}

/**
 * Configuration data of all possible test suites which contain cases for all possible combinations.
 * The suites are arranged based on its complexity, starting from the simplest scenario: `<ontario-button></ontario-button>`
 * The default button is of its own test case under each test suites because the HTML will still render with the simplest test scenario,
 * so the default test case for each suite is necessary.
 */
export const testSuites = [
	{
		name: 'button without setting label and ariaLabel',
		cases: [
			{
				description: 'default button',
			},
			{
				description: 'button',
				hasTypes: true,
				hasHTMLTypes: true,
			},
		],
	},
	{
		name: 'ontario-button with element content',
		cases: [
			{
				description: 'default button',
				hasElementContent: true,
			},
			{
				description: 'button',
				hasTypes: true,
				hasHTMLTypes: true,
				hasElementContent: true,
			},
		],
	},
	{
		name: 'ontario-button with label',
		cases: [
			{
				description: 'default button',
				hasLabel: true,
			},
			{
				description: 'button',
				hasTypes: true,
				hasHTMLTypes: true,
				hasLabel: true,
			},
		],
	},
];
