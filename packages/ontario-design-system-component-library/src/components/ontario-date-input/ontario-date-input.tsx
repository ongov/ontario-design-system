import { Component, EventEmitter, Element, Watch, Event, Prop, h, State, Listen, AttachInternals } from '@stencil/core';
import { v4 as uuid } from 'uuid';
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
import { emitEvent } from '../../utils/events/event-handler';

@Component({
	tag: 'ontario-date-input',
	styleUrl: 'ontario-date-input.scss',
	shadow: true,
	formAssociated: true,
})
export class OntarioDateInput {
	@Element() element: HTMLElement;
	@AttachInternals() internals: ElementInternals;

	/**
	 * The language of the component.
	 * This is used for translations, and is by default set through event listeners checking for a language property from the header. If none are passed, it will default to English.
	 */
	@Prop({ mutable: true }) language?: Language;

	/**
	 * A boolean value to determine whether or not the date input is required.
	 *
	 * This is optional. If no prop is passed, it will default to `false`.
	 */
	@Prop() required?: boolean = false;

	/**
	 * An object value used to set the placeholder text for the day, month and year input fields. Any combination of the three input fields (i.e day, month, year)
	 * of the date component can be overridden.
	 *
	 * This is optional. If no prop is passed, it will not display any placeholder text.
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
	 * The unique identifier of the input. This is optional - if no ID is passed, one will be generated.
	 */
	@Prop({ mutable: true }) elementId?: string;

	/**
	 * A number value indicating minimum value allowed for year input field of the date component.
	 *
	 * This is optional. If no prop is passed, it will default to `999`.
	 */
	@Prop() minYear?: number;

	/**
	 * A number value indicating maximum value allowed for year input field of the date component.
	 *
	 * This is optional. If no prop is passed, it will default to `9999`.
	 */
	@Prop() maxYear?: number;

	/**
	 * Used to include the ontario-hint-text component for the date input group.
	 *
	 * This is optional.
	 */
	@Prop() hintText?: string;

	/**
	 * An array value used to display date options. For example, only the day and month fields can be displayed by
	 * specifying the dateOptions as `["day", "month"]`, etc.
	 *
	 * This is optional. If no prop for `dateOptions` is passed, it will default to `["day", "month", "year"]`.
	 */
	@Prop() dateOptions?: string | Array<DateInputFieldType> = ['day', 'month', 'year'];

	/**
	 * A function used to override internal date validation logic, which takes three arguments (i.e day, month and year) and returns
	 * an object of type `DateValidatorReturnType`
	 *
	 * This is optional. If no prop for `dateValidator` is passed, it will default to internal validation function to validate
	 * the date input.
	 */
	@Prop() dateValidator?: (day: string, month: string, year: string) => DateValidatorReturnType;

	/**
	 * Emitted when an `input` event occurs within the component.
	 */
	@Event() inputOnInput: EventEmitter<{
		value: string;
		fieldType: 'day' | 'month' | 'year';
	}>;

	/**
	 * Emitted when a `change` event occurs within the component.
	 */
	@Event() inputOnChange: EventEmitter<{
		value: string;
		fieldType: 'day' | 'month' | 'year';
	}>;

	/**
	 * Emitted when a keyboard input event occurs when an input has lost focus.
	 */
	@Event() inputOnBlur: EventEmitter<'day' | 'month' | 'year'>;

	/**
	 * Emitted when a keyboard input event occurs when an input has gained focus.
	 */
	@Event() inputOnFocus: EventEmitter<'day' | 'month' | 'year'>;

	/**
	 * Emitted when an error message is reported to the component.
	 */
	@Event() inputErrorOccurred: EventEmitter<{ inputId: string; errorMessage: string }>;

	@Watch('errorMessage')
	broadcastInputErrorOccurredEvent() {
		// Emit event to notify anyone who wants to listen for errors occurring
		this.inputErrorOccurred.emit({ inputId: this.getId(), errorMessage: this.errorMessage ?? '' });
	}

	/**
	 * This listens for the `setAppLanguage` event sent from the test language toggler when it is is connected to the DOM. It is used for the initial language when the input component loads.
	 */
	@Listen('setAppLanguage', { target: 'window' })
	handleSetAppLanguage(event: CustomEvent<Language>) {
		if (!this.language) {
			this.language = validateLanguage(event);
		}
	}

	@Listen('headerLanguageToggled', { target: 'window' })
	handleHeaderLanguageToggled(event: CustomEvent<Language>) {
		this.language = validateLanguage(event);
	}

	@Listen('blur', { capture: true })
	handleComponentBlur() {
		const { day, month, year, minYear, maxYear, dateValidator, dateOptionsState } = this;
		const { dayVisible, monthVisible, yearVisible } = getVisibleDateFields(dateOptionsState);

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
					dayVisible,
					monthVisible,
					yearVisible,
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

	private handleDateUpdates = (value: string, fieldType: DateInputFieldType) => {
		// set boolean indicating user interaction with the component for validation
		if (!this.isDateTyped) {
			this.isDateTyped = true;
		}

		// reset error state when user starts typing
		this.resetErrorState();

		// update date state
		this.updateDateState(value, fieldType);

		// TODO: verify are all the values numbers?
		if (this.year && this.month && this.day) {
			const desiredDate = new Date(
				Date.UTC(parseInt(this.year), parseInt(this.month) - 1, parseInt(this.day), 0, 0, 0, 0),
			);
			this.internals?.setFormValue?.(desiredDate.toISOString());
		}
	};

	private handleDateInput = (value: string, fieldType: DateInputFieldType) => {
		this.handleDateUpdates(value, fieldType);

		// emit date change event
		this.inputOnInput.emit({ value, fieldType });
	};

	private handleDateChanged = (value: string, fieldType: DateInputFieldType) => {
		this.handleDateUpdates(value, fieldType);

		// emit date change event
		this.inputOnChange.emit({ value, fieldType });

		// emit change event
		emitEvent(this.element, 'change', { value, fieldType });
	};

	private handleDateFocus = (fieldType: DateInputFieldType) => {
		// emit date field focus event
		this.inputOnFocus.emit(fieldType);
	};

	private handleDateBlur = (fieldType: DateInputFieldType) => {
		// emit date field focus event
		this.inputOnBlur.emit(fieldType);
	};

	private getLanguage(): Language {
		return this.language ?? 'en';
	}

	private getCaption(): Caption | string {
		const language = this.getLanguage();
		const captionText = translations.dateInput.caption[language];

		return this.caption ?? { captionText, captionType: 'default' };
	}

	private getId(): string {
		return this.elementId ?? '';
	}

	private getHintTextId(): string {
		return `date-input-hint-${this.getId()}`;
	}

	private getInputIds() {
		const id = this.getId();

		const dayId = `day-${id}`;
		const monthId = `month-${id}`;
		const yearId = `year-${id}`;

		return { dayId, monthId, yearId };
	}

	componentWillLoad() {
		this.processPlaceholder();
		this.processDateOptions();

		this.updateCaptionState(this.getCaption());
		this.elementId = this.elementId ?? uuid();

		this.language = validateLanguage(this.language) as Language;
	}

	render() {
		const { dateOptionsState, required, translations, hintText, placeholderState } = this;
		const language = this.getLanguage();
		const dateStrings = translations.dateInput;
		const placeholderText = placeholderState ?? {};
		const { dayVisible, monthVisible, yearVisible } = getVisibleDateFields(dateOptionsState);
		const { dayId, monthId, yearId } = this.getInputIds();
		const hintTextId = this.getHintTextId();

		return (
			<div class="ontario-form-group">
				<fieldset role="group" class="ontario-fieldset">
					{this.captionState.getCaption()}
					{!!hintText && (
						<p id={hintTextId} class="ontario-hint">
							{hintText}
						</p>
					)}
					<ErrorMessage message={this.errorMessage} error={this.isInvalidDate()} />
					<div class="ontario-date__group">
						{yearVisible && (
							<Input
								id={yearId}
								type="year"
								label={dateStrings.year.label[language]}
								accessibilityLabel={dateStrings.year.accessibility[language]}
								required={!!required}
								error={this.yearInvalid}
								placeholder={placeholderText.year}
								onInput={this.handleDateInput}
								onChange={this.handleDateChanged}
								onBlur={this.handleDateBlur}
								onFocus={this.handleDateFocus}
								ariaDescribedBy={hintTextId}
							/>
						)}
						{monthVisible && (
							<Input
								id={monthId}
								type="month"
								label={dateStrings.month.label[language]}
								accessibilityLabel={dateStrings.month.accessibility[language]}
								required={!!required}
								error={this.monthInvalid}
								placeholder={placeholderText.month}
								onInput={this.handleDateInput}
								onChange={this.handleDateChanged}
								onBlur={this.handleDateBlur}
								onFocus={this.handleDateFocus}
								ariaDescribedBy={hintTextId}
							/>
						)}
						{dayVisible && (
							<Input
								id={dayId}
								type="day"
								label={dateStrings.day.label[language]}
								accessibilityLabel={dateStrings.day.accessibility[language]}
								required={!!required}
								error={this.dayInvalid}
								placeholder={placeholderText.day}
								onInput={this.handleDateInput}
								onChange={this.handleDateChanged}
								onBlur={this.handleDateBlur}
								onFocus={this.handleDateFocus}
								ariaDescribedBy={hintTextId}
							/>
						)}
					</div>
				</fieldset>
			</div>
		);
	}
}
