import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { OntarioFooter } from '@ontario-digital-service/ontario-design-system-component-library-react';

export default function DefaultFooterCodeExample() {
	const defaultFooterExample = `import { OntarioFooter } from '@ontario-digital-service/ontario-design-system-component-library-react'; \n\n<OntarioFooter type="default" default-options='{
	"accessibilityLink":"https://www.ontario.ca/page/accessibility",
	"privacyLink": "https://www.ontario.ca/page/privacy-statement",
	"contactLink": "https://www.ontario.ca/feedback/contact-us",
	"printerLink": "https://www.ontario.ca/page/copyright-information"
}'></OntarioFooter>`;
	return (
		<>
			<div className="ontario-row">
				<div className="ontario-columns ontario-large-12">
					<h3>Example of default footer</h3>
					<div className="ontario-margin-top-24-!">
						<OntarioFooter
							type="default"
							default-options='{
              "accessibilityLink":"https://www.ontario.ca/page/accessibility",
              "privacyLink": "https://www.ontario.ca/page/privacy-statement",
              "contactLink": "https://www.ontario.ca/feedback/contact-us",
              "printerLink": "https://www.ontario.ca/page/copyright-information"

            }'
						></OntarioFooter>

						<p>With the following markup:</p>

						<SyntaxHighlighter language="javascript" style={vscDarkPlus}>
							{defaultFooterExample}
						</SyntaxHighlighter>
					</div>
				</div>
			</div>
		</>
	);
}
