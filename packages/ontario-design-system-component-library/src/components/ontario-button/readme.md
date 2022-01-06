# ontario-button

Use button to trigger an action

## Usage guidance

Please refer to the [Ontario Design System](https://designsystem.ontario.ca) for guidance.

## Examples

```
<ontario-button>Element Content</ontario-button>
```

```
<ontario-button aria-label="Example" buttonId="example" htmlType="button" type="tertiary">Element Content</ontario-button>
```

```
<ontario-button label="Example" htmlType="submit" type="primary"></ontario-button>
```

```
<ontario-button onclick="exampleFunction()">Element Content</ontario-button>
```

<!-- Auto Generated Below -->


## Properties

| Property    | Attribute    | Description                                                                                               | Type                                                  | Default       |
| ----------- | ------------ | --------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- | ------------- |
| `ariaLabel` | `aria-label` | Overrides the default value of the `aria-label` HTML attribute.                                           | `string \| undefined`                                 | `undefined`   |
| `buttonId`  | `button-id`  | The unique identifier of the button                                                                       | `string \| undefined`                                 | `undefined`   |
| `htmlType`  | `html-type`  | The native HTML button type the button should use.                                                        | `"button" \| "reset" \| "submit" \| undefined`        | `'button'`    |
| `label`     | `label`      | Text to be displayed within the button. This will override the text provided through the Element Content. | `string \| undefined`                                 | `undefined`   |
| `type`      | `type`       | The type of button to render.                                                                             | `"primary" \| "secondary" \| "tertiary" \| undefined` | `'secondary'` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
