# ontario-button

Use button to trigger an action

## Usage guidance

Please refer to the [Ontario Design System](https://designsystem.ontario.ca) for current documentation guidance.

## Configuration

Once the component package has been installed (see Ontario Design System Component Library for installation instructions), the button component can be added directly into the project's code, and can be customized by updating the properties outlined [here](#properties). Please see the [examples](#examples) below for how to configure the component. 

## Examples

Example of a bare-bones button component, the user is simply passing in the label for the button. The default button type will be `secondary`, and the native HTML button type will be `button`.

```html
<ontario-button>Element Content</ontario-button>
```

Example of the button component, which includes the properties for the label, the button ID, the native HTML button type, and the type of button. The aria-label property will override the `Element Content`, and the aria-label will instead display `Example`. 

```html
<ontario-button aria-label="Example" buttonId="example" htmlType="button" type="tertiary">Element Content</ontario-button>
```

This is another example of a button component, where the user is passing in the label, and the resulting label text will disaplay as `Example`. 

```html
<ontario-button label="Example" htmlType="submit" type="primary"></ontario-button>
```

An example of how to pass in an `onclick` function. 

```html
<ontario-button onclick="exampleFunction()">Element Content</ontario-button>
```

## Accesibility

It is important to know when the proper use-case is for a button. Often, the roles of links and buttons can get confused with one another.

- Links will redirect you to a new page or another section/component on a page. 
- Buttons will trigger an action, such as opening or closing a modal, or submitting a form. 

It can be confusing and frustrating for users to expect a button to trigger an action, and then they are redirected to a new page. 

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