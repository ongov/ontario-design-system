import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { OntarioFooter } from '@ontario-digital-service/ontario-design-system-component-library-react';

export default function ExpandedFooterCodeExample() {
	const expandedFooterExample = `import { OntarioFooter } from '@ontario-digital-service/ontario-design-system-component-library-react'; \n\n<OntarioFooter type="expandedTwoColumn" default-options='{
  "accessibilityLink":"https://www.ontario.ca/page/accessibility",
  "privacyLink": "https://www.ontario.ca/page/privacy-statement",
  "contactLink": "https://www.ontario.ca/feedback/contact-us",
  "printerLink": "https://www.ontario.ca/page/copyright-information"

}' expanded-two-column-options='{
  "firstColumn": {
    "title": "This is my First Title",
    "content":"this is my first content"
  },
  "secondColumn": {
    "title": "This is my Second Title",
    "content":"this is my second content",
    "contactButtonText": "BUTTON"
  }
}' expanded-three-column-options='{
  "firstColumn": {
    "title": "This is my First Title",
    "content":"this is my first content"
  },
  "secondColumn": {
    "title": "This is my Second Title",
    "content":[
      {
        "title": "1 asdas",
        "link": "12"
      }
    ]
  },
  "thirdColumn": {
    "title": "this is my third title",
    "content": "this is my third content",
    "facebook": {
      "link": "1"
    },
    "twitter": {
      "link": "2"
    },
    "instagram": {
      "link": "3"
    },
    "youtube": {
      "link": "4"
    }
  }
}'></OntarioFooter>`;
	return (
		<>
			<div className="ontario-row">
				<div className="ontario-columns ontario-large-12">
					<h3>Example of default footer</h3>
					<div className="ontario-margin-top-24-!">
						<OntarioFooter
							type="expandedTwoColumn"
							default-options='{
                "accessibilityLink":"https://www.ontario.ca/page/accessibility",
                "privacyLink": "https://www.ontario.ca/page/privacy-statement",
                "contactLink": "https://www.ontario.ca/feedback/contact-us",
                "printerLink": "https://www.ontario.ca/page/copyright-information"

              }'
							expanded-two-column-options='{
                "firstColumn": {
                  "title": "This is my First Title",
                  "content":"this is my first content"
                },
                "secondColumn": {
                  "title": "This is my Second Title",
                  "content":"this is my second content",
                  "contactButtonText": "BUTTON"
                }
              }'
							expanded-three-column-options='{
                "firstColumn": {
                  "title": "This is my First Title",
                  "content":"this is my first content"
                },
                "secondColumn": {
                  "title": "This is my Second Title",
                  "content":[
                    {
                      "title": "1 asdas",
                      "link": "12"
                    }
                  ]
                },
                "thirdColumn": {
                  "title": "this is my third title",
                  "content": "this is my third content",
                  "facebook": {
                    "link": "1"
                  },
                  "twitter": {
                    "link": "2"
                  },
                  "instagram": {
                    "link": "3"
                  },
                  "youtube": {
                    "link": "4"
                  }
                }
              }'
						></OntarioFooter>

						<p>With the following markup:</p>

						<SyntaxHighlighter language="javascript" style={vscDarkPlus}>
							{expandedFooterExample}
						</SyntaxHighlighter>
					</div>
				</div>
			</div>
		</>
	);
}
