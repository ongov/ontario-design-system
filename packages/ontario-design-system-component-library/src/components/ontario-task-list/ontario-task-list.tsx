import { h, Component, Element } from '@stencil/core';

@Component({
	tag: 'ontario-task-list',
	styleUrl: 'ontario-task-list.scss',
	shadow: true,
})
export class OntarioTaskList {
	@Element() el: HTMLElement;

	render() {
		return (
			<div class="ontario-task-list" role="list">
				<slot></slot>
			</div>
		);
	}
}
