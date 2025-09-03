import { Grid } from '../../../grid';
import { OntarioFooter } from '@ongov/ontario-design-system-component-library-react';

export default function OntarioFooterDefault() {
	return (
		<div>
			<main>
				<Grid>
					<h1>ontario-footer-default</h1>
				</Grid>
			</main>
			<div style={{ flex: '0 0 auto' }}>
				<hr />
				<div>
					<h2>Default Footer with no props</h2>
					<OntarioFooter type="default" language="en" />
				</div>
				<hr />
				<div>
					<h2>Default Footer in French with no props</h2>
					<OntarioFooter type="default" language="fr" />
				</div>

				<hr />
				<div>
					<h2>Default Footer with links</h2>
					<OntarioFooter
						type="default"
						footerLinks={{
							accessibilityLink: { text: 'AccessibilityTest', href: 'https://www.ontario.ca/page/accessibility' },
							privacyLink: { text: 'PrivacyTest', href: 'https://www.ontario.ca/page/privacy-statement' },
							contactLink: { text: 'ContactTest', href: 'https://www.ontario.ca/feedback/contact-us' },
							printerLink: { text: 'PrinterTest', href: 'https://www.ontario.ca/page/copyright-information' },
						}}
					/>
				</div>
				<hr />
				<div>
					<h2>Default Footer in French with links</h2>
					<OntarioFooter
						type="default"
						language="fr"
						footerLinks={{
							accessibilityLink: { text: 'AccessibilitéTest', href: 'https://www.ontario.ca/fr/page/accessibilite' },
							privacyLink: {
								text: 'ConfidentialitéTest',
								href: 'https://www.ontario.ca/fr/page/declaration-de-confidentialite',
							},
							contactLink: { text: 'ContactTest', href: 'https://www.ontario.ca/fr/feedback/contactez-nous' },
							printerLink: {
								text: 'ImprimanteTest',
								href: "https://www.ontario.ca/fr/page/information-sur-le-droit-d'auteur",
							},
						}}
					/>
				</div>
				<hr />
				<div>
					<h2>Default Footer with just accessibility link</h2>
					<OntarioFooter
						type="default"
						footerLinks={{
							accessibilityLink: { text: 'AccessibilityTest', href: 'https://www.ontario.ca/page/accessibility' },
						}}
					/>
				</div>
				<hr />
				<div>
					<h2>Default Footer in French with just accessibility link</h2>
					<OntarioFooter
						type="default"
						language="fr"
						footerLinks={{
							accessibilityLink: { text: 'AccessibilitéTest', href: 'https://www.ontario.ca/fr/page/accessibilite' },
						}}
					/>
				</div>
				<hr />
				<div>
					<h2>Default Footer with just Privacy Link</h2>
					<OntarioFooter
						type="default"
						footerLinks={{
							privacyLink: { text: 'PrivacyTest', href: 'https://www.ontario.ca/page/privacy-statement' },
						}}
					/>
				</div>
				<hr />
				<div>
					<h2>Default Footer in French with just Privacy Link</h2>
					<OntarioFooter
						type="default"
						language="fr"
						footerLinks={{
							privacyLink: {
								text: 'ConfidentialitéTest',
								href: 'https://www.ontario.ca/fr/page/declaration-de-confidentialite',
							},
						}}
					/>
				</div>
				<hr />
				<div>
					<h2>Default Footer with just Contact Link</h2>
					<OntarioFooter
						type="default"
						footerLinks={{
							contactLink: { text: 'ContactTest', href: 'https://www.ontario.ca/feedback/contact-us' },
						}}
					/>
				</div>
				<hr />
				<div>
					<h2>Default Footer in French with just Contact Link</h2>
					<OntarioFooter
						type="default"
						language="fr"
						footerLinks={{
							contactLink: { text: 'ContactTest', href: 'https://www.ontario.ca/fr/feedback/contactez-nous' },
						}}
					/>
				</div>
				<hr />
				<div>
					<h2>Default Footer with just Printer Link</h2>
					<OntarioFooter
						type="default"
						footerLinks={{
							printerLink: { text: 'PrinterTest', href: 'https://www.ontario.ca/page/copyright-information' },
						}}
					/>
				</div>
				<hr />
				<div>
					<h2>Default Footer in French with just Printer Link</h2>
					<OntarioFooter
						type="default"
						language="fr"
						footerLinks={{
							printerLink: {
								text: 'ImprimanteTest',
								href: "https://www.ontario.ca/fr/page/information-sur-le-droit-d'auteur",
							},
						}}
					/>
				</div>
				<hr />
				<div>
					<h2>Default Footer with TOU link</h2>
					<OntarioFooter
						type="default"
						footerLinks={{
							accessibilityLink: { text: 'AccessibilityTest', href: 'https://www.ontario.ca/page/accessibility' },
							privacyLink: { text: 'PrivacyTest', href: 'https://www.ontario.ca/page/privacy-statement' },
							contactLink: { text: 'ContactTest', href: 'https://www.ontario.ca/feedback/contact-us' },
							printerLink: { text: 'PrinterTest', href: 'https://www.ontario.ca/page/copyright-information' },
							termsOfUseLink: { text: 'Terms of UseTest', href: 'https://www.ontario.ca/page/terms-use' },
						}}
					/>
				</div>
				<hr />
				<div>
					<h2>Default Footer in French with TOU link</h2>
					<OntarioFooter
						type="default"
						language="fr"
						footerLinks={{
							accessibilityLink: { text: 'AccessibilitéTest', href: 'https://www.ontario.ca/fr/page/accessibilite' },
							privacyLink: {
								text: 'ConfidentialitéTest',
								href: 'https://www.ontario.ca/fr/page/declaration-de-confidentialite',
							},
							contactLink: { text: 'ContactTest', href: 'https://www.ontario.ca/fr/feedback/contactez-nous' },
							printerLink: {
								text: 'ImprimanteTest',
								href: "https://www.ontario.ca/fr/page/information-sur-le-droit-d'auteur",
							},
							termsOfUseLink: {
								text: "Conditions d'utilisationTest",
								href: 'https://www.ontario.ca/fr/page/conditions-dutilisation',
							},
						}}
					/>
				</div>
				<hr />
				<div>
					<h2>Default Footer with topMargin false</h2>
					<OntarioFooter type="default" topMargin={false} language="en" />
				</div>
				<hr />
				<div>
					<h2>Default Footer in French with topMargin false</h2>
					<OntarioFooter type="default" topMargin={false} language="fr" />
				</div>
				<hr />
				<div>
					<h2>Default footer with assetBasePath provided</h2>
					<OntarioFooter type="default" language="en" assetBasePath="/assets" />
				</div>
				<hr />
				<div>
					<h2>Default footer in French with assetBasePath provided</h2>
					<OntarioFooter type="default" language="fr" assetBasePath="/assets" />
				</div>
			</div>
		</div>
	);
}
