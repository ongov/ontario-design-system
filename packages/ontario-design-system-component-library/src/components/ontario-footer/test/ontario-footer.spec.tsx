import { render } from '@stencil/vitest';

describe('ontario-footer', () => {
	const OriginalDate = Date;

	beforeAll(() => {
		// Keep real timers to avoid hanging Stencil's async test helpers, but
		// override no-arg Date construction so the footer year is deterministic
		// and the snapshots don't fail when the real-world year advances.
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		(global as any).Date = class extends OriginalDate {
			constructor(...args: [] | ConstructorParameters<typeof Date>) {
				if (args.length === 0) {
					super('2025-06-30T12:00:00Z');
					return;
				}
				super(...(args as ConstructorParameters<typeof Date>));
			}
		} as DateConstructor;
	});

	afterAll(() => {
		// Restore native Date implementation.
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		(global as any).Date = OriginalDate;
	});

	it('renders default ontario-footer', async () => {
		const page = await render(`
      <ontario-footer
        type="default"
        footer-links='{
          "accessibilityLink": {
            "text": "Accessibility",
            "href": "https://www.ontario.ca/page/accessibility"
          },
          "privacyLink": {
            "href": "https://www.ontario.ca/page/privacy-statement"
          },
          "contactLink": {
            "text": "Contact",
            "href": "https://www.ontario.ca/feedback/contact-us"
          },
          "printerLink": {
            "href": "https://www.ontario.ca/page/copyright-information"
          }
        }'
      ></ontario-footer>
      `);

		expect(page.root).toEqualHtml(`
<ontario-footer type="default" footer-links="{ "accessibilityLink": { "text": "Accessibility", "href": "https://www.ontario.ca/page/accessibility" }, "privacyLink": { "href": "https://www.ontario.ca/page/privacy-statement" }, "contactLink": { "text": "Contact", "href": "https://www.ontario.ca/feedback/contact-us" }, "printerLink": { "href": "https://www.ontario.ca/page/copyright-information" } }" class="hydrated">
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
                Contact
              </a>
            </li>
          </ul>
          <div class="ontario-footer__copyright">
            <a class="ontario-footer__link" href="https://www.ontario.ca/page/copyright-information">
              © King's Printer for Ontario,
              <span class="ontario-nbsp">
                2012–25
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

	it('renders twoColoumn ontario-footer', async () => {
		const page = await render(`
      <ontario-footer
        type="twoColumn"
        footer-links='{
          "accessibilityLink": {
            "text": "Accessibility",
            "href": "https://www.ontario.ca/page/accessibility"
          },
          "privacyLink": {
            "href": "https://www.ontario.ca/page/privacy-statement"
          },
          "contactLink": {
            "text": "Contact",
            "href": "https://www.ontario.ca/feedback/contact-us"
          },
          "printerLink": {
            "href": "https://www.ontario.ca/page/copyright-information"
          }
        }'
        two-column-options='{
          "column1": {
            "title": "Ontario Design System",
            "content": [
              {
                "type": "text",
                "text": "The Ontario Design System provides principles, guidance and code to help teams design and build accessible, mobile-friendly government websites and digital services."
              },
              {
                "type": "list",
                "heading": "Latest release",
                "list": ["Built on: June 3, 2022", "Distribution package version 0.12.10"]
              }
            ]
          },
          "column2": {
            "title": "Help us improve the design system",
            "content": [
              {
                "type": "html",
                "html": "You can check our <a href=#>help and feedback page</a> if you don&#8217;t see the component you need."
              }
            ],
            "button": {
              "text": "Send us an email",
              "link": "#"
            }
          }
        }'
      ></ontario-footer>
      `);
		expect(page.root).toEqualHtml(`
<ontario-footer type="twoColumn" footer-links="{ "accessibilityLink": { "text": "Accessibility", "href": "https://www.ontario.ca/page/accessibility" }, "privacyLink": { "href": "https://www.ontario.ca/page/privacy-statement" }, "contactLink": { "text": "Contact", "href": "https://www.ontario.ca/feedback/contact-us" }, "printerLink": { "href": "https://www.ontario.ca/page/copyright-information" } }" two-column-options="{ "column1": { "title": "Ontario Design System", "content": [ { "type": "text", "text": "The Ontario Design System provides principles, guidance and code to help teams design and build accessible, mobile-friendly government websites and digital services." }, { "type": "list", "heading": "Latest release", "list": ["Built on: June 3, 2022", "Distribution package version 0.12.10"] } ] }, "column2": { "title": "Help us improve the design system", "content": [ { "type": "html", "html": "You can check our <a href=#>
  help and feedback page
</a>
if you don’t see the component you need." } ], "button": { "text": "Send us an email", "link": "#" } } }" class="hydrated">
<mock:shadow-root>
  <footer class="ontario-footer ontario-footer--expanded">
    <div class="ontario-footer__expanded-top-section">
      <div class="ontario-row">
        <div class="ontario-columns ontario-small-12 ontario-medium-6">
          <h2 class="ontario-h4">
            Ontario Design System
          </h2>
          <p>
            The Ontario Design System provides principles, guidance and code to help teams design and build accessible, mobile-friendly government websites and digital services.
          </p>
          <h3 class="ontario-h5">
            Latest release
          </h3>
          <ul>
            <li class="ontario-footer__list_item">
              Built on: June 3, 2022
            </li>
            <li class="ontario-footer__list_item">
              Distribution package version 0.12.10
            </li>
          </ul>
        </div>
        <div class="ontario-columns ontario-small-12 ontario-medium-6">
          <h2 class="ontario-h4">
            Help us improve the design system
          </h2>
          <div class="ontario-footer__paragraph">
            You can check our
            <a href="#">
              help and feedback page
            </a>
            if you don’t see the component you need.
          </div>
          <a class="ontario-footer__button ontario-button ontario-margin-bottom-0-!" href="#">
            Send us an email
          </a>
        </div>
      </div>
    </div>
    <div class="ontario-row ontario-footer__expanded-bottom-section">
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
              Contact
            </a>
          </li>
        </ul>
        <div class="ontario-footer__copyright">
          <a class="ontario-footer__link" href="https://www.ontario.ca/page/copyright-information">
            © King's Printer for Ontario,
            <span class="ontario-nbsp">
              2012–25
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

	it('renders twoColoumn ontario-footer with social links', async () => {
		const page = await render(`
      <ontario-footer
        type="twoColumn"
        footer-links='{
          "accessibilityLink": {
            "text": "Accessibility",
            "href": "https://www.ontario.ca/page/accessibility"
          },
          "privacyLink": {
            "href": "https://www.ontario.ca/page/privacy-statement"
          },
          "contactLink": {
            "text": "Contact",
            "href": "https://www.ontario.ca/feedback/contact-us"
          },
          "printerLink": {
            "href": "https://www.ontario.ca/page/copyright-information"
          }
        }'
        social-links='{
          "facebook": "https://www.facebook.com/ONgov",
          "instagram": "https://www.instagram.com/ongov",
          "twitter": "https://twitter.com/ONgov",
          "youtube": "https://www.youtube.com/ongov"
        }'
        two-column-options='{
          "column1": {
            "title": "Ontario Design System",
            "content": [
              {
                "type": "text",
                "text": "The Ontario Design System provides principles, guidance and code to help teams design and build accessible, mobile-friendly government websites and digital services."
              },
              {
                "type": "list",
                "heading": "Latest release",
                "list": ["Built on: June 3, 2022", "Distribution package version 0.12.10"]
              }
            ]
          },
          "column2": {
            "title": "Help us improve the design system",
            "content": [
              {
                "type": "html",
                "html": "You can check our <a href=#>help and feedback page</a> if you don&#8217;t see the component you need."
              }
            ],
            "button": {
              "text": "Send us an email",
              "link": "#"
            }
          }
        }'
      ></ontario-footer>
      `);
		expect(page.root).toEqualHtml(`
<ontario-footer type="twoColumn" footer-links="{ "accessibilityLink": { "text": "Accessibility", "href": "https://www.ontario.ca/page/accessibility" }, "privacyLink": { "href": "https://www.ontario.ca/page/privacy-statement" }, "contactLink": { "text": "Contact", "href": "https://www.ontario.ca/feedback/contact-us" }, "printerLink": { "href": "https://www.ontario.ca/page/copyright-information" } }" social-links="{ "facebook": "https://www.facebook.com/ONgov", "instagram": "https://www.instagram.com/ongov", "twitter": "https://twitter.com/ONgov", "youtube": "https://www.youtube.com/ongov" }" two-column-options="{ "column1": { "title": "Ontario Design System", "content": [ { "type": "text", "text": "The Ontario Design System provides principles, guidance and code to help teams design and build accessible, mobile-friendly government websites and digital services." }, { "type": "list", "heading": "Latest release", "list": ["Built on: June 3, 2022", "Distribution package version 0.12.10"] } ] }, "column2": { "title": "Help us improve the design system", "content": [ { "type": "html", "html": "You can check our <a href=#>
  help and feedback page
</a>
if you don’t see the component you need." } ], "button": { "text": "Send us an email", "link": "#" } } }" class="hydrated">
<mock:shadow-root>
  <footer class="ontario-footer ontario-footer--expanded">
    <div class="ontario-footer__expanded-top-section">
      <div class="ontario-row">
        <div class="ontario-columns ontario-small-12 ontario-medium-6">
          <h2 class="ontario-h4">
            Ontario Design System
          </h2>
          <p>
            The Ontario Design System provides principles, guidance and code to help teams design and build accessible, mobile-friendly government websites and digital services.
          </p>
          <h3 class="ontario-h5">
            Latest release
          </h3>
          <ul>
            <li class="ontario-footer__list_item">
              Built on: June 3, 2022
            </li>
            <li class="ontario-footer__list_item">
              Distribution package version 0.12.10
            </li>
          </ul>
        </div>
        <div class="ontario-columns ontario-small-12 ontario-medium-6">
          <h2 class="ontario-h4">
            Help us improve the design system
          </h2>
          <div class="ontario-footer__paragraph">
            You can check our
            <a href="#">
              help and feedback page
            </a>
            if you don’t see the component you need.
          </div>
          <a class="ontario-footer__button ontario-button ontario-margin-bottom-0-!" href="#">
            Send us an email
          </a>
          <ul class="ontario-footer__links-container ontario-footer__links-container--social">
            <li>
              <a class="ontario-footer__link" href="https://www.facebook.com/ONgov" aria-label="Facebook">
                <ontario-icon-facebook icon-width="32" class="hydrated">
                  <mock:shadow-root>
                    <div class="ontario-icon ontario-icon--white ontario-icon--width-32">
                      <svg class="svg-icon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="facebook">
                        <path d="M17 2v4h-2c-.7 0-1 .8-1 1.5V10h3v4h-3v8h-4v-8H7v-4h3V6a4 4 0 0 1 4-4h3z"></path>
                      </svg>
                    </div>
                  </mock:shadow-root>
                </ontario-icon-facebook>
              </a>
            </li>
            <li>
              <a class="ontario-footer__link" href="https://twitter.com/ONgov" aria-label="Twitter">
                <ontario-icon-twitter icon-width="32" class="hydrated">
                  <mock:shadow-root>
                    <div class="ontario-icon ontario-icon--white ontario-icon--width-32">
                      <svg class="svg-icon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="twitter">
                        <path d="M22.46 6c-.77.35-1.6.58-2.46.7a4.3 4.3 0 0 0 1.88-2.38 8.64 8.64 0 0 1-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.3a4.46 4.46 0 0 0 .11.98C8.28 9.1 5.1 7.38 3 4.8c-.37.63-.58 1.37-.58 2.15 0 1.5.75 2.8 1.9 3.56-.7 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.2a4.22 4.22 0 0 1-1.13.15c-.27 0-.54-.03-.8-.08a4.28 4.28 0 0 0 4 2.98c-1.46 1.16-3.3 1.84-5.33 1.84-.34 0-.68-.02-1.02-.06C3.44 20.3 5.7 21 8.12 21c7.88 0 12.2-6.54 12.2-12.2 0-.2 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"></path>
                      </svg>
                    </div>
                  </mock:shadow-root>
                </ontario-icon-twitter>
              </a>
            </li>
            <li>
              <a class="ontario-footer__link" href="https://www.instagram.com/ongov" aria-label="Instagram">
                <ontario-icon-instagram icon-width="32" class="hydrated">
                  <mock:shadow-root>
                    <div class="ontario-icon ontario-icon--white ontario-icon--width-32">
                      <svg class="svg-icon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="instagram">
                        <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2zm-.2 2A3.6 3.6 0 0 0 4 7.6v8.8A3.6 3.6 0 0 0 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6A3.6 3.6 0 0 0 16.4 4H7.6zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25zM12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path>
                      </svg>
                    </div>
                  </mock:shadow-root>
                </ontario-icon-instagram>
              </a>
            </li>
            <li>
              <a class="ontario-footer__link" href="https://www.youtube.com/ongov" aria-label="Youtube">
                <ontario-icon-youtube icon-width="32" class="hydrated">
                  <mock:shadow-root>
                    <div class="ontario-icon ontario-icon--white ontario-icon--width-32">
                      <svg class="svg-icon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="youtube">
                        <path d="M10 15l5.2-3L10 9v6zm11.56-7.83c.13.47.22 1.1.28 1.9l.1 2.1.06.84c0 2.2-.16 3.8-.44 4.83a2.34 2.34 0 0 1-1.73 1.73c-.47.13-1.33.22-2.65.28l-3.6.1L12 19c-4.2 0-6.8-.16-7.83-.44a2.34 2.34 0 0 1-1.73-1.73c-.13-.47-.22-1.1-.28-1.9l-.1-2.1L2 12c0-2.2.16-3.8.44-4.83a2.34 2.34 0 0 1 1.73-1.73c.47-.13 1.33-.22 2.65-.28l3.6-.1L12 5c4.2 0 6.8.16 7.83.44a2.34 2.34 0 0 1 1.73 1.73z"></path>
                      </svg>
                    </div>
                  </mock:shadow-root>
                </ontario-icon-youtube>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="ontario-row ontario-footer__expanded-bottom-section">
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
              Contact
            </a>
          </li>
        </ul>
        <div class="ontario-footer__copyright">
          <a class="ontario-footer__link" href="https://www.ontario.ca/page/copyright-information">
            © King's Printer for Ontario,
            <span class="ontario-nbsp">
              2012–25
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

	it('renders threeColoumn ontario-footer with social links', async () => {
		const page = await render(`
      <ontario-footer
        type="threeColumn"
        footer-links='{
          "accessibilityLink": {
            "text": "Accessibility",
            "href": "https://www.ontario.ca/page/accessibility"
          },
          "privacyLink": {
            "href": "https://www.ontario.ca/page/privacy-statement"
          },
          "contactLink": {
            "text": "Contact",
            "href": "https://www.ontario.ca/feedback/contact-us"
          },
          "printerLink": {
            "href": "https://www.ontario.ca/page/copyright-information"
          }
        }'
        social-links='{
          "facebook": "https://www.facebook.com/ONgov",
          "instagram": "https://www.instagram.com/ongov",
          "twitter": "https://twitter.com/ONgov",
          "youtube": "https://www.youtube.com/ongov"
        }'
        three-column-options='{
          "column1": {
            "title": "Ontario Design System",
            "content": [
              {
                "type": "text",
                "text": "The Ontario Design System provides principles, guidance and code to help teams design and build accessible, mobile-friendly government websites and digital services."
              }
            ]
          },
          "column2": {
            "title": "Latest release",
            "content": [
              {
                "type": "list",
                "list": ["Built on: June 3, 2022", "Distribution package version 0.12.10"]
              }
            ]
          },
          "column3": {
            "title": "Help us improve the design system",
            "content": [
              {
                "type": "html",
                "html": "You can check our <a href=#>help and feedback page</a> if you don&#8217;t see the component you need."
              }
            ],
            "button": {
              "text": "Send us an email",
              "link": "#"
            }
          }
        }'
      ></ontario-footer>
      `);
		expect(page.root).toEqualHtml(`
<ontario-footer type="threeColumn" footer-links="{ "accessibilityLink": { "text": "Accessibility", "href": "https://www.ontario.ca/page/accessibility" }, "privacyLink": { "href": "https://www.ontario.ca/page/privacy-statement" }, "contactLink": { "text": "Contact", "href": "https://www.ontario.ca/feedback/contact-us" }, "printerLink": { "href": "https://www.ontario.ca/page/copyright-information" } }" social-links="{ "facebook": "https://www.facebook.com/ONgov", "instagram": "https://www.instagram.com/ongov", "twitter": "https://twitter.com/ONgov", "youtube": "https://www.youtube.com/ongov" }" three-column-options="{ "column1": { "title": "Ontario Design System", "content": [ { "type": "text", "text": "The Ontario Design System provides principles, guidance and code to help teams design and build accessible, mobile-friendly government websites and digital services." } ] }, "column2": { "title": "Latest release", "content": [ { "type": "list", "list": ["Built on: June 3, 2022", "Distribution package version 0.12.10"] } ] }, "column3": { "title": "Help us improve the design system", "content": [ { "type": "html", "html": "You can check our <a href=#>
  help and feedback page
</a>
if you don’t see the component you need." } ], "button": { "text": "Send us an email", "link": "#" } } }" class="hydrated">
<mock:shadow-root>
  <footer class="ontario-footer ontario-footer--expanded">
    <div class="ontario-footer__expanded-top-section">
      <div class="ontario-row">
        <div class="ontario-columns ontario-small-12 ontario-medium-12 ontario-large-4 ontario-expanded-footer__one-third-block">
          <h2 class="ontario-h4">
            Ontario Design System
          </h2>
          <p>
            The Ontario Design System provides principles, guidance and code to help teams design and build accessible, mobile-friendly government websites and digital services.
          </p>
        </div>
        <div class="ontario-columns ontario-small-12 ontario-medium-6 ontario-large-4 ontario-expanded-footer__one-third-block">
          <h2 class="ontario-h4">
            Latest release
          </h2>
          <ul>
            <li class="ontario-footer__list_item">
              Built on: June 3, 2022
            </li>
            <li class="ontario-footer__list_item">
              Distribution package version 0.12.10
            </li>
          </ul>
        </div>
        <div class="ontario-columns ontario-small-12 ontario-medium-6 ontario-large-4 ontario-expanded-footer__one-third-block">
          <h2 class="ontario-h4">
            Help us improve the design system
          </h2>
          <div class="ontario-footer__paragraph">
            You can check our
            <a href="#">
              help and feedback page
            </a>
            if you don’t see the component you need.
          </div>
          <a class="ontario-footer__button ontario-button ontario-margin-bottom-0-!" href="#">
            Send us an email
          </a>
          <ul class="ontario-footer__links-container ontario-footer__links-container--social">
            <li>
              <a class="ontario-footer__link" href="https://www.facebook.com/ONgov" aria-label="Facebook">
                <ontario-icon-facebook icon-width="32" class="hydrated">
                  <mock:shadow-root>
                    <div class="ontario-icon ontario-icon--white ontario-icon--width-32">
                      <svg class="svg-icon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="facebook">
                        <path d="M17 2v4h-2c-.7 0-1 .8-1 1.5V10h3v4h-3v8h-4v-8H7v-4h3V6a4 4 0 0 1 4-4h3z"></path>
                      </svg>
                    </div>
                  </mock:shadow-root>
                </ontario-icon-facebook>
              </a>
            </li>
            <li>
              <a class="ontario-footer__link" href="https://twitter.com/ONgov" aria-label="Twitter">
                <ontario-icon-twitter icon-width="32" class="hydrated">
                  <mock:shadow-root>
                    <div class="ontario-icon ontario-icon--white ontario-icon--width-32">
                      <svg class="svg-icon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="twitter">
                        <path d="M22.46 6c-.77.35-1.6.58-2.46.7a4.3 4.3 0 0 0 1.88-2.38 8.64 8.64 0 0 1-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.3a4.46 4.46 0 0 0 .11.98C8.28 9.1 5.1 7.38 3 4.8c-.37.63-.58 1.37-.58 2.15 0 1.5.75 2.8 1.9 3.56-.7 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.2a4.22 4.22 0 0 1-1.13.15c-.27 0-.54-.03-.8-.08a4.28 4.28 0 0 0 4 2.98c-1.46 1.16-3.3 1.84-5.33 1.84-.34 0-.68-.02-1.02-.06C3.44 20.3 5.7 21 8.12 21c7.88 0 12.2-6.54 12.2-12.2 0-.2 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"></path>
                      </svg>
                    </div>
                  </mock:shadow-root>
                </ontario-icon-twitter>
              </a>
            </li>
            <li>
              <a class="ontario-footer__link" href="https://www.instagram.com/ongov" aria-label="Instagram">
                <ontario-icon-instagram icon-width="32" class="hydrated">
                  <mock:shadow-root>
                    <div class="ontario-icon ontario-icon--white ontario-icon--width-32">
                      <svg class="svg-icon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="instagram">
                        <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2zm-.2 2A3.6 3.6 0 0 0 4 7.6v8.8A3.6 3.6 0 0 0 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6A3.6 3.6 0 0 0 16.4 4H7.6zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25zM12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path>
                      </svg>
                    </div>
                  </mock:shadow-root>
                </ontario-icon-instagram>
              </a>
            </li>
            <li>
              <a class="ontario-footer__link" href="https://www.youtube.com/ongov" aria-label="Youtube">
                <ontario-icon-youtube icon-width="32" class="hydrated">
                  <mock:shadow-root>
                    <div class="ontario-icon ontario-icon--white ontario-icon--width-32">
                      <svg class="svg-icon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="youtube">
                        <path d="M10 15l5.2-3L10 9v6zm11.56-7.83c.13.47.22 1.1.28 1.9l.1 2.1.06.84c0 2.2-.16 3.8-.44 4.83a2.34 2.34 0 0 1-1.73 1.73c-.47.13-1.33.22-2.65.28l-3.6.1L12 19c-4.2 0-6.8-.16-7.83-.44a2.34 2.34 0 0 1-1.73-1.73c-.13-.47-.22-1.1-.28-1.9l-.1-2.1L2 12c0-2.2.16-3.8.44-4.83a2.34 2.34 0 0 1 1.73-1.73c.47-.13 1.33-.22 2.65-.28l3.6-.1L12 5c4.2 0 6.8.16 7.83.44a2.34 2.34 0 0 1 1.73 1.73z"></path>
                      </svg>
                    </div>
                  </mock:shadow-root>
                </ontario-icon-youtube>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="ontario-row ontario-footer__expanded-bottom-section">
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
              Contact
            </a>
          </li>
        </ul>
        <div class="ontario-footer__copyright">
          <a class="ontario-footer__link" href="https://www.ontario.ca/page/copyright-information">
            © King's Printer for Ontario,
            <span class="ontario-nbsp">
              2012–25
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
