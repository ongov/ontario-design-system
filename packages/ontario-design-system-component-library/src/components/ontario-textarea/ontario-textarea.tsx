import { Component, Event, EventEmitter, h, Prop, State } from '@stencil/core';

@Component({
	tag: 'ontario-textarea',
	styleUrl: 'ontario-textarea.scss',
	shadow: true,
})
export class OntarioTextarea {
	/**
	 * The unique identifier of the textarea
	 */
	@Prop({ attribute: 'id' }) textareaId: string;

	/**
	 * The aria-desribedBy value if the textarea has hint text associated with it
	 */
	@Prop() describedBy?: string;

	/**
	 * The name assigned to the textarea.The name value is used to reference form data after a form is submitted
	 */
	@Prop() name: string;

	/**
	 * Used to define whether the textarea field is required or not. If required, the value passed should be 'required'
	 */
	@Prop() required?: boolean = false;

	/**
	 * The textarea content value.
	 */
	@Prop({ mutable: true }) value?: string | null | undefined = undefined;

	/**
	 * Emitted when the input loses focus.
	 */
	@Event() blurEvent!: EventEmitter<void>;

	/**
	 * Emitted when a keyboard input occurred.
	 */
	@Event() changeEvent!: EventEmitter<KeyboardEvent>;

	@State() focused?: boolean = false;

	private onBlur = () => {
		this.blurEvent.emit();
		this.focused = false;
	};

	private onChange = (ev: Event) => {
		const textarea = ev.target as HTMLInputElement | null;

		if (textarea) {
			this.value = textarea.value ?? '';
		}

		this.changeEvent.emit(ev as KeyboardEvent);
	};

	private getValue(): string {
		return this.value ?? '';
	}

	render() {
		return (
			<textarea
				aria-describedby={this.describedBy}
				class="ontario-textarea"
				id={this.textareaId}
				name={this.name}
				onBlur={this.onBlur}
				value={this.getValue()}
				onInput={this.onChange}
				required={this.required}
			></textarea>
		);
	}
}
