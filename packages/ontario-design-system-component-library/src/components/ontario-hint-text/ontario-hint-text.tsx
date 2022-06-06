import { Component, Prop, Element, h, Watch, State } from '@stencil/core';
import { v4 as uuid } from 'uuid';
import { Hint } from '../../utils/common.interface';
import { validatePropExists } from '../../utils/validation/validation-functions';
import { ConsoleMessageClass } from '../../utils/console-message/console-message';

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
	@Prop() hint: string;

	@State() hintState: string;

	/*
	 * Watch for changes in the `hint` variable for validation purposes.
	 * If hint is not provided, set hint to Element Content (if it exists).
	*/
	@Watch('hint')
	private updateHintContent() {
		this.hintState = this.hint ?? this.host.textContent ?? '';
		this.validateHintContent(this.hintState);
	}

	/*
	 * Used to used to establish a relationship between hint text content and elements using aria-describedby.
	 */
	@Prop({ mutable: true }) elementId?: string;

	/*
	 * Validate the hint and make sure the hint has a value.
	 * Log warning if user doesn't input a value for the hint or element content.
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
	 * Set `hint` using internal component logic
	 */
	componentWillLoad() {
		this.updateHintContent();
		this.elementId = this.elementId ?? uuid();
	}

	render() {
		return (
			<p id={this.getId()} class="ontario-hint">
				{this.hintState}
			</p>
		);
	}
}
