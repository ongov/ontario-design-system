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
	@Prop() showBackButton?: boolean = false;

	/**
	 * Link for the back button onClick function.
	 */
	@Prop() backButtonLink?: string;

	/**
	 * Lets user know which step the current page is on.
	 */
	@Prop() currentStep?: number;

	/**
	 * Number of steps that the form has.
	 */
	@Prop() numberOfSteps?: number;

	/**
	 * Percentage of the form that has been completed.
	 */
	@Prop() percentageComplete?: number;

	/**
	 * Used to add a custom function to the back button onClick event.
	 */
	@Prop() customOnClick?: Function;

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

	componentWillLoad() {
		this.language = validateLanguage(this.language);
	}

	render() {
		return (
			<div class="ontario-step-indicator">
				<div class="ontario-row">
					<div class="ontario-columns ontario-small-12">
						<div class={`ontario-step-indicator--with-back-button--${this.showBackButton}`}>
							{this.showBackButton === true && this.customOnClick && !this.backButtonLink && (
								<button
									class="ontario-button ontario-button--tertiary"
									onClick={(e) => this.customOnClick && this.customOnClick(e)}
								>
									<ontario-icon-chevron-left colour="blue"></ontario-icon-chevron-left>
									{this.translations.stepIndicator.back[`${this.language}`]}
								</button>
							)}
							{this.showBackButton === true && !this.customOnClick && this.backButtonLink && (
								<a class="ontario-button ontario-button--tertiary" href={this.backButtonLink}>
									<ontario-icon-chevron-left colour="blue"></ontario-icon-chevron-left>
									{this.translations.stepIndicator.back[`${this.language}`]}
								</a>
							)}
							{this.percentageComplete ? (
								<span class="ontario-h4">
									{this.percentageComplete}&nbsp;% {this.translations.stepIndicator.complete[`${this.language}`]}
								</span>
							) : (
								<span class="ontario-h4">
									{this.translations.stepIndicator.step[`${this.language}`]}&nbsp; {this.currentStep}{' '}
									{this.translations.stepIndicator.of[`${this.language}`]}&nbsp; {this.numberOfSteps}
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
