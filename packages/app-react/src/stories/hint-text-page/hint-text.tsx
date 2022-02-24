import React from "react";
import './hint-text.scss';
import { OntarioHintText } from "@ontario-digital-service/ontario-design-system-component-library-react";

const StoryOntarioHintText = () => (
	<div className="ontario-button-container">
		<div className="ontario-row">
			<OntarioHintText hint="this is a hint"  elementId="this is the element id" />
		</div>
	</div>
);

export default StoryOntarioHintText;

