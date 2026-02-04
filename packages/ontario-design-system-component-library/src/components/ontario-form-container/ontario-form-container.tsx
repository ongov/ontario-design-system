import { Component, Element, h, Prop } from '@stencil/core';

import { FormGap } from '../../utils/components/form-container/form-container.interface';

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
	private getGapValue(): FormGap {
		const gapOptions: { [key: string]: FormGap } = {
			default: FormGap.Default,
			condensed: FormGap.Condensed,
		};

		return gapOptions[this.gap] || FormGap.Default;
	}

	render() {
		return (
			<div class={`ontario-form-container--gap-${this.getGapValue()}`}>
				<slot />
			</div>
		);
	}
}
