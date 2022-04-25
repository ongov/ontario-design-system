import { h } from '@stencil/core';
import { CaptionType, MessageContentType } from './input-caption.enum';
import { Caption } from './caption.interface';
import { ConsoleType } from '../../utils/console-message/console-message.enum';
import { printConsoleMessage } from '../../utils/console-message/console-message';
import { getWarningMessage } from './caption.message';

export class InputCaption implements Caption {
	/**
	 * The text to display as caption.
	 */
	captionText: string;

	/**
	 * The type of caption to render. Must be implemented.
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

	/**
	 * Set the class members
	 * Output a console warning message if the provided `label` type is incorrect
	 * @param caption object containing the essential data to configure the input label
	 */
	constructor(componentTagName: string, caption: InputCaption | string) {
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
		this.componentTagName = componentTagName;
		this.validateCaption(captionObject);
		this.captionText = captionObject?.captionText ?? '';
		this.captionType = (captionObject && captionObject?.captionType && Object.values(CaptionType).find(type => type === captionObject?.captionType?.toLowerCase())) || CaptionType.Default;
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
		return this.isRequired ? '(required)' : '(optional)';
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
	 * 2. the `caption.caption` text is not provided
	 * 3. the `caption.caption` text is empty
	 * 4. the `caption.captionType` is not provided
	 * 5. the `caption.captionType` is incorrect
	 */
	private validateCaption(caption?: InputCaption) {
		// undefined `caption` object
		if (!caption || Object.keys(caption).length <= 0) {
			printConsoleMessage(getWarningMessage(MessageContentType.UndefinedCaptionObject, this.componentTagName), ConsoleType.Warning);
		} else {
			// undefined `caption.caption` text
			if (!caption.captionText) {
				printConsoleMessage(getWarningMessage(MessageContentType.UndefinedCaption, this.componentTagName, this.getRequiredFlagText()), ConsoleType.Warning);
			} else {
				// empty `caption.caption` text
				if (caption.captionText.length <= 0) {
					printConsoleMessage(getWarningMessage(MessageContentType.EmptyCaption, this.componentTagName ,this.getRequiredFlagText()), ConsoleType.Warning);
				}
			}

			// undefined `caption.captionType` 
			if (!caption.captionType) {
				printConsoleMessage(getWarningMessage(MessageContentType.UndefinedCaptionType, this.componentTagName), ConsoleType.Warning);
			} else {
				// incorrect `caption.captionType`
				if (!Object.values(CaptionType).includes(caption?.captionType?.toLowerCase() as CaptionType)) {
					printConsoleMessage(getWarningMessage(MessageContentType.IncorrectCaptionType, this.componentTagName), ConsoleType.Warning);
				}
			}
		}
	}
}
