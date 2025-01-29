import React from 'react';
import { OntarioHeader } from '@ongov/ontario-design-system-component-library-react';

import CodeHighlighter from '../../components/code-highlighter';

export default function HeaderApplicationExample() {
	const applicationHeaderCodeExample = `import { OntarioHeader } from '@ongov/ontario-design-system-component-library-react'; \n\n<OntarioHeader
	type="application"
	applicationHeaderInfo={{
		title: "Application name",
		href: "/",
		maxSubheaderDesktopLinks: 3,
		maxSubheaderTabletLinks: 2
	}}
	languageToggleOptions={{
		englishLink: '/en',
		frenchLink: '/fr',
	}}
	menuItems={[
		{
			title: 'Link one',
			href: '/link-one',
			linkIsActive: true,
		},
		{
			title: 'Link two',
			href: '/link-two',
			linkIsActive: false,
		},
		{
			title: 'Long link three',
			href: '/link-three',
			linkIsActive: false,
		},
		{
			title: 'Long link four',
			href: '/link-four',
			linkIsActive: false,
		},
		{
			title: 'Link five',
			href: '/link-five',
			linkIsActive: false,
		}
	]}
	customLanguageToggle={languageToggle}
</OntarioHeader>
`;

	const languageToggle = (e: any) => {
		e.preventDefault();

		e.currentTarget.textContent === 'Français'
			? console.log('The current language is French')
			: console.log('The current language is English');
	};

	return (
		<div className="ontario-row">
			<div className="ontario-columns ontario-large-12">
				<div className="ontario-margin-top-24-!">
					<h2>Example</h2>
					<OntarioHeader
						type="application"
						applicationHeaderInfo={{
							title: 'Application name',
							href: '/',
							maxSubheaderDesktopLinks: 3,
							maxSubheaderTabletLinks: 2,
						}}
						languageToggleOptions={{
							englishLink: '/en',
							frenchLink: '/fr',
						}}
						menuItems={[
							{
								title: 'Link one',
								href: '/link-one',
								linkIsActive: true,
							},
							{
								title: 'Link two',
								href: '/link-two',
								linkIsActive: false,
							},
							{
								title: 'Long link three',
								href: '/link-three',
								linkIsActive: false,
							},
							{
								title: 'Long link four',
								href: '/link-four',
								linkIsActive: false,
							},
							{
								title: 'Link five',
								href: '/link-five',
								linkIsActive: false,
							},
						]}
						customLanguageToggle={languageToggle}
						// The following 3 properties resolve a React warning about the use of the placeholder attribute on an input element
						placeholder={''}
						onPointerEnterCapture={() => {}}
						onPointerLeaveCapture={() => {}}
					></OntarioHeader>

					<p>With the following markup:</p>

					<CodeHighlighter codeExample={applicationHeaderCodeExample} />

					<hr />
				</div>
			</div>
		</div>
	);
}
