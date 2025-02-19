import { Component, Element, h, Prop } from '@stencil/core';

@Component({
	tag: 'ontario-vertical-form-spacing',
	styleUrl: 'ontario-vertical-form-spacing.scss',
	shadow: true,
})
export class OntarioVerticalFormSpacing {
	@Element() element: HTMLElement;

	/**
	 * Defines the spacing between slotted form elements.
	 * If no spacing prop is provided, it will default to 'default'.
	 */
	@Prop() spacing: 'default' | 'condensed' = 'default';

	/**
	 * Returns the pixel value for the selected spacing option.
	 */
	private getSpacingValue() {
		const spacingOptions = {
			default: '40',
			condensed: '16',
		};

		return spacingOptions[this.spacing] || spacingOptions.default;
	}

	render() {
		return (
			<div class={`ontario-vertical-form-spacing--${this.getSpacingValue()}`}>
				<slot />
			</div>
		);
	}
}
