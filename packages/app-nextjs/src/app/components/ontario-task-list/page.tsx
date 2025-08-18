import { TaskStatuses } from '@ongov/ontario-design-system-component-library';
import { Grid } from '../../grid';
import { OntarioTaskList, OntarioTask } from '@ongov/ontario-design-system-component-library-react';

export default function OntarioTaskListPage() {
	return (
		<main>
			<Grid>
				<h1>OntarioTaskList</h1>

				<h2>'language' Prop Variants</h2>
				<h3>EN</h3>
				<OntarioTaskList label="English Task List" language="en">
					<OntarioTask taskId="task-1" label="Task 1" taskStatus={TaskStatuses.Completed} />
					<OntarioTask taskId="task-2" label="Task 2" taskStatus={TaskStatuses.NotStarted} />
				</OntarioTaskList>

				<h3>FR</h3>
				<OntarioTaskList label="Liste de tâches en français" language="fr">
					<OntarioTask taskId="task-3" label="Tâche 1" taskStatus={TaskStatuses.Completed} />
					<OntarioTask taskId="task-4" label="Tâche 2" taskStatus={TaskStatuses.InProgress} />
				</OntarioTaskList>

				<h2>'heading-level' Prop Variants</h2>
				<h3>H1</h3>
				<OntarioTaskList label="Heading Level H1" headingLevel="h1">
					<OntarioTask taskId="task-5" label="Task A" taskStatus={TaskStatuses.NotStarted} />
				</OntarioTaskList>

				<h3>H2</h3>
				<OntarioTaskList label="Heading Level H2" headingLevel="h2">
					<OntarioTask taskId="task-6" label="Task B" taskStatus={TaskStatuses.InProgress} />
				</OntarioTaskList>

				<h3>H3</h3>
				<OntarioTaskList label="Heading Level H3" headingLevel="h3">
					<OntarioTask taskId="task-7" label="Task C" taskStatus={TaskStatuses.Completed} />
				</OntarioTaskList>

				<h3>H4</h3>
				<OntarioTaskList label="Heading Level H4" headingLevel="h4">
					<OntarioTask taskId="task-8" label="Task D" taskStatus={TaskStatuses.NotStarted} />
				</OntarioTaskList>
			</Grid>
		</main>
	);
}
