import { useRef } from 'react';
import { OntarioErrorAlert } from '@ongov/ontario-design-system-component-library-react';
import ErrorAlertWhenToUse from './ErrorAlertWhenToUse';
import ErrorAlertExample from './ErrorAlertExample';
import ErrorAlertGuidance from './ErrorAlertGuidance';

export default function ErrorAlert() {
	const summary = useRef<HTMLOntarioErrorAlertElement>(null);
	return (
		<>
			<div className="ontario-row">
				<div className="ontario-columns ontario-large-12">
					<OntarioErrorAlert ref={summary} formId="error-example-form" />
				</div>
			</div>
			<ErrorAlertWhenToUse />
			<ErrorAlertExample summary={summary} />
			<ErrorAlertGuidance />
		</>
	);
}
