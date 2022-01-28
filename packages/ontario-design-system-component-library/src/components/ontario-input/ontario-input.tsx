import { Component, Event, EventEmitter, h, Prop, State } from '@stencil/core';
import { v4 as uuid } from 'uuid';
import { TextInput } from './input.interface';
import { Label } from '../../utils/label/label.interface';
import { getLabelElement } from '../../utils/label/label';

/**
 * Ontario Input component
 */
@Component({
	tag: 'ontario-input',
	styleUrl: 'ontario-input.scss',
	shadow: true,
})
export class OntarioInput implements TextInput, Label {
	/**
	 * The text to display as label.
	 */
	@Prop() labelCaption: string;

	/**
	 * The form control with which the caption is associated.
	 */
	@Prop({ mutable: true }) labelFor?: string;

	/**
	 * The type of label to render.
	 */
	@Prop() labelType: 'default' | 'large' | 'heading' = 'default';

	/**
	 * The aria-describedBy value if the input has hint text associated with it.
	 */
	@Prop() describedBy?: string;

	/**
	 * The unique identifier of the input. If no ID is passed, one will be autogenerated.
	 */
	@Prop({ mutable: true }) elementId?: string;

	/**
	 * The width of the input field. If no value is assigned, it will present as the default input width.
	 */
	@Prop() inputWidth: '2-char-width' | '3-char-width' | '4-char-width' | '5-char-width' | '7-char-width' | '10-char-width' | '20-char-width' | 'default' = 'default';

	/**
	 * The name assigned to the input.The name value is used to reference form data after a form is submitted.
	 */
	@Prop() name: string;

	/**
	 * Used to define whether the input field is required or not.
	 */
	@Prop({ mutable: true }) required: boolean = false;

	/**
	 * The input type value.
	 */
	@Prop() type: 'text' | 'tel' | 'email' | 'password' = 'text';

	/**
	 * The input content value.
	 */
	@Prop({ mutable: true }) value?: string;

	/**
	 * Emitted when the input loses focus.
	 */
	@Event() blurEvent!: EventEmitter<void>;

	/**
	 * Emitted when the input gains focus.
	 */
	@Event() focusEvent!: EventEmitter<void>;

	/**
	 * Emitted when a keyboard input occurred.
	 */
	@Event() changeEvent!: EventEmitter<KeyboardEvent>;

	@State() focused: boolean = false;

	handleBlur = () => {
		this.focused = false;
	};

	handleFocus = () => {
		this.focused = true;
	};

	handleChange = (ev: Event) => {
		const input = ev.target as HTMLInputElement | null;

		if (input) {
			this.value = input.value ?? '';
		}

		this.changeEvent.emit(ev as KeyboardEvent);
	};

	private getValue(): string | number {
		return this.value ?? '';
	}

	private getClass(): string {
		return this.inputWidth === 'default' ? 'ontario-input' : `ontario-input ontario-input--${this.inputWidth}`;
	}

	public getId(): string {
		return this.elementId ?? '';
	}

	componentWillLoad() {
		this.elementId = this.elementId ?? uuid();
	}

	render() {
		return (
			<div>
				{getLabelElement(this.labelType, this.getId(), this.required, this.labelCaption)}
				<slot name="hint-text"></slot>
				<input
					aria-describedby={this.describedBy}
					class={this.getClass()}
					id={this.getId()}
					name={this.name}
					onBlur={this.handleBlur}
					onFocus={this.handleFocus}
					onInput={this.handleChange}
					required={this.required}
					type={this.type}
					value={this.getValue()}
				/>
				<slot name="hint-expander"></slot>
			</div>
		);
	}
}
