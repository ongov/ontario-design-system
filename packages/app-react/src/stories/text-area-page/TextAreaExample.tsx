import React from 'react';

import { OntarioTextarea } from '@ontario-digital-service/ontario-design-system-component-library-react';

import CodeHighlighter from '../../components/code-highlighter';

export default function TextAreaExample() {
	const codeExample = `import { OntarioTextarea } from '@ontario-digital-service/ontario-design-system-component-library-react'; \n\n
<OntarioTextarea
	caption="Label"
	elementId="textarea"
	name="textarea"
	required
/>`;

	return (
		<>
			<div className="ontario-row">
				<div className="ontario-columns ontario-large-12">
					<h2>Example</h2>
					<p>Examples of where to use text areas include:</p>
					<ul>
						<li>comments and user feedback</li>
						<li>"tell us about yourself" sections</li>
						<li>requests for more detail</li>
					</ul>
					<div className="ontario-margin-top-24-!">
						<OntarioTextarea caption="Label" elementId="textarea" name="textarea" required />

						<p>With the following markup:</p>

						<CodeHighlighter codeExample={codeExample} />
					</div>
				</div>
			</div>
		</>
	);
}
