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
				<h2>When to use this component</h2>
				<p>
					Use hint text to help users understand how to complete fields in a form. When adding hint text, the first choice should always be to display hint text without using a
					hint expander. Only use the hint expander option for less important or more complex information.
				</p>

				<ul>
					<li>
						<p>
							If the information is <strong>very important</strong> and most or all users will need it, make it part of the form field label.
						</p>
					</li>
					<li>
						<p>
							If the information is <strong>fairly important</strong> and many users will need it, provide hint text that is visible by default.
						</p>
					</li>
					<li>
						<p>
							If the information is <strong>less important</strong> and only a minority of users will need it, put it in a hint expander.
						</p>
					</li>
				</ul>
				<hr />
			</div>
		</div>

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
			</div>
		</div>

		<div className="ontario-row">
			<div className="ontario-columns ontario-medium-12 ontario-large-12">
				<div className="preview-container">
					<div className="hint-expander-preview">
						<OntarioHintText hint="This is a hint" elementId="this is the element id" />
					</div>
				</div>
			</div>
		</div>

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
			</div>
		</div>

		<div className="ontario-row">
			<div className="ontario-columns ontario-medium-12 ontario-large-12">
				<div className="preview-container">
					<div className="hint-expander-preview">
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
				<h3>Write clear link text</h3>
				<p>
					When writing link text for the hint expander toggle:
					<ul>
						<li>
							<p>use short and descriptive language</p>
						</li>
						<li>
							<p>
								help users understand what they will see <strong>before they click</strong>
							</p>
						</li>
						<ul>
							<li>
								<p>for example, if the hint expander is an image of a circled permit number, the hint expander link text could say “Where is my permit number?”</p>
							</li>
						</ul>
					</ul>
				</p>
			</div>
		</div>
	</div>
);

export default StoryOntarioHintExpander;
