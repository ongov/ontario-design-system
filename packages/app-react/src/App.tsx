import React from 'react';
import './App.scss';
import { HashRouter } from 'react-router-dom';
import StoryRouter from './Story';
import { OntarioHeader, OntarioFooter, setAssetPath as componentSetAssetPath } from '@ontario-digital-service/ontario-design-system-component-library-react';

const App = () => {
	const setAssetPath = (path: string) => componentSetAssetPath(path);

	// Set the asset path based on what environment the application is running in.
	switch (process.env.NODE_ENV) {
		case 'production':
			const assetPath = process.env.ASSET_PATH ?? process.env.PUBLIC_URL ?? '/';
			setAssetPath(assetPath);
			break;
		case 'development':
		default:
			setAssetPath('localhost:3000');
	}

	// Prepend links with # to integrate with HashRouter
	// This allows for the app to be hosted from a single resource
	const generateHashPath = (path: string) => `#${path}`;

	return (
		<HashRouter>
			<div className="App">
				<div className="content-layout">
					<div className="header">
						<OntarioHeader
							type="application"
							titleHeader={{
								name: 'Design System React Proof of Concept',
								href: generateHashPath('/'),
							}}
							languageToggleOptions={{
								englishLink: '#',
								frenchLink: '#',
							}}
							menuItems={[
								{
									name: 'Button',
									href: generateHashPath('/ontario-button'),
								},
								{
									name: 'Hint',
									href: generateHashPath('/ontario-hint'),
								},
								{
									name: 'Text Area',
									href: generateHashPath('/ontario-text-area'),
								},
								{
									name: 'Text Input',
									href: generateHashPath('/ontario-text-input'),
								},
								{
									name: 'Icon',
									href: generateHashPath('/ontario-icon'),
								},
								{
									name: 'Header',
									href: generateHashPath('/ontario-header'),
								},
								{
									name: 'Footer',
									href: generateHashPath('/ontario-footer'),
								},
								{
									name: 'Checkbox',
									href: generateHashPath('/ontario-checkbox'),
								},
								{
									name: 'Radio Button',
									href: generateHashPath('/ontario-radio-button'),
								},
								{
									name: 'Dropdown List',
									href: generateHashPath('/ontario-dropdown-list'),
								},
							]}
						/>
					</div>
					<div className="main-content">
						<StoryRouter />
					</div>
					<div className="footer">
						<OntarioFooter
							type="expandedTwoColumn"
							defaultOptions={{
								accessibilityLink: 'https://www.ontario.ca/page/accessibility',
								privacyLink: 'https://www.ontario.ca/page/privacy-statement',
								contactLink: 'https://www.ontario.ca/feedback/contact-us',
								queensPrinterLink: 'https://www.ontario.ca/page/copyright-information-c-queens-printer-ontario',
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
		</HashRouter>
	);
};

export default App;
