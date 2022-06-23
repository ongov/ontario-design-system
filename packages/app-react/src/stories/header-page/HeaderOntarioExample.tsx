import React from 'react';
import { OntarioHeader } from '@ontario-digital-service/ontario-design-system-component-library-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function HeaderOntarioExample() {
	const ontarioHeaderCodeExample = `import { OntarioHeader } from '@ontario-digital-service/ontario-design-system-component-library-react'; \n\n	<OntarioHeader type="ontario" title-header='{
    "name": "Application name" ,
    "href": "/"
  }' language-Toggle-Options='{
    "englishLink":"/en",
    "frenchLink": "/fr"
  }'  menu-Items='[{
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
					<div className="example-container">
						<h5>Application Header</h5>
            <OntarioHeader type="ontario" title-header='{
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
					</div>

					<p>With the following markup:</p>

					<SyntaxHighlighter language="javascript" style={vscDarkPlus}>
						{ontarioHeaderCodeExample}
					</SyntaxHighlighter>
				</div>
			</div>
		</div>
	);
}
