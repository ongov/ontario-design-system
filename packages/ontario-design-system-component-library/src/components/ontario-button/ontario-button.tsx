import { Component, Prop, Element, h } from '@stencil/core';

@Component({
	tag: 'ontario-button',
	styleUrl: 'ontario-button.scss',
	shadow: true,
})
export class OntarioButton {
	@Element() host: HTMLElement;
	@Prop() type: string = 'secondary';
	@Prop() htmlType: 'button' | 'reset' | 'submit' = 'button';
	@Prop() label: string;
	@Prop() ariaLabel: string;



	private getButtonLabel() {
		return this.label ?? (this.label = this.host.textContent!);
	}

	private getClass() {
		return 'ontario-button ontario-button--' + this.type.toLowerCase();
	}

	private getAriaLabel() {
		return this.ariaLabel ?? (this.ariaLabel = this.getButtonLabel());
	}

	render() {
		return (
			<button type={this.htmlType} class={this.getClass()} aria-label={this.getAriaLabel()}>
				{this.getButtonLabel()}
			</button>
		);
	}
}
