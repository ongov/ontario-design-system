import { Component, Prop, Event, EventEmitter, h } from '@stencil/core';

@Component({
	tag: 'test-language-toggle',
	styleUrl: 'test-language-toggle.scss',
	shadow: true,
})
export class TestLanguageToggle {
	@Prop({ mutable: true }) language: string;

	@Event() setAppLanguage: EventEmitter<string>;
	setAppLanguageHandler() {
		let lang: string;
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
		this.setAppLanguageHandler();
	}

	render() {
		return (
			<button type="button" onClick={() => this.handleHeaderLanguageToggled(this.language)}>
				{this.language === 'en' ? 'Français' : 'English'}
			</button>
		);
	}
}
