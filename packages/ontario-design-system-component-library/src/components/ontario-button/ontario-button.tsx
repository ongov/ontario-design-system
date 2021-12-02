import { Component, Prop, Element, h } from '@stencil/core';

/**
 * Ontario design system button web component
 */
@Component({
	tag: 'ontario-button',
	styleUrl: 'ontario-button.scss',
	shadow: true,
})
export class OntarioButton {
	@Element() host: HTMLElement;
	/**
	 * Sets the type of button that the Ontario Design System uses.
	 */
	@Prop() type: 'primary' | 'secondary' | 'tertiary' = 'secondary';
	/**
	 * Sets the native HTML button type attribute.
	 */
	@Prop() htmlType: 'button' | 'reset' | 'submit' = 'button';
	/**
	 * Sets text to display within the button. This will override the text provided through the Element Content.
	 */
	@Prop() label: string;
	/**
	 * Overrides the default value of the aria-label attribute.
	 */
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
