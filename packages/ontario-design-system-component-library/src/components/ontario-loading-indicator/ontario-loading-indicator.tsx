import { Component, h, Prop, Listen, State, Watch } from '@stencil/core';
import { Language } from '../../utils/common/language-types';
import { validateLanguage } from '../../utils/validation/validation-functions';
import { validateValueAgainstArray } from '../../utils/validation/validation-functions';
import { ConsoleMessageClass } from '../../utils/console-message/console-message';

import translations from '../../translations/global.i18n.json';

@Component({
	tag: 'ontario-loading-indicator',
	styleUrl: 'ontario-loading-indicator.scss',
	shadow: true,
})
export class OntarioLoadingIndicator {
	/**
	 * The type of loading indicator to render.
	 */
	@Prop() type: 'small' | 'large' = 'large';

	/**
	 * A boolean value to determine whether or not the loading indicator is loading (i.e: is visible) or not.
	 */
	@Prop() isLoading: boolean = false;

	/**
	 * The message that tells the user what is happening or why the user is waiting.
	 * If no message prop is passed, it will default to "Loading". Translations for this default message are included.
	 *
	 * This is optional.
	 */
	@Prop() message?: string;

	/**
	 * A boolean value to determine whether the loading indicator overlay covers the full page or not. By default, this is set to `true`.
	 *
	 * If set to `false`, the loading indicator overlay will be positioned absolutely relative to its container. Note that this will only work if the containing element has a style rule specifying it to be positioned relatively.
	 */
	@Prop() fullScreenOverlay?: boolean = true;

	/**
	 * The language of the component.
	 * This is used for translations, and is by default set through event listeners checking for a language property from the header. If no language is passed, it will default to English.
	 */
	@Prop({ mutable: true }) language?: Language = 'en';

	@State() translations: any = translations;

	/**
	 * Mutable variables, for internal use only.
	 */
	@State() private isLoadingState: boolean;
	@State() private typeState: 'small' | 'large';

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

	/**
	 * Watch for changes in the `type` variable for validation purposes.
	 *
	 * If the user input doesn't match one of the array values then `type` will be set to its default (`large`).
	 * If a match is found in one of the array values then `type` will be set to the matching array key value.
	 */
	@Watch('type')
	validateType() {
		const isValid = validateValueAgainstArray(this.type, ['large', 'small']);
		if (isValid) {
			return (this.typeState = this.type);
		} else {
			this.warnDefaultType();
			return (this.typeState = 'large');
		}
	}

	/**
	 * Print the invalid `type` warning message.
	 * @returns default type ('large')
	 */
	private warnDefaultType() {
		const message = new ConsoleMessageClass();
		message
			.addDesignSystemTag()
			.addMonospaceText(' type ')
			.addRegularText('on')
			.addMonospaceText(' <ontario-loading-indicator> ')
			.addRegularText('was set to an invalid type; only')
			.addMonospaceText(' large or small ')
			.addRegularText('are supported. The default type')
			.addMonospaceText(' large ')
			.addRegularText('is assumed.')
			.printMessage();
	}

	componentWillLoad() {
		this.language = validateLanguage(this.language);
		this.validateType();
		this.isLoadingState = this.isLoading;
	}

	render() {
		return this.typeState === 'large' ? (
			<div
				class={
					this.fullScreenOverlay
						? `ontario-loading-indicator__overlay`
						: `ontario-loading-indicator__overlay--within-container`
				}
				aria-hidden={this.isLoadingState ? 'false' : 'true'}
				role="alert"
				aria-live="assertive"
			>
				<div class="ontario-loading-indicator">
					<svg class="ontario-loading-indicator__spinner" viewBox="25 25 50 50" xmlns="http://www.w3.org/2000/svg">
						<circle cx="50" cy="50" r="20" fill="none" stroke-width="4" />
					</svg>
					<p>{this.message ?? this.translations.loading[`${this.language}`]}</p>
				</div>
			</div>
		) : (
			<p>The small loading indicator is still under development.</p>
		);
	}
}
