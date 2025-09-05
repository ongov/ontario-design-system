import { Grid } from '../../../grid';
import { OntarioFooter } from '@ongov/ontario-design-system-component-library-react';

const threeColumnOptions = {
	column1: {
		title: 'Ontario Design System',
		content: [{ type: 'text', text: 'Principles and code for government websites and services.' }],
	},
	column2: {
		title: 'Latest release',
		content: [{ type: 'list', list: ['Built on: June 3, 2022', 'Version 0.12.10'] }],
	},
	column3: {
		title: 'Help us improve',
		content: [{ type: 'html', html: 'Check our <a href="#">help and feedback page</a>.' }],
		button: { text: 'Send us an email', link: '#' },
	},
};

const threeColumnOptionsFr = {
	column1: {
		title: "Système de conception de l'Ontario",
		content: [{ type: 'text', text: 'Principes et code pour les sites Web et services gouvernementaux.' }],
	},
	column2: {
		title: 'Dernière version',
		content: [{ type: 'list', list: ['Construit le : 3 juin 2022', 'Version 0.12.10'] }],
	},
	column3: {
		title: 'Aidez-nous à améliorer',
		content: [{ type: 'html', html: 'Consultez notre <a href="#">page d\'aide et de commentaires</a>.' }],
		button: { text: 'Envoyez-nous un courriel', link: '#' },
	},
};

export default function OntarioFooterThreeColumn() {
	return (
		<div>
			<main>
				<Grid>
					<h1>ontario-footer-three-column</h1>
				</Grid>
			</main>
			<div style={{ flex: '0 0 auto' }}>
				<hr />
				<h2>Three Column Footer with threeColumnOptions provided</h2>
				<OntarioFooter type="threeColumn" language="en" threeColumnOptions={JSON.stringify(threeColumnOptions)} />

				<hr />
				<h2>Three Column Footer with threeColumnOptionsFr provided (French)</h2>
				<OntarioFooter type="threeColumn" language="fr" threeColumnOptions={JSON.stringify(threeColumnOptionsFr)} />

				<hr />
				<h2>Three Column Footer with all footer links overridden</h2>
				<OntarioFooter
					type="threeColumn"
					language="en"
					threeColumnOptions={JSON.stringify(threeColumnOptions)}
					footerLinks={{
						accessibilityLink: { text: 'AccessibilityTest', href: 'https://www.ontario.ca/page/accessibility' },
						privacyLink: { text: 'PrivacyTest', href: 'https://www.ontario.ca/page/privacy-statement' },
						contactLink: { text: 'ContactTest', href: 'https://www.ontario.ca/feedback/contact-us' },
						printerLink: { text: 'PrinterTest', href: 'https://www.ontario.ca/page/copyright-information' },
					}}
				/>

				<hr />
				<h2>Three Column Footer with all footer links overridden (French)</h2>
				<OntarioFooter
					type="threeColumn"
					language="fr"
					threeColumnOptions={JSON.stringify(threeColumnOptionsFr)}
					footerLinks={{
						accessibilityLink: { text: 'AccessibilitéTest', href: 'https://www.ontario.ca/fr/page/accessibilite' },
						privacyLink: {
							text: 'ConfidentialitéTest',
							href: 'https://www.ontario.ca/fr/page/declaration-de-confidentialite',
						},
						contactLink: { text: 'ContactTest', href: 'https://www.ontario.ca/fr/feedback/nous-joindre' },
						printerLink: {
							text: 'ImprimanteTest',
							href: 'https://www.ontario.ca/fr/page/information-sur-le-droit-dauteur',
						},
					}}
				/>

				<hr />
				<h2>Three Column Footer with just accessibility link overridden</h2>
				<OntarioFooter
					type="threeColumn"
					language="en"
					threeColumnOptions={JSON.stringify(threeColumnOptions)}
					footerLinks={{
						accessibilityLink: { text: 'AccessibilityTest', href: 'https://www.ontario.ca/page/accessibility' },
					}}
				/>

				<hr />
				<h2>Three Column Footer with just accessibility link overridden (French)</h2>
				<OntarioFooter
					type="threeColumn"
					language="fr"
					threeColumnOptions={JSON.stringify(threeColumnOptionsFr)}
					footerLinks={{
						accessibilityLink: { text: 'AccessibilitéTest', href: 'https://www.ontario.ca/fr/page/accessibilite' },
					}}
				/>

				<hr />
				<h2>Three Column Footer with social links provided and overridden</h2>
				<OntarioFooter
					type="threeColumn"
					language="en"
					threeColumnOptions={JSON.stringify(threeColumnOptions)}
					footerLinks={{
						accessibilityLink: { text: 'AccessibilityTest', href: 'https://www.ontario.ca/page/accessibility' },
						privacyLink: { text: 'PrivacyTest', href: 'https://www.ontario.ca/page/privacy-statement' },
						contactLink: { text: 'ContactTest', href: 'https://www.ontario.ca/feedback/contact-us' },
						printerLink: { text: 'PrinterTest', href: 'https://www.ontario.ca/page/copyright-information' },
					}}
					socialLinks={{
						twitter: 'https://twitter.com/ONgov',
						facebook: 'https://www.facebook.com/ONgov',
						youtube: 'https://www.youtube.com/user/ONgov',
						instagram: 'https://www.instagram.com/ongov/',
					}}
				/>

				<hr />
				<h2>Three Column Footer with social links provided and overridden (French)</h2>
				<OntarioFooter
					type="threeColumn"
					language="fr"
					threeColumnOptions={JSON.stringify(threeColumnOptionsFr)}
					footerLinks={{
						accessibilityLink: { text: 'AccessibilitéTest', href: 'https://www.ontario.ca/fr/page/accessibilite' },
						privacyLink: {
							text: 'ConfidentialitéTest',
							href: 'https://www.ontario.ca/fr/page/declaration-de-confidentialite',
						},
						contactLink: { text: 'ContactTest', href: 'https://www.ontario.ca/fr/feedback/nous-joindre' },
						printerLink: {
							text: 'ImprimanteTest',
							href: 'https://www.ontario.ca/fr/page/information-sur-le-droit-dauteur',
						},
					}}
					socialLinks={{
						twitter: 'https://twitter.com/ONgov',
						facebook: 'https://www.facebook.com/ONgov',
						youtube: 'https://www.youtube.com/user/ONgov',
						instagram: 'https://www.instagram.com/ongov/',
					}}
				/>

				<hr />
				<h2>Three Column Footer with topMargin false</h2>
				<OntarioFooter
					type="threeColumn"
					language="en"
					threeColumnOptions={JSON.stringify(threeColumnOptions)}
					topMargin={false}
				/>

				<hr />
				<h2>Three Column Footer with topMargin false (French)</h2>
				<OntarioFooter
					type="threeColumn"
					language="fr"
					threeColumnOptions={JSON.stringify(threeColumnOptionsFr)}
					topMargin={false}
				/>

				<hr />
				<h2>Two Column Footer in English with assetBasePath set to /assets</h2>
				<OntarioFooter
					type="threeColumn"
					language="en"
					threeColumnOptions={JSON.stringify(threeColumnOptions)}
					assetBasePath="/assets"
				/>

				<hr />
				<h2>Two Column Footer in French with assetBasePath set to /assets</h2>
				<OntarioFooter
					type="threeColumn"
					language="fr"
					threeColumnOptions={JSON.stringify(threeColumnOptionsFr)}
					assetBasePath="/assets"
				/>

				<hr />
			</div>
		</div>
	);
}
