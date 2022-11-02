import React from 'react';
import { OntarioDropdownList } from '@ontario-digital-service/ontario-design-system-component-library-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function DropdownListExamples() {
	const dropdownListCodeExample = `import { OntarioDropdownList } from '@ontario-digital-service/ontario-design-system-component-library-react'; \n\n<OntarioDropdownList caption="Do you like cats?" name="cat-dropdown" required
  options='[{
      "value": "dropdown-list-1",
      "label": "All categories"
    },
    {
      "value": "dropdown-list-2",
      "label": "Option 2"
    },
    {
      "value": "dropdown-list-3",
      "label": "Option 3"
    }]'>
</OntarioDropdownList>`;
	const dropdownListCodeExample2 = `import { OntarioDropdownList } from '@ontario-digital-service/ontario-design-system-component-library-react'; \n\n<OntarioDropdownList caption="Do you like cats?" name="cat-dropdown" required
  options='[{
    "value": "dropdown-list-1",
    "label": "All categories"
    },
    {
      "value": "dropdown-list-2",
      "label": "Option 2"
    },
    {
      "value": "dropdown-list-3",
      "label": "Option 3"
    }]'>
</OntarioDropdownList>`;
	const dropdownListCodeExample3 = `import { OntarioDropdownList } from '@ontario-digital-service/ontario-design-system-component-library-react'; \n\n<OntarioDropdownList caption="Select a language" name="language-select"
  options='[{
      "value": "dropdown-list-1",
      "label": "Select a language"
    },
    {
      "value": "dropdown-list-2",
      "label": "English"
    },
    {
      "value": "dropdown-list-3",
      "label": "French"
    }]'>
</OntarioDropdownList>`;
	return (
		<div className="ontario-row">
			<div className="ontario-columns ontario-medium-12 ontario-large-12">
				<div className="preview-container">
					<OntarioDropdownList
						caption="Do you like cats?"
						name="cat-dropdown"
						required
						options='[{
                "value": "dropdown-list-1",
                "label": "All categories"
              },
              {
                "value": "dropdown-list-2",
                "label": "Option 2"
              },
              {
                "value": "dropdown-list-3",
                "label": "Option 3"
              }]'
					></OntarioDropdownList>

					<p>With the following markup:</p>

					<SyntaxHighlighter language="javascript" style={vscDarkPlus}>
						{dropdownListCodeExample}
					</SyntaxHighlighter>

					<p>
						Only if you know that 90% or more of your users will choose one of the options you can put that option as the default. In this example, Canada is the default country
						because, in this case, we’re sure at least 90% of our users will live in Canada:{' '}
					</p>

					<OntarioDropdownList
						caption="Shipping Address"
						name="shipping-address"
						required
						options='[{
                "value": "dropdown-list-1",
                "label": "Canada"
              },
              {
                "value": "dropdown-list-2",
                "label": "Italy"
              },
              {
                "value": "dropdown-list-3",
                "label": "France"
              }]'
					></OntarioDropdownList>

					<p>With the following markup:</p>

					<SyntaxHighlighter language="javascript" style={vscDarkPlus}>
						{dropdownListCodeExample2}
					</SyntaxHighlighter>

					<p>In all other cases, use the default option to repeat the label – this provides additional help to users with assistive devices like screen readers.</p>

					<OntarioDropdownList
						caption="Select a language"
						name="language-select"
						options='[{
                "value": "dropdown-list-1",
                "label": "Select a language"
              },
              {
                "value": "dropdown-list-2",
                "label": "English"
              },
              {
                "value": "dropdown-list-3",
                "label": "French"
              }]'
					></OntarioDropdownList>

					<p>With the following markup:</p>

					<SyntaxHighlighter language="javascript" style={vscDarkPlus}>
						{dropdownListCodeExample3}
					</SyntaxHighlighter>
				</div>
			</div>
		</div>
	);
}
