import React, { Component } from 'react';
import './App.scss';
import StoryRouter from './Story';
import { BrowserRouter } from 'react-router-dom';
import Header from './Prototype Components/Header';
// import '../node_modules/ontario-design-system-global-styles/src/scss/theme.scss';
// import '../ ontario-design-system-global-styles/src/scss/theme.scss';

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
						<div className="footer"></div>
					</div>
				</div>
			</BrowserRouter>
		);
	}
}

export default App;
