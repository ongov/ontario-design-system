import { h, Component, Prop, Watch, State, Listen } from '@stencil/core';
import { ConsoleMessageClass } from '../../utils/console-message/console-message';
import { TaskStatuses, TaskStatus, BadgeColors } from './ontario-task-statuses';
import { validateLanguage, validateValueAgainstArray } from '../../utils/validation/validation-functions';
import { Hint } from '../../utils/common/common.interface';
import { Language } from '../../utils/common/language-types';
import { constructHintTextObject } from '../../utils/components/hints/hints';
import translations from '../../translations/global.i18n.json';

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
	 * Defines the status of the task, with default set to 'NotStarted'.
	 *
	 * Accepts values from `TaskStatuses` enum: `NotStarted`, `InProgress`, `Completed`.
	 */
	@Prop() taskStatus: TaskStatus;

	/**
	 * Used for the `aria-describedby` value of the task's label. This will match with the id of the hint text.
	 */
	@State() hintTextId: string | null | undefined;

	/**
	 * The hint text options are re-assigned to the internalHintText array.
	 */
	@State() private internalHintText: Hint;

	/**
	 * Mutable variable, for internal use only.
	 *
	 * Set the task's status state depending on validation result.
	 */
	@State() private taskStatusState: TaskStatus;

	/**
	 * Watch for changes in `taskStatus` prop to validate its value.
	 */
	@Watch('taskStatus')
	validateTaskStatus() {
		const isValidStatus = validateValueAgainstArray(this.taskStatus, TaskStatuses);
		this.taskStatusState = isValidStatus ? this.taskStatus : this.warnDefaultTaskStatus();
	}

	/**
	 * Display a console warning if `taskStatus` is invalid and set to a default value.
	 */
	private warnDefaultTaskStatus(): TaskStatus {
		const message = new ConsoleMessageClass();
		message
			.addDesignSystemTag()
			.addMonospaceText(' taskStatus ')
			.addRegularText('on')
			.addMonospaceText(' <ontario-task> ')
			.addRegularText('was set to an invalid taskStatus; only ')
			.addMonospaceText(TaskStatuses.join(', '))
			.addRegularText(' are supported. The default taskStatus ')
			.addMonospaceText('notStarted')
			.addRegularText(' is assumed.')
			.printMessage();
		return 'notStarted';
	}

	/**
	 * Watch for changes in `hintText` prop and parse it if available.
	 */
	@Watch('hintText')
	private parseHintText() {
		if (this.hintText) {
			const hintTextObject = constructHintTextObject(this.hintText);
			this.internalHintText = hintTextObject;
		}
	}

	/**
	 * Listen for app language settings on the window to update the component language.
	 */
	@Listen('setAppLanguage', { target: 'window' })
	handleSetAppLanguage(event: CustomEvent<Language>) {
		if (!this.language) {
			this.language = validateLanguage(event);
		}
	}

	/**
	 * Listen for header language toggling events to update the language dynamically.
	 */
	@Listen('headerLanguageToggled', { target: 'window' })
	handleHeaderLanguageToggled(event: CustomEvent<Language>) {
		this.language = validateLanguage(event);
	}

	/**
	 * Determines the badge color based on the current `taskStatusState`.
	 */
	private getBadgeColor(): 'black' | 'light-teal' | 'grey' {
		return BadgeColors[this.taskStatusState];
	}

	/**
	 * Provides a translated task status string based on the current language.
	 */
	private getTranslatedTaskStatus(): string {
		return translations.taskStatus[this.taskStatusState][this.language === 'fr' ? 'fr' : 'en'];
	}

	/**
	 * Renders hint text if available.
	 */
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

	/**
	 * Renders the task label and status content.
	 */
	private renderTaskContent() {
		return (
			<div class="ontario-task__content">
				<h2 id="task-label" class="ontario-task__label" aria-label={this.label}>
					{this.label}
				</h2>
				{this.taskStatusState && (
					<ontario-badge
						class="ontario-task__badge"
						role="status"
						aria-label={`Task status: ${this.getTranslatedTaskStatus()} (${this.taskStatusState})`}
						colour={this.getBadgeColor()}
					>
						{this.getTranslatedTaskStatus()}
					</ontario-badge>
				)}
			</div>
		);
	}

	async componentDidLoad() {
		this.hintTextId = await this.hintTextRef?.getHintTextId();
	}

	componentWillLoad() {
		this.parseHintText();
		this.language = validateLanguage(this.language);
		this.validateTaskStatus();
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
						aria-label={`${this.label} ${translations.newWindow[this.language || 'en']}`}
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
