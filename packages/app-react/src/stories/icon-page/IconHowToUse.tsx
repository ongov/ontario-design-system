import React from 'react';
import { OntarioIconAccessibility, OntarioIconAccount } from '@ontario-digital-service/ontario-design-system-component-library-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function IconExample() {
	const primaryIconCodeExample = `import { OntarioIconAccessibility } from '@ontario-digital-service/ontario-design-system-component-library-react'; \n\n<OntarioIconAccessibility icon-width="36" colour="grey"></OntarioIconAccessibility>`;
	const secondaryIconCodeExample = `import { OntarioIconAccount } from '@ontario-digital-service/ontario-design-system-component-library-react'; \n\n<ontario-icon-account icon-width="36" colour="grey"></ontario-icon-account>`;
	return (
		<div className="ontario-row">
			<div className="ontario-columns ontario-medium-12 ontario-large-12">
				<h3>How to use the icons</h3>
				<div className="preview-container">
					<h4>Primary Icon:</h4>
					<OntarioIconAccessibility icon-width="36" colour="grey"></OntarioIconAccessibility>

					<p>With the following markup:</p>

					<SyntaxHighlighter language="javascript" style={vscDarkPlus}>
						{primaryIconCodeExample}
					</SyntaxHighlighter>
				</div>

				<div className="preview-container">
					<h4>Secondary Icon:</h4>
					<OntarioIconAccount icon-width="36" colour="grey"></OntarioIconAccount>

					<p>With the following markup:</p>

					<SyntaxHighlighter language="javascript" style={vscDarkPlus}>
						{secondaryIconCodeExample}
					</SyntaxHighlighter>
				</div>
			</div>
		</div>
	);
}