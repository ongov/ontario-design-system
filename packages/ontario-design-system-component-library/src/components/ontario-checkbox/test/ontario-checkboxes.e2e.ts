import { newE2EPage } from '@stencil/core/testing';

describe('ontario-checkboxes', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ontario-checkboxes></ontario-checkboxes>');

    const element = await page.find('ontario-checkboxes');
    expect(element).toHaveClass('hydrated');
  });
});
