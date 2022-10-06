import React, { useState, useEffect } from 'react';

import { useNavigate, useLocation } from 'react-router-dom';

import { OntarioHeader, OntarioFooter } from '@ontario-digital-service/ontario-design-system-component-library-react';

const Layout = ({ children }: any) => {
	let navigate = useNavigate();
	let location = useLocation();

	const [menuLinks, setMenuLinks] = useState([
		{
			name: 'Button',
			href: '/ontario-button',
			linkIsActive: false,
			onClickHandler: (e: Event) => {
				e.preventDefault();
				navigate('/ontario-button');
			},
		},
		{
			name: 'Hint',
			href: '/ontario-hint',
			linkIsActive: false,
			onClickHandler: (e: Event) => {
				e.preventDefault();
				navigate('/ontario-hint');
			},
		},
		{
			name: 'Text Area',
			href: '/ontario-textarea',
			linkIsActive: false,
			onClickHandler: (e: Event) => {
				e.preventDefault();
				navigate('/ontario-textarea');
			},
		},
		{
			name: 'Text Input',
			href: '/ontario-text-input',
			linkIsActive: false,
			onClickHandler: (e: Event) => {
				e.preventDefault();
				navigate('/ontario-text-input');
			},
		},
		{
			name: 'Icon',
			href: '/ontario-icon',
			linkIsActive: false,
			onClickHandler: (e: Event) => {
				e.preventDefault();
				navigate('/ontario-icon');
			},
		},
		{
			name: 'Header',
			href: '/ontario-header',
			linkIsActive: false,
			onClickHandler: (e: Event) => {
				e.preventDefault();
				navigate('/ontario-header');
			},
		},
		{
			name: 'Footer',
			href: '/ontario-footer',
			linkIsActive: false,
			onClickHandler: (e: Event) => {
				e.preventDefault();
				navigate('/ontario-footer');
			},
		},
		{
			name: 'Checkbox',
			href: '/ontario-checkbox',
			linkIsActive: false,
			onClickHandler: (e: Event) => {
				e.preventDefault();
				navigate('/ontario-checkbox');
			},
		},
		{
			name: 'Radio Button',
			href: '/ontario-radio-button',
			linkIsActive: false,
			onClickHandler: (e: Event) => {
				e.preventDefault();
				navigate('/ontario-radio-button');
			},
		},
		{
			name: 'Dropdown List',
			href: '/ontario-dropdown-list',
			linkIsActive: false,
			onClickHandler: (e: Event) => {
				e.preventDefault();
				navigate('/ontario-dropdown-list');
			},
		},
	]);

	const determineActiveLink = (url: string) => {
		const updatedState = menuLinks.map((link: any) => {
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
	}, [location]);

	return (
		<div className="App">
			<div className="content-layout">
				<div className="header">
					<OntarioHeader
						type="application"
						titleHeader={{
							name: 'Design System React Proof of Concept',
							href: '/',
						}}
						languageToggleOptions={{
							englishLink: '#',
							frenchLink: '#',
						}}
						menuItems={menuLinks}
					/>
				</div>
				<div className="main-content">{children}</div>
				<div className="footer">
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
				</div>
			</div>
		</div>
	);
};

export default Layout;
