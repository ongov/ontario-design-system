import React from 'react';
import { OntarioFooter } from '@ongov/ontario-design-system-component-library-react';

import CodeHighlighter from '../../components/code-highlighter';

export default function ExpandedFooterCodeExample() {
	const expandedFooterExample = `import { OntarioFooter } from '@ongov/ontario-design-system-component-library-react'; \n\n<OntarioFooter
  type="threeColumn"
	socialLinks={{
		facebook: '#',
		twitter: '#',
		instagram: '#',
		youtube: '#'
	}}
	threeColumnOptions={{
		column1: {
			title: 'Ontario Design System',
			content: [{
				type: 'text',
				text: 'The Ontario Design System provides principles, guidance and code to help teams design and build accessible, mobile-friendly government websites and digital services.',
			}]
		},
		column2: {
			title: 'Most visited pages',
			content: [{
				type: 'list',
				list: [
					'<a href="#">For designers</a>',
					'<a href="#">For developers</a>',
					'<a href="#">Colours</a>',
					'<a href="#">Fonts and typography</a>',
					'<a href="#">Grid</a>'
				]
			}]
		},
		column3: {
			title: 'Help us improve the design system',
			content: [{
				type: 'text',
				text: 'You can check our help and feedback page if you do not see the component you need.',
			}]
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
							placeholder=""
							onPointerEnterCapture={() => {}}
							onPointerLeaveCapture={() => {}}
							type="threeColumn"
							socialLinks={{
								facebook: '#',
								twitter: '#',
								instagram: '#',
								youtube: '#',
							}}
							threeColumnOptions={{
								column1: {
									title: 'Ontario Design System',
									content: [
										{
											type: 'text',
											text: 'The Ontario Design System provides principles, guidance and code to help teams design and build accessible, mobile-friendly government websites and digital services.',
										},
									],
								},
								column2: {
									title: 'Most visited pages',
									content: [
										{
											type: 'list',
											list: [
												'<a href="#">For designers</a>',
												'<a href="#">For developers</a>',
												'<a href="#">Colours</a>',
												'<a href="#">Fonts and typography</a>',
												'<a href="#">Grid</a>',
											],
										},
									],
								},
								column3: {
									title: 'Help us improve the design system',
									content: [
										{
											type: 'text',
											text: 'You can check our help and feedback page if you do not see the component you need.',
										},
									],
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
