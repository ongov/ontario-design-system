import React, { useRef, useEffect } from 'react';

import { OntarioRadioButtons } from '@ongov/ontario-design-system-component-library-react';

import CodeHighlighter from '../../components/code-highlighter';

export default function RadioButtonExample() {
	const radioButtonsCodeExample = `import { OntarioRadioButtons } from '@ongov/ontario-design-system-component-library-react'; \n
<OntarioRadioButtons 
	ref={componentRef}
	caption="Radio legend"
	name="radio-example"
	required={false}
	hintText="Hint text for the radio button group."
	options={[
		{
			value: "radio-option-1",
			elementId: "radio-1",
			label: "Radio option 1 label",
			hintExpander: {
				hint: "Hint expander for radio option 1"
				content: "Example hint expander content for radio option 1.",
			}
		},
		{
			value: "radio-option-2",
			elementId: "radio-2",
			label: "Radio option 2 label"
		},
		{
			value: "radio-option-3",
			elementId: "radio-3",
			label: "Radio option 3 label"
		},
	]}
	hintExpander={{
		hint: "Hint expander for the radio button group",
		content: "Example hint expander content for the radio button group.",
	}}
	customOnChange={(ev: any) => handleRadioOnChange(ev)}
>
</OntarioRadioButtons>`;

	const componentRef = useRef<any>(null);

	useEffect(() => {
		const component = componentRef.current;
		if (component) {
			component.addEventListener('radioOnChange', handleEvent);
		}

		return () => {
			if (component) {
				component.removeEventListener('radioOnChange', handleEvent);
			}
		};
	}, [componentRef]);

	const handleEvent = (e: any) => {
		// this should be updated to output the selected value
		console.log(e.detail);
	};

	const handleRadioOnChange = (ev: any) => {
		console.log(`${ev.target.value} was clicked`);
	};

	return (
		<div className="ontario-row">
			<div className="ontario-columns ontario-large-12">
				<h2>Example</h2>
				<OntarioRadioButtons
					placeholder=""
					onPointerEnterCapture={() => {}}
					onPointerLeaveCapture={() => {}}
					ref={componentRef}
					caption="Radio legend"
					name="radio-example"
					required={false}
					hintText="Hint text for the radio button group."
					options={[
						{
							value: 'radio-option-1',
							elementId: 'radio-1',
							label: 'Radio option 1 label',
							hintExpander: {
								hint: 'Hint expander for radio option 1',
								content: 'Example hint expander content for radio option 1.',
							},
						},
						{
							value: 'radio-option-2',
							elementId: 'radio-2',
							label: 'Radio option 2 label',
						},
						{
							value: 'radio-option-3',
							elementId: 'radio-3',
							label: 'Radio option 3 label',
						},
					]}
					hintExpander={{
						hint: 'Hint expander for the radio button group',
						content: 'Example hint expander content for the radio button group.',
					}}
					customOnChange={(ev: any) => handleRadioOnChange(ev)}
				></OntarioRadioButtons>

				<p>With the following markup:</p>

				<CodeHighlighter codeExample={radioButtonsCodeExample} />

				<hr />
			</div>
		</div>
	);
}
