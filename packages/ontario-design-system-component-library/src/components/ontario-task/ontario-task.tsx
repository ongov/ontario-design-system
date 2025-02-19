import { h, Component, Prop, Watch, State, Listen, Element, Fragment } from '@stencil/core';
import { ConsoleMessageClass } from '../../utils/console-message/console-message';
import { TaskStatuses, TaskStatus, TaskBadgeColour, TaskToBadgeColour } from './ontario-task-statuses';
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
	@Element() el: HTMLElement;

	hintTextRef?: HTMLOntarioHintTextElement;

	/**
	 * Specifies the label of the task.
	 *
	 * This is required to provide the name of the task.
	 */
	@Prop() label: string;

	/**
	 * A unique id for the the task.
	 *
	 * This is required.
	 */
	@Prop() taskId: string;

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
	@State() private hintTextId: string | null | undefined;

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
		this.taskStatusState = isValidStatus ? this.taskStatus : this.warnAndGetDefaultTaskStatus();
	}

	/**
	 * Logs a warning to the console if the `taskStatus` prop is set to an invalid value.
	 *
	 * This function informs developers that the provided `taskStatus` is not recognized
	 * and resets the status to the default value of `'notStarted'`. The warning message
	 * specifies the valid task statuses to help guide correct usage.
	 *
	 * @returns The default task status `'notStarted'`.
	 */
	private warnAndGetDefaultTaskStatus(): TaskStatus {
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
	 * This listens for the `headerLanguageToggled` event sent from the language toggle when it is is connected to the DOM.
	 * It is used for changing the component language after the language toggle has been activated.
	 */
	@Listen('headerLanguageToggled', { target: 'window' })
	handleHeaderLanguageToggled(event: CustomEvent<Language>) {
		this.language = validateLanguage(event);
	}

	/**
	 * Determines the badge colour based on the current `taskStatusState`.
	 *
	 * @returns {TaskBadgeColour}
	 */
	private getBadgeColour(): TaskBadgeColour {
		return TaskToBadgeColour[this.taskStatusState] || 'grey';
	}

	/**
	 * Provides a translated task status string based on the current language.
	 */
	private getTranslatedTaskStatus(): string {
		const resolvedLanguage = validateLanguage(this.language);
		return translations.taskStatus[this.taskStatusState][resolvedLanguage];
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

	private getClass(): string {
		return ['ontario-task__label', this.hintText && 'ontario-task__hint-text--true'].filter(Boolean).join(' ');
	}

	/**
	 * Renders the task label and status content.
	 */
	private renderTaskContent() {
		return (
			<div class="ontario-task__content">
				<h3 id={`task-label--${this.taskId}`} class={this.getClass()}>
					{this.label}
				</h3>
				{this.taskStatusState && (
					<ontario-badge
						class="ontario-task__badge"
						role="status"
						aria-label={`${
							translations.taskStatus.taskStatus[validateLanguage(this.language)]
						} ${this.getTranslatedTaskStatus()} (${this.taskStatusState})`}
						colour={this.getBadgeColour()}
					>
						{this.getTranslatedTaskStatus()}
					</ontario-badge>
				)}
			</div>
		);
	}

	async componentDidLoad() {
		const hintId = await this.hintTextRef?.getHintTextId();
		this.hintTextId = hintId || 'default-hint-id'; // Fallback to a default value
		this.el.setAttribute('data-task-status', this.getTranslatedTaskStatus());
	}

	componentWillLoad() {
		this.parseHintText();
		this.language = validateLanguage(this.language);
		this.validateTaskStatus();

		this.hintTextId = 'default-hint-id';
	}

	render() {
		const isLinkActive = this.link && !this.deactivateLink;
		const taskStatusClass = `ontario-task-status--${this.taskStatusState.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()}`;

		const taskContent = (
			<Fragment>
				{this.renderTaskContent()}
				{this.renderHintText()}
			</Fragment>
		);

		return (
			<article
				class={`ontario-task ${taskStatusClass}`}
				role="group"
				aria-labelledby={`task-label--${this.taskId}`}
				aria-describedby={this.hintTextId}
			>
				{isLinkActive ? (
					<a href={this.link} class="ontario-task__link" aria-label={this.label}>
						{taskContent}
					</a>
				) : (
					<div>{taskContent}</div>
				)}
			</article>
		);
	}
}
