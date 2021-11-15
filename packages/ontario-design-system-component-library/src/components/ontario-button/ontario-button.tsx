import { Component, Prop, Watch, h } from '@stencil/core';

@Component({
	tag: 'ontario-button',
	styleUrl: 'ontario-button.css',
	shadow: true,
})
export class OntarioButton {
	@Prop() variant: string = 'primary';
	@Prop() label: string;
	@Prop() ariaLabel: string;
	@Prop({ reflect: true }) type: string = 'button';
	@Prop({ reflect: true, attribute: 'disabled' }) isDisabled: boolean;

	@Watch('label')
	validateLabel(label: string) {
		const isBlank = typeof label !== 'string' || label === '';
		if (isBlank) {
			throw new Error('label is required');
		}
	}

	render() {
		return (
			<button type={this.type} disabled={this.isDisabled}>{this.label}
			</button>
		);
	}
}
