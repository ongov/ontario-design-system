import React from 'react';
import './App.scss';
import { BrowserRouter } from 'react-router-dom';
import StoryRouter from './Story';
import { OntarioHeader } from '@ontario-digital-service/ontario-design-system-component-library-react';
import { OntarioFooter } from '@ontario-digital-service/ontario-design-system-component-library-react';

const App = () => {
	return (
		<BrowserRouter>
			<div className="App">
				<div className="content-layout">
					<div className="header">
						<OntarioHeader
							type="ontario"
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
						<OntarioFooter type="default" if-default = "true" if-two-columns= "true"  if-expanded="false" if-expanded-two-column="false" if-expanded-three-column="true"/>
					</div>
				</div>
			</div>
		</BrowserRouter>
	);
};

export default App;
