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

	@Watch('accordionData')
	parseAccordionData() {
		if (typeof this.accordionData !== 'undefined') {
			this.internalAccordionData = Array.isArray(this.accordionData)
				? this.accordionData
				: JSON.parse(this.accordionData);
		}
	}

	componentWillLoad() {
		this.parseAccordionData();
		this.initializeAccordionFunctionality();
	}

	private findElement<T>(arr: T[], callback: (item: T) => boolean): T | undefined {
		for (let i = 0; i < arr.length; i++) {
			const match = callback(arr[i]);
			if (match) {
				return arr[i];
			}
		}
		return undefined;
	}

	private openAllAccordions(item: HTMLElement, content: HTMLElement[]) {
		item.classList.remove('ontario-expander--active');
		item.classList.add('ontario-expander--active');
		item.firstElementChild?.setAttribute('aria-expanded', 'true');

		content.forEach((contentItem) => {
			contentItem.classList.remove('ontario-expander__content--opened');
			contentItem.classList.add('ontario-expander__content--opened');

			contentItem.setAttribute('aria-hidden', 'false');
		});
	}

	private closeAllAccordions(item: HTMLElement, content: HTMLElement[]) {
		item.classList.remove('ontario-expander--active');
		item.firstElementChild?.setAttribute('aria-expanded', 'false');

		content.forEach((contentItem) => {
			contentItem.classList.remove('ontario-expander__content--opened');

			contentItem.setAttribute('aria-hidden', 'true');
		});
	}

	initializeAccordionFunctionality() {
		const expandableItems = Array.from(this.host.querySelectorAll("[data-toggle='ontario-collapse']")) as HTMLElement[];

		const expandAllButtons = Array.from(
			this.host.querySelectorAll('.ontario-accordion__button--expand-all'),
		) as HTMLButtonElement[]; // Use HTMLButtonElement type

		const accordionLinks = Array.from(this.host.querySelectorAll('.ontario-accordion-link')) as HTMLAnchorElement[];

		this.toggleExpander(expandableItems);
		this.toggleAllAccordions(expandAllButtons);
		this.toggleExpanderByLink(accordionLinks);
	}

	private toggleExpandAllButton(accordionExpandAllButton: HTMLButtonElement) {
		const controlsContainer = accordionExpandAllButton.closest('.ontario-accordion__controls');

		if (controlsContainer) {
			controlsContainer.classList.toggle('ontario-accordion__controls--active');

			const isExpanded = controlsContainer.classList.contains('ontario-accordion__controls--active');
			accordionExpandAllButton.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
		}
	}

	private allAccordionsOpenCheck() {
		const openExpanders = this.host.shadowRoot?.querySelectorAll('.ontario-expander--active');
		const accordionContainers = this.host.shadowRoot?.querySelectorAll('.ontario-accordion');

		if (openExpanders && accordionContainers && openExpanders.length === accordionContainers.length) {
			const accordionExpandAllButton = this.host.shadowRoot?.querySelector(
				'.ontario-accordion__button--expand-all',
			) as HTMLButtonElement;
			if (accordionExpandAllButton) {
				this.toggleExpandAllButton(accordionExpandAllButton);
			}
		}

		if (openExpanders && openExpanders.length === 0) {
			const accordionExpandAllButton = this.host.shadowRoot?.querySelector(
				'.ontario-accordion__button--expand-all',
			) as HTMLButtonElement;
			if (accordionExpandAllButton) {
				accordionExpandAllButton.setAttribute('aria-expanded', 'false');
				const controlsContainer = accordionExpandAllButton.closest('.ontario-accordion__controls');
				if (controlsContainer) {
					controlsContainer.classList.remove('ontario-accordion__controls--active');
				}
			}
		}
	}

	private toggleExpander(expanders: HTMLElement[]) {
		expanders.forEach((item) => {
			item.addEventListener('click', () => {
				const parentContainer = item.parentNode as HTMLElement | null;
				if (!parentContainer) {
					return; // Return early if parent container is null
				}

				parentContainer.classList.toggle('ontario-expander--active');
				const content = parentContainer.parentNode?.querySelector("[data-toggle='ontario-expander-content']");

				if (!content) {
					return; // Return early if content is null
				}

				content.classList.toggle('ontario-expander__content--opened');
				content.classList.contains('ontario-expander__content--opened')
					? content.setAttribute('aria-hidden', 'false')
					: content.setAttribute('aria-hidden', 'true');

				const expanderButton = item as HTMLButtonElement;
				expanderButton.getAttribute('aria-expanded') === 'true'
					? expanderButton.setAttribute('aria-expanded', 'false')
					: expanderButton.setAttribute('aria-expanded', 'true');

				// if expander is an accordion
				const accordionExpandAllButtons = this.host.shadowRoot?.querySelectorAll(
					'.ontario-accordion__button--expand-all',
				);
				if (accordionExpandAllButtons?.length) {
					this.allAccordionsOpenCheck();
				}
			});
		});
	}

	private toggleExpanderByLink(links: HTMLAnchorElement[]) {
		const accordions = Array.from(document.querySelectorAll('.ontario-accordion')) as HTMLElement[];

		links.forEach((link) => {
			link.addEventListener('click', () => {
				const id = link.hash.substring(1);

				const relatedAccordion = this.findElement(accordions, (accordion) => {
					return accordion.id === id;
				}) as HTMLElement;

				relatedAccordion.classList.add('ontario-expander--active');

				window.setTimeout(() => {
					const firstButton = relatedAccordion.querySelector('.ontario-accordion__button') as HTMLButtonElement | null;
					if (firstButton) {
						firstButton.focus();
					}
				}, 0);

				const content = relatedAccordion.querySelector("[data-toggle='ontario-expander-content']") as HTMLElement;

				content.classList.add('ontario-expander__content--opened');
				content.setAttribute('aria-hidden', 'false');
				relatedAccordion.setAttribute('aria-expanded', 'true');
			});
		});
	}

	private toggleAllAccordions(expandAllButton: HTMLButtonElement[]) {
		expandAllButton.forEach((button) => {
			button.addEventListener('click', () => {
				const accordionContainer = button.parentElement!.parentElement! as HTMLElement;
				const accordionExpandAllButton = button;
				const accordionItems = Array.from(
					accordionContainer.querySelectorAll('.ontario-accordion-heading'),
				) as HTMLElement[];

				this.toggleExpandAllButton(accordionExpandAllButton);

				accordionItems.forEach((item) => {
					const content = Array.from(
						item.parentElement!.querySelectorAll("[data-toggle='ontario-expander-content']"),
					) as HTMLElement[];

					if (accordionExpandAllButton.parentElement!.classList.contains('ontario-accordion__controls--active')) {
						this.openAllAccordions(item, content);
					} else {
						this.closeAllAccordions(item, content);
					}
				});
			});
		});
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
