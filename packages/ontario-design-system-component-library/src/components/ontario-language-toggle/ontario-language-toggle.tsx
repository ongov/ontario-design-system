import { Component, Prop, State, Event, EventEmitter, Watch, h, Fragment } from '@stencil/core';

import { supportedLanguages, Language } from '../../utils/common/language-types';

import { default as translations } from '../../translations/global.i18n.json';
import { HeaderLanguageToggleEventDetails } from '../../utils/events/common-events.interface';
import { validateValueAgainstArray } from '../../utils/validation/validation-functions';
import { ConsoleMessageClass } from '../../utils/console-message/console-message';
import { printArray } from '../../utils/helper/utils';

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
	@Prop({ mutable: true }) language: Language;

	@State() languageState: Language;

	@Watch('language')
	/**
	 * Updates the language and languageState props when changes to the language prop are detected.
	 */
	updateLanguage() {
		if (!validateValueAgainstArray(this.language, supportedLanguages)) {
			this.showLanguageWarning(this.language);
			this.language = 'en';
		}
		this.languageState = this.language;
		this.setAppLanguageHandler();
	}

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
	 * Prints a warning message to the console about using an incorrect language for the component.
	 *
	 * @param {string} lang - The incorrect language that was received.
	 * @param {string} type - prop/document | Where the incorrect language is coming from.
	 */
	showLanguageWarning(lang: string, type: 'prop' | 'document' = 'prop') {
		const propOrDocumentMessage =
			type === 'prop' ? `The language prop value of ${lang} ` : `The HTML document lang attribute value of ${lang} `;
		const message = new ConsoleMessageClass();
		message
			.addDesignSystemTag()
			.addRegularText(propOrDocumentMessage)
			.addRegularText('is not a valid language value for the ')
			.addMonospaceText(' <ontario-language-toggle> ')
			.addRegularText(`component. Valid language values are ${printArray([...supportedLanguages])}. `)
			.addRegularText('A default language value of `en` will be applied.')
			.printMessage();
	}

	/**
	 * An event to set the Document's HTML lang property, and emit the toggled language to other components.
	 */
	@Event() setAppLanguage: EventEmitter<Language>;
	setAppLanguageHandler() {
		if (!this.languageState) {
			if (document?.documentElement.lang) {
				if (validateValueAgainstArray(document.documentElement.lang, supportedLanguages)) {
					this.languageState = document.documentElement.lang as Language;
				} else {
					this.showLanguageWarning(document.documentElement.lang, 'document');
					this.languageState = 'en';
				}
			} else {
				this.languageState = 'en';
			}
		}

		this.setAppLanguage.emit(this.languageState);
		this.updateHTMLLang();
	}

	/**
	 * An event that emits to other components that the language toggle button has been toggled.
	 *
	 * @param {Language} oldLanguage - The language prior to the language toggle being pressed.
	 * @param {globalThis.Event} event - event that triggered the function (e.g. onclick).
	 */
	@Event() headerLanguageToggled: EventEmitter<HeaderLanguageToggleEventDetails>;
	handleHeaderLanguageToggled(oldLanguage: Language, event?: globalThis.Event) {
		this.languageState = oldLanguage === 'en' ? 'fr' : 'en';

		this.headerLanguageToggled.emit({ oldLanguage: oldLanguage, newLanguage: this.languageState });

		this.updateHTMLLang();

		if (this.customLanguageToggle && event) {
			this.customLanguageToggle(event);
		}
	}

	/**
	 * Returns abbreviated text for the opposite language.
	 *
	 * @returns {Language}
	 */
	getOppositeLanguageAbbrievation(): Language {
		return this.languageState === 'en' ? 'fr' : 'en';
	}

	/**
	 * Returns full word text for the opposite language.
	 *
	 * @returns {string}
	 */
	getOppositeLanguageFullWord(): string {
		return this.languageState === 'en' ? this.translations.siteLanguage.fr : this.translations.siteLanguage.en;
	}

	/*
	 * Update the <html> lang attribute based on component language state.
	 */
	updateHTMLLang = () => {
		const htmlElement = document.getElementsByTagName('html')[0];

		if (htmlElement) {
			htmlElement.setAttribute('lang', this.languageState);
		}
	};

	/*
	 * Component life cycle hook.
	 */
	connectedCallback() {
		this.setAppLanguageHandler();
	}

	render() {
		return (
			<a
				aria-label={this.translations.languageToggle.ariaLabel[`${this.languageState}`]}
				class={
					this.size === 'default'
						? 'ontario-language-toggler ontario-language-toggler--default'
						: 'ontario-language-toggler ontario-language-toggler--small'
				}
				href={this.url ? this.url : '#'}
				hreflang={this.getOppositeLanguageAbbrievation()}
				lang={this.getOppositeLanguageAbbrievation()}
				onClick={(e) => this.handleHeaderLanguageToggled(this.languageState, e)}
			>
				{this.size === 'small' ? (
					<span>{this.getOppositeLanguageFullWord()}</span>
				) : (
					<Fragment>
						<abbr title={this.getOppositeLanguageFullWord()} class="ontario-show-for-small-only">
							{this.getOppositeLanguageAbbrievation().toUpperCase()}
						</abbr>
						<span class="ontario-show-for-medium">{this.getOppositeLanguageFullWord()}</span>
					</Fragment>
				)}
			</a>
		);
	}
}
