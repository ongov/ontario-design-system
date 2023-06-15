import { Component, EventEmitter, Element, Watch, Event, Prop, h, State, Listen } from '@stencil/core';
import { Language } from '../../utils/common/language-types';
import { validateLanguage } from '../../utils/validation/validation-functions';
import { translations, Translations } from '../../translations';
import { Input } from './components';
import { getDateErrorMessage, getVisibleDateFields } from './utils';
import { DateInputFieldType, DateInputPlaceholder, DateValidatorReturnType } from './ontario-date-input-interface';
import { ErrorMessage } from '../../utils/components/error-message/error-message';
import { ConsoleMessageClass } from '../../utils/console-message/console-message';
import { ConsoleType } from '../../utils/console-message/console-message.enum';
import { InputCaption } from '../../utils/common/input-caption/input-caption';
import { Caption } from '../../utils/common/input-caption/caption.interface';

@Component({
	tag: 'ontario-date-input',
	styleUrl: 'ontario-date-input.scss',
	shadow: true,
})
export class OntarioDateInput {
	@Element() element: HTMLElement;

	/**
	 * The language of the component.
	 * This is used for translations, and is by default set through event listeners checking for a language property from the header. If none are passed, it will default to English.
	 */
	@Prop({ mutable: true }) language?: Language = 'en';

	/**
	 * A boolean value to determine whether or not the date input is required
	 *
	 * This is optional. If no prop is passed, it will default to `false`.
	 */
	@Prop() required?: boolean = false;

	/**
	 * An object value use to set Placeholder text for the day, month, and year input field. You can override all three input fields (i.e day, month, year)
	 * of the date component or none.
	 *
	 * This is optional. If no prop is passed, it will use the default placeholder text `{ day: 'DD', month: 'MM', year: 'YYYY' }`
	 */
	@Prop() placeholder?: DateInputPlaceholder | string;

	/**
	 * The text to display as the input label
	 *
	 * @example
	 * <ontario-date-input
	 *   caption='{
	 *     "captionText": "Exact Date",
	 *     "captionType": "heading",
	 *   }
	 *   required="true"
	 *   ...>
	 * </ontario-date-input>
	 */
	@Prop() caption: Caption | string;

	/**
	 * A number value indicating minimum value allowed for year input field of the date component.
	 *
	 * This is optional. If no prop is passed, it will default to `1`.
	 */
	@Prop() minYear?: number;

	/**
	 * A number value indicating maximum value allowed for year input field of the date component.
	 *
	 * This is optional. If no prop is passed, it will default to `9999`.
	 */
	@Prop() maxYear?: number;

	/**
	 * A string value explaining the date format. This is optional.
	 */
	@Prop() hintText?: string;

	/**
	 * Use to display certain date options. Example: day and month or month and year
	 * This is optional
	 */
	@Prop() dateOptions?: string | Array<DateInputFieldType> = ['day', 'month', 'year'];

	/**
	 * A string value explaining the date format. This is optional.
	 */
	@Prop() dateValidator?: (day: string, month: string, year: string) => DateValidatorReturnType;

	/**
	 * Emitted when a keyboard input or mouse event occurs when an input has been changed.
	 */
	@Event({ eventName: 'inputOnChange' }) inputOnChange: EventEmitter<{
		value: string;
		fieldType: 'day' | 'month' | 'year';
	}>;

	/**
	 * Emitted when a keyboard input event occurs when an input has lost focus.
	 */
	@Event({ eventName: 'inputOnBlur' }) inputOnBlur: EventEmitter<'day' | 'month' | 'year'>;

	/**
	 * Emitted when a keyboard input event occurs when an input has gained focus.
	 */
	@Event({ eventName: 'inputOnFocus' }) inputOnFocus: EventEmitter<'day' | 'month' | 'year'>;

	/**
	 * This listens for the `setAppLanguage` event sent from the test language toggler when it is is connected to the DOM. It is used for the initial language when the input component loads.
	 */
	@Listen('setAppLanguage', { target: 'window' })
	handleSetAppLanguage(event: CustomEvent<Language>) {
		this.language = validateLanguage(event);
	}

	@Listen('headerLanguageToggled', { target: 'window' })
	handleHeaderLanguageToggled(event: CustomEvent<Language>) {
		this.language = validateLanguage(event);
	}

	@Listen('blur', { capture: true })
	handleComponentBlur() {
		const { day, month, year, minYear, maxYear, dateValidator } = this;

		// if user has not interacted with the component, skip validation
		if (!this.isDateTyped) {
			return;
		}
		const errorMessages = translations.dateInput.error[this.getLanguage()];
		const { dayInvalid, monthInvalid, yearInvalid, errorMessage } = dateValidator
			? dateValidator(day, month, year)
			: getDateErrorMessage({
					dayValue: day,
					monthValue: month,
					yearValue: year,
					errorMessages,
					minYear,
					maxYear,
			  });

		this.dayInvalid = dayInvalid;
		this.monthInvalid = monthInvalid;
		this.yearInvalid = yearInvalid;
		this.errorMessage = errorMessage;
	}

	@State() private translations: Translations = translations;
	@State() private captionState: InputCaption;

	@State() private isDateTyped: boolean = false;
	@State() private dayInvalid: boolean = false;
	@State() private monthInvalid: boolean = false;
	@State() private yearInvalid: boolean = false;
	@State() private errorMessage: string | undefined;

	@State() private day: string = '';
	@State() private month: string = '';
	@State() private year: string = '';

	@State() private placeholderState: DateInputPlaceholder;
	@State() private dateOptionsState: Array<DateInputFieldType>;

	/**
	 * Watch for changes to the `caption` prop.
	 *
	 * The caption will be run through the InputCaption constructor to convert it to the correct format, and set the result to the `captionState` state.
	 * @param newValue: Caption | string
	 */
	@Watch('caption')
	private updateCaptionState(newValue: Caption | string) {
		this.captionState = new InputCaption(
			this.element.tagName,
			newValue,
			translations,
			this.language,
			true,
			this.required,
		);
	}

	/**
	 * Watch for changes in the `language` prop to render either the English or French translations
	 */
	@Watch('language')
	updateLanguage() {
		this.updateCaptionState(this.caption);
	}

	private processPlaceholder() {
		this.parseOptions(this.placeholder);
	}

	private processDateOptions() {
		this.parseOptions(this.dateOptions);
	}

	private parseOptions(options: any) {
		const isString = typeof options === 'string';
		if (!options) {
			return;
		}

		try {
			if (options === this.placeholder) {
				this.placeholderState = isString ? JSON.parse(options) : options;
			} else if (options === this.dateOptions) {
				this.dateOptionsState = isString ? JSON.parse(options) : options;
			}
		} catch (error) {
			const message = new ConsoleMessageClass();
			message
				.addDesignSystemTag()
				.addRegularText(' failed to parse props for ')
				.addMonospaceText('<ontario-date-input>')
				.addRegularText(' in ')
				.addMonospaceText('parseOptions()')
				.addRegularText(' method \n ')
				.addMonospaceText(error.stack)
				.printMessage(ConsoleType.Error);
		}
	}

	private isInvalidDate = () => {
		return this.dayInvalid || this.monthInvalid || this.yearInvalid;
	};

	private resetErrorState = () => {
		if (!this.isInvalidDate()) {
			return;
		}

		this.dayInvalid = false;
		this.monthInvalid = false;
		this.yearInvalid = false;
		this.errorMessage = '';
	};

	private updateDateState = (value: string, inputFieldType: DateInputFieldType) => {
		switch (inputFieldType) {
			case 'day':
				this.day = value;
				break;
			case 'month':
				this.month = value;
				break;
			case 'year':
				this.year = value;
				break;
		}
	};

	private handleDateChanged = (value: string, fieldType: DateInputFieldType) => {
		// set boolean indicating user interaction with the component for validation
		if (!this.isDateTyped) {
			this.isDateTyped = true;
		}

		// reset error state when user starts typing
		this.resetErrorState();

		// update date state
		this.updateDateState(value, fieldType);

		// emit date change event
		this.inputOnChange.emit({ value, fieldType });
	};

	private handleDateFocus = (fieldType: DateInputFieldType) => {
		// emit date field focus event
		this.inputOnFocus.emit(fieldType);
	};

	private handleDateBlur = (fieldType: DateInputFieldType) => {
		// emit date field focus event
		this.inputOnBlur.emit(fieldType);
	};

	private getPlaceholderText() {
		const defaultPlaceholder = translations.dateInput.placeholder[this.language as Language];
		return this.placeholderState ?? defaultPlaceholder;
	}

	private getLanguage(): Language {
		return this.language ?? 'en';
	}

	private getCaption(): Caption | string {
		const language = this.getLanguage();
		const captionText = translations.dateInput.caption[language];

		return this.caption ?? { captionText, captionType: 'default' };
	}

	private getHintText(): string {
		const language = this.getLanguage();
		return this.hintText ?? translations.dateInput.hintText[language];
	}

	componentWillLoad() {
		this.processPlaceholder();
		this.processDateOptions();

		this.updateCaptionState(this.getCaption());

		this.language = validateLanguage(this.language) as Language;
	}

	render() {
		const { dateOptionsState, required, translations } = this;
		const language = this.getLanguage();
		const dateStrings = translations.dateInput;
		const placeholderText = this.getPlaceholderText();
		const { dayVisible, monthVisible, yearVisible } = getVisibleDateFields(dateOptionsState);

		return (
			<div class="ontario-form-group">
				<fieldset role="group" class="ontario-fieldset" aria-describedBy="date-input-hint">
					{this.captionState.getCaption()}
					<p id="date-input-hint" class="ontario-hint">
						{this.getHintText()}
					</p>
					<ErrorMessage message={this.errorMessage} error={this.isInvalidDate()} />
					<div class="ontario-date__group">
						{dayVisible && (
							<Input
								id="year"
								label={dateStrings.year.label[language]}
								accessibilityLabel={dateStrings.year.accessibility[language]}
								required={!!required}
								error={this.yearInvalid}
								placeholder={placeholderText.year}
								onInput={this.handleDateChanged}
								onBlur={this.handleDateBlur}
								onFocus={this.handleDateFocus}
							/>
						)}
						{monthVisible && (
							<Input
								id="month"
								label={dateStrings.month.label[language]}
								accessibilityLabel={dateStrings.month.accessibility[language]}
								required={!!required}
								error={this.monthInvalid}
								placeholder={placeholderText.month}
								onInput={this.handleDateChanged}
								onBlur={this.handleDateBlur}
								onFocus={this.handleDateFocus}
							/>
						)}
						{yearVisible && (
							<Input
								id="day"
								label={dateStrings.day.label[language]}
								accessibilityLabel={dateStrings.day.accessibility[language]}
								required={!!required}
								error={this.dayInvalid}
								placeholder={placeholderText.day}
								onInput={this.handleDateChanged}
								onBlur={this.handleDateBlur}
								onFocus={this.handleDateFocus}
							/>
						)}
					</div>
				</fieldset>
			</div>
		);
	}
}
