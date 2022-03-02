import React from 'react';
import '../stories.scss';
import HintWhenToUse from './HintWhenToUse';
import HintText from './HintText';
import HintExpander from './HintExpander';
import HintGuidance from './HintGuidance';

const StoryOntarioHint = () => {
	return (
		<div className="page-content">
			<HintWhenToUse />
			<HintText />
			<HintExpander />
			<HintGuidance />
		</div>
	);
};

export default StoryOntarioHint;
