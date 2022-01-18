import { newE2EPage } from '@stencil/core/testing';

describe('ontario-icon-secondary', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ontario-icon-secondary></ontario-icon-secondary>');

    const element = await page.find('ontario-icon-secondary');
    expect(element).toHaveClass('hydrated');
  });
});
