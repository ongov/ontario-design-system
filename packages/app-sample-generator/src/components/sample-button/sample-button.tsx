import { Component, h, Prop } from '@stencil/core';

type ButtonVariant = 'primary' | 'secondary';

@Component({
	tag: 'sample-button',
	styleUrl: 'sample-button.css',
	shadow: true,
})
export class SampleButton {
	/** Button style variant used in generated samples. */
	@Prop() type: ButtonVariant = 'primary';

	private getClasses() {
		return {
			button: true,
			[this.type]: true,
		};
	}

	render() {
		return (
			<button class={this.getClasses()} type="button">
				<slot></slot>
			</button>
		);
	}
}
