import { Grid } from '../../../grid';
import { OntarioFooter } from '@ongov/ontario-design-system-component-library-react';

const twoColumnOptions = {
	column1: {
		title: 'Ontario Design System',
		content: [
			{
				type: 'text',
				text: 'The Ontario Design System provides principles, guidance and code to help teams design and build accessible, mobile-friendly government websites and digital services.',
			},
			{
				type: 'list',
				heading: 'Latest release',
				list: ['Built on: June 3, 2022', 'Distribution package version 0.12.10'],
			},
		],
	},
	column2: {
		title: 'Help us improve the design system',
		content: [{ type: 'html', html: 'Check our <a href="#">help and feedback page</a>.' }],
		button: { text: 'Send us an email', link: '#' },
	},
};

const twoColumnOptionsFr = {
	column1: {
		title: "Système de conception de l'Ontario",
		content: [
			{
				type: 'text',
				text: "Le Système de conception de l'Ontario fournit des principes, des directives et du code pour aider les équipes à concevoir et à créer des sites Web et des services numériques gouvernementaux accessibles et adaptés aux mobiles.",
			},
			{
				type: 'list',
				heading: 'Dernière version',
				list: ['Construit le : 3 juin 2022', 'Version du package de distribution 0.12.10'],
			},
		],
	},
	column2: {
		title: 'Aidez-nous à améliorer le système de conception',
		content: [{ type: 'html', html: 'Consultez notre <a href="#">page d\'aide et de commentaires</a>.' }],
		button: { text: 'Envoyez-nous un courriel', link: '#' },
	},
};

export default function OntarioFooterTwoColumn() {
	return (
		<div>
			<main>
				<Grid>
					<h1>ontario-footer-twoColumn</h1>
				</Grid>
			</main>
			<div style={{ flex: '0 0 auto' }}>
				<hr />
				<h2>Two Column Footer with twoColumnOptions provided</h2>
				<div>
					<OntarioFooter type="twoColumn" language="en" twoColumnOptions={JSON.stringify(twoColumnOptions)} />
				</div>

				<hr />
				<h2>Two Column Footer in French with twoColumnOptions provided</h2>
				<div>
					<OntarioFooter type="twoColumn" language="fr" twoColumnOptions={JSON.stringify(twoColumnOptionsFr)} />
				</div>

				<hr />
				<h2>Two Column Footer with links and twoColumnOptions provided</h2>
				<div>
					<OntarioFooter
						type="twoColumn"
						twoColumnOptions={JSON.stringify(twoColumnOptions)}
						footerLinks={{
							accessibilityLink: { text: 'AccessibilityTest', href: 'https://www.ontario.ca/page/accessibility' },
							privacyLink: { text: 'PrivacyTest', href: 'https://www.ontario.ca/page/privacy-statement' },
							contactLink: { text: 'ContactTest', href: 'https://www.ontario.ca/feedback/contact-us' },
							printerLink: { text: 'PrinterTest', href: 'https://www.ontario.ca/page/copyright-information' },
						}}
					/>
				</div>

				<hr />
				<h2>Two Column Footer in French with links and twoColumnOptions provided</h2>
				<div>
					<OntarioFooter
						type="twoColumn"
						language="fr"
						twoColumnOptions={JSON.stringify(twoColumnOptionsFr)}
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
				<h2>Two Column Footer with just accessibility link and twoColumnOptions provided</h2>
				<div>
					<OntarioFooter
						type="twoColumn"
						twoColumnOptions={JSON.stringify(twoColumnOptions)}
						footerLinks={{
							accessibilityLink: { text: 'AccessibilityTest', href: 'https://www.ontario.ca/page/accessibility' },
						}}
					/>
				</div>

				<hr />
				<h2>Two Column Footer in French with just accessibility link and twoColumnOptions provided</h2>
				<div>
					<OntarioFooter
						type="twoColumn"
						language="fr"
						twoColumnOptions={JSON.stringify(twoColumnOptionsFr)}
						footerLinks={{
							accessibilityLink: { text: 'AccessibilitéTest', href: 'https://www.ontario.ca/fr/page/accessibilite' },
						}}
					/>
				</div>

				<hr />
				<h2>Two Column Footer with all socialLinks and footerlinks provided (appears in col2)</h2>
				<div>
					<OntarioFooter
						type="twoColumn"
						twoColumnOptions={JSON.stringify(twoColumnOptions)}
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
				</div>
				<hr />
				<h2>Two Column Footer in French with all socialLinks and footerlinks provided (appears in col2)</h2>
				<div>
					<OntarioFooter
						type="twoColumn"
						language="fr"
						twoColumnOptions={JSON.stringify(twoColumnOptionsFr)}
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
						socialLinks={{
							twitter: 'https://twitter.com/ONgov',
							facebook: 'https://www.facebook.com/ONgov',
							youtube: 'https://www.youtube.com/user/ONgov',
							instagram: 'https://www.instagram.com/ongov/',
						}}
					/>
				</div>
				<hr />
				<h2>Two Column Footer with only facebook socialLink provided (appears in col2)</h2>
				<div>
					<OntarioFooter
						type="twoColumn"
						twoColumnOptions={JSON.stringify(twoColumnOptions)}
						socialLinks={{
							facebook: 'https://www.facebook.com/ONgov',
						}}
					/>
				</div>
				<hr />
				<h2>Two Column Footer in French with only facebook socialLink provided (appears in col2)</h2>
				<div>
					<OntarioFooter
						type="twoColumn"
						language="fr"
						twoColumnOptions={JSON.stringify(twoColumnOptionsFr)}
						socialLinks={{
							facebook: 'https://www.facebook.com/ONgov',
						}}
					/>
				</div>
				<hr />
				<h2>Two Column Header with only facebook and instagram</h2>
				<div>
					<OntarioFooter
						type="twoColumn"
						twoColumnOptions={JSON.stringify(twoColumnOptions)}
						socialLinks={{
							facebook: 'https://www.facebook.com/ONgov',
							instagram: 'https://www.instagram.com/ongov/',
						}}
					/>
				</div>
				<hr />
				<h2>Two Column Header in French with only facebook and instagram</h2>
				<div>
					<OntarioFooter
						type="twoColumn"
						language="fr"
						twoColumnOptions={JSON.stringify(twoColumnOptionsFr)}
						socialLinks={{
							facebook: 'https://www.facebook.com/ONgov',
							instagram: 'https://www.instagram.com/ongov/',
						}}
					/>
				</div>
				<hr />
				<h2>Two Column Header with facebook, twitter, instagram</h2>
				<div>
					<OntarioFooter
						type="twoColumn"
						twoColumnOptions={JSON.stringify(twoColumnOptions)}
						socialLinks={{
							facebook: 'https://www.facebook.com/ONgov',
							twitter: 'https://twitter.com/ONgov',
							instagram: 'https://www.instagram.com/ongov/',
						}}
					/>
				</div>
				<hr />
				<h2>Two Column Header in French with facebook, twitter, instagram</h2>
				<div>
					<OntarioFooter
						type="twoColumn"
						language="fr"
						twoColumnOptions={JSON.stringify(twoColumnOptionsFr)}
						socialLinks={{
							facebook: 'https://www.facebook.com/ONgov',
							twitter: 'https://twitter.com/ONgov',
							instagram: 'https://www.instagram.com/ongov/',
						}}
					/>
				</div>
				<hr />
				<h2>Two Column Header with topMargin false</h2>
				<div>
					<OntarioFooter
						type="twoColumn"
						twoColumnOptions={JSON.stringify(twoColumnOptions)}
						topMargin={false}
						socialLinks={{
							facebook: 'https://www.facebook.com/ONgov',
							twitter: 'https://twitter.com/ONgov',
							instagram: 'https://www.instagram.com/ongov/',
						}}
					/>
				</div>
				<hr />
				<h2>Two Column Header in French with topMargin false</h2>
				<div>
					<OntarioFooter
						type="twoColumn"
						language="fr"
						twoColumnOptions={JSON.stringify(twoColumnOptionsFr)}
						topMargin={false}
						socialLinks={{
							facebook: 'https://www.facebook.com/ONgov',
							twitter: 'https://twitter.com/ONgov',
							instagram: 'https://www.instagram.com/ongov/',
						}}
					/>
				</div>
				<hr />
				<h2>Two Column Footer with assetBasePath set</h2>
				<div>
					<OntarioFooter
						type="twoColumn"
						twoColumnOptions={JSON.stringify(twoColumnOptions)}
						assetBasePath="/assets"
						socialLinks={{
							facebook: 'https://www.facebook.com/ONgov',
							twitter: 'https://twitter.com/ONgov',
							instagram: 'https://www.instagram.com/ongov/',
							youtube: 'https://www.youtube.com/user/ONgov',
						}}
					/>
				</div>
				<hr />
				<h2>Two Column Footer in French with assetBasePath set</h2>
				<div>
					<OntarioFooter
						type="twoColumn"
						language="fr"
						twoColumnOptions={JSON.stringify(twoColumnOptionsFr)}
						assetBasePath="/assets"
						socialLinks={{
							facebook: 'https://www.facebook.com/ONgov',
							twitter: 'https://twitter.com/ONgov',
							instagram: 'https://www.instagram.com/ongov/',
							youtube: 'https://www.youtube.com/user/ONgov',
						}}
					/>
				</div>
			</div>
		</div>
	);
}
