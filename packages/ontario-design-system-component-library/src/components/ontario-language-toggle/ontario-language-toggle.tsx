import { Component, Prop, State, Event, EventEmitter, h, Fragment } from '@stencil/core';

import { Language } from '../../utils/common/language-types';
import { validateLanguage } from '../../utils/validation/validation-functions';

import { default as translations } from '../../translations/global.i18n.json';

@Component({
	tag: 'ontario-language-toggle',
	styleUrl: 'ontario-language-toggle.scss',
	shadow: true,
})
export class OntarioLanguageToggle {
	@Prop({ mutable: true }) language: Language | string = 'en';

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
	@Prop() customLanguageToggleFunction?: Function;

	@State() translations: any = translations;

	/**
	 * An event to set the Document's HTML lang property, and emit the toggled language to other components.
	 */
	@Event() setAppLanguage: EventEmitter<string>;
	setAppLanguageHandler() {
		let lang: string | Language;
		if (this.language) {
			lang = this.language;
		} else if (document.documentElement.lang) {
			lang = document.documentElement.lang;
		} else {
			lang = 'en';
		}

		this.language = lang;
		this.setAppLanguage.emit(lang);

		this.updateHTMLLang(lang);
	}

	/**
	 * An event that emits to other components that the language toggle button has been toggled.
	 */
	@Event() headerLanguageToggled: EventEmitter<string>;
	handleHeaderLanguageToggled(language: string) {
		const toggledLang = language === 'en' ? 'fr' : 'en';
		this.language = toggledLang;
		this.headerLanguageToggled.emit(toggledLang);

		this.updateHTMLLang(toggledLang);
	}

	updateHTMLLang = (lang: string) => {
		const htmlElement = document.firstElementChild;

		if (htmlElement?.tagName.toLowerCase() === 'html') {
			if (lang) {
				htmlElement.setAttribute('lang', lang);
			} else {
				htmlElement.setAttribute('lang', 'en');
			}
		}

		return;
	};

	connectedCallback() {
		this.language = validateLanguage(this.language);
		this.setAppLanguageHandler();
	}

	render() {
		const lang = this.language === 'en' ? 'Français' : 'English';
		const abbreviatedLang = this.language === 'en' ? 'FR' : 'EN';

		return (
			<a
				class={
					this.size === 'default'
						? 'ontario-language-toggler ontario-language-toggler--default'
						: 'ontario-language-toggler ontario-language-toggler--small'
				}
				href={this.url ? this.url : '#'}
				aria-label={this.translations.languageToggle.ariaLabel[`${this.language}`]}
				onClick={(e) => {
					this.handleHeaderLanguageToggled(this.language);
					if (this.customLanguageToggleFunction) {
						this.customLanguageToggleFunction(e);
					}
				}}
			>
				{this.size === 'small' ? (
					<span>{lang}</span>
				) : (
					<Fragment>
						<abbr title={lang} class="ontario-show-for-small-only">
							{abbreviatedLang}
						</abbr>
						<span class="ontario-show-for-medium">{lang}</span>
					</Fragment>
				)}
			</a>
		);
	}
}
