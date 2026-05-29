import { Component, Host, Prop, State, Watch, Listen, h } from '@stencil/core';
import { ConsoleMessageClass } from '../../utils/console-message/console-message';
import { Language } from '../../utils/common/language-types';
import { HeaderLanguageToggleEventDetails } from '../../utils/events/common-events.interface';
import { validateLanguage, validatePropExists } from '../../utils/validation/validation-functions';
import { SummaryListActionLink } from '../ontario-summary-list/ontario-summary-list';
import translations from '../../translations/global.i18n.json';

/**
 * Ontario Summary List Item renders a single key/value row inside an ontario-summary-list.
 *
 * For component guidance, see:
 * - https://designsystem.ontario.ca/components/detail/summary-list.html
 */
@Component({
	tag: 'ontario-summary-list-item',
	styleUrl: 'ontario-summary-list-item.scss',
	shadow: true,
})
export class OntarioSummaryListItem {
	private actionSlot?: HTMLSlotElement;

	/**
	 * The key/question label rendered as `<dt>`. This prop is required.
	 */
	@Prop() name!: string;

	/**
	 * The value/response rendered as `<dd>`. This prop is required.
	 */
	@Prop() description!: string;

	/**
	 * When `true`, applies reduced row padding via the `.compact` modifier class.
	 */
	@Prop() compact?: boolean;

	/**
	 * Renders a row-level change link. Accepts a JSON string (for plain HTML) or an
	 * object (for JSX/framework use). `href` is required; `label` overrides the visible
	 * link text (defaults to the i18n "Change" / "Modifier" label). Screen-reader text
	 * is always auto-generated from `name`.
	 *
	 * Use the `action` slot instead when a router-aware link is needed. The slot takes
	 * precedence over this prop when both are present.
	 */
	@Prop() actionLink?: string | SummaryListActionLink;

	/**
	 * The language of the component. Defaults to English via `validateLanguage`.
	 * Set automatically through event listeners from the header by default.
	 */
	@Prop({ mutable: true }) language?: Language;

	@State() private hasActionSlot = false;
	@State() private resolvedActionLink?: SummaryListActionLink;

	@Watch('name')
	validateName(newValue: string) {
		if (validatePropExists(newValue)) {
			new ConsoleMessageClass()
				.addDesignSystemTag()
				.addRegularText(' The ')
				.addMonospaceText('name')
				.addRegularText(' prop is required for ')
				.addMonospaceText('<ontario-summary-list-item>')
				.addRegularText('. Please provide a name value.')
				.printMessage();
		}
	}

	@Watch('description')
	validateDescription(newValue: string) {
		if (validatePropExists(newValue)) {
			new ConsoleMessageClass()
				.addDesignSystemTag()
				.addRegularText(' The ')
				.addMonospaceText('description')
				.addRegularText(' prop is required for ')
				.addMonospaceText('<ontario-summary-list-item>')
				.addRegularText('. Please provide a description value.')
				.printMessage();
		}
	}

	@Watch('actionLink')
	parseActionLink(newValue?: string | SummaryListActionLink) {
		this.resolvedActionLink = this.getValidatedActionLink(newValue);
	}

	@Listen('setAppLanguage', { target: 'window' })
	handleSetAppLanguage(event: CustomEvent<Language>) {
		if (!this.language) {
			this.language = validateLanguage(event);
		}
	}

	@Listen('headerLanguageToggled', { target: 'window' })
	handleHeaderLanguageToggled(event: CustomEvent<HeaderLanguageToggleEventDetails>) {
		this.language = validateLanguage(event.detail.newLanguage);
	}

	componentWillLoad() {
		this.language = validateLanguage(this.language);
		this.validateName(this.name);
		this.validateDescription(this.description);
		this.parseActionLink(this.actionLink);
	}

	componentDidLoad() {
		this.updateActionSlotState(this.actionSlot);
	}

	private getValidatedActionLink(value?: string | SummaryListActionLink): SummaryListActionLink | undefined {
		if (!value) return undefined;

		try {
			const parsed = typeof value === 'string' ? JSON.parse(value) : value;

			if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
				throw new Error('Invalid action link type');
			}

			if (typeof parsed.href !== 'string' || parsed.href.trim().length === 0) {
				throw new Error('Invalid href');
			}

			return {
				href: parsed.href,
				label: typeof parsed.label === 'string' && parsed.label.trim().length > 0 ? parsed.label : undefined,
			};
		} catch {
			new ConsoleMessageClass()
				.addDesignSystemTag()
				.addMonospaceText(' actionLink ')
				.addRegularText('on')
				.addMonospaceText(' <ontario-summary-list-item> ')
				.addRegularText('must be an object or JSON string with a required ')
				.addMonospaceText('href')
				.addRegularText(' value. The prop was ignored.')
				.printMessage();

			return undefined;
		}
	}

	private updateActionSlotState(slotElement?: HTMLSlotElement) {
		this.hasActionSlot = !!slotElement?.assignedElements({ flatten: true }).length;
	}

	private handleActionSlotChange = (event: Event) => {
		this.updateActionSlotState(event.target as HTMLSlotElement);
	};

	private getActionLabel(): string {
		return this.resolvedActionLink?.label || translations.summaryList.change[validateLanguage(this.language)];
	}

	private getRowClasses(): string {
		return [
			'ontario-summary-list__row',
			!this.hasActionSlot && !this.resolvedActionLink && 'ontario-summary-list__row--no-actions',
			this.compact && 'ontario-summary-list__row--compact',
		]
			.filter(Boolean)
			.join(' ');
	}

	render() {
		const hasAction = this.hasActionSlot || !!this.resolvedActionLink;

		return (
			<Host>
				<div class={this.getRowClasses()}>
					<dt class="ontario-summary-list__key">{this.name}</dt>
					<dd class="ontario-summary-list__value">{this.description}</dd>
					<dd
						class={[
							'ontario-summary-list__button-container',
							!hasAction && 'ontario-summary-list__button-container--hidden',
						]
							.filter(Boolean)
							.join(' ')}
					>
						<slot
							name="action"
							ref={(el) => (this.actionSlot = el as HTMLSlotElement)}
							onSlotchange={this.handleActionSlotChange}
						></slot>
						{!this.hasActionSlot && this.resolvedActionLink && (
							<a class="ontario-summary-list-change__button" href={this.resolvedActionLink.href}>
								{this.getActionLabel()}
								<span class="ontario-show-for-sr">
									{translations.summaryList.yourAnswerFor[validateLanguage(this.language)]} <q>{this.name}</q>
								</span>
							</a>
						)}
					</dd>
				</div>
			</Host>
		);
	}
}
