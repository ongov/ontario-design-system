import { Component, Prop, h } from '@stencil/core';
// import { Accordion } from "./accordion.interface";

@Component({
	tag: 'ontario-accordion-section',
	styleUrl: 'ontario-accordion.scss',
	shadow: true,
})
export class OntarioAccordionSection {
	@Prop() label: string;
	@Prop() accordionContentType: 'string' | 'html';
	@Prop() content: string;
	@Prop() isOpen: boolean;
	@Prop() ariaLabelText: string;
	@Prop() elementId?: string | undefined;
	getId?: (() => string) | undefined;
	componentWillLoad?: (() => void) | undefined;
	// render?: (() => object) | undefined;

	render() {
		return <slot></slot>;
	}
}
