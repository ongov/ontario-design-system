import React from 'react';
import { OntarioHeader } from '@ontario-digital-service/ontario-design-system-component-library-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function HeaderApplicationExample() {
	const applicationHeaderCodeExample = `import { OntarioHeader } from '@ontario-digital-service/ontario-design-system-component-library-react'; \n\n<OntarioHeader
		type="application"
		application-header-info='{
    	"name": "Application name" ,
    	"href": "/"
		}'
		language-toggle-options='{
    	"englishLink":"/en",
    	"frenchLink": "/fr"
		}'
		application-subheader-desktop-links="3"
		application-subheader-tablet-links="2"
		menu-items='[
			{
				"name": "Link one",
				"href": "/link-one"
			},
			{
				"name": "Link two",
				"href": "/link-two"
			},
			{
				"name": "Long link three",
				"href": "/link-three"
			},
			{
				"name": "Long link four",
				"href": "/link-four"
			},
			{
				"name": "Link five",
				"href": "/link-five"
			}
		]'>
</OntarioHeader>
`;
	return (
		<div className="ontario-row">
			<div className="ontario-columns ontario-large-12">
				<div className="ontario-margin-top-24-!">
					<h4>Application Header</h4>
					<OntarioHeader
						type="application"
						application-header-info='{
                "name": "Application name" ,
                "href": "/"
              }'
						language-toggle-options='{
                "englishLink":"/en",
                "frenchLink": "/fr"
            }'
						application-subheader-desktop-links="3"
						application-subheader-tablet-links="2"
						menu-items='[
							{
								"name": "Link one",
								"href": "/link-one"
							},
							{
								"name": "Link two",
								"href": "/link-two"
							},
							{
								"name": "Long link three",
								"href": "/link-three"
							},
							{
								"name": "Long link four",
								"href": "/link-four"
							},
							{
								"name": "Link five",
								"href": "/link-five"
							}
						]'
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
