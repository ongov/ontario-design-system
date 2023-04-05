import React from 'react';

import { OntarioCheckboxes } from '@ontario-digital-service/ontario-design-system-component-library-react';

import CodeHighlighter from '../../components/code-highlighter';

export default function CheckboxExample() {
	const checkboxCodeExample = `import { OntarioCheckboxes } from '@ontario-digital-service/ontario-design-system-component-library-react'; \n\n
<OntarioCheckboxes 
	caption="Checkbox legend" 
	name="checkbox-example"
	required
	options={[
		{
			value: "checkbox-1",
			label: "Option 1"
		},
		{
			value: "checkbox-2",
			label: "Option 2",
		},
		{
			value: "checkbox-3",
			label: "Option 3",
		},
		{
			value: "checkbox-4",
			label: "Option 4"
		}
	]}
></OntarioCheckboxes>`;

	return (
		<div className="ontario-row">
			<div className="ontario-columns ontario-large-12">
				<h2>Example</h2>
				<div className="ontario-margin-top-24-!">
					<OntarioCheckboxes
						caption="Checkbox legend"
						name="checkbox-example"
						required
						options={[
							{
								value: 'checkbox-1',
								label: 'Option 1',
							},
							{
								value: 'checkbox-2',
								label: 'Option 2',
							},
							{
								value: 'checkbox-3',
								label: 'Option 3',
							},
							{
								value: 'checkbox-4',
								label: 'Option 4',
							},
						]}
					></OntarioCheckboxes>

					<p>With the following markup:</p>

					<CodeHighlighter codeExample={checkboxCodeExample} />
				</div>
				<hr />
			</div>
		</div>
	);
}
