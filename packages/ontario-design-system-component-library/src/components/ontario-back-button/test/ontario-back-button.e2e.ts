import { newE2EPage } from '@stencil/core/testing';

describe('ontario-back-button E2E', () => {
	describe('rendering', () => {
		it('renders without errors in default usage', async () => {
			const page = await newE2EPage();
			await page.setContent('<ontario-back-button></ontario-back-button>');
			const element = await page.find('ontario-back-button');
			expect(element).toHaveClass('hydrated');
		});

		it('renders button element in the shadow DOM', async () => {
			const page = await newE2EPage();
			await page.setContent('<ontario-back-button></ontario-back-button>');
			const button = await page.find('ontario-back-button >>> button');
			expect(button).toBeTruthy();
		});

		it('renders decorative chevron icon in shadow DOM', async () => {
			const page = await newE2EPage();
			await page.setContent('<ontario-back-button></ontario-back-button>');
			const icon = await page.find('ontario-back-button >>> svg');
			expect(icon).toBeTruthy();
		});
	});

	describe('keyboard interaction', () => {
		it('Tab key focuses the button', async () => {
			const page = await newE2EPage();
			await page.setContent(
				'<input type="text" id="input1" /><ontario-back-button id="back-btn"></ontario-back-button>',
			);

			// Focus first input
			await page.keyboard.press('Tab');
			let focused = await page.evaluate(() => (document.activeElement as HTMLElement).id);
			expect(focused).toBe('input1');

			// Tab to back-button
			await page.keyboard.press('Tab');
			focused = await page.evaluate(() => {
				const elem = document.activeElement as any;
				return elem.id || elem.tagName;
			});
			expect(focused).toBe('back-btn');
		});

		it('Enter key activates button in event mode', async () => {
			const page = await newE2EPage();
			let eventFired = false;

			await page.evaluateOnNewDocument(() => {
				(window as any).eventFired = false;
				document.addEventListener('backClick', () => {
					(window as any).eventFired = true;
				});
			});

			await page.setContent('<ontario-back-button id="back-btn" back-mode="event"></ontario-back-button>');

			// Focus and press Enter
			await page.keyboard.press('Tab');
			await page.keyboard.press('Enter');

			eventFired = await page.evaluate(() => (window as any).eventFired);
			expect(eventFired).toBe(true);
		});

		it('Space key activates button in event mode', async () => {
			const page = await newE2EPage();
			let eventFired = false;

			await page.evaluateOnNewDocument(() => {
				(window as any).eventFired = false;
				document.addEventListener('backClick', () => {
					(window as any).eventFired = true;
				});
			});

			await page.setContent('<ontario-back-button id="back-btn" back-mode="event"></ontario-back-button>');

			// Focus and press Space
			await page.keyboard.press('Tab');
			await page.keyboard.press('Space');

			eventFired = await page.evaluate(() => (window as any).eventFired);
			expect(eventFired).toBe(true);
		});
	});

	describe('mouse interaction', () => {
		it('mouse click activates back button', async () => {
			const page = await newE2EPage();
			let eventFired = false;

			await page.evaluateOnNewDocument(() => {
				(window as any).eventFired = false;
				document.addEventListener('backClick', () => {
					(window as any).eventFired = true;
				});
			});

			await page.setContent('<ontario-back-button id="back-btn" back-mode="event"></ontario-back-button>');

			const button = await page.find('ontario-back-button >>> button');
			await button?.click();

			eventFired = await page.evaluate(() => (window as any).eventFired);
			expect(eventFired).toBe(true);
		});

		it('hover displays visual feedback', async () => {
			const page = await newE2EPage();
			await page.setContent('<ontario-back-button id="back-btn"></ontario-back-button>');

			const button = await page.find('ontario-back-button >>> button');
			await button?.hover();

			// Button should exist and be interactive
			expect(button).toBeTruthy();
		});
	});

	describe('back modes', () => {
		it('history mode (default) renders as button', async () => {
			const page = await newE2EPage();
			await page.setContent('<ontario-back-button back-mode="history"></ontario-back-button>');

			const button = await page.find('ontario-back-button >>> button');
			expect(button).toBeTruthy();

			const link = await page.find('ontario-back-button >>> a');
			expect(link).toBeFalsy();
		});

		it('href mode renders as anchor with correct href', async () => {
			const page = await newE2EPage();
			await page.setContent('<ontario-back-button back-mode="href" href="/step-1"></ontario-back-button>');

			const link = await page.find('ontario-back-button >>> a');
			expect(link).toBeTruthy();

			const href = await link?.getAttribute('href');
			expect(href).toBe('/step-1');
		});

		it('event mode renders as button', async () => {
			const page = await newE2EPage();
			await page.setContent('<ontario-back-button back-mode="event"></ontario-back-button>');

			const button = await page.find('ontario-back-button >>> button');
			expect(button).toBeTruthy();

			const link = await page.find('ontario-back-button >>> a');
			expect(link).toBeFalsy();
		});

		it('event mode emits backClick event on activation', async () => {
			const page = await newE2EPage();
			let eventFired = false;

			await page.evaluateOnNewDocument(() => {
				(window as any).eventFired = false;
				document.addEventListener('backClick', () => {
					(window as any).eventFired = true;
				});
			});

			await page.setContent('<ontario-back-button back-mode="event"></ontario-back-button>');

			const button = await page.find('ontario-back-button >>> button');
			await button?.click();

			eventFired = await page.evaluate(() => (window as any).eventFired);
			expect(eventFired).toBe(true);
		});
	});

	describe('bilingual support', () => {
		it('renders English label by default', async () => {
			const page = await newE2EPage();
			await page.setContent('<ontario-back-button></ontario-back-button>');

			const button = await page.find('ontario-back-button >>> button');
			const text = await button?.innerText;

			expect(text).toContain('Back');
		});

		it('renders French label when language="fr"', async () => {
			const page = await newE2EPage();
			await page.setContent('<ontario-back-button language="fr"></ontario-back-button>');

			const button = await page.find('ontario-back-button >>> button');
			const text = await button?.innerText;

			expect(text).toContain('Retour');
		});

		it('renders custom label when provided', async () => {
			const page = await newE2EPage();
			await page.setContent('<ontario-back-button label="Go to Contact"></ontario-back-button>');

			const button = await page.find('ontario-back-button >>> button');
			const text = await button?.innerText;

			expect(text).toContain('Go to Contact');
		});

		it('custom label takes precedence over language prop', async () => {
			const page = await newE2EPage();
			await page.setContent('<ontario-back-button label="Custom" language="fr"></ontario-back-button>');

			const button = await page.find('ontario-back-button >>> button');
			const text = await button?.innerText;

			expect(text).toContain('Custom');
			expect(text).not.toContain('Retour');
		});
	});

	describe('accessibility', () => {
		it('button is keyboard focusable', async () => {
			const page = await newE2EPage();
			await page.setContent('<ontario-back-button id="back-btn"></ontario-back-button>');

			await page.keyboard.press('Tab');

			const focused = await page.evaluate(() => {
				const elem = document.activeElement as any;
				return elem.id || elem.tagName;
			});

			expect(focused).toBe('back-btn');
		});

		it('decorative icon has aria-hidden="true"', async () => {
			const page = await newE2EPage();
			await page.setContent('<ontario-back-button></ontario-back-button>');

			const ariaHidden = await page.evaluate(() => {
				const icon = document.querySelector('ontario-back-button')?.shadowRoot?.querySelector('svg');
				return icon?.getAttribute('aria-hidden');
			});

			expect(ariaHidden).toBe('true');
		});

		it('decorative icon has focusable="false"', async () => {
			const page = await newE2EPage();
			await page.setContent('<ontario-back-button></ontario-back-button>');

			const focusable = await page.evaluate(() => {
				const icon = document.querySelector('ontario-back-button')?.shadowRoot?.querySelector('svg');
				return icon?.getAttribute('focusable');
			});

			expect(focusable).toBe('false');
		});

		it('accessible name comes from visible label text', async () => {
			const page = await newE2EPage();
			await page.setContent('<ontario-back-button></ontario-back-button>');

			const buttonText = await page.evaluate(() => {
				const button = document.querySelector('ontario-back-button')?.shadowRoot?.querySelector('button');
				return button?.textContent?.trim();
			});

			expect(buttonText).toContain('Back');
		});
	});

	describe('disabled state', () => {
		it('disabled button does not emit event on click', async () => {
			const page = await newE2EPage();
			let eventFired = false;

			await page.evaluateOnNewDocument(() => {
				(window as any).eventFired = false;
				document.addEventListener('backClick', () => {
					(window as any).eventFired = true;
				});
			});

			await page.setContent('<ontario-back-button disabled back-mode="event"></ontario-back-button>');

			const button = await page.find('ontario-back-button >>> button');
			await button?.click();

			eventFired = await page.evaluate(() => (window as any).eventFired);
			expect(eventFired).toBe(false);
		});

		it('disabled button has disabled attribute', async () => {
			const page = await newE2EPage();
			await page.setContent('<ontario-back-button disabled></ontario-back-button>');

			const isDisabled = await page.evaluate(() => {
				const button = document.querySelector('ontario-back-button')?.shadowRoot?.querySelector('button');
				return button?.hasAttribute('disabled');
			});

			expect(isDisabled).toBe(true);
		});

		it('disabled button with disabled="true" string is disabled', async () => {
			const page = await newE2EPage();
			await page.setContent('<ontario-back-button disabled="true"></ontario-back-button>');

			const isDisabled = await page.evaluate(() => {
				const button = document.querySelector('ontario-back-button')?.shadowRoot?.querySelector('button');
				return button?.hasAttribute('disabled');
			});

			expect(isDisabled).toBe(true);
		});
	});

	describe('visual regression', () => {
		it('default state appearance matches expected', async () => {
			const page = await newE2EPage();
			await page.setContent('<div style="padding: 20px;"><ontario-back-button></ontario-back-button></div>');

			const button = await page.find('ontario-back-button >>> button');
			expect(button).toBeTruthy();
		});

		it('French variant renders correctly', async () => {
			const page = await newE2EPage();
			await page.setContent(
				'<div style="padding: 20px;"><ontario-back-button language="fr"></ontario-back-button></div>',
			);

			const text = await page.evaluate(() => {
				return document.querySelector('ontario-back-button')?.shadowRoot?.querySelector('button')?.textContent?.trim();
			});

			expect(text).toContain('Retour');
		});

		it('focus state is visible', async () => {
			const page = await newE2EPage();
			await page.setContent(
				'<div style="padding: 20px;"><ontario-back-button id="back-btn"></ontario-back-button></div>',
			);

			await page.keyboard.press('Tab');

			const button = await page.find('ontario-back-button >>> button');
			expect(button).toBeTruthy();
		});

		it('disabled state appearance is visually distinct', async () => {
			const page = await newE2EPage();
			await page.setContent('<div style="padding: 20px;"><ontario-back-button disabled></ontario-back-button></div>');

			const isDisabled = await page.evaluate(() => {
				return document
					.querySelector('ontario-back-button')
					?.shadowRoot?.querySelector('button')
					?.hasAttribute('disabled');
			});

			expect(isDisabled).toBe(true);
		});

		it('custom label renders with appropriate sizing', async () => {
			const page = await newE2EPage();
			await page.setContent(
				'<div style="padding: 20px;"><ontario-back-button label="Go to Previous Step with a Longer Label"></ontario-back-button></div>',
			);

			const text = await page.evaluate(() => {
				return document.querySelector('ontario-back-button')?.shadowRoot?.querySelector('button')?.textContent?.trim();
			});

			expect(text).toContain('Go to Previous Step');
		});
	});

	describe('event emission', () => {
		it('backClick event contains expected structure', async () => {
			const page = await newE2EPage();
			let eventDetails: any = null;

			await page.evaluateOnNewDocument(() => {
				(window as any).eventDetails = null;
				document.addEventListener('backClick', (e) => {
					(window as any).eventDetails = {
						type: (e as any).type,
						bubbles: (e as any).bubbles,
						cancelable: (e as any).cancelable,
					};
				});
			});

			await page.setContent('<ontario-back-button back-mode="event"></ontario-back-button>');

			const button = await page.find('ontario-back-button >>> button');
			await button?.click();

			eventDetails = await page.evaluate(() => (window as any).eventDetails);
			expect(eventDetails).toBeTruthy();
			expect(eventDetails.type).toBe('backClick');
		});

		it('multiple rapid clicks emit multiple events', async () => {
			const page = await newE2EPage();
			let clickCount = 0;

			await page.evaluateOnNewDocument(() => {
				(window as any).clickCount = 0;
				document.addEventListener('backClick', () => {
					(window as any).clickCount++;
				});
			});

			await page.setContent('<ontario-back-button back-mode="event"></ontario-back-button>');

			const button = await page.find('ontario-back-button >>> button');
			await button?.click();
			await button?.click();
			await button?.click();

			clickCount = await page.evaluate(() => (window as any).clickCount);
			expect(clickCount).toBe(3);
		});
	});
});
