import { Grid } from '../../grid';
import { OntarioTask } from '@ongov/ontario-design-system-component-library-react';

export default function OntarioTaskPage() {
	return (
		<main>
			<Grid>
				<h1>OntarioTask</h1>

				<h2>'language' Prop Variants</h2>
				<h3>Language - en</h3>
				<OntarioTask taskId="task-en" label="English Task" language="en" />

				<h3>Language - fr</h3>
				<OntarioTask taskId="task-fr" label="Tâche en français" language="fr" />

				<h2>'task-status' Prop Variants</h2>
				<h2>taskStatus - NotStarted</h2>
				<OntarioTask taskId="task-notstarted" label="Task Not Started" taskStatus="NotStarted" />

				<h2>taskStatus - InProgress</h2>
				<OntarioTask taskId="task-inprogress" label="Task In Progress" taskStatus="InProgress" />

				<h2>taskStatus - Completed</h2>
				<OntarioTask taskId="task-completed" label="Task Completed" taskStatus="Completed" />

				<h2>'headingLevel' - Prop Variants</h2>
				<h3>heading level - h2</h3>
				<OntarioTask taskId="task-h2" label="Heading Level H2" headingLevel="h2" />

				<h3>heading level - h3</h3>
				<OntarioTask taskId="task-h3" label="Heading Level H3" headingLevel="h3" />

				<h3>heading level - h4</h3>
				<OntarioTask taskId="task-h4" label="Heading Level H4" headingLevel="h4" />

				<h2>'deavtivate-link' - Prop Variants</h2>
				<h3>deactivate link - true</h3>
				<OntarioTask
					taskId="task-deactivated"
					label="Deactivated Link Task"
					link="https://example.com"
					deactivateLink={true}
				/>

				<h3>deactivate link - false</h3>
				<OntarioTask taskId="task-active" label="Active Link Task" link="https://example.com" deactivateLink={false} />

				<h2>hintText - string</h2>
				<OntarioTask
					taskId="task-hint-string"
					label="Task with Hint (String)"
					hintText="This is a simple hint string."
				/>
			</Grid>
		</main>
	);
}
