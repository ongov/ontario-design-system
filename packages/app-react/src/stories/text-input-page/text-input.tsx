import React from 'react';
import './text-input.scss';
import { OntarioInput } from '@ontario-digital-service/ontario-design-system-component-library-react';

const StoryOntarioInput = () => (
	<div className="ontario-button-container">
		<div className="ontario-row">
			<OntarioInput
				labelCaption="this is a label caption"
				labelFor="this is a lable for"
				labelType="default"
				describedBy="described by"
				elementId="id"
				inputWidth="4-char-width"
				name="name"
				required
				type="text"
                value="value"
			/>
		</div>
	</div>
);

export default StoryOntarioInput;
