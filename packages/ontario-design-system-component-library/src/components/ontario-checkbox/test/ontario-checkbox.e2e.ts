import { newE2EPage } from '@stencil/core/testing';

describe('ontario-checkbox', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ontario-checkbox></ontario-checkbox>');

    const element = await page.find('ontario-checkbox');
    expect(element).toHaveClass('hydrated');
  });
});
