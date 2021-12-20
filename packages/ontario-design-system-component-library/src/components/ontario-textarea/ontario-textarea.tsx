import {
	Component,
	Event,
  EventEmitter,
	h,
	Prop,
	State
} from '@stencil/core';

@Component({
  tag: 'ontario-textarea',
  styleUrl: 'ontario-textarea.scss',
  shadow: false,
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
	 * The name value for the textarea
	 */
	@Prop() name: string;

	/**
   * If `true`, the user must fill in a value before submitting a form.
   */
  @Prop() required: boolean = false;

	/**
   * The value of the input.
   */
  @Prop({ mutable: true }) value?: string | null = ''

	/**
   * Emitted when the input loses focus.
   */
  @Event() blurEvent!: EventEmitter<void>;

	/**
   * Emitted when a keyboard input occurred.
   */
  @Event() changeEvent!: EventEmitter<KeyboardEvent>

	@State() focused: boolean = false;

	private onBlur = () => {
    this.blurEvent.emit();
    this.focused = false;
  }

	private onChange = (ev: Event) => {
    const textarea = ev.target as HTMLInputElement | null;

    if (textarea) {
      this.value = textarea.value || '';
    };

    this.changeEvent.emit(ev as KeyboardEvent)
  }

	private getValue(): string {
    return this.value || ''
  }

  render() {
		const value = this.getValue();

    return (
			<textarea
				aria-describedby={this.describedBy}
				class="ontario-textarea"
				id={this.textareaId}
				name={this.name}
				onBlur={this.onBlur}
				value={value}
				onInput={this.onChange}
				required={this.required}
			></textarea>
    );
  }
};
