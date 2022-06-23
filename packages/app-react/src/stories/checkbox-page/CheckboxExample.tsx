import React from 'react';
import { OntarioCheckboxes } from '@ontario-digital-service/ontario-design-system-component-library-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function CheckboxExample() {
	const checkboxCodeExample = `import { OntarioCheckboxes } from '@ontario-digital-service/ontario-design-system-component-library-react'; \n\n<OntarioCheckboxes legend="Do you have children?" hint-text="This is the hint text" is-required options='[{
	"name": "Checkbox-1",
	"value": "checkbox-1",
	"label": "checkbox-1-label"
	},
	{
		"name": "Checkbox-2",
		"value": "checkbox-2",
		"label": "checkbox-2-label",
		"hintExpander": {
			"hint": "Hint expander",
			"content": "This is the content, yup this is the content",
			"aria-label": "This indicates that the hint can be expanded"
		}
	},
	{
		"name": "Checkbox-3",
		"value": "checkbox-3",
		"label": "checkbox-3-label",
		"hintExpander": {
			"hint": "Hint expander",
			"content": "This is the content",
			"aria-label": "This indicates that the hint can be expanded"
		}
	},
	{
		"name": "Checkbox-4",
		"value": "checkbox-4",
		"label": "checkbox-4-label"
	}
	]' hint-expander='{
		"hint": "Hint expander",
		"content": "This is the content, yup this is the content",
		"aria-label": "This indicates that the hint can be expanded"
	}'>
</OntarioCheckboxes>`;
	return (
		<div className="ontario-row">
			<div className="ontario-columns ontario-medium-12 ontario-large-12">
				<h3>Checkbox Example</h3>
				<div className="preview-container">
					<OntarioCheckboxes
						legend="Do you have children?"
						hint-text="This is the hint text"
						is-required
						options='[{
              "name": "Checkbox-1",
              "value": "checkbox-1",
              "label": "checkbox-1-label"
              },
              {
                "name": "Checkbox-2",
                "value": "checkbox-2",
                "label": "checkbox-2-label",
                "hintExpander": {
                  "hint": "Hint expander",
                  "content": "This is the content, yup this is the content",
                  "aria-label": "This indicates that the hint can be expanded"
                }
              },
              {
                "name": "Checkbox-3",
                "value": "checkbox-3",
                "label": "checkbox-3-label",
                "hintExpander": {
                  "hint": "Hint expander",
                  "content": "This is the content",
                  "aria-label": "This indicates that the hint can be expanded"
                }
              },
              {
                "name": "Checkbox-4",
                "value": "checkbox-4",
                "label": "checkbox-4-label"
              }
              ]'
						hint-expander='{
                "hint": "Hint expander",
                "content": "This is the content, yup this is the content",
                "aria-label": "This indicates that the hint can be expanded"
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
