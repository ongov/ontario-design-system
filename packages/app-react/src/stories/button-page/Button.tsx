import React from 'react';
import '../stories.scss';
import ButtonWhenToUse from './ButtonWhenToUse';
import DisabledButtons from './DisabledButtons';
import TypesOfButtons from './TypesOfButtons';

const StoryOntarioButton = () => {
	return (
		<div className="page-content">
			<ButtonWhenToUse />
			<TypesOfButtons />
			<DisabledButtons />
		</div>
	);
};

export default StoryOntarioButton;
