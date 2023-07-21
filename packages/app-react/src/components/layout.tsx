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
					maxSubheaderDesktopLinks: 3,
					maxSubheaderMobileLinks: 2,
					maxSubheaderTabletLinks: 2,
				}}
				languageToggleOptions={{
					englishLink: '#',
					frenchLink: '#',
				}}
				menuItems={menuLinks}
			/>
			<main>{children}</main>
			<OntarioFooter
				type="twoColumn"
				twoColumnOptions={{
					column1: {
						title: 'Ontario Design System React PoC',
						content: [
							{
								type: 'text',
								text: 'The Ontario Design System provides principles, guidance and code to help teams design and build accessible, mobile-friendly government websites and digital services.',
							},
						],
					},
					column2: {
						title: 'Help us improve the design system',
						content: [
							{
								type: 'html',
								html: 'You can check our <a style="color: #FFF" href="https://designsystem.ontario.ca/docs/help-feedback.html"><strong>help and feedback page</strong></a> if you don’t see the component you need.',
							},
						],
						button: {
							text: 'Send us an email',
							link: 'mailto:design.system@ontario.ca',
						},
					},
				}}
			/>
		</>
	);
};

export default Layout;
