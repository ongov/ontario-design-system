import React, { Component } from 'react';
import './App.css';
import { OntarioHeader } from '@ontario-digital-service/ontario-design-system-component-library-react';

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
			<div className="App">
				<div className="App-content">
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
			</div>
		);
	}
}

export default App;
