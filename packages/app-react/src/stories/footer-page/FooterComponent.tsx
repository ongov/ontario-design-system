import React from 'react';

import FooterGuidance from './FooterGuidance';
import DefaultFooter from './DefaultFooter';
import ExpandedFooter from './ExpandedFooter';
import DefaultFooterCodeExample from './DefaultFooterCodeExample';
import ExpandedFooterCodeExample from './ExpandedFooterCodeExample';

const StoryOntarioFooter = () => {
	return (
		<>
			<FooterGuidance />
			<DefaultFooter />
			<DefaultFooterCodeExample />
			<ExpandedFooter />
			<ExpandedFooterCodeExample />
		</>
	);
};

export default StoryOntarioFooter;
