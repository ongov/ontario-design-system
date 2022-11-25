# ontario-checkbox

Use checkboxes when you want the user to select one or more options from a list.

## User guidance

Please refer to the [Ontario Design System](https://designsystem.ontario.ca/components/detail/checkboxes.html) for current documentation guidance.

## Configuration

Once the component package has been installed (see Ontario Design System Component Library for installation instructions), the checkbox component can be added directly into the project's code, and can be customized by updating the properties outlined [here](#properties). Additional information on custom types for header properties are outlined [here](#custom-property-types). Please see the [examples](#examples) below for how to configure the component.

## Examples

Example of a bare-bones checkbox component, the legend for the checkbox fieldset is provided, as well as 1 checkbox option.

```html
<ontario-checkboxes
	caption="This is a question?"
	options='[{
    "name": "Checkbox 1",
    "value": "checkbox-1-value",
    "label": "Checkbox Label"
  }]'
>
</ontario-checkboxes>
```

Example of a checkbox component with multiple options, a hint text for the entire fieldset, and a hint expander on the individual option. It also has the `is-required` property set to `true`.

```html
<ontario-checkboxes
	caption="This is a question?"
	hint-text="This is the hint text"
	is-required
	options='[
    {
      "name": "Checkbox 1",
      "value": "checkbox-1-value",
      "label": "Checkbox Label"
    },
    {
      "name": "Checkbox-2",
      "value": "checkbox-2",
      "label": "checkbox-2-label",
      "hintExpander": {
        "hint": "Hint expander",
        "content": "This is the content"
      }
    }
  ]'
>
</ontario-checkboxes>
```

## Custom property types

### caption

The caption property is used to render the legend for the ontario-checkbox. It can be passed either a string or an object. If no captionType needs to be specified, it can be passed as a string.

```html
caption='{
	"captionText": "Checkbox legend",
	"captionType": "large"
}'
```

| **Property name** 	| **Type**                          	| **Description**                                                                                                                                      	|
|-------------------	|-----------------------------------	|------------------------------------------------------------------------------------------------------------------------------------------------------	|
| captionText       	| `string`                            	| Text to display as the checkbox question                                                                                                             	|
| captionType       	| `"default" \| "large"\| "heading"` | The type of legend to display for the checkbox question. This is optional, and if no information is provided, it will default to the "default" type. 	|

### hintExpander

This hintExpander property is used to include the Hint Expander component underneath the checkbox legend. This is passed in as an object with key-value pairs. This is optional.

```html
hintExpander='{
	"hint": "This is the hint expander title",
	"content": "This is the hint expander content - it is only visible when the hint expander title (hint) is toggled"
}'
```

| **Property name** 	| **Type** 	| **Description**                                                                                               	|
|-------------------	|----------	|---------------------------------------------------------------------------------------------------------------	|
| hint              	| `string`   	| Text to display as the hint expander label/title. When toggled, it will display/hide the hintExpander content 	|
| content           	| `string`   	| Text to display as the content of the hint expander                                                           	|

### options

The options property will render out the different checkbox inputs and their labels. These are passed in as objects with key-value pairs, inside an array.

```html
options='[
	{
		"value": "checkbox-option-1",
		"label": "Checkbox option 1"
	},
	{
		"value": "checkbox-option-2",
		"label": "Checkbox option 2",
		"hintExpander": {
			"hint": "Hint expander title for checkbox option 2",
			"content": "Hint expander content for checkbox option 2"
		}
	},
]'
```

| **Property name** 	| **Type**     	| **Description**                                                                                                                                    	|
|-------------------	|--------------	|----------------------------------------------------------------------------------------------------------------------------------------------------	|
| value             	| `string`       	| Text to defines the value associated with the input (this is also the value that is sent on submit)                                                	|
| label             	| `string`       	| Text to display as the label of the individual checkbox option                                                                                     	|
| hintExpander      	| `hintExpander` 	| An optional hint expander to display for the individual checkbox option. Information on hintExpander properties can be found in the custom property above 	|

## Accessibility

- Do not preselect checkboxes (there should be no checked attribute by default on the checkbox)
- All checkboxes in a group should have the same name value to associate them as a group of options

<!-- Auto Generated Below -->


## Properties

| Property       | Attribute       | Description                                                                                                                                                                                                                                                                                                                                                                                        | Type                                  | Default     |
| -------------- | --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- | ----------- |
| `caption`      | `caption`       | The text to display as the label                                                                                                                                                                                                                                                                                                                                                                   | `Caption \| string`                   | `undefined` |
| `hintExpander` | `hint-expander` | Used to include the Hint Expander component underneath the Checkbox Legend. This is passed in as an object with key-value pairs. This is optional.                                                                                                                                                                                                                                                 | `HintExpander \| string \| undefined` | `undefined` |
| `hintText`     | `hint-text`     | Define hint text on an element. This is optional.                                                                                                                                                                                                                                                                                                                                                  | `string \| undefined`                 | `undefined` |
| `language`     | `language`      | The language of the component. This is used for translations, and is by default set through event listeners checking for a language property from the header. If none is passed, it will default to English.                                                                                                                                                                                       | `string \| undefined`                 | `'en'`      |
| `name`         | `name`          | The name for the checkboxes.                                                                                                                                                                                                                                                                                                                                                                       | `string`                              | `undefined` |
| `options`      | `options`       | Each property will be passed in through an object in the options array. This can either be passed in as an object directly (if using react), or as a string in HTML. If there are multiple checkboxes in a fieldset, each checkbox will be displayed as an option. In the example below, the options are being passed in as a string and there are two checkboxes to be displayed in the fieldset. | `CheckboxOption[] \| string`          | `undefined` |
| `required`     | `required`      | This is used to determine whether the checkbox is required or not. This prop also gets passed to the InputCaption utility to display either an optional or required flag in the label. If no prop is set, it will default to false (optional).                                                                                                                                                     | `boolean \| undefined`                | `false`     |


## Events

| Event         | Description                                          | Type                         |
| ------------- | ---------------------------------------------------- | ---------------------------- |
| `changeEvent` | Emitted when a keyboard input or mouse event occurs. | `CustomEvent<KeyboardEvent>` |


## Dependencies

### Depends on

- [ontario-hint-text](../ontario-hint-text)
- [ontario-hint-expander](../ontario-hint-expander)

### Graph
```mermaid
graph TD;
  ontario-checkboxes --> ontario-hint-text
  ontario-checkboxes --> ontario-hint-expander
  ontario-hint-expander --> ontario-icon-chevron-up
  ontario-hint-expander --> ontario-icon-chevron-down
  style ontario-checkboxes fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
