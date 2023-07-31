import { newSpecPage } from '@stencil/core/testing';
import { OntarioLanguageToggle } from '../ontario-language-toggle';

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
					<a aria-label="Click to switch language to French" class="ontario-language-toggler ontario-language-toggler--default" href="#">
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

	it('should render a default language of English if no language prop is passed', async () => {
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
					<a aria-label="Cliquez pour changer de langue en anglais" class="ontario-language-toggler ontario-language-toggler--small" href="/en">
						<span>
							English
						</span>
					</a>
				</mock:shadow-root>
			</ontario-language-toggle>
		`);
	});
});
