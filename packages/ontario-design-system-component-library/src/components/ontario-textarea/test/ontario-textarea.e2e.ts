import { newE2EPage } from '@stencil/core/testing';

describe('ontario-textarea', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ontario-textarea></ontario-textarea>');

    const element = await page.find('ontario-textarea');
    expect(element).toHaveClass('hydrated');
  });
});
