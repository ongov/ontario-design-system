import React, { useRef, useEffect } from 'react';

import { OntarioTextarea } from '@ontario-digital-service/ontario-design-system-component-library-react';

import CodeHighlighter from '../../components/code-highlighter';

export default function TextAreaExample() {
	const codeExample = `import { OntarioTextarea } from '@ontario-digital-service/ontario-design-system-component-library-react'; \n\n<OntarioTextarea
	caption={{
		captionText: "Label",
		captionType: "default"
	}}
	elementId="textarea"
	name="textarea"
	required
	hintText="Example hint text for the textarea"
	describedBy="textarea-hint-text"
	hintExpander={
		content: "This is the example content for the textarea hint expander",
		hint: "Example hint expander for the textarea",
		elementId: "textarea-hint-expander"
	}}
	onBlur={textareaOnBlur}
	onChange={textareaOnChange}
/>`;

	const componentRef = useRef<any>(null);

	useEffect(() => {
		const component = componentRef.current;
		if (component) {
			component.addEventListener('changeEvent', textareaOnChange);
		}

		return () => {
			if (component) {
				component.removeEventListener('changeEvent', textareaOnChange);
			}
		};
	}, [componentRef]);

	const textareaOnBlur = () => {
		console.log('Textarea is losing focus');
	};

	const textareaOnChange = (e: any) => {
		console.log(e.target.value);
	};

	return (
		<>
			<div className="ontario-row">
				<div className="ontario-columns ontario-large-12">
					<h2>Example</h2>
					<p>Examples of where to use text areas include:</p>
					<ul>
						<li>comments and user feedback</li>
						<li>"tell us about yourself" sections</li>
						<li>requests for more detail</li>
					</ul>
					<div className="ontario-margin-top-24-!">
						<OntarioTextarea
							ref={componentRef}
							caption={{
								captionText: 'Label',
								captionType: 'default',
							}}
							elementId="textarea"
							name="textarea"
							required
							hintText="Example hint text for the textarea"
							describedBy="textarea-hint-text"
							hintExpander={{
								content: 'This is the example content for the textarea hint expander',
								hint: 'Example hint expander for the textarea',
								elementId: 'textarea-hint-expander',
							}}
							onBlur={textareaOnBlur}
						/>

						<p>With the following markup:</p>

						<CodeHighlighter codeExample={codeExample} />
					</div>
				</div>
			</div>
		</>
	);
}
