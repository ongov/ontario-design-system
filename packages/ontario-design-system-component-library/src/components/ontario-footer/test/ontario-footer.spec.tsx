import { newSpecPage } from '@stencil/core/testing';
import { OntarioFooter } from '../ontario-footer';

describe('ontario-footer', () => {
	it('renders', async () => {
		const page = await newSpecPage({
			components: [OntarioFooter],
			html: `<ontario-footer></ontario-footer>`,
		});
		expect(page.root).toEqualHtml(`
      <ontario-footer>
        <mock:shadow-root>
          <footer class="ontario-footer ontario-footer--default">
            <div class="ontario-row">
              <div class="ontario-columns ontario-small-12">
                <ul class="ontario-footer__links-container ontario-footer__links-container--inline">
                  <li>
                  <a class="ontario-footer__link" href="https://www.ontario.ca/page/accessibility">
                    Accessibility
                    </a>
                  </li>
                  <li>
                    <a class="ontario-footer__link" href="https://www.ontario.ca/page/privacy-statement">
                      Privacy
                    </a>
                </li>
                <li>
                  <a class="ontario-footer__link" href="https://www.ontario.ca/feedback/contact-us">
                    Contact us
                    </a>
                  </li>
                </ul>
                <div class="ontario-footer__copyright">
                  <a class="ontario-footer__link" href="https://www.ontario.ca/page/copyright-information-c-queens-printer-ontario">
                    © Queen’s Printer for Ontario,
                    <span class="ontario-nbsp">
                      2012–21
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </mock:shadow-root>
      </ontario-footer>
    `);
	});
});
