import React from 'react';
import './text-input.scss';
import { OntarioInput } from '@ontario-digital-service/ontario-design-system-component-library-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const StoryOntarioInput = () => {
	const codeExample = `import { OntarioInput } from '@ontario-digital-service/ontario-design-system-component-library-react'; \n\n<OntarioInput
	labelCaption="this is a label caption"
	labelFor="this is a lable for"
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
		<div className="page-content">
			<div className="ontario-row">
				<div className="ontario-columns ontario-medium-12 ontario-large-12">
					<h1 className="ontario-h1">Text inputs</h1>
					<p className="ontario-lead-statement">Use a text input when you want the user to enter no more than a single line of information.</p>
				</div>
			</div>

			<div className="ontario-row">
				<div className="ontario-columns ontario-medium-12 ontario-large-12">
					<h2>When to use this component</h2>
					<p>
						A text input is a <strong>single-line field</strong> where the user can type in information. For example:
					</p>

					<div className="preview-container">
						<div className="example-container">
							<OntarioInput
								labelCaption="this is a label caption"
								labelFor="this is a lable for"
								labelType="default"
								describedBy="described by"
								elementId="id"
								inputWidth="4-char-width"
								name="name"
								required
								type="text"
								value="value"
							/>
						</div>

						<p>With the following markup:</p>

						<SyntaxHighlighter language="javascript" style={vscDarkPlus}>
							{codeExample}
						</SyntaxHighlighter>
					</div>

					<p>Use a text input if:</p>
					<ul>
						<li>
							<p>
								you want the user to enter <strong>no more than a single line</strong> of information
							</p>
						</li>
						<li>
							<p>
								you need <strong>unique information</strong> from the user such as their name or phone number
							</p>
						</li>
						<li>
							<p>
								it’s <strong>faster for the user</strong> to write out an answer rather than choose from a list
							</p>
						</li>
					</ul>

					<p>Do not use a text input if:</p>
					<ul>
						<li>
							<p>
								you want users to enter answers that are <strong>longer than one line</strong> (instead, consider a <a href="/ontario-text-area">text area</a>)
							</p>
						</li>
						<li>
							<p>
								you want users to choose from a <strong>set list of responses</strong> such as yes or no (instead, consider{' '}
								<a href="https://designsystem.ontario.ca/components/detail/radio-buttons.html">radio buttons</a>,{' '}
								<a href="https://designsystem.ontario.ca/components/detail/checkboxes.html">checkboxes</a> or{' '}
								<a href="https://designsystem.ontario.ca/components/detail/dropdown-lists.html">dropdown lists</a>)
							</p>
						</li>
					</ul>
				</div>

				<hr />

				<h2>Use appropriately sized text inputs</h2>

				<p>All text inputs have a height of 48px.</p>

				<p>
					Providing clear <a href="https://designsystem.ontario.ca/components/detail/labels.html">labels</a>, <a href="/ontario-hint-text">hint text</a> and specifying the width of
					the fields <strong>gives the user an indication on how to correctly fill out the input field</strong>. Choose the width of your text input field based on the type of
					information you’re asking for, but never limit the number of characters a user can input.
				</p>

				<h3>Known input length</h3>

				<p>
					Use <strong>fixed-width inputs</strong> for content that has a specific, known length, such as a postal code. Add room for 1 or 2 extra character spaces if users are
					likely to add spaces or dashes. Our standard fixed input widths are:
				</p>

				<ul>
					<li>2 characters (use for: date, month)</li>
					<li>
						3 characters (use for: area code, <abbr title="card verification code">CVC</abbr> on a credit card, age)
					</li>
					<li>4 characters (use for: year)</li>
					<li>7 characters (use for: postal code [includes extra character])</li>
					<li>8 characters (use for: licence plate)</li>
					<li>
						11 characters (use for: <abbr title="Social Insurance Number">SIN</abbr> [includes extra character])
					</li>
				</ul>

				<h3>Unknown input length</h3>

				<p>
					If you don’t know how many characters the user will need to input (for example, if you’re asking them for their name), make your text input{' '}
					<strong>100% of the container</strong>.
				</p>
			</div>
		</div>
	);
};

export default StoryOntarioInput;
