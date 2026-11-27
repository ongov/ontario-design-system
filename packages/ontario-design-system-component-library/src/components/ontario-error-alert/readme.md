import { useRef } from 'react';
import { OntarioErrorAlert, OntarioInput } from '@ongov/ontario-design-system-component-library-react';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# ontario-error-alert

Use `ontario-error-alert` to summarize form errors after validation fails. It discovers supported Ontario Design System controls in its associated native form and listens to their existing `inputErrorOccurred` events. Validation and form submission remain the application's responsibility.

## Usage guidance

- Place the alert at the top of the page, above the page's `<h1>`, when possible. Use `form-id` to associate it with a form elsewhere on the page; otherwise, place it inside the native `<form>`.
- Show the alert after client-side or server-side validation finds errors in supported ODS controls, including when there is only one such error. Native-field errors are not collected; see [Native fields and mixed forms](#native-fields-and-mixed-forms).
- Provide an inline error beside each invalid control. Use the same clear, actionable error text in the alert and inline message.
- The application owns validation, submission, setting and clearing errors, and the page title. The alert does not validate controls or maintain a separate application error list.
- Set the page title to indicate that errors need attention, and restore its normal title when errors are resolved.

The alert composes `ontario-page-alert` with `type="error"` for its icon, heading and responsive presentation. Its links take users to the related controls and focus the appropriate native field.

While the alert is active, inline live announcements are suppressed to avoid repeating the same errors. New or changed errors are announced without moving focus. Calling `hide()` restores inline announcements but does not clear control errors.

Use `novalidate` when the application handles validation so browser validation bubbles do not compete with the error alert. Keep entered values after a failed submission and retain server-side validation.

## Configuration

Set `form-id` when the alert is outside its form. The `heading` property customizes the alert heading, and `language` sets the language of its built-in heading and status messages (`en` or `fr`). Application-provided headings and control errors must be localized by the application.

The component exposes three asynchronous methods:

- `show()` activates the alert and focuses it when errors are present. Call it after validation fails; it can also be called before setting control errors.
- `hide()` hides the alert and restores inline announcements. It does not clear errors.
- `refresh()` rediscovers supported controls and reconciles their current errors. Updates are normally detected automatically.

When errors are corrected, clear the relevant control errors and call `hide()` when the alert should no longer be active. A native form reset does not clear application-managed errors, so clear them in the application's reset handler. Do not use a timeout to dismiss the alert.

### Supported controls and error properties

The alert reads current errors from these controls and follows their subsequent error updates. Set an application-provided error on the control itself rather than adding a separate `ontario-error-message` inside it. Use an empty string to clear an application-provided error.

| Control                                           | Application-provided error property               |
| ------------------------------------------------- | ------------------------------------------------- |
| [ontario-input](../ontario-input)                 | `errorMessage` (`error-message`)                  |
| [ontario-textarea](../ontario-textarea)           | `errorMessage` (`error-message`)                  |
| [ontario-dropdown-list](../ontario-dropdown-list) | `errorMessage` (`error-message`)                  |
| [ontario-checkboxes](../ontario-checkboxes)       | `errorMessage` (`error-message`)                  |
| [ontario-radio-buttons](../ontario-radio-buttons) | `errorMessage` (`error-message`)                  |
| [ontario-date-input](../ontario-date-input)       | `externalErrorMessage` (`external-error-message`) |

For date input, `externalErrorMessage` takes precedence over internal date validation. Clearing it can reveal an internal error that still applies; see [date input error messaging](../ontario-date-input/#error-messaging). Other controls may also provide their own validation options; consult their documentation when combining those with application validation.

### Native fields and mixed forms

The alert does not collect native HTML controls or standalone `ontario-error-message` components. If a form has only a native-field error, calling `show()` does not produce an entry or a visible summary. In a mixed form, the alert lists only supported ODS control errors, even when native fields are also invalid.

Validate native fields in the application and associate each inline message with its field as described in [ontario-error-message](../ontario-error-message). The Next.js integrated example described below demonstrates this limitation: it lists ODS errors in the alert and focuses the native email field when that is the only remaining error. It is not an example of a summary containing every error in a mixed form.

Whitespace-only control errors remain errors: the native field stays invalid, but the inline message is hidden and the alert omits the entry because it has no accessible link text. A console warning explains the omission. Supply meaningful error text or an empty string to clear the error.

### Server-rendered errors

When server-rendering forms, render error content from the server response for users without JavaScript. The alert reconciles supported control errors after hydration but cannot announce them before JavaScript runs. Use stable control IDs when deterministic server/client IDs are required.

For example, a server-rendered error response for a native field can include ordinary HTML for both the summary and inline error. This example represents the response after server validation, not a component configuration:

```html
<section aria-labelledby="error-heading">
	<h2 id="error-heading">There is a problem</h2>
	<ul>
		<li><a href="#email">Enter an email address in the correct format.</a></li>
	</ul>
</section>
<h1>Apply for a service</h1>
<form method="post">
	<label for="email">Email address</label>
	<p id="email-error">Enter an email address in the correct format.</p>
	<input id="email" name="email" type="email" aria-invalid="true" aria-describedby="email-error" />
	<button type="submit">Continue</button>
</form>
```

The server must validate the submission, render the applicable errors and retain entered values safely. If an application also renders a client-side summary after hydration, it must coordinate the server-rendered and client-rendered content so users do not encounter duplicate summaries or announcements. This example does not add native-field support to `ontario-error-alert`.

### Next.js server-side rendering

In Next.js applications using `@stencil/ssr/next`, generated wrappers are loaded through `next/dynamic`, which does not forward React refs, and the server-rendered placeholder element is replaced when the wrapper chunk loads. Obtain the alert element in the event handler, for example with `document.getElementById('application-error-alert')`, before calling its methods.

## Examples

The following examples show the alert placed before the page heading and associated with the form using `form-id`. In each example, application validation sets the control error after activating the alert.

```mdx-code-block
<Tabs
	defaultValue="html"
	values={[
		{label: 'HTML', value: 'html'},
		{label: 'React', value: 'react'},
		{label: 'Angular', value: 'angular'},
	]}
	groupId="framework"
	queryString="framework">
<TabItem value="html">
```

```html
<ontario-error-alert id="application-error-alert" form-id="application-form"></ontario-error-alert>
<h1>Apply for a service</h1>
<form id="application-form" novalidate>
	<ontario-input id="email" name="email" caption="Email address"></ontario-input>
	<ontario-button html-type="submit" type="primary" label="Continue"></ontario-button>
</form>
<script>
	const form = document.querySelector('#application-form');
	const errorAlert = document.querySelector('ontario-error-alert');
	const email = document.querySelector('#email');

	form.addEventListener('submit', async (event) => {
		event.preventDefault();
		// Replace this check with the application's validation.
		const hasError = !email.value.includes('@');
		if (hasError) {
			await errorAlert.show();
			email.errorMessage = 'Enter an email address in the correct format.';
		} else {
			email.errorMessage = '';
			await errorAlert.hide();
		}
	});
</script>
```

```mdx-code-block
</TabItem>
<TabItem value="react">
```

```tsx
function ApplicationForm() {
	const alertRef = useRef<HTMLOntarioErrorAlertElement>(null);
	const inputRef = useRef<HTMLOntarioInputElement>(null);

	return (
		<>
			<OntarioErrorAlert id="application-error-alert" ref={alertRef} formId="application-form" />
			<h1>Apply for a service</h1>
			<form
				id="application-form"
				noValidate
				onSubmit={async (event) => {
					event.preventDefault();
					// Replace this check with the application's validation.
					const hasError = !inputRef.current?.value?.includes('@');
					if (hasError) {
						await alertRef.current?.show();
						if (inputRef.current) inputRef.current.errorMessage = 'Enter an email address in the correct format.';
					} else {
						if (inputRef.current) inputRef.current.errorMessage = '';
						await alertRef.current?.hide();
					}
				}}
			>
				<OntarioInput ref={inputRef} name="email" caption="Email address" />
				<button type="submit">Continue</button>
			</form>
		</>
	);
}
```

```mdx-code-block
</TabItem>
<TabItem value="angular">
```

```html
<ontario-error-alert #errorAlert id="application-error-alert" form-id="application-form"></ontario-error-alert>
<h1>Apply for a service</h1>
<form id="application-form" novalidate (ngSubmit)="submit()">
	<ontario-input #email name="email" caption="Email address"></ontario-input>
	<button type="submit">Continue</button>
</form>
```

```ts
import { ElementRef, ViewChild } from '@angular/core';

@ViewChild('errorAlert', { read: ElementRef })
errorAlert!: ElementRef<HTMLOntarioErrorAlertElement>;

@ViewChild('email', { read: ElementRef })
email!: ElementRef<HTMLOntarioInputElement>;

async submit() {
	// Replace this check with the application's validation.
	const hasError = !this.email.nativeElement.value?.includes('@');
	if (hasError) {
		await this.errorAlert.nativeElement.show();
		this.email.nativeElement.errorMessage = 'Enter an email address in the correct format.';
	} else {
		this.email.nativeElement.errorMessage = '';
		await this.errorAlert.nativeElement.hide();
	}
}
```

```mdx-code-block
</TabItem>
</Tabs>
```

### Interactive integration example

Run the Next.js example at `/components/ontario-error-alert`; its source is `packages/app-nextjs/src/app/components/ontario-error-alert/page.tsx` in the repository. It demonstrates multiple controls, submit validation, an optional live-validation toggle, correction and reset. The example does not submit data or update the page title; applications must implement submission, server-side validation and title updates themselves. See [Native fields and mixed forms](#native-fields-and-mixed-forms) for its summary limitation.

## Accessibility verification

Automated evidence is in `test/ontario-error-alert.spec.tsx` and `test/ontario-error-alert.e2e.ts`. The unit tests cover error associations, invalid state, snapshots, event updates and focus. Chromium/axe tests cover alert navigation, all six supported ODS controls, form isolation, initial and late errors, dynamic controls, correction and empty states. These tests exercise behaviours relevant to WCAG 1.3.1, 1.3.2, 2.1.1, 2.4.3, 2.4.4, 3.3.1, 4.1.2 and 4.1.3; they do not establish conformance.

Manual assistive technology and visual accessibility testing remains necessary before release. Record browser, operating system and assistive technology versions, along with observed speech and focus results. Verify keyboard-only use, visible and unobscured focus, contrast, forced colours, 200% text resize, 320 CSS-pixel reflow, text spacing and target size. Accessibility-owner review remains required.

For each supported browser and assistive technology combination:

- Submit a form with one error and then multiple supported-control errors. Check that the summary receives focus and its heading and error links are announced.
- Activate each summary link with the keyboard and check that focus reaches the appropriate field or group. Check that the inline message and any existing hint are available from the field.
- With the summary active, correct an error and change another error. Check that the summary updates, the change is announced without unexpectedly moving focus and the same error is not announced twice.
- Hide the summary and validate again. Check that inline announcements are available again and that hiding the summary did not clear errors.
- Test native-field errors separately in mixed forms: confirm their inline associations and verify the application's behaviour when no supported ODS errors remain.

<!-- Auto Generated Below -->

## Overview

Collects supported ODS control errors within a native form.
Applications own validation and explicitly activate the summary after validation.

## Properties

| Property   | Attribute  | Description                                                               | Type                  | Default     |
| ---------- | ---------- | ------------------------------------------------------------------------- | --------------------- | ----------- |
| `formId`   | `form-id`  | The ID of the native form whose ODS control errors this summary displays. | `string \| undefined` | `undefined` |
| `heading`  | `heading`  | The summary heading.                                                      | `string \| undefined` | `undefined` |
| `language` | `language` | The language for the built-in heading.                                    | `"en" \| "fr"`        | `'en'`      |

## Methods

### `hide() => Promise<void>`

Hides the summary without clearing control errors and releases inline announcement suppression.
Focus inside the summary returns to its associated control before removal.

#### Returns

Type: `Promise<void>`

### `refresh() => Promise<void>`

Rediscovers associated ODS controls and reconciles their current error snapshots.
Newer refreshes and error events take precedence over pending snapshots.

#### Returns

Type: `Promise<void>`

### `show() => Promise<void>`

Activates aggregation and focuses a non-empty summary without validating controls.
If no errors exist yet, the first arriving error completes activation.

#### Returns

Type: `Promise<void>`

## Dependencies

### Depends on

- [ontario-page-alert](../ontario-page-alert)

### Graph

```mermaid
graph TD;
  ontario-error-alert --> ontario-page-alert
  ontario-page-alert --> ontario-icon-alert-information
  ontario-page-alert --> ontario-icon-alert-success
  ontario-page-alert --> ontario-icon-alert-warning
  ontario-page-alert --> ontario-icon-alert-error
  style ontario-error-alert fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
