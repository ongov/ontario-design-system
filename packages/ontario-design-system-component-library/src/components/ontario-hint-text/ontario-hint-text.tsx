import { Component, Prop, Element, h, Watch } from '@stencil/core';
import { v4 as uuid } from 'uuid';
import { Hint } from '../../utils/common.interface';
import { validatePropExists } from '../../utils/validation/validation-functions';
import { ConsoleType, MessageStyle } from '../../utils/console-message/console-message.enum';
import { printConsoleMessage } from '../../utils/console-message/console-message';

/**
 * Ontario Design System hint text web component
 */
@Component({
	tag: 'ontario-hint-text',
	styleUrl: 'ontario-hint-text.scss',
	shadow: true,
})
export class OntarioHintText implements Hint {
	@Element() host: HTMLElement;

	/**
	 * Text to display as the hint text statement.
	 *
	 * Setting the hint can be done using the element content or setting the
	 * this property.  This property will take precedence.
	 *
	 * @example
	 * <ontario-hint-text hint="Override Hint Text">Hint Text</ontario-button>
	 *
	 * The resulting hint text will display `"Override Hint Text"`.
	 */
	@Prop({ mutable: true }) hint: string;

	/**
	 * Used to used to establish a relationship between hint text content and elements using aria-describedby.
	 */
	@Prop({ mutable: true }) elementId?: string;

	/*
	 * Watch for changes in the `label` variable for validation purpose
	 * Validate the label and make sure the label has a value.
	 * Log error if user doesn't input a value for the label or element content.
	 */
	@Watch('hint')
	validateHintContent(newValue: string) {
		// If element content is not provided, check whether prop exists
		if (!this.host.textContent) {
			const isHintBlank = validatePropExists(newValue);
			if (isHintBlank) {
				printConsoleMessage([
					{
						message: ' hint ',
						style: MessageStyle.Code,
					},
					{
						message: 'for',
						style: MessageStyle.Regular,
					},
					{
						message: ` <ontario-hint-text> `,
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

	public getId(): string {
		return this.elementId ?? '';
	}

	/**
	 * Set `hint` using internal component logic
	 */
	componentWillLoad() {
		this.hint = this.hint ?? this.host.textContent ?? '';
		this.elementId = this.elementId ?? uuid();
		this.validateHintContent(this.hint);
	}

	render() {
		return (
			<p id={this.getId()} class="ontario-hint">
				{this.hint}
			</p>
		);
	}
}
