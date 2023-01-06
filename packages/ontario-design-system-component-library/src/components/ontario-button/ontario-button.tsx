import { Component, Prop, Element, h, Watch, State } from '@stencil/core';
import { Button } from './button.interface';
import { validatePropExists, validateValueAgainstArray } from '../../utils/validation/validation-functions';
import { ConsoleMessageClass } from '../../utils/console-message/console-message';
import { ButtonType, ButtonTypes, HtmlType, HtmlTypes } from './ontario-button.types';

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
	 * The native HTML button type the button should use.
	 */
	@Prop() htmlType: HtmlType = 'button';

	/**
	 * Text to be displayed within the button. This will override the text provided through the Element Content.
	 *
	 * @example
	 * <ontario-button label="Label Text">Text</ontario-button>
	 *
	 * The resulting button will have the label `"Label Text"`.
	 */
	@Prop() label?: string;

	/**
	 * Provides more context as to what the button interaction is doing. This is optional.
	 *
	 * @example
	 * <ontario-button aria-label-text="Click button to open map">Open</ontario button>
	 */
	@Prop({ mutable: true }) ariaLabelText?: string;

	/**
	 * The unique identifier of the button. This is optional - if no ID is passed, one will be generated.
	 */
	@Prop({ mutable: true }) elementId?: string;

	/**
	 * Mutable variable, for internal use only.
	 * Set the button's type depending on validation result.
	 */
	@State() private typeState: string;

	/**
	 * Mutable variable, for internal use only.
	 *  Set the native HTML button type depending on validation result.
	 */
	@State() private htmlTypeState: string;

	@State() private labelState: string;

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
	 * Print the label warning message
	 */
	validateLabelContent(newValue: string) {
		if (validatePropExists(newValue)) {
			const message = new ConsoleMessageClass();
			message.addDesignSystemTag().addMonospaceText(' label ').addRegularText('for').addMonospaceText(' <ontario-button> ').addRegularText('was not provided').printMessage();
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
		return `ontario-button ontario-button--${this.typeState}`;
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
		this.ariaLabelText = this.ariaLabelText ?? this.labelState;
	}

	render() {
		return (
			<button type={this.htmlTypeState} class={this.getClass()} aria-label={this.ariaLabelText} id={this.getId()}>
				{this.labelState}
			</button>
		);
	}
}
