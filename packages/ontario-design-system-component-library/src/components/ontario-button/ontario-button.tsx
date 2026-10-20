import { Component, Prop, Element, h, Watch, State, AttachInternals } from '@stencil/core';

import { Button } from './button.interface';
import { ButtonType, ButtonTypes, HtmlType, HtmlTypes } from './ontario-button.types';

import { validatePropExists, validateValueAgainstArray } from '../../utils/validation/validation-functions';
import { ConsoleMessageClass } from '../../utils/console-message/console-message';
import { isServerSideRendering } from '../../utils/common/environment';

/**
 * Ontario Button triggers actions and supports button or link behavior.
 *
 * This component intentionally does not expose a `disabled` prop.
 *
 * To support accessible and understandable form completion:
 * - keep actions available
 * - use validation and error messaging to guide corrections instead of disabling
 *
 * For component guidance, see:
 * - https://designsystem.ontario.ca/components/detail/buttons.html
 * - https://designsystem.ontario.ca/developer-docs/components/ontario-button/
 *
 * Disabled/read-only policy source:
 * - https://designsystem.ontario.ca/components/detail/buttons.html#disabled-buttons
 *
 * ## Icons
 *
 * Icons can be added alongside a `label`/text content using the `leading-icon` and
 * `trailing-icon` named slots. Either slot (or both) can be used; only one of the two
 * slotted sides needs an icon for the other to still collapse its spacing automatically.
 *
 * Prefer an `ontario-icon-*` component with `colour="inherit"`, so the icon automatically
 * tracks the button's current text colour (including hover/focus/active state changes)
 * instead of needing a colour set per button `type`.
 *
 * @example
 * <ontario-button label="Save">
 *   <ontario-icon-add slot="leading-icon" colour="inherit" is-decorative="true"></ontario-icon-add>
 * </ontario-button>
 *
 * A raw `<svg>`/`<img>` can also be slotted in directly (e.g. for a custom icon); it is
 * sized to 24x24px automatically.
 *
 * @example
 * <ontario-button label="Save">
 *   <svg slot="leading-icon" aria-hidden="true" focusable="false">...</svg>
 * </ontario-button>
 *
 * Icon-only buttons (no visible label) are detected automatically when a default-slotted
 * element (e.g. an `ontario-icon-*` component or an SVG) is provided without a
 * `label`/text content. In this mode, always provide `ariaLabelText` so the button
 * remains accessible.
 *
 * @example
 * <ontario-button aria-label-text="Open map">
 *   <ontario-icon-map colour="inherit" is-decorative="true"></ontario-icon-map>
 * </ontario-button>
 */
@Component({
	tag: 'ontario-button',
	styleUrl: 'ontario-button.scss',
	shadow: true,
	formAssociated: true,
})
export class OntarioButton implements Button {
	@Element() host: HTMLElement;
	@AttachInternals() internals: ElementInternals;

	/**
	 * The type of button to render.
	 *
	 * If no type is passed, it will default to 'secondary'.
	 */
	@Prop() type: ButtonType = 'secondary';

	/**
	 * The native HTML button type the button should use.
	 *
	 * If no `htmlType` is passed, it will default to `'button'`.
	 * This prop only affects the component when it renders as a native `<button>`.
	 * If `href` is provided, the component renders as a native `<a>` and `htmlType` is ignored.
	 */
	@Prop() htmlType: HtmlType = 'button';

	/**
	 * When provided, the component renders as a native anchor for navigation use cases.
	 * This takes precedence over `htmlType`, so form-submission behaviour is disabled in link mode.
	 */
	@Prop() href?: string;

	/**
	 * Specifies where to open the linked document when `href` is provided.
	 * This prop has no effect unless the component is in link mode.
	 */
	@Prop() target?: string;

	/**
	 * Specifies the relationship of the linked document to the current document when `href` is provided.
	 * This prop has no effect unless the component is in link mode.
	 */
	@Prop() rel?: string;

	/**
	 * Text to be displayed within the button. This will override the text provided through the host element textContent.
	 *
	 * @example
	 * <ontario-button label="Label Text">Text</ontario-button>
	 *
	 * The resulting button will have the label `"Label Text"`.
	 */
	@Prop() label?: string;

	/**
	 * Provides more context as to what the button interaction is doing. This should only be used for accessibility purposes, if the button interaction requires more description than what the text provides.
	 *
	 *  This is optional.
	 *
	 * @example
	 * <ontario-button aria-label-text="Click button to open map">Open</ontario button>
	 */
	@Prop({ mutable: true }) ariaLabelText?: string;

	/**
	 * The unique identifier of the button. This is optional - if no ID is passed, one will be generated.
	 */
	@Prop({ mutable: true }) elementId?: string;

	/**
	 * Mutable variable, for internal use only.
	 * Set the button's type depending on validation result.
	 */
	@State() private typeState: string;

	/**
	 * Mutable variable, for internal use only.
	 * Set the native HTML button type depending on validation result.
	 */
	@State() private htmlTypeState: string;

	@State() private labelState: string;

	/**
	 * Mutable variable, for internal use only.
	 * Tracks whether a `leading-icon` slotted element is present, so the slot's spacing
	 * can be hidden when empty.
	 */
	@State() private hasLeadingIcon = false;

	/**
	 * Mutable variable, for internal use only.
	 * Tracks whether a `trailing-icon` slotted element is present, so the slot's spacing
	 * can be hidden when empty.
	 */
	@State() private hasTrailingIcon = false;

	/**
	 * Mutable variable, for internal use only.
	 * Tracks whether the button is in icon-only mode: no `label`/text content, no leading/trailing
	 * icon slots, but default-slotted element content (e.g. an SVG) is present.
	 */
	@State() private isIconOnly = false;

	/**
	 * A reference to the internal button element.
	 */

	private buttonRef: HTMLButtonElement;

	private hasWarnedLinkHtmlTypeConflict = false;

	/*
	 * Watch for changes to the `label` property for validation purposes.
	 *
	 * If  no `label` prop is provided, the `label` prop will be set to the host element textContent (if it exists).
	 */
	@Watch('label')
	private updateLabelContent() {
		if (isServerSideRendering()) {
			// Ensure host and its textContent are defined and accessible (safe for SSR environments)
			this.labelState = this.label ?? '';
		} else {
			this.labelState = this.label ?? this.host.textContent ?? '';
		}
		this.validateLabelContent(this.labelState);
	}

	/**
	 * Watch for changes to the `type` property for validation purposes.
	 *
	 * If the user input doesn't match one of the array values then `type` will be set to its default (`secondary`).
	 * If a match is found in one of the array values then `type` will be set to the matching array key value.
	 */
	@Watch('type')
	validateType() {
		const isValid = validateValueAgainstArray(this.type, ButtonTypes);
		this.typeState = isValid ? this.type : this.warnDefaultType();
	}

	/**
	 *  Watch for changes to the `htmlType` property for validation purposes.
	 *
	 * If the user input doesn't match one of the array values then `htmlType` will be set to its default (`submit`).
	 * If a match is found in one of the array values then `htmlType` will be set to the matching array key value.
	 */
	@Watch('htmlType')
	validateHtmlType() {
		const isValid = validateValueAgainstArray(this.htmlType, HtmlTypes);
		this.htmlTypeState = isValid ? this.htmlType : this.warnDefaultHtmlType();
	}

	/**
	 * Re-check the host's light DOM for `leading-icon`/`trailing-icon` slotted elements and
	 * default-slotted (icon-only) content, so internal layout state stays in sync with
	 * whatever the consumer has slotted in.
	 *
	 * Detection is done directly against the host's light DOM (rather than via `slotchange`)
	 * so it works correctly on the very first render, before any shadow DOM `<slot>` exists.
	 * This also needs to run during SSR (not just client-side): Stencil's hydrate app provides
	 * a fully DOM-compatible `this.host`, and skipping this on the server would bake an
	 * incorrect "empty" state into the server-rendered HTML (hiding real slotted icons until
	 * client-side hydration corrects it).
	 */
	private syncSlotState() {
		this.hasLeadingIcon = !!this.host.querySelector('[slot="leading-icon"]');
		this.hasTrailingIcon = !!this.host.querySelector('[slot="trailing-icon"]');

		const hasNamedIconSlots = this.hasLeadingIcon || this.hasTrailingIcon;
		// Checks direct child nodes rather than `labelState`/`textContent`, so that an SVG's own
		// accessible name (e.g. a `<title>`/`<desc>`) isn't mistaken for a visible button label.
		// Comment nodes (inserted by some frameworks) are also ignored.
		const hasVisibleLabel =
			!!this.label?.trim() ||
			Array.from(this.host.childNodes).some(
				(node) => !['svg', '#comment'].includes(node.nodeName.toLowerCase()) && !!node.textContent?.trim(),
			);
		const hasDefaultSlotElementContent = Array.from(this.host.children).some((child) => !child.hasAttribute('slot'));

		this.isIconOnly = !hasNamedIconSlots && !hasVisibleLabel && hasDefaultSlotElementContent;
	}

	/**
	 * Print the missing `label` prop warning message.
	 *
	 * A button without a visible `label` can still have an accessible name from `ariaLabelText`
	 * (e.g. when using slotted SVG content), which is checked by `validateAriaLabelText`.
	 */
	validateLabelContent(newValue: string) {
		if (validatePropExists(newValue)) {
			this.validateAriaLabelText();
		}
	}

	/**
	 * Print the missing `ariaLabelText` prop warning message.
	 *
	 * Used when there is no visible `label`, in which case `ariaLabelText` is what gives the button an accessible name.
	 */
	validateAriaLabelText() {
		if (validatePropExists(this.ariaLabelText ?? '')) {
			const message = new ConsoleMessageClass();
			message
				.addDesignSystemTag()
				.addMonospaceText(' aria-label-text ')
				.addRegularText('for')
				.addMonospaceText(' <ontario-button> ')
				.addRegularText('was not provided. It is needed to give the button an accessible name when there is no')
				.addMonospaceText(' label ')
				.addRegularText('.')
				.printMessage();
		}
	}

	/**
	 * Print the invalid `type` prop warning message
	 * @returns default type (secondary)
	 */
	private warnDefaultType(): ButtonType {
		const message = new ConsoleMessageClass();
		message
			.addDesignSystemTag()
			.addMonospaceText(' type ')
			.addRegularText('on')
			.addMonospaceText(' <ontario-button> ')
			.addRegularText('was set to an invalid type; only')
			.addMonospaceText(' primary, secondary, or tertiary ')
			.addRegularText('are supported. The default type')
			.addMonospaceText(' secondary ')
			.addRegularText('is assumed.')
			.printMessage();
		return 'secondary';
	}

	/**
	 * Print the invalid `htmlType` warning message
	 * @returns default htmlType (button)
	 */
	private warnDefaultHtmlType(): HtmlType {
		const message = new ConsoleMessageClass();
		message
			.addDesignSystemTag()
			.addMonospaceText(' htmlType ')
			.addRegularText('on')
			.addMonospaceText(' <ontario-button> ')
			.addRegularText('was set to an invalid htmlType; only')
			.addMonospaceText(' button, reset, or submit ')
			.addRegularText('are supported. The default type')
			.addMonospaceText(' button ')
			.addRegularText('is assumed.')
			.printMessage();
		return 'button';
	}

	/**
	 * @returns the classes of the button based of the button's `type`.
	 */
	private getClass() {
		const classes = ['ontario-button', `ontario-button--${this.typeState}`];
		if (this.isIconOnly) {
			classes.push('ontario-button--icon-only');
		} else {
			const iconCount = (this.hasLeadingIcon ? 1 : 0) + (this.hasTrailingIcon ? 1 : 0);
			if (iconCount > 0) {
				classes.push(`ontario-button--icons-${iconCount}`);
			}
		}
		return classes.join(' ');
	}

	private isLinkMode() {
		return !!this.href;
	}

	private warnIgnoredHtmlTypeInLinkMode() {
		if (this.hasWarnedLinkHtmlTypeConflict || !this.isLinkMode() || this.htmlTypeState === 'button') {
			return;
		}

		const message = new ConsoleMessageClass();
		message
			.addDesignSystemTag()
			.addMonospaceText(' htmlType ')
			.addRegularText('on')
			.addMonospaceText(' <ontario-button> ')
			.addRegularText('is ignored when')
			.addMonospaceText(' href ')
			.addRegularText('is provided. The component renders as a native link instead.')
			.printMessage();

		this.hasWarnedLinkHtmlTypeConflict = true;
	}

	public getId(): string {
		return this.elementId ?? '';
	}

	/**
	 * Set `buttonId`, `label`, and `ariaLabel` using internal component logic.
	 */
	componentWillLoad() {
		this.updateLabelContent();
		this.validateHtmlType();
		this.validateType();
		this.ariaLabelText = this.ariaLabelText ?? this.labelState;
		this.syncSlotState();
	}

	componentWillRender() {
		this.warnIgnoredHtmlTypeInLinkMode();
	}

	componentDidLoad() {
		// Used to help load translations for any slots + text content passed in by the user,
		// and to keep leading/trailing icon slot + icon-only state in sync with light DOM changes.
		const observer = new MutationObserver(() => {
			this.updateLabelContent();
			this.syncSlotState();
		});

		const options = { attributes: true, childList: true, subtree: true };
		observer.observe(this.host, options);

		// Shadow DOM prevents the internal button's type from interacting with the outer form natively.
		// Use ElementInternals to trigger submit/reset programmatically on click instead.
		if (!this.isLinkMode()) {
			this.buttonRef.addEventListener('click', () => {
				const { form } = this.internals;
				if (!form) return;
				if (this.htmlTypeState === 'submit') {
					form.requestSubmit();
				} else if (this.htmlTypeState === 'reset') {
					form.reset();
				}
			});
		}
	}

	render() {
		if (this.isIconOnly) {
			if (this.isLinkMode()) {
				return (
					<a
						href={this.href}
						target={this.target}
						rel={this.rel}
						class={this.getClass()}
						aria-label={this.ariaLabelText}
						id={this.getId()}
					>
						<slot />
					</a>
				);
			}

			return (
				<button
					ref={(el) => (this.buttonRef = el as HTMLButtonElement)}
					type={this.htmlTypeState}
					class={this.getClass()}
					aria-label={this.ariaLabelText}
					id={this.getId()}
				>
					<slot />
				</button>
			);
		}

		const labelContent = this.label ? this.labelState : <slot />;

		const content = [
			<span
				class={{
					'ontario-button__icon-slot': true,
					'ontario-button__icon-slot--empty': !this.hasLeadingIcon,
				}}
			>
				<slot name="leading-icon" />
			</span>,
			<span class="ontario-button__label">{labelContent}</span>,
			<span
				class={{
					'ontario-button__icon-slot': true,
					'ontario-button__icon-slot--empty': !this.hasTrailingIcon,
				}}
			>
				<slot name="trailing-icon" />
			</span>,
		];

		if (this.isLinkMode()) {
			return (
				<a
					href={this.href}
					target={this.target}
					rel={this.rel}
					class={this.getClass()}
					aria-label={this.ariaLabelText}
					id={this.getId()}
				>
					{content}
				</a>
			);
		}

		return (
			<button
				ref={(el) => (this.buttonRef = el as HTMLButtonElement)}
				type={this.htmlTypeState}
				class={this.getClass()}
				aria-label={this.ariaLabelText}
				id={this.getId()}
			>
				{content}
			</button>
		);
	}
}
