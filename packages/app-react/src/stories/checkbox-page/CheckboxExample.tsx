import React, { useRef, useEffect } from 'react';

import { OntarioCheckboxes } from '@ongov/ontario-design-system-component-library-react';

import CodeHighlighter from '../../components/code-highlighter';

export default function CheckboxExample() {
	const checkboxCodeExample = `import { OntarioCheckboxes } from '@ongov/ontario-design-system-component-library-react'; \n\n
<OntarioCheckboxes 
	ref={componentRef}
	caption={{
		captionText: "Checkbox legend",
		captionType: "large"
	}}
	name="checkbox-example"
	required
	options={[
		{
			value: 'checkbox-option-1',
			label: 'Checkbox option 1 label',
			elementId: "checkbox-1"
		},
		{
			value: 'checkbox-option-2',
			label: 'Checkbox option 2 label',
			elementId: "checkbox-2",
			hintExpander: {
				hint: 'Hint expander for checkbox option 2',
				content: 'Example hint expander content for checkbox option 2.'
			},
		},
		{
			value: 'checkbox-option-3',
			label: 'Checkbox option 3 label',
			elementId: "checkbox-3"
		},
		{
			value: 'checkbox-option-4',
			label: 'Checkbox option 4 label',
			elementId: "checkbox-4"
		}
	]}
	hintText="Hint text for the checkbox group."
	hintExpander={{
		hint: "Hint expander for the checkbox group",
		content: "Example hint expander content for the checkbox group."
	}}
	customOnChange={(ev: any) => handleCheckboxOnChange(ev)}
></OntarioCheckboxes>`;

	const componentRef = useRef<any>(null);

	useEffect(() => {
		const component = componentRef.current;
		if (component) {
			component.addEventListener('checkboxOnChange', handleEvent);
		}

		return () => {
			if (component) {
				component.removeEventListener('checkboxOnChange', handleEvent);
			}
		};
	}, [componentRef]);

	const handleEvent = (e: any) => {
		// this should be updated to output the selected value
		console.log(e.detail);
	};

	const handleCheckboxOnChange = (ev: any) => {
		console.log(`${ev.target.value} was clicked`);
	};

	return (
		<div className="ontario-row">
			<div className="ontario-columns ontario-large-12">
				<h2>Example</h2>
				<div className="ontario-margin-top-24-!">
					<OntarioCheckboxes
						placeholder=""
						onPointerEnterCapture={() => {}}
						onPointerLeaveCapture={() => {}}
						ref={componentRef}
						caption={{
							captionText: 'Checkbox legend',
							captionType: 'large',
						}}
						name="checkbox-example"
						required
						options={[
							{
								value: 'checkbox-option-1',
								label: 'Checkbox option 1 label',
								elementId: 'checkbox-1',
							},
							{
								value: 'checkbox-option-2',
								label: 'Checkbox option 2 label',
								elementId: 'checkbox-2',
								hintExpander: {
									hint: 'Hint expander for checkbox option 2',
									content: 'Example hint expander content for checkbox option 2.',
								},
							},
							{
								value: 'checkbox-option-3',
								label: 'Checkbox option 3 label',
								elementId: 'checkbox-3',
							},
							{
								value: 'checkbox-option-4',
								label: 'Checkbox option 4 label',
								elementId: 'checkbox-4',
							},
						]}
						hintText="Hint text for the checkbox group."
						hintExpander={{
							hint: 'Hint expander for the checkbox group',
							content: 'Example hint expander content for the checkbox group.',
						}}
						customOnChange={(ev: any) => handleCheckboxOnChange(ev)}
					></OntarioCheckboxes>

					<p>With the following markup:</p>

					<CodeHighlighter codeExample={checkboxCodeExample} />
				</div>
				<hr />
			</div>
		</div>
	);
}
