import React, { useState } from 'react';
import './Button.scss';
import { OntarioButton } from '@ontario-digital-service/ontario-design-system-component-library-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const StoryOntarioButton = () => {
	// const iframeref = useRef<HTMLIFrameElement>(null);
	// useEffect(() => {
	// 	if (iframeref.current) {
	// 		const current = iframeref.current;
	// 		const header = current.contentWindow?.document.getElementById('header');
	// 		if (header) {
	// 			header.style.display = 'none';
	// 		}
	// 		const footer = current.contentWindow?.document.getElementById('footer');
	// 		if (footer) {
	// 			footer.style.display = 'none';
	// 		}
	// 	}
	// }, [iframeref]);

	const primaryButtonCodeExample = `import { OntarioButton } from '@ontario-digital-service/ontario-design-system-component-library-react'; \n\n<OntarioButton type="primary">Click Me!</OntarioButton>`;

	const secondaryButtonCodeExample = `import { OntarioButton } from '@ontario-digital-service/ontario-design-system-component-library-react'; \n\n<OntarioButton type="secondary">Click Me!</OntarioButton>`;

	const tertiaryButtonCodeExample = `import { OntarioButton } from '@ontario-digital-service/ontario-design-system-component-library-react'; \n\n<OntarioButton type="tertiary">Click Me!</OntarioButton>`;

	// const [toggleHTML, setToggleHTML] = useState(false);
	// const [toggleSCSS, setToggleSCSS] = useState(false);
	// const [toggleCSS, setToggleCSS] = useState(false);

	// const handleToggleHTML = () => {
	// 	setToggleHTML(prev => !prev);

	// 	setToggleSCSS(false);
	// 	setToggleCSS(false);
	// };

	// const handleToggleSCSS = () => {
	// 	setToggleSCSS(prev => !prev);

	// 	setToggleHTML(false);
	// 	setToggleCSS(false);
	// };

	// const handleToggleCSS = () => {
	// 	setToggleCSS(prev => !prev);

	// 	setToggleSCSS(false);
	// 	setToggleHTML(false);
	// };

	return (
		<div className="button-page">
			<div className="ontario-row">
				<div className="ontario-columns ontario-medium-12 ontario-large-12">
					<h1 className="ontario-h1">Buttons</h1>
					<p className="ontario-lead-statement">Use buttons to help the user carry out an important action such as starting a transaction or agreeing to a purchase.</p>
				</div>
			</div>

			<div className="ontario-row">
				<div className="ontario-columns ontario-medium-12 ontario-large-12">
					{/* <div className="button-preview">
						<h5>Primary:</h5>
						<OntarioButton type="primary">Click Me!</OntarioButton>
						<h5>Secondary:</h5>
						<OntarioButton type="secondary">Click Me!</OntarioButton>
						<h5>Tertiary:</h5>
						<OntarioButton type="tertiary">Click Me!</OntarioButton>
					</div> */}
					{/* <div className="previewNav">
							{toggleHTML ? (
								<button className="on" onClick={handleToggleHTML}>
									HTML
								</button>
							) : (
								<button className="off" onClick={handleToggleHTML}>
									HTML
								</button>
							)}
							{toggleSCSS ? (
								<button className="on" onClick={handleToggleSCSS}>
									SCSS
								</button>
							) : (
								<button className="off" onClick={handleToggleSCSS}>
									SCSS
								</button>
							)}
							{toggleCSS ? (
								<button className="on" onClick={handleToggleCSS}>
									CSS
								</button>
							) : (
								<button className="off" onClick={handleToggleCSS}>
									CSS
								</button>
							)}
						</div>

						<div className="previewCodeContent">
							{toggleHTML ? <p className="previewNavContent--HTML"> HTML ahdashjdasdjasd</p> : <></>}
							{toggleSCSS ? <p className="previewNavContent--SCSS">SCSS asdasdasdasda</p> : <></>}
							{toggleCSS ? <p className="previewNavContent--C-CSS">CSS sajdashdjkasdhjkas</p> : <></>}
						</div> */}
				</div>
			</div>

			<div className="ontario-row">
				<div className="ontario-columns ontario-medium-12 ontario-large-12">
					<h2>When to use this component</h2>
					<p>
						Use buttons when you want the user to <strong>do</strong> something (often called a “call to action”), for example:
					</p>

					<ul>
						<li>
							<p>start an application process or a transaction</p>
						</li>
						<li>
							<p>agree to make a payment</p>
						</li>
						<li>
							<p>download a PDF</p>
						</li>
					</ul>
					<p>
						Don’t use a button when you’re not encouraging an action. Buttons <strong>should not be used the same way as links</strong>, which usually send the user to another page
						or to a different part of the same page.
					</p>

					<hr />
					<h2>Types of buttons</h2>
					<p>
						Use a <strong>primary button</strong> to draw attention to the <strong>main action</strong> you want to help the user take. Avoid using multiple primary buttons on one
						page unless the page has equally important calls to action.
					</p>

					<div className="button-preview">
						<h5>Primary:</h5>
						<OntarioButton type="primary">Click Me!</OntarioButton>
					</div>

					<p>With the following markup:</p>

					<SyntaxHighlighter language="javascript" style={vscDarkPlus}>
						{primaryButtonCodeExample}
					</SyntaxHighlighter>

					<p>
						Use a <strong>secondary button</strong> for a <strong>less important</strong> call to action on a page. Avoid using multiple secondary buttons so the user is not
						confused about what they should do next. Instead, ask the writer to simplify or break up the content so that it doesn’t need multiple secondary buttons.
					</p>
					<div className="button-preview">
						<h5>Secondary:</h5>
						<OntarioButton type="secondary">Click Me!</OntarioButton>
					</div>

					<p>With the following markup:</p>

					<SyntaxHighlighter language="javascript" style={vscDarkPlus}>
						{secondaryButtonCodeExample}
					</SyntaxHighlighter>

					<p>
						Use <strong>tertiary buttons</strong> for links that should function like a button, such as “edit” or “cancel” in applications. It’s okay to use more than one tertiary
						button on a page.
					</p>
					<div className="button-preview">
						<h5>Tertiary:</h5>
						<OntarioButton type="tertiary">Click Me!</OntarioButton>
					</div>

					<p>With the following markup:</p>

					<SyntaxHighlighter language="javascript" style={vscDarkPlus}>
						{tertiaryButtonCodeExample}
					</SyntaxHighlighter>

					<h3>Disabled buttons</h3>
					<p>
						Disabling buttons until users have correctly completed a form can cause usability and accessibility problems. Disabled buttons can create barriers for assistive
						technology users and users with physical or cognitive impairments, and they can be confusing and frustrating for all users because they do not help the user understand
						what they need to do to proceed.
					</p>
					<p>
						A better approach is to <strong></strong>keep buttons enabled and instead <strong></strong>develop error handling to provide clear feedback about any missed fields or
						input errors when the user tries to submit the form. For guidance on error messaging, see Page alerts.
					</p>
				</div>
			</div>
		</div>
	);
};

export default StoryOntarioButton;
