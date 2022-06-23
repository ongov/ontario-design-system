import React from 'react';
import '../stories.scss';
import HeaderApplication from './HeaderApplication';
import HeaderOntario from './HeaderOntario';
import HeaderApplicationExample from './HeaderApplicationExample';
import HeaderOntarioExample from './HeaderOntarioExample';

const StoryOntarioHeader = () => {
	return (
		<div className="page-content">
			<HeaderApplication />
			<HeaderApplicationExample />
			<HeaderOntario/>
			<HeaderOntarioExample />
		</div>
	);
};

export default StoryOntarioHeader;
