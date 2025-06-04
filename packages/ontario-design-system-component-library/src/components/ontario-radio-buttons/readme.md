import { OntarioRadioButtons } from '@ongov/ontario-design-system-component-library-react';

# ontario-radio-buttons

Use radio buttons when you want the user to select only one option from a list.

## User guidance

Please refer to the [Ontario Design System](https://designsystem.ontario.ca/components/detail/radio-buttons.html) for current documentation guidance.

## Configuration

Once the component package has been installed (see Ontario Design System Component Library for installation instructions), the radio button component can be added directly into the project's code, and can be customized by updating the properties outlined [here](#properties). Additional information on custom types for header properties are outlined [here](#custom-property-types). Please see the [examples](#examples) below for how to configure the component.

## Examples

Example of a bare-bones radio button component, the legend for the radio button fieldset is provided, as well as 2 radio options.

```html
<ontario-radio-buttons
	caption="Radio legend"
	name="radios"
	options='[
		{
			"value": "radio-option-1",
			"elementId": "radio-1",
			"label": "Radio option 1 label"
		},
		{
			"value": "radio-option-2",
			"elementId": "radio-2",
			"label": "Radio option 2 label"
		}
  ]'
>
</ontario-radio-buttons>
```

<div>
	<OntarioRadioButtons
		caption="Radio legend"
		name="radios"
		options='[
			{
				"value": "radio-option-1",
				"elementId": "radio-1",
				"label": "Radio option 1 label"
			},
			{
				"value": "radio-option-2",
				"elementId": "radio-2",
				"label": "Radio option 2 label"
			}
	]'>
	</OntarioRadioButtons>
</div>

Example of a radio button component with multiple options, a hint text and hint expander for the entire radio group, and a hint expander on individual options. It also has the `required` property set to `true`.

```html
<ontario-radio-buttons
	caption='{
		"captionText": "Radio legend",
		"captionType": "large" 
	}'
	name="radios"
	hint-text="Hint text for the radio button group."
	required="true"
	options='[
		{
			"value": "radio-option-1",
			"elementId": "radio-1",
			"label": "Radio option 1 label"
		},
		{
			"value": "radio-option-2",
			"elementId": "radio-2",
			"label": "Radio option 2 label",
			"hintExpander": {
				"hint": "Hint expander for radio option 2",
				"content": "Example hint expander content for radio option 2."
			}
		},
		{
			"value": "radio-option-3",
			"elementId": "radio-3",
			"label": "Radio option 3 label",
			"hintExpander": {
				"hint": "Hint expander for radio option 3",
				"content": "Example hint expander content for radio option 3."
			}
		},
		{
			"value": "radio-option-4",
			"elementId": "radio-4",
			"label": "Radio option 4 label"
		}
	]'
	hint-expander='{
		"hint": "Hint expander for the radio button group",
	    "content": "Example hint expander content for the radio button group."
	}'
>
</ontario-radio-buttons>
```

<div>
	<OntarioRadioButtons
		caption='{
			"captionText": "Radio legend",
			"captionType": "large" 
		}'
		name="radios"
		hint-text="Hint text for the radio button group."
		required="true"
		options='[
			{
				"value": "radio-option-1",
				"elementId": "radio-1",
				"label": "Radio option 1 label"
			},
			{
				"value": "radio-option-2",
				"elementId": "radio-2",
				"label": "Radio option 2 label",
				"hintExpander": {
					"hint": "Hint expander for radio option 2",
					"content": "Example hint expander content for radio option 2."
				}
			},
			{
				"value": "radio-option-3",
				"elementId": "radio-3",
				"label": "Radio option 3 label",
				"hintExpander": {
					"hint": "Hint expander for radio option 3",
					"content": "Example hint expander content for radio option 3."
				}
			},
			{
				"value": "radio-option-4",
				"elementId": "radio-4",
				"label": "Radio option 4 label"
			}
		]'
		hint-expander='{
			"hint": "Hint expander for the radio button group",
			"content": "Example hint expander content for the radio button group."
		}'> 
	</OntarioRadioButtons>
</div>

### Forms

The `ontario-radio-buttons` supports integration with native HTML `<form>` elements. This element integrates with the underlying browser form API and should work the same as a a group of `<input type="radio">` elements.

```html
<form>
	<!-- Add ontario-radio-buttons -->
	<ontario-radio-buttons
		name="radio-buttons-1"
		caption="Radio buttons"
		options='[
			{
				"value": "radio-option-1",
				"elementId": "radio-1",
				"label": "Radio option 1 label",
			},
			{
				"value": "radio-option-2",
				"elementId": "radio-2",
				"label": "Radio option 2 label"
			},
			{
				"value": "radio-option-3",
				"elementId": "radio-3",
				"label": "Radio option 3 label"
			}
		]'
	>
	</ontario-radio-buttons>

	<!-- Submit the form with a submit button -->
	<ontario-button type="primary" html-type="submit">Submit</ontario-button>
</form>
```

Remember to set the `name` attribute as this is used to identify the field when submitting the form.

## Event model

Each event emitted by the component uses the [`CustomEvent`](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent) type to emit a custom event to help communicate what the component is doing. To access the data emitted by the component within the `CustomEvent` type use the [CustomEvent.detail](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/detail) property.

Eg. To access the value of any change made to this component from the `radioOnChange` event, use the following code to wire up to listen for the the `radioOnChange` event.

```html
<ontario-radio-buttons
	id="radio-buttons-1"
	name="radio-buttons-1"
	caption="Radio buttons"
	options='[
		{
			"value": "radio-option-1",
			"elementId": "radio-1",
			"label": "Radio option 1 label"
		},
		{
			"value": "radio-option-2",
			"elementId": "radio-2",
			"label": "Radio option 2 label"
		}
	]'
>
</ontario-radio-buttons>
<script>
	// Note: this waits for the page and components to load before
	// locating the component.
	window.onload = () => {
		const radioButtons1 = document.getElementById('radio-buttons-1');
		radioButtons1.addEventListener('radioOnChange', (event) => {
			console.log('OnChange detail:', event.detail);
		});
	};
</script>
```

If the first radio button is selected within `radio-buttons-1`, the value of `event.detail` is the object emitted along with the `radioOnChange` event.

```js
{ checked: true, id: "radio-1", value: "radio-option-1" }
```

See the [Events](#events) table to learn more about the available custom events from the component and what the type of `CustomEvent.detail` will be.

### Native `change` events

The component uses a ShadowDOM to maintain encapsulation, however, this changes how the events flow from the inside of the component to the outside in the DOM.

The native `change` event hits the ShadowDOM boundary and stops propagating. The implication of this is that it can't be listened for outside the component. To attempt to overcome this, a synthetic change event is generated and emitted. The original `change` event is available via the `detail` property on the emitted event.

When using libraries that listen for events, this process may not work with them and a workaround might be required depending on the framework or library in use.

## Custom property types

### caption

The `caption` property is used to render the legend for the `ontario-radio-buttons`. It can be passed either a string or an object. If no `captionType` needs to be specified, it can be passed as a string.

```html
caption='{ "captionText": "Radio button legend", "captionType": "default" }'
```

| Property name | Type                               | Description                                                                                                                                              |
| ------------- | ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `captionText` | `string`                           | Text to display as the radio button question                                                                                                             |
| `captionType` | `"default" \| "large"\| "heading"` | The type of legend to display for the radio button question. This is optional, and if no information is provided, it will default to the `default` type. |

### hintExpander

The `hintExpander` property is used to include the Hint Expander component underneath the radio button legend. This is passed in as an object with key-value pairs.

```html
hintExpander='{ "hint": "This is the hint expander title", "content": "This is the hint expander content - it is only
visible when the hint expander title (hint) is toggled" }'
```

| Property name | Type     | Description                                                                                                     |
| ------------- | -------- | --------------------------------------------------------------------------------------------------------------- |
| `hint`        | `string` | Text to display as the hint expander label/title. When toggled, it will display/hide the `hintExpander` content |
| `content`     | `string` | Text to display as the content of the hint expander                                                             |

### options

| Property name  | Type           | Description                                                                                                                                                                       |
| -------------- | -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `value`        | `string`       | Text to defines the value associated with the radio button (this is also the value that is sent on submit)                                                                        |
| `label`        | `string`       | Text to display as the label of the individual radio option                                                                                                                       |
| `elementId`    | `string`       | Text used as the ID for the radio button option. This is used to establish a relationship between radio button labels and the radio input. It must be unique to the radio option. |
| `hintExpander` | `hintExpander` | An optional hint expander to display for the individual radio button option. Information on `hintExpander` properties can be found in the custom property above                   |

## Accessibility

- Do not pre-select radio buttons (there should be no checked attribute by default on the radio button)

<!-- Auto Generated Below -->

## Properties

| Property         | Attribute          | Description                                                                                                                                                                                                                                                                                                                                                                                                                                    | Type                                    | Default     |
| ---------------- | ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- | ----------- |
| `caption`        | `caption`          | The text to display for the radio button legend.                                                                                                                                                                                                                                                                                                                                                                                               | `Caption \| string`                     | `undefined` |
| `customOnBlur`   | `custom-on-blur`   | Used to add a custom function to the radio input onBlur event.                                                                                                                                                                                                                                                                                                                                                                                 | `((event: Event) => void) \| undefined` | `undefined` |
| `customOnChange` | `custom-on-change` | Used to add a custom function to the radio input onChange event.                                                                                                                                                                                                                                                                                                                                                                               | `((event: Event) => void) \| undefined` | `undefined` |
| `customOnFocus`  | `custom-on-focus`  | Used to add a custom function to the radio input onFocus event.                                                                                                                                                                                                                                                                                                                                                                                | `((event: Event) => void) \| undefined` | `undefined` |
| `errorMessage`   | `error-message`    | Set this to display an error message                                                                                                                                                                                                                                                                                                                                                                                                           | `string \| undefined`                   | `undefined` |
| `hintExpander`   | `hint-expander`    | Used to include the ontario-hint-expander component for the radio button group. This is passed in as an object with key-value pairs. This is optional.                                                                                                                                                                                                                                                                                         | `HintExpander \| string \| undefined`   | `undefined` |
| `hintText`       | `hint-text`        | Used to include the ontario-hint-text component for radio button group. This is optional.                                                                                                                                                                                                                                                                                                                                                      | `Hint \| string \| undefined`           | `undefined` |
| `language`       | `language`         | The language of the component. This is used for translations, and is by default set through event listeners checking for a language property from the header. If no language is passed, it will default to English.                                                                                                                                                                                                                            | `"en" \| "fr" \| undefined`             | `undefined` |
| `name`           | `name`             | The name assigned to the radio button. The name value is used to reference form data after a form is submitted.                                                                                                                                                                                                                                                                                                                                | `string`                                | `undefined` |
| `options`        | `options`          | The options for the radio button group. Each property will be passed in through an object in the options array. This can either be passed in as an object directly (if using react), or as a string in HTML. If there are multiple radio buttons in a group, each radio button will be displayed as an option. In the example below, the options are being passed in as a string and there are two radio buttons to be displayed in the group. | `RadioOption[] \| string`               | `undefined` |
| `required`       | `required`         | This is used to determine whether the radio button is required or not. This prop also gets passed to the InputCaption utility to display either an optional or required flag in the label. If no prop is set, it will default to false (optional).                                                                                                                                                                                             | `boolean \| undefined`                  | `false`     |

## Events

| Event                | Description                                                                               | Type                                                         |
| -------------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| `inputErrorOccurred` | Emitted when an error message is reported to the component.                               | `CustomEvent<{ errorMessage: string; }>`                     |
| `radioOnBlur`        | Emitted when a keyboard input event occurs when a radio option has lost focus.            | `CustomEvent<InputInteractionEvent & { focused: boolean; }>` |
| `radioOnChange`      | Emitted when a keyboard input or mouse event occurs when a radio option has been changed. | `CustomEvent<InputInteractionEvent & { checked: boolean; }>` |
| `radioOnFocus`       | Emitted when a keyboard input event occurs when a radio option has gained focus.          | `CustomEvent<InputInteractionEvent & { focused: boolean; }>` |

## Dependencies

### Depends on

- [ontario-hint-text](../ontario-hint-text)
- [ontario-hint-expander](../ontario-hint-expander)
- [ontario-icon-alert-error](../ontario-icon)

### Graph

```mermaid
graph TD;
  ontario-radio-buttons --> ontario-hint-text
  ontario-radio-buttons --> ontario-hint-expander
  ontario-radio-buttons --> ontario-icon-alert-error
  ontario-hint-expander --> ontario-icon-chevron-up
  ontario-hint-expander --> ontario-icon-chevron-down
  style ontario-radio-buttons fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
