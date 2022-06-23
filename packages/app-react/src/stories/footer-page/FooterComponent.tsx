import React from 'react';
import '../stories.scss';
import FooterGuidance from './FooterGuidance';
import DefaultFooter from './DefaultFooter';
import ExpandedFooter from './ExpandedFooter';
import PartnershipFooter from './PartnershipFooter';
import DefaultFooterCodeExample from './DefaultFooterCodeExample';
import PartnershipFooterCodeExample from './PartnershipFooterCodeExample';
import ExpandedFooterCodeExample from './ExpandedFooterCodeExample';

const StoryOntarioFooter = () => {
	return (
		<div className="page-content">
			<FooterGuidance />
			<DefaultFooter />
			<DefaultFooterCodeExample />
			<PartnershipFooter />
			<PartnershipFooterCodeExample />
			<ExpandedFooter />
			<ExpandedFooterCodeExample />
		</div>
	);
};

export default StoryOntarioFooter;
