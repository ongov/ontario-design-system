import React from 'react';

import DropdownListGuidance from './DropdownListGuidance';
import DropdownListWhenToUse from './DropdownListWhenToUse';
import DropdownListExamples from './DropdownListExample';
import DropdownListTechnicalSpecifications from './DropdownListTechnicalSpecifications';

const StoryOntarioDropdownList = () => {
	return (
		<>
			<DropdownListWhenToUse />
			<DropdownListGuidance />
			<DropdownListExamples />
			<DropdownListTechnicalSpecifications />
		</>
	);
};

export default StoryOntarioDropdownList;
