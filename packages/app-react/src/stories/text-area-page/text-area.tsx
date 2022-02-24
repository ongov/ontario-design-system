import React from 'react';
import './text-area.scss';
import { OntarioTextarea } from '@ontario-digital-service/ontario-design-system-component-library-react';

const StoryOntarioTextArea= () => (
	<div className="ontario-button-container">
		<div className="ontario-row">
			<OntarioTextarea
				labelCaption="this is a label caption"
				labelFor="this is a lable for"
				labelType="default"
				describedBy="described by"
				elementId="id"
				name="name"
				required
                value="value"
			/>
		</div>
	</div>
);

export default StoryOntarioTextArea;
