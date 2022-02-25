import React from 'react';
import { OntarioHintExpander } from '@ontario-digital-service/ontario-design-system-component-library-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function HintExpander() {
	const hintExpanderCodeExample = `import { OntarioButton } from '@ontario-digital-service/ontario-design-system-component-library-react'; 
	\n\n<OntarioHintExpander
			hint="This is a hint with an expander"
			content="This is the expanded content"
			ariaLabel="this it the arialabel"
			elementId="this is the element id"
		/>`;
	return (
		<>
			<div className="ontario-row">
				<div className="ontario-columns ontario-medium-12 ontario-large-12">
					<h3>Hint Expander</h3>
					<p>
						A hint expander is a block of hint text that can be shown or hidden using a toggle. <br></br>Before deciding to use a hint expander, try to{' '}
						<strong>clarify the field label</strong>
						or <strong>simplify the hint text</strong> so that a hint expander isn’t needed.
						<br></br>Use a hint expander when:
						<ul>
							<li>
								<p>
									the hint text is long and <strong>won’t be needed by the majority of users</strong>
								</p>
							</li>
							<li>
								<p>
									you want to give the user the option to see a <strong>helpful image</strong>, such as a picture of a driver’s licence showing where to find the licence number
								</p>
							</li>
							<ul>
								<li>
									<p>remember, you will also need text that explains the image</p>
								</li>
							</ul>
						</ul>
						Hint expanders are specific to hints within forms. On standard content pages, use an accordion instead.
					</p>
					<div className="preview-container">
						<div className="example-container">
							<OntarioHintExpander
								hint="This is a hint with an expander"
								content="This is the expanded content"
								ariaLabel="this it the arialabel"
								elementId="this is the element id"
							/>
						</div>
						<p>With the following markup:</p>
						<SyntaxHighlighter language="javascript" style={vscDarkPlus}>
							{hintExpanderCodeExample}
						</SyntaxHighlighter>
					</div>
				</div>
			</div>
		</>
	);
}
