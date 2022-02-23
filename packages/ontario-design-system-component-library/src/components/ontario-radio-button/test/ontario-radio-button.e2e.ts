import { newE2EPage } from '@stencil/core/testing';

describe('ontario-radio-button', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ontario-radio-button></ontario-radio-button>');

    const element = await page.find('ontario-radio-button');
    expect(element).toHaveClass('hydrated');
  });
});
