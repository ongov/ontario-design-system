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
								name: 'something',
								href: '#something',
							}}
							languageTogglePaths={{
								englishLink: '/englishlink',
								frenchLink: '/frenchlink',
							}}
						/>
						{/* <Header /> */}
					</div>
					<div className="main-content">
						<StoryRouter />
					</div>
					<div className="footer">
						{/* <Footer /> */}
						<OntarioFooter type="expanded" default={true} twoColumns={false} expanded={true} expandedTwoColumn={false} expandedThreeColumn={true}/>
					</div>
				</div>
			</div>
		</BrowserRouter>
	);
};

export default App;
