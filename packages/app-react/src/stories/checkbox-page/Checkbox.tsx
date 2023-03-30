import React from 'react';

import CheckboxGuidance from './CheckboxGuidance';
import CheckboxWhenToUse from './CheckboxWhenToUse';
import CheckboxExample from './CheckboxExample';

const StoryOntarioCheckbox = () => {
	return (
		<>
			<CheckboxWhenToUse />
			<CheckboxExample />
			<CheckboxGuidance />
		</>
	);
};

export default StoryOntarioCheckbox;
