import React, { Component } from 'react';
import './App.scss';
import StoryRouter from './Story';
import { BrowserRouter } from 'react-router-dom';
import Header from './Prototype-Components/Header';
import Footer from './Prototype-Components/Footer';

interface State {
	value: number | null;
}

class App extends Component<{}, State> {
	constructor(props: {}) {
		super(props);

		this.state = {
			value: null,
		};
	}

	updateRangeValue = (newValue: number) => {
		this.setState(() => ({
			value: newValue,
		}));
	};

	render() {
		return (
			<BrowserRouter>
				<div className="App">
					<div className="content-layout">
						<div className="header">
							<Header />
						</div>
						<div className="main-content">
							<StoryRouter />
						</div>
						<div className="footer">
							<Footer />
						</div>
					</div>
				</div>
			</BrowserRouter>
		);
	}
}

export default App;
