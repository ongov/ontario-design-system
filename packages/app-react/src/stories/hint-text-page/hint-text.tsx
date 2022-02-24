import React from 'react';
import './hint-text.scss';
import { OntarioHintExpander, OntarioHintText } from '@ontario-digital-service/ontario-design-system-component-library-react';

const StoryOntarioHintExpander = () => (
	<div className="hint-expander-page">
		<div className="ontario-row">
			<div className="ontario-columns ontario-medium-12 ontario-large-12">
				<h1 className="ontario-h1">Hint Expander</h1>
				<p className="ontario-lead-statement">Use clear and concise hint text to guide users as they fill out forms.</p>
			</div>
		</div>
		<div className="ontario-row">
			<div className="ontario-columns ontario-medium-12 ontario-large-12">
				<div className="preview-container">
					<div className="hint-expander-preview">
						<OntarioHintText hint="This is a hint" elementId="this is the element id" />
						<OntarioHintExpander
							hint="This is a hint with an expander"
							content="This is the expanded content"
							ariaLabel="this it the arialabel"
							elementId="this is the element id"
						/>
					</div>
				</div>
			</div>
		</div>
		<div className="ontario-row">
			<div className="ontario-columns ontario-medium-12 ontario-large-12">
				<h2>When to use this component</h2>
				<p>
					Use hint text to help users understand how to complete fields in a form. When adding hint text, the first choice should always be to display hint text without using a
					hint expander. Only use the hint expander option for less important or more complex information.
					<ul>
						<li>
							If the information is <b>very important</b> and most or all users will need it, make it part of the form field label.{' '}
						</li>
						<li>
							If the information is <b>fairly important</b> and many users will need it, provide hint text that is visible by default.
						</li>
						<li>
							If the information is <b>less important</b> and only a minority of users will need it, put it in a hint expander.
						</li>
					</ul>
				</p>
			</div>
		</div>

		<div className="ontario-row">
			<div className="ontario-columns ontario-medium-12 ontario-large-12">
				<h3>Hint Text</h3>
				<p>
					Use hint text when you need to:
					<ul>
						<li>
							explain <b>why you are asking</b> a certain question
						</li>
						<ul>
							<li>example: “We will only email you if there’s a problem with your order”</li>
						</ul>
						<li>
							provide <b>clarifying details</b>
						</li>
						<ul>
							<li>example: “For example, A1A 1A1”</li>
						</ul>
						<li>
							tell the user <b>where to find the information</b> you’re asking for
						</li>
						<ul>
							<li>example: “Find taxes payable on line 435 of your notice of assessment”</li>
						</ul>
					</ul>
				</p>
			</div>
		</div>

		<div className="ontario-row">
			<div className="ontario-columns ontario-medium-12 ontario-large-12">
				<h3>Hint Expander</h3>
				<p>
					A hint expander is a block of hint text that can be shown or hidden using a toggle. <br></br>Before deciding to use a hint expander, try to <b>clarify the field label</b>
					or <b>simplify the hint text</b> so that a hint expander isn’t needed.
					<br></br>Use a hint expander when:
					<ul>
						<li>
							the hint text is long and <b>won’t be needed by the majority of users</b>
						</li>
						<li>
							you want to give the user the option to see a <b>helpful image</b>, such as a picture of a driver’s licence showing where to find the licence number
						</li>
						<ul>
							<li>remember, you will also need text that explains the image</li>
						</ul>
					</ul>
					Hint expanders are specific to hints within forms. On standard content pages, use an accordion instead.
				</p>
			</div>
		</div>

		<div className="ontario-row">
			<div className="ontario-columns ontario-medium-12 ontario-large-12">
				<h3>Write clear link text</h3>
				<p>
					When writing link text for the hint expander toggle:
					<ul>
						<li>use short and descriptive language</li>
						<li>
							help users understand what they will see <b>before they click</b>
						</li>
						<ul>
							<li>for example, if the hint expander is an image of a circled permit number, the hint expander link text could say “Where is my permit number?”</li>
						</ul>
					</ul>
				</p>
			</div>
		</div>
	</div>
);

export default StoryOntarioHintExpander;
