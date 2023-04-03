import React from 'react';
import { OntarioCheckboxes } from '@ontario-digital-service/ontario-design-system-component-library-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function CheckboxExample() {
	const checkboxCodeExample = `import { OntarioCheckboxes } from '@ontario-digital-service/ontario-design-system-component-library-react'; \n
<OntarioCheckboxes 
	caption="Do you have children?" 
	hint-text="This is the hint text" 
	name="checkbox-options"
	required
	options={[
		{
			value: "checkbox-1",
			label: "checkbox-1-label"
		},
		{
			value: "checkbox-2",
			label: "checkbox-2-label",
			hintExpander: {
				hint: "Hint expander",
				content: "This is the content, yup this is the content",
			}
		},
		{
			value: "checkbox-3",
			label: "checkbox-3-label",
			hintExpander: {
				hint: "Hint expander",
				content: "This is the content",
			}
		},
		{
			value: "checkbox-4",
			label: "checkbox-4-label"
		}
	]}
	hint-expander='{
		"hint": "Hint expander",
		"content": "This is the content, yup this is the content",
	}'
>
</OntarioCheckboxes>`;

	return (
		<div className="ontario-row">
			<div className="ontario-columns ontario-large-12">
				<h3>Checkbox Example</h3>
				<div className="ontario-margin-top-24-!">
					<OntarioCheckboxes
						caption="Do you have children?"
						hint-text="This is the hint text"
						name="checkbox-example"
						required
						options={[
							{
								value: 'checkbox-1',
								label: 'checkbox-1-label',
							},
							{
								value: 'checkbox-2',
								label: 'checkbox-2-label',
								hintExpander: {
									hint: 'Hint expander',
									content: 'This is the content, yup this is the content',
								},
							},
							{
								value: 'checkbox-3',
								label: 'checkbox-3-label',
								hintExpander: {
									hint: 'Hint expander',
									content: 'This is the content',
								},
							},
							{
								value: 'checkbox-4',
								label: 'checkbox-4-label',
							},
						]}
						hint-expander='{
							hint: "Hint expander",
							content: "This is the content, yup this is the content"
						}'
					></OntarioCheckboxes>

					<p>With the following markup:</p>

					<SyntaxHighlighter language="javascript" style={vscDarkPlus}>
						{checkboxCodeExample}
					</SyntaxHighlighter>
				</div>
			</div>
		</div>
	);
}
