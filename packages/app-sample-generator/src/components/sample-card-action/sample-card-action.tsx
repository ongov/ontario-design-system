import { Component, h, Prop } from '@stencil/core';

type ActionVariant = 'primary' | 'ghost';

@Component({
	tag: 'sample-card-action',
	styleUrl: 'sample-card-action.css',
	shadow: true,
})
export class SampleCardAction {
	/** Text label displayed for the action. */
	@Prop() label: string = 'Action';

	/** Visual variant for the action control. */
	@Prop() variant: ActionVariant = 'primary';

	/** Optional link target for the action. */
	@Prop() href?: string;

	private getClasses() {
		return {
			action: true,
			[this.variant]: true,
		};
	}

	render() {
		if (this.href) {
			return (
				<a class={this.getClasses()} href={this.href}>
					{this.label}
				</a>
			);
		}

		return (
			<button class={this.getClasses()} type="button">
				{this.label}
			</button>
		);
	}
}
