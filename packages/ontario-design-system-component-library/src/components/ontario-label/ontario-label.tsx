import { Component, h, Element, Prop } from '@stencil/core';

/**
 * Ontario Label component properties
 */
export interface OntarioLabelProperties {
	/**
	 * The text to display as label.
	 */
	caption?: string;

	/**
	 * The form control with which the caption is associated.
	 */
	for: string;

	/**
	 * Defines whether the input field is required. If required, the value passed should be 'required'.
	 */
	required?: boolean;

	/**
	 * The type of label to render.
	 */
	type?: 'default' | 'large' | 'heading';
}

/**
 * Ontario Design System label web component
 */
@Component({
	tag: 'ontario-label',
	styleUrl: 'ontario-label.scss',
	shadow: true,
})
export class OntarioLabel implements OntarioLabelProperties {
	@Element() host: HTMLElement;

	/**
	 * The text to display as label.
	 */
	@Prop({ mutable: true }) caption: string;

	/**
	 * The form control with which the caption is associated.
	 */
	@Prop({ attribute: 'for', reflect: true }) for: string;

	/**
	 * The type of label to render.
	 */
	@Prop() type: 'default' | 'large' | 'heading' = 'default';

	/**
	 * Defines whether the input field is required. If required, the value passed should be 'required'.
	 */
	@Prop() required?: boolean = false;

	/**
	 * Set `caption` using internal component logic
	 */
	componentWillLoad() {
		this.caption = this.caption ?? this.host.textContent ?? '';
	}

	/**
	 *
	 * @returns the classes of the label based on the label's `type`
	 */
	private getClass() {
		return this.type.toLowerCase() === 'default' ? `ontario-label` : `ontario-label ontario-label--${this.type.toLowerCase()}`;
	}

	/**
	 *
	 * @returns the flag text
	 */
	private getFlag() {
		return this.required ? '(required)' : '(optional)';
	}

	render() {
		return (
			<label htmlFor={this.for} class={this.getClass()}>
				{this.caption}
				<span class="ontario-label__flag">{this.getFlag()}</span>
			</label>
		);
	}
}
