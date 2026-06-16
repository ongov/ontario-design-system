import { render } from '@stencil/vitest';
import { mutationObserverMock } from '../../../utils/tests/mutation-observer.mock';

global.MutationObserver = mutationObserverMock;

describe('ontario-hint-text', () => {
	describe('snapshot', () => {
		it('should render the expected html', async () => {
			const page = await render(
				`<ontario-hint-text element-id="idTest" hint="This is a test hint"></ontario-hint-text>`,
			);
			expect(page.root).toMatchSnapshot();
		});
	});

	it('renders', async () => {
		const page = await render(`<ontario-hint-text element-id="idTest" hint="This is a test hint"></ontario-hint-text>`);
		expect(page.root).toEqualHtml(`
<ontario-hint-text element-id="idTest" hint="This is a test hint" class="hydrated">
  <mock:shadow-root>
    <p part="hint-text" id="idTest" class="ontario-hint">
      This is a test hint
    </p>
  </mock:shadow-root>
</ontario-hint-text>
`);
	});
});
