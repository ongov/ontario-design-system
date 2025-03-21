import { h, Component, Prop } from '@stencil/core';

@Component({
	tag: 'ontario-task',
	styleUrl: 'ontario-task.scss',
	shadow: true,
})
export class OntarioTask {
	@Prop() label: string;
	@Prop() hint?: string;
	@Prop() badgeLabel?: string;
	@Prop() link?: string;

	render() {
		return (
			<article class="ontario-task" role="group" aria-labelledby="task-label" aria-describedby="task-hint">
				<header class="ontario-task__content">
					<h2 id="task-label" class="ontario-task__label">
						{this.link ? (
							<a
								href={this.link}
								target="_blank"
								rel="noopener noreferrer"
								aria-label={`${this.label} (opens in a new window)`}
							>
								{this.label}
							</a>
						) : (
							this.label
						)}
					</h2>
					{this.badgeLabel && (
						<ontario-badge class="ontario-task__badge" role="status" aria-label={`Task priority: ${this.badgeLabel}`}>
							{this.badgeLabel}
						</ontario-badge>
					)}
				</header>
				{this.hint && (
					<aside id="task-hint" class="ontario-task__hint" role="note">
						{this.hint}
					</aside>
				)}
			</article>
		);
	}
}
