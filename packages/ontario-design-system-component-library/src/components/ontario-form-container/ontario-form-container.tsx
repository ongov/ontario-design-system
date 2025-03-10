import { Component, Element, h, Prop } from '@stencil/core';

import { FormGapCondensed, FormGapDefault } from '../../utils/components/form-container/form-container.interface';

@Component({
	tag: 'ontario-form-container',
	styleUrl: 'ontario-form-container.scss',
	shadow: true,
})
export class OntarioFormContainer {
	@Element() element: HTMLElement;

	/**
	 * Defines the gap (bottom margin) between slotted form elements.
	 * If no gap prop is provided, it will default to 'default'.
	 */
	@Prop() gap: 'default' | 'condensed' = 'default';

	/**
	 * Returns the pixel value for the selected gap option.
	 */
	private getGapValue() {
		const gapOptions = {
			default: FormGapDefault, // 40 (number)
			condensed: FormGapCondensed, // 16 (number)
		};

		return gapOptions[this.gap] || gapOptions.default;
	}

	render() {
		return (
			<div class={`ontario-form-container--gap-${this.getGapValue()}`}>
				<slot />
			</div>
		);
	}
}
