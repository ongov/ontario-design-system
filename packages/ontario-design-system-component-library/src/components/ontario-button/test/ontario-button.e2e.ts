import { newE2EPage } from '@stencil/core/testing';

describe('ontario-button', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ontario-button></ontario-button>');

    const element = await page.find('ontario-button');
    expect(element).toHaveClass('hydrated');
  });
});


/**
 * iterates through the `testSuites` array and generates cases for each suite to be executed based on the configuration data
 */
// testSuites.forEach((testSuite: any) => {
// 	unitTests.getUnitTestSuite(testSuite);
// });