import { Component, h, Element, Prop, Watch } from '@stencil/core';

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
	shadow: { delegatesFocus: true },
})
export class OntarioLabel implements OntarioLabelProperties {
	@Element() host: HTMLElement;

	/**
	 * The text to display as label. This will override the text provided through the Element Content.
	 *
	 * @example
	 * <ontario-label caption="Comments" for"comments">Feedback</ontario-label>
	 *
	 * The resulting label will show `"Comments"`.
	 */
	@Prop({ mutable: true }) caption?: string;

	/**
	 * The form control with which the caption is associated.
	 */
	@Prop() for: string;

	/**
	 * The type of label to render.
	 */
	@Prop() type: 'default' | 'large' | 'heading' = 'default';

	/**
	 * Defines whether the input field is required. If required, the value passed should be 'required'.
	 */
	@Prop() required?: boolean = false;

	@Watch('caption')
	validateCaption(newValue: string) {
		const isCaptionBlank = typeof newValue !== 'string' || newValue === '' || newValue.trim().length === 0;
		const isElementContentBlank = typeof this.host.textContent !== 'string' || this.host.textContent === '' || this.host.textContent.trim().length === 0;
		if (isCaptionBlank && isElementContentBlank) {
			throw new Error('Label cannot be empty. Please set the label through its caption property or by inserting text between the <ontario-label> tags.');
		}
	}

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
		const typeLowerCase = this.type.toLowerCase();
		return typeLowerCase === 'default' ? `ontario-label` : `ontario-label ontario-label--${typeLowerCase}`;
	}

	/**
	 *
	 * @returns the flag text based on whether the input is required or optional
	 */
	private getRequiredFlagText() {
		return this.required ? '(required)' : '(optional)';
	}

	/**
	 *
	 * @returns the label element to be rendered by the browser
	 */
	private getLabelElement() {
		const labelContent = (
			<label htmlFor={this.for} class={this.getClass()}>
				<slot name="caption">
					{this.caption}
					<span class="ontario-label__flag">{this.getRequiredFlagText()}</span>
				</slot>
				<slot name="input"></slot>
			</label>
		);
		return this.type.toLowerCase() === 'heading' ? <h1>{labelContent}</h1> : labelContent;
	}

	render() {
		return this.getLabelElement();
	}
}
