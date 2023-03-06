import { Component, h, Element, Prop, Listen, State } from '@stencil/core';
import OntarioIconArrowUp from '../ontario-icon/assets/ontario-icon-arrow-up.svg';
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
	@Prop({ mutable: true }) language?: string = 'en';

	@State() translations: any = translations;

	/**
	 * This listens for the window Y scroll value to be above 200 pixels. Once it is, the back to top button will toggle an active class to control its visibility.
	 */
	@Listen('scroll', { target: 'window' })
	showBackToTopButton() {
		this.element.shadowRoot?.children[1].classList.toggle('active', window.scrollY > 200);
	}

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

	/**
	 * Scroll to top functionality when the back to top button is clicked
	 */
	private scrollToTop() {
		window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
	}

	render() {
		return (
			<button
				class="ontario-back-to-top"
				onClick={this.scrollToTop}
				aria-label={this.translations.backToTop.ariaLabel[`${this.language}`]}
			>
				<span aria-hidden="true" innerHTML={OntarioIconArrowUp}></span>
				{this.translations.backToTop.top[`${this.language}`]}
			</button>
		);
	}
}
