import { Component, Prop, Element, State, Listen, Watch, h } from '@stencil/core';
import { v4 as uuid } from 'uuid';

import { TagDismissedDetail } from '../ontario-tag/tag.interface';

import { Language } from '../../utils/common/language-types';
import { HeadingLevel, Hint } from '../../utils/common/common.interface';
import { constructHintTextObject } from '../../utils/components/hints/hints';
import { validateLanguage, validateValueAgainstArray } from '../../utils/validation/validation-functions';
import { ConsoleMessageClass } from '../../utils/console-message/console-message';
import { HeaderLanguageToggleEventDetails } from '../../utils/events/common-events.interface';

import translations from '../../translations/global.i18n.json';

export type TagGroupHeadingLevel = Extract<HeadingLevel, 'h2' | 'h3' | 'h4'>;

// How long a dismissed tag is remembered while waiting for the consumer to remove it.
const DISMISS_EXPIRY_MS = 1000;

/**
 * Ontario Tag Group holds a set of `ontario-tag` elements. It lays them out, gives the set an accessible name and an optional heading with a count, announces when a tag is removed, and keeps keyboard focus in a sensible place after a removal.
 *
 * The group never removes a tag itself: the consumer removes the tag in response to its `tagDismissed` event, and the group reacts to the change in its slot.
 */
@Component({
	tag: 'ontario-tag-group',
	styleUrl: 'ontario-tag-group.scss',
	shadow: true,
})
export class OntarioTagGroup {
	@Element() host: HTMLElement;

	private containerRef?: HTMLDivElement;
	private headingRef?: HTMLElement;

	private pendingRemoval?: { label: string; index: number; tag: HTMLOntarioTagElement };
	private pendingTimer?: ReturnType<typeof setTimeout>;

	/**
	 * The visible heading of the group, for example "Applied filters".
	 *
	 * This property is optional.
	 */
	@Prop() heading?: string;

	/**
	 * The heading element, set by the consumer to keep the page outline correct.
	 *
	 * Accepts 'h2', 'h3' or 'h4'. Default is 'h3'.
	 */
	@Prop({ mutable: true }) headingLevel: TagGroupHeadingLevel = 'h3';

	/**
	 * Appends the number of tags to the heading, for example "(6)".
	 *
	 * This only applies when a `heading` is set.
	 *
	 * This property is optional.
	 */
	@Prop() showCount?: boolean = true;

	/**
	 * Hint text shown below the heading to explain the group, for example "Select a tag to remove it".
	 *
	 * This is passed in as a string, or as a `Hint` object to render HTML content.
	 *
	 * This property is optional.
	 */
	@Prop() hintText?: string | Hint;

	/**
	 * The accessible name of the group, used when there is no visible heading.
	 *
	 * If neither `heading` nor `groupLabel` is provided, a warning is printed.
	 *
	 * This property is optional.
	 */
	@Prop() groupLabel?: string;

	/**
	 * The unique identifier of the group.
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
	 * Store the translation dictionary for use within the component.
	 */
	@State() translations: any = translations;

	/**
	 * The number of `ontario-tag` elements in the default slot.
	 */
	@State() private tagCount = 0;

	/**
	 * The message in the live region that announces a removal.
	 */
	@State() private statusMessage = '';

	/**
	 * The parsed `hintText` used to render the `ontario-hint-text` component.
	 */
	@State() private internalHintText?: Hint;

	/**
	 * This listens for the `setAppLanguage` event sent from the test language toggler when it is is connected to the DOM. It is used for the initial language when the tag group component loads.
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
	 * Records which tag was dismissed and its position, so focus and the announcement can follow its removal.
	 *
	 * Uses the capture phase so the record is made before a consumer's listener can remove the tag.
	 */
	@Listen('tagDismissed', { capture: true })
	handleTagDismissed(event: CustomEvent<TagDismissedDetail>) {
		const tag = event.target as HTMLOntarioTagElement;
		const index = this.getTags().indexOf(tag);

		if (index === -1) return;

		this.clearPendingRemoval();
		this.pendingRemoval = { label: event.detail.label, index, tag };
		this.pendingTimer = setTimeout(() => this.clearPendingRemoval(), DISMISS_EXPIRY_MS);
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
	 * Watch for changes in the `hintText` prop and parse it into a `Hint` object.
	 */
	@Watch('hintText')
	parseHintText() {
		this.internalHintText = this.hintText ? constructHintTextObject(this.hintText) : undefined;
	}

	/**
	 * Watch for changes in `headingLevel` prop to validate its value.
	 */
	@Watch('headingLevel')
	validateHeadingLevel() {
		const allowedValues: TagGroupHeadingLevel[] = ['h2', 'h3', 'h4'];

		if (!validateValueAgainstArray(this.headingLevel, allowedValues)) {
			const message = new ConsoleMessageClass();
			message
				.addDesignSystemTag()
				.addMonospaceText(' headingLevel ')
				.addRegularText('on')
				.addMonospaceText(' <ontario-tag-group> ')
				.addRegularText('was set to an invalid value; only ')
				.addMonospaceText(allowedValues.join(', '))
				.addRegularText(' are supported. The default value ')
				.addMonospaceText('h3')
				.addRegularText(' is assumed.')
				.printMessage();

			this.headingLevel = 'h3';
		}
	}

	/**
	 * Watch for changes in the `heading` and `groupLabel` props for validation purposes.
	 *
	 * If neither is provided, the group has no accessible name and a warning message is printed.
	 */
	@Watch('heading')
	@Watch('groupLabel')
	validateAccessibleName() {
		if (!this.heading && !this.groupLabel) {
			const message = new ConsoleMessageClass();
			message
				.addDesignSystemTag()
				.addMonospaceText(' heading ')
				.addRegularText('or')
				.addMonospaceText(' group-label ')
				.addRegularText('for')
				.addMonospaceText(' <ontario-tag-group> ')
				.addRegularText('was not provided. The group will not have an accessible name.')
				.printMessage();
		}
	}

	/**
	 * Returns the `ontario-tag` elements in the group, in order.
	 *
	 * @returns {HTMLOntarioTagElement[]}
	 */
	private getTags(): HTMLOntarioTagElement[] {
		// Query the light DOM, not the slot: @stencil/ssr (Next.js) wraps each tag in a `display: contents` div.
		return Array.from(this.host.querySelectorAll<HTMLOntarioTagElement>('ontario-tag'));
	}

	private clearPendingRemoval() {
		clearTimeout(this.pendingTimer);
		this.pendingTimer = undefined;
		this.pendingRemoval = undefined;
	}

	/**
	 * Recounts the tags and, if a dismissed tag has just been removed, moves focus and announces the removal.
	 */
	private handleSlotChange = () => {
		const tags = this.getTags();
		this.tagCount = tags.length;

		const removal = this.pendingRemoval;
		if (!removal || tags.includes(removal.tag)) return;

		this.clearPendingRemoval();

		const nextTag = tags[removal.index] ?? tags[removal.index - 1];
		if (nextTag) {
			nextTag.setFocus();
		} else {
			(this.headingRef ?? this.containerRef)?.focus();
		}

		const lang = `${this.language}`;
		const { removed, removedOne, empty } = this.translations.tagGroup;
		const message =
			tags.length > 1
				? removed[lang].replace('{count}', () => `${tags.length}`)
				: tags.length === 1
					? removedOne[lang]
					: empty[lang];
		this.statusMessage = message.replace('{label}', () => removal.label);
	};

	componentWillLoad() {
		this.language = validateLanguage(this.language);
		this.elementId = this.elementId ?? uuid();
		this.validateHeadingLevel();
		this.validateAccessibleName();
		this.parseHintText();
	}

	componentDidLoad() {
		this.tagCount = this.getTags().length;
	}

	disconnectedCallback() {
		this.clearPendingRemoval();
	}

	render() {
		const headingId = `${this.elementId}-heading`;
		const hintId = `${this.elementId}-hint`;
		const headingText = this.showCount ? `${this.heading} (${this.tagCount})` : `${this.heading}`;
		const headingProps = {
			id: headingId,
			class: { 'ontario-tag-group__heading': true },
			tabindex: -1,
			ref: (el: HTMLElement) => (this.headingRef = el),
		};

		return (
			<div
				class="ontario-tag-group"
				id={this.elementId}
				role="group"
				aria-labelledby={this.heading ? headingId : undefined}
				aria-label={this.heading ? undefined : this.groupLabel}
				aria-describedby={this.internalHintText ? hintId : undefined}
				tabindex={this.heading ? undefined : -1}
				ref={(el) => (this.containerRef = el)}
			>
				{this.heading && h(this.headingLevel, headingProps, headingText)}
				{this.internalHintText && (
					<ontario-hint-text
						id={hintId}
						class="ontario-tag-group__hint"
						hint={this.internalHintText.hint}
						hintContentType={this.internalHintText.hintContentType}
					></ontario-hint-text>
				)}
				<div class="ontario-tag-group__tags">
					<slot onSlotchange={this.handleSlotChange}></slot>
				</div>
				<div class="ontario-tag-group__status" role="status" aria-live="polite" aria-atomic="true">
					{this.statusMessage}
				</div>
			</div>
		);
	}
}
