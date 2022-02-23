import { Component, Prop, Element, h } from '@stencil/core';
import { v4 as uuid } from 'uuid';
import { Hint } from '../../utils/common.interface';

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

	public getId(): string {
		return this.elementId ?? '';
	}

	/**
	 * Set `hint` using internal component logic
	 */
	componentWillLoad() {
		this.hint = this.hint ?? this.host.textContent ?? '';
		this.elementId = this.elementId ?? uuid();
	}

	render() {
		return (
			<p id={this.getId()} class="ontario-hint" aria-hint={this.hint}>
				{this.hint}
			</p>
		);
	}
}
