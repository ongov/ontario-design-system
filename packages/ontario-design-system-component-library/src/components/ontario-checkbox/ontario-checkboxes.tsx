import { Component, h, Prop, Element, Event, EventEmitter, Listen, State, Watch } from '@stencil/core';
import { CheckboxOption } from './checkbox-option.interface';
import { Checkboxes } from './checkboxes.interface';
import { InputCaption } from '../../utils/input-caption/input-caption';
import { Caption } from '../../utils/input-caption/caption.interface';
import { HintExpander } from '../ontario-hint-expander/hint-expander.interface';
import { validateObjectExists, validatePropExists } from '../../utils/validation/validation-functions';
import { ConsoleMessageClass } from '../../utils/console-message/console-message';
import { default as translations } from '../../translations/global.i18n.json';

/**
 * Ontario Checkbox component
 */
@Component({
	tag: 'ontario-checkboxes',
	styleUrl: 'ontario-checkboxes.scss',
	shadow: true,
})
export class OntarioCheckboxes implements Checkboxes {
	/**
	 * Grant access to the host element and related DOM methods/events within the class instance.
	 */
	@Element() element: HTMLElement;

	/**
	 * The text to display as the label
	 *
	 * @example
	 * <ontario-checkboxes
	 *   caption='{
	 *     "captionText": "Address",
	 *     "captionType": "heading",
	 *   }
	 *   ...>
	 * </ontario-checkboxes>
	 */
	@Prop() caption: Caption | string;

	/**
	 * The language of the component.
	 * This is used for translations, and is by default set through event listeners checking for a language property from the header. If none is passed, it will default to English.
	 */
	@Prop({ mutable: true }) language?: string = 'en';

	/**
	 * The name for the checkboxes.
	 */
	@Prop() name: string;

	/**
	 * Define hint text on an element. This is optional.
	 */
	@Prop() hintText?: string;

	/**
   * Used to include the Hint Expander component underneath the Checkbox Legend.
   * This is passed in as an object with key-value pairs.
	 * This is optional.
   *
   * @example
   * <ontario-checkboxes
   *   caption='{
	 *     "captionText": "Address",
	 *     "captionType": "heading",
	 *   }
   *   name='ontario-checkboxes'
   *   options='[{
   *     "value": "checkbox-1-value",
   *     "label": "Checkbox Label",
   *     "hintExpander": {
   *			  "hint": "Hint expander",
   * 		    "content": "This is the content"
   *		 }
   *   }]'
   *   hint-expander='{
   *    "hint": "Hint expander",
   *    "content": "This is the content, yup this is the content"
      }'
			required="true"
   * >
   * </ontario-checkboxes>
   */
	@Prop() hintExpander?: HintExpander | string;

	/**
	 * Each property will be passed in through an object in the options array.
	 * This can either be passed in as an object directly (if using react), or as a string in HTML.
	 * If there are multiple checkboxes in a fieldset, each checkbox will be displayed as an option.
	 * In the example below, the options are being passed in as a string and
	 * there are two checkboxes to be displayed in the fieldset.
	 *
	 * @example
	 * <ontario-checkboxes
	 *   caption='{
	 *     "captionText": "Address",
	 *     "captionType": "heading",
	 *   }
	 *   name="ontario-checkboxes",
	 *   hint-text="This is the hint text"
	 *   options='[
	 *     {
	 *        "value": "checkbox-1-value",
	 *        "label": "Checkbox Label"
	 *     },
	 *     {
	 *        "value": "checkbox-2",
	 *        "label": "checkbox-2-label",
	 *        "hintExpander": {
	 *          "hint": "Hint expander",
	 *          "content": "This is the content"
	 *        }
	 *      }
	 *   ]'
	 *   required="true"
	 * >
	 * </ontario-checkboxes>
	 */
	@Prop() options: CheckboxOption[] | string;

	/**
	 * This is used to determine whether the checkbox is required or not.
	 * This prop also gets passed to the InputCaption utility to display either an optional or required flag in the label.
	 * If no prop is set, it will default to false (optional).
	 */
	@Prop() required?: boolean = false;

	/**
	 * Instantiate an InputCaption object for internal logic use
	 */
	@State() private captionState: InputCaption;

	/**
	 * The hint expander options are re-assigned to the internalHintExpander array.
	 */
	@State() private internalHintExpander: HintExpander;

	/**
	 * The options are re-assigned to the internalOptions array.
	 */
	@State() private internalOptions: CheckboxOption[];

	/**
	 * Emitted when a keyboard input or mouse event occurs.
	 */
	@Event() changeEvent!: EventEmitter<KeyboardEvent>;

	/**
	 * This listens for the `setAppLanguage` event sent from the test language toggler when it is is connected to the DOM. It is used for the initial language when the input component loads.
	 */
	@Listen('setAppLanguage', { target: 'window' })
	handleSetAppLanguage(event: CustomEvent<string>) {
		this.language = event.detail;
	}

	@Listen('headerLanguageToggled', { target: 'window' })
	handleHeaderLanguageToggled(event: CustomEvent<string>) {
		const toggledLanguage = event.detail;
		this.language = toggledLanguage;
	}

	@Watch('hintExpander')
	private parseHintExpander() {
		const hintExpander = this.hintExpander;
		if (hintExpander) {
			if (typeof hintExpander === 'string') this.internalHintExpander = JSON.parse(hintExpander);
			else this.internalHintExpander = hintExpander;
		}
	}

	@Watch('options')
	parseOptions() {
		if (typeof this.options !== 'undefined') {
			if (!Array.isArray(this.options)) {
				this.internalOptions = JSON.parse(this.options);
			} else {
				this.internalOptions = this.options;
			}
		}
		this.validateOptions(this.internalOptions);
	}

	/**
	 * Validate the options and make sure the options has a value.
	 * Log warning if user doesn't input a value for the options.
	 * @param newValue object to be validated
	 */
	validateOptions(newValue: object) {
		if (validateObjectExists(newValue)) {
			const message = new ConsoleMessageClass();
			message.addDesignSystemTag().addMonospaceText(' options ').addRegularText('for').addMonospaceText(' <ontario-checkboxes> ').addRegularText('was not provided').printMessage();
		}
	}

	/*
	 * Watch for changes in the `name` prop for validation purpose
	 * Validate the name and make sure the name has a value.
	 * Log warning if user doesn't input a value for the name.
	 */
	@Watch('name')
	validateName(newValue: string) {
		if (validatePropExists(newValue)) {
			const message = new ConsoleMessageClass();
			message.addDesignSystemTag().addMonospaceText(' name ').addRegularText('for').addMonospaceText(' <ontario-checkboxes> ').addRegularText('was not provided').printMessage();
		}
	}

	@Watch('caption')
	updateCaptionState(newValue: Caption | string) {
		this.captionState = new InputCaption(this.element.tagName, newValue, translations, this.language, true, this.required);
	}

	/**
	 * Watch for changes in the `language` to render either the English or French translations
	 */
	@Watch('language')
	updateLanguage() {
		this.updateCaptionState(this.caption);
	}

	handleChange = (ev: Event) => {
		const input = ev.target as HTMLInputElement | null;

		if (input) {
			input.checked = input.checked ?? '';
		}

		this.changeEvent.emit(ev as any);
	};

	componentWillLoad() {
		this.updateCaptionState(this.caption);
		this.parseOptions();
		this.parseHintExpander();
		this.validateName(this.name);
	}

	render() {
		return (
			<div class="ontario-form-group">
				<fieldset class="ontario-fieldset">
					{this.captionState.getCaption()}
					{this.hintText && <ontario-hint-text hint={this.hintText}></ontario-hint-text>}

					<div class="ontario-checkboxes">
						{this.internalOptions?.map(checkbox => (
							<div class="ontario-checkboxes__item">
								<input
									class="ontario-checkboxes__input"
									id={checkbox.value}
									name={this.name}
									type="checkbox"
									value={checkbox.value}
									checkbox-label={checkbox.label}
									onChange={this.handleChange}
									required={!!this.required}
								/>
								<label class="ontario-checkboxes__label" htmlFor={checkbox.value}>
									{checkbox.label}
								</label>

								<div class="ontario-checkboxes__hint-expander">
									{checkbox.hintExpander && <ontario-hint-expander hint={checkbox.hintExpander.hint} content={checkbox.hintExpander.content} input-exists></ontario-hint-expander>}
								</div>
							</div>
						))}

						{this.internalHintExpander && (
							<ontario-hint-expander hint={this.internalHintExpander.hint} content={this.internalHintExpander.content} input-exists></ontario-hint-expander>
						)}
					</div>
				</fieldset>
			</div>
		);
	}
}
