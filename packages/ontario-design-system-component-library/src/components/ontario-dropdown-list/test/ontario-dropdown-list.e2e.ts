import { newE2EPage } from '@stencil/core/testing';

describe('ontario-dropdown-list', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ontario-dropdown-list></ontario-dropdown-list>');

    const element = await page.find('ontario-dropdown-list');
    expect(element).toHaveClass('hydrated');
  });
});
