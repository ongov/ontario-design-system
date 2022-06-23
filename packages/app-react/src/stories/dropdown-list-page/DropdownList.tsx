import React from 'react';
import '../stories.scss';
import DropdownListGuidance from './DropdownListGuidance';
import DropdownListWhenToUse from './DropdownListWhenToUse';
import DropdownListExample from './DropdownListExample';
import DropdownListTechnicalSpecifications from './DropdownListTechnicalSpecifications';

const StoryOntarioDropdownList = () => {
	return (
		<div className="page-content">
			<DropdownListWhenToUse />
			<DropdownListGuidance />
			<DropdownListExample />
			<DropdownListTechnicalSpecifications />
		</div>
	);
};

export default StoryOntarioDropdownList;
