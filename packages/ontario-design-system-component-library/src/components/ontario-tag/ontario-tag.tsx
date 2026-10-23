import { Component, Prop, Element, Event, EventEmitter, State, Method, Listen, Watch, h } from '@stencil/core';
import { v4 as uuid } from 'uuid';

import { TagDismissedDetail, TagToggledDetail } from './tag.interface';

import { Language } from '../../utils/common/language-types';
import { isClientSideRendering } from '../../utils/common/environment';
import { validateLanguage } from '../../utils/validation/validation-functions';
import { ConsoleMessageClass } from '../../utils/console-message/console-message';
import { HeaderLanguageToggleEventDetails } from '../../utils/events/common-events.interface';

import translations from '../../translations/global.i18n.json';

/**
 * Ontario Tag is a compact control used to filter content, show applied filters, and manage user-created labels.
 *
 * A non-dismissible tag toggles between selected and unselected. A dismissible tag is always shown as selected and emits an event when activated, leaving removal up to the consuming application.
 */
@Component({
	tag: 'ontario-tag',
	styleUrl: 'ontario-tag.scss',
	shadow: true,
})
export class OntarioTag {
	@Element() host: HTMLElement;

	private buttonRef?: HTMLButtonElement;

	/**
	 * The text displayed in the tag.
	 *
	 * This overrides the text provided through the host element's text content.
	 *
	 * If neither `label` nor the host text content is provided, a warning is printed and the tag is not rendered.
	 */
	@Prop() label?: string;

	/**
	 * A stable identifier sent in events, so consumers are not tied to translated label text.
	 *
	 * If no `value` is passed, the label text is used.
	 *
	 * This property is optional.
	 */
	@Prop() value?: string;

	/**
	 * The selected state of a non-dismissible tag.
	 *
	 * This is ignored, with a warning, when `dismissible` is also set.
	 *
	 * This property is optional.
	 */
	@Prop({ mutable: true, reflect: true }) selected?: boolean = false;

	/**
	 * Renders a close icon after the label, and makes activating the tag dismiss it.
	 *
	 * A dismissible tag always uses the selected style.
	 *
	 * This property is optional.
	 */
	@Prop() dismissible?: boolean = false;

	/**
	 * Overrides the accessible name of a dismissible tag.
	 *
	 * If no `dismissLabel` is passed, the translated "Remove {label}" is used.
	 *
	 * This property is optional.
	 */
	@Prop() dismissLabel?: string;

	/**
	 * Provides more context for the non-dismissible tag button, only if the label alone is not enough.
	 *
	 * This property is optional.
	 */
	@Prop() ariaLabelText?: string;

	/**
	 * The unique identifier of the tag.
	 *
	 * If no `elementId` is passed, one will be generated.
	 *
	 * This property is optional.
	 */
	@Prop({ mutable: true }) elementId?: string;

	/**
	 * The language of the component.
	 * This is used for translations, and is by default set through event listeners checking for a language property from the header. If none are passed, it will default to English.
	 */
	@Prop({ mutable: true }) language?: Language;

	/**
	 * A function called when a non-dismissible tag is selected or deselected, in addition to the `tagToggled` event.
	 *
	 * This property is optional.
	 */
	@Prop() customOnToggle?: (detail: TagToggledDetail) => void;

	/**
	 * A function called when a dismissible tag is activated, in addition to the `tagDismissed` event.
	 *
	 * This property is optional.
	 */
	@Prop() customOnDismiss?: (detail: TagDismissedDetail) => void;

	/**
	 * Emitted when a non-dismissible tag is selected or deselected by mouse, touch, or keyboard.
	 */
	@Event() tagToggled: EventEmitter<TagToggledDetail>;

	/**
	 * Emitted when a dismissible tag is activated by mouse, touch, or keyboard.
	 *
	 * A tag never removes itself: the consumer removes it from the list in response to this event.
	 */
	@Event() tagDismissed: EventEmitter<TagDismissedDetail>;

	/**
	 * Store the translation dictionary for use within the component.
	 */
	@State() translations: any = translations;

	/**
	 * This listens for the `setAppLanguage` event sent from the test language toggler when it is is connected to the DOM. It is used for the initial language when the tag component loads.
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
	 * Watch for changes to the `language` prop for validation purposes.
	 *
	 * If no `language` is passed, or if it is not a valid language, the default of English is used.
	 */
	@Watch('language')
	validateLanguageProp() {
		this.language = validateLanguage(this.language);
	}

	/**
	 * Watch for changes in the `label` prop for validation purposes.
	 *
	 * If no `label` value or host text content is provided, a warning message will be printed.
	 */
	@Watch('label')
	validateLabel() {
		if (!this.getTagLabel()) {
			const message = new ConsoleMessageClass();
			message
				.addDesignSystemTag()
				.addMonospaceText(' a label ')
				.addRegularText('for')
				.addMonospaceText(' <ontario-tag> ')
				.addRegularText('was not provided. The tag will not be rendered.')
				.printMessage();
		}
	}

	/**
	 * Watch for `selected` being set together with `dismissible`.
	 *
	 * A dismissible tag always uses the selected style, so `selected` is ignored and a warning message is printed.
	 */
	@Watch('selected')
	@Watch('dismissible')
	validateSelected() {
		if (this.dismissible && this.selected) {
			const message = new ConsoleMessageClass();
			message
				.addDesignSystemTag()
				.addMonospaceText(' selected ')
				.addRegularText('on')
				.addMonospaceText(' <ontario-tag> ')
				.addRegularText('is ignored when')
				.addMonospaceText(' dismissible ')
				.addRegularText('is also set.')
				.printMessage();
		}
	}

	/**
	 * Focuses the tag's button.
	 *
	 * This is used by `ontario-tag-group` to move focus after a removal.
	 */
	@Method()
	async setFocus(): Promise<void> {
		this.buttonRef?.focus();
	}

	/**
	 * Returns the tag label depending on if the `label` prop was set or
	 * if the host text content (text in-between the opening and closing tag) was set.
	 *
	 * The `label` prop takes priority.
	 *
	 * @returns {string | null}
	 */
	private getTagLabel(): string | null {
		if (this.label) return this.label;

		// SSR safety check: ensure we're in the client-side environment before accessing textContent
		if (isClientSideRendering()) {
			const text = this.host?.textContent?.trim();
			return text ? text : null;
		}

		return null;
	}

	/**
	 * Returns the accessible name of a dismissible tag, in the current language.
	 *
	 * @returns {string}
	 */
	private getDismissLabel(label: string): string {
		if (this.dismissLabel) return this.dismissLabel;

		return this.translations.tag.dismiss[`${this.language}`].replace('{label}', () => label);
	}

	private handleClick = () => {
		const label = this.getTagLabel() ?? '';
		const value = this.value ?? label;

		if (this.dismissible) {
			const detail: TagDismissedDetail = { label, value };
			this.tagDismissed.emit(detail);
			this.customOnDismiss?.(detail);
			return;
		}

		this.selected = !this.selected;

		const detail: TagToggledDetail = { label, value, selected: !!this.selected };
		this.tagToggled.emit(detail);
		this.customOnToggle?.(detail);
	};

	componentWillLoad() {
		this.language = validateLanguage(this.language);
		this.elementId = this.elementId ?? uuid();
		this.validateLabel();
		this.validateSelected();
	}

	render() {
		const label = this.getTagLabel();

		if (!label) return null;

		const isSelectedStyle = this.dismissible || !!this.selected;

		return (
			<button
				id={this.elementId}
				type="button"
				class={{
					'ontario-tag': true,
					'ontario-tag--selected': isSelectedStyle,
					'ontario-tag--dismissible': !!this.dismissible,
				}}
				aria-pressed={this.dismissible ? undefined : this.selected ? 'true' : 'false'}
				aria-label={this.dismissible ? this.getDismissLabel(label) : this.ariaLabelText}
				onClick={this.handleClick}
				ref={(el) => (this.buttonRef = el)}
			>
				<span class="ontario-tag__label">{label}</span>
				{this.dismissible && (
					<ontario-icon-close class="ontario-tag__icon" iconWidth={24} colour="inherit" isDecorative={true} />
				)}
			</button>
		);
	}
}
