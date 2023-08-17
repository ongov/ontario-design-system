import { newE2EPage } from '@stencil/core/testing';

describe('ontario-table', () => {
	it('renders', async () => {
		const page = await newE2EPage();
		await page.setContent(`
		<ontario-table
			caption="Marriage certificate: cost and delivery"
			table-columns='[
				{ "title": "Type of service", "key": "service" },
				{ "title": "Processing and delivery", "key": "processing" }
			]'
			table-data='[
				{
					"data" : {
						"service": "Regular service (online)",
						"processing": "15 business days plus delivery by Canada Post"
					}
				},
				{
					"data" : {
						"service": "Premium service (online)",
						"processing": "5 business days including delivery by courier"
					}
				}
			]'
		></ontario-table>
		`);
		const component = await page.find('ontario-table');
		const element = await page.find('ontario-table >>> div');

		expect(component).toHaveClass('hydrated');
		expect(element).toHaveClass('ontario-table-container');
	});

	it('should render the default table when no optional props are passed', async () => {
		const page = await newE2EPage();
		await page.setContent(`
		<ontario-table
			caption="Marriage certificate: cost and delivery"
			table-columns='[
				{ "title": "Type of service", "key": "service" },
				{ "title": "Processing and delivery", "key": "processing" }
			]'
			table-data='[
				{
					"data" : {
						"service": "Regular service (online)",
						"processing": "15 business days plus delivery by Canada Post"
					}
				},
				{
					"data" : {
						"service": "Premium service (online)",
						"processing": "5 business days including delivery by courier"
					}
				}
			]'
		></ontario-table>
		`);
		const element = await page.find('ontario-table >>> table');
		expect(element).not.toHaveClasses(['ontario-table--condensed', 'ontario-table--full-container-width']);

		const twoColumnHeader = await page.find('ontario-table >>> .ontario-table-header--column-span-2');
		expect(twoColumnHeader).toBeNull();

		const numericTableCells = await page.find('ontario-table >>> .ontario-table-cell--numeric');
		expect(numericTableCells).toBeNull();

		const highlightClass = await page.find('ontario-table >>> .ontario-table-row--highlight');
		expect(highlightClass).toBeNull();

		const subtotalRowClass = await page.find('ontario-table >>> .ontario-table-row--subtotal');
		expect(subtotalRowClass).toBeNull();

		const footer = await page.find('ontario-table >>> tfoot');
		expect(footer).toBeNull();
	});

	it('should render the correct classes when multiple props are passed', async () => {
		const page = await newE2EPage();
		await page.setContent(`
		<ontario-table
			caption="Number of engagement sessions by business area from 2016–2020"
			zebra-stripes="enabled"
			full-width="true"
			condensed="true"
			table-columns='[
				{ "title": "Business area", "key": "business", "colSpan": 2 },
				{ "title": "April 2016 – March 2017", "key": "date1", "type": "numeric" },
				{ "title": "April 2017 - March 2018", "key": "date2", "type": "numeric" },
				{ "title": "April 2018 - March 2019", "key": "date3", "type": "numeric" },
				{ "title": "April 2019 - March 2020", "key": "date4", "type": "numeric" }
			]'
			table-data='[
				{
					"data" : {
						"business": "Aggregates and petroleum",
						"date1": "35",
						"date2": "32",
						"date3": "45",
						"date4": "71"
					}
				},
				{
					"data" : {
						"business": "Fish and wildlife",
						"date1": "162",
						"date2": "240",
						"date3": "178",
						"date4": "162"
					}
				},
				{
					"data": {
						"business": "Forestry",
						"date1": "182",
						"date2": "170",
						"date3": "235",
						"date4": "242"
					},
					"highlight": "true"
				},
				{
					"data": {
						"business": "Lands and water",
						"date1": "79",
						"date2": "101",
						"date3": "42",
						"date4": "70"
					}
				},
				{
					"data": {
						"business": "General",
						"date1": "56",
						"date2": "37",
						"date3": "64",
						"date4": "46"
					},
					"subtotal": "true"
				},
				{ 
					"data": {
						"business": "Total row",
						"date1": "514",
						"date2": "580",
						"date3": "564",
						"date4": "591"
					},
					"footer": true
				}
			]'
		>
		</ontario-table>
		`);

		const element = await page.find('ontario-table >>> table');
		expect(element).toHaveClasses([
			'ontario-table--condensed',
			'ontario-table--full-container-width',
			'ontario-table--zebra-stripes-enabled',
		]);

		const twoColumnHeader = await page.find('ontario-table >>> .ontario-table-header--column-span-2');
		expect(twoColumnHeader).not.toBeNull();

		const numericTableCells = await page.find('ontario-table >>> .ontario-table-cell--numeric');
		expect(numericTableCells).not.toBeNull();

		const highlightClass = await page.find('ontario-table >>> .ontario-table-row--highlight');
		expect(highlightClass).not.toBeNull();

		const subtotalRowClass = await page.find('ontario-table >>> .ontario-table-row--subtotal');
		expect(subtotalRowClass).not.toBeNull();

		const footer = await page.find('ontario-table >>> tfoot');
		expect(footer).not.toBeNull();
	});
});
