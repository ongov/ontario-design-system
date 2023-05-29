# ontario-hint-text

Use hint text to help users understand how to complete fields in a form. When adding hint text, the first choice should always be to display hint text without using a hint expander.

## Usage guidance

Please refer to the [Ontario Design System](https://designsystem.ontario.ca/components/detail/hint-text.html) for current documentation guidance.

## Configuration

Once the component package has been installed (see Ontario Design System Component Library for installation instructions), the hint text component can be added directly into the project's code, and can be customized by updating the properties outlined [here](#properties). Please see the [examples](#examples) below for how to configure the component.

## Examples

Example of a bare-bones hint text component where the user is passing the `hint` directly as the element text content, which will be displayed as the question/statement.

```html
<ontario-hint-text>This is a hint</ontario-hint-text>
```

Example of a hint text that includes the `hint` property, which will override the `This is a hint` text. The `element-id` property has also been added, which is used to establish a relationship between hint text content and elements using the `aria-describedby` attribute.

```html
<ontario-hint-text hint="This hint will override the hint text provided as element content" element-id="hint-293849">
	This is a hint
	<ontario-hint-text></ontario-hint-text
></ontario-hint-text>
```

<!-- Auto Generated Below -->

## Properties

| Property          | Attribute           | Description                                                                                                                                                                       | Type                              | Default     |
| ----------------- | ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- | ----------- |
| `elementId`       | `element-id`        | The unique identifier of the element. This is optional - if no ID is passed, one will be generated.                                                                               | `string \| undefined`             | `undefined` |
| `hint`            | `hint`              | Text to display as the hint text statement. Setting the hint can be done using the host element textContent or through setting this property. This property will take precedence. | `string`                          | `undefined` |
| `hintContentType` | `hint-content-type` | The content type of the hint. If no prop is passed, it will default to a string. If the hint requires multiple lines or HTML, the `hintContentType` prop should be set to `html`. | `"html" \| "string" \| undefined` | `'string'`  |

## Methods

### `getHintTextId() => Promise<string | undefined>`

This method returns the ontario-hint-text id. It is used to make sure the hint text and `aria-describedby` value of other form components match when the internal hint text props are used.

#### Returns

Type: `Promise<string | undefined>`

Promise<string | undefined>

## Dependencies

### Used by

- [ontario-checkboxes](../ontario-checkbox)
- [ontario-dropdown-list](../ontario-dropdown-list)
- [ontario-input](../ontario-input)
- [ontario-radio-buttons](../ontario-radio-buttons)
- [ontario-textarea](../ontario-textarea)

### Graph

```mermaid
graph TD;
  ontario-checkboxes --> ontario-hint-text
  ontario-dropdown-list --> ontario-hint-text
  ontario-input --> ontario-hint-text
  ontario-radio-buttons --> ontario-hint-text
  ontario-textarea --> ontario-hint-text
  style ontario-hint-text fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
