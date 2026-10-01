# `ontario-error-alert` test plan

Related specification: [ontario-error-alert component design specification](./ontario-error-alert-specification.md).

## Purpose

This plan defines unit and end-to-end coverage for the `ontario-error-alert` web component. The component is a text-only, field-level error pattern. It renders a visible error icon and message with alert semantics and exposes an element ID that a related form control can reference with `aria-describedby`.

The component does not support slotted content. All error content is supplied through the scalar `message` property.

## Scope

### In scope

- Rendering the error message.
- Rendering the error icon and expected CSS structure.
- `role="alert"` on the error container.
- Applying the supplied error element ID.
- Text-only message behaviour.
- Missing and empty message handling, including the console warning contract.
- Association with individual controls through `aria-describedby`.
- Association with grouped checkbox and radio controls.
- Compatibility with `aria-invalid="true"`.
- Placement of the error before the associated control or group and after hint text when present.
- Hydration and browser-visible behaviour.

### Out of scope

- Form validation rules.
- Validation timing decisions made by the consuming application.
- Page-level error summaries and focus management.
- Setting `aria-invalid` on another element.
- Applying error borders inside another component's Shadow DOM.
- Slotted content, rich HTML messages, links, or nested interactive content.
- Server-side validation.

## Test files

- Unit: `packages/ontario-design-system-component-library/src/components/ontario-error-alert/test/ontario-error-alert.spec.tsx`
- End-to-end: `packages/ontario-design-system-component-library/src/components/ontario-error-alert/test/ontario-error-alert.e2e.ts`

Unit tests should follow the repository's Stencil Vitest conventions. End-to-end tests should use the repository's Stencil `newE2EPage` conventions and query Shadow DOM content with the `>>>` selector.

## Unit test plan

### 1. Render the error alert

Render the component with a message and verify that the Shadow DOM contains:

- `.ontario-error-messaging`;
- `role="alert"`;
- `.ontario-error-messaging__icon`;
- `ontario-icon-alert-error`;
- `.ontario-error-messaging__content`;
- the exact supplied message.

Expected markup shape:

```html
<div class="ontario-error-messaging" role="alert">
	<span class="ontario-error-messaging__icon" aria-hidden="true">
		<ontario-icon-alert-error></ontario-icon-alert-error>
	</span>
	<span class="ontario-error-messaging__content"> Enter your first name. </span>
</div>
```

The icon wrapper should be verified as decorative if the implementation sets `aria-hidden="true"`; the icon must not cause the message to be announced twice.

### 2. Preserve text-only message content

Verify that the `message` property is rendered as text in the content element. The test should confirm that the component does not create arbitrary HTML from the message value and does not render a slot.

Use a message such as:

```text
Enter an email address in the format name@example.com.
```

The test should also verify that no `<slot>` is present in the component's Shadow DOM.

### 3. Apply the association ID

Render the component with `element-id="first-name-error"` and verify that the alert container receives:

```html
id="first-name-error"
```

This ID is intended to be referenced by a related form control:

```html
aria-describedby="first-name-error"
```

### 4. Handle a missing message

Render the component without `message` and verify the agreed empty-state contract:

- the component issues the repository-standard console warning;
- no empty error content is exposed as a meaningful validation message;
- the component does not silently substitute a fallback message.

The exact warning text should be asserted once the implementation contract is finalized. If the component renders no alert for an absent message, assert that behaviour. If it retains a hidden structural container, assert that it is not visible or exposed as an active message.

### 5. Handle an empty or whitespace-only message

Repeat the missing-message test with:

```html
<ontario-error-alert message=""></ontario-error-alert>
```

and, where whitespace trimming is part of the implementation contract:

```html
<ontario-error-alert message="   "></ontario-error-alert>
```

Empty values should follow the same behaviour as an absent message.

### 6. Confirm the component is non-interactive

Verify that the component does not render buttons, links, inputs, or other focusable controls. No component events should be required for displaying or clearing the message.

### 7. Verify property updates, if supported

If `message` and `elementId` are mutable public properties, update them after render and verify that the rendered text and ID change. If the implementation treats the component as immutable and relies on consumer re-rendering, omit this test and document that contract.

## End-to-end test plan

### 1. Hydrate and render visibly

Set page content with a message and verify that:

- the custom element receives the `hydrated` class;
- the alert container exists inside the Shadow DOM;
- the message is visible;
- the error icon is present;
- the alert has non-zero layout dimensions.

### 2. Verify alert semantics

Query the Shadow DOM alert container and verify:

```text
role = alert
```

Verify that the message is available in the rendered text and that the decorative icon does not add duplicate accessible text.

### 3. Verify an individual control association

Render an input with:

```html
<input id="email" aria-invalid="true" aria-describedby="email-error" />
<ontario-error-alert element-id="email-error" message="Enter a valid email address."></ontario-error-alert>
```

Verify that:

- the input retains `aria-invalid="true"`;
- the input retains `aria-describedby="email-error"`;
- the error container has `id="email-error"`;
- the referenced ID resolves to the rendered alert.

The test must not expect the error component to set or mutate the input's ARIA attributes.

### 4. Verify hint and error association together

Render hint text and an error message for one control:

```html
<span id="email-hint">Use your work email.</span>
<ontario-error-alert element-id="email-error" message="Enter a valid email address."></ontario-error-alert>
<input id="email" aria-invalid="true" aria-describedby="email-hint email-error" />
```

Verify that both IDs remain present and resolve to the intended hint and error elements.

### 5. Verify supported control contexts

Use the same component pattern with:

- a text input;
- a textarea;
- a dropdown/select.

The tests should verify association and message visibility without duplicating all base-rendering assertions for each control type.

### 6. Verify checkbox group association

Render a fieldset with checkbox options and an inline error directly before the options:

```html
<fieldset aria-invalid="true" aria-describedby="interests-error">
	<legend>Areas of interest</legend>
	<ontario-error-alert
		element-id="interests-error"
		message="Select at least one area of interest."
	></ontario-error-alert>
	<!-- checkbox options -->
</fieldset>
```

Verify that:

- the fieldset retains `aria-invalid="true"`;
- the fieldset references the error ID;
- the error message is visible;
- the error appears before the checkbox options;
- one group-level message is used rather than one message per checkbox.

### 7. Verify radio group association

Repeat the grouped-field test with radio options. Verify the fieldset association, visible message, and placement before the options.

### 8. Verify placement relative to hint text and controls

Verify DOM order for the common inline pattern:

```text
label or legend
hint text, when present
error message
input or control group
```

Prefer DOM-order assertions over exact pixel coordinates. Use computed-style or visual regression assertions only for stable acceptance criteria such as flex layout, error colour, and the presence of the expected classes.

### 9. Verify the empty state in a browser

Render the component without a message and verify the finalized empty-state behaviour in a hydrated browser context. This should confirm that an empty alert is not announced or displayed as a usable error message.

## Acceptance criteria matrix

| Acceptance criterion                                               |       Unit |      E2E |
| ------------------------------------------------------------------ | ---------: | -------: |
| Error message renders exactly as supplied                          |        Yes |      Yes |
| Error icon renders                                                 |        Yes |      Yes |
| Error container uses `role="alert"`                                |        Yes |      Yes |
| Error container has expected CSS classes                           |        Yes |      Yes |
| Supplied element ID is applied                                     |        Yes |      Yes |
| Individual control can reference the error with `aria-describedby` | Structural |      Yes |
| Hint and error IDs can coexist                                     |         No |      Yes |
| `aria-invalid="true"` remains on the consuming control/group       |         No |      Yes |
| Checkbox group pattern is supported                                | Structural |      Yes |
| Radio group pattern is supported                                   | Structural |      Yes |
| Missing/empty message follows warning and rendering contract       |        Yes |      Yes |
| No slot is rendered or supported                                   |        Yes |       No |
| Component is non-interactive                                       |        Yes | Optional |
| Inline placement is correct                                        |    Limited |      Yes |
| Page-level summary behaviour                                       |         No |       No |

## Execution plan

1. Finalize the public API and empty-message behaviour.
2. Implement the text-only component markup and ID association.
3. Add the focused unit tests described above.
4. Add the focused end-to-end tests described above.
5. Run the component unit suite.
6. Run the component end-to-end suite.
7. Run formatting and package type-check/build validation.
8. Review the generated output to ensure no slot API or slot-based examples are added to component documentation.
