import { Component, Prop, Element, State, h, Watch } from '@stencil/core';
import { Caption } from '../../utils/common/input-caption/caption.interface';
import { Language } from '../../utils/common/language-types';
import { Accordion } from './accordion.interface';

@Component({
	tag: 'ontario-accordion',
	styleUrl: 'ontario-accordion.scss',
	shadow: true,
})
export class OntarioAccordion {
	@Element() host: HTMLElement;

	@Prop() caption: Caption | string;

	/**
	 * The language of the component.
	 * This is used for translations, and is by default set through event listeners checking for a language property from the header. If no language is passed, it will default to English.
	 */
	@Prop({ mutable: true }) language?: Language = 'en';

	@Prop() name: string = 'Accordion Title';

	@Prop() label: string = 'Expand/Collapse';

	@Prop() ariaLabelText: string = 'Expand or collapse the accordion';

	@Prop() elementId: string = 'accordion';

	@Prop() accordionData: string | Accordion[];

	@State() private internalAccordionData: Accordion[] = [];

	private toggleAccordion(label: string) {
		this.internalAccordionData = this.internalAccordionData.map((accordion) => ({
			...accordion,
			isOpen: accordion.label === label ? !accordion.isOpen : false,
		}));
	}

	/**
	 * Watch for changes to the `accordionData` prop.
	 *
	 * If an `options` prop is passed, it will be parsed (if it is a string), and the result will be set to the `internalAccordionData` state. The result will be run through a validation function.
	 */
	@Watch('accordionData')
	parseAccordionData() {
		if (typeof this.accordionData !== 'undefined') {
			if (!Array.isArray(this.accordionData)) {
				this.internalAccordionData = JSON.parse(this.accordionData);
			} else {
				this.internalAccordionData = this.accordionData;
			}
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
						<button class="ontario-accordion__button--expand-all" aria-expanded="false">
							<span class="ontario-accordion--expand-open-all">Expand all</span>
							<span class="ontario-accordion--expand-close-all">Collapse all</span>
						</button>
					</div>

					{this.internalAccordionData?.map((accordion, index) => (
						<div class={`ontario-accordion ${accordion.isOpen ? 'open' : ''}`} key={`accordion-${index}`}>
							<h3 class="ontario-accordion-heading">
								<button
									class="ontario-accordion__button"
									aria-expanded={accordion.isOpen ? 'true' : 'false'}
									data-toggle="ontario-collapse"
									onClick={() => this.toggleAccordion(accordion.label)}
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
								class="ontario-accordion__content"
								aria-hidden={!accordion.isOpen}
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
