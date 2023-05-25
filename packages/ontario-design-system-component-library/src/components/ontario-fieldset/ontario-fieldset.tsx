import { Component, h, Prop, Watch } from '@stencil/core';

import { Fieldset } from './ontario-fieldset.interface';

import { CaptionType, CaptionTypes } from '../../utils/common/input-caption/input-caption.types';
import { ConsoleMessageClass } from '../../utils/console-message/console-message';
import { validatePropExists, validateValueAgainstArray } from '../../utils/validation/validation-functions';

@Component({
	tag: 'ontario-fieldset',
	styleUrl: 'ontario-fieldset.scss',
	shadow: true,
})
export class OntarioFieldset implements Fieldset {
	/**
	 * The text value used for the legend of the fieldset.
	 */
	@Prop({ mutable: true }) legend: string;

	/**
	 * The size of the fieldset legend. If no prop is passed, it will be `default`.
	 */
	@Prop({ mutable: true }) legendSize: CaptionType = 'default';

	/**
	 * Watch for changes to the legendSize prop.
	 * This is for validation purposes to make sure the legendSize matches one of the CaptionTypes.
	 */
	@Watch('legendSize')
	validateLegendSize() {
		const isValid = validateValueAgainstArray(this.legendSize, CaptionTypes);

		if (isValid) {
			return this.legendSize;
		} else {
			const message = new ConsoleMessageClass();
			message
				.addDesignSystemTag()
				.addMonospaceText(` legendSize ${this.legendSize} `)
				.addRegularText('for')
				.addMonospaceText(' <ontario-fieldset> ')
				.addRegularText('is not a valid type. A default size will be applied.')
				.printMessage();

			return 'default';
		}
	}

	/*
	 * Watch for changes in the `legend` prop for validation purposes.
	 */
	@Watch('legend')
	validateLegend() {
		this.validateLegendText(this.legend);
	}

	/**
	 * Print the legend warning message
	 */
	validateLegendText(newValue: string) {
		if (validatePropExists(newValue)) {
			const message = new ConsoleMessageClass();
			message
				.addDesignSystemTag()
				.addMonospaceText(' legend ')
				.addRegularText('for')
				.addMonospaceText(' <ontario-fieldset> ')
				.addRegularText('was not provided')
				.printMessage();
		}
	}
	componentWillLoad() {
		this.validateLegend();
		this.validateLegendSize();
	}

	private getClass() {
		switch (this.legendSize) {
			case 'large':
				return `ontario-fieldset__legend ontario-fieldset__legend--large`;
			case 'heading':
				return `ontario-fieldset__legend ontario-fieldset__legend--heading`;
			case 'default':
			default:
				return `ontario-fieldset__legend`;
		}
	}

	render() {
		return (
			<div class="ontario-form-group">
				<fieldset class="ontario-fieldset">
					<legend class={this.getClass()}>
						{this.legendSize === 'heading' ? <h1>{this.legend}</h1> : this.legend}
					</legend>
					<slot />
				</fieldset>
			</div>
		);
	}
}
