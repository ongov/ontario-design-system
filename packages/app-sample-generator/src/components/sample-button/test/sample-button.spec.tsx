import { newSpecPage } from '@stencil/core/testing';
import { SampleButton } from '../sample-button';

describe('sample-button', () => {
	it('renders', async () => {
		const page = await newSpecPage({
			components: [SampleButton],
			html: `<sample-button></sample-button>`,
		});
		expect(page.root).toEqualHtml(`
      <sample-button>
        <mock:shadow-root>
          <button class="button primary" type="button">
            <slot></slot>
          </button>
        </mock:shadow-root>
      </sample-button>
    `);
	});
});
