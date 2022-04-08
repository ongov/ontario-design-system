import React from 'react';
import TextInputWhenToUse from './TextInputWhenToUse';
import TextInputExample from './TextInputExample';
import TextInputGuidance from './TextInputGuidance';

const StoryOntarioInput = () => {
	return (
		<div className="page-content">
			<TextInputWhenToUse />
			<TextInputExample />
			<TextInputGuidance />
		</div>
	);
};

export default StoryOntarioInput;
