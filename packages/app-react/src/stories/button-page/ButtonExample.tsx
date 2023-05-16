import React from 'react';

import { OntarioButton } from '@ontario-digital-service/ontario-design-system-component-library-react';

import CodeHighlighter from '../../components/code-highlighter';

export default function ButtonExample() {
	const primaryButtonCodeExample = `import { OntarioButton } from '@ontario-digital-service/ontario-design-system-component-library-react'; \n\n<OntarioButton type="primary" label="Primary button" ariaLabelText="This is a clickable primary button"></OntarioButton>`;
	const secondaryButtonCodeExample = `import { OntarioButton } from '@ontario-digital-service/ontario-design-system-component-library-react'; \n\n<OntarioButton type="secondary" elementId="secondary-button">Secondary button</OntarioButton>`;
	const tertiaryButtonCodeExample = `import { OntarioButton } from '@ontario-digital-service/ontario-design-system-component-library-react'; \n\n<OntarioButton type="tertiary" label="Tertiary button" onClick={onButtonClick}></OntarioButton>`;

	const onButtonClick = () => {
		alert('Tertiary button clicked!');
	};

	return (
		<div className="ontario-row">
			<div className="ontario-columns ontario-large-12">
				<h2>Types of buttons</h2>
				<p>
					Use a <strong>primary button</strong> to draw attention to the <strong>main action</strong> you want to help
					the user take. Avoid using multiple primary buttons on one page unless the page has equally important calls to
					action.
				</p>

				<div className="ontario-margin-top-24-!">
					<h3 className="ontario-h4">Primary</h3>
					<OntarioButton
						type="primary"
						label="Primary button"
						ariaLabelText="This is a clickable primary button"
					></OntarioButton>

					<p>With the following markup:</p>

					<CodeHighlighter codeExample={primaryButtonCodeExample} />
				</div>

				<p>
					Use a <strong>secondary button</strong> for a <strong>less important</strong> call to action on a page. Avoid
					using multiple secondary buttons so the user is not confused about what they should do next. Instead, ask the
					writer to simplify or break up the content so that it doesn’t need multiple secondary buttons.
				</p>

				<div className="ontario-margin-top-24-!">
					<h3 className="ontario-h4">Secondary</h3>
					<OntarioButton type="secondary" elementId="secondary-button">
						Secondary button
					</OntarioButton>

					<p>With the following markup:</p>

					<CodeHighlighter codeExample={secondaryButtonCodeExample} />
				</div>

				<p>
					Use <strong>tertiary buttons</strong> for links that should function like a button, such as “edit” or “cancel”
					in applications. It’s okay to use more than one tertiary button on a page.
				</p>

				<div className="ontario-margin-top-24-!">
					<h3 className="ontario-h4">Tertiary</h3>
					<OntarioButton type="tertiary" label="Tertiary button" onClick={onButtonClick}></OntarioButton>

					<p>With the following markup:</p>

					<CodeHighlighter codeExample={tertiaryButtonCodeExample} />
				</div>
			</div>
		</div>
	);
}
