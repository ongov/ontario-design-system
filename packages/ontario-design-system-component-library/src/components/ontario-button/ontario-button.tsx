import { Component, Prop, Element, h, Watch, State } from '@stencil/core';
import { OntarioButtonProperties } from './button.interface';
import { ButtonType, HtmlType } from './ontario-button.enum';
import { validatePropExists, validateValueAgainstEnum } from '../../utils/validation/validation-functions';
import { ConsoleType, MessageStyle } from '../../utils/console-message/console-message.enum';
import { printConsoleMessage } from '../../utils/console-message/console-message';

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
	@Prop() type: ButtonType = ButtonType.Secondary;

	/**
	 * Mutable variable, for internal use only.
	 * Set the icon's width depending on validation result.
	 */
	@State() typeState: string = ButtonType.Secondary;

	/**
	 * The native HTML button type the button should use.
	 */
	@Prop() htmlType: HtmlType = HtmlType.Button;

	/**
	 * Mutable variable, for internal use only.
	 * Set the icon's width depending on validation result.
	 */
	@State() htmlTypeState: string = HtmlType.Button;

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
	@Prop({ mutable: true }) elementId?: string;

	/**
	 * Watch for changes in the `label` variable for validation purpose
	 * Validate the label and make sure the label has a value.
	 * Log error if user doesn't input a value for the label or element content.
	 */
	@Watch('label')
	validateLabelContent(newValue: string) {
		// If element content is not provided, check whether prop exists
		if (!this.host.textContent) {
			const isLabelBlank = validatePropExists(newValue);
			if (isLabelBlank) {
				printConsoleMessage([
					{
						message: ' label ',
						style: MessageStyle.Code,
					},
					{
						message: 'for',
						style: MessageStyle.Regular,
					},
					{
						message: ` <ontario-button> `,
						style: MessageStyle.Code,
					},
					{
						message: `was not provided`,
						style: MessageStyle.Regular,
					},
				], ConsoleType.Error);
			}
		}
	}

	/**
	 * Watch for changes in the `type` variable for validation purpose.
	 * If the user input doesn't match one of the enum values then return a warning message.
	 * If a match is found in one of the enum values then `type` will be set to the matching enum value.
	 */
	@Watch('type')
	validateButtonType(newValue: string) {
		const isTypeValid = validateValueAgainstEnum(newValue, ButtonType);
		if (!isTypeValid) {
			printConsoleMessage([
				{
					message: ' type ',
					style: MessageStyle.Code,
				},
				{
					message: 'for',
					style: MessageStyle.Regular,
				},
				{
					message: ` <ontario-button> `,
					style: MessageStyle.Code,
				},
				{
					message: `is not valid. The default type of`,
					style: MessageStyle.Regular,
				},
				{
					message: ' secondary ',
					style: MessageStyle.Code,
				},
				{
					message: 'was assumed.',
					style: MessageStyle.Regular,
				},
			], ConsoleType.Warning);
			this.typeState = ButtonType.Secondary;
		} else {
			this.typeState = this.type;
		}
	}

	/**
	 * Watch for changes in the `htmlType` variable for validation purpose.
	 * If the user input doesn't match one of the enum values then return a warning message.
	 * If a match is found in one of the enum values then `type` will be set to the matching enum value.
	 */
	@Watch('htmlType')
	validateHtmlType(newValue: string) {
		const isHtmlTypeValid = validateValueAgainstEnum(newValue, HtmlType);
		if (!isHtmlTypeValid) {
			printConsoleMessage([
				{
					message: ' html-type ',
					style: MessageStyle.Code,
				},
				{
					message: 'for',
					style: MessageStyle.Regular,
				},
				{
					message: ` <ontario-button> `,
					style: MessageStyle.Code,
				},
				{
					message: `is not valid. The default type of`,
					style: MessageStyle.Regular,
				},
				{
					message: ' button ',
					style: MessageStyle.Code,
				},
				{
					message: 'was assumed.',
					style: MessageStyle.Regular,
				},
			], ConsoleType.Warning);
			this.htmlTypeState = HtmlType.Button;
		} else {
			this.htmlTypeState = this.htmlType;
		}
	}

	/**
	 * @returns the classes of the button based of the button's `type`.
	 */
	private getClass() {
		return `ontario-button ontario-button--${this.type?.toLowerCase() ?? 'secondary'}`;
	}

	public getId(): string {
		return this.elementId ?? '';
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
			<button type={this.typeState} html-type={this.htmlType} class={this.getClass()} aria-label={this.ariaLabel} id={this.getId()}>
				{this.label}
			</button>
		);
	}
}
