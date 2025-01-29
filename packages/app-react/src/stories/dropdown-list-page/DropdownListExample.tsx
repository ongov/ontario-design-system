import React from 'react';

import { OntarioDropdownList } from '@ongov/ontario-design-system-component-library-react';

import CodeHighlighter from '../../components/code-highlighter';

export default function DropdownListExamples() {
	const dropdownListCodeExample = `import { OntarioDropdownList } from '@ongov/ontario-design-system-component-library-react'; \n\n<OntarioDropdownList 
  caption="Province/territory"
  name="province-selection"
  elementId="province-territory"
  hintText="Select the province or territory where you reside."
  required
  options={[
    {
      value: "AB",
      label: "Alberta"
    },
    {
      value: "BC",
      label: "British Columbia"
    },
    {
      value: "MB",
      label: "Manitoba"
    },
    {
      value: "NB",
      label: "New Brunswick"
    },
    {
      value: "NL",
      label: "Newfoundland and Labrador"
    },
    {
      value: "NS",
      label: "Nova Scotia"
    },
    {
      value: "ON",
      label: "Ontario",
	  selected: true
    },
    {
      value: "QC",
      label: "Quebec"
    },
    {
      value: "SK",
      label: "Saskatchewan"
    },
    {
      value: "NT",
      label: "Northwest Territories"
    },
    {
      value: "NU",
      label: "Nunavut"
    },
    {
      value: "YT",
      label: "Yukon"
    }
  ]}
  customOnChange={(e: any) => handleChange(e)}
>
</OntarioDropdownList>`;

	const dropdownListCodeExample2 = `import { OntarioDropdownList } from '@ongov/ontario-design-system-component-library-react'; \n\n<OntarioDropdownList 
  caption={{
	captionText: "Country",
	captionType: "default"
  }}
  name="country" 
  required
  options={[
    {
      value: "canada",
      label: "Canada"
    },
    {
      value: "italy",
      label: "Italy"
    },
    {
      value: "france",
      label: "France"
    }
  ]}
>
</OntarioDropdownList>`;

	const dropdownListCodeExample3 = `import { OntarioDropdownList } from '@ongov/ontario-design-system-component-library-react'; \n\n<OntarioDropdownList 
  caption="Select a language" 
  name="language-select"
  isEmptyStartOption="Select a language"
  hintExpander={{
	content: "If you speak both languages, please select the language you consider to be your first language.",
	hint: "What if I speak both languages?",
	elementId: "dropdown-list-language"
  }}
  options={[
    {
      value: "english",
      label: "English"
    },
    {
      value: "french",
      label: "French"
    }
  ]}
>
</OntarioDropdownList>`;

	const handleChange = (e: any) => {
		console.log(`The province/territory was changed to ${e.currentTarget.value}`);
	};

	return (
		<div className="ontario-row">
			<div className="ontario-columns ontario-large-12">
				<h2>Examples</h2>

				<OntarioDropdownList
					placeholder=""
					onPointerEnterCapture={() => {}}
					onPointerLeaveCapture={() => {}}
					caption="Province/territory"
					name="province-selection"
					elementId="province-territory"
					hint-text="Select the province or territory where you reside."
					required
					options={[
						{
							value: 'AB',
							label: 'Alberta',
						},
						{
							value: 'BC',
							label: 'British Columbia',
						},
						{
							value: 'MB',
							label: 'Manitoba',
						},
						{
							value: 'NB',
							label: 'New Brunswick',
						},
						{
							value: 'NL',
							label: 'Newfoundland and Labrador',
						},
						{
							value: 'NS',
							label: 'Nova Scotia',
						},
						{
							value: 'ON',
							label: 'Ontario',
							selected: true,
						},
						{
							value: 'QC',
							label: 'Quebec',
						},
						{
							value: 'SK',
							label: 'Saskatchewan',
						},
						{
							value: 'NT',
							label: 'Northwest Territories',
						},
						{
							value: 'NU',
							label: 'Nunavut',
						},
						{
							value: 'YT',
							label: 'Yukon',
						},
					]}
					customOnChange={(e: any) => handleChange(e)}
				></OntarioDropdownList>

				<p>With the following markup:</p>

				<CodeHighlighter codeExample={dropdownListCodeExample} />

				<p className="ontario-margin-top-24-!">
					Only if you know that 90% or more of your users will choose one of the options you can put that option as the
					default. In this example, Canada is the default country because, in this case, we’re sure at least 90% of our
					users will live in Canada:{' '}
				</p>

				<OntarioDropdownList
					placeholder=""
					onPointerEnterCapture={() => {}}
					onPointerLeaveCapture={() => {}}
					caption={{
						captionText: 'Country',
						captionType: 'default',
					}}
					name="country"
					required
					options={[
						{
							value: 'canada',
							label: 'Canada',
						},
						{
							value: 'italy',
							label: 'Italy',
						},
						{
							value: 'france',
							label: 'France',
						},
					]}
				></OntarioDropdownList>

				<p>With the following markup:</p>

				<CodeHighlighter codeExample={dropdownListCodeExample2} />

				<p className="ontario-margin-top-24-!">
					In all other cases, use the default option to repeat the label – this provides additional help to users with
					assistive devices like screen readers.
				</p>

				<OntarioDropdownList
					placeholder=""
					onPointerEnterCapture={() => {}}
					onPointerLeaveCapture={() => {}}
					caption="Select a language"
					name="language-select"
					isEmptyStartOption="Select a language"
					hintExpander={{
						content: 'If you speak both languages, please select the language you consider to be your first language.',
						hint: 'What if I speak both languages?',
						elementId: 'dropdown-list-language',
					}}
					options={[
						{
							value: 'english',
							label: 'English',
						},
						{
							value: 'french',
							label: 'French',
						},
					]}
				></OntarioDropdownList>

				<p>With the following markup:</p>

				<CodeHighlighter codeExample={dropdownListCodeExample3} />

				<hr />
			</div>
		</div>
	);
}
