import { Component, Prop, Element, State, h } from '@stencil/core';
import { Accordion } from './accordion.interface';
import { ExpandCollapseButtonDetails } from './expandCollapseButtonDetails.interface';

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

	@Prop() expandCollapseButton: ExpandCollapseButtonDetails = {
		expandAllSectionsLabel: 'Expand All',
		closeAllSectionsLabel: 'Collapse All',
		ariaLabelText: 'Expand or collapse the accordion',
	};

	/**
	 * Used to include individual accordion data for the accordion component.
	 * This is passed in as an array of objects with key-value pairs.
	 *
	 * The `content` is expecting a string, that can either be written as HTML or a just a plain string, depending on the accordionContentType.
	 *
	 * @example
	 * 	<ontario-accordion
	 *		name="My Accordion"
	 *		accordion-data='[
	 *			{"label": "Accordion 1", "content": "This is a string"},
	 *			{"label": "Accordion 2", "accordionContentType": "html", "content": "<ul><li>List A</li><li>List B</li><li>List C</li></ul>"}
	 *		]'
	 *	></ontario-accordion>
	 */
	@Prop() accordionData: string | Accordion[];

	@Prop() isOpen: boolean = false;

	/**
	 * The label for the expand/collapse button.
	 * This is internal and udpdated dynamically.
	 */
	@State() private expandCollapseLabel: string;

	@State() private internalAccordionData: Accordion[] = [];

	/**
	 * This state tracks which accordions are open.
	 */
	@State() private openAccordionIndexes: number[] = [];

	private parseAccordionData() {
		if (typeof this.accordionData !== 'undefined') {
			this.internalAccordionData = Array.isArray(this.accordionData)
				? this.accordionData
				: JSON.parse(this.accordionData);
		}

		// Initialize the label based on the initial accordion state
		this.updateLabel();
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

	// Toggle all accordions open/close
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

	// Update the label based on the current accordion state
	private updateLabel() {
		const allOpen = this.internalAccordionData.every((_, index) => this.openAccordionIndexes.includes(index));

		if (allOpen) {
			// All accordions are open, set label to "Collapse all"
			this.expandCollapseLabel = this.expandCollapseButton.closeAllSectionsLabel;
		} else {
			// At least one accordion is closed, set label to "Expand all"
			this.expandCollapseLabel = this.expandCollapseButton.expandAllSectionsLabel;
		}
	}

	componentWillLoad() {
		this.parseAccordionData();
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
						>
							<span class="ontario-accordion--expand-open-all">{this.expandCollapseLabel}</span>
						</button>
					</div>
					{this.internalAccordionData?.map((accordion, index) => (
						<div
							class={`ontario-accordion ${this.openAccordionIndexes.includes(index) ? 'open' : ''}`}
							key={`accordion-${index}`}
						>
							<h3
								class={`ontario-accordion__heading ${
									this.openAccordionIndexes.includes(index) ? 'ontario-expander--active' : ''
								}`}
							>
								<button
									class="ontario-accordion__button"
									aria-expanded={this.openAccordionIndexes.includes(index) ? 'true' : 'false'}
									data-toggle="ontario-collapse"
									onClick={() => this.toggleAccordion(index)}
									aria-label={this.expandCollapseButton.ariaLabelText}
								>
									<span class="ontario-accordion__button-icon--close">
										<ontario-icon-chevron-up colour="blue"></ontario-icon-chevron-up>
									</span>
									<span class="ontario-accordion__button-icon--open">
										<ontario-icon-chevron-down colour="blue"></ontario-icon-chevron-down>
									</span>
									{accordion.label}
								</button>
							</h3>
							<section
								class={`ontario-accordion__content ${
									this.openAccordionIndexes.includes(index)
										? 'ontario-accordion__content--opened'
										: 'ontario-accordion__content--closed'
								}`}
								aria-hidden={!this.openAccordionIndexes.includes(index)}
								data-toggle="ontario-expander-content"
							>
								{accordion.accordionContentType === 'html' ? (
									<div innerHTML={accordion.content}></div> // Render HTML content
								) : (
									<div>{accordion.content}</div>
								)}
							</section>
						</div>
					))}
				</div>
			</div>
		);
	}
}
