import { Component, Host, Prop, State, Watch, Listen, h } from '@stencil/core';
import { ConsoleMessageClass } from '../../utils/console-message/console-message';
import { HeadingLevel } from '../../utils/common/common.interface';
import { Language } from '../../utils/common/language-types';
import { HeaderLanguageToggleEventDetails } from '../../utils/events/common-events.interface';
import {
	validateLanguage,
	validatePropExists,
	validateValueAgainstArray,
} from '../../utils/validation/validation-functions';
import translations from '../../translations/global.i18n.json';

export type SummaryListHeadingLevel = Extract<HeadingLevel, 'h2' | 'h3' | 'h4'>;
export type SummaryListColumnRatio = '1-1' | '1-2' | '1-3' | '2-1' | '2-3';

export interface SummaryListActionLink {
	href: string;
	label?: string;
}

/**
 * Ontario Summary List groups labelled answers for review before a user submits or confirms information.
 *
 * For component guidance, see:
 * - https://designsystem.ontario.ca/components/detail/summary-list.html
 * - https://designsystem.ontario.ca/developer-docs/components/ontario-summary-list/
 */
@Component({
	tag: 'ontario-summary-list',
	styleUrl: 'ontario-summary-list.scss',
	shadow: true,
})
export class OntarioSummaryList {
	private captionActionSlot?: HTMLSlotElement;

	/**
	 * The section heading text for this summary list group. This prop is required.
	 */
	@Prop() caption!: string;

	/**
	 * The heading element to use for the section caption. Defaults to `h3`.
	 * The heading level should match the document hierarchy of the consuming page.
	 */
	@Prop({ mutable: true }) headingLevel: SummaryListHeadingLevel = 'h3';

	/**
	 * When `true`, the summary list expands to the full available width.
	 * Recommended when the list contains text area responses.
	 */
	@Prop() fullWidth: boolean = false;

	/**
	 * Adjusts the flex ratio between the key and value columns.
	 * Recommended when questions are short. If omitted, columns share equal width.
	 */
	@Prop({ mutable: true }) columnRatio?: SummaryListColumnRatio;

	/**
	 * Renders a section-level change link in the heading row. Accepts a JSON string
	 * (for plain HTML) or an object (for JSX/framework use). The `href` property is
	 * required. An optional `label` overrides the visible link text; if omitted, the
	 * component uses the localized default ("Change" / "Modifier"). Screen-reader
	 * text is always auto-generated from `caption`.
	 *
	 * Use the `caption-action` slot instead when a router-aware link is needed.
	 */
	@Prop() captionActionLink?: string | SummaryListActionLink;

	/**
	 * The language of the component. This is used for translations, and is by default
	 * set through event listeners checking for a language property from the header.
	 * If none are passed, it will default to English.
	 */
	@Prop({ mutable: true }) language?: Language;

	@State() private hasCaptionActionSlot = false;

	@State() private resolvedCaptionActionLink?: SummaryListActionLink;

	@Watch('caption')
	validateCaption(newValue: string) {
		if (validatePropExists(newValue)) {
			new ConsoleMessageClass()
				.addDesignSystemTag()
				.addRegularText(' The ')
				.addMonospaceText('caption')
				.addRegularText(' prop is required for ')
				.addMonospaceText('<ontario-summary-list>')
				.addRegularText('. Please provide a caption value.')
				.printMessage();
		}
	}

	@Watch('headingLevel')
	validateHeadingLevel(newValue: string) {
		const allowedValues: SummaryListHeadingLevel[] = ['h2', 'h3', 'h4'];

		if (!validateValueAgainstArray(newValue, allowedValues)) {
			new ConsoleMessageClass()
				.addDesignSystemTag()
				.addMonospaceText(' headingLevel ')
				.addRegularText('on')
				.addMonospaceText(' <ontario-summary-list> ')
				.addRegularText('was set to an invalid value; only ')
				.addMonospaceText(allowedValues.join(', '))
				.addRegularText(' are supported. The default value ')
				.addMonospaceText('h3')
				.addRegularText(' is assumed.')
				.printMessage();

			this.headingLevel = 'h3';
		}
	}

	@Watch('columnRatio')
	validateColumnRatio(newValue?: SummaryListColumnRatio) {
		const allowedValues: SummaryListColumnRatio[] = ['1-1', '1-2', '1-3', '2-1', '2-3'];

		if (newValue && !validateValueAgainstArray(newValue, allowedValues)) {
			new ConsoleMessageClass()
				.addDesignSystemTag()
				.addMonospaceText(' columnRatio ')
				.addRegularText('on')
				.addMonospaceText(' <ontario-summary-list> ')
				.addRegularText('was set to an invalid value; only ')
				.addMonospaceText(allowedValues.join(', '))
				.addRegularText(' are supported. The prop was ignored and equal column widths are assumed.');
			this.columnRatio = undefined;
		}
	}

	@Watch('captionActionLink')
	parseCaptionActionLink(newValue?: string | SummaryListActionLink) {
		this.resolvedCaptionActionLink = this.getValidatedActionLink(newValue);
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
		this.validateCaption(this.caption);
		this.validateHeadingLevel(this.headingLevel);
		this.validateColumnRatio(this.columnRatio);
		this.parseCaptionActionLink(this.captionActionLink);
	}

	componentDidLoad() {
		this.updateCaptionActionSlotState(this.captionActionSlot);
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
				.addMonospaceText(' captionActionLink ')
				.addRegularText('on')
				.addMonospaceText(' <ontario-summary-list> ')
				.addRegularText('must be an object or JSON string with a required ')
				.addMonospaceText('href')
				.addRegularText(' value. The prop was ignored.')
				.printMessage();

			return undefined;
		}
	}

	private updateCaptionActionSlotState(slotElement?: HTMLSlotElement) {
		this.hasCaptionActionSlot = !!slotElement?.assignedElements({ flatten: true }).length;
	}

	private handleCaptionActionSlotChange = (event: Event) => {
		this.updateCaptionActionSlotState(event.target as HTMLSlotElement);
	};

	private getHeadingActionLabel(): string {
		return this.resolvedCaptionActionLink?.label || translations.summaryList.change[validateLanguage(this.language)];
	}

	private getStyleVariables() {
		const ratios: Record<SummaryListColumnRatio | 'default', { key: string; value: string }> = {
			'default': { key: '1', value: '1' },
			'1-1': { key: '1', value: '1' },
			'1-2': { key: '1', value: '2' },
			'1-3': { key: '1', value: '3' },
			'2-1': { key: '2', value: '1' },
			'2-3': { key: '2', value: '3' },
		};

		const ratio = this.columnRatio ? ratios[this.columnRatio] : ratios.default;

		return {
			'--ontario-summary-list-key-flex': String(ratio.key),
		} as { [key: string]: string };
	}

	private getWrapperClasses(): string {
		return ['ontario-summary-list', this.fullWidth && 'summary-list-full-width'].filter(Boolean).join(' ');
	}

	private getContainerClasses(): string {
		return ['ontario-summary-list__container', this.columnRatio && `ontario-summary-list-ratio__${this.columnRatio}`]
			.filter(Boolean)
			.join(' ');
	}

	render() {
		return (
			<Host style={this.getStyleVariables()}>
				<div class={this.getWrapperClasses()}>
					<div class="ontario-summary-list__heading-container">
						{h(this.headingLevel, { className: 'ontario-summary-list__heading' }, this.caption)}
						<div
							class={[
								'ontario-summary-list__heading-buttons',
								!this.hasCaptionActionSlot &&
									!this.resolvedCaptionActionLink &&
									'ontario-summary-list__heading-buttons--hidden',
							]
								.filter(Boolean)
								.join(' ')}
						>
							<slot
								name="caption-action"
								ref={(el) => (this.captionActionSlot = el as HTMLSlotElement)}
								onSlotchange={this.handleCaptionActionSlotChange}
							></slot>
							{!this.hasCaptionActionSlot && this.resolvedCaptionActionLink && (
								<a class="ontario-summary-list__change-button" href={this.resolvedCaptionActionLink.href}>
									{this.getHeadingActionLabel()}
									<span class="ontario-show-for-sr">
										{translations.summaryList.yourAnswerFor[validateLanguage(this.language)]} <q>{this.caption}</q>
									</span>
								</a>
							)}
						</div>
					</div>
					<dl class={this.getContainerClasses()}>
						<slot></slot>
					</dl>
				</div>
			</Host>
		);
	}
}
