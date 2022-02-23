import React from 'react';
import './Button-iframe.scss';
import { OntarioButton } from '@ontario-digital-service/ontario-design-system-component-library-react';

const StoryOntarioButton = () => {
	return (
		<div className="buttonIframe">
			<OntarioButton type="primary">Primary</OntarioButton>
			<OntarioButton type="secondary">Secondary</OntarioButton>
			<OntarioButton type="tertiary">Tertiary</OntarioButton>
		</div>
	);
};

export default StoryOntarioButton;
