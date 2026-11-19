import { Component } from '@angular/core';
import { ComponentLibraryModule } from '@ongov/ontario-design-system-component-library-angular';

@Component({
	selector: 'app-ontario-footer-page',
	templateUrl: './ontario-footer.component.html',
	imports: [ComponentLibraryModule],
})
export class OntarioFooterPageComponent {
	footerLinks = JSON.stringify({
		accessibilityLink: { text: 'Accessibility', href: 'https://www.ontario.ca/page/accessibility' },
		privacyLink: { href: 'https://www.ontario.ca/page/privacy-statement' },
		contactLink: { text: 'Contact', href: 'https://www.ontario.ca/feedback/contact-us' },
		printerLink: { href: 'https://www.ontario.ca/page/copyright-information' },
	});

	socialLinks = JSON.stringify({
		facebook: 'https://www.facebook.com/ONgov',
		twitter: 'https://twitter.com/ONgov',
		instagram: 'https://www.instagram.com/ongov',
		youtube: 'https://www.youtube.com/ongov',
	});

	twoColumnOptions = JSON.stringify({
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
	});

	threeColumnOptions = JSON.stringify({
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
	});
}
