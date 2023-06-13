import { h } from '@stencil/core';
import { CaptionType, CaptionTypes } from './input-caption.types';
import { MessageContentType } from './input-caption.enum';
import { CaptionInfo, Caption } from './caption.interface';
import { ConsoleMessageClass } from '../../console-message/console-message';

export class InputCaption implements CaptionInfo {
	/**
	 * The text to display as caption.
	 */
	captionText: string;

	/**
	 * The type of caption to render.
	 */
	captionType?: CaptionType = 'default';

	/**
	 * Determine whether the input field is required.
	 */
	required?: boolean = false;

	/**
	 * Determine whether the rendered element is a `<label>` or `<legend>`.
	 */
	isLegend?: boolean = false;

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
	constructor(
		componentTagName: string,
		caption: Caption | string,
		translations: any,
		language: any,
		isLegend: boolean = false,
		required: boolean = false,
	) {
		let captionObject: Caption;

		if (typeof caption === 'string') {
			try {
				captionObject = JSON.parse(caption) as Caption;
			} catch {
				captionObject = { captionText: caption, captionType: 'default' };
			}
		} else {
			captionObject = caption;
		}

		this.componentTagName = componentTagName.toLocaleLowerCase();
		this.captionText = captionObject?.captionText;
		this.captionType =
			(captionObject?.captionType && CaptionTypes.find((type) => type === captionObject.captionType?.toLowerCase())) ||
			'default';
		this.required = required;
		this.isLegend = isLegend;
		this.translations = translations;
		this.language = language;

		this.validateCaption(this);
	}

	/**
	 * Return the `<label>` element for text inputs
	 * @param captionFor Set the `htmlFor` attribute
	 * @returns element containing the caption for the input
	 */
	getCaption = (captionFor?: string | undefined, hasHintExpander: boolean = false): HTMLElement => {
		const captionText = this.captionText && this.captionText.toLowerCase();
		const captionContent = this.isLegend ? (
			<legend class={this.getClass()}>
				{this.captionType === 'heading' ? <h1>{this.captionText}</h1> : this.captionText}
				{this.getRequiredFlagElement()}
				{hasHintExpander && this.getHintExpanderAccessibilityText(captionText, false)}
			</legend>
		) : (
			<label htmlFor={captionFor} class={this.getClass()}>
				{this.captionText}
				{this.getRequiredFlagElement()}
				{hasHintExpander && this.getHintExpanderAccessibilityText(captionText, false)}
			</label>
		);

		// with `this.captionType` already set to one of the enum values, the comparison no longer needs the `toLowerCase()` transform
		return this.captionType === 'heading' && !this.isLegend ? <h1>{captionContent}</h1> : captionContent;
	};

	getHintExpanderAccessibilityText(captionText: string, hasHintExpanderOnOption: boolean = false): HTMLElement {
		const multipleOptionsMessage = (
			<span class="ontario-show-for-sr">
				{this.translations.accessibility.moreInfo[this.language]} "{captionText.toLowerCase()}"{' '}
				{this.translations.accessibility.checkboxHintExpander[this.language]}
			</span>
		);

		const singleOptionMessage = (
			<span class="ontario-show-for-sr">
				{this.translations.accessibility.moreInfo[this.language]} "{captionText.toLowerCase()}"{' '}
				{this.translations.accessibility.singleHintExpander[this.language]}
			</span>
		);
		return this.componentTagName === 'ontario-checkboxes'
			? !hasHintExpanderOnOption
				? multipleOptionsMessage
				: singleOptionMessage
			: singleOptionMessage;
	}

	/**
	 * Determines which flag text to use between `required` and `optional`
	 * @returns `required` or `optional` flag text
	 */
	private getRequiredFlagText(): string {
		return this.required
			? this.translations && `(${this.translations.required[this.language]})`
			: this.translations && `(${this.translations.optional[this.language]})`;
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
		return this.captionType === 'large' || this.captionType === 'heading'
			? this.isLegend
				? `ontario-fieldset__legend ontario-fieldset__legend--${this.captionType}`
				: `ontario-label ontario-label--${this.captionType}`
			: this.isLegend
			? 'ontario-fieldset__legend'
			: 'ontario-label';
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
		let messageType;

		// undefined `caption` object
		if (!caption || Object.keys(caption).length <= 0) {
			messageType = MessageContentType.UndefinedCaptionObject;
		} else {
			// undefined `captionText` property
			if (!caption.captionText) {
				messageType = MessageContentType.UndefinedCaptionText;
			} else {
				// `captionText` that is empty or contains only spaces
				if (/^\s*$/.test(caption.captionText)) {
					messageType = MessageContentType.EmptyCaptionText;
				}
			}

			// undefined `captionType`
			if (!caption.captionType) {
				messageType = MessageContentType.UndefinedCaptionType;
			} else {
				// incorrect `captionType`
				if (!CaptionTypes.includes(caption?.captionType?.toLowerCase() as CaptionType)) {
					messageType = MessageContentType.IncorrectCaptionType;
				}
			}
		}

		if (messageType) {
			const message = new ConsoleMessageClass().addDesignSystemTag();

			if (messageType !== MessageContentType.UndefinedCaptionObject) {
				message
					.addMonospaceText(
						` ${
							messageType === MessageContentType.EmptyCaptionText ||
							messageType === MessageContentType.UndefinedCaptionText
								? 'caption or captionText'
								: 'captionType'
						} `,
					)
					.addRegularText('object or property of');
			}

			message.addMonospaceText(' caption ').addRegularText('object on').addMonospaceText(` ${this.componentTagName} `);
			this.printConsoleMessage(messageType, message, this.getRequiredFlagText());
		}
	}

	/**
	 * Generate the content of warning message to be printed to the console
	 * @param messageType determine the content of warning message to output
	 * @param componentTagName the tag name of the component that's emitting the warning message
	 * @param requiredFlagText accepts a string value to be used as the required flag text and defaults to `(optional)` if not set
	 * @returns an array of `ConsoleMessage` objects containing the message and associated styles to be printed to the console
	 */
	private printConsoleMessage(
		messageType: MessageContentType,
		message: ConsoleMessageClass,
		requiredFlagText: string = '(optional)',
	) {
		switch (messageType) {
			// undefinedCaptionObject example: caption object on <ontario-input> is required but not defined. A blank followed by a (optional) flag is assumed.
			// undefinedCaptionText example: captionText property of caption object on <ontario-input> is required but not defined. A blank followed by a (optional) flag is assumed.
			// EmptyCaptionText example: captionText property of caption object on <ontario-input> is empty or contains only spaces. A blank followed by a (optional) flag is assumed.
			case MessageContentType.UndefinedCaptionObject:
			case MessageContentType.UndefinedCaptionText:
			case MessageContentType.EmptyCaptionText:
				message
					.addRegularText(
						`${
							messageType === MessageContentType.EmptyCaptionText
								? 'is empty or contains only spaces'
								: 'is required but not defined'
						}. A blank followed by a`,
					)
					.addMonospaceText(` ${requiredFlagText} `)
					.addRegularText('flag is assumed.');
				break;

			// UndefinedCaptionType example: captionType property of caption object on <ontario-input> is not defined. The default type is assumed.
			case MessageContentType.UndefinedCaptionType:
				message.addRegularText('is not defined. The').addMonospaceText(' default ').addRegularText('type is assumed.');
				break;

			// IncorrectCaptionType example: captionType property of caption object on <ontario-input> was set to an incorrect type; only default, heading or large type is allowed. The default type is assumed.
			case MessageContentType.IncorrectCaptionType:
				message
					.addRegularText('was set to an incorrect type; only')
					.addMonospaceText(' default, heading, ')
					.addRegularText('or')
					.addMonospaceText(' large ')
					.addRegularText('type is allowed. The')
					.addMonospaceText(' default ')
					.addRegularText('type is assumed.');
				break;
		}

		message.printMessage();
	}
}
