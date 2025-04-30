import { OntarioTextarea } from '@ongov/ontario-design-system-component-library-react';

# ontario-textarea

Use a text area when you want the user to enter **more than** a single line of information.

## Usage guidance

Please refer to the [Ontario Design System](https://designsystem.ontario.ca/components/detail/text-areas.html) for current documentation guidance.

## Configuration

Once the component package has been installed (see Ontario Design System Component Library for installation instructions), the textarea component can be added directly into the project's code, and can be customized by updating the properties outlined [here](#properties). Additional information on custom types for header properties are outlined [here](#custom-property-types). Please see the [examples](#examples) below for how to configure the component.

## Examples

Example of a bare-bones textarea component where the user is passing the `name` which is the value used to reference form data after a form is submitted. The `elementId` is also being passed in as the unique identifier of the textarea.

```html
<ontario-textarea caption="Comments" name="comments" element-id="form-comments"></ontario-textarea>
```

<OntarioTextarea caption="Comments" name="comments" element-id="form-comments"></OntarioTextarea>

To mark a textarea as required, add the `required` attribute to the component.

```html
<ontario-textarea
	caption="Comments"
	name="comments"
	element-id="form-comments"
	required="true"
	onBlur="exampleFunction()"
></ontario-textarea>
```

<OntarioTextarea caption="Comments" name="comments" element-id="form-comments" required="true"></OntarioTextarea>

### Forms

The `ontario-textarea` supports integration with native HTML `<form>` elements. This element integrates with the underlying browser form API and should work the same as a `<textarea>`.

```html
<form>
	<!-- Add an ontario-textarea -->
	<ontario-textarea name="textarea-1" caption="Text area"></ontario-textarea>

	<!-- Submit the form with a submit button -->
	<ontario-button type="primary" html-type="submit">Submit</ontario-button>
</form>
```

Remember to set the `name` attribute as this is used to identify the field when submitting the form.

## Event model

Each event emitted by the component uses the [`CustomEvent`](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent) type to emit a custom event to help communicate what the component is doing. To access the data emitted by the component within the `CustomEvent` type use the [CustomEvent.detail](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/detail) property.

Eg. To access the value of any input entered into this component from the `inputOnInput` event, use the following code to wire up to listen for the the `inputOnInput` event.

```html
<ontario-textarea id="textarea-1" name="textarea-1" caption="Text area"></ontario-textarea>
<script>
	// Note: this waits for the page and components to load before
	// locating the component.
	window.onload = () => {
		const textarea1 = document.getElementById('textarea-1');
		textarea1.addEventListener('inputOnInput', (event) => {
			console.log('OnInput detail:', event.detail);
		});
	};
</script>
```

If the letter `i` is typed into `textarea-1`, the value of `event.detail` is the object emitted along with the `inputOnInput` event.

```js
{ id: "910b4a52-c005-4fb6-9b6e-fd7370a00b25", value: "i", inputType: "insertText" }
```

See the [Events](#events) table to learn more about the available custom events from the component and what the type of `CustomEvent.detail` will be.

### Native `input` and `change` events

The component uses a ShadowDOM to maintain encapsulation, however, this changes how the events flow from the inside of the component to the outside in the DOM.

Events, such as the native `input` event, deliver data from inside of the component and flow up the event stack as expected.

This isn't the case for the native `change` event, this event hits the ShadowDOM boundary and stops propagating. The implication of this is that it can't be listened for outside the component. To attempt to overcome this, a synthetic change event is generated and emitted. The original `change` event is available via the `detail` property on the emitted event.

When using libraries that listen for events, this process may not work with them and a workaround might be required depending on the framework or library in use.

## Custom property types

### caption

The `caption` property is used to render the legend for the ontario-textarea. It can be passed either a string or an object. If no `captionType` needs to be specified, it can be passed as a string.

```html
caption='{ "captionText": "Textarea label", "captionType": "default" }'
```

| Property name | Type                               | Default   | Description                                                                                                                                          |
| ------------- | ---------------------------------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `captionText` | `string`                           |           | Text to display as the radio textarea question                                                                                                       |
| `captionType` | `"default" \| "large"\| "heading"` | `default` | The type of legend to display for the textarea question. This is optional, and if no information is provided, it will default to the `default` type. |

### hintExpander

The `hintExpander` property is used to include the Hint Expander component underneath the input label. This is passed in as an object with key-value pairs.

<!-- prettier-ignore -->
```html
hintExpander='{ "hint": "This is the hint expander title", "content": "This is the hint expander content - it is only visible when the hint expander title (hint) is toggled" }'
```

| Property name | Type     | Description                                                                                                     |
| ------------- | -------- | --------------------------------------------------------------------------------------------------------------- |
| `hint`        | `string` | Text to display as the hint expander label/title. When toggled, it will display/hide the `hintExpander` content |
| `content`     | `string` | Text to display as the content of the hint expander                                                             |

## Accessibility

- An `element-id` attribute is necessary to allow the textarea to be associated with a label element
- A `name` attribute needs to be set to be submitted to the server when the form is submitted.

<!-- Auto Generated Below -->

## Properties

| Property         | Attribute          | Description                                                                                                                                                                                                                                    | Type                                    | Default     |
| ---------------- | ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- | ----------- |
| `caption`        | `caption`          | The text to display as the textarea label.                                                                                                                                                                                                     | `Caption \| string`                     | `undefined` |
| `customOnBlur`   | `custom-on-blur`   | Used to add a custom function to the textarea onBlur event.                                                                                                                                                                                    | `((event: Event) => void) \| undefined` | `undefined` |
| `customOnChange` | `custom-on-change` | Used to add a custom function to the textarea onChange event.                                                                                                                                                                                  | `((event: Event) => void) \| undefined` | `undefined` |
| `customOnFocus`  | `custom-on-focus`  | Used to add a custom function to the textarea onFocus event.                                                                                                                                                                                   | `((event: Event) => void) \| undefined` | `undefined` |
| `customOnInput`  | `custom-on-input`  | Used to add a custom function to the textarea onInput event.                                                                                                                                                                                   | `((event: Event) => void) \| undefined` | `undefined` |
| `elementId`      | `element-id`       | The unique identifier of the textarea. This is optional - if no ID is passed, one will be generated.                                                                                                                                           | `string \| undefined`                   | `undefined` |
| `errorMessage`   | `error-message`    | Set this to display an error message                                                                                                                                                                                                           | `string \| undefined`                   | `undefined` |
| `hintExpander`   | `hint-expander`    | Used to include the ontario-hint-expander component for the textarea component. This is passed in as an object with key-value pairs. This is optional.                                                                                         | `HintExpander \| string \| undefined`   | `undefined` |
| `hintText`       | `hint-text`        | Used to include the ontario-hint-text component for the textarea. This is optional.                                                                                                                                                            | `Hint \| string \| undefined`           | `undefined` |
| `language`       | `language`         | The language of the component. This is used for translations, and is by default set through event listeners checking for a language property from the header. If no language is passed, it will default to English.                            | `"en" \| "fr" \| undefined`             | `undefined` |
| `name`           | `name`             | The name assigned to the textarea. The name value is used to reference form data after a form is submitted.                                                                                                                                    | `string`                                | `undefined` |
| `required`       | `required`         | This is used to determine whether the textarea is required or not. This prop also gets passed to the InputCaption utility to display either an optional or required flag in the label. If no prop is set, it will default to false (optional). | `boolean \| undefined`                  | `false`     |
| `value`          | `value`            | The textarea content value.                                                                                                                                                                                                                    | `string \| undefined`                   | `undefined` |

## Events

| Event                | Description                                                                         | Type                                                                        |
| -------------------- | ----------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| `inputErrorOccurred` | Emitted when an error message is reported to the component.                         | `CustomEvent<{ inputId: string; errorMessage: string; }>`                   |
| `inputOnBlur`        | Emitted when a keyboard input event occurs when an input has lost focus.            | `CustomEvent<InputInteractionEvent & { focused: boolean; }>`                |
| `inputOnChange`      | Emitted when a keyboard input or mouse event occurs when an input has been changed. | `CustomEvent<{ id?: string \| undefined; value?: string \| undefined; }>`   |
| `inputOnFocus`       | Emitted when a keyboard input event occurs when an input has gained focus.          | `CustomEvent<InputInteractionEvent & { focused: boolean; }>`                |
| `inputOnInput`       | Emitted when a input event occurs when an input has been changed.                   | `CustomEvent<InputInteractionEvent & { inputType?: string \| undefined; }>` |

## Dependencies

### Depends on

- [ontario-hint-text](../ontario-hint-text)
- [ontario-hint-expander](../ontario-hint-expander)
- [ontario-icon-alert-error](../ontario-icon)

### Graph

```mermaid
graph TD;
  ontario-textarea --> ontario-hint-text
  ontario-textarea --> ontario-hint-expander
  ontario-textarea --> ontario-icon-alert-error
  ontario-hint-expander --> ontario-icon-chevron-up
  ontario-hint-expander --> ontario-icon-chevron-down
  style ontario-textarea fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
