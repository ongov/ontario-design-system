import { Grid } from '../../grid';
import { OntarioFooter } from '@ongov/ontario-design-system-component-library-react';

const footerLinks = {
	accessibilityLink: { text: 'Accessibility', href: 'https://www.ontario.ca/page/accessibility' },
	privacyLink: { href: 'https://www.ontario.ca/page/privacy-statement' },
	contactLink: { text: 'Contact', href: 'https://www.ontario.ca/feedback/contact-us' },
	printerLink: { href: 'https://www.ontario.ca/page/copyright-information' },
};

const socialLinks = {
	facebook: 'https://www.facebook.com/ONgov',
	twitter: 'https://twitter.com/ONgov',
	instagram: 'https://www.instagram.com/ongov',
	youtube: 'https://www.youtube.com/ongov',
};

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
		content: [
			{
				type: 'html',
				html: 'You can check our <a href="#">help and feedback page</a> if you don’t see the component you need.',
			},
		],
		button: { text: 'Send us an email', link: '#' },
	},
};

const threeColumnOptions = {
	column1: {
		title: 'Ontario Design System',
		content: [
			{
				type: 'text',
				text: 'The Ontario Design System provides principles, guidance and code to help teams design and build accessible, mobile-friendly government websites and digital services.',
			},
		],
	},
	column2: {
		title: 'Latest release',
		content: [
			{
				type: 'list',
				list: ['Built on: June 3, 2022', 'Distribution package version 0.12.10'],
			},
		],
	},
	column3: {
		title: 'Help us improve the design system',
		content: [
			{
				type: 'html',
				html: 'You can check our <a href="#">help and feedback page</a> if you don’t see the component you need.',
			},
		],
		button: { text: 'Send us an email', link: '#' },
	},
};

export default function OntarioFooterPage() {
	return (
		<main>
			<Grid>
				<h1>ontario-footer</h1>

				<h2>"type" Prop Variants</h2>

				<h3>Default (simple) footer</h3>
				<OntarioFooter
					id="ontario-footer-default"
					type="default"
					footerLinks={JSON.stringify(footerLinks)}
					assetBasePath="/assets"
				></OntarioFooter>

				<h3>Two column expanded footer</h3>
				<OntarioFooter
					id="ontario-footer-two-column"
					type="twoColumn"
					footerLinks={JSON.stringify(footerLinks)}
					twoColumnOptions={JSON.stringify(twoColumnOptions)}
					assetBasePath="/assets"
				></OntarioFooter>

				<h3>Two column expanded footer with social links</h3>
				<OntarioFooter
					id="ontario-footer-two-column-social"
					type="twoColumn"
					footerLinks={JSON.stringify(footerLinks)}
					socialLinks={JSON.stringify(socialLinks)}
					twoColumnOptions={JSON.stringify(twoColumnOptions)}
					assetBasePath="/assets"
				></OntarioFooter>

				<h3>Three column expanded footer with social links</h3>
				<OntarioFooter
					id="ontario-footer-three-column"
					type="threeColumn"
					footerLinks={JSON.stringify(footerLinks)}
					socialLinks={JSON.stringify(socialLinks)}
					threeColumnOptions={JSON.stringify(threeColumnOptions)}
					assetBasePath="/assets"
				></OntarioFooter>

				<h2>"topMargin" Prop Variant</h2>

				<h3>No top margin</h3>
				<OntarioFooter
					id="ontario-footer-no-top-margin"
					type="default"
					topMargin={false}
					footerLinks={JSON.stringify(footerLinks)}
					assetBasePath="/assets"
				></OntarioFooter>
			</Grid>
		</main>
	);
}
