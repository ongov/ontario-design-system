import { newE2EPage } from '@stencil/core/testing';

describe('ontario-button', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ontario-button></ontario-button>');

    const element = await page.find('ontario-button');
    expect(element).toHaveClass('hydrated');
  });
});
