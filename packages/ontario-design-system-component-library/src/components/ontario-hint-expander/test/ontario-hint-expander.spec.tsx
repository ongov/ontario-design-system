import { newSpecPage } from '@stencil/core/testing';
import { OntarioHintExpander } from '../ontario-hint-expander';
import { mutationObserverMock } from '../../../utils/tests/mutation-observer.mock';

global.MutationObserver = mutationObserverMock;

describe('ontario-hint-expander', () => {
	it('should render a default hint expander', async () => {
		const page = await newSpecPage({
			components: [OntarioHintExpander],
			html: `<ontario-hint-expander hint="This is the hint" content="This is the content" element-id="elementId" aria-controls="hint-expander-controls">`,
		});
		expect(page.root).toEqualHtml(`
      <ontario-hint-expander hint="This is the hint" content="This is the content" element-id="elementId" aria-controls="hint-expander-controls">
        <mock:shadow-root>
        <div class="ontario-hint-expander__container">
          <button class="ontario-hint-expander__button"
            id="hint-expander-button-elementId"
            aria-controls="hint-expander-content-elementId"
            aria-expanded="false"
            data-toggle="ontario-collapse"
          >
            <span class="ontario-hint-expander__button-icon--close ontario-icon"><ontario-icon-chevron-up></ontario-icon-chevron-up></span>
            <span class="ontario-hint-expander__button-icon--open"><ontario-icon-chevron-down></ontario-icon-chevron-down></span>
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
