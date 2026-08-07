import { afterAll, beforeAll, describe, expect, it, render } from '@stencil/vitest';

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
					super('2026-06-30T12:00:00Z');
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

		const shadowRoot = page.root?.shadowRoot;
		expect(shadowRoot?.querySelector('.ontario-footer--default')).toBeTruthy();
		const inlineLinks = shadowRoot?.querySelectorAll('.ontario-footer__links-container--inline .ontario-footer__link');
		expect(inlineLinks?.length).toBe(3);
		expect(inlineLinks?.[0].textContent?.trim()).toBe('Accessibility');
		expect(inlineLinks?.[1].textContent?.trim()).toBe('Privacy');
		expect(inlineLinks?.[2].textContent?.trim()).toBe('Contact');
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
		const shadowRoot = page.root?.shadowRoot;
		expect(shadowRoot?.querySelector('.ontario-footer--expanded')).toBeTruthy();
		expect(shadowRoot?.querySelector('.ontario-h4')?.textContent?.trim()).toBe('Ontario Design System');
		const inlineLinks = shadowRoot?.querySelectorAll('.ontario-footer__links-container--inline .ontario-footer__link');
		expect(inlineLinks?.length).toBe(3);
		expect(inlineLinks?.[0].textContent?.trim()).toBe('Accessibility');
		expect(inlineLinks?.[1].textContent?.trim()).toBe('Privacy');
		expect(inlineLinks?.[2].textContent?.trim()).toBe('Contact');
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
		const shadowRoot = page.root?.shadowRoot;
		expect(shadowRoot?.querySelector('.ontario-footer--expanded')).toBeTruthy();
		const socialLinks = shadowRoot?.querySelectorAll('.ontario-footer__links-container--social .ontario-footer__link');
		expect(socialLinks?.length).toBe(4);
		expect(socialLinks?.[0].getAttribute('aria-label')).toBe('Facebook');
		expect(socialLinks?.[1].getAttribute('aria-label')).toBe('Twitter');
		expect(socialLinks?.[2].getAttribute('aria-label')).toBe('Instagram');
		expect(socialLinks?.[3].getAttribute('aria-label')).toBe('Youtube');
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
		const shadowRoot = page.root?.shadowRoot;
		expect(shadowRoot?.querySelector('.ontario-footer--expanded')).toBeTruthy();
		const socialLinks = shadowRoot?.querySelectorAll('.ontario-footer__links-container--social .ontario-footer__link');
		expect(socialLinks?.length).toBe(4);
		expect(socialLinks?.[0].getAttribute('aria-label')).toBe('Facebook');
		expect(socialLinks?.[1].getAttribute('aria-label')).toBe('Twitter');
		expect(socialLinks?.[2].getAttribute('aria-label')).toBe('Instagram');
		expect(socialLinks?.[3].getAttribute('aria-label')).toBe('Youtube');
	});
});
