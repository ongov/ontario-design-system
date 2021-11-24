import { Component, Prop, Element, h } from '@stencil/core';

@Component({
	tag: 'ontario-button',
	styleUrl: 'ontario-button.scss',
	shadow: true,
})
export class OntarioButton {
	@Element() el: HTMLElement;
	@Prop() type: string = 'secondary';
	@Prop() htmlType: string = 'button';
	@Prop() label: string;
	@Prop() ariaLabel: string;

	private get buttonLabel() {
		return this.label && this.label.length > 0 ? this.label : this.el.textContent;
	}

	private get className() {
		return 'ontario-button ontario-button--' + this.type.toLowerCase();
	}

	render() {
		return (
			<button type={this.htmlType} class={this.className} aria-label={this.ariaLabel && this.ariaLabel.length > 0 ? this.ariaLabel : this.buttonLabel}>
				{this.buttonLabel}
			</button>
		);
	}
}
