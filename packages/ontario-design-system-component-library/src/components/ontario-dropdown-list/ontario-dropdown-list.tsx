import { Component, State, Element, h, Prop, Listen, Watch, getAssetPath } from '@stencil/core';
import { InputCaption } from '../../utils/input-caption/input-caption';
import { Caption } from '../../utils/input-caption/caption.interface';
import { DropdownOption } from './dropdown-option.interface';
import { Dropdown } from './dropdown.interface';
import { v4 as uuid } from 'uuid';
import { HintExpander } from '../ontario-hint-expander/hint-expander.interface';
import {
	validateObjectExists,
	validatePropExists,
	validateLanguage,
} from '../../utils/validation/validation-functions';
import { ConsoleMessageClass } from '../../utils/console-message/console-message';
import { language } from '../../utils/language-types';
import { default as translations } from '../../translations/global.i18n.json';

@Component({
	tag: 'ontario-dropdown-list',
	styleUrl: 'ontario-dropdown-list.scss',
	shadow: true,
	assetsDirs: ['./assets'],
})
export class OntarioDropdownList implements Dropdown {
	/**
	 * Grant access to the host element and related DOM methods/events within the class instance.
	 */
	@Element() element: HTMLElement;

	/**
	 * The text to display as the label
	 *
	 * @example
	 * <ontario-dropdown-list
	 *   caption='{
	 *     "captionText": "Address",
	 *     "captionType": "heading",
	 *   }'
	 *   required="true"
	 *   ...>
	 * </ontario-dropdown-list>
	 */
	@Prop() caption: Caption | string;

	/**
	 * The language of the component.
	 * This is used for translations, and is by default set through event listeners checking for a language property from the header. If none is passed, it will default to English.
	 */
	@Prop({ mutable: true }) language?: language = 'EN';

	/**
	 * The name for the dropdown list.
	 */
	@Prop() name: string;

	/**
	 * The ID for the dropdown list.
	 * If no ID is provided, one will be generated.
	 */
	@Prop({ mutable: true }) elementId?: string;

	/**
	 * Each property will be passed in through an object in the options array.
	 * This can either be passed in as an object directly (if using react), or as a string in HTML.
	 * In the example below, the options are being passed in as a string and
	 * there are three dropdown options to be displayed in the fieldset.
	 *
	 * @example
	 * <ontario-dropdown-list
	 *   caption='{
	 *     "captionText": "Do you like cats?",
	 *     "captionType": "heading",
	 *   }'
	 *   name="cat-dropdown"
	 *   is-empty-start-option="Please select"
	 *   options='[{
	 *     "value": "dropdown-list-1",
	 *     "label": "Option 1"
	 *   },
	 *   {
	 *     "value": "dropdown-list-2",
	 *     "label": "Option 2"
	 *   },
	 *   {
	 *      "value": "dropdown-list-3",
	 *      "label": "Option 3"
	 *   }]'
	 *   required="true"
	 * >
	 * </ontario-dropdown-list>
	 */
	@Prop() options: string | DropdownOption[];

	/**
	 * This is used to determine whether the dropdown list is required or not.
	 * This prop also gets passed to the InputCaption utility to display either an optional or required flag in the label.
	 * If no prop is set, it will default to false (optional).
	 */
	@Prop() required?: boolean = false;

	/**
	 * Whether or not the initial option displayed is empty.
	 * If set to true, it will render the default “select” text.
	 * If set to a string, it will render the string value.
	 *
	 * @example
	 * <ontario-dropdown-list is-empty-start-option></ontario-dropdown-list>
	 *
	 * or
	 *
	 * <ontario-dropdown-list is-empty-start-option="Please select"></ontario-dropdown-list>
	 */
	@Prop() isEmptyStartOption?: boolean | string = false;

	/**
	 * Hint text for Ontario Dropdown. This is optional.
	 */
	@Prop() hintText?: string;

	/**
	 * Used to include the Hint Expander component underneath the dropdown list box.
	 * This is passed in as an object with key-value pairs. This is optional.
	 *
	 * @example
	 * <ontario-dropdown-list
	 *   caption='{
	 *     "caption": "What province do you live in?",
	 *     "captionType": "heading",
	 *   }
	 *   hint-expander='{
	 *    "hint": "Hint expander",
	 *    "content": "This is the content"
	 *   }'
	 *   required="true"
	 * >
	 * </ontario-dropdown-list>
	 */
	@Prop() hintExpander?: HintExpander | string;

	/**
	 * Instantiate an InputCaption object for internal logic use
	 */
	@State() private captionState: InputCaption;

	/**
	 * The options are re-assigned to the internalOptions array.
	 */
	@State() private internalOptions: DropdownOption[];

	/**
	 * The hint expander options are re-assigned to the internalHintExpander array.
	 */
	@State() private internalHintExpander: HintExpander;

	/**
	 * This listens for the `setAppLanguage` event sent from the test language toggler when it is is connected to the DOM. It is used for the initial language when the input component loads.
	 */
	@Listen('setAppLanguage', { target: 'window' })
	handleSetAppLanguage(event: CustomEvent<language>) {
		this.language = validateLanguage(event);
	}

	@Listen('headerLanguageToggled', { target: 'window' })
	handleHeaderLanguageToggled(event: CustomEvent<language>) {
		const toggledLanguage = validateLanguage(event);
		this.language = toggledLanguage;
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
			message
				.addDesignSystemTag()
				.addMonospaceText(' name ')
				.addRegularText('for')
				.addMonospaceText(' <ontario-dropdown-list> ')
				.addRegularText('was not provided')
				.printMessage();
		}
	}

	/*
	 * Watch for changes in the `options` prop for validation purpose
	 * Validate the options and make sure the options has a value.
	 * Log warning if user doesn't input a value for the options.
	 */
	@Watch('options')
	validateOptions(newValue: object) {
		if (validateObjectExists(newValue)) {
			const message = new ConsoleMessageClass();
			message
				.addDesignSystemTag()
				.addMonospaceText(' options ')
				.addRegularText('for')
				.addMonospaceText(' <ontario-dropdown-list> ')
				.addRegularText('was not provided')
				.printMessage();
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
	}

	@Watch('caption')
	private updateCaptionState(newValue: Caption | string) {
		this.captionState = new InputCaption(
			this.element.tagName,
			newValue,
			translations,
			this.language,
			false,
			this.required,
		);
	}

	/**
	 * Watch for changes in the `language` to render either the English or French translations
	 */
	@Watch('language')
	updateLanguage() {
		this.updateCaptionState(this.caption);
	}

	@Watch('hintExpander')
	private parseHintExpander() {
		const hintExpander = this.hintExpander;
		if (hintExpander) {
			if (typeof hintExpander === 'string') this.internalHintExpander = JSON.parse(hintExpander);
			else this.internalHintExpander = hintExpander;
		}
	}

	public getId(): string {
		return this.elementId ?? '';
	}

	private getDropdownArrow() {
		return {
			backgroundImage: `url(${getAssetPath('./assets/ontario-material-dropdown-arrow-48px.svg')})`,
		};
	}

	private getClass(): string {
		return this.hintExpander
			? `ontario-input ontario-dropdown ontario-dropdown-hint-expander--true`
			: `ontario-input ontario-dropdown`;
	}

	componentWillLoad() {
		this.updateCaptionState(this.caption);
		this.parseOptions();
		this.validateName(this.name);
		this.validateOptions(this.internalOptions);
		this.elementId = this.elementId ?? uuid();
		this.language = validateLanguage(this.language);
	}

	render() {
		return (
			<div class="ontario-form-group">
				{this.captionState.getCaption(this.getId(), !!this.internalHintExpander)}
				{this.hintText && <ontario-hint-text hint={this.hintText}></ontario-hint-text>}
				<select
					class={this.getClass()}
					id={this.getId()}
					name={this.name}
					style={this.getDropdownArrow()}
					required={!!this.required}
				>
					{this.isEmptyStartOption &&
						(this.isEmptyStartOption === true ? <option>Select</option> : <option>{this.isEmptyStartOption}</option>)}

					{this.internalOptions?.map((dropdown) => <option value={dropdown.value}>{dropdown.label}</option>) ?? ''}
				</select>
				{this.internalHintExpander && (
					<ontario-hint-expander
						hint={this.internalHintExpander.hint}
						content={this.internalHintExpander.content}
					></ontario-hint-expander>
				)}
			</div>
		);
	}
}
