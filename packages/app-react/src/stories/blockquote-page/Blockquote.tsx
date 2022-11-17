import React from 'react';
import '../stories.scss';
import BlockquoteWhenToUse from './BlockquoteWhenToUse';
import BlockquoteExample from './BlockquoteExample';
import BlockquoteGuidance from './BlockquoteGuidance';

const StoryOntarioBlockquote = () => {
	return (
		<div className="page-content">
			<BlockquoteWhenToUse />
			<BlockquoteExample />
			<BlockquoteGuidance />
		</div>
	);
};

export default StoryOntarioBlockquote;
