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
	// componentName: string;

	/**
	 * Set the class members
	 * Output a console warning message if the provided `label` type is incorrect
	 * @param caption object containing the essential data to configure the input label
	 */
	constructor(caption: InputCaption) {
		this.isRequired = caption.isRequired;
		this.isLegend = caption.isLegend;
		// this.componentName = caption.componentName;

		if ((caption.caption && caption.caption.length <= 0) || !caption.caption) {
			printConsoleMessage(
				[
					{
						message: `${this.isLegend ? ' legend ' : ' label '}`,
						style: MessageStyle.Code,
					},
					{
						message: 'on',
						style: MessageStyle.Regular,
					},
					{
						// message: ` <${this.componentName}> `,
						message: ' <test component> ',
						style: MessageStyle.Code,
					},
					{
						message: 'is empty. A blank followed by the',
						style: MessageStyle.Regular,
					},
					{
						message: ` ${this.getRequiredFlagText()} `,
						style: MessageStyle.Code,
					},
					{
						message: 'flag is assumed.',
						style: MessageStyle.Regular,
					},
				],
				ConsoleType.Warning,
			);
		} 

		if (!Object.values(CaptionType).includes(caption?.captionType?.toLowerCase() as CaptionType)) {
			printConsoleMessage(
				[
					{
						message: `${this.isLegend ? ' legend ' : ' label '}`,
						style: MessageStyle.Code,
					},
					{
						message: 'on',
						style: MessageStyle.Regular,
					},
					{
						// message: ` <${this.componentName}> `,
						message: ' <test component> ',
						style: MessageStyle.Code
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
				],
				ConsoleType.Warning,
			);
		}
		this.caption = caption.caption ?? '';
		this.captionType = (caption && caption.captionType && Object.values(CaptionType).find(type => type === caption?.captionType?.toLowerCase())) || CaptionType.default;
	}

	/**
	 * Return the `<label>` element for text inputs
	 * @param isLabel Determine if the `<label>` is used, otherwise `<legend>` is used (for future expansion)
	 * @param captionFor Set the `htmlFor` attribute
	 * @returns element containing the caption for the input
	 */
	getCaption = (captionFor?: string): HTMLElement => {
		const captionContent = this.isLegend ? (
			<legend class={this.getClass()}>
				{this.caption}
				{this.getRequiredFlagElement()}
			</legend>
		) : (
			<label htmlFor={captionFor} class={this.getClass()}>
				{this.caption}
				{this.getRequiredFlagElement()}
			</label>
		);

		// with `this.captionType` already set to one of the enum values, the comparison no longer needs the `toLowerCase()` transform
		return this.captionType === CaptionType.heading ? <h1>{captionContent}</h1> : captionContent;
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
		return this.captionType === CaptionType.large || this.captionType === CaptionType.heading ? `ontario-label ontario-label--${this.captionType}` : `ontario-label`;
	}
}
