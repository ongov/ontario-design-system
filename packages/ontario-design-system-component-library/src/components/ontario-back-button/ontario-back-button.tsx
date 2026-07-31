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
	 * Optional navigation strategy override:
	 * - `history`: emits event, then calls browser history back.
	 * - `href`: emits event, then navigates using `href`.
	 * - `event`: emits event only.
	 *
	 * When omitted, runtime mode is inferred:
	 * - uses `href` mode if `href` exists
	 * - otherwise defaults to `history`
	 */
	@Prop() backMode?: BackMode;

	/**
	 * Disables user interaction.
	 *
	 * Policy note:
	 * This is intended for temporary/transient states only (for example, save-in-progress or
	 * step-transition lock), not as a general-purpose way to gate back navigation in normal usage.
	 * Whether going back is actually valid should be determined by application logic/validation
	 * before this prop is ever set to `true`, not used as a substitute for that validation.
	 */
	@Prop() disabled?: boolean = false;

	/**
	 * Emitted when the user activates the back control.
	 * Emitted before navigation when applicable.
	 */
	@Event() backClick!: EventEmitter<MouseEvent | KeyboardEvent>;

	@State() translations: any = translations;

	/**
	 * Validates that href mode has the required href prop.
	 *
	 * Runs whenever `backMode` or `href` changes.
	 * If `backMode` is set to `'href'` without providing an `href` prop,
	 * logs a developer warning and the component falls back to button rendering with event-only emission.
	 */
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
	 * If `backMode` is explicitly provided (attribute or property), that value wins.
	 * Otherwise, `href` implies link mode; missing `href` falls back to history mode.
	 */
	private get resolvedBackMode(): BackMode {
		return this.backMode ?? (this.href ? 'href' : 'history');
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

		const shouldAllowNativeNavigation = mode === 'href' && !!this.href;
		if (!shouldAllowNativeNavigation) {
			event.preventDefault();
		}

		if (mode === 'history' && isClientSideRendering()) {
			window.history.back();
		}
	}

	/**
	 * Handles the Space key on the anchor render path.
	 *
	 * Native `<a>` elements only activate on Enter (which triggers a native `click`
	 * event and is handled by `handleActivation` via `onClick`); unlike `<button>`,
	 * they do not activate on Space. This listener adds that missing Space-key
	 * activation so keyboard behaviour is consistent with the button render path.
	 */
	private handleAnchorKeyDown(event: KeyboardEvent) {
		if (event.key !== ' ' && event.code !== 'Space') {
			return;
		}

		event.preventDefault();
		this.handleActivation(event);
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
					onKeyDown={(event) => this.handleAnchorKeyDown(event)}
				>
					<ontario-icon-chevron-left colour="blue" aria-hidden="true"></ontario-icon-chevron-left>
					{this.labelText}
				</a>
			);
		}

		return this.renderButton();
	}
}
