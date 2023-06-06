import { newSpecPage } from '@stencil/core/testing';
import { OntarioStepIndicator } from '../ontario-step-indicator';

describe('ontario-step-indicator', () => {
	it('renders', async () => {
		const page = await newSpecPage({
			components: [OntarioStepIndicator],
			html: `<ontario-step-indicator></ontario-step-indicator>`,
		});
		expect(page.root).toEqualHtml(`
      <ontario-step-indicator>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ontario-step-indicator>
    `);
	});
});
