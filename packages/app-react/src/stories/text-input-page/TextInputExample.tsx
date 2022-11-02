import React from 'react';
import { OntarioInput } from '@ontario-digital-service/ontario-design-system-component-library-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function TextInputExample() {
	const codeExample = `import { OntarioInput } from '@ontario-digital-service/ontario-design-system-component-library-react'; \n\n<OntarioInput
	labelCaption="Text Input caption"
	labelFor="this is a label for"
	labelType="default"
	describedBy="described by"
	elementId="id"
	inputWidth="4-char-width"
	name="name"
	required
	type="text"
	value="value"
/>`;
	return (
		<>
			<div className="ontario-row">
				<div className="ontario-columns ontario-medium-12 ontario-large-12">
					<h3>Examples</h3>
					<div className="preview-container">
						<OntarioInput caption="Text Input caption" elementId="react-poc-input-id" inputWidth="4-char-width" name="react-poc-input" required type="text" />

						<p>With the following markup:</p>

						<SyntaxHighlighter language="javascript" style={vscDarkPlus}>
							{codeExample}
						</SyntaxHighlighter>
					</div>

					<p>Use a text input if:</p>
					<ul>
						<li>
							you want the user to enter <strong>no more than a single line</strong> of information
						</li>
						<li>
							you need <strong>unique information</strong> from the user such as their name or phone number
						</li>
						<li>
							it’s <strong>faster for the user</strong> to write out an answer rather than choose from a list
						</li>
					</ul>

					<p>Do not use a text input if:</p>
					<ul>
						<li>
							you want users to enter answers that are <strong>longer than one line</strong> (instead, consider a <a href="/ontario-text-area">text area</a>)
						</li>
						<li>
							you want users to choose from a <strong>set list of responses</strong> such as yes or no (instead, consider{' '}
							<a href="https://designsystem.ontario.ca/components/detail/radio-buttons.html">radio buttons</a>,{' '}
							<a href="https://designsystem.ontario.ca/components/detail/checkboxes.html">checkboxes</a> or{' '}
							<a href="https://designsystem.ontario.ca/components/detail/dropdown-lists.html">dropdown lists</a>)
						</li>
					</ul>
					<hr />
				</div>
			</div>
		</>
	);
}
