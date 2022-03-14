import React from 'react';
import './App.scss';
import { BrowserRouter } from 'react-router-dom';
import StoryRouter from './Story';
import Header from './Prototype-Components/ontario-header/ontario-header';
import Footer from './Prototype-Components/ontario-footer/ontario-footer';
import { OntarioHeader } from '@ontario-digital-service/ontario-design-system-component-library-react';
import { OntarioFooter } from '@ontario-digital-service/ontario-design-system-component-library-react';

const App = () => {
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
						{/* <Footer /> */}
						{/* <OntarioFooter type="expanded" default={true} twoColumns={false} expanded={true} expandedTwoColumn={false} expandedThreeColumn={true} /> */}
					</div>
				</div>
			</div>
		</BrowserRouter>
	);
};

export default App;
