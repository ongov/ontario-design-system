import { Component, Prop, Element, h, State, Listen } from '@stencil/core';
import { Language } from '../../utils/common/language-types';
import { validateLanguage } from '../../utils/validation/validation-functions';
import translations from '../../translations/global.i18n.json';
import { HeaderLanguageToggleEventDetails } from '../../utils/events/common-events.interface';
import { ConsoleMessageClass } from '../../utils/console-message/console-message';

/**
 * Ontario Step Indicator communicates progress through multi-step flows.
 *
 * For component guidance, see:
 * - https://designsystem.ontario.ca/components/detail/step-indicator.html
 * - https://designsystem.ontario.ca/developer-docs/components/ontario-step-indicator/
 */
@Component({
	tag: 'ontario-step-indicator',
	styleUrl: 'ontario-step-indicator.scss',
	shadow: true,
})
export class OntarioStepIndicator {
	@Element() host: HTMLElement;

	/**
	 * A boolean value to determine whether or not the back button is displayed for the step indicator.
	 *
	 * This is optional. If no prop is passed, it will default to `false`.
	 */
	@Prop() showBackButton?: boolean = false;

	/**
	 * URL for the back element to set a path for where the link will lead.
	 *
	 * If a URL is passed in, the back element will display as an anchor tag.
	 * The back element will require either the backButtonURL prop or the customOnClick prop to be passed in order for the back element to display.
	 */
	@Prop() backButtonUrl?: string;

	/**
	 * A number value to indicate which step the user is currently on.
	 */
	@Prop() currentStep?: number;

	/**
	 * A number value to indicate to the user the total number of steps the form has.
	 */
	@Prop() numberOfSteps?: number;

	/**
	 * A number value to indicate to the user the percentage of the form that has been completed.
	 */

	@Prop() percentageComplete?: number;

	/**
	 * Used to add a custom function to the back button onClick event.
	 *
	 * If this function is passed in, the back element will display as a button.
	 * The back element will require either the backButtonURL prop or the customOnClick prop to be passed in order for the back element to display.
	 */
	@Prop() customOnClick?: (event: globalThis.Event) => void;

	/**
	 * The language of the component.
	 * This is used for translations, and is by default set through event listeners checking for a language property from the header. If none are passed, it will default to English.
	 */
	@Prop({ mutable: true }) language?: Language;

	/**
	 * This listens for the `setAppLanguage` event sent from the test language toggler when it is is connected to the DOM. It is used for the initial language when the input component loads.
	 */
	@Listen('setAppLanguage', { target: 'window' })
	handleSetAppLanguage(event: CustomEvent<Language>) {
		if (!this.language) {
			this.language = validateLanguage(event);
		}
	}

	/**
	 * Handles an update to the language should the user request a language update from the language toggle.
	 * @param {CustomEvent} - The language that has been selected.
	 */
	@Listen('headerLanguageToggled', { target: 'window' })
	handleHeaderLanguageToggled(event: CustomEvent<HeaderLanguageToggleEventDetails>) {
		this.language = validateLanguage(event.detail.newLanguage);
	}

	@State() translations: any = translations;

	private handleCustomOnClick = (e: globalThis.Event) => {
		this.customOnClick && this.customOnClick(e);
	};

	componentWillLoad() {
		this.language = validateLanguage(this.language);
		this.validateConfiguration();
	}

	private get isPercentageMode(): boolean {
		return typeof this.percentageComplete !== 'undefined';
	}

	private get currentStepText(): string {
		return typeof this.currentStep === 'number' ? `${this.currentStep}` : '?';
	}

	private get numberOfStepsText(): string {
		return typeof this.numberOfSteps === 'number' ? `${this.numberOfSteps}` : '?';
	}

	private get shouldRenderBackLink(): boolean {
		return this.showBackButton === true && !!this.backButtonUrl;
	}

	private get shouldRenderBackButton(): boolean {
		return this.showBackButton === true && !this.backButtonUrl;
	}

	private warnConfiguration(messageText: string) {
		const message = new ConsoleMessageClass();
		message
			.addDesignSystemTag()
			.addMonospaceText(' <ontario-step-indicator> ')
			.addRegularText(messageText)
			.printMessage();
	}

	private validateConfiguration() {
		const hasCurrentStep = typeof this.currentStep !== 'undefined';
		const hasNumberOfSteps = typeof this.numberOfSteps !== 'undefined';
		const hasPercentage = typeof this.percentageComplete !== 'undefined';
		const hasBackButtonUrl = !!this.backButtonUrl;
		const hasCustomOnClick = typeof this.customOnClick === 'function';

		if (hasPercentage && (hasCurrentStep || hasNumberOfSteps)) {
			this.warnConfiguration(
				'was provided with both percentage and step props. The percentageComplete value takes precedence.',
			);
		}

		if (hasCurrentStep !== hasNumberOfSteps) {
			this.warnConfiguration(
				'was provided with an incomplete step configuration. Missing step values will render as ?.',
			);
		}

		if (this.showBackButton === true && !hasBackButtonUrl && !hasCustomOnClick) {
			this.warnConfiguration(
				'is rendering a back button without backButtonUrl or customOnClick. The button will render without an action.',
			);
		}

		if (this.showBackButton === true && hasBackButtonUrl && hasCustomOnClick) {
			this.warnConfiguration(
				'was provided with both backButtonUrl and customOnClick. The backButtonUrl value takes precedence.',
			);
		}
	}

	render() {
		return (
			<div class="ontario-step-indicator">
				<div class="ontario-row">
					<div class="ontario-columns ontario-small-12">
						<div class={`ontario-step-indicator--with-back-button--${this.showBackButton}`}>
							{this.shouldRenderBackButton && (
								<button class="ontario-button ontario-button--tertiary" onClick={(e) => this.handleCustomOnClick(e)}>
									<ontario-icon-chevron-left colour="blue" aria-hidden="true"></ontario-icon-chevron-left>
									{this.translations.stepIndicator.back[`${this.language}`]}
								</button>
							)}
							{this.shouldRenderBackLink && (
								<a class="ontario-button ontario-button--tertiary" href={this.backButtonUrl}>
									<ontario-icon-chevron-left colour="blue" aria-hidden="true"></ontario-icon-chevron-left>
									{this.translations.stepIndicator.back[`${this.language}`]}
								</a>
							)}
							{this.isPercentageMode ? (
								<span class="ontario-h4">
									{this.percentageComplete}
									{this.language === 'en' ? '%' : <span>&nbsp;%</span>}{' '}
									{this.translations.stepIndicator.complete[`${this.language}`]}
								</span>
							) : (
								<span class="ontario-h4">
									{this.translations.stepIndicator.step[`${this.language}`]}&nbsp;{this.currentStepText}{' '}
									{this.translations.stepIndicator.of[`${this.language}`]}&nbsp;{this.numberOfStepsText}
								</span>
							)}
						</div>
						<hr />
					</div>
				</div>
			</div>
		);
	}
}
