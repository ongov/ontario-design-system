import React, { useRef, useEffect } from 'react';

import { OntarioCheckbox } from '@ongov/ontario-design-system-component-library-react';

import CodeHighlighter from '../../components/code-highlighter';

export default function StandaloneCheckboxExample() {
	const checkboxCodeExample = `import { OntarioCheckbox } from '@ongov/ontario-design-system-component-library-react'; \n\n
<OntarioCheckbox
	ref={componentRef}
	label="I agree to the terms and conditions"
	name="terms-and-conditions"
	value="agreed"
	required
	hintText="You must agree before you can continue."
	customOnChange={(ev: any) => handleCheckboxOnChange(ev)}
></OntarioCheckbox>`;

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
	}, []);

	const handleEvent = (ev: any) => {
		console.log(`checkboxOnChange`, ev.detail);
	};

	const handleCheckboxOnChange = (ev: any) => {
		console.log(`${ev.target.value} was clicked`);
	};

	return (
		<div className="ontario-row">
			<div className="ontario-columns ontario-large-12">
				<h2>Example</h2>
				<div className="ontario-margin-top-24-!">
					<OntarioCheckbox
						ref={componentRef}
						label="I agree to the terms and conditions"
						name="terms-and-conditions"
						value="agreed"
						required
						hintText="You must agree before you can continue."
						customOnChange={(ev: any) => handleCheckboxOnChange(ev)}
					></OntarioCheckbox>

					<p>With the following markup:</p>

					<CodeHighlighter codeExample={checkboxCodeExample} />
				</div>
				<hr />
			</div>
		</div>
	);
}
