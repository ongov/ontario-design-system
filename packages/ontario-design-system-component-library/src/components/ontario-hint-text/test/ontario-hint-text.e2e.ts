import { newE2EPage } from '@stencil/core/testing';

describe('ontario-hint-text', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ontario-hint-text></ontario-hint-text>');

    const element = await page.find('ontario-hint-text');
    expect(element).toHaveClass('hydrated');
  });
});
