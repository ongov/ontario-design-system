import React from 'react';
import { OntarioIconAccessibility, OntarioIconAccount } from '@ongov/ontario-design-system-component-library-react';

import CodeHighlighter from '../../components/code-highlighter';

export default function IconExample() {
	const primaryIconCodeExample = `import { OntarioIconAccessibility } from '@ongov/ontario-design-system-component-library-react'; \n\n<OntarioIconAccessibility icon-width="36" colour="blue"></OntarioIconAccessibility>`;
	const secondaryIconCodeExample = `import { OntarioIconAccount } from '@ongov/ontario-design-system-component-library-react'; \n\n<ontario-icon-account icon-width="36" colour="grey"></ontario-icon-account>`;
	return (
		<div className="ontario-row">
			<div className="ontario-columns ontario-large-12">
				<h2>How to use the icons</h2>
				<div className="ontario-margin-top-24-!">
					<h3 className="ontario-h4">Primary Icon:</h3>
					<OntarioIconAccessibility
						icon-width="36"
						colour="blue"
						// The following 3 properties resolve a React warning about the use of the placeholder attribute on an input element
						placeholder=""
						onPointerEnterCapture={() => {}}
						onPointerLeaveCapture={() => {}}
					></OntarioIconAccessibility>

					<p>With the following markup:</p>

					<CodeHighlighter codeExample={primaryIconCodeExample} />
				</div>

				<div className="ontario-margin-top-24-!">
					<h3 className="ontario-h4">Secondary Icon:</h3>
					<OntarioIconAccount
						icon-width="36"
						colour="grey"
						// The following 3 properties resolve a React warning about the use of the placeholder attribute on an input element
						placeholder=""
						onPointerEnterCapture={() => {}}
						onPointerLeaveCapture={() => {}}
					></OntarioIconAccount>

					<p>With the following markup:</p>

					<CodeHighlighter codeExample={secondaryIconCodeExample} />
				</div>
			</div>
		</div>
	);
}
