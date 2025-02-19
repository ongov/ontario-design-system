import { Component, h, Element, Prop, State, Watch } from '@stencil/core';

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
	@Element() element!: HTMLElement;

	/**
	 * The text value used for the legend of the fieldset.
	 */
	@Prop({ mutable: true }) legend: string;

	/**
	 * The size of the fieldset legend. If no prop is passed, it will be `default`.
	 */
	@Prop({ mutable: true }) legendSize: CaptionType = 'default';

	/**
	 * The following states are used to determine if the parent is a `ontario-vertical-form-spacing` component. This is to help style the form children if they are contained within a fieldset.
	 */
	@State() hasVerticalSpacingParent: boolean = false;
	@State() verticalSpacingValue: number = 40;

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

		// Check if the direct or any ancestor parent is `ontario-vertical-spacing`
		this.hasVerticalSpacingParent = this.element.closest('ontario-vertical-form-spacing') !== null;
		if (this.hasVerticalSpacingParent) {
			const verticalSpacingValue = this.element.closest('ontario-vertical-form-spacing')?.spacing;
			verticalSpacingValue === 'condensed' ? (this.verticalSpacingValue = 16) : (this.verticalSpacingValue = 40);
		}
	}

	private getLegendClass() {
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

	private getFieldsetClass() {
		let baseClass = 'ontario-fieldset';
		if (this.hasVerticalSpacingParent && this.verticalSpacingValue) {
			baseClass += `ontario-fieldset ontario-fieldset--spacing-${this.verticalSpacingValue}`;
		}
		return baseClass;
	}

	render() {
		return (
			<fieldset class={this.getFieldsetClass()}>
				<legend class={this.getLegendClass()}>
					{this.legendSize === 'heading' ? <h1>{this.legend}</h1> : this.legend}
				</legend>
				<slot />
			</fieldset>
		);
	}
}
