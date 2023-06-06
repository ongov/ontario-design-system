# ontario-button

Use buttons to help the user carry out an important action such as starting a transaction or agreeing to a purchase.

## Usage guidance

Please refer to the [Ontario Design System](https://designsystem.ontario.ca/components/detail/buttons.html) for current documentation guidance.

## Configuration

Once the component package has been installed (see Ontario Design System Component Library for installation instructions), the button component can be added directly into the project's code, and can be customized by updating the properties outlined [here](#properties). Please see the [examples](#examples) below for how to configure the component.

## Examples

Example of a bare-bones button component where the `label` for the button is provided. The default button type will be `secondary`, and the native HTML button type will be `button`.

```html
<ontario-button>Element Content</ontario-button>
```

Example of a button component, which includes the `label`, `elementId`, `htmlType`, `type` and `ariaLabelText` properties.

```html
<ontario-button aria-label-text="Example aria label text" element-id="button-id" html-type="button" type="tertiary"
	>Element Content</ontario-button
>
```

This is another example of a button component, where the user is passing in the label through the `label` property - overriding the 'Element Content' value. The resulting label text will display as `Example`.

```html
<ontario-button label="Example" html-type="submit" type="primary">Element Content</ontario-button>
```

An example of how to pass in an `onclick` function to the button component.

```html
<ontario-button onclick="exampleFunction()">Element Content</ontario-button>
```

## Accessibility

It is important to know when the proper use-case is for a button. Often, the roles of links and buttons can get confused with one another.

- Links will redirect you to a new page or another section/component on a page.
- Buttons will trigger an action, such as opening or closing a modal, or submitting a form.

It can be confusing and frustrating for users to expect a button to trigger an action, and then they are redirected to a new page.

<!-- Auto Generated Below -->

## Properties

| Property        | Attribute         | Description                                                                                                                                                                                                               | Type                                                            | Default       |
| --------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- | ------------- |
| `ariaLabelText` | `aria-label-text` | Provides more context as to what the button interaction is doing. This should only be used for accessibility purposes, if the button interaction requires more description than what the text provides. This is optional. | `string \| undefined`                                           | `undefined`   |
| `elementId`     | `element-id`      | The unique identifier of the button. This is optional - if no ID is passed, one will be generated.                                                                                                                        | `string \| undefined`                                           | `undefined`   |
| `htmlType`      | `html-type`       | The native HTML button type the button should use. If no htmlType is passed, it will default to 'button'.                                                                                                                 | `"button" \| "reset" \| "submit"`                               | `'button'`    |
| `label`         | `label`           | Text to be displayed within the button. This will override the text provided through the host element textContent.                                                                                                        | `string \| undefined`                                           | `undefined`   |
| `type`          | `type`            | The type of button to render. If no type is passed, it will default to 'secondary'.                                                                                                                                       | `"internalThemeDark" \| "primary" \| "secondary" \| "tertiary"` | `'secondary'` |

---

_Built with [StencilJS](https://stenciljs.com/)_
