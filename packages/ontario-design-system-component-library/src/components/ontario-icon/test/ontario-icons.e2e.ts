import { newE2EPage } from '@stencil/core/testing';

describe('ontario-icon', () => {
  describe('render', () => {
    it('renders', async () => {
      const page = await newE2EPage();
      await page.setContent('<ontario-icon-accessibility></ontario-icon-accessibility>');

      const component = await page.find('ontario-icon-accessibility');
      const element = await page.find('ontario-icon-accessibility >>> div');

      expect(component).toHaveClass('hydrated');
      expect(element).toHaveClass('ontario-icon');
    });
  });
});
