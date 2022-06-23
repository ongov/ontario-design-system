import React from 'react';
import '../stories.scss';
import RadioButtonGuidance from './RadioButtonGuidance';
import RadioButtonWhenToUse from './RadioButtonWhenToUse';
import RadioButtonExample from './RadioButtonExample';

const StoryOntarioRadioButton = () => {
	return (
		<div className="page-content">
			<RadioButtonWhenToUse />
			<RadioButtonExample />
			<RadioButtonGuidance />
		</div>
	);
};

export default StoryOntarioRadioButton;
