import { newSpecPage } from '@stencil/core/testing';
import { OntarioLanguageToggle } from '../ontario-language-toggle';
import { mutationObserverMock } from '../../../utils/tests/mutation-observer.mock';

global.MutationObserver = mutationObserverMock;

describe('ontario-language-toggle', () => {
	describe('snapshot', () => {
		it('should render the expected html', async () => {
			const page = await newSpecPage({
				components: [OntarioLanguageToggle],
				html: `<ontario-language-toggle></ontario-language-toggle>`,
			});

			expect(page.root).toMatchSnapshot();
		});
	});

	it('should render the default size language toggle if no size is passed', async () => {
		const page = await newSpecPage({
			components: [OntarioLanguageToggle],
			html: `<ontario-language-toggle></ontario-language-toggle>`,
		});

		expect(page.root).toEqualHtml(`
			<ontario-language-toggle>
				<mock:shadow-root>
					<a aria-label="Cliquez pour changer la langue en français" class="ontario-language-toggler ontario-language-toggler--default" href="#" hreflang="fr" lang="fr">
						<abbr class="ontario-show-for-small-only" title="Français">
							FR
						</abbr>
						<span class="ontario-show-for-medium">
							Français
						</span>
					</a>
				</mock:shadow-root>
			</ontario-language-toggle>
		`);
		expect(page.rootInstance.size).toBe('default');
	});

	/**
	 * TODO: Determine if this is testable.
	 *
	 * Not sure how to properly test against this, seems to be a race condition.
	 *
	 * Takes a few processes before the html lang attribute is updated.
	 *
	 * Using setTimeout() leads to a false positive.
	 *
	 * Using page.waitForChanges() or autoApplyChanges: true seem to have no effect.
	 */
	it.skip('should render a default language of English on the <html> tag if no language prop is passed', async () => {
		const page = await newSpecPage({
			components: [OntarioLanguageToggle],
			html: `<ontario-language-toggle></ontario-language-toggle>`,
		});

		expect(page.rootInstance.language).toBe('en');
	});

	it('should render a small size language toggle with a French default language when explicitly specified', async () => {
		const page = await newSpecPage({
			components: [OntarioLanguageToggle],
			html: `<ontario-language-toggle size="small" url="/en" language="fr"></ontario-language-toggle>`,
		});

		expect(page.root).toEqualHtml(`
			<ontario-language-toggle size="small" url="/en" language="fr">
				<mock:shadow-root>
					<a aria-label="Click to switch the language to English" class="ontario-language-toggler ontario-language-toggler--small" href="/en" hreflang="en" lang="en">
						<span>
							English
						</span>
					</a>
				</mock:shadow-root>
			</ontario-language-toggle>
		`);
	});
});
