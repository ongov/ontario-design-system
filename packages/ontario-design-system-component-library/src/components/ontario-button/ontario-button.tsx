import { Component, Prop, Element, h } from '@stencil/core';

/**
 * Ontario Button component properties
 */
export interface OntarioButtonProperties {
	/**
	 * The type of button to render.
	 */
	type?: 'primary' | 'secondary' | 'tertiary';

	/**
	 * The native HTML button type the button should use.
	 */
	htmlType?: 'button' | 'reset' | 'submit';

	/**
	 * Text to be displayed within the button. This will override the text provided through the Element Content.
	 *
	 * @example
	 * <ontario-button label="Label Text">Text</ontario-button>
	 *
	 * The resulting button will have the label `"Label Text"`.
	 */
	label?: string;

	/**
	 * Overrides the default value of the `aria-label` HTML attribute.
	 */
	ariaLabel?: string;

	/**
	 * The unique identifier of the button
	 */
	buttonId?: string;
}

/**
 * Ontario Design System button web component
 */
@Component({
	tag: 'ontario-button',
	styleUrl: 'ontario-button.scss',
	shadow: true,
})
export class OntarioButton implements OntarioButtonProperties {
	@Element() host: HTMLElement;

	/**
	 * The type of button to render.
	 */
	@Prop() type?: 'primary' | 'secondary' | 'tertiary' = 'secondary';

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
	@Prop({ mutable: true }) label?: string;

	/**
	 * Overrides the default value of the `aria-label` HTML attribute.
	 */
	@Prop({ mutable: true }) ariaLabel?: string;

	/**
	 * The unique identifier of the button
	 */
	@Prop({ mutable: true }) buttonId?: string;

	/**
	 *
	 * @returns the classes of the button based of the button's `type`
	 */
	private getClass() {
		return `ontario-button ontario-button--${this.type?.toLowerCase() ?? 'secondary'}`;
	}

	public getId(): string | undefined {
		return this.buttonId;
	}

	/**
	 * Set `buttonId`, `label`, and `ariaLabel` using internal component logic
	 */
	componentWillLoad() {
		this.label = this.label ?? this.host.textContent ?? '';
		this.ariaLabel = this.ariaLabel ?? this.label;
	}

	render() {
		return (
			<button type={this.htmlType} class={this.getClass()} aria-label={this.ariaLabel} id={this.getId()}>
				{this.label}
			</button>
		);
	}
}
