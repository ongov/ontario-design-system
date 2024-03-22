import React from 'react';

import { OntarioBlockquote } from '@ongov/ontario-design-system-component-library-react';

import CodeHighlighter from '../../components/code-highlighter';

export default function ButtonExample() {
	const longBlockquoteCodeExample = `import { OntarioBlockquote } from '@ongov/ontario-design-system-component-library-react'; \n\n<OntarioBlockquote attribution="Academic partners" byline="Ontario’s Pedagogy for the Early Years">In the past few years, Ontario has gained a high level of respect for its visionary work in early education. The changes have been profound, and thoughtfully introduced. The views that guide the work are articulated clearly, and express great respect for children, families, and educators. We now have a solid foundation upon which to build a more coherent system.</OntarioBlockquote>`;
	const shortBlockquoteCodeExample = `import { OntarioBlockquote } from '@ongov/ontario-design-system-component-library-react'; \n\n<OntarioBlockquote attribution="Survey respondent" quote="Access to high-quality child care is an issue that impacts our entire society."></OntarioBlockquote>`;
	return (
		<div className="ontario-row">
			<div className="ontario-columns ontario-large-12">
				<h2>Examples</h2>

				<div className="ontario-margin-top-24-!">
					<h3 className="ontario-h4">Long blockquote:</h3>
					<OntarioBlockquote attribution="Academic partners" byline="Ontario’s Pedagogy for the Early Years">
						In the past few years, Ontario has gained a high level of respect for its visionary work in early education.
						The changes have been profound, and thoughtfully introduced. The views that guide the work are articulated
						clearly, and express great respect for children, families, and educators. We now have a solid foundation
						upon which to build a more coherent system.
					</OntarioBlockquote>

					<p>With the following markup:</p>

					<CodeHighlighter codeExample={longBlockquoteCodeExample} />
				</div>

				<div className="ontario-margin-top-64-!">
					<h3 className="ontario-h4">Short blockquote:</h3>
					<OntarioBlockquote
						attribution="Survey respondent"
						quote="Access to high-quality child care is an issue that impacts our entire society."
					></OntarioBlockquote>

					<p>With the following markup:</p>

					<CodeHighlighter codeExample={shortBlockquoteCodeExample} />
				</div>
				<hr />
			</div>
		</div>
	);
}
