import { h, Component, Prop, Watch, State, Listen, Element, Fragment } from '@stencil/core';
import { ConsoleMessageClass } from '../../utils/console-message/console-message';
import { TaskStatuses, TaskBadgeColour, TaskToBadgeColour } from '../../utils/common/task-statuses.enum';
import { validateLanguage, validateValueAgainstArray } from '../../utils/validation/validation-functions';
import { Hint } from '../../utils/common/common.interface';
import { Language } from '../../utils/common/language-types';
import { constructHintTextObject } from '../../utils/components/hints/hints';
import translations from '../../translations/global.i18n.json';
import { HeadingLevel } from '../../utils/common/common.interface';
export type TaskHeadingLevel = Extract<HeadingLevel, 'h2' | 'h3' | 'h4'>;

@Component({
	tag: 'ontario-task',
	styleUrl: 'ontario-task.scss',
	shadow: true,
})
export class OntarioTask {
	@Element() el: HTMLElement;

	// Reference to the ontario-hint-text element for this task.
	hintTextRef?: HTMLOntarioHintTextElement | undefined;

	/**
	 * Specifies the label of the task.
	 *
	 * This is required to provide the name of the task.
	 */
	@Prop() label: string;

	/**
	 * A unique id for the task.
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
	@Prop({ mutable: true }) hintText?: string | Hint;

	/**
	 * Defines the status of the task, with default set to 'NotStarted'.
	 *
	 * Accepts values from `TaskStatuses` enum: `NotStarted`, `InProgress`, `Completed`.
	 */
	/**
	 * Defines the status of the task, with default set to 'NotStarted'.
	 *
	 * Accepts values from `TaskStatuses` enum: `NotStarted`, `InProgress`, `Completed`, etc.
	 */
	@Prop() taskStatus: TaskStatuses = TaskStatuses.NotStarted;

	/**
	 * Allows consumers to define the heading level for the task label.
	 *
	 * Accepts 'h2', 'h3' or 'h4'. Default is 'h3'.
	 */
	@Prop() headingLevel: TaskHeadingLevel = 'h3';

	/**
	 * The hint text options are re-assigned to the internalHintText state.
	 */
	@State() private internalHintText: Hint;

	/**
	 * Mutable variable, for internal use only.
	 *
	 * Set the task's status state depending on validation result.
	 */
	@State() private taskStatusState: TaskStatuses = TaskStatuses.NotStarted;
	/**
	 * Watch for changes in `taskStatus` prop to validate its value.
	 */
	@Watch('taskStatus')
	validateTaskStatus() {
		const validStatuses = Object.values(TaskStatuses);
		const isValidStatus = validStatuses.includes(this.taskStatus);
		this.taskStatusState = isValidStatus ? this.taskStatus : this.warnAndGetDefaultTaskStatus();

		// Update the `data-task-status` attribute
		this.el.setAttribute('data-task-status', this.taskStatusState);
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
	private warnAndGetDefaultTaskStatus(): TaskStatuses {
		const validStatuses = Object.values(TaskStatuses).join(', ');
		const message = new ConsoleMessageClass();
		message
			.addDesignSystemTag()
			.addMonospaceText(' taskStatus ')
			.addRegularText('on')
			.addMonospaceText(' <ontario-task> ')
			.addRegularText('was set to an invalid taskStatus; only ')
			.addMonospaceText(validStatuses)
			.addRegularText(' are supported. The default taskStatus ')
			.addMonospaceText(TaskStatuses.NotStarted)
			.addRegularText(' is assumed.')
			.printMessage();
		return TaskStatuses.NotStarted;
	}

	/**
	 * Watch for changes in `headingLevel` prop to validate its value.
	 */
	@Watch('headingLevel')
	validateHeadingLevel(newValue: string) {
		const allowedValues: TaskHeadingLevel[] = ['h2', 'h3', 'h4'];

		// Validate the new value against the allowed values
		const isValid = validateValueAgainstArray(newValue, allowedValues);

		if (!isValid) {
			const message = new ConsoleMessageClass();
			message
				.addDesignSystemTag()
				.addMonospaceText(' headingLevel ')
				.addRegularText('on')
				.addMonospaceText(' <ontario-task> ')
				.addRegularText('was set to an invalid value; only ')
				.addMonospaceText(allowedValues.join(', '))
				.addRegularText(' are supported. The default value ')
				.addMonospaceText('h3')
				.addRegularText(' is assumed.')
				.printMessage();

			this.headingLevel = 'h3';
		}
	}

	/**
	 * Watch for changes in `hintText` prop and parse it if available.
	 *
	 * If a `hintText` prop is passed, the `constructHintTextObject` function will convert it to the correct format,
	 * and the result will be stored in the `internalHintText` state.
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
	 * This listens for the `headerLanguageToggled` event sent from the language toggle when it is connected to the DOM.
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

	/**
	 * Returns the class name(s) for the task label.
	 */
	private getClass(): string {
		return ['ontario-task__label', this.hintText && 'ontario-task__hint-text--true'].filter(Boolean).join(' ');
	}

	/**
	 * Renders the task label and status content.
	 *
	 * This includes dynamically rendering the heading element (h2, h3, or h4) based on the `headingLevel` prop,
	 * as well as the badge indicating the task status.
	 */
	private renderTaskContent() {
		const headingProps: any = {
			id: `task-label--${this.taskId}`,
			class: this.getClass(),
		};

		return (
			<div class="ontario-task__content">
				{h(this.headingLevel, headingProps, this.label)}
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

	/**
	 * After the component loads, retrieve the hint text ID (if available) from the hintText component,
	 * and set it for the `aria-describedby` attribute.
	 */
	async componentDidLoad() {
		if (this.hintTextRef) {
			let hintTextId = this.hintTextRef.elementId;

			if (!hintTextId) {
				hintTextId = `hint-text--${this.taskId}`;
				this.hintTextRef.elementId = hintTextId;
			}

			const taskElement = this.el.shadowRoot?.querySelector('li');
			if (taskElement) {
				taskElement.setAttribute('aria-describedby', hintTextId);
			}
		}
	}

	/**
	 * Lifecycle method: before the component loads, parse the hint text and
	 * validate language and task status and heading level.
	 */
	async componentWillLoad() {
		this.parseHintText();
		this.language = validateLanguage(this.language);
		this.validateTaskStatus();
		this.validateHeadingLevel(this.headingLevel);
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
			<li
				class={`ontario-task ${taskStatusClass}`}
				role="group"
				aria-labelledby={`task-label--${this.taskId}`}
				data-task-status={this.taskStatusState}
			>
				{isLinkActive ? (
					<a href={this.link} class="ontario-task__link" aria-label={this.label}>
						{taskContent}
					</a>
				) : (
					<div>{taskContent}</div>
				)}
			</li>
		);
	}
}
