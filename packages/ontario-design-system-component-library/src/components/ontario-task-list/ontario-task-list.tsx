import { h, Component, Element, Prop, State } from '@stencil/core';
import { Language } from '../../utils/common/language-types';
import translations from '../../translations/global.i18n.json';

@Component({
	tag: 'ontario-task-list',
	styleUrl: 'ontario-task-list.scss',
	shadow: true,
})
export class OntarioTaskList {
	@Element() el: HTMLElement;

	/**
	 * The number of completed tasks.
	 */
	@Prop() completedTasks: number;

	/**
	 * The total number of tasks.
	 */
	@Prop() totalTasks: number;

	/**
	 * Specifies the label of the task list group.
	 *
	 * This is required to provide the name of the task list group.
	 */
	@Prop() label: string;

	/**
	 * The language of the component.
	 *
	 * This is used for translations, and is by default set through event listeners checking for a language property from the header. If no language is passed, it will default to English.
	 */
	@Prop({ mutable: true }) language?: Language;

	@State() translations: any = translations;

	render() {
		return (
			<div class="ontario-task-list__container">
				<h2 class="ontario-task-list__heading">{this.label}</h2>
				<p class="ontario-task-list__completion-text">
					{this.translations.taskGroup.completed[`${this.language}`]}&nbsp;{this.completedTasks}{' '}
					{this.translations.taskGroup.outOf[`${this.language}`]}&nbsp;{this.totalTasks}{' '}
					{this.translations.taskGroup.tasks[`${this.language}`]}
				</p>
				<div class="ontario-task-list" role="list">
					<slot></slot>
				</div>
			</div>
		);
	}
}
