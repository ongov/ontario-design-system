import React from 'react';
import './App.scss';
import { BrowserRouter } from 'react-router-dom';
import StoryRouter from './Story';
import { OntarioHeader, OntarioFooter, setAssetPath  } from '@ontario-digital-service/ontario-design-system-component-library-react';


const App = () => {

	setAssetPath("localhost:3000");
	return (
		<BrowserRouter>
			<div className="App">
				<div className="content-layout">
					<div className="header">
						<OntarioHeader
							type="application"
							titleHeader={{
								name: 'Design System',
								href: '/',
							}}
							languageToggleOptions={{
								englishLink: '/en',
								frenchLink: '/fr',
							}}
							menuItems={[
								{
									name: 'Button',
									href: '/ontario-button',
								},
								{
									name: 'Hint',
									href: '/ontario-hint',
								},
								{
									name: 'Text Area',
									href: '/ontario-text-area',
								},
								{
									name: 'Text Input',
									href: '/ontario-text-input',
								},
								{
									name: 'Hint',
									href: '/ontario-hint',
								},
								{
									name: 'Hint',
									href: '/ontario-hint',
								},
								{
									name: 'Hint',
									href: '/ontario-hint',
								},
								{
									name: 'Hint',
									href: '/ontario-hint',
								},
								{
									name: 'Hint',
									href: '/ontario-hint',
								},
								{
									name: 'Hint',
									href: '/ontario-hint',
								},
								{
									name: 'Hint',
									href: '/ontario-hint',
								},
							]}
						/>
					</div>
					<div className="main-content">
						<StoryRouter />
					</div>
					<div className="footer">
						<OntarioFooter 
						type = "expandedTwoColumn" 
						defaultOptions={{
							accessibilityLink:"https://www.ontario.ca/page/accessibility",
							privacyLink: "https://www.ontario.ca/page/privacy-statement",
							contactLink: "https://www.ontario.ca/feedback/contact-us",
							queensPrinterLink: "https://www.ontario.ca/page/copyright-information-c-queens-printer-ontario"
						}} 
						expandedTwoColumnOptions = {{
							firstColumn: {
								title: "Ontario Design System",
								content:"The Ontario Design System provides principles, guidance and code to help teams design and build accessible, mobile-friendly government websites and digital services." 
							},
							secondColumn: {
								title: "Help us improve the design system",
								content:'You can check our <a href="https://designsystem.ontario.ca/docs/help-feedback.html">help and feedback page</a> if you don’t see the component you need.',
								contactButtonText: "Send us an email"
							}
						}} 
						/>
					</div>
				</div>
			</div>
		</BrowserRouter>
	);
};

export default App;
