import React from 'react';
import './App.scss';
import StoryRouter from './Story';
import { BrowserRouter } from 'react-router-dom';
import Header from './Prototype-Components/ontario-header/ontario-header';
import Footer from './Prototype-Components/ontario-footer/ontario-footer';

const App = () => {
	return (
		<BrowserRouter>
			<div className="App">
				<div className="content-layout">
					<div className="header" id="header">
						<Header />
					</div>
					<div className="main-content">
						<StoryRouter />
					</div>
					<div className="footer" id="footer">
						<Footer />
					</div>
				</div>
			</div>
		</BrowserRouter>
	);
};

export default App;
