import { Component, Prop, State, Event, EventEmitter, Watch, h, Fragment } from '@stencil/core';

import { supportedLanguages, Language } from '../../utils/common/language-types';

import { default as translations } from '../../translations/global.i18n.json';
import { HeaderLanguageToggleEventDetails } from '../../utils/events/common-events.interface';
import { validateValueAgainstArray } from '../../utils/validation/validation-functions';
import { ConsoleMessageClass } from '../../utils/console-message/console-message';
import { printArray, getRootHTMLElement } from '../../utils/helper/utils';

@Component({
	tag: 'ontario-language-toggle',
	styleUrl: 'ontario-language-toggle.scss',
	shadow: true,
})
export class OntarioLanguageToggle {
	/**
	 * The language of the component.
	 *
	 * In most cases, the language toggle should be the source of truth for determining the site language.
	 *
	 * Only pass a language value here if necessary.
	 */
	@Prop({ mutable: true }) language?: Language;

	/**
	 * The size of the language toggle button.
	 *
	 * If no prop is passed, it will be set to the `default` size.
	 */
	@Prop() size?: 'default' | 'small' = 'default';

	/**
	 * The URL to change to when the language toggle button is clicked.
	 *
	 * This is optional.
	 */
	@Prop({ mutable: true }) url?: string;

	/**
	 * A custom function to pass to the language toggle button.
	 *
	 * This is optional.
	 */
	@Prop() customLanguageToggle?: (event: globalThis.Event) => void;

	@State() translations: any = translations;

	/**
	 * Internal state used as the source of truth for component language.
	 */
	@State() private languageState: Language;

	/**
	 * Internal state used to render the text on the language toggle UI.
	 */
	@State() private oppositeLanguageLabel: { fullWord: string; abbreviation: Language } | undefined = undefined;

	/**
	 * Updates the language and languageState props when changes to the language prop are detected.
	 */
	@Watch('language')
	updateLanguage() {
		if (this.language) {
			if (!validateValueAgainstArray(this.language, supportedLanguages)) {
				this.showLanguageWarning(this.language);
				this.language = this.translations.siteLanguage.abbreviation.en as Language;
			}
			this.languageState = this.language;
		}
		this.setAppLanguageHandler();
	}

	/**
	 * Event that fires during the setAppLanguageHandler() method.
	 *
	 * The event contains the current language (after language logic has already occurred).
	 */
	@Event() setAppLanguage: EventEmitter<Language>;

	/**
	 * Event that fires when the language toggle is pressed/clicked.
	 *
	 * The event contains the oldLanguage along with the newLanguage.
	 */
	@Event() headerLanguageToggled: EventEmitter<HeaderLanguageToggleEventDetails>;

	/**
	 * This function sets the languageState (if not already set).
	 *
	 * It also emits the setAppLanguage() event, updates the component language label, and
	 * updates the <html> tag lang attribute with the languageState value.
	 *
	 * It gets called by the connectedCallback() component lifecycle hook, and by the
	 * updateLanguage() method, which is fired on the watch for the language prop.
	 */
	private setAppLanguageHandler() {
		const defaultLang = this.translations.siteLanguage.abbreviation.en;
		const rootLang = getRootHTMLElement()?.lang;

		// If languageState is not set, set it equal to the following cadence:
		// language prop value, <html> tag lang attribute, or default to "en"
		if (!this.languageState) {
			if (this.language) {
				this.languageState = this.language;
			} else if (rootLang) {
				if (validateValueAgainstArray(rootLang, supportedLanguages)) {
					this.languageState = rootLang as Language;
				} else {
					this.showLanguageWarning(rootLang, 'document');
					this.languageState = defaultLang;
				}
			} else {
				this.languageState = defaultLang;
			}
		}

		this.setAppLanguage.emit(this.languageState);

		this.oppositeLanguageLabel = {
			fullWord: this.getOppositeLanguageFullWord(),
			abbreviation: this.getOppositeLanguageAbbrievation(),
		};

		this.updateHTMLLang();
	}

	/**
	 * An event that emits to other components that the language toggle button has been toggled.
	 *
	 * @param {Language} oldLanguage - The language prior to the language toggle being pressed.
	 * @param {globalThis.Event} event - event that triggered the function (e.g. onclick).
	 */
	private handleHeaderLanguageToggled(oldLanguage: Language, event?: globalThis.Event) {
		this.languageState =
			oldLanguage === this.translations.siteLanguage.abbreviation.en
				? this.translations.siteLanguage.abbreviation.fr
				: this.translations.siteLanguage.abbreviation.en;

		this.headerLanguageToggled.emit({ oldLanguage: oldLanguage, newLanguage: this.languageState });

		this.updateHTMLLang();

		if (this.customLanguageToggle && event) {
			this.customLanguageToggle(event);
		}
	}

	/**
	 * Prints a warning message to the console about using an incorrect language for the component.
	 *
	 * @param {string} lang - The incorrect language that was received.
	 * @param {string} type - prop/document | Where the incorrect language is coming from.
	 */
	private showLanguageWarning(lang: string, type: 'prop' | 'document' = 'prop') {
		const propOrDocumentMessage =
			type === 'prop' ? `The language prop value of ${lang} ` : `The HTML document lang attribute value of ${lang} `;
		const message = new ConsoleMessageClass();
		message
			.addDesignSystemTag()
			.addRegularText(propOrDocumentMessage)
			.addRegularText('is not a valid language value for the ')
			.addMonospaceText(' <ontario-language-toggle> ')
			.addRegularText(`component. Valid language values are ${printArray([...supportedLanguages])}. `)
			.addRegularText(`A default language value of ${this.translations.siteLanguage.abbreviation.en} will be applied.`)
			.printMessage();
	}

	/**
	 * Returns abbreviated text for the opposite language.
	 *
	 * @returns {Language}
	 */
	private getOppositeLanguageAbbrievation(): Language {
		return this.languageState === this.translations.siteLanguage.abbreviation.en
			? this.translations.siteLanguage.abbreviation.fr
			: this.translations.siteLanguage.abbreviation.en;
	}

	/**
	 * Returns full word text for the opposite language.
	 *
	 * @returns {string}
	 */
	private getOppositeLanguageFullWord(): string {
		return this.languageState === this.translations.siteLanguage.abbreviation.en
			? this.translations.siteLanguage.fullWord.fr
			: this.translations.siteLanguage.fullWord.en;
	}

	/*
	 * Updates the <html> lang attribute based on component languageState.
	 */
	private updateHTMLLang = () => {
		const htmlElement = getRootHTMLElement();

		if (htmlElement) {
			htmlElement.setAttribute('lang', this.languageState);
		}
	};

	/**
	 * Component life cycle hook.
	 *
	 * https://stenciljs.com/docs/component-lifecycle#connectedcallback
	 */
	connectedCallback() {
		this.setAppLanguageHandler();
	}

	/**
	 * Component life cycle hook.
	 *
	 * https://stenciljs.com/docs/component-lifecycle#componentdidload
	 */
	componentDidLoad() {
		/**
		 * Creates a MutationObserver (a type of watch) on the <html> tag lang attribute.
		 *
		 * When changes occur, the oppositeLanguageLabel state variable regenerates.
		 *
		 * This is to act as a form of callback and create a subtle delay between page content
		 * updating and the language toggle label updating.
		 */
		const observer = new MutationObserver((mutations) => {
			mutations.forEach((mutation) => {
				switch (mutation.type) {
					case 'attributes':
						switch (mutation.attributeName) {
							case 'lang':
								this.oppositeLanguageLabel = {
									fullWord: this.getOppositeLanguageFullWord(),
									abbreviation: this.getOppositeLanguageAbbrievation(),
								};
								break;
						}
						break;
				}
			});
		});

		// Only create/trigger the MutationObserver if the <html> element exists.
		if (getRootHTMLElement()) {
			const options = { attributes: true };
			observer.observe(getRootHTMLElement(), options);
		}
	}

	render() {
		return (
			<a
				aria-label={this.translations.languageToggle.ariaLabel[`${this.oppositeLanguageLabel?.abbreviation}`]}
				class={
					this.size === 'default'
						? 'ontario-language-toggler ontario-language-toggler--default'
						: 'ontario-language-toggler ontario-language-toggler--small'
				}
				href={this.url ? this.url : '#'}
				hreflang={this.oppositeLanguageLabel?.abbreviation}
				lang={this.oppositeLanguageLabel?.abbreviation}
				onClick={(e) => this.handleHeaderLanguageToggled(this.languageState, e)}
			>
				{this.size === 'small' ? (
					<span>{this.oppositeLanguageLabel?.fullWord}</span>
				) : (
					<Fragment>
						<abbr title={this.oppositeLanguageLabel?.fullWord} class="ontario-show-for-small-only">
							{this.oppositeLanguageLabel?.abbreviation.toUpperCase()}
						</abbr>
						<span class="ontario-show-for-medium">{this.oppositeLanguageLabel?.fullWord}</span>
					</Fragment>
				)}
			</a>
		);
	}
}
