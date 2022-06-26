import React from 'react';
import '../stories.scss';
import CheckboxGuidance from './CheckboxGuidance';
import CheckboxWhenToUse from './CheckboxWhenToUse';
import CheckboxExample from './CheckboxExample';

const StoryOntarioCheckbox = () => {
	return (
		<div className="page-content">
			<CheckboxWhenToUse />
			<CheckboxExample />
			<CheckboxGuidance />
		</div>
	);
};

export default StoryOntarioCheckbox;
