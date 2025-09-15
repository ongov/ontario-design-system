import { Component, Prop, Element, Event, EventEmitter, State, h, Listen, Watch } from '@stencil/core';
import { Accordion } from './accordion.interface';
import { ExpandCollapseButtonDetails } from './expandCollapseButtonDetails.interface';
import { Language } from '../../utils/common/language-types';
import { validateLanguage } from '../../utils/validation/validation-functions';
import { ConsoleMessageClass } from '../../utils/console-message/console-message';
import translations from '../../translations/global.i18n.json';

@Component({
	tag: 'ontario-accordion',
	styleUrl: 'ontario-accordion.scss',
	shadow: true,
})
export class OntarioAccordion {
	@Element() host: HTMLElement;

	/**
	 * The name of the accordion component.
	 *
	 * This is not optional.
	 */
	@Prop() name: string;

	/**
	 * Custom Expand/Collapse button text.
	 *
	 * @example
	 *  <ontario-accordion
	 *		name="My Accordion"
	 *		expand-collapse-button='{
	 *			"expandAllSectionsLabel": "Expand All",
	 *			"collapseAllSectionsLabel": "Collapse All"
	 *		}'
	 *		accordion-data='[
	 *			{"label": "Accordion 1", "content": ["Item 1", "Item 2", "Item 3"]},
	 *			{"label": "Accordion 2", "content": ["Item A", "Item B", "Item C"]}
	 *		]'
	 *	></ontario-accordion>
	 */
	@Prop() expandCollapseButton?: string | ExpandCollapseButtonDetails;

	/**
	 * Used to include individual accordion data for the accordion component.
	 * This is passed in as an array of objects with key-value pairs.
	 *
	 * The `content` is expecting a string, that can either be written as HTML or a just a plain string, depending on the accordionContentType.
	 *
	 * - label: string
	 * - content: string (rendered as text or via innerHTML)
	 * - accordionContentType: 'string' | 'html'
	 * - isOpen: boolean (initial open state - default is false)
	 * - ariaLabelText: string
	 *
	 * @example
	 * 	<ontario-accordion
	 *		name="My Accordion"
	 *		accordion-data='[
	 *			{"label": "Accordion 1", "content": "This is a string", "isOpen": true},
	 *			{"label": "Accordion 2", "accordionContentType": "html", "content": "<ul><li>List A</li><li>List B</li><li>List C</li></ul>"}
	 *		]'
	 *	></ontario-accordion>
	 */
	@Prop() accordionData: string | Accordion[];

	/**
	 * The language of the component.
	 * This is used for translations, and is by default set through event listeners checking for a language property from the header. If none are passed, it will default to English.
	 */
	@Prop({ mutable: true }) language?: Language;

	/**
	 * Emits when open indexes change
	 */
	@Event() accordionChange: EventEmitter<{ openIndexes: number[] }>;

	/**
	 * Store the translation dictionary for use within the component.
	 */
	@State() translations: any = translations;

	/**
	 * The label for the expand/collapse button.
	 * This is internal and udpdated dynamically.
	 */
	@State() private expandCollapseLabel: 'expand' | 'collapse';

	/**
	 * Internal state of the expand/collapse label information.
	 */
	@State() private internalExpandCollapseLabelDetails: ExpandCollapseButtonDetails;

	/**
	 * Internal state containing the parsed Accordion Data
	 */
	@State() private internalAccordionData: Accordion[] = [];

	/**
	 * This state tracks which accordions are open.
	 */
	@State() private openAccordionIndexes: number[] = [];

	/** Unique prefix for a11y ids */
	@State() private uidPrefix: string = `ontario-accordion-${Math.random().toString(36).slice(2, 9)}`;

	/**
	 * This listens for the `setAppLanguage` event sent from the test language toggler when it is is connected to the DOM. It is used for the initial language when the input component loads.
	 */
	@Listen('setAppLanguage', { target: 'window' })
	handleSetAppLanguage(event: CustomEvent<Language>) {
		if (!this.language) {
			this.language = validateLanguage(event);
		}
	}

	/**
	 * Handle the language being toggled from the `<ontario-header>`.
	 * @param event Event object passed when the event is fired.
	 */
	@Listen('headerLanguageToggled', { target: 'window' })
	handleHeaderLanguageToggled(event: CustomEvent<Language>) {
		this.language = validateLanguage(event);
	}

	/**
	 * Parse Accordion data, this is used to handle JSON strings from HTML.
	 */
	@Watch('accordionData')
	private parseAccordionData() {
		try {
			const parsed = Array.isArray(this.accordionData) ? this.accordionData : JSON.parse(this.accordionData || '[]');

			// Normalize and type-guard
			this.internalAccordionData = (parsed || []).map((prop: any) => ({
				label: prop?.label ?? '',
				content: prop?.content ?? '',
				accordionContentType: (prop?.accordionContentType ?? 'string') as 'string' | 'html',
				isOpen: Boolean(prop?.isOpen),
				ariaLabelText: prop?.ariaLabelText,
			}));

			// Seed the openAccordionIndexes based on the isOpen properties
			this.seedOpenIndexesFromItems();

			// Initialize the label based on the initial accordion state
			this.updateLabel();
		} catch {
			const message = new ConsoleMessageClass();
			message
				.addDesignSystemTag()
				.addMonospaceText(' accordionData ')
				.addRegularText('for')
				.addMonospaceText(' <ontario-accordion> ')
				.addRegularText('could not be parsed. Please ensure it is valid JSON.')
				.printMessage();

			this.internalAccordionData = [];
			this.openAccordionIndexes = [];
			this.updateLabel();
		}
	}

	/**
	 * Parse Expand/Collapse Button Details. This handles both object and JSON string formats
	 * passed from HTML, with safe error handling for invalid JSON.
	 */
	@Watch('expandCollapseButton')
	private parseExpandCollapseButtonDetails() {
		if (typeof this.expandCollapseButton !== 'undefined') {
			if (typeof this.expandCollapseButton === 'string') {
				try {
					this.internalExpandCollapseLabelDetails = JSON.parse(this.expandCollapseButton);
				} catch {
					const message = new ConsoleMessageClass();
					message
						.addDesignSystemTag()
						.addMonospaceText(' expandCollapseButton ')
						.addRegularText('for')
						.addMonospaceText(' <ontario-accordion> ')
						.addRegularText('could not be parsed from a string. Please ensure it is valid JSON.')
						.printMessage();
				}
			} else {
				this.internalExpandCollapseLabelDetails = this.expandCollapseButton;
			}
		}
	}

	// Seed the openAccordionIndexes based on the isOpen properties of the accordion items
	private seedOpenIndexesFromItems() {
		this.openAccordionIndexes = this.internalAccordionData
			.map((accordionItem, index) => (accordionItem?.isOpen ? index : -1))
			.filter((accordionIndex) => accordionIndex !== -1);
	}

	// Toggle the accordion state when it's clicked
	private toggleAccordion(index: number) {
		if (this.openAccordionIndexes.includes(index)) {
			// If the accordion is already open, close it
			this.openAccordionIndexes = this.openAccordionIndexes.filter((i) => i !== index);
		} else {
			// If the accordion is closed, open it
			this.openAccordionIndexes = [...this.openAccordionIndexes, index];
		}
		this.updateLabel();
	}

	/**
	 * Toggle all accordions open/close
	 */
	private toggleAll() {
		if (this.openAccordionIndexes.length === this.internalAccordionData.length) {
			// All accordions are open, close all
			this.openAccordionIndexes = [];
		} else {
			// At least one accordion is closed, open all
			this.openAccordionIndexes = this.internalAccordionData.map((_, index) => index);
		}
		this.updateLabel();
	}

	/**
	 * Update the label based on the current accordion state
	 */
	private updateLabel() {
		const allOpen = this.internalAccordionData.every((_, index) => this.openAccordionIndexes.includes(index));

		if (allOpen) {
			// All accordions are open, set label to "Collapse all"
			this.expandCollapseLabel = 'collapse';
		} else {
			// At least one accordion is closed, set label to "Expand all"
			this.expandCollapseLabel = 'expand';
		}
	}

	componentWillLoad() {
		this.parseAccordionData();
		this.parseExpandCollapseButtonDetails();
		this.language = validateLanguage(this.language);
	}

	render() {
		return (
			<div>
				<h2>{this.name}</h2>
				<div class="ontario-accordions__container">
					<div class="ontario-accordion__controls">
						<button
							class="ontario-accordion__button--expand-all"
							onClick={() => this.toggleAll()}
							aria-expanded={this.openAccordionIndexes.length === this.internalAccordionData.length ? 'true' : 'false'}
							aria-label={this.internalExpandCollapseLabelDetails?.ariaLabelText}
						>
							<span class="ontario-accordion--expand-open-all">
								{this.expandCollapseLabel === 'expand' ? (
									<div>
										{this.internalExpandCollapseLabelDetails?.expandAllSectionsLabel ??
											this.translations.accordion.expand[`${this.language}`]}
									</div>
								) : (
									<div>
										{this.internalExpandCollapseLabelDetails?.collapseAllSectionsLabel ??
											this.translations.accordion.collapse[`${this.language}`]}
									</div>
								)}
							</span>
						</button>
					</div>
					{this.internalAccordionData?.map((accordion, index) => {
						const buttonId = `${this.uidPrefix}__button--${index}`;
						const sectionId = `${this.uidPrefix}__section--${index}`;
						const isOpen = this.openAccordionIndexes.includes(index);

						return (
							<div class={`ontario-accordion ${isOpen ? 'open' : ''}`} key={`accordion-${index}`}>
								<h3 class={`ontario-accordion__heading ${isOpen ? 'ontario-expander--active' : ''}`}>
									<button
										id={buttonId}
										class="ontario-accordion__button"
										aria-expanded={isOpen ? 'true' : 'false'}
										data-toggle="ontario-collapse"
										aria-controls={sectionId}
										onClick={() => this.toggleAccordion(index)}
										aria-label={accordion.ariaLabelText}
									>
										<span class="ontario-accordion__button-icon--close">
											<ontario-icon-chevron-up colour="blue" aria-hidden="true"></ontario-icon-chevron-up>
										</span>
										<span class="ontario-accordion__button-icon--open">
											<ontario-icon-chevron-down colour="blue" aria-hidden="true"></ontario-icon-chevron-down>
										</span>
										{accordion.label}
									</button>
								</h3>
								<section
									id={sectionId}
									class={`ontario-accordion__content ${
										isOpen ? 'ontario-expander__content--opened' : 'ontario-accordion__content--closed'
									}`}
									aria-labelledby={buttonId}
									role="region"
									aria-hidden={isOpen ? 'false' : 'true'}
									data-toggle="ontario-expander-content"
								>
									{accordion.accordionContentType === 'html' ? (
										<div innerHTML={accordion.content}></div> // Render HTML content
									) : (
										<div>{accordion.content}</div>
									)}
								</section>
							</div>
						);
					})}
				</div>
			</div>
		);
	}
}
