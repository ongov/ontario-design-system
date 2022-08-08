import { Component, Prop, Element, h, Watch, State } from '@stencil/core';
import { Button } from './button.interface';
import { validatePropExists, validateValueAgainstArray } from '../../utils/validation/validation-functions';
import { ConsoleMessageClass } from '../../utils/console-message/console-message';
import { ButtonType, ButtonTypes, HtmlType, HtmlTypes, ButtonColour, ButtonLinkColour } from './ontario-button.types';

@Component({
	tag: 'ontario-button',
	styleUrl: 'ontario-button.scss',
	shadow: true,
})
export class OntarioButton implements Button {
	@Element() host: HTMLElement;

	/**
	 * The type of button to render.
	 */
	@Prop() type: ButtonType = 'secondary';

	/**
	 * Mutable variable, for internal use only.
	 * Set the button's type depending on validation result.
	 */
	@State() typeState: string;

	/**
	 * The native HTML button type the button should use.
	 */
	@Prop() htmlType: HtmlType = 'button';

	/**
	 * Mutable variable, for internal use only.
	 *  Set the native HTML button type depending on validation result.
	 */
	@State() htmlTypeState: string;

	/**
	 * Text to be displayed within the button. This will override the text provided through the Element Content.
	 *
	 * @example
	 * <ontario-button label="Label Text">Text</ontario-button>
	 *
	 * The resulting button will have the label `"Label Text"`.
	 */
	@Prop() label?: string;

	@State() labelState: string;

	/**
 	 * Set the button's colour.
   */
	@Prop() colour?: ButtonColour = 'internalWhite';

	/**
 	 * Set the button's colour.
   */
	@Prop() linkColour?: ButtonLinkColour = 'internalBlack';

	/*
	 * Watch for changes in the `label` variable for validation purposes.
	 * If label is not provided, set label to Element Content (if it exists).
	*/
	@Watch('label')
	private updateLabelContent() {
		this.labelState = this.label ?? this.host.textContent ?? '';
		this.validateLabelContent(this.labelState);
	}

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
	@Prop({ mutable: true }) elementId?: string;

	/**
	 * Print the label warning message
	 */
	validateLabelContent(newValue: string) {
		if (validatePropExists(newValue)) {
			const message = new ConsoleMessageClass();
				message
					.addDesignSystemTag()
					.addMonospaceText(' label ')
					.addRegularText('for')
					.addMonospaceText(' <ontario-button> ')
					.addRegularText('was not provided')
					.printMessage();
		}
	}

	/**
	 * Watch for changes in the `type` variable for validation purpose.
	 * If the user input doesn't match one of the array values then `type` will be set to its default (`secondary`).
	 * If a match is found in one of the array values then `type` will be set to the matching array key value.
	 */
	@Watch('type')
	validateType() {
		const isValid = validateValueAgainstArray(this.type, ButtonTypes);
		if (isValid) {
			this.typeState = this.type;
		} else {
			this.typeState = this.warnDefaultType();
		}
	}

	/**
	 * Print the invalid type warning message
	 * @returns default type (secondary)
	 */
	private warnDefaultType(): ButtonType {
		const message = new ConsoleMessageClass();
		message
			.addDesignSystemTag()
			.addMonospaceText(' type ')
			.addRegularText('on')
			.addMonospaceText(' <ontario-button> ')
			.addRegularText('was set to an invalid type; only')
			.addMonospaceText(' primary, secondary, or tertiary ')
			.addRegularText('are supported. The default type')
			.addMonospaceText(' secondary ')
			.addRegularText('is assumed.')
			.printMessage();
		return 'secondary';
	}

	/**
	 * Watch for changes in the `htmlType` variable for validation purpose.
	 * If the user input doesn't match one of the array values then `htmlType` will be set to its default (`submit`).
	 * If a match is found in one of the array values then `htmlType` will be set to the matching array key value.
	 */
	@Watch('htmlType')
	validateHtmlType() {
		const isValid = validateValueAgainstArray(this.htmlType, HtmlTypes);
		if (isValid) {
			this.htmlTypeState = this.htmlType;
		} else {
			this.htmlTypeState = this.warnDefaultHtmlType();
		}
	}

	/**
	 * Print the invalid htmlType warning message
	 * @returns default htmlType (button)
	 */
	private warnDefaultHtmlType(): HtmlType {
	const message = new ConsoleMessageClass();
		message
			.addDesignSystemTag()
			.addMonospaceText(' htmlType ')
			.addRegularText('on')
			.addMonospaceText(' <ontario-button> ')
			.addRegularText('was set to an invalid htmlType; only')
			.addMonospaceText(' button, reset, or submit ')
			.addRegularText('are supported. The default type')
			.addMonospaceText(' button ')
			.addRegularText('is assumed.')
			.printMessage();
		return 'button';
	}

	/**
	 * @returns the classes of the button based of the button's `type`.
	 */
	private getClass() {
		return `ontario-button ontario-button--${this.typeState} ontario-button-colour--${this.colour} ontario-button-link-colour--${this.linkColour}`;
	}

	public getId(): string {
		return this.elementId ?? '';
	}

	/**
	 * Set `buttonId`, `label`, and `ariaLabel` using internal component logic.
	 */
	componentWillLoad() {
		this.updateLabelContent();
		this.validateHtmlType();
		this.validateType();
		this.ariaLabel = this.ariaLabel ?? this.labelState;
	}

	render() {
		return (
			<button type={this.htmlTypeState} class={this.getClass()} aria-label={this.ariaLabel} id={this.getId()}>
				{this.labelState}
			</button>
		);
	}
}
