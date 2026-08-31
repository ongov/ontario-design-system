import { Component, h, Element, Prop, Listen, State, Watch } from '@stencil/core';

import OntarioIconArrowUp from '../ontario-icon/assets/ontario-icon-arrow-up.svg';
import { Language } from '../../utils/common/language-types';
import { validateCssLength, validateLanguage } from '../../utils/validation/validation-functions';
import { ConsoleMessageClass } from '../../utils/console-message/console-message';

import translations from '../../translations/global.i18n.json';
import { isClientSideRendering } from '../../utils/common/environment';
import { HeaderLanguageToggleEventDetails } from '../../utils/events/common-events.interface';

/**
 * Ontario Back to Top helps users quickly return to the top of long pages.
 *
 * For component guidance, see:
 * - https://designsystem.ontario.ca/components/detail/back-to-top.html
 * - https://designsystem.ontario.ca/developer-docs/components/ontario-back-to-top/
 */
@Component({
	tag: 'ontario-back-to-top',
	styleUrl: 'ontario-back-to-top.scss',
	shadow: true,
})
export class OntarioBackToTop {
	@Element() element!: HTMLElement;

	/**
	 * The language of the component.
	 * This is used for translations, and is by default set through event listeners checking for a language property from the header. If no language prop is passed, it will default to English.
	 */
	@Prop({ mutable: true }) language?: Language;

	/**
	 * An additional distance to add to the button's default `bottom: 5%` positioning, expressed as a
	 * valid CSS length (for example `"63px"`, `"4rem"`, or `var(--my-offset)`).
	 *
	 * This is useful when other fixed/sticky elements (for example, a feedback button or live chat
	 * launcher) are stacked below the Back to Top button, and space needs to be reserved so the two
	 * don't overlap as the viewport is resized.
	 *
	 * The value is added on top of the existing `5%` offset (that is, `bottom: calc(5% + <bottomOffset>)`),
	 * rather than replacing it. Avoid passing arbitrary CSS declarations; use a plain CSS length or CSS
	 * variable instead.
	 *
	 * @example
	 * <ontario-back-to-top bottom-offset="63px"></ontario-back-to-top>
	 */
	@Prop({ mutable: true }) bottomOffset?: string;

	@State() translations: any = translations;

	@State() private displayBackToTop: boolean = false;

	@State() private scrollYValue: number = 200;

	@Watch('bottomOffset')
	validateBottomOffset() {
		if (!this.bottomOffset) {
			return;
		}

		if (!validateCssLength(this.bottomOffset)) {
			const message = new ConsoleMessageClass();
			message
				.addDesignSystemTag()
				.addMonospaceText(` bottomOffset ${this.bottomOffset} `)
				.addRegularText('for')
				.addMonospaceText(' <ontario-back-to-top> ')
				.addRegularText('is not a valid CSS length. The component will ignore the value and use the default offset.')
				.printMessage();
			this.bottomOffset = undefined;
		}
	}

	/**
	 * This listens for the window Y scroll value to be above 200 pixels. Once it is, the Back to Top button will toggle the `displayBackToTop` state which will set an active class to control the components' visibility.
	 */
	@Listen('scroll', { target: 'window' })
	showBackToTopButton() {
		if (isClientSideRendering()) {
			this.displayBackToTop = window.scrollY > this.scrollYValue;
		}
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

	/**
	 * Handles an update to the language should the user request a language update from the language toggle.
	 * @param {CustomEvent} - The language that has been selected.
	 */
	@Listen('headerLanguageToggled', { target: 'window' })
	handleHeaderLanguageToggled(event: CustomEvent<HeaderLanguageToggleEventDetails>) {
		this.language = validateLanguage(event.detail.newLanguage);
	}
	/**
	 * Scroll to top functionality when the Back to Top button is clicked
	 */
	private scrollToTop() {
		if (isClientSideRendering()) {
			window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
		}
	}

	componentWillLoad() {
		this.language = validateLanguage(this.language);
		this.validateBottomOffset();
	}

	render() {
		return (
			<button
				class={this.displayBackToTop ? `ontario-back-to-top active` : `ontario-back-to-top`}
				style={this.bottomOffset ? { '--ontario-back-to-top-bottom-offset': this.bottomOffset } : undefined}
				onClick={this.scrollToTop}
				aria-label={this.translations.backToTop.ariaLabel[`${this.language}`]}
			>
				<span aria-hidden="true" innerHTML={OntarioIconArrowUp}></span>
				{this.translations.backToTop.top[`${this.language}`]}
			</button>
		);
	}
}
