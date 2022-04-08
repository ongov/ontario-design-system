import React from 'react';
import '../stories.scss';
import ButtonWhenToUse from './ButtonWhenToUse';
import ButtonExample from './ButtonExample';
import ButtonGuidance from './ButtonGuidance';

const StoryOntarioButton = () => {
	return (
		<div className="page-content">
			<ButtonWhenToUse />
			<ButtonExample />
			<ButtonGuidance/>
		</div>
	);
};

export default StoryOntarioButton;
