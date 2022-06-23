import React from 'react';
import { OntarioRadioButtons } from '@ontario-digital-service/ontario-design-system-component-library-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function RadioButtonExample() {
	const radioButtonsCodeExample = `import { OntarioRadioButtons } from '@ontario-digital-service/ontario-design-system-component-library-react'; \n\n<OntarioRadioButtons legend="Do you have cats?" hint-text="This is the hint text" is-required options='[{
	"name": "radio",
	"value": "radio",
	"elementId": "radio-1",
	"label": "radio-1-label"
	},
	{
		"name": "radio",
		"value": "radio-2",
		"elementId": "radio-2",
		"label": "radio-2-label",
		"hintExpander": {
			"hint": "Hint expander",
			"content": "This is the content, yup this is the content",
			"aria-label": "This indicates that the hint can be expanded"
		}
	},
	{
		"name": "radio",
		"value": "radio-3",
		"elementId": "radio-3",
		"label": "radio-3-label",
		"hintExpander": {
			"hint": "Hint expander",
			"content": "This is the content",
			"aria-label": "This indicates that the hint can be expanded"
		}
	},
	{
		"name": "radio",
		"value": "radio-4",
		"elementId": "radio-4",
		"label": "radio-4-label"
	}
	]' hint-expander='{
		"hint": "Hint expander",
		"content": "This is hint expander content",
		"aria-label": "This indicates that the hint can be expanded"
	}'>
</OntarioRadioButtons>`;
	return (
		<div className="ontario-row">
			<div className="ontario-columns ontario-medium-12 ontario-large-12">
				<h3>Radio Buttons Example</h3>
				<div className="preview-container">
					<OntarioRadioButtons
						legend="Do you have cats?"
						hint-text="This is the hint text"
						is-required
						options='[{
            "name": "radio",
            "value": "radio",
            "elementId": "radio-1",
            "label": "radio-1-label"
            },
            {
              "name": "radio",
              "value": "radio-2",
              "elementId": "radio-2",
              "label": "radio-2-label",
              "hintExpander": {
                "hint": "Hint expander",
                "content": "This is the content, yup this is the content",
                "aria-label": "This indicates that the hint can be expanded"
              }
            },
            {
              "name": "radio",
              "value": "radio-3",
              "elementId": "radio-3",
              "label": "radio-3-label",
              "hintExpander": {
                "hint": "Hint expander",
                "content": "This is the content",
                "aria-label": "This indicates that the hint can be expanded"
              }
            },
            {
              "name": "radio",
              "value": "radio-4",
              "elementId": "radio-4",
              "label": "radio-4-label"
            }
            ]'
						hint-expander='{
              "hint": "Hint expander",
              "content": "This is hint expander content",
              "aria-label": "This indicates that the hint can be expanded"
            }'
					></OntarioRadioButtons>

					<p>With the following markup:</p>

					<SyntaxHighlighter language="javascript" style={vscDarkPlus}>
						{radioButtonsCodeExample}
					</SyntaxHighlighter>
				</div>
			</div>
		</div>
	);
}
