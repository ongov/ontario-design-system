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
							titleHeader={{
								name: 'Design System',
								href: '/',
							}}
							languageTogglePaths={{
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
						type = "expanded two column" 
						defaultOptions={{
							accessibilityLink:"https://www.ontario.ca/page/accessibility",
							privacyLink: "https://www.ontario.ca/page/privacy-statement",
							contactLink: "https://www.ontario.ca/feedback/contact-us",
							queensPrinterLink: "https://www.ontario.ca/page/copyright-information-c-queens-printer-ontario"
						}} 
						partnershipConnection="Sponsored by Government of Ontario"  
						expandedTwoColumnOptions = {{
							firstColumn: {
								title: "This is my First Title",
								content:"this is my first content: content content content content" 
							},
							secondColumn: {
								title: "This is my Second Title",
								content:"this is my second content: content content content content",
								contactButtonText: "im a button"
							}
						}} 
						expandedThreeColumnOptions = {{
							firstColumn: {
								title: "This is my First Title",
								content:"this is my first content" 
							},
							secondColumn: {
								title: "This is my Second Title",
								content:[
								{
									title: "1 asdas",
									link: "12"
								},
								{
									title: "2 asdasddasd",
									link: "22"
								},
								{
									title: "2 asdasddasd",
									link: "22"
								},
								{
									title: "2 asdasddasd",
									link: "22"
								},
								{
									title: "2 asdasddasd",
									link: "22"
								},
								{
									title: "2 asdasddasd",
									link: "22"
								}
								]
							},
							thirdColumn: {
								title: "this is my third title",
								content: "this is my third content",
								facebook: {
									link: "1"
								},
								twitter: {
									link: "2"
								},
								instagram: {
									link: "3"
								}
							}
						}}/>
					</div>
				</div>
			</div>
		</BrowserRouter>
	);
};

export default App;
