# ontario-checkbox



<!-- Auto Generated Below -->


## Properties

| Property       | Attribute    | Description                                                                                                            | Type                         | Default     |
| -------------- | ------------ | ---------------------------------------------------------------------------------------------------------------------- | ---------------------------- | ----------- |
| `elementId`    | `element-id` | The ID for the checkbox                                                                                                | `string \| undefined`        | `undefined` |
| `hintExpander` | --           | Used to define whether the hint expander component is required or not. If required, the value passed should be 'true'. | `HintExpander \| undefined`  | `undefined` |
| `hintText`     | --           | Used to define whether the hint text component is required or not. If required, the value passed should be 'true'.     | `Hint \| undefined`          | `undefined` |
| `label`        | `label`      | The label text for the checkbox                                                                                        | `string`                     | `undefined` |
| `legend`       | `legend`     | The legend for the checkbox                                                                                            | `string`                     | `undefined` |
| `name`         | `name`       | The name for the checkbox (note that to group checkboxes to the same question, the name must be the same)              | `string`                     | `undefined` |
| `options`      | `options`    | If there are multiple checkboxes, display each checkbox as an option                                                   | `CheckboxOption[] \| string` | `undefined` |
| `required`     | `required`   | Used to define whether the input field is required or not. If required, the value passed should be 'required'.         | `boolean \| undefined`       | `false`     |
| `value`        | `value`      | The checkbox content value                                                                                             | `string`                     | `undefined` |


## Events

| Event         | Description                                          | Type               |
| ------------- | ---------------------------------------------------- | ------------------ |
| `changeEvent` | Emitted when a keyboard input or mouse event occurs. | `CustomEvent<any>` |


## Dependencies

### Depends on

- [ontario-hint-text](../ontario-hint-text)
- [ontario-hint-expander](../ontario-hint-expander)

### Graph
```mermaid
graph TD;
  ontario-checkbox --> ontario-hint-text
  ontario-checkbox --> ontario-hint-expander
  ontario-hint-expander --> ontario-icon-chevron-up
  ontario-hint-expander --> ontario-icon-chevron-down
  style ontario-checkbox fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
