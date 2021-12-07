import { Component, Prop, Element, h } from '@stencil/core';

/**
 * Ontario Design System button web component
 */
@Component({
	tag: 'ontario-button',
	styleUrl: 'ontario-button.scss',
	shadow: true,
})
export class OntarioButton {
	@Element() host: HTMLElement;

	/**
	 * The type of button to render.
	 */
	@Prop() type: 'primary' | 'secondary' | 'tertiary' = 'secondary';

	/**
	 * The native HTML button type the button should use.
	 */
	@Prop() htmlType?: 'button' | 'reset' | 'submit' = 'button';

	/**
	 * Text to be displayed within the button. This will override the text provided through the Element Content.
	 * 
	 * @example
	 * <ontario-button label="Label Text">Text</ontario-button>
     * 
     * The resulting button will have the label `"Label Text"`.
	 */
	@Prop() label?: string | null;

	/**
	 * Overrides the default value of the `aria-label` HTML attribute.
	 */
	@Prop() ariaLabel?: string | null;

	/**
	 * The unique identifier of the button
	 */
	@Prop({ attribute: 'id' }) buttonId?: string | undefined;

	private getButtonLabel() {
		return this.label ?? (this.label = this.host.textContent);
	}

	private getClass() {
		return 'ontario-button ontario-button--' + this.type.toLowerCase();
	}

	private getAriaLabel() {
		return this.ariaLabel ?? (this.ariaLabel = this.getButtonLabel());
	}

	render() {
		return (
			<button type={this.htmlType} class={this.getClass()} aria-label={this.getAriaLabel()} id={this.buttonId}>
				{this.getButtonLabel()}
			</button>
		);
	}
}
