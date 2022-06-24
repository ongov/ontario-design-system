import { h } from '@stencil/core';
import { CaptionType, MessageContentType } from './input-caption.enum';
import { Caption } from './caption.interface';
import { ConsoleMessage } from '../console-message/console-message.interface';
import { ConsoleType, MessageStyle } from '../../utils/console-message/console-message.enum';
import { printConsoleMessage } from '../../utils/console-message/console-message';

export class InputCaption implements Caption {
	/**
	 * The text to display as caption.
	 */
	captionText: string;

	/**
	 * The type of caption to render.
	 */
	captionType: CaptionType;

	/**
	 * Determine whether the input field is required.
	 */
	isRequired: boolean = false;

	/**
	 * Determine whether the rendered element is a `<label>` or `<legend>`.
	 */
	isLegend: boolean = false;

	/**
	 * Name of the component instantiating the class.
	 * This is used for validation warning message.
	 */
	componentTagName: string;

	language: any = 'en';

	translations: any;

	/**
	 * Set the class members
	 * Output a console warning message if the provided `label` type is incorrect
	 * @param caption object containing the essential data to configure the input label
	 */
	constructor(componentTagName: string, caption: InputCaption | string, translations: any, language: any) {
		let captionObject = new Object() as InputCaption;

		if (caption) {
			if (typeof caption === 'string') {
				captionObject = JSON.parse(caption) as InputCaption;
			} else {
				captionObject = caption;
			}
		}

		this.isRequired = captionObject?.isRequired ?? false;
		this.isLegend = captionObject?.isLegend ?? false;
		this.componentTagName = componentTagName.toLocaleLowerCase();
		this.captionText = captionObject?.captionText ?? '';
		this.captionType =
			(captionObject && captionObject?.captionType && Object.values(CaptionType).find(type => type === captionObject?.captionType?.toLowerCase())) || CaptionType.Default;
		this.validateCaption(captionObject);
		this.translations = translations;
		this.language = language;
	}

	/**
	 * Return the `<label>` element for text inputs
	 * @param captionFor Set the `htmlFor` attribute
	 * @returns element containing the caption for the input
	 */
	getCaption = (captionFor?: string): HTMLElement => {
		const captionContent = this.isLegend ? (
			<legend class={this.getClass()}>
				{this.captionText}
				{this.getRequiredFlagElement()}
			</legend>
		) : (
			<label htmlFor={captionFor} class={this.getClass()}>
				{this.captionText}
				{this.getRequiredFlagElement()}
			</label>
		);

		// with `this.captionType` already set to one of the enum values, the comparison no longer needs the `toLowerCase()` transform
		return this.captionType === CaptionType.Heading ? <h1>{captionContent}</h1> : captionContent;
	};

	/**
	 * Determines which flag text to use between `required` and `optional`
	 * @returns `required` or `optional` flag text
	 */
	private getRequiredFlagText(): string {
		return this.isRequired ? this.translations && `(${this.translations.required[this.language]})` : this.translations && `(${this.translations.optional[this.language]})`;
	}

	/**
	 * Get the HTML for the required/optional flag.
	 * @returns CSS class for the label/legend.
	 */
	private getRequiredFlagElement(): HTMLElement {
		return <span class="ontario-label__flag">{this.getRequiredFlagText()}</span>;
	}

	/**
	 * Get the CSS class for the `label` element.
	 * @returns CSS class for the `label` element.
	 */
	private getClass(): string {
		return this.captionType === CaptionType.Large || this.captionType === CaptionType.Heading ? `ontario-label ontario-label--${this.captionType}` : `ontario-label`;
	}

	/**
	 * Validate caption input by user and output warning message to the console if:
	 * 1. the `caption` object is not provided
	 * 2. the `captionText` property of the `caption` object is not provided
	 * 3. the `captionText` property of the `caption` object is empty or contain only spaces
	 * 4. the `captionType` property of the `caption` object is not provided
	 * 5. the `captionType` property of the `caption` object is incorrect
	 */
	private validateCaption(caption?: InputCaption) {
		// undefined `caption` object
		if (!caption || Object.keys(caption).length <= 0) {
			printConsoleMessage(this.getWarningMessage(MessageContentType.UndefinedCaptionObject, this.componentTagName), ConsoleType.Warning);
		} else {
			// undefined `captionText` property
			if (!caption.captionText) {
				printConsoleMessage(this.getWarningMessage(MessageContentType.UndefinedCaptionText, this.componentTagName, this.getRequiredFlagText()), ConsoleType.Warning);
			} else {
				// `captionText` that is empty or contains only spaces
				if (/^\s*$/.test(caption.captionText)) {
					printConsoleMessage(this.getWarningMessage(MessageContentType.EmptyCaptionText, this.componentTagName, this.getRequiredFlagText()), ConsoleType.Warning);
				}
			}

			// undefined `captionType`
			if (!caption.captionType) {
				printConsoleMessage(this.getWarningMessage(MessageContentType.UndefinedCaptionType, this.componentTagName), ConsoleType.Warning);
			} else {
				// incorrect `captionType`
				if (!Object.values(CaptionType).includes(caption?.captionType?.toLowerCase() as CaptionType)) {
					printConsoleMessage(this.getWarningMessage(MessageContentType.IncorrectCaptionType, this.componentTagName), ConsoleType.Warning);
				}
			}
		}
	}

	/**
	 * Generate the content of warning message to be printed to the console
	 * @param messageType determine the content of warning message to output
	 * @param componentTagName the tag name of the component that's emitting the warning message
	 * @param requiredFlagText accepts a string value to be used as the required flag text and defaults to `(optional)` if not set
	 * @returns an array of `ConsoleMessage` objects containing the message and associated styles to be printed to the console
	 */
	private getWarningMessage(messageType: MessageContentType, componentTagName: string, requiredFlagText: string = '(optional)'): ConsoleMessage[] {
		let message: ConsoleMessage[] = [
			{
				message: ' caption ',
				style: MessageStyle.Code,
			},
			{
				message: 'object on',
				style: MessageStyle.Regular,
			},
			{
				message: ` <${componentTagName}> `,
				style: MessageStyle.Code,
			},
		];

		if (messageType !== MessageContentType.UndefinedCaptionObject) {
			const problematicProperty: ConsoleMessage[] = [
				{
					message: ` ${messageType === MessageContentType.EmptyCaptionText || messageType === MessageContentType.UndefinedCaptionText ? 'captionText' : 'captionType'} `,
					style: MessageStyle.Code,
				},
				{
					message: 'property of',
					style: MessageStyle.Regular,
				},
			];
			message = [...problematicProperty, ...message];
		}

		switch (messageType) {
			// undefinedCaptionObject example: caption object on <ontario-input> is required but not defined. A blank followed by a (optional) flag is assumed.
			// undefinedCaptionText example: captionText property of caption object on <ontario-input> is required but not defined. A blank followed by a (optional) flag is assumed.
			// EmptyCaptionText example: captionText property of caption object on <ontario-input> is empty or contains only spaces. A blank followed by a (optional) flag is assumed.
			case MessageContentType.UndefinedCaptionObject:
			case MessageContentType.UndefinedCaptionText:
			case MessageContentType.EmptyCaptionText:
				let undefinedMessage: ConsoleMessage[] = [
					{
						message: `${messageType === MessageContentType.EmptyCaptionText ? 'is empty or contains only spaces' : 'is required but not defined'}. A blank followed by a`,
						style: MessageStyle.Regular,
					},
					{
						message: ` ${requiredFlagText} `,
						style: MessageStyle.Code,
					},
					{
						message: 'flag is assumed.',
						style: MessageStyle.Regular,
					},
				];
				message = [...message, ...undefinedMessage];
				break;

			// UndefinedCaptionType example: captionType property of caption object on <ontario-input> is not defined. The default type is assumed.
			case MessageContentType.UndefinedCaptionType:
				let undefinedTypeMessage: ConsoleMessage[] = [
					{
						message: 'is not defined. The',
						style: MessageStyle.Regular,
					},
					{
						message: ` default `,
						style: MessageStyle.Code,
					},
					{
						message: 'type is assumed.',
						style: MessageStyle.Regular,
					},
				];
				message = [...message, ...undefinedTypeMessage];
				break;

			// IncorrectCaptionType example: captionType property of caption object on <ontario-input> was set to an incorrect type; only default, heading or large type is allowed. The default type is assumed.
			case MessageContentType.IncorrectCaptionType:
				let incorrectTypeMessage: ConsoleMessage[] = [
					{
						message: `was set to an incorrect type; only`,
						style: MessageStyle.Regular,
					},
					{
						message: ' default, heading, ',
						style: MessageStyle.Code,
					},
					{
						message: 'or',
						style: MessageStyle.Regular,
					},
					{
						message: ' large ',
						style: MessageStyle.Code,
					},
					{
						message: 'type is allowed. The',
						style: MessageStyle.Regular,
					},
					{
						message: ' default ',
						style: MessageStyle.Code,
					},
					{
						message: 'type is assumed.',
						style: MessageStyle.Regular,
					},
				];
				message = [...message, ...incorrectTypeMessage];
				break;
		}

		return message;
	}
}
