import { Component, Prop, Element, h, Watch, State, Method } from '@stencil/core';
import { v4 as uuid } from 'uuid';

import { Hint, HintContentType } from '../../utils/common/common.interface';

import { validatePropExists } from '../../utils/validation/validation-functions';
import { ConsoleMessageClass } from '../../utils/console-message/console-message';

/**
 * Use hint text to help users understand how to complete fields in a form.
 *
 * @part hint-text - The container for the hint text content. This part can be used to apply custom styles to the hint text.
 */
@Component({
	tag: 'ontario-hint-text',
	styleUrl: 'ontario-hint-text.scss',
	shadow: true,
})
export class OntarioHintText implements Hint {
	@Element() host: HTMLElement;

	/**
	 * The content type of the hint.
	 * If no prop is passed, it will default to a string.
	 * If the hint requires multiple lines or HTML, the `hintContentType` prop should be set to `html`.
	 */
	@Prop({ mutable: true }) hintContentType?: HintContentType = 'string';

	/**
	 * Text to display as the hint text statement.
	 *
	 * Setting the hint can be done using the host element textContent or through setting this property.  This property will take precedence.
	 *
	 * @example
	 * <ontario-hint-text hint="Override Hint Text">Hint Text</ontario-button>
	 *
	 * The resulting hint text will display `"Override Hint Text"`.
	 */
	@Prop() hint: string;

	/*
	 * Used to establish a relationship between the hint text content and elements using aria-describedby. This is optional -  if no ID is provided, one will be generated.
	 */
	@Prop({ mutable: true }) elementId?: string;

	@State() hintState: string;

	/**
	 * @part hint-text - The container for the hint text content. This part can be used to apply custom styles to the hint text.
	 */

	/**
	 * Watch for changes to the `hintContentType` prop for validation purposes.
	 * If none is provided, or the wrong type is provided, it will default to `string`.
	 */
	@Watch('hintContentType')
	private checkHintContentType() {
		if (this.hintContentType !== 'string' && this.hintContentType !== 'html') {
			const message = new ConsoleMessageClass();
			message
				.addDesignSystemTag()
				.addMonospaceText(' hintContentType ')
				.addRegularText('for')
				.addMonospaceText(' <ontario-hint-text> ')
				.addRegularText('was not one of the permitted types. A default type of `string` will be applied.')
				.printMessage();

			return (this.hintContentType = 'string');
		}

		return this.hintContentType;
	}

	/*
	 * Watch for changes in the `hint` prop for validation purposes.
	 * If no `hint` prop is provided, the `hint` will be set to the host element textContent (if it exists).
	 */
	@Watch('hint')
	private updateHintContent() {
		this.hintState = this.hint ?? this.host.textContent ?? '';
		this.validateHintContent(this.hintState);
	}

	/*
	 * Validate the `hint` and make sure the `hint` has a value.
	 * Log a warning if user doesn't input a value for the `hint` or element content.
	 */
	validateHintContent(newValue: string) {
		// If element content is not provided, check whether prop exists
		if (!this.host.textContent) {
			if (validatePropExists(newValue)) {
				const message = new ConsoleMessageClass();
				message
					.addDesignSystemTag()
					.addMonospaceText(' hint ')
					.addRegularText('for')
					.addMonospaceText(' <ontario-hint-text> ')
					.addRegularText('was not provided')
					.printMessage();
			}
		}
	}

	public getId(): string {
		return this.elementId ?? '';
	}

	/**
	 * This method returns the ontario-hint-text id. It is used to make sure the hint text and `aria-describedby` value of other form components match when the internal hint text props are used.
	 *
	 * @returns {Promise<string | undefined>} The ID of the hint text element, or undefined if no ID is set.
	 */
	@Method()
	async getHintTextId(): Promise<string | undefined> {
		return this.elementId;
	}

	/**
	 * Set `hint` using internal component logic
	 */
	componentWillLoad() {
		this.updateHintContent();
		this.checkHintContentType();
		this.elementId = this.elementId ?? uuid();
	}

	/**
	 * This helper is used to help load translations for any slots + text content passed in by the user.
	 */
	componentDidLoad() {
		const observer = new MutationObserver((mutations) => {
			mutations.forEach((mutation) => {
				if (mutation.type === 'attributes') {
					this.updateHintContent();
				}
			});
		});

		const options = { attributes: true };
		observer.observe(this.host, options);
	}

	render() {
		return this.hintContentType === 'string' ? (
			<p part="hint-text" id={this.getId()} class="ontario-hint">
				{this.hintState}
			</p>
		) : (
			<div id={this.getId()} class="ontario-hint" innerHTML={this.hintState}></div>
		);
	}
}
