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
	 * The completed tasks are determined based on the language-specific translation for "completed".
	 */
	countTasks() {
		const tasks = this.el.querySelectorAll('ontario-task');
		this.totalTasks = tasks.length;

		const resolvedLanguage = validateLanguage(this.language);

		const completedTranslation =
			translations.taskStatus.completed[resolvedLanguage as keyof typeof translations.taskStatus.completed];

		this.completedTasks = Array.from(tasks).filter(
			(task) => task.getAttribute('data-task-status') === completedTranslation,
		).length;
	}

	componentDidRender() {
		this.countTasks();
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

				<div class="ontario-task-list" role="list">
					<slot></slot>
				</div>
			</div>
		);
	}
}
