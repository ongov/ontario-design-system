import { Component, Prop, Element, State, h } from '@stencil/core';
import { Accordion } from './accordion.interface';

@Component({
	tag: 'ontario-accordion',
	styleUrl: 'ontario-accordion.scss',
	shadow: true,
})
export class OntarioAccordion {
	@Element() host: HTMLElement;

	/**
	 * The title of the accordion component.
	 */
	@Prop() title: string = 'Accordion Title';

	/**
	 * The label for the 'Expand all' button.
	 */
	@Prop() openLabel: string = 'Expand All';

	/**
	 * The label for the 'Close all' button.
	 */
	@Prop() closeLabel: string = 'Collapse All';

	/**
	 * The alt text for the expand/close button.
	 */
	@Prop() ariaLabelText: string = 'Expand or collapse the accordion';

	/**
	 * Used to include individual accordion data for the accordion component.
	 * This is passed in as an array of objects with key-value pairs.
	 * 
	 * The `content` is expecting an array of strings to populate the <ul> element within each individual accordion. 
	 *
	 * 	<ontario-accordion
	 *		title="My Accordion"
	 *		label="Expand/Collapse"
	 *		accordion-data='[
	 *			{"label": "Accordion 1", "content": ["Item 1", "Item 2", "Item 3"]},
	 *			{"label": "Accordion 2", "content": ["Item A", "Item B", "Item C"]}
	 *		]'
		></ontario-accordion>
	 */
	@Prop() accordionData: string | Accordion[];

	@Prop() isOpen: boolean = false;

	/**
	 * The label for the expand/collapse button.
	 * This is internal and udpdated dynamically.
	 */
	@State() private label: string;

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

		// Check if all accordions are initially open or closed
		const allClosed = this.internalAccordionData.every((_, index) => !this.openAccordionIndexes.includes(index));

		if (allClosed) {
			// All accordions are initially closed, set label to "Expand all"
			this.label = this.openLabel;
		} else {
			// At least one accordion is open, set label to "Collapse all"
			this.label = this.closeLabel;
		}
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
			this.label = this.openLabel; // Update the label to "Expand all"
		} else {
			// At least one accordion is closed, open all
			this.openAccordionIndexes = this.internalAccordionData.map((_, index) => index);
			this.label = this.closeLabel; // Update the label to "Collapse all"
		}
	}

	// Check if all accordions are expanded or collapsed and update the label
	private updateLabel() {
		if (this.openAccordionIndexes.length === this.internalAccordionData.length) {
			// All accordions are open, set label to "Collapse all"
			this.label = this.closeLabel;
		} else {
			// At least one accordion is closed, set label to "Expand all"
			this.label = this.openLabel;
		}
	}

	componentWillLoad() {
		this.parseAccordionData();
	}

	render() {
		return (
			<div>
				<h2>{this.title}</h2>
				<div class="ontario-accordions__container">
					<div class="ontario-accordion__controls">
						<button
							class="ontario-accordion__button--expand-all"
							onClick={() => this.toggleAll()}
							aria-expanded={this.openAccordionIndexes.length === this.internalAccordionData.length ? 'true' : 'false'}
						>
							<span class="ontario-accordion--expand-open-all">{this.label}</span>
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
									aria-label={this.ariaLabelText}
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
								<ul>
									{Array.isArray(accordion.content) ? (
										accordion.content.map((item, itemIndex) => (
											<li key={`accordion-${index + 1}-item-${itemIndex + 1}`}>{item}</li>
										))
									) : (
										<li>{accordion.content}</li>
									)}
								</ul>
							</section>
						</div>
					))}
				</div>
			</div>
		);
	}
}
