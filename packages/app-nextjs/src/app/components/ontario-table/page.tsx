import { Grid } from '../../grid';
import { OntarioTable } from '@ongov/ontario-design-system-component-library-react';

export default function OntarioTablePage() {
	return (
		<main>
			<Grid>
				<h1>ontario-table</h1>

				<div>
					<h2>"caption" Prop Variant</h2>
					<OntarioTable
						id="ontario-table-caption-variant"
						caption="Canadian provinces and their populations"
						tableColumns={[
							{ title: 'Province', key: 'province' },
							{ title: 'Population (millions)', key: 'population', type: 'numeric' },
							{ title: 'Capital City', key: 'capital' },
						]}
						tableData={[
							{
								data: {
									province: 'Ontario',
									population: '14.7',
									capital: 'Toronto',
								},
							},
							{
								data: {
									province: 'Quebec',
									population: '8.6',
									capital: 'Québec City',
								},
							},
							{
								data: {
									province: 'British Columbia',
									population: '5.3',
									capital: 'Victoria',
								},
							},
							{
								data: {
									province: 'Alberta',
									population: '4.4',
									capital: 'Edmonton',
								},
							},
						]}
					></OntarioTable>

					<hr />

					<h2>"tableColumns" Prop Variants</h2>

					<h3>Column types (numeric vs. default)</h3>
					<OntarioTable
						id="ontario-table-column-types-variant"
						caption="Fruit availability in the market"
						tableColumns={[
							{ title: 'Item', key: 'item' },
							{ title: 'Count', key: 'count', type: 'numeric' },
						]}
						tableData={[
							{ data: { item: 'Apples', count: '10' } },
							{ data: { item: 'Oranges', count: '20' } },
							{ data: { item: 'Bananas', count: '15' } },
							{ data: { item: 'Grapes', count: '8' } },
						]}
					></OntarioTable>

					<h3>Column colspan</h3>
					<OntarioTable
						id="ontario-table-column-colspan-variant"
						caption="Operating expenses for the Ministry of Advanced Education and Skills Development"
						tableColumns={[
							{ title: 'Votes/Programs', key: 'program', colSpan: 2 },
							{ title: 'Estimates $', key: 'estimates', type: 'numeric' },
							{ title: 'Actuals $', key: 'actuals', type: 'numeric', colSpan: 4 },
						]}
						tableData={[
							{ data: { program: 'Ministry administration', estimates: '16,147,000', actuals: '20,683,313' } },
							{ data: { program: 'Postsecondary education', estimates: '6,455,038,100', actuals: '7,398,858,795' } },
							{ data: { program: 'Research program', estimates: '187,399,200', actuals: '174,629,399' } },
							{
								data: {
									program: 'Total operating expense to be voted',
									estimates: '6,658,584,300',
									actuals: '7,594,171,507',
								},
							},
						]}
					></OntarioTable>

					<hr />

					<h2>"tableData" Prop Variants</h2>

					<h3>With Subtotal and Footer</h3>
					<OntarioTable
						id="ontario-table-subtotal-footer-variant"
						caption="Operating expense"
						tableColumns={[
							{ title: 'Votes/Programs', key: 'program', colSpan: 2 },
							{ title: 'Estimates 2020-21 $', key: 'column1', type: 'numeric' },
							{ title: 'Change from estimates 2019-20 $', key: 'column2', type: 'numeric' },
							{ title: 'Change from estimates 2019-20 %', key: 'column3', type: 'numeric' },
							{ title: 'Estimates 2019-20 $', key: 'column4', type: 'numeric' },
							{ title: 'Interim actuals 2019-20 $', key: 'column5', type: 'numeric' },
							{ title: 'Actuals 2018-19 $', key: 'column6', type: 'numeric' },
						]}
						tableData={[
							{
								data: {
									program: 'Ministry administration',
									column1: '16,147,000',
									column2: '1,388,600',
									column3: '9.4',
									column4: '14,758,400',
									column5: '17,470,200',
									column6: '20,683,313',
								},
							},
							{
								data: {
									program: 'Postsecondary education',
									column1: '6,455,038,100',
									column2: '(131,741,500)',
									column3: '(2.0)',
									column4: '6,586,779,600',
									column5: '6,491,779,600',
									column6: '7,398,858,795',
								},
							},
							{
								data: {
									program: 'Research program',
									column1: '187,399,200',
									column2: '(1,290,400)',
									column3: '(0.7)',
									column4: '188,689,600',
									column5: '188,689,600',
									column6: '174,629,399',
								},
							},
							{
								data: {
									program: 'Total operating expense to be voted',
									column1: '6,658,584,300',
									column2: '(131,643,300)',
									column3: '(1.9)',
									column4: '6,790,227,600',
									column5: '6,697,939,400',
									column6: '7,594,171,507',
								},
							},
							{
								data: {
									program: 'Statutory appropriations',
									column1: '55,106,014',
									column2: '0',
									column3: '0',
									column4: '55,106,014',
									column5: '55,106,014',
									column6: '36,264,081',
								},
							},
							{
								data: {
									program: 'Ministry total operating expense',
									column1: '6,713,690,314',
									column2: '(131,643,300)',
									column3: '(1.9)',
									column4: '6,845,333,614',
									column5: '6,753,045,414',
									column6: '7,630,435,588',
								},
								subtotal: true,
							},
							{
								data: {
									program: 'Consolidation & other Adjustments - Colleges',
									column1: '3,504,321,700',
									column2: '210,997,500',
									column3: '6.4',
									column4: '3,293,324,200',
									column5: '3,269,671,700',
									column6: '2,961,027,351',
								},
							},
							{
								data: {
									program: 'Operating expense adjustment - Student assistance interest expense reclassification',
									column1: '(48,979,900)',
									column2: '0',
									column3: '0',
									column4: '(48,979,900)',
									column5: '(48,979,900)',
									column6: '(33,055,246)',
								},
							},
							{
								data: {
									program: 'Consolidation & other adjustments - Hospitals',
									column1: '(9,886,600)',
									column2: '5,107,400',
									column3: '123',
									column4: '(14,994,000)',
									column5: '(15,005,000)',
									column6: '(15,193,844)',
								},
							},
							{
								data: {
									program: 'Consolidation & other adjustments - Hospitals',
									column1: '(9,886,600)',
									column2: '5,107,400',
									column3: '<abbr title="not available">N/A</abbr>',
									column4: '(14,994,000)',
									column5: '(15,005,000)',
									column6: '(15,193,844)',
								},
							},
							{
								data: {
									program: 'Consolidation & other adjustments - General real estate portfolio',
									column1: '(5,904,600)',
									column2: '(5,686,900)',
									column3: '<abbr title="not available">N/A</abbr>',
									column4: '(217,700)',
									column5: '<abbr title="not available">N/A</abbr>',
									column6: '(189,337)',
								},
							},
							{
								data: {
									program: 'Total including consolidation & other adjustments',
									column1: '10,153,240,914',
									column2: '78,774,700',
									column3: '0.80',
									column4: '10,074,466,214',
									column5: '9,958,732,214',
									column6: '10,543,024,512',
								},
								footer: true,
							},
						]}
					></OntarioTable>

					<h3>With Highlight</h3>
					<OntarioTable
						id="ontario-table-highlight-variant"
						caption="Number of engagement sessions by business area from 2016–2020"
						zebraStripes="enabled"
						tableColumns={[
							{ title: 'Business area', key: 'business' },
							{ title: 'April 2016 – March 2017', key: 'date1', type: 'numeric' },
							{ title: 'April 2017 - March 2018', key: 'date2', type: 'numeric' },
							{ title: 'April 2018 - March 2019', key: 'date3', type: 'numeric' },
							{ title: 'April 2019 - March 2020', key: 'date4', type: 'numeric' },
						]}
						tableData={[
							{
								data: {
									business: 'Aggregates and petroleum',
									date1: '35',
									date2: '32',
									date3: '45',
									date4: '71',
								},
							},
							{
								data: {
									business: 'Fish and wildlife',
									date1: '162',
									date2: '240',
									date3: '178',
									date4: '162',
								},
							},
							{
								data: {
									business: 'Forestry',
									date1: '182',
									date2: '170',
									date3: '235',
									date4: '242',
								},
								highlight: true,
							},
							{
								data: {
									business: 'Lands and water',
									date1: '79',
									date2: '101',
									date3: '42',
									date4: '70',
								},
							},
							{
								data: {
									business: 'General',
									date1: '56',
									date2: '37',
									date3: '64',
									date4: '46',
								},
							},
							{
								data: {
									business: 'Total row',
									date1: '514',
									date2: '580',
									date3: '564',
									date4: '591',
								},
								footer: true,
							},
						]}
					></OntarioTable>

					<h3>Cell markup (innerHTML)</h3>
					<OntarioTable
						id="ontario-table-cell-markup-variant"
						caption="Compliance status"
						tableColumns={[
							{ title: 'Requirement', key: 'requirement' },
							{ title: 'Status', key: 'status' },
							{ title: 'Details', key: 'details' },
						]}
						tableData={[
							{
								data: {
									requirement: 'Accessibility audit',
									status: '<strong>Complete</strong>',
									details: 'Audit completed on <time datetime="2023-10-18">October 18, 2023</time>',
								},
							},
							{
								data: {
									requirement: 'Public consultation',
									status: '<abbr title="Not applicable">N/A</abbr>',
									details: 'No consultation required for minor update',
								},
							},
							{
								data: {
									requirement: 'Compliance certification',
									status: '<span class="ontario-text--warning">Pending</span>',
									details: 'Expected by <time datetime="2024-06-30">June 30, 2024</time>',
								},
							},
						]}
					></OntarioTable>

					<hr />

					<h2>"zebraStripes" Prop Variants</h2>

					<h3>auto (4 rows - should look like no zebra stripes)</h3>
					<OntarioTable
						id="ontario-table-zebra-auto-variant"
						caption="Applications received by region"
						zebraStripes="auto"
						tableColumns={[
							{ title: 'Region', key: 'region' },
							{ title: 'Applications received', key: 'count', type: 'numeric' },
						]}
						tableData={[
							{ data: { region: 'Central', count: '1,248' } },
							{ data: { region: 'East', count: '982' } },
							{ data: { region: 'North', count: '412' } },
							{ data: { region: 'South West', count: '1,031' } },
						]}
					></OntarioTable>

					<h3>auto (6 rows - should show zebra)</h3>
					<OntarioTable
						id="ontario-table-zebra-auto-variant-2"
						caption="Applications received by region"
						zebraStripes="auto"
						tableColumns={[
							{ title: 'Region', key: 'region' },
							{ title: 'Applications received', key: 'count', type: 'numeric' },
						]}
						tableData={[
							{ data: { region: 'Central', count: '1,248' } },
							{ data: { region: 'East', count: '982' } },
							{ data: { region: 'North', count: '412' } },
							{ data: { region: 'South West', count: '1,031' } },
							{ data: { region: 'Toronto', count: '2,543' } },
							{ data: { region: 'Ottawa', count: '1,876' } },
						]}
					></OntarioTable>

					<h3>`zebraStripes`` enabled</h3>
					<OntarioTable
						id="ontario-table-zebra-enabled-variant"
						caption="Applications received by region"
						zebraStripes="enabled"
						tableColumns={[
							{ title: 'Region', key: 'region' },
							{ title: 'Applications received', key: 'count', type: 'numeric' },
						]}
						tableData={[
							{ data: { region: 'Central', count: '1,248' } },
							{ data: { region: 'East', count: '982' } },
							{ data: { region: 'North', count: '412' } },
							{ data: { region: 'South West', count: '1,031' } },
						]}
					></OntarioTable>

					<h3>`zebraStripes` disabled</h3>
					<OntarioTable
						id="ontario-table-zebra-disabled-variant"
						caption="Applications received by region"
						zebraStripes="disabled"
						tableColumns={[
							{ title: 'Region', key: 'region' },
							{ title: 'Applications received', key: 'count', type: 'numeric' },
						]}
						tableData={[
							{ data: { region: 'Central', count: '1,248' } },
							{ data: { region: 'East', count: '982' } },
							{ data: { region: 'North', count: '412' } },
							{ data: { region: 'South West', count: '1,031' } },
							{ data: { region: 'Toronto', count: '2,543' } },
							{ data: { region: 'Ottawa', count: '1,876' } },
						]}
					></OntarioTable>

					<hr />

					<h2>"condensed" Prop Variant</h2>
					<OntarioTable
						id="ontario-table-condensed-variant"
						caption="Service requests by type (2023)"
						condensed
						tableColumns={[
							{ title: 'Service type', key: 'service' },
							{ title: 'Requests (2023)', key: 'requests', type: 'numeric' },
							{ title: 'Details', key: 'details' },
							{ title: 'Status', key: 'status' },
							{ title: 'Notes', key: 'notes' },
							{ title: 'More info', key: 'info' },
						]}
						tableData={[
							{
								data: {
									service: 'Technical support',
									requests: '1,234',
									details: 'Includes software and hardware issues',
									status: 'Open',
									notes: 'High priority',
									info: '<a href="https://www.ontario.ca/page/technical-support">Learn more</a>',
								},
							},
							{
								data: {
									service: 'Billing inquiries',
									requests: '567',
									details: 'Questions about invoices and payments',
									status: 'Closed',
									notes: 'Resolved within 24 hours',
									info: '<a href="https://www.ontario.ca/page/billing-inquiries">Learn more</a>',
								},
							},
							{
								data: {
									service: 'General information',
									requests: '890',
									details: 'Requests for general information about services',
									status: 'Open',
									notes: 'Responded within 48 hours',
									info: '<a href="https://www.ontario.ca/page/general-information">Learn more</a>',
								},
							},
						]}
					></OntarioTable>

					<hr />

					<h2>"fullWidth" Prop Variant</h2>
					<h3>`fullWidth` enabled</h3>
					<OntarioTable
						id="ontario-table-fullwidth-enabled-variant"
						caption="Operating expenses by program area"
						fullWidth
						tableColumns={[
							{ title: 'Program area', key: 'program' },
							{ title: '2022–23 Actuals ($)', key: 'actuals', type: 'numeric' },
							{ title: '2023–24 Estimates ($)', key: 'estimates', type: 'numeric' },
							{ title: 'Variance ($)', key: 'variance', type: 'numeric' },
						]}
						tableData={[
							{
								data: {
									program: 'Hospital operations and acute care services',
									actuals: '21,488,900,000',
									estimates: '21,102,600,000',
									variance: '(386,300,000)',
								},
							},
							{
								data: {
									program: 'Primary care and community health programs',
									actuals: '3,214,500,000',
									estimates: '3,298,400,000',
									variance: '83,900,000',
								},
							},
							{
								data: {
									program: 'Mental health and addictions services',
									actuals: '1,274,300,000',
									estimates: '1,358,900,000',
									variance: '84,600,000',
								},
							},
						]}
					></OntarioTable>

					<h3>`condensed` and `fullWidth` enabled</h3>
					<OntarioTable
						id="ontario-table-fullwidth-enabled-variant"
						caption="Operating expenses by program area"
						fullWidth
						condensed
						tableColumns={[
							{ title: 'Program area', key: 'program' },
							{ title: '2022–23 Actuals ($)', key: 'actuals', type: 'numeric' },
							{ title: '2023–24 Estimates ($)', key: 'estimates', type: 'numeric' },
							{ title: 'Variance ($)', key: 'variance', type: 'numeric' },
							{ title: 'Returns ($)', key: 'returns' },
						]}
						tableData={[
							{
								data: {
									program: 'Hospital operations and acute care services',
									actuals: '21,488,900,000',
									estimates: '21,102,600,000',
									variance: '(386,300,000)',
									returns: '<a href="https://www.ontario.ca/page/health-care-ontario">Learn more</a>',
								},
							},
							{
								data: {
									program: 'Primary care and community health programs',
									actuals: '3,214,500,000',
									estimates: '3,298,400,000',
									variance: '83,900,000',
									returns: '<a href="https://www.ontario.ca/page/health-care-ontario">Learn more</a>',
								},
							},
							{
								data: {
									program: 'Mental health and addictions services',
									actuals: '1,274,300,000',
									estimates: '1,358,900,000',
									variance: '84,600,000',
									returns: '<a href="https://www.ontario.ca/page/health-care-ontario">Learn more</a>',
								},
							},
							{
								data: {
									program: 'Total',
									actuals: '25,977,700,000',
									estimates: '25,759,900,000',
									variance: '(217,800,000)',
									returns: '<a href="https://www.ontario.ca/page/health-care-ontario">Learn more</a>',
								},
							},
							{
								data: {
									program: 'Less: Statutory and other adjustments',
									actuals: '(1,234,500,000)',
									estimates: '(1,345,600,000)',
									variance: '111,100,000',
									returns: '<a href="https://www.ontario.ca/page/health-care-ontario">Learn more</a>',
								},
							},
						]}
					></OntarioTable>

					<hr />

					<h2>Edge/Negative cases</h2>

					<h3>Invalid "tableColumns" prop (invalid JSON string)</h3>
					<OntarioTable
						id="ontario-table-invalid-columns-json"
						caption="Table - invalid `tableColumns` JSON"
						// eslint-disable-next-line @typescript-eslint/ban-ts-comment
						tableColumns={'{ not valid json '}
						tableData={[{ data: { province: 'Ontario', population: '14.7', capital: 'Toronto' } }]}
					></OntarioTable>

					<h3>Invalid "tableData" prop (invalid JSON string)</h3>
					<OntarioTable
						id="ontario-table-invalid-data-json"
						caption="Table - Invalid `tableData` JSON"
						tableColumns={[
							{ title: 'Province', key: 'province' },
							{ title: 'Population', key: 'population', type: 'numeric' },
						]}
						// eslint-disable-next-line @typescript-eslint/ban-ts-comment
						tableData={'{ not valid json '}
					></OntarioTable>

					<h3>Empty "tableData" prop</h3>
					<OntarioTable
						id="ontario-table-empty-data"
						caption="Table - Empty `tableData` prop"
						tableColumns={[
							{ title: 'Province', key: 'province' },
							{ title: 'Population', key: 'population', type: 'numeric' },
						]}
						tableData={[]}
					></OntarioTable>

					<h3>Data missing keys (columns/data mismatch)</h3>
					<OntarioTable
						id="ontario-table-missing-keys"
						caption="Table - Missing keys"
						tableColumns={[
							{ title: 'Province', key: 'province' },
							{ title: 'Population', key: 'population', type: 'numeric' },
							{ title: 'Capital', key: 'capital' },
						]}
						tableData={[
							{ data: { province: 'Ontario', population: '14.7' /* capital missing */ } },
							{ data: { province: 'Quebec', capital: 'Québec City' /* population missing */ } },
						]}
					></OntarioTable>

					<h3>Footer row appears mid-array (should render in &lt;tfoot&gt;)</h3>
					<OntarioTable
						id="ontario-table-footer-middle"
						caption="Table - footer `tableData` mid-array"
						tableColumns={[
							{ title: 'Label', key: 'label' },
							{ title: 'Value', key: 'value', type: 'numeric' },
						]}
						tableData={[
							{ data: { label: 'A', value: '1' } },
							{ data: { label: 'Total', value: '1' }, footer: true },
							{ data: { label: 'B', value: '2' } },
						]}
					></OntarioTable>
				</div>
			</Grid>
		</main>
	);
}
