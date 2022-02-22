import React from "react";
import './hint-expander.scss';
import { OntarioHintExpander } from "@ontario-digital-service/ontario-design-system-component-library-react";

const StoryOntarioHintExpander = () => (
	<div className="ontario-button-container">
		<div className="ontario-row">
			<OntarioHintExpander hint="this is a hint" content="this is the content" ariaLabel="this it the arialabel" elementId="this is the element id" />
		</div>
	</div>
);

export default StoryOntarioHintExpander;

