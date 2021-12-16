import { newE2EPage } from '@stencil/core/testing';

describe('ontario-label', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ontario-label></ontario-label>');

    const element = await page.find('ontario-label');
    expect(element).toHaveClass('hydrated');
  });
});
