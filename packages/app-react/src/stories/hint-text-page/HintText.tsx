import React from 'react';
import { OntarioHintText } from '@ongov/ontario-design-system-component-library-react';

import CodeHighlighter from '../../components/code-highlighter';

export default function HintText() {
	const hintTextCodeExample = `import { OntarioButton } from '@ongov/ontario-design-system-component-library-react';
	\n\n<OntarioHintText hint="Example hint text" elementId="hint-id" />`;
	return (
		<div className="ontario-row">
			<div className="ontario-columns ontario-large-12">
				<h2>Hint Text</h2>
				<p>Use hint text when you need to:</p>
				<ul>
					<li>
						explain <strong>why you are asking</strong> a certain question
						<ul>
							<li>example: “We will only email you if there’s a problem with your order”</li>
						</ul>
					</li>
					<li>
						provide <strong>clarifying details</strong>
						<ul>
							<li>example: “For example, A1A 1A1”</li>
						</ul>
					</li>
					<li>
						tell the user <strong>where to find the information</strong> you’re asking for
						<ul>
							<li>example: “Find taxes payable on line 435 of your notice of assessment”</li>
						</ul>
					</li>
				</ul>

				<div className="ontario-margin-top-24-!">
					<h3>Example</h3>
					<OntarioHintText
						hint="Example hint text"
						elementId="hint-id"
						// The following 3 properties resolve a React warning about the use of the placeholder attribute on an input element
						placeholder=""
						onPointerEnterCapture={() => {}}
						onPointerLeaveCapture={() => {}}
					/>

					<p>With the following markup:</p>

					<CodeHighlighter codeExample={hintTextCodeExample} />
				</div>
				<hr />
			</div>
		</div>
	);
}
