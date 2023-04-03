import React from 'react';

import HeaderApplication from './HeaderApplication';
import HeaderOntario from './HeaderOntario';
import HeaderApplicationExample from './HeaderApplicationExample';
import HeaderOntarioExample from './HeaderOntarioExample';

const StoryOntarioHeader = () => {
	return (
		<>
			<HeaderApplication />
			<HeaderApplicationExample />
			<HeaderOntario />
			<HeaderOntarioExample />
		</>
	);
};

export default StoryOntarioHeader;
