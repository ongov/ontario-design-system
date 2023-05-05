import React from 'react';
import { OntarioHintExpander } from '@ontario-digital-service/ontario-design-system-component-library-react';

import CodeHighlighter from '../../components/code-highlighter';

export default function HintExpander() {
	const hintExpanderCodeExample = `import { OntarioButton } from '@ontario-digital-service/ontario-design-system-component-library-react'; \n\n
<OntarioHintExpander
	hint="Example hint expander hint text"
	content="Example hint expander hint content"
	elementId="hint-expander-id"
/>`;
	return (
		<div className="ontario-row">
			<div className="ontario-columns ontario-large-12">
				<h2>Hint Expander</h2>
				<p>A hint expander is a block of hint text that can be shown or hidden using a toggle.</p>
				<p>
					Before deciding to use a hint expander, try to <strong>clarify the field label</strong> or{' '}
					<strong>simplify the hint text</strong> so that a hint expander isn’t needed.
				</p>
				<p>Use a hint expander when:</p>
				<ul>
					<li>
						the hint text is long and <strong>won’t be needed by the majority of users</strong>
					</li>
					<li>
						you want to give the user the option to see a <strong>helpful image</strong>, such as a picture of a
						driver’s licence showing where to find the licence number
						<ul>
							<li>remember, you will also need text that explains the image</li>
						</ul>
					</li>
				</ul>
				<p>Hint expanders are specific to hints within forms. On standard content pages, use an accordion instead.</p>

				<div className="ontario-margin-top-24-!">
					<h3>Example</h3>
					<OntarioHintExpander
						hint="Example hint expander hint text"
						content="Example hint expander hint content"
						elementId="hint-expander-id"
					/>

					<p>With the following markup:</p>
					<CodeHighlighter codeExample={hintExpanderCodeExample} />
				</div>
			</div>
		</div>
	);
}
