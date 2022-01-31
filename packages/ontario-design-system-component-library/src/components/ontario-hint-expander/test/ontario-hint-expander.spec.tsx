import { newSpecPage } from '@stencil/core/testing';
import { OntarioHintExpander } from '../ontario-hint-expander';

describe('ontario-hint-expander', () => {
  it('should render a default hint expander', async () => {
    const page = await newSpecPage({
      components: [OntarioHintExpander],
      html: `<ontario-hint-expander hint="This is the hint" content="This is the content" aria-label="This indicates that the hint can be expanded" hint-expander-id="hintExpanderId" aria-controls="hint-expander-controls">`,
    });
    expect(page.root).toEqualHtml(`
      <ontario-hint-expander hint="This is the hint" content="This is the content" aria-label="This indicates that the hint can be expanded" hint-expander-id="hintExpanderId" aria-controls="hint-expander-controls">
        <mock:shadow-root>
        <div class="ontario-hint-expander__container">
          <button class="ontario-hint-expander__button"
            id="hint-expander-button-hintExpanderId"
            aria-controls="hint-expander-content-hintExpanderId"
            aria-expanded="false"
            data-toggle="ontario-collapse"
            aria-label="This indicates that the hint can be expanded"
          >
            <span class="ontario-hint-expander__button-icon--close ontario-icon"><ontario-icon-chevron-up></ontario-icon-chevron-up></span>
            <span class="ontario-hint-expander__button-icon--open"><ontario-icon-chevron-down></ontario-icon-chevron-down></span>
            This is the hint
          </button>
          <div class="ontario-hint-expander__content" id="hint-expander-content-hintExpanderId" aria-labelledby="hint-expander-button-hintExpanderId" aria-hidden="true" data-toggle="ontario-expander-content">
            This is the content
          </div>
        </div>
        </mock:shadow-root>
      </ontario-hint-expander>
    `);
  });
});
