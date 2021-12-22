import { newE2EPage } from '@stencil/core/testing';

describe('ontario-input', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ontario-input></ontario-input>');

    const element = await page.find('ontario-input');
    expect(element).toHaveClass('hydrated');
  });
});
