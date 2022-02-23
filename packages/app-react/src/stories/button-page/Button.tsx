import React, { useEffect, useRef } from 'react';
import './Button.scss';
import { OntarioButton } from '@ontario-digital-service/ontario-design-system-component-library-react';

const StoryOntarioButton = () => {
	const iframeref = useRef<HTMLIFrameElement>(null);
	useEffect(() => {
		if (iframeref.current) {
			const current = iframeref.current;
			const header = current.contentWindow?.document.getElementById('header');
			if (header) {
				header.style.display = 'none';
			}
			const footer = current.contentWindow?.document.getElementById('footer');
			if (footer) {
				footer.style.display = 'none';
			}
		}
	}, [iframeref]);

	return (
		<div className="button-page">
			<div className="ontario-row">
				<div className="ontario-columns ontario-medium-12 ontario-large-12">
					<h1 className="ontario-h1">Buttons</h1>
					<p className="ontario-lead-statement">Use buttons to help the user carry out an important action such as starting a transaction or agreeing to a purchase.</p>
				</div>
			</div>
			<div className="button-preview">
				<div className="ontario-row">
					<div className="ontario-columns ontario-medium-12 ontario-large-12">
						<div>
							<h5>Primary:</h5>
							<OntarioButton type="primary">Click Me!</OntarioButton>
							<h5>Secondary:</h5>
							<OntarioButton type="secondary">Click Me!</OntarioButton>
							<h5>Tertiary:</h5>
							<OntarioButton type="tertiary">Click Me!</OntarioButton>
						</div>
					</div>
				</div>
			</div>
			<div className="ontario-row">
				<div className="ontario-columns ontario-medium-12 ontario-large-12">
					<h2>When to use this component</h2>
					Use buttons when you want the user to do something (often called a “call to action”), for example: start an application process or a transaction agree to make a payment
					download a PDF Don’t use a button when you’re not encouraging an action. Buttons should not be used the same way as links, which usually send the user to another page or
					to a different part of the same page. Types of buttons Use a primary button to draw attention to the main action you want to help the user take. Avoid using multiple
					primary buttons on one page unless the page has equally important calls to action. Use a secondary button for a less important call to action on a page. Avoid using
					multiple secondary buttons so the user is not confused about what they should do next. Instead, ask the writer to simplify or break up the content so that it doesn’t need
					multiple secondary buttons. Use tertiary buttons for links that should function like a butto
				</div>
			</div>
		</div>
	);
};

export default StoryOntarioButton;
