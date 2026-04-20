// Sample config for Stencil component sample generation
// Each entry defines the tag name and sample HTML (or props/variants) for a component

export interface ComponentSample {
	/**
	 * Component tag name used to resolve the Stencil component class.
	 */
	component: string;
	/**
	 * HTML snippet that represents the component in the docs.
	 */
	html: string;
	/**
	 * Output filename for the generated sample document.
	 */
	outputFile: string;
	/**
	 * Optional short description that will be included in the generated page.
	 */
	description?: string;
	/**
	 * Whether to include component CSS inline (default: true)
	 */
	includeStyles?: boolean;
}

export const samples: ComponentSample[] = [
	{
		component: 'ontario-button',
		html: '<ontario-button type="primary" label="Click me"></ontario-button>',
		outputFile: 'ontario-button.html',
		description: 'Primary button from Ontario Design System',
		includeStyles: true,
	},
	{
		component: 'ontario-accordion',
		html: `<ontario-accordion
      name="My Accordion"
      expand-collapse-button='{
        "expandAllSectionsLabel": "Expand All",
        "collapseAllSectionsLabel": "Collapse All"
      }'
      accordion-data='[
        {"label": "Section 1", "content": "Content for section 1"},
        {"label": "Section 2", "content": "Content for section 2"}
      ]'
    ></ontario-accordion>`,
		outputFile: 'ontario-accordion.html',
		description: 'Accordion component from Ontario Design System',
		includeStyles: true,
	},
];
