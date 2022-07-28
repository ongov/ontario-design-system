import React from 'react';
import { OntarioHeader } from '@ontario-digital-service/ontario-design-system-component-library-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function HeaderApplicationExample() {
	const applicationHeaderCodeExample = `import { OntarioHeader } from '@ontario-digital-service/ontario-design-system-component-library-react'; \n\n<OntarioHeader type="application" title-header='{
    "name": "Application name" ,
    "href": "/"
  }' language-Toggle-Options='{
    "englishLink":"/en",
    "frenchLink": "/fr"
  }' menu-Items='[{
    "name": "Health",
    "href": "/ontario-hint"
  },{
    "name": "Financial Health",
    "href": "/ontario-hint"
  }]'>
</OntarioHeader>
`;
	return (
		<div className="ontario-row">
			<div className="ontario-columns ontario-medium-12 ontario-large-12">
				<div className="preview-container">
					<h4>Application Header</h4>
					<OntarioHeader
						type="application"
						title-header='{
                "name": "Application name" ,
                "href": "/"
              }'
						language-Toggle-Options='{
                "englishLink":"/en",
                "frenchLink": "/fr"
              }'
						menu-Items='[{
                "name": "Health",
                "href": "#/ontario-header"
              },{
                "name": "Financial Health",
                "href": "#/ontario-header"
              }]'
					></OntarioHeader>

					<p>With the following markup:</p>

					<SyntaxHighlighter language="javascript" style={vscDarkPlus}>
						{applicationHeaderCodeExample}
					</SyntaxHighlighter>

					<hr></hr>
				</div>
			</div>
		</div>
	);
}
