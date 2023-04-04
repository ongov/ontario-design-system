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
		"title": "Arts and Culture",
		"href": "https://www.ontario.ca/page/arts-and-culture"
	},{
		"title": "Business and economy",
		"href": "https://www.ontario.ca/page/business-and-economy"
	},{
		"title": "Driving and Roads",
		"href": "https://www.ontario.ca/page/driving-and-roads"
	},{
		"title": "Education and training",
		"href": "https://www.ontario.ca/page/education-and-training"
	},{
		"title": "Environment and energy",
		"href": "https://www.ontario.ca/page/environment-and-energy"
	},{
		"title": "Government",
		"href": "https://www.ontario.ca/page/government"
	},{
		"title": "Health and wellness",
		"href": "https://www.ontario.ca/page/health-care-ontario"
	},{
		"title": "Home and community",
		"href": "https://www.ontario.ca/page/home-and-community"
	},{
		"title": "Jobs and employment",
		"href": "https://www.ontario.ca/page/jobs-and-employment"
	},{
		"title": "Law and safety",
		"href": "https://www.ontario.ca/page/law-and-safety"
	},{
		"title": "Rural and north",
		"href": "https://www.ontario.ca/page/rural-and-north"
	},{
		"title": "Taxes and benefits",
		"href": "https://www.ontario.ca/page/taxes-and-benefits"
	},{
		"title": "Travel and recreation",
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
							"title": "Arts and Culture",
							"href": "https://www.ontario.ca/page/arts-and-culture"
						},{
							"title": "Business and economy",
							"href": "https://www.ontario.ca/page/business-and-economy"
						},{
							"title": "Driving and Roads",
							"href": "https://www.ontario.ca/page/driving-and-roads"
						},{
							"title": "Education and training",
							"href": "https://www.ontario.ca/page/education-and-training"
						},{
							"title": "Environment and energy",
							"href": "https://www.ontario.ca/page/environment-and-energy"
						},{
							"title": "Government",
							"href": "https://www.ontario.ca/page/government"
						},{
							"title": "Health and wellness",
							"href": "https://www.ontario.ca/page/health-care-ontario"
						},{
							"title": "Home and community",
							"href": "https://www.ontario.ca/page/home-and-community"
						},{
							"title": "Jobs and employment",
							"href": "https://www.ontario.ca/page/jobs-and-employment"
						},{
							"title": "Law and safety",
							"href": "https://www.ontario.ca/page/law-and-safety"
						},{
							"title": "Rural and north",
							"href": "https://www.ontario.ca/page/rural-and-north"
						},{
							"title": "Taxes and benefits",
							"href": "https://www.ontario.ca/page/taxes-and-benefits"
						},{
							"title": "Travel and recreation",
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
