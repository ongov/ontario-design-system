import React from 'react';
import '../stories.scss';
import FooterGuidance from './FooterGuidance';
import DefaultFooter from './DefaultFooter';
import ExpandedFooter from './ExpandedFooter';
import DefaultFooterCodeExample from './DefaultFooterCodeExample';
import ExpandedFooterCodeExample from './ExpandedFooterCodeExample';

const StoryOntarioFooter = () => {
	return (
		<div className="page-content">
			<FooterGuidance />
			<DefaultFooter />
			<DefaultFooterCodeExample />
			<ExpandedFooter />
			<ExpandedFooterCodeExample />
		</div>
	);
};

export default StoryOntarioFooter;
