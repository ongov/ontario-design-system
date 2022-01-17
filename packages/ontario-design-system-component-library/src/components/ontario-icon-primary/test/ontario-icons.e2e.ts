import { newE2EPage } from '@stencil/core/testing';

describe('ontario-icons', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ontario-icons></ontario-icons>');

    const element = await page.find('ontario-icons');
    expect(element).toHaveClass('hydrated');
  });
});
