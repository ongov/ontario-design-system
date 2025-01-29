import React, { useRef, useEffect } from 'react';
import { OntarioInput } from '@ongov/ontario-design-system-component-library-react';

import CodeHighlighter from '../../components/code-highlighter';

export default function TextInputExample() {
	const FourCharInputExample = `import { OntarioInput } from '@ongov/ontario-design-system-component-library-react'; \n\n<OntarioInput
	caption={{
		captionText: "4 character width",
		captionType: "default"
	}}
	elementId="4-char-input-id"
	inputWidth="4-char-width"
	name="4-char-input"
	required
	type="text"
	hintText="Example hint text for the 4 character width input"
/>`;

	const TwentyCharInputExample = `import { OntarioInput } from '@ongov/ontario-design-system-component-library-react'; \n\n<OntarioInput
	caption={{
		captionText: "20 character width",
		captionType: "default"
	}}
	elementId="20-char-input-id"
	inputWidth="20-char-width"
	name="20-char-input"
	required={false}	
	type="text"
	hintExpander={{
		content: "This is the example content for the 20 character width input",
		hint: "Example hint expander for the 20 character width input",
		elementId: "20-char-width-hint-expander"
	}}
	customOnBlur={(e: any) => inputOnBlur(e)}
/>`;

	const DefaultInputExample = `import { OntarioInput } from '@ongov/ontario-design-system-component-library-react'; \n\n<OntarioInput
	caption={{
		captionText: "Default width input",
		captionType: "large"
	}}
	elementId="default-input"
	name="default-input"	
	type="text"
	onFocus={defaultInputOnFocus}
/>`;

	const componentRef = useRef<any>(null);

	useEffect(() => {
		const component = componentRef.current;
		if (component) {
			component.addEventListener('focusEvent', defaultInputOnFocus);
		}

		return () => {
			if (component) {
				component.removeEventListener('focusEvent', defaultInputOnFocus);
			}
		};
	}, [componentRef]);

	const defaultInputOnFocus = () => {
		console.log('Default input has focus');
	};

	const inputOnBlur = (e: any) => {
		if (e.target.value) {
			console.log(`The input value is: ${e.target.value}`);
		}
	};

	return (
		<div className="ontario-row">
			<div className="ontario-columns ontario-large-12">
				<h3>Examples</h3>
				<div className="ontario-margin-top-24-!">
					<OntarioInput
						placeholder=""
						onPointerEnterCapture={() => {}}
						onPointerLeaveCapture={() => {}}
						caption={{
							captionText: '4 character width',
							captionType: 'default',
						}}
						elementId="4-char-input-id"
						inputWidth="4-char-width"
						name="4-char-input"
						required
						type="text"
						hintText="Example hint text for the 4 character width input"
					/>

					<p>With the following markup:</p>

					<CodeHighlighter codeExample={FourCharInputExample} />
				</div>

				<div className="ontario-margin-top-24-!">
					<OntarioInput
						placeholder=""
						onPointerEnterCapture={() => {}}
						onPointerLeaveCapture={() => {}}
						caption={{
							captionText: '20 character width',
							captionType: 'default',
						}}
						elementId="20-char-input-id"
						inputWidth="20-char-width"
						name="20-char-input"
						required={false}
						type="text"
						hintExpander={{
							content: 'This is the example content for the 20 character width input',
							hint: 'Example hint expander for the 20 character width input',
							elementId: '20-char-width-hint-expander',
						}}
						customOnBlur={(e: any) => inputOnBlur(e)}
					/>

					<p>With the following markup:</p>

					<CodeHighlighter codeExample={TwentyCharInputExample} />
				</div>

				<div className="ontario-margin-top-24-!">
					<OntarioInput
						placeholder=""
						onPointerEnterCapture={() => {}}
						onPointerLeaveCapture={() => {}}
						ref={componentRef}
						caption={{
							captionText: 'Default width input',
							captionType: 'large',
						}}
						elementId="default-input"
						name="default-input"
						type="text"
						onFocus={defaultInputOnFocus}
					/>

					<p>With the following markup:</p>

					<CodeHighlighter codeExample={DefaultInputExample} />
				</div>

				<hr />
			</div>
		</div>
	);
}
