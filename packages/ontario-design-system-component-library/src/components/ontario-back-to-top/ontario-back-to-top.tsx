import { Component, h, Element, Prop, Listen, State } from '@stencil/core';
import OntarioIconArrowUp from '../ontario-icon/assets/ontario-icon-arrow-up.svg';
import { language } from '../../utils/language-types';
import { validateEventLanguage } from '../../utils/validation/validation-functions';
import translations from '../../translations/global.i18n.json';

@Component({
	tag: 'ontario-back-to-top',
	styleUrl: 'ontario-back-to-top.scss',
	shadow: true,
})
export class OntarioBackToTop {
	@Element() element: HTMLElement;

	/**
	 * The language of the component.
	 * This is used for translations, and is by default set through event listeners checking for a language property from the header. If none are passed, it will default to English.
	 */
	@Prop({ mutable: true }) language?: language = 'en';

	@State() translations: any = translations;

	@State() displayBackToTop: boolean = false;

	/**
	 * This listens for the window Y scroll value to be above 200 pixels. Once it is, the back to top button will toggle the `displayBackToTop` state which will set an active class to control the components' visibility.
	 */
	@Listen('scroll', { target: 'window' })
	showBackToTopButton() {
		window.scrollY > 200 ? (this.displayBackToTop = true) : (this.displayBackToTop = false);
	}

	/**
	 * This listens for the `setAppLanguage` event sent from the test language toggler when it is is connected to the DOM. It is used for the initial language when the input component loads.
	 */
	@Listen('setAppLanguage', { target: 'window' })
	handleSetAppLanguage(event: CustomEvent<language>) {
		this.language = validateEventLanguage(event);
	}

	@Listen('headerLanguageToggled', { target: 'window' })
	handleHeaderLanguageToggled(event: CustomEvent<language>) {
		const toggledLanguage = validateEventLanguage(event);
		this.language = toggledLanguage;
	}

	/**
	 * Scroll to top functionality when the back to top button is clicked
	 */
	private scrollToTop() {
		window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
	}

	render() {
		return (
			<button
				class={this.displayBackToTop ? `ontario-back-to-top active` : `ontario-back-to-top`}
				onClick={this.scrollToTop}
				aria-label={this.translations.backToTop.ariaLabel[`${this.language}`]}
			>
				<span aria-hidden="true" innerHTML={OntarioIconArrowUp}></span>
				{this.translations.backToTop.top[`${this.language}`]}
			</button>
		);
	}
}
