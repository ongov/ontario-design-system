import { describe, expect, it, render } from '@stencil/vitest';

describe('ontario-page-alert', () => {
	it('should render default informational page alert', async () => {
		const page = await render(`
				<ontario-page-alert heading='This is sample informational page alert'>
				</ontario-page-alert>
			`);
		expect(page.root).toEqualHtml(`
<ontario-page-alert heading="This is sample informational page alert" class="hydrated">
  <mock:shadow-root>
    <div class="ontario-alert ontario-alert--informational">
      <div class="ontario-alert__header">
        <div class="ontario-alert__header-icon" aria-hidden="true">
          <ontario-icon-alert-information icon-width="36" class="hydrated">
            <mock:shadow-root>
              <div class="ontario-icon ontario-icon--width-36">
                <svg class="svg-icon" role="img" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" id="alert-information">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" fill="#1080a6"></path>
                  <path d="M11 17h2v-6h-2v6zm0-8h2V7h-2v2z" fill="#fff"></path>
                </svg>
              </div>
            </mock:shadow-root>
          </ontario-icon-alert-information>
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
		const page = await render(`
				<ontario-page-alert type='warning' heading='This is warning page alert'>
				</ontario-page-alert>
			`);
		expect(page.root).toEqualHtml(`
			<ontario-page-alert type="warning" heading="This is warning page alert" class="hydrated">
				<mock:shadow-root>
					<div class="ontario-alert ontario-alert--warning">
						<div class="ontario-alert__header">
							<div class="ontario-alert__header-icon" aria-hidden="true">
								<ontario-icon-alert-warning icon-width="36" class="hydrated">
									<mock:shadow-root>
										<div class="ontario-icon ontario-icon--width-36">
											<svg class="svg-icon" role="img" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" id="alert-warning">
												<path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" fill="#ffd440"></path>
												<path d="M11 10h2v4h-2zm0 6h2v2h-2z" fill="#000"></path>
											</svg>
										</div>
									</mock:shadow-root>
								</ontario-icon-alert-warning>
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
		const page = await render(`
				<ontario-page-alert type='success' heading='This is success page alert'>
				</ontario-page-alert>
			`);
		expect(page.root).toEqualHtml(`
		<ontario-page-alert type="success" heading="This is success page alert" class="hydrated">
			<mock:shadow-root>
				<div class="ontario-alert ontario-alert--success">
					<div class="ontario-alert__header">
						<div class="ontario-alert__header-icon" aria-hidden="true">
							<ontario-icon-alert-success icon-width="36" class="hydrated">
								<mock:shadow-root>
									<div class="ontario-icon ontario-icon--width-36">
										<svg class="svg-icon" role="img" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" id="alert-success">
											<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.4-1.4 3.6 3.58L17.17 7l1.4 1.42L10 17z" fill="#118847"></path>
											<path d="M5 12l5 5 8.58-8.58L17.17 7 10 14.17 6.4 10.6 5 12z" fill="#fff"></path>
										</svg>
									</div>
								</mock:shadow-root>
							</ontario-icon-alert-success>
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
		const page = await render(`
				<ontario-page-alert type='error' heading='This is error page alert'>
				</ontario-page-alert>
			`);
		expect(page.root).toEqualHtml(`
		<ontario-page-alert type="error" heading="This is error page alert" class="hydrated">
			<mock:shadow-root>
				<div class="ontario-alert ontario-alert--error">
					<div class="ontario-alert__header">
						<div class="ontario-alert__header-icon" aria-hidden="true">
							<ontario-icon-alert-error icon-width="36" class="hydrated">
								<mock:shadow-root>
									<div class="ontario-icon ontario-icon--width-36">
										<svg class="svg-icon" role="img" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" id="alert-error">
											<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" fill="#cd0000"></path>
											<path d="M11 17h2v-2h-2v2zm0-4h2V7h-2v6z" fill="#fff"></path>
										</svg>
									</div>
								</mock:shadow-root>
							</ontario-icon-alert-error>
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
		const page = await render(`
				<ontario-page-alert>
					<p>This is a sample page alert component using slots. <a href="#">Learn more</a>.</p>
				</ontario-page-alert>
			`);
		expect(page.root).toEqualHtml(`
		<ontario-page-alert class="hydrated">
			<mock:shadow-root>
				<div class="ontario-alert ontario-alert--informational">
					<div class="ontario-alert__header">
						<div class="ontario-alert__header-icon" aria-hidden="true">
							<ontario-icon-alert-information icon-width="36" class="hydrated">
								<mock:shadow-root>
									<div class="ontario-icon ontario-icon--width-36">
										<svg class="svg-icon" role="img" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" id="alert-information">
											<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" fill="#1080a6"></path>
											<path d="M11 17h2v-6h-2v6zm0-8h2V7h-2v2z" fill="#fff"></path>
										</svg>
									</div>
								</mock:shadow-root>
							</ontario-icon-alert-information>
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
