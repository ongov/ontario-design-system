import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { OntarioTextarea } from '@ontario-digital-service/ontario-design-system-component-library-react';

export default function TextAreaExample() {
	const codeExample = `import { OntarioTextarea } from '@ontario-digital-service/ontario-design-system-component-library-react'; \n\n<OntarioTextarea
	caption="Text area caption"
	describedBy="described by"
	elementId="id"
	name="name"
	required
	value="value"
/>`;
	return (
		<>
			<div className="ontario-row">
				<div className="ontario-columns ontario-large-12">
					<h3>Examples</h3>
					<p>Examples of where to use text areas include:</p>
					<ul>
						<li>comments and user feedback</li>
						<li>"tell us about yourself" sections</li>
						<li>requests for more detail</li>
					</ul>
					<div className="ontario-margin-top-24-!">
						<OntarioTextarea
							caption="Text area caption"
							describedBy="described by"
							elementId="id"
							name="name"
							required
							value="this is the content"
						/>

						<p>With the following markup:</p>

						<SyntaxHighlighter language="javascript" style={vscDarkPlus}>
							{codeExample}
						</SyntaxHighlighter>
					</div>
				</div>
			</div>
		</>
	);
}
