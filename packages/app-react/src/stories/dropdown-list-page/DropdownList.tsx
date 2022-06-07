import React from 'react';
import '../stories.scss';
import DropdownListGuidance from './DropdownListGuidance';
import DropdownListWhenToUse from './DropdownListWhenToUse';
import DropdownListExamples from './DropdownListExample';
import DropdownListTechnicalSpecifications from './DropdownListTechnicalSpecifications';

const StoryOntarioDropdownList = () => {
	return (
		<div className="page-content">
			<DropdownListWhenToUse />
			<DropdownListGuidance />
			<DropdownListExamples />
			<DropdownListTechnicalSpecifications />
		</div>
	);
};

export default StoryOntarioDropdownList;
