import { Component, Prop, Element, State, h } from '@stencil/core';
import { Accordion } from './accordion.interface';

@Component({
	tag: 'ontario-accordion',
	styleUrl: 'ontario-accordion.scss',
	shadow: true,
})
export class OntarioAccordion {
	@Element() host: HTMLElement;
	@Prop() title: string = 'Accordion Title';
	@Prop() AccordionData: Record<string, Accordion>;
	@Prop() label: string = 'Expand/Collapse';
	@Prop() ariaLabelText: string = 'Expand or collapse the accordion';
	@Prop() elementId: string = 'accordion';

	@State() private expandedAccordion: string = '';

	private toggleAccordion(label: string) {
		this.expandedAccordion = this.expandedAccordion === label ? '' : label;
	}

	componentWillLoad() {
		// Initialize the accordion content here
	}

	render() {
		return (
			<div>
				<h2>{this.title}</h2>
				<div class="ontario-accordions__container">
					<div class="ontario-accordion__controls">
						<button class="ontario-accordion__button--expand-all" aria-expanded="false">
							<span class="ontario-accordion--expand-open-all">Expand all</span>
							<span class="ontario-accordion--expand-close-all">Collapse all</span>
						</button>
					</div>
					{Object.keys(this.AccordionData).map((key, index) => {
						const accordion = this.AccordionData[key] as Accordion;
						return (
							<div class="ontario-accordion" id={`accordion-${index + 1}`}>
								<h3 class="ontario-accordion-heading">
									<button
										class="ontario-accordion__button"
										id={`accordion-button-id-${index + 1}`}
										aria-controls={`accordion-content-${index + 1}`}
										aria-expanded={this.expandedAccordion === accordion.label ? 'true' : 'false'}
										data-toggle="ontario-collapse"
										onClick={() => this.toggleAccordion(accordion.label)}
									>
										<span class="ontario-accordion__button-icon--close">
											<svg
												class="ontario-icon"
												aria-hidden="true"
												focusable="false"
												viewBox="0 0 24 24"
												preserveAspectRatio="xMidYMid meet"
											>
												<use href="#ontario-icon-chevron-up"></use>
											</svg>
										</span>
										<span class="ontario-accordion__button-icon--open">
											<svg
												class="ontario-icon"
												aria-hidden="true"
												focusable="false"
												viewBox="0 0 24 24"
												preserveAspectRatio="xMidYMid meet"
											>
												<use href="#ontario-icon-chevron-down"></use>
											</svg>
										</span>
										{accordion.label}
									</button>
								</h3>
								<section
									class="ontario-accordion__content"
									id={`accordion-content-${index + 1}`}
									aria-labelledby={`accordion-button-id-${index + 1}`}
									aria-hidden="true"
									data-toggle="ontario-expander-content"
								>
									<ul>
										{accordion.content.map((item: string, itemIndex: number) => (
											<li key={`accordion-${index + 1}-item-${itemIndex + 1}`}>{item}</li>
										))}
									</ul>
								</section>
							</div>
						);
					})}
				</div>
			</div>
		);
	}
}
