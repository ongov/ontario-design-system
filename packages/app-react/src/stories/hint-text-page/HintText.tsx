import React from 'react';
import { OntarioHintText } from '@ontario-digital-service/ontario-design-system-component-library-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function HintText() {
	const hintTextCodeExample = `import { OntarioButton } from '@ontario-digital-service/ontario-design-system-component-library-react'; 
	\n\n<OntarioHintText hint="This is a hint" elementId="this is the element id" />`;
	return (
		<>
			<div className="ontario-row">
				<div className="ontario-columns ontario-medium-12 ontario-large-12">
					<h3>Hint Text</h3>
					<p>
						Use hint text when you need to:
						<ul>
							<li>
								<p>
									explain <strong>why you are asking</strong> a certain question
								</p>
							</li>
							<ul>
								<li>
									<p>example: “We will only email you if there’s a problem with your order”</p>
								</li>
							</ul>
							<li>
								<p>
									provide <strong>clarifying details</strong>
								</p>
							</li>
							<ul>
								<li>
									<p>example: “For example, A1A 1A1”</p>
								</li>
							</ul>
							<li>
								<p>
									tell the user <strong>where to find the information</strong> you’re asking for
								</p>
							</li>
							<ul>
								<li>
									<p>example: “Find taxes payable on line 435 of your notice of assessment”</p>
								</li>
							</ul>
						</ul>
					</p>
					<div className="preview-container">
						<div className="hint-expander-preview">
							<OntarioHintText hint="This is a hint" elementId="this is the element id" />
						</div>
						<p>With the following markup:</p>

						<SyntaxHighlighter language="javascript" style={vscDarkPlus}>
							{hintTextCodeExample}
						</SyntaxHighlighter>
					</div>
				</div>
			</div>
		</>
	);
}
