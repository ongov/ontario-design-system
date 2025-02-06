import React from 'react';
import { OntarioHeader } from '@ongov/ontario-design-system-component-library-react';

import CodeHighlighter from '../../components/code-highlighter';

export default function HeaderOntarioExample() {
	const ontarioHeaderCodeExample = `import { OntarioHeader } from '@ongov/ontario-design-system-component-library-react'; \n\n<OntarioHeader
	type="ontario"
	languageToggleOptions={{
		englishLink: "/en",
		frenchLink: "/fr"
	}}
	>
</OntarioHeader>
`;
	return (
		<div className="ontario-row">
			<div className="ontario-columns ontario-large-12">
				<div className="ontario-margin-top-24-!">
					<h2>Example</h2>
					<OntarioHeader
						type="ontario"
						languageToggleOptions={{
							englishLink: '/en',
							frenchLink: '/fr',
						}}
						placeholder={''}
						onPointerEnterCapture={() => {}}
						onPointerLeaveCapture={() => {}}
					></OntarioHeader>

					<p>With the following markup:</p>

					<CodeHighlighter codeExample={ontarioHeaderCodeExample} />
				</div>
			</div>
		</div>
	);
}
