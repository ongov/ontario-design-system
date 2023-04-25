import React from 'react';
import { OntarioHeader } from '@ontario-digital-service/ontario-design-system-component-library-react';

import CodeHighlighter from '../../components/code-highlighter';

export default function HeaderApplicationExample() {
	const applicationHeaderCodeExample = `import { OntarioHeader } from '@ontario-digital-service/ontario-design-system-component-library-react'; \n\n<OntarioHeader
	type="application"
	application-header-info={{
		title: "Application name" ,
		href: "/",
		maxSubheaderDesktopLinks: "3",
		maxSubheaderTabletLinks: "2"
	}}
	language-toggle-options={{
		englishLink: "/en",
		frenchLink: "/fr"
	}}
	menu-items={[
		{
			title: "Link one",
			href: "/link-one",
			linkIsActive: "true"
		},
		{
			title: "Link two",
			href: "/link-two",
			linkIsActive: "false"
		},
		{
			title: "Long link three",
			href: "/link-three",
			linkIsActive: "false"
		},
		{
			title: "Long link four",
			href: "/link-four",
			linkIsActive: "false"
		},
		{
			title: "Link five",
			href: "/link-five",
			linkIsActive: "false"
		}
	]}
</OntarioHeader>
`;

	return (
		<div className="ontario-row">
			<div className="ontario-columns ontario-large-12">
				<div className="ontario-margin-top-24-!">
					<h2>Example</h2>
					<OntarioHeader
						type="application"
						application-header-info='{
							"title": "Application name",
							"href": "/",
							"maxSubheaderDesktopLinks": "3",
							"maxSubheaderTabletLinks": "2"
            			}'
						language-toggle-options={{
							englishLink: '/en',
							frenchLink: '/fr',
						}}
						menu-items={[
							{
								title: 'Link one',
								href: '/link-one',
								linkIsActive: 'true',
							},
							{
								title: 'Link two',
								href: '/link-two',
								linkIsActive: 'false',
							},
							{
								title: 'Long link three',
								href: '/link-three',
								linkIsActive: 'false',
							},
							{
								title: 'Long link four',
								href: '/link-four',
								linkIsActive: 'false',
							},
							{
								title: 'Link five',
								href: '/link-five',
								linkIsActive: 'false',
							},
						]}
					></OntarioHeader>

					<p>With the following markup:</p>

					<CodeHighlighter codeExample={applicationHeaderCodeExample} />

					<hr />
				</div>
			</div>
		</div>
	);
}
