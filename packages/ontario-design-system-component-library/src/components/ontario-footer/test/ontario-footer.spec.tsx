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
      <footer class="ontario-footer ontario-footer--default" style="--imagePath: url(/assets/footer-default-supergraphic-logo.svg);">
        <div class="ontario-row">
          <div class="ontario-columns ontario-small-12">
            <ul class="ontario-footer__links-container ontario-footer__links-container--inline">
              <li>
                <a class="ontario-footer__link">
                  Accessibility
                </a>
              </li>
              <li>
                <a class="ontario-footer__link">
                  Privacy
                </a>
              </li>
              <li>
                <a class="ontario-footer__link">
                  Contact us
                </a>
              </li>
            </ul>
            <div class="ontario-footer__copyright">
              <a class="ontario-footer__link">
                © Queen’s Printer for Ontario,
                <span class="ontario-nbsp">
                  2012–22
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
  it('renders default footer', async () => {
    const page = await newSpecPage({
      components: [OntarioFooter],
      html: `
      <ontario-footer
        type="default"
        default-options='{
          "accessibilityLink": "1",
          "privacyLink": "2",
          "contactLink": "3",
          "queensPrinterLink": "4"
        }'
      ></ontario-footer>`
    });
    expect(page.root).toEqualHtml(
      `<ontario-footer
        type="default"
        default-options='{
          "accessibilityLink": "1",
          "privacyLink": "2",
          "contactLink": "3",
          "queensPrinterLink": "4"
        }'
      >
      <mock:shadow-root>
        <footer class="ontario-footer ontario-footer--default" style="--imagePath: url(/assets/footer-default-supergraphic-logo.svg);">
          <div class="ontario-row">
            <div class="ontario-columns ontario-small-12">
              <ul class="ontario-footer__links-container ontario-footer__links-container--inline">
                <li>
                  <a class="ontario-footer__link" href="1">
                    Accessibility
                  </a>
                </li>
                <li>
                  <a class="ontario-footer__link" href="2">
                    Privacy
                  </a>
                </li>
                <li>
                  <a class="ontario-footer__link" href="3">
                    Contact us
                  </a>
                </li>
              </ul>
              <div class="ontario-footer__copyright">
                <a class="ontario-footer__link" href="4">
                  © Queen’s Printer for Ontario,
                  <span class="ontario-nbsp">
                    2012–22
                  </span>
                </a>
              </div>
            </div>
          </div>
        </footer>
      </mock:shadow-root>
    </ontario-footer>`
    );
  });
  it('renders partnership footer', async () => {
    const page = await newSpecPage({
      components: [OntarioFooter],
      html: `
      <ontario-footer
        type="partnership"
        default-options='{
          "accessibilityLink": "1",
          "privacyLink": "2",
          "contactLink": "3",
          "queensPrinterLink": "4"
        }'
        partnership-Connection="Sponsored by Government of Ontario"
      ></ontario-footer>`
    });
    expect(page.root).toEqualHtml(
      `<ontario-footer
        type="partnership"
        default-options='{
          "accessibilityLink": "1",
          "privacyLink": "2",
          "contactLink": "3",
          "queensPrinterLink": "4"
        }'
        partnership-Connection="Sponsored by Government of Ontario"
      >
      <mock:shadow-root>
        <footer class="ontario-footer ontario-footer--partnership" style="--imagePath: url(/assets/footer-default-supergraphic-logo.svg);">
          <div class="ontario-row">
            <div class="ontario-columns ontario-medium-7 ontario-small-12">
              <ul class="ontario-footer__links-container ontario-footer__links-container--inline">
                <li>
                  <a class="ontario-footer__link" href="1">
                    Accessibility
                  </a>
                </li>
                <li>
                  <a class="ontario-footer__link" href="2">
                    Privacy
                  </a>
                </li>
                <li>
                  <a class="ontario-footer__link" href="3">
                    Contact us
                  </a>
                </li>
              </ul>
              <div class="ontario-footer__copyright">
                <a class="ontario-footer__link" href="4">
                  © Queen’s Printer for Ontario,
                  <span class="ontario-nbsp">
                    2012–22
                  </span>
                </a>
              </div>
            </div>
            <div class="ontario-columns ontario-footer__partnership-logo-container ontario-medium-5 ontario-small-12">
                <a class="ontario-footer__ontario-logo" href="https://www.ontario.ca/page/government-ontario">
                  <img src="/assets/ontario-logo--partnership-footer.svg">
                </a>
                <p class="ontario-margin-bottom-0-!">
                  Sponsored by Government of Ontario
                </p>
              </div>
          </div>
        </footer>
      </mock:shadow-root>
    </ontario-footer>`
    );
  });

  it('renders expanded two column footer', async () => {
    const page = await newSpecPage({
      components: [OntarioFooter],
      html: `
      <ontario-footer
        type="expandedTwoColumn"
        default-options='{
          "accessibilityLink": "1",
          "privacyLink": "2",
          "contactLink": "3",
          "queensPrinterLink": "4"
        }'
        expanded-two-column-options = '{
          "firstColumn": {
            "title": "5",
            "content":"6"
          },
          "secondColumn": {
            "title": "7",
            "content":"8",
            "contactButtonText": "9"
          }
        }'
      ></ontario-footer>`
    });
    expect(page.root).toEqualHtml(
      `<ontario-footer
        type="expandedTwoColumn"
        default-options='{
          "accessibilityLink": "1",
          "privacyLink": "2",
          "contactLink": "3",
          "queensPrinterLink": "4"
        }'
        expanded-two-column-options = '{
          "firstColumn": {
            "title": "5",
            "content":"6"
          },
          "secondColumn": {
            "title": "7",
            "content":"8",
            "contactButtonText": "9"
          }
        }'
      >
        <mock:shadow-root>
          <footer class="ontario-footer ontario-footer--expandedTwoColumn" style="--imagePath: url(/assets/footer-expanded-supergraphic-logo.svg);">
            <div class="ontario-footer__expanded-top-section">
              <div class="ontario-row">
                <div class="ontario-columns ontario-medium-6 ontario-small-12">
                  <div>
                    <h2 class="ontario-h4">
                      5
                    </h2>
                    <div class="ontario-footer--paragraph">
                      6
                    </div>
                  </div>
                </div>
                <div class="ontario-columns ontario-medium-6 ontario-small-12">
                  <div>
                    <h2 class="ontario-h4">
                      7
                    </h2>
                    <div class="ontario-footer--paragraph">
                      8
                    </div>
                    <a class="ontario-button ontario-footer__button ontario-margin-bottom-0-!" href="3">
                      9
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div class="ontario-footer__expanded-bottom-section ontario-row">
              <div class="ontario-columns ontario-small-12">
                <ul class="ontario-footer__links-container ontario-footer__links-container--inline">
                  <li>
                    <a class="ontario-footer__link" href="1">
                      Accessibility
                    </a>
                  </li>
                  <li>
                    <a class="ontario-footer__link" href="2">
                      Privacy
                    </a>
                  </li>
                </ul>
                <div class="ontario-footer__copyright">
                  <a class="ontario-footer__link" href="4">
                    © Queen’s Printer for Ontario,
                    <span class="ontario-nbsp">
                      2012–22
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </mock:shadow-root>
      </ontario-footer>`
    );
  });

  it('renders expanded three column footer', async () => {
    const page = await newSpecPage({
      components: [OntarioFooter],
      html: `
      <ontario-footer
        type="expandedThreeColumn"
        default-options='{
          "accessibilityLink": "1",
          "privacyLink": "2",
          "contactLink": "3",
          "queensPrinterLink": "4"
        }'
        expanded-three-column-options = '{
          "firstColumn": {
            "title": "5",
            "content":"6"
          },
          "secondColumn": {
            "title": "7",
            "content":[
              {
                "title": "8",
                "link": "9"
              }
            ]
          },
          "thirdColumn": {
            "title": "10",
            "content": "11",
            "facebook": {
              "link": "12"
            },
            "twitter": {
              "link": "13"
            },
            "instagram": {
              "link": "14"
            },
            "youtube": {
              "link": "15"
            }
          }
        }'
      ></ontario-footer>`
    });
    expect(page.root).toEqualHtml(
      `<ontario-footer
        type="expandedThreeColumn"
        default-options='{
          "accessibilityLink": "1",
          "privacyLink": "2",
          "contactLink": "3",
          "queensPrinterLink": "4"
        }'
        expanded-three-column-options = '{
          "firstColumn": {
            "title": "5",
            "content":"6"
          },
          "secondColumn": {
            "title": "7",
            "content":[
              {
                "title": "8",
                "link": "9"
              }
            ]
          },
          "thirdColumn": {
            "title": "10",
            "content": "11",
            "facebook": {
              "link": "12"
            },
            "twitter": {
              "link": "13"
            },
            "instagram": {
              "link": "14"
            },
            "youtube": {
              "link": "15"
            }
          }
        }'
      >
        <mock:shadow-root>
          <footer class="ontario-footer ontario-footer--expandedThreeColumn" style="--imagePath: url(/assets/footer-expanded-supergraphic-logo.svg);">
            <div class="ontario-footer__expanded-top-section">
              <div class="ontario-row">
                <div class="ontario-columns ontario-expanded-footer__one-third-block ontario-large-4 ontario-medium-12 ontario-small-12">
                  <div>
                    <h2 class="ontario-h4">
                      5
                    </h2>
                    <div class="ontario-footer--paragraph">
                      6
                    </div>
                  </div>
                </div>
                <div class="ontario-columns ontario-expanded-footer__one-third-block ontario-large-4 ontario-medium-6 ontario-small-12">
                  <h2 class="ontario-h4">
                    Most visited topics
                  </h2>
                  <ul class="ontario-footer__links-container ontario-footer__links-container--two-column-list">
                    <li>
                      <a class="ontario-footer__link" href="9">
                        8
                      </a>
                    </li>
                  </ul>
                </div>
                <div class="ontario-columns ontario-expanded-footer__one-third-block ontario-large-4 ontario-medium-6 ontario-small-12">
                  <div>
                    <h2 class="ontario-h4">
                      10
                    </h2>
                    <div class="ontario-footer--paragraph">
                      11
                    </div>
                    <ul class="ontario-footer__links-container ontario-footer__links-container--social">
                      <li>
                        <a aria-label="Facebook" class="ontario-footer__link" href="12">
                          <ontario-icon-facebook colour="white"></ontario-icon-facebook>
                        </a>
                      </li>
                      <li>
                        <a aria-label="Twitter" class="ontario-footer__link" href="13">
                          <ontario-icon-twitter colour="white"></ontario-icon-twitter>
                        </a>
                      </li>
                      <li>
                        <a aria-label="Instagram" class="ontario-footer__link" href="14">
                          <ontario-icon-instagram colour="white"></ontario-icon-instagram>
                        </a>
                      </li>
                      <li>
                        <a aria-label="Youtube" class="ontario-footer__link" href="15">
                          <ontario-icon-youtube colour="white"></ontario-icon-youtube>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="ontario-footer__expanded-bottom-section ontario-row">
              <div class="ontario-columns ontario-small-12">
                <ul class="ontario-footer__links-container ontario-footer__links-container--inline">
                  <li>
                    <a class="ontario-footer__link" href="1">
                      Accessibility
                    </a>
                  </li>
                  <li>
                    <a class="ontario-footer__link" href="2">
                      Privacy
                    </a>
                  </li>
                  <li>
                    <a class="ontario-footer__link" href="3">
                      Contact us
                    </a>
                  </li>
                </ul>
                <div class="ontario-footer__copyright">
                  <a class="ontario-footer__link" href="4">
                    © Queen’s Printer for Ontario,
                    <span class="ontario-nbsp">
                      2012–22
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </mock:shadow-root>
    </ontario-footer>`
    );
  });
});
