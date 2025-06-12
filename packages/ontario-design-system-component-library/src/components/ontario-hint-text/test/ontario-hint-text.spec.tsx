import { newSpecPage } from '@stencil/core/testing';
import { OntarioHintText } from '../ontario-hint-text';
import { mutationObserverMock } from '../../../utils/tests/mutation-observer.mock';

global.MutationObserver = mutationObserverMock;

describe('ontario-hint-text', () => {
	describe('snapshot', () => {
		it('should render the expected html', async () => {
			const page = await newSpecPage({
				components: [OntarioHintText],
				html: `<ontario-hint-text element-id="idTest" hint="This is a test hint"></ontario-hint-text>`,
			});
			expect(page.root).toMatchSnapshot();
		});
	});

	it('renders', async () => {
		const page = await newSpecPage({
			components: [OntarioHintText],
			html: `<ontario-hint-text element-id="idTest" hint="This is a test hint"></ontario-hint-text>`,
		});
		expect(page.root).toEqualHtml(`
      <ontario-hint-text element-id="idTest" hint="This is a test hint">
        <mock:shadow-root>
          <p id="idTest" class="ontario-hint" part="hint-text">
            This is a test hint
          </p>
        </mock:shadow-root>
      </ontario-hint-text>
    `);
	});
});
