import { newSpecPage } from '@stencil/core/testing';
import { OntarioRadioButtons } from '../ontario-radio-buttons';

describe('ontario-radio-buttons', () => {
	it('renders', async () => {
		const page = await newSpecPage({
			components: [OntarioRadioButtons],
			html: `<ontario-radio-buttons></ontario-radio-buttons>`,
		});
		expect(page.root).toEqualHtml(`
      <ontario-radio-buttons>
        <mock:shadow-root>
          <div class="ontario-form-group">
            <fieldset class="ontario-fieldset">
                <legend class="ontario-fieldset__legend">
                  <span class="ontario-label__flag">
                    (optional)
                  </span>
                </legend>
              <div class="ontario-radios">
                <div class="ontario-error-messaging ontario-error__hidden" role="alert">
                  <ontario-icon-alert-error></ontario-icon-alert-error>
                  <div class="ontario-error-messaging__content"></div>
                </div>
              </div>
            </fieldset>
          </div>
        </mock:shadow-root>
      </ontario-radio-buttons>
    `);
	});
});
