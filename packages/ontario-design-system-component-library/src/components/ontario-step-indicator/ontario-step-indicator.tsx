import { Component, Prop, Element, h, State, Listen } from '@stencil/core';
import { Language } from '../../utils/common/language-types';
import { validateLanguage } from '../../utils/validation/validation-functions';
import translations from '../../translations/global.i18n.json';

@Component({
	tag: 'ontario-step-indicator',
	styleUrl: 'ontario-step-indicator.scss',
	shadow: true,
})
export class OntarioStepIndicator {
	@Element() host: HTMLElement;

	/**
	 * Shows back button depending on which step the user is on.
	 */
	@Prop() showBackButton: boolean = false;

	/**
	 * Lets user know which step the current page is on.
	 */
	@Prop() currentStep?: number = 1;

	/**
	 * Number of steps that the form has.
	 */
	@Prop() numberOfSteps?: number = 5;

	/**
	 * Display the text in percentage format.
	 */
	@Prop() isPercentage?: boolean = false;

	/**
	 * Percentage of the form that has been completed.
	 */
	@Prop() percentageComplete?: number = 0;

	/**
	 * The language of the component.
	 * This is used for translations, and is by default set through event listeners checking for a language property from the header. If none are passed, it will default to English.
	 */
	@Prop({ mutable: true }) language?: Language = 'en';

	@State() translations: any = translations;

	/**
	 * This listens for the `setAppLanguage` event sent from the test language toggler when it is is connected to the DOM. It is used for the initial language when the input component loads.
	 */
	@Listen('setAppLanguage', { target: 'window' })
	handleSetAppLanguage(event: CustomEvent<Language>) {
		this.language = validateLanguage(event);
	}

	@Listen('headerLanguageToggled', { target: 'window' })
	handleHeaderLanguageToggled(event: CustomEvent<Language>) {
		const toggledLanguage = validateLanguage(event);
		this.language = toggledLanguage;
	}

	/**
	 * Capture the text that indicates where the user is within the form journey.
	 */
	private captureStepIndicatorText() {
		if (this.isPercentage) {
			return `${this.percentageComplete}&nbsp;% complete`;
		} else {
			return `Step&nbsp;${this.currentStep} of&nbsp;${this.numberOfSteps}`;
		}
	}

	componentWillLoad() {
		this.captureStepIndicatorText();
		this.language = validateLanguage(this.language);
	}

	render() {
		if (this.showBackButton == true) {
			return (
				<div class="ontario-step-indicator">
					<div class="ontario-row">
						<div class="ontario-columns ontario-small-12">
							<div class="ontario-step-indicator--with-back-button--true">
								<button class="ontario-button ontario-button--tertiary">
									<ontario-icon-chevron-left colour="blue"></ontario-icon-chevron-left>
									{this.translations.stepIndicator.back[`${this.language}`]}
								</button>
								<span class="ontario-h4" innerHTML={this.captureStepIndicatorText()}></span>
							</div>
							<hr />
						</div>
					</div>
				</div>
			);
		} else {
			return (
				<div class="ontario-step-indicator">
					<div class="ontario-row">
						<div class="ontario-columns ontario-small-12">
							<div class="ontario-step-indicator--with-back-button--false">
								<span class="ontario-h4" innerHTML={this.captureStepIndicatorText()}></span>
							</div>
							<hr />
						</div>
					</div>
				</div>
			);
		}
	}
}
