import { Grid } from '../../grid';
import { OntarioTaskList, OntarioTask } from '@ongov/ontario-design-system-component-library-react';

export default function OntarioTaskListPage() {
	return (
		<main>
			<Grid>
				<h1>OntarioTaskList</h1>

				<h2>'language' Prop Variants</h2>
				<h3>Language - en</h3>
				<OntarioTaskList label="English Task List" language="en">
					<OntarioTask taskId="task-1" label="Task 1" taskStatus="Completed" />
					<OntarioTask taskId="task-2" label="Task 2" taskStatus="NotStarted" />
				</OntarioTaskList>

				<h3>Language - fr</h3>
				<OntarioTaskList label="Liste de tâches en français" language="fr">
					<OntarioTask taskId="task-3" label="Tâche 1" taskStatus="Completed" />
					<OntarioTask taskId="task-4" label="Tâche 2" taskStatus="InProgress" />
				</OntarioTaskList>

				<h2>'heading-level' Prop Variants</h2>
				<h3>heading level - h1</h3>
				<OntarioTaskList label="Heading Level H1" headingLevel="h1">
					<OntarioTask taskId="task-5" label="Task A" taskStatus="NotStarted" />
				</OntarioTaskList>

				<h3>heading level - h2</h3>
				<OntarioTaskList label="Heading Level H2" headingLevel="h2">
					<OntarioTask taskId="task-6" label="Task B" taskStatus="InProgress" />
				</OntarioTaskList>

				<h3>heading level - h3</h3>
				<OntarioTaskList label="Heading Level H3" headingLevel="h3">
					<OntarioTask taskId="task-7" label="Task C" taskStatus="Completed" />
				</OntarioTaskList>

				<h3>heading level - h4</h3>
				<OntarioTaskList label="Heading Level H4" headingLevel="h4">
					<OntarioTask taskId="task-8" label="Task D" taskStatus="NotStarted" />
				</OntarioTaskList>
			</Grid>
		</main>
	);
}
