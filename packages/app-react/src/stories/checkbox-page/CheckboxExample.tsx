import React, { useRef, useEffect } from 'react';

import { OntarioCheckboxes } from '@ontario-digital-service/ontario-design-system-component-library-react';

import CodeHighlighter from '../../components/code-highlighter';

export default function CheckboxExample() {
	const checkboxCodeExample = `import { OntarioCheckboxes } from '@ontario-digital-service/ontario-design-system-component-library-react'; \n\n
<OntarioCheckboxes 
	caption='{
		"captionText": "Checkbox legend",
		"captionType": "large"
	}'
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
			hintExpander: {
				content: "This is the example content for the Option 2 checkbox option.",
				hint: "Example hint expander for Option 2 checkbox option"
			}
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
	hint-text="Example hint text for the checkbox"
	hint-expander='{
		"content": "This is the example content for the checkbox group hint expander.",
		"hint": "Example hint expander for the checkbox group",
		"elementId": "checkbox-group-hint-expander"
	}'
></OntarioCheckboxes>`;

	const componentRef = useRef<any>(null);

	useEffect(() => {
		const component = componentRef.current;
		if (component) {
			component.addEventListener('changeEvent', handleEvent);
		}

		return () => {
			if (component) {
				component.removeEventListener('changeEvent', handleEvent);
			}
		};
	}, [componentRef]);

	const handleEvent = (e: any) => {
		// this should be updated to output the selected value
		console.log(e);
	};

	return (
		<div className="ontario-row">
			<div className="ontario-columns ontario-large-12">
				<h2>Example</h2>
				<div className="ontario-margin-top-24-!">
					<OntarioCheckboxes
						ref={componentRef}
						caption='{
							"captionText": "Checkbox legend",
							"captionType": "large"
						}'
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
								hintExpander: {
									content: 'This is the example content for the Option 2 checkbox option.',
									hint: 'Example hint expander for Option 2 checkbox option',
								},
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
						hint-text="Example hint text for the checkbox"
						hint-expander='{
							"content": "This is the example content for the checkbox group hint expander.",
							"hint": "Example hint expander for the checkbox group",
							"elementId": "checkbox-group-hint-expander"
						}'
					></OntarioCheckboxes>

					<p>With the following markup:</p>

					<CodeHighlighter codeExample={checkboxCodeExample} />
				</div>
				<hr />
			</div>
		</div>
	);
}
