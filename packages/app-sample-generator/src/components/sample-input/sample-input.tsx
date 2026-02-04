import { Component, h, Prop } from '@stencil/core';

@Component({
	tag: 'sample-input',
	styleUrl: 'sample-input.css',
	shadow: true,
})
export class SampleInput {
	/** Label displayed above the input field. */
	@Prop() label: string = 'Label';

	/** Placeholder text shown inside the input. */
	@Prop() placeholder: string = 'Type something...';

	render() {
		return (
			<label class="field">
				<span class="label">{this.label}</span>
				<span class="input-wrapper">
					<input class="input" type="text" placeholder={this.placeholder} />
				</span>
			</label>
		);
	}
}
