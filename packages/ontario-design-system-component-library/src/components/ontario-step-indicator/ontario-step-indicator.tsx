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
	@Prop() customOnClick?: Function;

	/**
	 * The language of the component.
	 * This is used for translations, and is by default set through event listeners checking for a language property from the header. If none are passed, it will default to English.
	 */
	@Prop({ mutable: true }) language?: Language = 'en';

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

	@State() translations: any = translations;

	componentWillLoad() {
		this.language = validateLanguage(this.language);
	}

	render() {
		return (
			<div class="ontario-step-indicator">
				<div class="ontario-row">
					<div class="ontario-columns ontario-small-12">
						<div class={`ontario-step-indicator--with-back-button--${this.showBackButton}`}>
							{this.showBackButton === true && this.customOnClick && !this.backButtonUrl && (
								<button
									class="ontario-button ontario-button--tertiary"
									onClick={(e) => this.customOnClick && this.customOnClick(e)}
								>
									<ontario-icon-chevron-left colour="blue"></ontario-icon-chevron-left>
									{this.translations.stepIndicator.back[`${this.language}`]}
								</button>
							)}
							{this.showBackButton === true && !this.customOnClick && this.backButtonUrl && (
								<a class="ontario-button ontario-button--tertiary" href={this.backButtonUrl}>
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
