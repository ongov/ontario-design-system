# ontario-radio-button

The ontario-radio-button is an interactive element which allows a user to select a single item from a predefined list of options. 

<br>


## User Interaction Behaviour

User selects a radio button option from a list of radio buttons.

<br>

## Examples

```
<ontario-radio-button name="ontario-radio-button" radio-id="ontario-radio-1" value="Option 1" radio-label="Option 1"></ontario-radio-button>
```

```
<ontario-radio-button name="ontario-radio-button" radio-id="ontario-radio-2" value="Option 2">Option 2</ontario-radio-button>
```

<br>

## Accessibility Considerations

* Do not pre-select radio buttons (there should be no checked attribute by default on the radio button)
* All radio buttons in a group should have the same `name` value to associate them as a group of options

<br>

## Further documentation

See the [Design system radio button guidance](https://designsystem.ontario.ca/components/detail/radio-buttons.html) for current documentation guidelines.

<br>

<!-- Auto Generated Below -->


## Properties

| Property       | Attribute       | Description                                                                                                                                                                                                                                                                                                                                                                                                  | Type                      | Default     |
| -------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------- | ----------- |
| `elementId`    | `element-id`    | Used to used to establish a relationship between radio label and the radio input. This ID must be unique to the radio option.                                                                                                                                                                                                                                                                                | `string`                  | `undefined` |
| `hintExpander` | `hint-expander` | Used to include the Hint Expander component for the Radio Button fieldset. This is passed in as an object with key-value pairs.                                                                                                                                                                                                                                                                              | `HintExpander \| string`  | `undefined` |
| `hintText`     | `hint-text`     | Define hint text for Radio Button fieldset.                                                                                                                                                                                                                                                                                                                                                                  | `string \| undefined`     | `undefined` |
| `isRequired`   | `is-required`   | Determine whether the input field is required. If required, it should be set to true. This can be done by passing in `is-required` to the component.                                                                                                                                                                                                                                                         | `boolean`                 | `undefined` |
| `legend`       | `legend`        | The legend for the Radio Buttons.                                                                                                                                                                                                                                                                                                                                                                            | `string`                  | `undefined` |
| `name`         | `name`          | The name assigned to the radio button. The name value is used to reference form data after a form is submitted. Please note that if you have multiple radio button options, the name must the same for all options in a fieldset.                                                                                                                                                                            | `string`                  | `undefined` |
| `options`      | `options`       | Each property will be passed in through an object in the options array. This can either be passed in as an object directly (if using react), or as a string in HTML. If there are multiple radio buttons in a fieldset, each radio button will be displayed as an option. In the example below, the options are being passed in as a string and there are two radio buttons to be displayed in the fieldset. | `RadioOption[] \| string` | `undefined` |
| `value`        | `value`         | * The radio button content value.                                                                                                                                                                                                                                                                                                                                                                            | `number \| string`        | `undefined` |


## Dependencies

### Depends on

- [ontario-hint-text](../ontario-hint-text)

### Graph
```mermaid
graph TD;
  ontario-radio-buttons --> ontario-hint-text
  style ontario-radio-buttons fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
