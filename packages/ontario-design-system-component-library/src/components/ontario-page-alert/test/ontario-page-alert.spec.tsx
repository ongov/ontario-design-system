import { newSpecPage } from '@stencil/core/testing';
import { OntarioPageAlert } from '../ontario-page-alert';

describe('ontario-page-alert', () => {
	it('should render default informational page alert', async () => {
		const page = await newSpecPage({
			components: [OntarioPageAlert],
			html: `
				<ontario-page-alert heading='This is sample informational page alert'>
				</ontario-page-alert>
			`,
		});
		expect(page.root).toEqualHtml(`
      <ontario-page-alert heading='This is sample informational page alert'>
				<mock:shadow-root>
			     <div class="ontario-alert ontario-alert--informational">
			       <div class="ontario-alert__header">
			         <div class="ontario-alert__header-icon">
			           <ontario-icon-alert-information icon-width="36"></ontario-icon-alert-information>
			         </div>
			         <h2 class="ontario-alert__header-title ontario-h4">
							 	This is sample informational page alert
							 </h2>
			       </div>
			       <div class="ontario-alert__body">
			         <slot></slot>
			       </div>
			     </div>
			  </mock:shadow-root>
      </ontario-page-alert>
    `);
	});

	it('should render warning page alert', async () => {
		const page = await newSpecPage({
			components: [OntarioPageAlert],
			html: `
				<ontario-page-alert type='warning' heading='This is warning page alert'>
				</ontario-page-alert>
			`,
		});
		expect(page.root).toEqualHtml(`
      <ontario-page-alert type='warning' heading='This is warning page alert'>
				<mock:shadow-root>
			     <div class="ontario-alert ontario-alert--warning">
			       <div class="ontario-alert__header">
			         <div class="ontario-alert__header-icon">
			           <ontario-icon-alert-warning icon-width="36"></ontario-icon-alert-warning>
			         </div>
			         <h2 class="ontario-alert__header-title ontario-h4">
							 	This is warning page alert
							 </h2>
			       </div>
			       <div class="ontario-alert__body">
			         <slot></slot>
			       </div>
			     </div>
			  </mock:shadow-root>
      </ontario-page-alert>
    `);
	});

	it('should render success page alert', async () => {
		const page = await newSpecPage({
			components: [OntarioPageAlert],
			html: `
				<ontario-page-alert type='success' heading='This is success page alert'>
				</ontario-page-alert>
			`,
		});
		expect(page.root).toEqualHtml(`
      <ontario-page-alert type='success' heading='This is success page alert'>
				<mock:shadow-root>
			     <div class="ontario-alert ontario-alert--success">
			       <div class="ontario-alert__header">
			         <div class="ontario-alert__header-icon">
			           <ontario-icon-alert-success icon-width="36"></ontario-icon-alert-success>
			         </div>
			         <h2 class="ontario-alert__header-title ontario-h4">
							 	This is success page alert
							 </h2>
			       </div>
			       <div class="ontario-alert__body">
			         <slot></slot>
			       </div>
			     </div>
			  </mock:shadow-root>
      </ontario-page-alert>
    `);
	});

	it('should render error page alert', async () => {
		const page = await newSpecPage({
			components: [OntarioPageAlert],
			html: `
				<ontario-page-alert type='error' heading='This is error page alert'>
				</ontario-page-alert>
			`,
		});
		expect(page.root).toEqualHtml(`
      <ontario-page-alert type='error' heading='This is error page alert'>
				<mock:shadow-root>
			     <div class="ontario-alert ontario-alert--error">
			       <div class="ontario-alert__header">
			         <div class="ontario-alert__header-icon">
			           <ontario-icon-alert-error icon-width="36"></ontario-icon-alert-error>
			         </div>
			         <h2 class="ontario-alert__header-title ontario-h4">
							 	This is error page alert
							 </h2>
			       </div>
			       <div class="ontario-alert__body">
			         <slot></slot>
			       </div>
			     </div>
			  </mock:shadow-root>
      </ontario-page-alert>
    `);
	});

	it('should render content in slot', async () => {
		const page = await newSpecPage({
			components: [OntarioPageAlert],
			html: `
				<ontario-page-alert>
					<p>This is a sample page alert component using slots. <a href="#">Learn more</a>.</p>
				</ontario-page-alert>
			`,
		});
		expect(page.root).toEqualHtml(`
      <ontario-page-alert>
				<mock:shadow-root>
			     <div class="ontario-alert ontario-alert--informational">
			       <div class="ontario-alert__header">
			         <div class="ontario-alert__header-icon">
			           <ontario-icon-alert-information icon-width="36"></ontario-icon-alert-information>
			         </div>
			         <h2 class="ontario-alert__header-title ontario-h4"></h2>
			       </div>
			       <div class="ontario-alert__body">
			         <slot></slot>
			       </div>
			     </div>
			  </mock:shadow-root>
			  <p>
			    This is a sample page alert component using slots.
					<a href="#">
						Learn more
					</a>
			    .
			  </p>
      </ontario-page-alert>
    `);
	});
});
