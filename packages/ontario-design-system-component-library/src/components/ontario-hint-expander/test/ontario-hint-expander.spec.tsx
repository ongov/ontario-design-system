import { render } from '@stencil/vitest';
import { mutationObserverMock } from '../../../utils/tests/mutation-observer.mock';

global.MutationObserver = mutationObserverMock;

describe('ontario-hint-expander', () => {
	it('should render a default hint expander', async () => {
		const page = await render(
			`<ontario-hint-expander hint="This is the hint" content="This is the content" element-id="elementId" aria-controls="hint-expander-controls">`,
		);
		expect(page.root).toEqualHtml(`
<ontario-hint-expander hint="This is the hint" content="This is the content" element-id="elementId" aria-controls="hint-expander-controls" class="hydrated">
  <mock:shadow-root>
    <div class="ontario-hint-expander__container">
      <button class="ontario-hint-expander__button" id="hint-expander-button-elementId" aria-controls="hint-expander-content-elementId" aria-expanded="false" data-toggle="ontario-collapse">
        <span class="ontario-hint-expander__button-icon--close ontario-icon">
          <ontario-icon-chevron-up is-decorative="true" class="hydrated">
            <mock:shadow-root>
              <div class="ontario-icon ontario-icon--inherit ontario-icon--width-24">
                <svg class="svg-icon" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" id="chevron-up">
                  <path d="M7.4 15.4l4.6-4.58 4.6 4.58L18 14l-6-6-6 6 1.4 1.4z"></path>
                </svg>
              </div>
            </mock:shadow-root>
          </ontario-icon-chevron-up>
        </span>
        <span class="ontario-hint-expander__button-icon--open">
          <ontario-icon-chevron-down is-decorative="true" class="hydrated">
            <mock:shadow-root>
              <div class="ontario-icon ontario-icon--inherit ontario-icon--width-24">
                <svg class="svg-icon" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" id="chevron-down">
                  <path d="M7.4 8.6l4.6 4.58 4.6-4.58L18 10l-6 6-6-6 1.4-1.4z"></path>
                </svg>
              </div>
            </mock:shadow-root>
          </ontario-icon-chevron-down>
        </span>
        This is the hint
      </button>
      <div class="ontario-hint-expander__content" id="hint-expander-content-elementId" aria-labelledby="hint-expander-button-elementId" aria-hidden="true" data-toggle="ontario-expander-content">
        This is the content
      </div>
    </div>
  </mock:shadow-root>
</ontario-hint-expander>
`);
	});
});
