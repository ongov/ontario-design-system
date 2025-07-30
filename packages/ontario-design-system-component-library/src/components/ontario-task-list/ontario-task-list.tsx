import { h, Component, Element, Prop, State, Watch } from '@stencil/core';
import { Language } from '../../utils/common/language-types';
import { ConsoleMessageClass } from '../../utils/console-message/console-message';
import { validateLanguage } from '../../utils/validation/validation-functions';
import translations from '../../translations/global.i18n.json';
import { HeadingLevel } from '../../utils/common/common.interface';
import { validateValueAgainstArray } from '../../utils/validation/validation-functions';
import { TaskStatuses } from '../../utils/common/task-statuses.enum';
export type TaskListHeadingLevel = 'h1' | Exclude<HeadingLevel, 'h6'>;

@Component({
	tag: 'ontario-task-list',
	styleUrl: 'ontario-task-list.scss',
	shadow: true,
})
export class OntarioTaskList {
	@Element() el: HTMLElement;

	/**
	 * The label prop used for the task list heading.
	 */
	@Prop() label: string;

	/**
	 * Allows consumers to define the heading level for the task list component.
	 *
	 * Accepts 'h1', 'h2', 'h3' or 'h4'. Default is 'h2'.
	 */
	@Prop() headingLevel: TaskListHeadingLevel = 'h2';

	/**
	 * The language of the component.
	 * This is used for translations, and is by default set through event listeners checking for a language property from the header. If none are passed, it will default to English.
	 */
	@Prop({ mutable: true }) language?: Language = 'en';

	/**
	 * State to track the number of completed tasks.
	 */
	@State() completedTasks: number = 0;

	/**
	 * State to track the total number of tasks.
	 */
	@State() totalTasks: number = 0;

	/**
	 * Class-level constant for task count delay in milliseconds.
	 *
	 * This delay ensures that the `ontario-task` custom elements are fully upgraded and rendered
	 * in the DOM before the `countTasks` method is executed. Without this delay, the component
	 * might attempt to query or count tasks before they are properly initialized, leading to
	 * inaccurate task counts.
	 */
	private static readonly TASK_COUNT_DELAY_MS = 50;

	/**
	 * Watch for changes in `headingLevel` prop to validate its value.
	 */
	@Watch('headingLevel')
	validateHeadingLevel(newValue: string) {
		const allowedValues: TaskListHeadingLevel[] = ['h1', 'h2', 'h3', 'h4', 'h5'];

		// Validate the new value against the allowed values
		const isValid = validateValueAgainstArray(newValue, allowedValues);

		if (!isValid) {
			const message = new ConsoleMessageClass();
			message
				.addDesignSystemTag()
				.addMonospaceText(' headingLevel ')
				.addRegularText('on')
				.addMonospaceText(' <ontario-task-list> ')
				.addRegularText('was set to an invalid value; only ')
				.addMonospaceText(allowedValues.join(', '))
				.addRegularText(' are supported. The default value ')
				.addMonospaceText('h2')
				.addRegularText(' is assumed.')
				.printMessage();

			this.headingLevel = 'h2';
		}
	}

	/**
	 * Counts the total tasks and completed tasks by querying for `ontario-task` elements.
	 */
	countTasks() {
		const slot = this.el.shadowRoot?.querySelector('slot');
		const tasks = slot
			? (slot.assignedElements().filter((el) => el.tagName.toLowerCase() === 'ontario-task') as HTMLElement[])
			: [];

		this.totalTasks = tasks.length;

		this.completedTasks = tasks.filter((task) => {
			// Get the status directly from the light DOM
			const status = task.getAttribute('data-task-status');
			return status === TaskStatuses.Completed;
		}).length;
	}

	/**
	 * Lifecycle method: before the component loads, validate heading level.
	 */
	async componentWillLoad() {
		this.validateHeadingLevel(this.headingLevel);
	}

	/**
	 * Ensure tasks are counted after custom elements are fully upgraded.
	 */
	connectedCallback() {
		// Wait for the custom element to be fully defined before counting
		customElements.whenDefined('ontario-task').then(() => {
			setTimeout(() => {
				this.countTasks();
			}, OntarioTaskList.TASK_COUNT_DELAY_MS);
		});
	}

	/**
	 * Use slotchange and MutationObserver to track changes in slot content.
	 */
	componentDidLoad() {
		const slot = this.el.shadowRoot?.querySelector('slot');
		if (slot) {
			slot.addEventListener('slotchange', () => {
				this.countTasks();
			});
		}

		// Observe changes to the light DOM for accurate counting
		const observer = new MutationObserver((_mutations) => {
			this.countTasks();
		});
		observer.observe(this.el, {
			childList: true,
			subtree: true,
			attributes: true,
			attributeFilter: ['data-task-status'],
		});
	}

	componentDidRender() {
		setTimeout(() => {
			this.countTasks();
		}, OntarioTaskList.TASK_COUNT_DELAY_MS);
	}

	render() {
		// Resolve the language to ensure valid translations are used.
		const resolvedLanguage = validateLanguage(this.language);

		const headingProps = {
			class: { 'ontario-task-list__heading': true },
		};

		return (
			<div class="ontario-task-list__container">
				{h(this.headingLevel, headingProps, this.label)}

				<p class="ontario-task-list__completion-text" aria-live="polite">
					{translations.taskGroup.completed[resolvedLanguage]}&nbsp;
					{this.completedTasks}&nbsp;
					{translations.taskGroup.outOf[resolvedLanguage]}&nbsp;
					{this.totalTasks}&nbsp;
					{translations.taskGroup.tasks[resolvedLanguage]}
				</p>

				<ul class="ontario-task-list" role="list">
					<slot></slot>
				</ul>
			</div>
		);
	}
}
