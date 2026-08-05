import { Component, Element, Event, EventEmitter, h, Listen, Prop, State, Watch } from '@stencil/core';
import { Language } from '../../utils/common/language-types';
import { validateLanguage } from '../../utils/validation/validation-functions';
import { HeaderLanguageToggleEventDetails } from '../../utils/events/common-events.interface';
import { ConsoleMessageClass } from '../../utils/console-message/console-message';
import { isClientSideRendering } from '../../utils/common/environment';
import translations from '../../translations/global.i18n.json';

export type BackMode = 'history' | 'href' | 'event';

/**
 * Ontario Back Button renders a consistent, accessible back action shell.
 *
 * This component is intentionally navigation-strategy agnostic.
 * Consumers choose whether back behaviour uses browser history, explicit href navigation, or event-only routing.
 *
 * For component guidance, see:
 * - https://designsystem.ontario.ca/components/detail/back-button.html
 * - https://designsystem.ontario.ca/developer-docs/components/ontario-back-button/
 */
@Component({
	tag: 'ontario-back-button',
	styleUrl: 'ontario-back-button.scss',
	shadow: true,
})
export class OntarioBackButton {
	@Element() host: HTMLElement;

	/**
	 * Optional visible text override for the back action.
	 * If not provided, translated defaults are used:
	 * - `Back` for English
	 * - `Retour` for French
	 */
	@Prop() label?: string;

	/**
	 * The language of the component.
	 * If no language is passed, it defaults to English (`en`).
	 */
	@Prop({ mutable: true }) language?: Language;

	/**
	 * Optional destination URL used by href mode.
	 */
	@Prop() href?: string;

	/**
	 * Determines navigation strategy:
	 * - `history`: emits event, then calls browser history back.
	 * - `href`: emits event, then navigates using `href`.
	 * - `event`: emits event only.
	 */
	@Prop() backMode: BackMode = 'history';

	/**
	 * Disables user interaction.
	 */
	@Prop() disabled?: boolean = false;

	/**
	 * Emitted when the user activates the back control.
	 * Emitted before navigation when applicable.
	 */
	@Event() backClick!: EventEmitter<MouseEvent | KeyboardEvent>;

	@State() translations: any = translations;

	@Watch('backMode')
	@Watch('href')
	validateConfiguration() {
		if (this.backMode === 'href' && !this.href) {
			const message = new ConsoleMessageClass();
			message
				.addDesignSystemTag()
				.addMonospaceText(' backMode="href" ')
				.addRegularText('on')
				.addMonospaceText(' <ontario-back-button> ')
				.addRegularText('requires')
				.addMonospaceText(' href ')
				.addRegularText('to be provided. The component will render as a button and emit only')
				.addMonospaceText(' backClick ')
				.addRegularText('until href is set.')
				.printMessage();
		}
	}

	/**
	 * This listens for the `setAppLanguage` event sent from the test language toggler when it is connected to the DOM.
	 * It is used for the initial language when the component loads.
	 */
	@Listen('setAppLanguage', { target: 'window' })
	handleSetAppLanguage(event: CustomEvent<Language>) {
		if (!this.language) {
			this.language = validateLanguage(event);
		}
	}

	/**
	 * Handles an update to language from the global header language toggle event.
	 */
	@Listen('headerLanguageToggled', { target: 'window' })
	handleHeaderLanguageToggled(event: CustomEvent<HeaderLanguageToggleEventDetails>) {
		this.language = validateLanguage(event.detail.newLanguage);
	}

	componentWillLoad() {
		this.language = validateLanguage(this.language);
		this.validateConfiguration();
	}

	/**
	 * Resolves which navigation mode to use at runtime.
	 *
	 * If `href` is provided without an explicit `back-mode` attribute,
	 * this defaults to `href` mode for expected link behaviour.
	 */
	private get resolvedBackMode(): BackMode {
		const hasBackModeAttribute = this.host.hasAttribute('back-mode');

		if (!hasBackModeAttribute && this.href) {
			return 'href';
		}

		return this.backMode;
	}

	/**
	 * Computes the visible back label.
	 *
	 * Uses the `label` prop when provided; otherwise falls back to
	 * language-based defaults from translations.
	 */
	private get labelText(): string {
		if (this.label) {
			return this.label;
		}

		return this.translations.backButton.back[`${this.language}`];
	}

	/**
	 * Handles user activation for both button and link render paths.
	 *
	 * Emits `backClick` first, then applies mode-specific behaviour:
	 * - `event`: emit only
	 * - `history`: call `window.history.back()`
	 * - `href`: allow native link navigation when href exists
	 */
	private handleActivation(event: MouseEvent | KeyboardEvent) {
		if (this.disabled) {
			event.preventDefault();
			return;
		}

		this.backClick.emit(event);

		const mode = this.resolvedBackMode;
		if (mode === 'event') {
			event.preventDefault();
			return;
		}

		if (mode === 'history') {
			event.preventDefault();
			if (isClientSideRendering()) {
				window.history.back();
			}
			return;
		}

		if (mode === 'href' && !this.href) {
			event.preventDefault();
		}
	}

	/**
	 * Renders the native button variant used for `history` and `event` modes,
	 * and as a safe fallback when `href` mode is misconfigured.
	 */
	private renderButton() {
		return (
			<button
				type="button"
				class="ontario-back-button ontario-button ontario-button--tertiary"
				disabled={this.disabled}
				onClick={(event) => this.handleActivation(event)}
			>
				<ontario-icon-chevron-left colour="blue" aria-hidden="true"></ontario-icon-chevron-left>
				{this.labelText}
			</button>
		);
	}

	render() {
		const shouldRenderLink = this.resolvedBackMode === 'href' && !!this.href;

		if (shouldRenderLink) {
			return (
				<a
					class={`ontario-back-button ontario-button ontario-button--tertiary${this.disabled ? ' ontario-back-button--disabled' : ''}`}
					href={this.disabled ? undefined : this.href}
					aria-disabled={this.disabled ? 'true' : undefined}
					tabIndex={this.disabled ? -1 : undefined}
					onClick={(event) => this.handleActivation(event)}
				>
					<ontario-icon-chevron-left colour="blue" aria-hidden="true"></ontario-icon-chevron-left>
					{this.labelText}
				</a>
			);
		}

		return this.renderButton();
	}
}
