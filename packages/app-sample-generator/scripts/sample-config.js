export const samples = [
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
