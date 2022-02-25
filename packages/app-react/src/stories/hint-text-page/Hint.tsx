import React from 'react';
import '../stories.scss';
import HintWhenToUse from './HintWhenToUse';
import HintText from './HintText';
import HintExpander from './HintExpander';
import WriteClearLinkText from './WriteClearLinkText';

const StoryOntarioHint = () => {
	return (
		<div className="page-content">
			<HintWhenToUse />
			<HintText />
			<HintExpander />
			<WriteClearLinkText />
		</div>
	);
};

export default StoryOntarioHint;
