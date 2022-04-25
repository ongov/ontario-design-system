import { Component, Prop, Element, h, Watch } from '@stencil/core';
import { ButtonType, HtmlType } from './ontario-button.enum';
import { validatePropExists, validateValueAgainstEnum } from '../../utils/validation/validation-functions';

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
	 * Provides more context as to what the button interaction is doing.
	 *
	 * @example
	 * <ontario-button aria-label="Click button to open map">Open</ontario button>
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
	 * Provides more context as to what the button interaction is doing.
	 *
	 * @example
	 * <ontario-button aria-label="Click button to open map">Open</ontario button>
	 */
	@Prop({ mutable: true }) ariaLabel?: string;

	/**
	 * The unique identifier of the button.
	 */
	@Prop({ mutable: true }) buttonId?: string;

	/**
	 * Watch for changes in the `label` variable for validation purpose
	 * Validate the label and make sure the label has a value.
	 * Log error if user doesn't input a value for the label or element content.
	 */
	@Watch('label')
	validateLabelContent(newValue: string) {
		const isLabelBlank = validatePropExists(newValue);
		if (isLabelBlank) {
			console.log("Label does not exist")
		}
	}

	/**
	 * Watch for changes in the `type` variable for validation purpose.
	 * If the user input doesn't match one of the enum values then return an error message.
	 * If a match is found in one of the enum values then `type` will be set to the matching enum value.
	 */
	@Watch('type')
	validateButtonType(newValue: string) {
		const isTypeValid = validateValueAgainstEnum(newValue, ButtonType);
		if (isTypeValid) {
			console.log("Type is valid")
		} else {
			console.log("Type is not valid")
		}
	}

	@Watch('htmlType')
	validateHtmlType(newValue: string) {
		const isHtmlTypeValid = validateValueAgainstEnum(newValue, HtmlType);
		if (isHtmlTypeValid) {
			console.log("Html type is valid")
		} else {
			console.log("Html type is not valid")
		}
	}

	/**
	 * @returns the classes of the button based of the button's `type`.
	 */
	private getClass() {
		return `ontario-button ontario-button--${this.type?.toLowerCase() ?? 'secondary'}`;
	}

	public getId(): string | undefined {
		return this.buttonId;
	}

	/**
	 * Set `buttonId`, `label`, and `ariaLabel` using internal component logic.
	 */
	componentWillLoad() {
		this.label = this.label ?? this.host.textContent ?? '';
		this.ariaLabel = this.ariaLabel ?? this.label;
	}

	render() {
		return (
			<button type={this.type} html-type={this.htmlType} class={this.getClass()} aria-label={this.ariaLabel} id={this.getId()}>
				{this.label}
			</button>
		);
	}
}
