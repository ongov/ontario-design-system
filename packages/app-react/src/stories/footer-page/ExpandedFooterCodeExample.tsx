import React from 'react';
import { OntarioFooter } from '@ontario-digital-service/ontario-design-system-component-library-react';

import CodeHighlighter from '../../components/code-highlighter';

export default function ExpandedFooterCodeExample() {
	const expandedFooterExample = `import { OntarioFooter } from '@ontario-digital-service/ontario-design-system-component-library-react'; \n\n<OntarioFooter 
  type="expandedThreeColumn"
  default-options={{
    accessibilityLink: "https://www.ontario.ca/page/accessibility",
    privacyLink: "https://www.ontario.ca/page/privacy-statement",
    contactLink: "https://www.ontario.ca/feedback/contact-us",
    printerLink: "https://www.ontario.ca/page/copyright-information"
  }}
  expanded-three-column-options={{
    firstColumn: {
      title: "Ontario Design System",
      content: "The Ontario Design System provides principles, guidance and code to help teams design and build accessible, mobile-friendly government websites and digital services."
    },
    secondColumn: {
      title: "Most visited pages",
      content: [
        {
          title: "For designers",
          link: "#"
        },
        {
          title: "For developers",
          link: "#"
        },
        {
          title: "Colours",
          link: "#"
        },
        {
          title: "Fonts and typography",
          link: "#"
        },
        {
          title: "Grid",
          link: "#"
        }
      ]
    },
    thirdColumn: {
      title: "Help us improve the design system",
      content: "You can check our help and feedback page if you do not see the component you need.",
      facebook: {
        link: "#"
      },
      twitter: {
        link: "#"
      },
      instagram: {
        link: "#"
      },
      youtube: {
        link: "#"
      }
    }
  }}
></OntarioFooter>`;
	return (
		<>
			<div className="ontario-row">
				<div className="ontario-columns ontario-large-12">
					<h4>Example</h4>
					<div className="ontario-margin-top-24-!">
						<OntarioFooter
							type="expandedThreeColumn"
							default-options={{
								accessibilityLink: 'https://www.ontario.ca/page/accessibility',
								privacyLink: 'https://www.ontario.ca/page/privacy-statement',
								contactLink: 'https://www.ontario.ca/feedback/contact-us',
								printerLink: 'https://www.ontario.ca/page/copyright-information',
							}}
							expanded-three-column-options={{
								firstColumn: {
									title: 'Ontario Design System',
									content:
										'The Ontario Design System provides principles, guidance and code to help teams design and build accessible, mobile-friendly government websites and digital services.',
								},
								secondColumn: {
									title: 'Most visited pages',
									content: [
										{
											title: 'For designers',
											link: '#',
										},
										{
											title: 'For developers',
											link: '#',
										},
										{
											title: 'Colours',
											link: '#',
										},
										{
											title: 'Fonts and typography',
											link: '#',
										},
										{
											title: 'Grid',
											link: '#',
										},
									],
								},
								thirdColumn: {
									title: 'Help us improve the design system',
									content: 'You can check our help and feedback page if you do not see the component you need.',
									facebook: {
										link: '#',
									},
									twitter: {
										link: '#',
									},
									instagram: {
										link: '#',
									},
									youtube: {
										link: '#',
									},
								},
							}}
						></OntarioFooter>

						<p>With the following markup:</p>

						<CodeHighlighter codeExample={expandedFooterExample} />
					</div>
				</div>
			</div>
		</>
	);
}
