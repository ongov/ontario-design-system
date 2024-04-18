import { Component, Prop, Element, h, Watch, State, AttachInternals } from '@stencil/core';

import { Button } from './button.interface';
import { ButtonType, ButtonTypes, HtmlType, HtmlTypes } from './ontario-button.types';

import { validatePropExists, validateValueAgainstArray } from '../../utils/validation/validation-functions';
import { ConsoleMessageClass } from '../../utils/console-message/console-message';

@Component({
	tag: 'ontario-button',
	styleUrl: 'ontario-button.scss',
	shadow: true,
	formAssociated: true,
})
export class OntarioButton implements Button {
	@Element() host: HTMLElement;
	@AttachInternals() internals: ElementInternals;

	/**
	 * The type of button to render.
	 *
	 * If no type is passed, it will default to 'secondary'.
	 */
	@Prop() type: ButtonType = 'secondary';

	/**
	 * The native HTML button type the button should use.
	 *
	 * If no htmlType is passed, it will default to 'button'.
	 */
	@Prop() htmlType: HtmlType = 'button';

	/**
	 * Text to be displayed within the button. This will override the text provided through the host element textContent.
	 *
	 * @example
	 * <ontario-button label="Label Text">Text</ontario-button>
	 *
	 * The resulting button will have the label `"Label Text"`.
	 */
	@Prop() label?: string;

	/**
	 * Provides more context as to what the button interaction is doing. This should only be used for accessibility purposes, if the button interaction requires more description than what the text provides.
	 *
	 *  This is optional.
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
	 * Set the native HTML button type depending on validation result.
	 */
	@State() private htmlTypeState: string;

	@State() private labelState: string;

	/**
	 * A reference to the internal button element.
	 */
	private buttonRef: HTMLButtonElement;

	/*
	 * Watch for changes to the `label` property for validation purposes.
	 *
	 * If  no `label` prop is provided, the `label` prop will be set to the host element textContent (if it exists).
	 */
	@Watch('label')
	private updateLabelContent() {
		this.labelState = this.label ?? this.host.textContent ?? '';
		this.validateLabelContent(this.labelState);
	}

	/**
	 * Watch for changes to the `type` property for validation purposes.
	 *
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
	 *  Watch for changes to the `htmlType` property for validation purposes.
	 *
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
	 * Print the missing `label` prop warning message
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
	 * Print the invalid `type` prop warning message
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
	 * Print the invalid `htmlType` warning message
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

	componentDidLoad() {
		// Used to help load translations for any slots + text content passed in by the user.
		const observer = new MutationObserver((mutations) => {
			mutations.forEach((mutation) => {
				if (mutation.type === 'attributes') {
					this.updateLabelContent();
				}
			});
		});

		const options = { attributes: true };
		observer.observe(this.host, options);

		// Add a click event listener to handle submitting a form
		if (this.htmlTypeState === 'submit') {
			const { form } = this.internals;
			// Based off a comment within this bug about preventDefault(): https://bugzilla.mozilla.org/show_bug.cgi?id=1370630
			this.buttonRef.addEventListener('click', () => form?.dispatchEvent(new Event('submit', { cancelable: true })));
		}
	}

	render() {
		return (
			<button
				ref={(el) => (this.buttonRef = el as HTMLButtonElement)}
				type={this.htmlTypeState}
				class={this.getClass()}
				aria-label={this.ariaLabelText}
				id={this.getId()}
			>
				{this.labelState}
			</button>
		);
	}
}
