import { Component, Prop, Event, EventEmitter, h } from '@stencil/core';

@Component({
	tag: 'test-language-toggle',
	styleUrl: 'test-language-toggle.scss',
	shadow: true,
})
export class TestLanguageToggle {
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
	}

	@Event() headerLanguageToggled: EventEmitter<string>;
	handleHeaderLanguageToggled(language: string) {
		const toggledLang = language === 'en' ? 'fr' : 'en';
		this.language = toggledLang;
		this.headerLanguageToggled.emit(toggledLang);
	}
	@Prop({ mutable: true }) language: string;

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
