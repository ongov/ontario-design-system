import { newE2EPage } from '@stencil/core/testing';

describe('ontario-hint-expander', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ontario-hint-expander></ontario-hint-expander>');

    const element = await page.find('ontario-hint-expander');
    expect(element).toHaveClass('hydrated');
  });
});
