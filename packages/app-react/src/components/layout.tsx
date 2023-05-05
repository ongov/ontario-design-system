import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { OntarioHeader, OntarioFooter } from '@ontario-digital-service/ontario-design-system-component-library-react';

interface MenuLinks {
	title: string;
	href: string;
	linkIsActive: boolean;
	onClickHandler: (e: Event) => void;
}

const Layout = ({ children }: any) => {
	const navigate = useNavigate();
	const location = useLocation();

	const [menuLinks, setMenuLinks] = useState([
		{
			title: 'Buttons',
			href: '/ontario-button',
			linkIsActive: false,
			onClickHandler: (e: Event) => {
				e.preventDefault();
				navigate('/ontario-button');
			},
		},
		{
			title: 'Hint text',
			href: '/ontario-hint',
			linkIsActive: false,
			onClickHandler: (e: Event) => {
				e.preventDefault();
				navigate('/ontario-hint');
			},
		},
		{
			title: 'Textarea',
			href: '/ontario-textarea',
			linkIsActive: false,
			onClickHandler: (e: Event) => {
				e.preventDefault();
				navigate('/ontario-textarea');
			},
		},
		{
			title: 'Text Input',
			href: '/ontario-text-input',
			linkIsActive: false,
			onClickHandler: (e: Event) => {
				e.preventDefault();
				navigate('/ontario-text-input');
			},
		},
		{
			title: 'Icons',
			href: '/ontario-icon',
			linkIsActive: false,
			onClickHandler: (e: Event) => {
				e.preventDefault();
				navigate('/ontario-icon');
			},
		},
		{
			title: 'Headers',
			href: '/ontario-header',
			linkIsActive: false,
			onClickHandler: (e: Event) => {
				e.preventDefault();
				navigate('/ontario-header');
			},
		},
		{
			title: 'Footers',
			href: '/ontario-footer',
			linkIsActive: false,
			onClickHandler: (e: Event) => {
				e.preventDefault();
				navigate('/ontario-footer');
			},
		},
		{
			title: 'Checkboxes',
			href: '/ontario-checkbox',
			linkIsActive: false,
			onClickHandler: (e: Event) => {
				e.preventDefault();
				navigate('/ontario-checkbox');
			},
		},
		{
			title: 'Radio Buttons',
			href: '/ontario-radio-button',
			linkIsActive: false,
			onClickHandler: (e: Event) => {
				e.preventDefault();
				navigate('/ontario-radio-button');
			},
		},
		{
			title: 'Dropdown List',
			href: '/ontario-dropdown-list',
			linkIsActive: false,
			onClickHandler: (e: Event) => {
				e.preventDefault();
				navigate('/ontario-dropdown-list');
			},
		},
		{
			title: 'Blockquote',
			href: '/ontario-blockquote',
			linkIsActive: false,
			onClickHandler: (e: Event) => {
				e.preventDefault();
				navigate('/ontario-blockquote');
			},
		},
	]);

	const determineActiveLink = (url: string) => {
		const updatedState = menuLinks.map((link: MenuLinks) => {
			if (url === link.href) {
				return { ...link, linkIsActive: true };
			} else {
				return { ...link, linkIsActive: false };
			}
		});

		setMenuLinks(updatedState);
	};

	useEffect(() => {
		determineActiveLink(location.pathname);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [location]);

	return (
		<>
			<OntarioHeader
				type="application"
				applicationHeaderInfo={{
					title: 'Design System React Proof of Concept',
					href: '/',
				}}
				languageToggleOptions={{
					englishLink: '#',
					frenchLink: '#',
				}}
				menuItems={menuLinks}
			/>
			<main>{children}</main>
			<OntarioFooter
				type="expandedTwoColumn"
				defaultOptions={{
					accessibilityLink: 'https://www.ontario.ca/page/accessibility',
					privacyLink: 'https://www.ontario.ca/page/privacy-statement',
					contactLink: 'https://www.ontario.ca/feedback/contact-us',
					printerLink: 'https://www.ontario.ca/page/copyright-information-c-queens-printer-ontario',
				}}
				expandedTwoColumnOptions={{
					firstColumn: {
						title: 'Ontario Design System React PoC',
						content:
							'The Ontario Design System provides principles, guidance and code to help teams design and build accessible, mobile-friendly government websites and digital services.',
					},
					secondColumn: {
						title: 'Help us improve the design system',
						content:
							'You can check our <a style="color: #FFF" href="https://designsystem.ontario.ca/docs/help-feedback.html"><strong>help and feedback page</strong></a> if you don’t see the component you need.',
						contactButtonText: 'Send us an email',
					},
				}}
			/>
		</>
	);
};

export default Layout;
