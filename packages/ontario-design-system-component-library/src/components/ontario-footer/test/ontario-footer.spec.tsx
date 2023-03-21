import { newSpecPage } from '@stencil/core/testing';
import { OntarioFooter } from '../ontario-footer';

describe('ontario-footer', () => {
	it('renders default ontario-footer', async () => {
		const page = await newSpecPage({
			components: [OntarioFooter],
			html: `
      <ontario-footer
        type="default"
        footer-links='{
          "accessibilityLink": "https://www.ontario.ca/page/accessibility",
          "privacyLink": "https://www.ontario.ca/page/privacy-statement",
          "contactLink": "https://www.ontario.ca/feedback/contact-us",
          "printerLink": "https://www.ontario.ca/page/copyright-information"
        }'
      ></ontario-footer>
      `,
		});

		expect(page.root).toEqualHtml(`
      <ontario-footer
        type="default"
        footer-links='{
          "accessibilityLink": "https://www.ontario.ca/page/accessibility",
          "privacyLink": "https://www.ontario.ca/page/privacy-statement",
          "contactLink": "https://www.ontario.ca/feedback/contact-us",
          "printerLink": "https://www.ontario.ca/page/copyright-information"
        }'
      >
        <mock:shadow-root>
          <footer class="ontario-footer ontario-footer--default" style="--imagePath: url(/assets/footer-default-supergraphic-logo.svg);">
            <div class="ontario-row">
              <div class="ontario-columns ontario-small-12">
                <ul class="ontario-footer__links-container ontario-footer__links-container--inline">
                  <li><a class="ontario-footer__link" href="https://www.ontario.ca/page/accessibility">Accessibility</a></li>
                  <li><a class="ontario-footer__link" href="https://www.ontario.ca/page/privacy-statement">Privacy</a></li>
                  <li><a class="ontario-footer__link" href="https://www.ontario.ca/feedback/contact-us">Contact Us</a></li>
                </ul>
                <div class="ontario-footer__copyright">
                  <a class="ontario-footer__link" href="https://www.ontario.ca/page/copyright-information">© King's Printer for Ontario, <span class="ontario-nbsp">2012–23</span></a>
                </div>
              </div>
            </div>
          </footer>
        </mock:shadow-root>
      </ontario-footer>
    `);
	});

	it('renders twoColoumn ontario-footer', async () => {
		const page = await newSpecPage({
			components: [OntarioFooter],
			html: `
      <ontario-footer
        type="twoColumn"
        footer-links='{
          "accessibilityLink": "https://www.ontario.ca/page/accessibility",
          "privacyLink": "https://www.ontario.ca/page/privacy-statement",
          "contactLink": "https://www.ontario.ca/feedback/contact-us",
          "printerLink": "https://www.ontario.ca/page/copyright-information"
        }'
        two-column-options='{
          "col1": {
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
          "col2": {
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
      `,
		});
		expect(page.root).toEqualHtml(`
      <ontario-footer
        type="twoColumn"
        footer-links='{
          "accessibilityLink": "https://www.ontario.ca/page/accessibility",
          "privacyLink": "https://www.ontario.ca/page/privacy-statement",
          "contactLink": "https://www.ontario.ca/feedback/contact-us",
          "printerLink": "https://www.ontario.ca/page/copyright-information"
        }'
        two-column-options='{
          "col1": {
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
          "col2": {
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
      >
        <mock:shadow-root>
          <footer class="ontario-footer ontario-footer--expanded" style="--imagePath: url(/assets/footer-expanded-supergraphic-logo.svg);">
            <div class="ontario-footer__expanded-top-section">
              <div class="ontario-row">
                <div class="ontario-columns ontario-small-12 ontario-medium-6">
                  <h2 class="ontario-h4">Ontario Design System</h2>
                  <p>The Ontario Design System provides principles, guidance and code to help teams design and build accessible, mobile-friendly government websites and digital services.</p>
                  <h3 class="ontario-h5">Latest release</h3>
                  <ul>
                    <li><div class="ontario-footer__list_item">Built on: June 3, 2022</div></li>
                    <li><div class="ontario-footer__list_item">Distribution package version 0.12.10</div></li>
                  </ul>
                </div>
                <div class="ontario-columns ontario-small-12 ontario-medium-6">
                  <h2 class="ontario-h4">Help us improve the design system</h2>
                  <div class="ontario-footer__paragraph">You can check our <a href="#">help and feedback page</a> if you don’t see the component you need.</div>
                  <a href="#">
                    <ontario-button aria-label="Secondary Button" htmltype="reset" id="secondaryButton" type="internalThemeDark">Send us an email</ontario-button>
                  </a>
                </div>
              </div>
            </div>
            <div class="ontario-row ontario-footer__expanded-bottom-section">
              <div class="ontario-columns ontario-small-12">
                <ul class="ontario-footer__links-container ontario-footer__links-container--inline">
                  <li><a class="ontario-footer__link" href="https://www.ontario.ca/page/accessibility">Accessibility</a></li>
                  <li><a class="ontario-footer__link" href="https://www.ontario.ca/page/privacy-statement">Privacy</a></li>
                  <li><a class="ontario-footer__link" href="https://www.ontario.ca/feedback/contact-us">Contact Us</a></li>
                </ul>
                <div class="ontario-footer__copyright">
                  <a class="ontario-footer__link" href="https://www.ontario.ca/page/copyright-information">© King's Printer for Ontario, <span class="ontario-nbsp">2012–23</span></a>
                </div>
              </div>
            </div>
          </footer>
        </mock:shadow-root>
      </ontario-footer>
    `);
	});

	it('renders twoColoumn ontario-footer with social links', async () => {
		const page = await newSpecPage({
			components: [OntarioFooter],
			html: `
      <ontario-footer
        type="twoColumn"
        footer-links='{
          "accessibilityLink": "https://www.ontario.ca/page/accessibility",
          "privacyLink": "https://www.ontario.ca/page/privacy-statement",
          "contactLink": "https://www.ontario.ca/feedback/contact-us",
          "printerLink": "https://www.ontario.ca/page/copyright-information"
        }'
        social-links='{
          "facebook": "https://www.facebook.com/ONgov",
          "instagram": "https://www.instagram.com/ongov",
          "twitter": "https://twitter.com/ONgov",
          "youtube": "https://www.youtube.com/ongov"
        }'
        two-column-options='{
          "col1": {
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
          "col2": {
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
      `,
		});
		expect(page.root).toEqualHtml(`
      <ontario-footer
        type="twoColumn"
        footer-links='{
          "accessibilityLink": "https://www.ontario.ca/page/accessibility",
          "privacyLink": "https://www.ontario.ca/page/privacy-statement",
          "contactLink": "https://www.ontario.ca/feedback/contact-us",
          "printerLink": "https://www.ontario.ca/page/copyright-information"
        }'
        social-links='{
          "facebook": "https://www.facebook.com/ONgov",
          "instagram": "https://www.instagram.com/ongov",
          "twitter": "https://twitter.com/ONgov",
          "youtube": "https://www.youtube.com/ongov"
        }'
        two-column-options='{
          "col1": {
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
          "col2": {
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
      >
        <mock:shadow-root>
          <footer class="ontario-footer ontario-footer--expanded" style="--imagePath: url(/assets/footer-expanded-supergraphic-logo.svg);">
            <div class="ontario-footer__expanded-top-section">
              <div class="ontario-row">
                <div class="ontario-columns ontario-small-12 ontario-medium-6">
                  <h2 class="ontario-h4">Ontario Design System</h2>
                  <p>The Ontario Design System provides principles, guidance and code to help teams design and build accessible, mobile-friendly government websites and digital services.</p>
                  <h3 class="ontario-h5">Latest release</h3>
                  <ul>
                    <li><div class="ontario-footer__list_item">Built on: June 3, 2022</div></li>
                    <li><div class="ontario-footer__list_item">Distribution package version 0.12.10</div></li>
                  </ul>
                </div>
                <div class="ontario-columns ontario-small-12 ontario-medium-6">
                  <h2 class="ontario-h4">Help us improve the design system</h2>
                  <div class="ontario-footer__paragraph">You can check our <a href="#">help and feedback page</a> if you don’t see the component you need.</div>
                  <a href="#">
                    <ontario-button aria-label="Secondary Button" htmltype="reset" id="secondaryButton" type="internalThemeDark">Send us an email</ontario-button>
                  </a>
                  <ul class="ontario-footer__links-container ontario-footer__links-container--social">
                    <li>
                      <a class="ontario-footer__link" href="https://www.facebook.com/ONgov" aria-label="Facebook"><ontario-icon-facebook colour="white"></ontario-icon-facebook></a>
                    </li>
                    <li>
                      <a class="ontario-footer__link" href="https://twitter.com/ONgov" aria-label="Twitter"><ontario-icon-twitter colour="white"></ontario-icon-twitter></a>
                    </li>
                    <li>
                      <a class="ontario-footer__link" href="https://www.instagram.com/ongov" aria-label="Instagram"><ontario-icon-instagram colour="white"></ontario-icon-instagram></a>
                    </li>
                    <li>
                      <a class="ontario-footer__link" href="https://www.youtube.com/ongov" aria-label="Youtube"><ontario-icon-youtube colour="white"></ontario-icon-youtube></a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="ontario-row ontario-footer__expanded-bottom-section">
              <div class="ontario-columns ontario-small-12">
                <ul class="ontario-footer__links-container ontario-footer__links-container--inline">
                  <li><a class="ontario-footer__link" href="https://www.ontario.ca/page/accessibility">Accessibility</a></li>
                  <li><a class="ontario-footer__link" href="https://www.ontario.ca/page/privacy-statement">Privacy</a></li>
                  <li><a class="ontario-footer__link" href="https://www.ontario.ca/feedback/contact-us">Contact Us</a></li>
                </ul>
                <div class="ontario-footer__copyright">
                  <a class="ontario-footer__link" href="https://www.ontario.ca/page/copyright-information">© King's Printer for Ontario, <span class="ontario-nbsp">2012–23</span></a>
                </div>
              </div>
            </div>
          </footer>
        </mock:shadow-root>
      </ontario-footer>
    `);
	});

	it('renders threeColoumn ontario-footer with social links', async () => {
		const page = await newSpecPage({
			components: [OntarioFooter],
			html: `
      <ontario-footer
        type="threeColumn"
        footer-links='{
          "accessibilityLink": "https://www.ontario.ca/page/accessibility",
          "privacyLink": "https://www.ontario.ca/page/privacy-statement",
          "contactLink": "https://www.ontario.ca/feedback/contact-us",
          "printerLink": "https://www.ontario.ca/page/copyright-information"
        }'
        social-links='{
          "facebook": "https://www.facebook.com/ONgov",
          "instagram": "https://www.instagram.com/ongov",
          "twitter": "https://twitter.com/ONgov",
          "youtube": "https://www.youtube.com/ongov"
        }'
        three-column-options='{
          "col1": {
            "title": "Ontario Design System",
            "content": [
              {
                "type": "text",
                "text": "The Ontario Design System provides principles, guidance and code to help teams design and build accessible, mobile-friendly government websites and digital services."
              }
            ]
          },
          "col2": {
            "title": "Latest release",
            "content": [
              {
                "type": "list",
                "list": ["Built on: June 3, 2022", "Distribution package version 0.12.10"]
              }
            ]
          },
          "col3": {
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
      `,
		});
		expect(page.root).toEqualHtml(`
      <ontario-footer
        type="threeColumn"
        footer-links='{
          "accessibilityLink": "https://www.ontario.ca/page/accessibility",
          "privacyLink": "https://www.ontario.ca/page/privacy-statement",
          "contactLink": "https://www.ontario.ca/feedback/contact-us",
          "printerLink": "https://www.ontario.ca/page/copyright-information"
        }'
        social-links='{
          "facebook": "https://www.facebook.com/ONgov",
          "instagram": "https://www.instagram.com/ongov",
          "twitter": "https://twitter.com/ONgov",
          "youtube": "https://www.youtube.com/ongov"
        }'
        three-column-options='{
          "col1": {
            "title": "Ontario Design System",
            "content": [
              {
                "type": "text",
                "text": "The Ontario Design System provides principles, guidance and code to help teams design and build accessible, mobile-friendly government websites and digital services."
              }
            ]
          },
          "col2": {
            "title": "Latest release",
            "content": [
              {
                "type": "list",
                "list": ["Built on: June 3, 2022", "Distribution package version 0.12.10"]
              }
            ]
          },
          "col3": {
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
      >
        <mock:shadow-root>
          <footer class="ontario-footer ontario-footer--expanded" style="--imagePath: url(/assets/footer-expanded-supergraphic-logo.svg);">
            <div class="ontario-footer__expanded-top-section">
              <div class="ontario-row">
                <div class="ontario-columns ontario-small-12 ontario-medium-12 ontario-large-4 ontario-expanded-footer__one-third-block">
                  <h2 class="ontario-h4">Ontario Design System</h2>
                  <p>The Ontario Design System provides principles, guidance and code to help teams design and build accessible, mobile-friendly government websites and digital services.</p>
                </div>
                <div class="ontario-columns ontario-small-12 ontario-medium-6 ontario-large-4 ontario-expanded-footer__one-third-block">
                  <h2 class="ontario-h4">Latest release</h2>
                  <ul>
                    <li><div class="ontario-footer__list_item">Built on: June 3, 2022</div></li>
                    <li><div class="ontario-footer__list_item">Distribution package version 0.12.10</div></li>
                  </ul>
                </div>
                <div class="ontario-columns ontario-small-12 ontario-medium-6 ontario-large-4 ontario-expanded-footer__one-third-block">
                  <h2 class="ontario-h4">Help us improve the design system</h2>
                  <div class="ontario-footer__paragraph">You can check our <a href="#">help and feedback page</a> if you don’t see the component you need.</div>
                  <a href="#">
                    <ontario-button aria-label="Secondary Button" htmltype="reset" id="secondaryButton" type="internalThemeDark">Send us an email</ontario-button>
                  </a>
                  <ul class="ontario-footer__links-container ontario-footer__links-container--social">
                    <li>
                      <a class="ontario-footer__link" href="https://www.facebook.com/ONgov" aria-label="Facebook"><ontario-icon-facebook colour="white"></ontario-icon-facebook></a>
                    </li>
                    <li>
                      <a class="ontario-footer__link" href="https://twitter.com/ONgov" aria-label="Twitter"><ontario-icon-twitter colour="white"></ontario-icon-twitter></a>
                    </li>
                    <li>
                      <a class="ontario-footer__link" href="https://www.instagram.com/ongov" aria-label="Instagram"><ontario-icon-instagram colour="white"></ontario-icon-instagram></a>
                    </li>
                    <li>
                      <a class="ontario-footer__link" href="https://www.youtube.com/ongov" aria-label="Youtube"><ontario-icon-youtube colour="white"></ontario-icon-youtube></a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="ontario-row ontario-footer__expanded-bottom-section">
              <div class="ontario-columns ontario-small-12">
                <ul class="ontario-footer__links-container ontario-footer__links-container--inline">
                  <li><a class="ontario-footer__link" href="https://www.ontario.ca/page/accessibility">Accessibility</a></li>
                  <li><a class="ontario-footer__link" href="https://www.ontario.ca/page/privacy-statement">Privacy</a></li>
                  <li><a class="ontario-footer__link" href="https://www.ontario.ca/feedback/contact-us">Contact Us</a></li>
                </ul>
                <div class="ontario-footer__copyright">
                  <a class="ontario-footer__link" href="https://www.ontario.ca/page/copyright-information">© King's Printer for Ontario, <span class="ontario-nbsp">2012–23</span></a>
                </div>
              </div>
            </div>
          </footer>
        </mock:shadow-root>
      </ontario-footer>
    `);
	});
});
