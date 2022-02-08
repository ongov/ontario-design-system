import React, { Component } from 'react';
import NavBar from './Navbar';
import './App.scss';
import StoryRouter from './Story';
import { BrowserRouter } from 'react-router-dom';
import Header from './Header';
import { OntarioButton, OntarioHintText, OntarioInput } from 'ontario-design-system-component-library-react';
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
							<OntarioButton type="primary"> button </OntarioButton>
							<OntarioButton type="secondary"> hi </OntarioButton>
						</div>
						<div className="nav-bar">
							<NavBar />
						</div>
						<div className="main-content">
							<StoryRouter />
						</div>
					</div>
				</div>
			</BrowserRouter>
		);
	}
}

export default App;
