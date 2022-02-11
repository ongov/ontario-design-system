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
	@Prop({ mutable: true }) hintId?: string;

	/**
	 * Used to used check if the parent component is a checkbox.
	 */
	@Prop({ mutable: true }) inputExists?: boolean = false;

	public getId(): string {
		return this.hintId ?? '';
	}

	/**
	 * Set `hint` using internal component logic
	 */
	componentWillLoad() {
		this.hint = this.hint ?? this.host.textContent ?? '';
		this.hintId = this.hintId ?? uuid();
	}

	render() {
		return (
			<p id={this.hintId} class={`ontario-hint ontario-hint__checkbox-exists-${this.inputExists}`} aria-hint={this.hint}>
				{this.hint}
			</p>
		);
	}
}
