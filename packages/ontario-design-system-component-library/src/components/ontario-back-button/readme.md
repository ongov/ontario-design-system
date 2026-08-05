import { OntarioBackButton } from '@ongov/ontario-design-system-component-library-react';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# ontario-back-button

Use a back button to provide a clear, consistent way for users to return to a previous step.

## Usage guidance

Please refer to the [Ontario Design System](https://designsystem.ontario.ca/components/detail/back-button.html) for current documentation guidance.

## Configuration

Once the component package has been installed (see Ontario Design System Component Library for installation instructions), the back button component can be added directly into your project and customized using the properties outlined [here](#properties).

The component is navigation-strategy agnostic. Choose the mode that best fits your application's routing approach:

| Mode                  | Use When                                                            | Renders As | Behavior                                                   |
| --------------------- | ------------------------------------------------------------------- | ---------- | ---------------------------------------------------------- |
| **history** (default) | Users follow a linear flow and browser history is reliable          | `<button>` | Calls `window.history.back()`                              |
| **href**              | You need deterministic navigation to a known previous step          | `<a>` link | Navigates to the specified URL                             |
| **event**             | Your framework (React Router, Angular Router, etc.) manages routing | `<button>` | Emits `backClick` event only; your app controls navigation |

## Examples

### History mode (default)

Use this for straightforward, linear flows where browser history is expected. The most common use case.

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
<ontario-back-button></ontario-back-button>
```

```mdx-code-block
</TabItem>
<TabItem value="react">
```

```tsx
<OntarioBackButton></OntarioBackButton>
```

```mdx-code-block
</TabItem>
<TabItem value="angular">
```

```html
<ontario-back-button></ontario-back-button>
```

```mdx-code-block
</TabItem>
</Tabs>
```

<div>
<OntarioBackButton></OntarioBackButton>
</div>

### Explicit href mode

Use this for deterministic navigation in non-linear flows where a known previous step URL is required.

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
<ontario-back-button href="/step-1" back-mode="href"></ontario-back-button>
```

```mdx-code-block
</TabItem>
<TabItem value="react">
```

```tsx
<OntarioBackButton href="/step-1" backMode="href"></OntarioBackButton>
```

```mdx-code-block
</TabItem>
<TabItem value="angular">
```

```html
<ontario-back-button [href]="'/step-1'" [backMode]="'href'"></ontario-back-button>
```

```mdx-code-block
</TabItem>
</Tabs>
```

### Event mode (router-controlled)

Use this when your framework's router or navigation system manages the destination. Emit the event and let your app decide what to do. Common in React Router, Angular Router, and Vue Router applications.

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
<ontario-back-button id="app-back-button" back-mode="event"></ontario-back-button>

<script>
	const backButton = document.querySelector('#app-back-button');

	backButton?.addEventListener('backClick', () => {
		// Example: Tell your app to navigate back
		window.dispatchEvent(new CustomEvent('app:goBack'));

		// Or directly use your router if available:
		// myRouter.goBack();
	});
</script>
```

```mdx-code-block
</TabItem>
<TabItem value="react">
```

```tsx
import { useNavigate } from 'react-router-dom';
import { OntarioBackButton } from '@ongov/ontario-design-system-component-library-react';

export function MyComponent() {
	const navigate = useNavigate();

	const handleBackClick = () => {
		// Your router controls navigation
		navigate(-1); // Go back one page in history
		// OR
		// navigate('/previous-page'); // Go to specific page
	};

	return <OntarioBackButton backMode="event" onBackClick={handleBackClick}></OntarioBackButton>;
}
```

```mdx-code-block
</TabItem>
<TabItem value="angular">
```

```html
<ontario-back-button back-mode="event" (backClick)="onBackClick()"></ontario-back-button>
```

```ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-my-component',
	templateUrl: './my-component.component.html',
})
export class MyComponent {
	constructor(private router: Router) {}

	onBackClick(): void {
		// Your router controls navigation
		this.router.navigate(['/previous-page']);
	}
}
```

```mdx-code-block
</TabItem>
</Tabs>
```

### Disabled state

Disable the back button when user interaction should be prevented (e.g., during form submission or loading).

```html
<ontario-back-button disabled></ontario-back-button>
```

### Custom label

Override the default "Back" / "Retour" label with custom text.

```html
<ontario-back-button label="Go to Step 1"></ontario-back-button>
```

### French label

If `label` is not set, `language="fr"` renders the default label as `Retour`.

```html
<ontario-back-button language="fr"></ontario-back-button>
```

## Common Pitfalls

### Using `backMode="href"` without an `href`

```html
<!-- ❌ Wrong: href mode requires an href attribute -->
<ontario-back-button back-mode="href"></ontario-back-button>
```

If you do this, the component renders as a button instead of a link, and a console warning is emitted. Provide the `href`:

```html
<!-- ✅ Correct -->
<ontario-back-button href="/previous-page" back-mode="href"></ontario-back-button>
```

### Assuming `history` mode is always safe

```html
<!-- ⚠️ Be careful: history mode relies on browser history -->
<!-- If user enters from an external link or bookmark, back may not go where expected -->
<ontario-back-button></ontario-back-button>
```

In non-linear user flows (e.g., users can enter at any step), use `href` mode instead:

```html
<!-- ✅ Better for non-linear flows -->
<ontario-back-button href="/step-1" back-mode="href"></ontario-back-button>
```

### Forgetting to listen for `backClick` in event mode

```tsx
// ❌ Wrong: Event mode emits the event but doesn't navigate
<OntarioBackButton backMode="event" />
```

Always attach a listener:

```tsx
// ✅ Correct: Event mode + listener
<OntarioBackButton backMode="event" onBackClick={() => navigate(-1)} />
```

## Guidance warning

Do not combine breadcrumbs and a back button in the same location when users can enter from multiple entry points. This can create ambiguous navigation paths.

## Properties

| Property   | Attribute   | Description                                                                                                                                               | Type                             | Default     |
| ---------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- | ----------- |
| `label`    | `label`     | Optional visible text override for the back action. If not provided, translated defaults are used: `Back` (English) or `Retour` (French).                 | `string \| undefined`            | `undefined` |
| `language` | `language`  | The language of the component. If no language is passed, it defaults to English (`en`). Language is typically set via the header's language toggle event. | `"en" \| "fr" \| undefined`      | `undefined` |
| `href`     | `href`      | Required when using `backMode="href"`. Specifies the destination URL for navigation.                                                                      | `string \| undefined`            | `undefined` |
| `backMode` | `back-mode` | Determines navigation strategy: `history` (browser back), `href` (explicit URL), or `event` (app-controlled).                                             | `"history" \| "href" \| "event"` | `"history"` |
| `disabled` | `disabled`  | Disables user interaction with the button.                                                                                                                | `boolean \| undefined`           | `false`     |

## Events

| Event       | Description                                                                                                                                                                 | Payload                       |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| `backClick` | Emitted when the user activates the back control. Fires before navigation occurs in `history` or `href` modes. In `event` mode, your app must listen and handle navigation. | `MouseEvent \| KeyboardEvent` |

### Listening to events

**HTML:**

```html
<ontario-back-button id="my-back-button"></ontario-back-button>

<script>
	document.getElementById('my-back-button').addEventListener('backClick', (event) => {
		console.log('User clicked back:', event);
	});
</script>
```

**React:**

```tsx
<OntarioBackButton onBackClick={(event) => console.log('Clicked', event)} />
```

**Angular:**

```html
<ontario-back-button (backClick)="onBackClick($event)"></ontario-back-button>
```

<!-- Auto Generated Below -->
