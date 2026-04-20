export const samples = [
	{
		component: 'my-component',
		html: '<my-component prop="value"></my-component>',
		outputFile: 'my-component.html',
		description: 'Demonstrates how to pass props to the sample component.',
	},
	{
		component: 'sample-button',
		html: '<sample-button type="primary">Click me</sample-button>',
		outputFile: 'sample-button.html',
		description: 'Renders the primary button style with slotted text content.',
	},
	{
		component: 'sample-input',
		html: '<sample-input label="Name" placeholder="Jane Doe"></sample-input>',
		outputFile: 'sample-input.html',
		description: 'Softly-styled text input with label to mirror the sample button aesthetic.',
	},
	{
		component: 'sample-card',
		html: '<sample-card heading="Release notes" summary="Draft notes for the upcoming launch" status="Draft"><p>Next steps include QA and stakeholder review.</p><sample-card-action slot="actions" label="Review draft" variant="primary"></sample-card-action><sample-card-action slot="actions" label="Share" variant="ghost"></sample-card-action></sample-card>',
		outputFile: 'sample-card.html',
		description: 'Card layout that nests action components to show composition.',
	},
	{
		component: 'sample-card-action',
		html: '<sample-card-action label="Review draft" variant="primary"></sample-card-action>',
		outputFile: 'sample-card-action.html',
		description: 'Standalone action control used inside the sample card.',
	},
];
