'use client';
import { Grid } from '../../grid';
import { OntarioTable } from '@ongov/ontario-design-system-component-library-react';

export default function OntarioButtonPage() {
	return (
		<main>
			<Grid>
				<h1>ontario-table</h1>

				<div>
					<h2>"caption" Prop Variant</h2>
					<OntarioTable
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

					<h2>"tableColumns" Prop Variants</h2>

					<h2>"tableData" Prop Variants</h2>

					<h3>With Subtotal and Footer</h3>
					<OntarioTable
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

					<h2>"zebraStripes" Prop Variants</h2>

					<h2>"condensed" Prop Variant</h2>

					<h2>"fullWidth" Prop Variant</h2>
				</div>
			</Grid>
		</main>
	);
}
