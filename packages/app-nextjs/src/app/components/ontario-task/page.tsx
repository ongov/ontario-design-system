import { Grid } from '../../grid';
import { OntarioTask } from '@ongov/ontario-design-system-component-library-react';

export default function OntarioTaskPage() {
	return (
		<main>
			<Grid>
				<h1>OntarioTask</h1>

				<h2>'language' Prop Variants</h2>
				<h3>EN</h3>
				<OntarioTask taskId="task-en" label="English Task" language="en" />

				<h3>FR</h3>
				<OntarioTask taskId="task-fr" label="Tâche en français" language="fr" />

				<h2>'task-status' Prop Variants</h2>
				<h3>Not started</h3>
				<OntarioTask taskId="task-notstarted" label="Task Not Started" task-status="notStarted" />

				<h3>In progress</h3>
				<OntarioTask taskId="task-inprogress" label="Task In Progress" task-status="inProgress" />

				<h3>Completed</h3>
				<OntarioTask taskId="task-completed" label="Task Completed" task-status="completed" />

				<h2>'headingLevel' - Prop Variants</h2>
				<h3>H2</h3>
				<OntarioTask taskId="task-h2" label="Heading Level H2" headingLevel="h2" />

				<h3>H3</h3>
				<OntarioTask taskId="task-h3" label="Heading Level H3" headingLevel="h3" />

				<h3>H4</h3>
				<OntarioTask taskId="task-h4" label="Heading Level H4" headingLevel="h4" />

				<h2>'deavtivate-link' - Prop Variants</h2>
				<h3>True</h3>
				<OntarioTask
					taskId="task-deactivated"
					label="Deactivated Link Task"
					link="https://example.com"
					deactivateLink={true}
				/>

				<h3>False</h3>
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
