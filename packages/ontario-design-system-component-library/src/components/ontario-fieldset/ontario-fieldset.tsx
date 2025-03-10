import { Component, h, Element, Prop, State, Watch } from '@stencil/core';

import { Fieldset } from './ontario-fieldset.interface';

import { CaptionType, CaptionTypes } from '../../utils/common/input-caption/input-caption.types';
import { ConsoleMessageClass } from '../../utils/console-message/console-message';
import { validatePropExists, validateValueAgainstArray } from '../../utils/validation/validation-functions';
import { OntarioFormContainer, FormGap } from '../../utils/components/form-container/form-container.interface';

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
	 * The following states are used to determine if the parent is a `ontario-form-container` component.
	 * This is to help style the form children if they are contained within a fieldset.
	 */
	@State() hasFormContainerParent: boolean = false;

	/**
	 * The spacing value applied to fieldset elements when inside an `ontario-form-container`.
	 * This ensures consistent vertical spacing between form elements when they are grouped inside a fieldset.
	 */
	@State() gapValue: FormGap = FormGap.Default;

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

			return (this.legendSize = 'default'); // Ensure hydration matches server render for SSR compatibility
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
		this.initializeFormContainerSettings();
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
		if (this.hasFormContainerParent && (this.gapValue === FormGap.Condensed || this.gapValue === FormGap.Default)) {
			baseClass += ` ontario-fieldset--gap-${this.gapValue}`;
		}
		return baseClass;
	}

	// Check if the direct or any ancestor parent is `ontario-form-container`
	private initializeFormContainerSettings(): void {
		this.hasFormContainerParent = this.element.closest('ontario-form-container') !== null;
		const formContainer = this.element.closest('ontario-form-container') as OntarioFormContainer | null;
		if (formContainer) {
			this.gapValue = formContainer.gap === 'condensed' ? FormGap.Condensed : FormGap.Default;
		}
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
