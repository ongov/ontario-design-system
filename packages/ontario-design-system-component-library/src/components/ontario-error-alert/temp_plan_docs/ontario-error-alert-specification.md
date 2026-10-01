# `ontario-error-alert` component design specification

## Component Name

`ontario-error-alert`

## Component Design Specification

This component defines the Ontario Design System inline error pattern as a standalone public web component for field-level form validation. It displays an error icon and a concise, specific message that explains what went wrong and how the user can correct it.

The design, markup, API, behaviour, and accessibility requirements in this specification are the source of truth for `ontario-error-alert`. They are not constrained by or required to mirror any other internal implementation. The component is designed to be associated with a source control using `controlId`, while the error itself is identified by `errorId` for the `aria-describedby` relationship.

The component is text-only. Error content is supplied through the `message` property; slotted content is not supported.

## Description

Use `ontario-error-alert` when validation identifies a specific problem with a form control or control group, including:

- a required field left blank;
- data entered in the wrong format;
- a required checkbox group left incomplete;
- a required radio group left incomplete.

Inline error messages should be clear, concise, specific, positive, and action-oriented. They should identify the problem and provide direction for correction.

Place the error directly above the invalid control or group and after any associated hint text.

Do not use this component for:

- general status or feedback unrelated to a specific form error;
- a page-level error summary;
- tooltip-only error messaging;
- browser-native HTML5 validation messaging as the design-system error presentation.

A page-level error summary is a separate pattern. When a submitted form contains errors, the consuming application should use the error-summary pattern together with the relevant inline errors where appropriate.

## Variations

### Inline error

An error associated with one control, such as a text input, textarea, or dropdown. The control references the error element with `aria-describedby`.

### Grouped field error

An error associated with a checkbox or radio group. The group container, normally a `fieldset`, references the error element with `aria-describedby`. One group-level message should be shown rather than repeating the same message for every option.

The visual treatment is the same for both variations: an error icon followed by readable error text.

## Sub-variants

Document the component in these contexts:

- text input with hint text;
- text input without hint text;
- textarea;
- dropdown;
- checkbox group;
- radio group.

The component's presentation does not change between contexts. The consuming control or group determines the appropriate `aria-describedby` target and `aria-invalid` state.

## API

### Properties

| Property    | Attribute    | Type     |    Required | Description                                                                                                                                                                            |
| ----------- | ------------ | -------- | ----------: | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `message`   | `message`    | `string` |         Yes | The plain-text validation message shown to the user. It should state the problem and explain the corrective action.                                                                    |
| `errorId`   | `error-id`   | `string` | Recommended | The unique ID applied to the error container so a related control or group can reference it with `aria-describedby`.                                                                   |
| `controlId` | `control-id` | `string` | Recommended | The `id` of the related control or grouped control this message belongs to. This acts as a relationship hint for the consuming implementation and should match the associated control. |

Example:

```html
<ontario-error-alert
	error-id="first-name-error"
	control-id="first-name"
	message="Enter your first name."
></ontario-error-alert>
```

### Content and validation rules

- The component accepts a scalar text message only.
- Slots are not supported.
- Rich HTML, links, and nested interactive content are not part of this component's API.
- A missing, empty, or otherwise invalid `message` should produce a clear console warning during development.
- The component must not substitute a generic fallback error message.
- The final empty-message rendering behaviour must ensure that an empty alert is not presented as a useful validation message to assistive technology.

The consuming application owns validation rules, validation timing, `aria-invalid`, and whether the component is rendered or removed after the problem is corrected.

## Data Model

The component has no list or JSON data model. It contains only scalar presentation and association values:

- error message text;
- error container ID and the source control relationship.

## Events

### Emitted

None.

The component is non-interactive and does not emit validation or correction events.

### Consumed

None by default.

Validation events and form-state changes are owned by the consuming form or control component.

## User Interaction Behaviour

The component itself is non-interactive.

Expected behaviour:

- it appears when the consuming validation logic identifies an error;
- it remains visible while the error state remains unresolved;
- it is announced when rendered through `role="alert"`;
- it is associated with the invalid control or group through `aria-describedby`;
- it does not change the value of the associated control;
- it does not set or remove `aria-invalid` on another element;
- it is removed or updated by the consuming application when the error is corrected.

Validation timing should follow Ontario Design System guidance. Live validation should be used only where it adds value; pre-submission and server-side validation may also produce the inline message. Server-side validation remains required for submitted forms.

## Accessibility

The component must:

- render the error container with `role="alert"`;
- include a visible error icon and readable text;
- expose a stable error ID when `errorId` is provided;
- support association from an individual control through `aria-describedby`;
- support association from a checkbox or radio group through `aria-describedby`;
- work when hint and error IDs are both present;
- be placed directly above the invalid control or group and after hint text;
- avoid relying on colour alone to communicate the error.

The consuming control or group should use `aria-invalid="true"` while invalid.

### Individual control with hint and error

```html
<label for="email">Email address</label>
<p id="email-hint">Use your work email address.</p>

<ontario-error-alert
	error-id="email-error"
	message="Enter an email address in the format name@example.com."
></ontario-error-alert>

<input id="email" type="email" aria-invalid="true" aria-describedby="email-hint email-error" />
```

### Grouped field

```html
<fieldset aria-invalid="true" aria-describedby="contact-method-error">
	<legend>Preferred contact method</legend>

	<ontario-error-alert
		error-id="contact-method-error"
		message="Select a preferred contact method."
	></ontario-error-alert>

	<!-- checkbox or radio options -->
</fieldset>
```

The implementation should verify how host-level ARIA attributes are exposed by the existing custom form controls and grouped-control components. This component should provide the target error ID but should not mutate the related control. It may also record the related source control via `controlId` for developer-facing association and clarity so the connected form control can be identified without ambiguity.

## Visual Design

Use the Ontario Design System error-messaging treatment and Fractal guidance as the visual reference. This component may reuse established design tokens and icon assets, but its implementation should be evaluated against this specification independently.

The component should render:

```html
<div class="ontario-error-messaging" role="alert">
	<span class="ontario-error-messaging__icon">
		<!-- ontario-icon-alert-error -->
	</span>
	<span class="ontario-error-messaging__content">
		<!-- message -->
	</span>
</div>
```

Annotate and verify:

- the error icon;
- the error text container;
- spacing relative to the label, hint text, and control;
- placement directly above the control or group;
- dark-red error treatment;
- error-state treatment on the adjacent control where that control owns the styling;
- grouped-field presentation for checkbox and radio options.

The error icon and text should use the established ODS error colour treatment. Error styling must remain understandable without colour alone. The component should not duplicate control-specific border or checkbox styling inside its own implementation.

## Documentation Examples

Examples should cover the common supported contexts and remain limited in scope. Each example demonstrates the error ID association with an Ontario Design System form component. Because these controls encapsulate their labels, hints, and native controls, the component integration is responsible for rendering the error visually after any hint text and directly above the invalid control or group. The consuming form state is responsible for setting `aria-invalid="true"` and including the error ID in `aria-describedby`.

> The component library names the checkbox group component `ontario-checkboxes`; it is used below for the checkbox-group example.

### `ontario-input` with hint text

```html
<ontario-input
	error-id="email-error"
	name="email"
	caption="Email address"
	hint-text="We will use this to send your confirmation."
	aria-invalid="true"
	aria-describedby="email-hint email-error"
></ontario-input>

<ontario-error-alert
	error-id="email-error"
	message="Enter an email address in the format name@example.com."
></ontario-error-alert>
```

When the input's hint implementation exposes a generated ID, use that ID instead of `email-hint` in `aria-describedby`.

### `ontario-input` without hint text

```html
<ontario-input
	element-id="first-name"
	name="first-name"
	caption="First name"
	aria-invalid="true"
	aria-describedby="first-name-error"
></ontario-input>

<ontario-error-alert error-id="first-name-error" message="Enter your first name."></ontario-error-alert>
```

### `ontario-textarea`

```html
<ontario-textarea
	element-id="comments"
	name="comments"
	caption="Comments"
	aria-invalid="true"
	aria-describedby="comments-error"
></ontario-textarea>

<ontario-error-alert error-id="comments-error" message="Enter a comment before continuing."></ontario-error-alert>
```

### `ontario-date-input`

```html
<ontario-date-input
	element-id="date-of-birth"
	name="date-of-birth"
	caption="Date of birth"
	hint-text="For example 2000 03 01"
	aria-invalid="true"
	aria-describedby="date-of-birth-hint date-of-birth-error"
></ontario-date-input>

<ontario-error-alert error-id="date-of-birth-error" message="Enter a valid date of birth."></ontario-error-alert>
```

If the date component generates the hint ID internally, use the generated hint ID alongside `date-of-birth-error`.

### `ontario-dropdown-list`

```html
<ontario-dropdown-list
	element-id="province"
	name="province"
	caption="Province or territory"
	is-empty-start-option="Select a province or territory"
	options='[{
    "value": "ontario",
    "label": "Ontario"
  }, {
    "value": "quebec",
    "label": "Quebec"
  }]'
	aria-invalid="true"
	aria-describedby="province-error"
></ontario-dropdown-list>

<ontario-error-alert error-id="province-error" message="Select a province or territory."></ontario-error-alert>
```

### `ontario-checkboxes` group

```html
<ontario-checkboxes
	element-id="interests"
	name="interests"
	caption="Areas of interest"
	required
	options='[{
    "value": "news",
    "label": "News",
    "elementId": "interest-news"
  }, {
    "value": "events",
    "label": "Events",
    "elementId": "interest-events"
  }]'
	aria-invalid="true"
	aria-describedby="interests-error"
></ontario-checkboxes>

<ontario-error-alert error-id="interests-error" message="Select at least one area of interest."></ontario-error-alert>
```

Use one error message for the checkbox group rather than repeating the same message for each option.

### `ontario-radio-buttons` group

```html
<ontario-radio-buttons
	element-id="contact-method"
	name="contact-method"
	caption="Preferred contact method"
	required
	options='[{
    "value": "email",
    "label": "Email",
    "elementId": "contact-email"
  }, {
    "value": "phone",
    "label": "Phone",
    "elementId": "contact-phone"
  }]'
	aria-invalid="true"
	aria-describedby="contact-method-error"
></ontario-radio-buttons>

<ontario-error-alert error-id="contact-method-error" message="Select a preferred contact method."></ontario-error-alert>
```

Use one error message for the radio group rather than repeating the same message for each option.

## Out of Scope

- Page-level error summary implementation or focus management.
- Changes to the established visual appearance of error messaging.
- Figma or Fractal updates.
- Form validation-rule implementation.
- Validation timing or form-state management.
- Browser-native HTML5 validation presentation.
- Rich HTML, links, slots, or nested interactive content in the message.
- New events.
- Reworking existing controls' `errorMessage` APIs.
