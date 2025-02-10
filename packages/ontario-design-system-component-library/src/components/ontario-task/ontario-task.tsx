import { h, Component, Prop, Watch, State, Listen } from '@stencil/core';
import { ConsoleMessageClass } from '../../utils/console-message/console-message';
import { TaskStatuses } from './ontario-task-statuses';
import { validateLanguage } from '../../utils/validation/validation-functions';
import { Hint } from '../../utils/common/common.interface';
import { Language } from '../../utils/common/language-types';
import { constructHintTextObject } from '../../utils/components/hints/hints';

@Component({
	tag: 'ontario-task',
	styleUrl: 'ontario-task.scss',
	shadow: true,
})
export class OntarioTask {
	hintTextRef: HTMLOntarioHintTextElement | undefined;

	/**
	 * Specifies the label of the task.
	 *
	 * This is required to provide the name of the task.
	 */
	@Prop() label: string;

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
	 * The language of the component.
	 *
	 * This is used for translations, and is by default set through event listeners checking for a language property from the header. If no language is passed, it will default to English.
	 */
	@Prop({ mutable: true }) language?: Language;

	/**
	 * Used to include the ontario-hint-text component for the task.
	 *
	 * This is optional.
	 */
	@Prop() hintText?: string | Hint;

	/**
	 * Used for the `aria-describedby` value of the task. This will match with the id of the hint text.
	 */
	@State() hintTextId: string | null | undefined;

	/**
	 * The hint text options are re-assigned to the internalHintText array.
	 */
	@State() private internalHintText: Hint;

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
	 * Watch for changes to the `hintText` prop.
	 *
	 * If a `hintText` prop is passed, the `constructHintTextObject` function will convert it to the correct format, and set the result to the `internalHintText` state.
	 */
	@Watch('hintText')
	private parseHintText() {
		if (this.hintText) {
			const hintTextObject = constructHintTextObject(this.hintText);
			this.internalHintText = hintTextObject;
		}
	}

	/**
	 * This listens for the `setAppLanguage` event sent from the test language toggler when it is is connected to the DOM. It is used for the initial language when the textarea component loads.
	 */
	@Listen('setAppLanguage', { target: 'window' })
	handleSetAppLanguage(event: CustomEvent<Language>) {
		if (!this.language) {
			this.language = validateLanguage(event);
		}
	}

	@Listen('headerLanguageToggled', { target: 'window' })
	handleHeaderLanguageToggled(event: CustomEvent<Language>) {
		this.language = validateLanguage(event);
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
	private badgeColors: Record<TaskStatuses, string> = {
		[TaskStatuses.Completed]: 'black',
		[TaskStatuses.InProgress]: 'light-teal',
		[TaskStatuses.NotStarted]: 'grey',
	};

	private getBadgeColor(): 'black' | 'light-teal' | 'grey' {
		return this.badgeColors[this.normalizeStatus(this.taskStatus)] as 'black' | 'light-teal' | 'grey';
	}

	/**
	 * Provides a translated string for the current task status.
	 *
	 * Returns status label in either French or English based on the `language` prop.
	 */
	private getTranslatedTaskStatus(): string {
		const normalizedStatus = this.normalizeStatus(this.taskStatus);

		const translations: Record<'en' | 'fr', Record<TaskStatuses, string>> = {
			en: {
				[TaskStatuses.Completed]: 'Completed',
				[TaskStatuses.InProgress]: 'In Progress',
				[TaskStatuses.NotStarted]: 'Not Started',
			},
			fr: {
				[TaskStatuses.Completed]: 'Terminé',
				[TaskStatuses.InProgress]: 'En cours',
				[TaskStatuses.NotStarted]: 'Pas commencé',
			},
		};

		if ((this.language === 'en' || this.language === 'fr') && translations[this.language][normalizedStatus]) {
			return translations[this.language][normalizedStatus];
		}

		return translations[this.language === 'fr' ? 'fr' : 'en'][TaskStatuses.NotStarted];
	}

	private renderHintText() {
		if (this.internalHintText) {
			return (
				<ontario-hint-text
					hint={this.internalHintText.hint}
					hintContentType={this.internalHintText.hintContentType}
					ref={(el) => (this.hintTextRef = el)}
				></ontario-hint-text>
			);
		}
		return null;
	}

	private renderTaskContent() {
		return (
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
		);
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

	async componentDidLoad() {
		this.hintTextId = await this.hintTextRef?.getHintTextId();
	}

	componentWillLoad() {
		this.parseHintText();
		this.language = validateLanguage(this.language);
	}

	render() {
		const isLinkActive = this.link && !this.deactivateLink;
		return (
			<article class="ontario-task" role="group" aria-labelledby="task-label" aria-describedby={this.hintTextId}>
				{isLinkActive ? (
					<a
						href={this.link}
						target="_blank"
						rel="noopener noreferrer"
						class="ontario-task__link"
						aria-label={`${this.label} (opens in a new window) ${this.taskStatus}`}
					>
						{this.renderTaskContent()}
						{this.renderHintText()}
					</a>
				) : (
					<div>
						{this.renderTaskContent()}
						{this.renderHintText()}
					</div>
				)}
			</article>
		);
	}
}
