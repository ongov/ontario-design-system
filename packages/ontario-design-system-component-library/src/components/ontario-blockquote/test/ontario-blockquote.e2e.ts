import { newE2EPage } from '@stencil/core/testing';

describe('ontario-blockquote', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ontario-blockquote></ontario-blockquote>');

    const element = await page.find('ontario-blockquote');
    expect(element).toHaveClass('hydrated');
  });
});
