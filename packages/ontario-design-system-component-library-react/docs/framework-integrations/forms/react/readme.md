# Using ODS form controls in React

The Ontario Design System form controls work in React, but
they do not behave exactly like React's built-in `<input>` and `<select>`
elements.

## ODS controls compared with React form controls

The main difference is that the ODS form controls are [web components](https://developer.mozilla.org/en-US/docs/Web/API/Web_components) that are styled and functionally managed by the Ontario Design System, while [React's built-in form controls](https://react.dev/reference/react-dom/components#form-components) are native DOM elements. They look similar in JSX, but their value and event APIs are different:

| Area            | ODS form controls                                                                                                                                                  | React built-in controls                                                                                                             |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| Change events   | Use component-specific events such as `onInputOnChange`, `onDropdownOnChange`, and `onCheckboxOnChange`. The changed data is usually in `event.detail`.            | Use React's standard `onChange` handler. Values are normally read from `event.target.value`; checkboxes use `event.target.checked`. |
| Initial values  | Base ODS controls do not support React's `defaultValue` prop. Pass an initial `value`, leave it unchanged for uncontrolled use, and read later changes from a ref. | Text fields, textareas, and selects support `defaultValue`; checkboxes and radios support `defaultChecked`.                         |
| Refs            | A ref points to the ODS custom-element host. Its public `value` property can be read, but the native input inside the shadow DOM is not the ref target.            | A ref points directly to the native `<input>`, `<textarea>`, or `<select>`.                                                         |
| Value shape     | Some controls expose a value that represents a group: checkbox selections are an array, and a date input has one aggregate ISO date value.                         | Native controls expose individual element values. A group of checkboxes or date fields must be combined by the application.         |
| Options         | ODS dropdown and checkbox options are supplied as option objects in React.                                                                                         | Native `<select>` options are JSX `<option>` elements, and checkbox groups are usually rendered as separate inputs.                 |
| Form submission | ODS controls are form-associated custom elements and use their `name` to participate in form submission.                                                           | Native controls participate in form submission automatically when they have a `name`.                                               |

In short, the ODS component-specific event name and `event.detail` should be used rather
than assuming the native React `event.target` contract. The examples below demonstrate the exact event and value handling for each ODS control.

## Controlled and uncontrolled fields

In a **controlled** field, React owns the value. Keep the value in state, pass that
state to the component, and update the state when the component emits a change.
This is useful when the value needs to drive other parts of the page, or when the
form should be validated as the user types.

In an **uncontrolled** field, the component owns the live value. Give it an
initial value, then read the current value from a ref when it is needed, usually
when the form is submitted. This can be simpler for larger forms.

The generated Ontario React components use the web-component event names. Their
change handlers receive a React-wrapped custom event, so changes to the value data can be accessed from
`event.detail`, not `event.target.value`.

The examples below use the form control components from the
`@ongov/ontario-design-system-component-library-react` [npm package](https://www.npmjs.com/package/@ongov/ontario-design-system-component-library-react):

```tsx
import {
	OntarioInput,
	OntarioTextarea,
	OntarioCheckboxes,
	OntarioRadioButtons,
	OntarioDropdownList,
	OntarioDateInput,
} from '@ongov/ontario-design-system-component-library-react';
```

### Text input: controlled

```tsx
import { useState } from 'react';
import { OntarioInput } from '@ongov/ontario-design-system-component-library-react';

export function ControlledTextInput() {
	const [name, setName] = useState('');

	return (
		<OntarioInput
			caption="Name"
			name="name"
			value={name}
			onInputOnChange={(event) => setName(event.detail.value ?? '')}
		/>
	);
}
```

`OntarioTextarea` follows the same pattern:

```tsx
const [comments, setComments] = useState('');

<OntarioTextarea
	caption="Comments"
	name="comments"
	value={comments}
	onInputOnChange={(event) => setComments(event.detail.value ?? '')}
/>;
```

Use `onInputOnInput` instead of `onInputOnChange` when the application needs an
update for every keystroke rather than a change event.

### Text input: uncontrolled, with an initial value

The generated components do not provide React's `defaultValue` prop. For an
uncontrolled field, set its initial `value` and do not keep changing that prop.
Read the live value from the custom-element ref:

```tsx
import { FormEvent, useRef, useState } from 'react';
import { OntarioInput } from '@ongov/ontario-design-system-component-library-react';

export function UncontrolledTextInput() {
	const inputRef = useRef<HTMLOntarioInputElement>(null);
	const [submittedName, setSubmittedName] = useState('');
	const [hasBeenReset, setHasBeenReset] = useState(false);

	const submit = (event: FormEvent) => {
		event.preventDefault();
		setSubmittedName(inputRef.current?.value ?? '');
	};

	const reset = (event: FormEvent) => {
		event.preventDefault();
		setHasBeenReset(true);
	};

	return (
		<form onSubmit={submit} onReset={reset}>
			<OntarioInput ref={inputRef} caption="Name" name="name" value="Default value" />
			<button type="submit">Read current value</button>
			<p>Current value: {submittedName}</p>
			<button type="reset">Reset to default</button>
			<p>Form has been reset to default: {hasBeenReset ? 'Yes' : 'No'}</p>
		</form>
	);
}
```

The same ref approach works with `OntarioTextarea`, `OntarioDropdownList`, and
`OntarioDateInput`. A component ref points to the Ontario custom element, not the
native `<input>` or `<select>` inside its shadow DOM.

## Dropdown lists

Dropdown options are objects in React. Use `value` for a controlled dropdown and
read the selected string from `event.detail.value`:

```tsx
const [province, setProvince] = useState('ontario');

<OntarioDropdownList
	caption="Province"
	name="province"
	options={[
		{ value: 'ontario', label: 'Ontario' },
		{ value: 'quebec', label: 'Quebec' },
	]}
	value={province}
	onDropdownOnChange={(event) => setProvince(event.detail.value ?? '')}
/>;
```

For an initial selection without controlling later changes, mark one option as
`selected` and omit the `value` prop:

```tsx
<OntarioDropdownList
	caption="Province"
	name="province"
	options={[
		{ value: 'ontario', label: 'Ontario', selected: true },
		{ value: 'quebec', label: 'Quebec' },
	]}
/>
```

`isEmptyStartOption` is useful when the user must actively choose an option. A
selected option or a supplied `value` takes precedence over the empty start
option.

## Date input

`OntarioDateInput` is a group of day, month, and year fields with one aggregate
`value`. Set a controlled value using an ISO date (`YYYY-MM-DD`) or a full ISO
timestamp:

```tsx
const dateInputRef = useRef<HTMLOntarioDateInputElement>(null);
const [date, setDate] = useState('2026-09-17');

<OntarioDateInput
	ref={dateInputRef}
	caption="Date of birth"
	value={date}
	onInputOnChange={(event) => {
		// event.detail.value is the value of the field that changed.
		// Read the normalised aggregate value from the component ref.
		setDate(dateInputRef.current?.value ?? '');
	}}
/>;
```

The date component emits `inputOnChange` with `{ value, fieldType }`, where
`value` is the changed day, month, or year field—not the complete date. Once the
date is valid, the component’s aggregate `value` is normalised to a UTC ISO
timestamp such as `2026-09-17T00:00:00.000Z`. This distinction is important
when saving the value or updating controlled state. `inputOnInput` can be used
for updates while the user is still entering the date.

An initial date can be supplied without controlling subsequent edits:

```tsx
<OntarioDateInput caption="Start date" value="2026-09-17" />
```

## Checkbox groups

Checkboxes use an array of selected option values. The change event also includes
`checked`, which tells you whether the option that was just changed is now
checked:

```tsx
const [interests, setInterests] = useState<string[]>([]);

<OntarioCheckboxes
	caption="Interests"
	name="interests"
	options={[
		{ value: 'news', label: 'News' },
		{ value: 'events', label: 'Events' },
	]}
	value={interests}
	onCheckboxOnChange={(event) => {
		const changedValue = event.detail.value;
		if (!changedValue) return;

		setInterests((current) =>
			event.detail.checked
				? [...new Set([...current, changedValue])]
				: current.filter((value) => value !== changedValue),
		);
	}}
/>;
```

To provide initial checked boxes without controlling the group, set
`checked: true` on the relevant options and omit `value`:

```tsx
<OntarioCheckboxes
	caption="Interests"
	name="interests"
	options={[
		{ value: 'news', label: 'News', checked: true },
		{ value: 'events', label: 'Events' },
	]}
/>
```

The group’s `value` is a `string[]` when passed as a React property. The
JSON-string form (for example, `'["news"]'`) is for plain HTML attributes.

## Radio button groups

Radio buttons use one selected string value. In controlled mode, keep that value
in React state and update it from `event.detail.value`:

```tsx
const [contactMethod, setContactMethod] = useState('email');

<OntarioRadioButtons
	caption="Preferred contact method"
	name="contact-method"
	options={[
		{ value: 'email', label: 'Email' },
		{ value: 'phone', label: 'Phone' },
	]}
	value={contactMethod}
	onRadioOnChange={(event) => setContactMethod(event.detail.value ?? '')}
/>;
```

For an initial selection without controlling later changes, set `checked: true`
on one option and omit the group’s `value` prop:

```tsx
<OntarioRadioButtons
	caption="Preferred contact method"
	name="contact-method"
	options={[
		{ value: 'email', label: 'Email', checked: true },
		{ value: 'phone', label: 'Phone' },
	]}
/>
```

Only one radio option can be selected at a time. If both `value` and an option
with `checked: true` are provided, the group’s `value` takes precedence.

## Practical notes

- Use the component’s `name` when the value must be included in a form
  submission. The controls are form-associated custom elements.
- The base components do not support React's `defaultValue` prop. To set an
  initial value without controlling the field, pass the initial value through
  `value`, then leave that prop unchanged and read later changes from a ref.
- Do not mix controlled and uncontrolled usage. In practice, choose either a
  continually updated `value` prop or an initial value/ref approach.
- For generated components, use `onInputOnChange`, `onDropdownOnChange`, and
  `onCheckboxOnChange` rather than assuming React’s `onChange` prop is available.
- `event.detail.value` may be optional in the TypeScript event type, so handle an
  empty value when clearing a field.
- Options are passed as JavaScript objects in React. Do not JSON-stringify them
  unless you are deliberately using an HTML attribute or another non-React
  integration.
