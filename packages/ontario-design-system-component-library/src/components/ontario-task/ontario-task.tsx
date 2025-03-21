import { h, Component, Prop, Watch } from '@stencil/core';
import { ConsoleMessageClass } from '../../utils/console-message/console-message';
import { TaskStatuses } from './ontario-task-statuses';

@Component({
	tag: 'ontario-task',
	styleUrl: 'ontario-task.scss',
	shadow: true,
})
export class OntarioTask {
	/**
	 * Specifies the label of the task.
	 *
	 * This is required to provide the name of the task.
	 */
	@Prop() label: string;

	/**
	 * Provides an optional hint or description for the task.
	 *
	 * This is optional.
	 */
	@Prop() hint?: string;

	/**
	 * Defines the status of the task, with default set to 'NotStarted'.
	 *
	 * Accepts values from `TaskStatuses` enum: `NotStarted`, `InProgress`, `Completed`.
	 */
	@Prop() taskStatus: TaskStatuses = TaskStatuses.NotStarted;

	/**
	 * Specifies an optional link associated with the task.
	 *
	 * If provided, clicking the task will navigate to this URL.
	 */
	@Prop() link?: string;

	/**
	 * Disables the task link when set to `true`.
	 *
	 * Default is `false`, meaning the link will be active if provided.
	 */
	@Prop() deactivateLink: boolean = false;

	/**
	 * Defines the language for the component, either 'en' or 'fr'.
	 *
	 * Default is 'en'.
	 */
	@Prop() language: 'en' | 'fr' = 'en';

	/**
	 * Watches for changes to `taskStatus` to validate its value.
	 *
	 * If `taskStatus` is invalid, resets to default 'NotStarted' and logs a warning.
	 */
	@Watch('taskStatus')
	validateTaskStatus() {
		this.taskStatus = this.normalizeStatus(this.taskStatus);
		const validStatuses = Object.values(TaskStatuses);

		if (!validStatuses.includes(this.taskStatus)) {
			this.warnDefaultTaskStatus();
			this.taskStatus = TaskStatuses.NotStarted;
		}
	}

	/**
	 * Normalizes the `taskStatus` value, allowing flexible input.
	 *
	 * Converts status strings to lowercase without spaces for easier comparison.
	 */
	private normalizeStatus(status: string): TaskStatuses {
		const normalizedStatus = status.toLowerCase().replace(/\s/g, '');
		if (normalizedStatus.includes('complete')) return TaskStatuses.Completed;
		if (normalizedStatus.includes('progress')) return TaskStatuses.InProgress;
		return TaskStatuses.NotStarted;
	}

	/**
	 * Determines the badge color based on the current task status.
	 *
	 * Returns one of 'light-teal', 'grey', or 'black'.
	 */
	private getBadgeColor(): 'light-teal' | 'grey' | 'black' {
		const normalizedStatus = this.normalizeStatus(this.taskStatus);

		switch (normalizedStatus) {
			case TaskStatuses.Completed:
				return 'black';
			case TaskStatuses.InProgress:
				return 'light-teal';
			case TaskStatuses.NotStarted:
				return 'grey';
			default:
				return 'grey';
		}
	}

	/**
	 * Provides a translated string for the current task status.
	 *
	 * Returns status label in either French or English based on the `language` prop.
	 */
	private getTranslatedTaskStatus(): string {
		const normalizedStatus = this.normalizeStatus(this.taskStatus);

		const translations: Record<TaskStatuses, string> = {
			[TaskStatuses.Completed]: this.language === 'fr' ? 'Terminé' : 'Completed',
			[TaskStatuses.InProgress]: this.language === 'fr' ? 'En cours' : 'In Progress',
			[TaskStatuses.NotStarted]: this.language === 'fr' ? 'Pas commencé' : 'Not Started',
		};

		return translations[normalizedStatus] || translations[TaskStatuses.NotStarted];
	}

	/**
	 * Logs a warning message if an invalid task status is provided.
	 *
	 * Notifies the user that the default 'NotStarted' status is used instead.
	 */
	private warnDefaultTaskStatus() {
		const message = new ConsoleMessageClass();
		message
			.addDesignSystemTag()
			.addMonospaceText(' taskStatus ')
			.addRegularText('on')
			.addMonospaceText(' <ontario-task> ')
			.addRegularText('was set to an invalid taskStatus; only ')
			.addMonospaceText(Object.values(TaskStatuses).join(', '))
			.addRegularText(' are supported. The default taskStatus ')
			.addMonospaceText('NotStarted')
			.addRegularText(' is assumed.')
			.printMessage();
	}

	render() {
		const isLinkActive = this.link && !this.deactivateLink;
		return (
			<article class="ontario-task" role="group" aria-labelledby="task-label" aria-describedby="task-hint">
				{isLinkActive ? (
					<a
						href={this.link}
						target="_blank"
						rel="noopener noreferrer"
						class="ontario-task__link"
						aria-label={`${this.label} (opens in a new window) ${this.taskStatus}`}
					>
						<div class="ontario-task__content">
							<h2 id="task-label" class="ontario-task__label">
								{this.label}
							</h2>
							{this.taskStatus && (
								<ontario-badge
									class="ontario-task__badge"
									role="status"
									aria-label={`Task status: ${this.getTranslatedTaskStatus()} ${this.taskStatus}`}
									colour={this.getBadgeColor()}
								>
									{this.getTranslatedTaskStatus()}
								</ontario-badge>
							)}
						</div>
						{this.hint && (
							<aside id="task-hint" class="ontario-task__hint" role="note">
								{this.hint}
							</aside>
						)}
					</a>
				) : (
					<div>
						<div class="ontario-task__content">
							<h2 id="task-label" class="ontario-task__label" aria-label={this.label}>
								{this.label}
							</h2>
							{this.taskStatus && (
								<ontario-badge
									class="ontario-task__badge"
									role="status"
									aria-label={`Task status: ${this.getTranslatedTaskStatus()} ${this.taskStatus}`}
									colour={this.getBadgeColor()}
								>
									{this.getTranslatedTaskStatus()}
								</ontario-badge>
							)}
						</div>
						{this.hint && (
							<aside id="task-hint" class="ontario-task__hint" role="note">
								{this.hint}
							</aside>
						)}
					</div>
				)}
			</article>
		);
	}
}
