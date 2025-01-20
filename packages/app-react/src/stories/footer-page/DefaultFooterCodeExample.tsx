import React from 'react';
import { OntarioFooter } from '@ongov/ontario-design-system-component-library-react';

import CodeHighlighter from '../../components/code-highlighter';

export default function DefaultFooterCodeExample() {
	const defaultFooterExample = `import { OntarioFooter } from '@ongov/ontario-design-system-component-library-react'; \n\n<OntarioFooter
	type="default"
	footerLinks={{
		accessibilityLink: {
			text: 'Accessibility',
			href: 'https://www.ontario.ca/page/accessibility'
		},
		privacyLink: {
			text: 'Privacy',
			href: 'https://www.ontario.ca/page/privacy-statement'
		},
		contactLink: {
			text: 'Contact us',
			href: 'https://www.ontario.ca/feedback/contact-us'
		},
		termsOfUseLink: {
			text: 'Terms of use',
			href: 'https://www.ontario.ca/page/terms-use'
		},
		printerLink: {
			href: 'https://www.ontario.ca/page/copyright-information'
		}
	}}
></OntarioFooter>`;
	return (
		<div className="ontario-row">
			<div className="ontario-columns ontario-large-12">
				<h4>Example</h4>
				<div className="ontario-margin-top-24-!">
					<OntarioFooter
						type="default"
						footerLinks={{
							accessibilityLink: {
								text: 'Accessibility',
								href: 'https://www.ontario.ca/page/accessibility',
							},
							privacyLink: {
								text: 'Privacy',
								href: 'https://www.ontario.ca/page/privacy-statement',
							},
							contactLink: {
								text: 'Contact us',
								href: 'https://www.ontario.ca/feedback/contact-us',
							},
							printerLink: {
								href: 'https://www.ontario.ca/page/copyright-information',
							},
						}}
					></OntarioFooter>

					<p>With the following markup:</p>

					<CodeHighlighter codeExample={defaultFooterExample} />
				</div>
				<hr />
			</div>
		</div>
	);
}
