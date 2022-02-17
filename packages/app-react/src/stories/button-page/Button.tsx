import React from "react";
import './Button.scss';
import { OntarioButton } from "@ontario-digital-service/ontario-design-system-component-library-react";

const StoryOntarioButton = () => (
	<div className="ontario-button-container">
		<div className="ontario-row">
			<OntarioButton label="Click me." type="primary" />
			<OntarioButton label="Click me." type="secondary" />
			<OntarioButton label="Click me." type="tertiary" />
		</div>
	</div>
);

export default StoryOntarioButton;

