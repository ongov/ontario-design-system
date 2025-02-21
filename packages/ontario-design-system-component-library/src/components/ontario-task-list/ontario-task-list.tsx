import { h, Component, Element, Prop, State } from '@stencil/core';
import { Language } from '../../utils/common/language-types';
import { validateLanguage } from '../../utils/validation/validation-functions';
import translations from '../../translations/global.i18n.json';

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
			return status?.toLowerCase() === 'completed';
		}).length;
	}

	/**
	 * Ensure tasks are counted after custom elements are fully upgraded.
	 */
	connectedCallback() {
		// Wait for the custom element to be fully defined before counting
		customElements.whenDefined('ontario-task').then(() => {
			setTimeout(() => {
				this.countTasks();
			}, 50);
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
		const observer = new MutationObserver((mutations) => {
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
		}, 100);
	}

	render() {
		// Resolve the language to ensure valid translations are used.
		const resolvedLanguage = validateLanguage(this.language);

		return (
			<div class="ontario-task-list__container">
				<h2 class="ontario-task-list__heading">{this.label}</h2>

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
