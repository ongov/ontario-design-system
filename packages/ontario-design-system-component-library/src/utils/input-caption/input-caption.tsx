import { h } from '@stencil/core';
import { CaptionType } from './input-caption.enum';
import { Caption } from './caption.interface';
import { ConsoleType, MessageStyle } from '../../utils/console-message/console-message.enum';
import { printConsoleMessage } from '../../utils/console-message/console-message';

export class InputCaption implements Caption {
	/**
	 * The text to display as caption.
	 */
	caption: string;

	/**
	 * The type of caption to render. Must be implemented.
	 */
	captionType: CaptionType = CaptionType.default;

	/**
	 * Determine whether the input field is required.
	 */
	isRequired: boolean = false;

	/**
	 * Set the class members
	 * Output a console warning message if the provided `label` type is incorrect
	 * @param caption object containing the essential data to configure the input label
	 */
	constructor(caption: InputCaption) {
		this.caption = caption.caption;
		this.isRequired = caption.isRequired;

		if (!Object.values(CaptionType).includes(caption?.captionType?.toLowerCase() as CaptionType)) {
			printConsoleMessage(
				[
					{
						message: ' label ',
						style: MessageStyle.Code,
					},
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
						message: 'is allowed. The',
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
				],
				ConsoleType.Warning,
			);
		}
		this.captionType = (caption && caption.captionType && Object.values(CaptionType).find(type => type === caption?.captionType?.toLowerCase())) || CaptionType.default;
	}

	/**
	 * Return the `<label>` element for text inputs
	 * @param isLabel Determine if the `<label>` is used, otherwise `<legend>` is used (for future expansion)
	 * @param captionFor Set the `htmlFor` attribute
	 * @returns element containing the caption for the input
	 */
	getCaption = (isLabel = false, captionFor?: string): HTMLElement => {
		const captionContent = isLabel ? (
			<label htmlFor={captionFor} class={this.getClass()}>
				{this.caption}
				{this.getRequiredFlag()}
			</label>
		) : (
			<legend class={this.getClass()}>
				{this.caption}
				{this.getRequiredFlag()}
			</legend>
		);

		// with `this.captionType` already set to one of the enum values, the comparison no longer needs the `toLowerCase()` transform
		return this.captionType === CaptionType.heading ? <h1>{captionContent}</h1> : captionContent;
	};

	/**
	 * Get the HTML for the required/optional flag.
	 * @returns CSS class for the label/legend.
	 */
	private getRequiredFlag(): HTMLElement {
		const flagText = this.isRequired ? '(required)' : '(optional)';
		return <span class="ontario-label__flag">{flagText}</span>;
	}

	/**
	 * Get the CSS class for the `label` element.
	 * @returns CSS class for the `label` element.
	 */
	private getClass(): string {
		return this.captionType === CaptionType.large || this.captionType === CaptionType.heading ? `ontario-label ontario-label--${this.captionType}` : `ontario-label`;
	}
}
