import React from 'react';
import '../stories.scss';
import TextAreaExample from './TextAreaExample';
import TextAreaWhenToUse from './TextAreaWhenToUse';

const StoryOntarioTextArea = () => {
	return (
		<div className="page-content">
			<TextAreaWhenToUse />
			<TextAreaExample />
		</div>
	);
};

export default StoryOntarioTextArea;
