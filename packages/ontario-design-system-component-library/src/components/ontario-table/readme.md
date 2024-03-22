import { OntarioTable } from '@ongov/ontario-design-system-component-library-react';

# ontario-table

Use a table to present data and make it easy to compare or contrast values.

## Usage guidance

Please refer to the [Ontario Design System](https://designsystem.ontario.ca/components/detail/tables.html) for current documentation guidance for tables.

## Configuration

Once the component package has been installed (see Ontario Design System Component Library for installation instructions), the table component can be added directly into the project's code, and can be customized by updating the properties outlined [here](#properties). Additional information on custom types for header properties are outlined [here](#custom-property-types). Please see the [examples](#examples) below for how to configure the component.

## Examples

Example of a full-width table component with added zebra striping.

```html
<ontario-table
	caption="Marriage certificate: cost and delivery"
	full-width="true"
	zebra-stripes="enabled"
	table-columns='[
        { "title": "Type of service", "key": "service" },
        { "title": "Processing and delivery", "key": "processing" },
        { "title": "Cost", "key": "cost", "type": "numeric" }
    ]'
	table-data='[
        {
            "data" : {
                "service": "Regular service (online)",
                "processing": "15 business days plus delivery by Canada Post",
                "cost": "$15"
            }
        },
        {
            "data" : {
                "service": "Premium service (online)",
                "cost": "$45",
                "processing": "5 business days including delivery by courier"
            }
        },
        {
            "data" : {
                "processing": "5 business days including delivery by courier (proof of urgency is required)",
                "service": "Emergency service (in-person)",
                "cost": "$45"
            }
        }
    ]'
>
</ontario-table>
```

<div>
    <OntarioTable
        caption="Marriage certificate: cost and delivery"
        full-width="true"
        zebra-stripes="enabled"
        table-columns='[
            { "title": "Type of service", "key": "service" },
            { "title": "Processing and delivery", "key": "processing" },
            { "title": "Cost", "key": "cost", "type": "numeric" }
        ]'
        table-data='[
            {
                "data" : {
                    "service": "Regular service (online)",
                    "processing": "15 business days plus delivery by Canada Post",
                    "cost": "$15"
                }
            },
            {
                "data" : {
                    "service": "Premium service (online)",
                    "cost": "$45",
                    "processing": "5 business days including delivery by courier"
                }
            },
            {
                "data" : {
                    "processing": "5 business days including delivery by courier (proof of urgency is required)",
                    "service": "Emergency service (in-person)",
                    "cost": "$45"
                }
            }
        ]'>
    </OntarioTable>
</div>

Example of a condensed table component with numeric columns/rows, and a subtotal and footer row in the `tableData` property.

```html
<ontario-table
	caption="Operating expense"
	condensed="true"
	table-columns='[
        { "title": "Votes/Programs", "key": "program", "colSpan": 2 },
        { "title": "Estimates 2020-21 $", "key": "column1", "type": "numeric" },
        { "title": "Change from estimates 2019-20 $", "key": "column2", "type": "numeric" },
        { "title": "Change from estimates 2019-20 %", "key": "column3", "type": "numeric" },
        { "title": "Estimates 2019-20 $", "key": "column4", "type": "numeric" },
        { "title": "Interim actuals 2019-20 $", "key": "column5", "type": "numeric" },
        { "title": "Actuals 2018-19 $", "key": "column6", "type": "numeric"}
    ]'
	table-data='[
        {
            "data" : {
                "program": "Ministry administration",
                "column1": "16,147,000",
                "column6": "20,683,313",
                "column2": "1,388,600",
                "column3": "9.4",
                "column4": "14,758,400",
                "column5": "17,470,200"
            }
        },
        {
            "data" : {
                "program": "Total operating expense to be voted",
                "column1": "6,658,584,300",
                "column2": "(131,643,300)",
                "column3": "(1.9)",
                "column4": "6,790,227,600",
                "column5": "6,697,939,400",
                "column6": "7,594,171,507"
            }
        },
        {
            "data" : {
                "program": "Statutory appropriations",
                "column1": "55,106,014",
                "column2": "0",
                "column3": "0",
                "column4": "55,106,014",
                "column5": "55,106,014",
                "column6": "36,264,081"
            }
        },
        { 
            "data" : {
                "program": "Ministry total operating expense",
                "column1": "6,713,690,314",
                "column2": "(131,643,300)",
                "column3": "(1.9)",
                "column4": "6,845,333,614",
                "column5": "6,753,045,414",
                "column6": "7,630,435,588"
            },
            "subtotal": "true"
        },
        {
            "data" : {
                "program": "Consolidation & other adjustments - Hospitals",
                "column1": "(9,886,600)",
                "column2": "5,107,400",
                "column3": "<abbr title=\"not available\">N/A</abbr>",
                "column4": "(14,994,000)",
                "column5": "(15,005,000)",
                "column6": "(15,193,844)"
            }
        },
        {
            "data" : {
                "program": "Consolidation & other adjustments - General real estate portfolio",
                "column1": "(5,904,600)",
                "column2": "(5,686,900)",
                "column3": "<abbr title=\"not available\">N/A</abbr>",
                "column4": "(217,700)",
                "column5": "<abbr title=\"not available\">N/A</abbr>",
                "column6": "(189,337)"
            }
        },
        {
            "data" : {
                "program": "Total including consolidation & other adjustments",
                "column1": "10,153,240,914",
                "column2": "78,774,700",
                "column3": "0.80",
                "column4": "10,074,466,214",
                "column5": "9,958,732,214",
                "column6": "10,543,024,512"
            },
            "footer": true
        }
    ]'
>
</ontario-table>
```

<div>
    <OntarioTable	
        caption="Operating expense"
        condensed="true"
        table-columns='[
            { "title": "Votes/Programs", "key": "program", "colSpan": 2 },
            { "title": "Estimates 2020-21 $", "key": "column1", "type": "numeric" },
            { "title": "Change from estimates 2019-20 $", "key": "column2", "type": "numeric" },
            { "title": "Change from estimates 2019-20 %", "key": "column3", "type": "numeric" },
            { "title": "Estimates 2019-20 $", "key": "column4", "type": "numeric" },
            { "title": "Interim actuals 2019-20 $", "key": "column5", "type": "numeric" },
            { "title": "Actuals 2018-19 $", "key": "column6", "type": "numeric"}
        ]'
        table-data='[
            {
                "data" : {
                    "program": "Ministry administration",
                    "column1": "16,147,000",
                    "column6": "20,683,313",
                    "column2": "1,388,600",
                    "column3": "9.4",
                    "column4": "14,758,400",
                    "column5": "17,470,200"
                }
            },
            {
                "data" : {
                    "program": "Total operating expense to be voted",
                    "column1": "6,658,584,300",
                    "column2": "(131,643,300)",
                    "column3": "(1.9)",
                    "column4": "6,790,227,600",
                    "column5": "6,697,939,400",
                    "column6": "7,594,171,507"
                }
            },
            {
                "data" : {
                    "program": "Statutory appropriations",
                    "column1": "55,106,014",
                    "column2": "0",
                    "column3": "0",
                    "column4": "55,106,014",
                    "column5": "55,106,014",
                    "column6": "36,264,081"
                }
            },
            { 
                "data" : {
                    "program": "Ministry total operating expense",
                    "column1": "6,713,690,314",
                    "column2": "(131,643,300)",
                    "column3": "(1.9)",
                    "column4": "6,845,333,614",
                    "column5": "6,753,045,414",
                    "column6": "7,630,435,588"
                },
                "subtotal": "true"
            },
            {
                "data" : {
                    "program": "Consolidation & other adjustments - Hospitals",
                    "column1": "(9,886,600)",
                    "column2": "5,107,400",
                    "column3": "<abbr title=\"not available\">N/A</abbr>",
                    "column4": "(14,994,000)",
                    "column5": "(15,005,000)",
                    "column6": "(15,193,844)"
                }
            },
            {
                "data" : {
                    "program": "Consolidation & other adjustments - General real estate portfolio",
                    "column1": "(5,904,600)",
                    "column2": "(5,686,900)",
                    "column3": "<abbr title=\"not available\">N/A</abbr>",
                    "column4": "(217,700)",
                    "column5": "<abbr title=\"not available\">N/A</abbr>",
                    "column6": "(189,337)"
                }
            },
            {
                "data" : {
                    "program": "Total including consolidation & other adjustments",
                    "column1": "10,153,240,914",
                    "column2": "78,774,700",
                    "column3": "0.80",
                    "column4": "10,074,466,214",
                    "column5": "9,958,732,214",
                    "column6": "10,543,024,512"
                },
                "footer": true
            }
        ]'>
    </OntarioTable>
</div>

## Custom property types

### TableColumnOptions

Used to define the columns of the table.

```html
<ontario-table
	table-columns='[
        { "title": "Type of service", "key": "service" },
        { "title": "Processing and delivery", "key": "processing" },
        { "title": "Cost", "key": "cost", "type": "numeric" }
    ]'
>
</ontario-table>
```

| Property name | Type                                                                       | Default     | Description                                                                                                                                                                                              |
| ------------- | -------------------------------------------------------------------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `title`       | `string`                                                                   |             | The text for the column.                                                                                                                                                                                 |
| `key`         | `string \| number`                                                         |             | The unique key of the column. This will be the reference point for the table data rows.                                                                                                                  |
| `type`        | `"string" \| "numeric" \| undefined`                                       | `string`    | The type of display for the data that falls under this column. This can either be set to `"string"` or `"numeric"`.<br /> This is optional. If no prop is passed, the default will be set to `"string"`. |
| `colspan`     | `1 \| 2 \| 3 \| 4 \| 5 \| 6 \| 7 \| 8 \| 9 \| 10 \| 11 \| 12 \| undefined` | `undefined` | The width of the column. The number values are equivalent to the grid column width values <br /> This is optional. By default the column width will fit its max content.                                 |

### TableRowOptions

Used to define the table body data. Note that the keys passed to the `data` object in the `tableData` prop should match the keys of the columns defined in the `tableColumns` prop.

```html
<ontario-table
	table-data='[ 
		{
            "data": {
                "service": "Regular service (online)",
                "processing": "15 business days plus delivery by Canada Post",
                "cost": "$15"
            }
        },
        {
            "data": {
                "service": "Premium service (online)",
                "cost": "$45",
                "processing": "5 business days including delivery by courier"
            }
        }
	]'
></ontario-table>
```

| Property name | Type                                              | Default | Description                                                                                                                                                                |
| ------------- | ------------------------------------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `data`        | `{[key: string]: string \| number \| undefined;}` |         | The data to input into the table rows. <br /> The keys for the data objects passed in should reflect the respective keys of the [TableColumnOptions](#tablecolumnoptions). |
| `highlight`   | `boolean \| undefined`                            | `false` | A boolean value to indicate whether or not the row should be highlighted. <br />This is optional. If no prop is passed, it will default to `false`.                        |
| `subtotal`    | `boolean \| undefined`                            | `false` | A boolean value to indicate whether or not the row should be styled as a subtotal. <br />This is optional. If no prop is passed, it will default to `false`.               |
| `footer`      | `boolean \| undefined`                            | `false` | A boolean value to indicate whether or not the row should be coded as a table footer. <br /> This is optional. If no prop is passed, it will default to `false`.           |

<!-- Auto Generated Below -->

## Properties

| Property       | Attribute       | Description                                                                                                                                                                                                                                                                                                                                                                         | Type                                             | Default     |
| -------------- | --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ | ----------- |
| `caption`      | `caption`       | Specifies the caption (or title) of the table. This is optional.                                                                                                                                                                                                                                                                                                                    | `string \| undefined`                            | `undefined` |
| `condensed`    | `condensed`     | Used to specify whether or not table data in cells should have reduced top and bottom padding. This is useful for pages with multiple data-heavy tables such as a budget or financial data. This is optional. By default it will be set to “false”.                                                                                                                                 | `boolean \| undefined`                           | `false`     |
| `fullWidth`    | `full-width`    | Used to specify whether or not the table should extend the full width of its container. This is optional. By default, it will be set to “false”                                                                                                                                                                                                                                     | `boolean \| undefined`                           | `false`     |
| `tableColumns` | `table-columns` | Used to define the columns of the table.                                                                                                                                                                                                                                                                                                                                            | `TableColumnOptions[] \| string`                 | `undefined` |
| `tableData`    | `table-data`    | Used to define the table body data. Note that the keys passed to the `data` object in the tableData should match the keys of the columns defined in the tableColumns prop.                                                                                                                                                                                                          | `TableRowOptions[] \| string`                    | `undefined` |
| `zebraStripes` | `zebra-stripes` | Indicates whether or not the table data should have alternate row zebra striping. This is optional. By default, zebra striping will be added when the table rows extend 5 rows. If zebra striping is needed to table rows less than 5 rows, the prop should be set to “enabled”. If no zebra stripes are needed, it should be set to “disabled”. The default will be set to “auto”. | `"auto" \| "disabled" \| "enabled" \| undefined` | `'auto'`    |

---

_Built with [StencilJS](https://stenciljs.com/)_
