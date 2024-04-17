import { OntarioButton} from '@ongov/ontario-design-system-component-library-react';

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

<OntarioButton>Element Content</OntarioButton>

Example of a button component, which includes the `label`, `elementId`, `htmlType`, `type` and `ariaLabelText` properties.

```html
<ontario-button aria-label-text="Example aria label text" element-id="button-id" html-type="button" type="tertiary">
	Element Content
</ontario-button>
```

<OntarioButton aria-label-text="Example aria label text" element-id="button-id" html-type="button" type="tertiary">
	Element Content
</OntarioButton>

This is another example of a button component, where the user is passing in the label through the `label` property - overriding the 'Element Content' value. The resulting label text will display as `Example`.

```html
<ontario-button label="Example" html-type="submit" type="primary">Element Content</ontario-button>
```

<OntarioButton label="Example" html-type="submit" type="primary">Element Content</OntarioButton>

An example of how to pass in an `onclick` function to the button component.

```html
<ontario-button onclick="exampleFunction()">Element Content</ontario-button>
```

### Forms

The `ontario-button` supports integration with native HTML `<form>` elements. This element integrates with the underlying browser form API and should work the same as adding an `<input type="submit">`.

To use the `ontario-button` as a submit button set the `htmlType` to `"submit"`. This will wire the `ontario-button` up to the `<form>` it is in and allow it to perform the submit. Internally, the `ontario-button` will fire a `submit` event on its parent `<form>` and trigger the native behaviour of the browser.

```html
<form>
	<!-- Add other form elements, either native or design system elements -->
	<ontario-input
		id="input-1"
		caption="What is your name?"
		required
		name="input-1"
		hint-text="Enter your full name"
	></ontario-input>

	<!-- Submit the form with a submit button -->
	<ontario-button type="primary" html-type="submit">Submit</ontario-button>
</form>
```

Alternatively, adding a `click` listener with a custom handler will allow for any action to be performed with the `ontario-button`. To trigger the submit the `<form>` element can programmatically have the `submit` event dispatched to it.

```html
<form id="form-1">
	<!-- Add other form elements, either native or design system elements -->
	<ontario-input
		id="input-1"
		caption="What is your name?"
		required
		name="input-1"
		hint-text="Enter your full name"
	></ontario-input>

	<!-- Submit the form with a submit button -->
	<ontario-button type="primary">Submit</ontario-button>
</form>

<script>
	window.addEventListener('load', () => {
		// Look up the elements within the document
		const form = document.getElementById('form-1');
		const button = document.getElementById('input-1');

		// Submit the form with an event, if `submit()` is used it can't be
		// prevented using `preventDefault()`
		button.addEventListener('click', () => {
			form?.dispatchEvent(new Event('submit', { cancelable: true }));
		});

		// Perform what ever actions are needed when submitting the form,
		// for example, validation
		form.addEventListener('submit', (event) => {
			// Perform necessary logic, eg. validation

			// Sample: emit form data to the console
			const formData = new FormData(event.target);
			console.log('Form data:', formData);

			// Avoid an actual submission if submission isn't desired (optional)
			event.preventDefault();
		});
	});
</script>
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
