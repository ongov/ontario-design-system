import React from 'react';
import { OntarioHeader } from '@ontario-digital-service/ontario-design-system-component-library-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function HeaderOntarioExample() {
	const ontarioHeaderCodeExample = `import { OntarioHeader } from '@ontario-digital-service/ontario-design-system-component-library-react'; \n\n<OntarioHeader type="ontario"
	language-toggle-options='{
    "englishLink":"/en",
    "frenchLink": "/fr"
  }'
	menu-items='[{
    "name": "Health",
    "href": "#"
  },
	{
    "name": "Financial Health",
    "href": "#"
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
                "name": "Health",
                "href": "#"
              },{
                "name": "Financial Health",
                "href": "#"
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
