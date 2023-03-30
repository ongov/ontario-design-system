import React from 'react';
import { OntarioButton } from '@ontario-digital-service/ontario-design-system-component-library-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function ButtonExample() {
	const primaryButtonCodeExample = `import { OntarioButton } from '@ontario-digital-service/ontario-design-system-component-library-react'; \n\n<OntarioButton type="primary">Click Me!</OntarioButton>`;
	const secondaryButtonCodeExample = `import { OntarioButton } from '@ontario-digital-service/ontario-design-system-component-library-react'; \n\n<OntarioButton type="secondary">Click Me!</OntarioButton>`;
	const tertiaryButtonCodeExample = `import { OntarioButton } from '@ontario-digital-service/ontario-design-system-component-library-react'; \n\n<OntarioButton type="tertiary">Click Me!</OntarioButton>`;
	return (
		<div className="ontario-row">
			<div className="ontario-columns ontario-medium-12 ontario-large-12">
				<h3>Types of buttons</h3>
				<p>
					Use a <strong>primary button</strong> to draw attention to the <strong>main action</strong> you want to help
					the user take. Avoid using multiple primary buttons on one page unless the page has equally important calls to
					action.
				</p>
				<div>
					<h4>Primary:</h4>
					<OntarioButton type="primary">Click Me!</OntarioButton>

					<p>With the following markup:</p>

					<SyntaxHighlighter language="javascript" style={vscDarkPlus}>
						{primaryButtonCodeExample}
					</SyntaxHighlighter>
				</div>

				<p>
					Use a <strong>secondary button</strong> for a <strong>less important</strong> call to action on a page. Avoid
					using multiple secondary buttons so the user is not confused about what they should do next. Instead, ask the
					writer to simplify or break up the content so that it doesn’t need multiple secondary buttons.
				</p>

				<div>
					<h4>Secondary:</h4>
					<OntarioButton type="secondary">Click Me!</OntarioButton>

					<p>With the following markup:</p>

					<SyntaxHighlighter language="javascript" style={vscDarkPlus}>
						{secondaryButtonCodeExample}
					</SyntaxHighlighter>
				</div>

				<p>
					Use <strong>tertiary buttons</strong> for links that should function like a button, such as “edit” or “cancel”
					in applications. It’s okay to use more than one tertiary button on a page.
				</p>

				<div>
					<h4>Tertiary:</h4>
					<OntarioButton type="tertiary">Click Me!</OntarioButton>

					<p>With the following markup:</p>

					<SyntaxHighlighter language="javascript" style={vscDarkPlus}>
						{tertiaryButtonCodeExample}
					</SyntaxHighlighter>
				</div>
			</div>
		</div>
	);
}
