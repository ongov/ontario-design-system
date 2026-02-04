import { newSpecPage } from '@stencil/core/testing';
import { MyComponent } from '../my-component';

describe('my-component', () => {
	it('renders', async () => {
		const page = await newSpecPage({
			components: [MyComponent],
			html: `<my-component></my-component>`,
		});
		expect(page.root).toEqualHtml(`
      <my-component>
        <mock:shadow-root>
          <div class="my-component">
            <p class="heading">My component</p>
            <p class="body">Prop value: value</p>
          </div>
        </mock:shadow-root>
      </my-component>
    `);
	});
});
