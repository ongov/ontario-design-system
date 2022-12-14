import React from 'react';
import { OntarioHeader } from '@ontario-digital-service/ontario-design-system-component-library-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function HeaderOntarioExample() {
	const ontarioHeaderCodeExample = `import { OntarioHeader } from '@ontario-digital-service/ontario-design-system-component-library-react'; \n\n<OntarioHeader
	type="ontario"
	language-toggle-options='{
    "englishLink":"/en",
    "frenchLink": "/fr"
  }'
	menu-items='[{
		"name": "Arts and Culture",
		"href": "https://www.ontario.ca/page/arts-and-culture"
	},{
		"name": "Business and economy",
		"href": "https://www.ontario.ca/page/business-and-economy"
	},{
		"name": "Driving and Roads",
		"href": "https://www.ontario.ca/page/driving-and-roads"
	},{
		"name": "Education and training",
		"href": "https://www.ontario.ca/page/education-and-training"
	},{
		"name": "Environment and energy",
		"href": "https://www.ontario.ca/page/environment-and-energy"
	},{
		"name": "Government",
		"href": "https://www.ontario.ca/page/government"
	},{
		"name": "Health and wellness",
		"href": "https://www.ontario.ca/page/health-care-ontario"
	},{
		"name": "Home and community",
		"href": "https://www.ontario.ca/page/home-and-community"
	},{
		"name": "Jobs and employment",
		"href": "https://www.ontario.ca/page/jobs-and-employment"
	},{
		"name": "Law and safety",
		"href": "https://www.ontario.ca/page/law-and-safety"
	},{
		"name": "Rural and north",
		"href": "https://www.ontario.ca/page/rural-and-north"
	},{
		"name": "Taxes and benefits",
		"href": "https://www.ontario.ca/page/taxes-and-benefits"
	},{
		"name": "Travel and recreation",
		"href": "https://www.ontario.ca/page/travel-and-recreation"
	}]'>
</OntarioHeader>
`;
	return (
		<div className="ontario-row">
			<div className="ontario-columns ontario-large-12">
				<div className="ontario-margin-top-24-!">
					<h4>Ontario.ca Header</h4>
					<OntarioHeader
						type="ontario"
						language-toggle-options='{
                "englishLink":"#",
                "frenchLink": "#"
              }'
						menu-items='[{
							"name": "Arts and Culture",
							"href": "https://www.ontario.ca/page/arts-and-culture"
						},{
							"name": "Business and economy",
							"href": "https://www.ontario.ca/page/business-and-economy"
						},{
							"name": "Driving and Roads",
							"href": "https://www.ontario.ca/page/driving-and-roads"
						},{
							"name": "Education and training",
							"href": "https://www.ontario.ca/page/education-and-training"
						},{
							"name": "Environment and energy",
							"href": "https://www.ontario.ca/page/environment-and-energy"
						},{
							"name": "Government",
							"href": "https://www.ontario.ca/page/government"
						},{
							"name": "Health and wellness",
							"href": "https://www.ontario.ca/page/health-care-ontario"
						},{
							"name": "Home and community",
							"href": "https://www.ontario.ca/page/home-and-community"
						},{
							"name": "Jobs and employment",
							"href": "https://www.ontario.ca/page/jobs-and-employment"
						},{
							"name": "Law and safety",
							"href": "https://www.ontario.ca/page/law-and-safety"
						},{
							"name": "Rural and north",
							"href": "https://www.ontario.ca/page/rural-and-north"
						},{
							"name": "Taxes and benefits",
							"href": "https://www.ontario.ca/page/taxes-and-benefits"
						},{
							"name": "Travel and recreation",
							"href": "https://www.ontario.ca/page/travel-and-recreation"
						}]'
					></OntarioHeader>

					<p>With the following markup:</p>

					<SyntaxHighlighter language="javascript" style={vscDarkPlus}>
						{ontarioHeaderCodeExample}
					</SyntaxHighlighter>
				</div>
			</div>
		</div>
	);
}
