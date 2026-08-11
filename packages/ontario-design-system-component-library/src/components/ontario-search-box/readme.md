import { OntarioSearchBox } from '@ongov/ontario-design-system-component-library-react';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# ontario-search-box

Use a search box to let users complete keyword-based searches.

## User guidance

Please refer to the [Ontario Design System](https://designsystem.ontario.ca/components/detail/search-box.html) for current documentation guidance.

Use the standard search box when people can describe what they need with keywords and the application will display a separate results page.

Enable autocomplete when:

- the available suggestions come from a known or searchable data source
- suggestions can help people enter a valid term or reach a result faster
- the application can return relevant suggestions as the query changes

Do not use autocomplete as a replacement for a select or radio button when people must choose from a short, fixed list. Suggestions should support text entry rather than require people to discover every available option.

### Disabled and read-only states

This component intentionally does not provide `readOnly` or `disabled` props.

Disabling form controls can create accessibility and usability barriers, and often does not explain what the user needs to fix.

Instead:

- keep controls and submission actions available
- validate search requirements in your integration logic and provide contextual feedback

For field-level validation patterns, see the input component [Error messaging](../ontario-input/#error-messaging) guidance.

Source: https://designsystem.ontario.ca/components/detail/buttons.html#disabled-buttons

## Configuration

Once the component package has been installed (see Ontario Design System Component Library for installation instructions), the search box component can be added directly into the project's code, and can be customized by updating the properties outlined [here](#properties). Additional information on custom types for header properties are outlined [here](#custom-property-types). Please see the [example](#example) below for how to configure the component.

## Example

### Search box with caption

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
<ontario-search-box element-id="ontario-search-box" caption="Search the directory"></ontario-search-box>
```

```mdx-code-block
</TabItem>
<TabItem value="react">
```

```tsx
<OntarioSearchBox elementId="ontario-search-box" caption="Search the directory"></OntarioSearchBox>
```

```mdx-code-block
</TabItem>
<TabItem value="angular">
```

```html
<ontario-search-box [elementId]="'ontario-search-box'" [caption]="'Search the directory'"></ontario-search-box>
```

```mdx-code-block
</TabItem>
</Tabs>
```

<div className="ontario-row">
	<OntarioSearchBox elementId="ontario-search-box" caption="Search the directory"></OntarioSearchBox>
</div>

### Handling searching

The `<ontario-search-box>` provides two ways to handle searching.

#### The `performSearch()` function

The `performSearch()` function allows for custom logic to be executed when the search box is submitted for searching. When the search box calls this function internally it will pass to it a string that is the value of the search field. This function is [asynchronous](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) and should return a [`Promise<void>`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).

##### Example

The following example registers a simple function on `window` `load` that assigns a custom function to the search box's `performSearch()` function to handle the application specific search logic.

```html
<script>
	window.addEventListener('load', () => {
		console.log('Loaded Search Box Event Listener');

		const searchBox = document.getElementById('ontario-search-box');
		searchBox.performSearch = async (value) => {
			console.log('Performing search with value:', value);
		};
	});
</script>
```

#### Using the `searchOnSubmit` function

As an alternative to using a custom `performSearch()` function the search box also emits an event, `searchOnSubmit` that can be listened to to trigger any custom search logic that is needed. This allows for applications to listen for a search being performed and act accordingly. The value of the search box will be passed via the [`CustomEvent` `detail`](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent#detail) property.

##### Example

The following example registers a simple function on `window` `load` that adds an event listener to the search box listening for the `searchOnSubmit` event and outputs the value of the `detail` property.

```html
<script>
	window.addEventListener('load', () => {
		console.log('Loaded Search Box Event Listener');

		const searchBox = document.getElementById('ontario-search-box');
		searchBox.addEventListener('searchOnSubmit', (event) => {
			console.log('Search Event Detail:', event.detail);
		});
	});
</script>
```

## Autocomplete examples

### Async suggestions with `getSuggestions(query)`

Set `enableAutocomplete` and provide an asynchronous `getSuggestions` function. The function receives the current input value and returns matching suggestion strings or suggestion objects. The component handles debouncing, list visibility, keyboard navigation, selection, and accessible status updates.

Use `minChars` to avoid broad requests for short queries, `debounceMs` to limit requests while someone is typing, and `maxSuggestions` to keep the displayed list concise. Filtering, ranking, and retrieving suggestions remain the responsibility of the consuming application.

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
<ontario-search-box
	id="search-with-autocomplete"
	caption="Search Ontario cities"
	enableAutocomplete
></ontario-search-box>

<script>
	window.addEventListener('load', () => {
		const cities = ['Ajax', 'Barrie', 'Belleville', 'Hamilton', 'Ottawa', 'Toronto', 'Waterloo'];
		const searchBox = document.getElementById('search-with-autocomplete');

		searchBox.getSuggestions = async (query) => {
			return cities.filter((city) => city.toLowerCase().includes((query || '').toLowerCase()));
		};
	});
</script>
```

```mdx-code-block
</TabItem>
<TabItem value="react">
```

```tsx
import { OntarioSearchBox } from '@ongov/ontario-design-system-component-library-react';

export default function AutocompleteExample() {
	const ontarioCities = [
		'Ajax',
		'Barrie',
		'Belleville',
		'Brampton',
		'Brantford',
		'Hamilton',
		'Kingston',
		'London',
		'Ottawa',
		'Toronto',
		'Waterloo',
		'Windsor',
	];

	const getOntarioCitySuggestions = async (query: string) => {
		const normalizedQuery = (query || '').toLowerCase();

		return ontarioCities.filter((city) => city.toLowerCase().includes(normalizedQuery)).slice(0, 8);
	};

	const handleSearch = async (value?: string) => {
		console.log('Performing search with value:', value);
	};

	return (
		<OntarioSearchBox
			elementId="search-with-autocomplete"
			enableAutocomplete
			minChars={0}
			debounceMs={0}
			maxSuggestions={8}
			caption={{
				captionText: 'Search Ontario cities',
				captionType: 'default',
			}}
			hintText="Start typing to see city suggestions."
			getSuggestions={getOntarioCitySuggestions}
			performSearch={handleSearch}
		/>
	);
}
```

```mdx-code-block
</TabItem>
<TabItem value="angular">
```

```typescript
import { Component } from '@angular/core';

@Component({
	selector: 'app-search-autocomplete',
	template: `
		<ontario-search-box
			id="search-with-autocomplete"
			[caption]="'Search Ontario cities'"
			[enableAutocomplete]="true"
		></ontario-search-box>
	`,
})
export class SearchAutocompleteComponent {
	cities = ['Ajax', 'Barrie', 'Belleville', 'Hamilton', 'Ottawa', 'Toronto', 'Waterloo'];

	ngAfterViewInit() {
		const searchBox = document.getElementById('search-with-autocomplete');
		searchBox.getSuggestions = async (query) => {
			return this.cities.filter((city) => city.toLowerCase().includes((query || '').toLowerCase()));
		};
	}
}
```

```mdx-code-block
</TabItem>
</Tabs>
```

### Important notes about autocomplete

Autocomplete suggestions are supplied through `getSuggestions(query)`.

The component applies debouncing, keyboard navigation, active option state, and accessibility attributes while suggestions are open. Selecting a suggestion updates the input value. Submitting the form continues to call `performSearch` and emit `searchOnSubmit` with the current value.

## Custom property types

### caption

The `caption` property is used to render the label for the ontario-input. It can be passed either a string or an object. If no `captionType` needs to be specified, it can be passed as a string.

```html
caption='{ "captionText": "Input label", "captionType": "large" }'
```

| Property name | Type                               | Description                                                                                                                                      |
| ------------- | ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `captionText` | `string`                           | Text to display as the input question                                                                                                            |
| `captionType` | `"default" \| "large"\| "heading"` | The type of label to display for the input question. This is optional, and if no information is provided, it will default to the `default` type. |

## Technical Note: SSR (Server-Side Rendering) Considerations

The Ontario Search Box component supports server-side rendering, with a few considerations:

- **Language prop:** Pass `language` explicitly during SSR.
- **Hydrated-only language events:** Avoid relying on `setAppLanguage` or `headerLanguageToggled` for server-rendered output, because these events only fire after hydration.
- **Framework guidance:** For deterministic SSR output, set `language` directly in markup (for example, `<ontario-search-box language="fr"></ontario-search-box>`).

<!-- Auto Generated Below -->

## Overview

Ontario Search Box captures and submits search queries.

This component intentionally does not expose `readOnly` or `disabled` props.

To support accessible and understandable form completion:

- keep form fields and submission actions available
- use validation and error messaging to guide corrections

For component guidance, see:

- https://designsystem.ontario.ca/components/detail/search-box.html
- https://designsystem.ontario.ca/developer-docs/components/ontario-search-box/

Disabled/read-only policy source:

- https://designsystem.ontario.ca/components/detail/buttons.html#disabled-buttons

## Properties

| Property               | Attribute             | Description                                                                                                                                                                                                                                                                                                                                                                            | Type                                                            | Default                                    |
| ---------------------- | --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- | ------------------------------------------ |
| `caption` _(required)_ | `caption`             | The text to display as the input label                                                                                                                                                                                                                                                                                                                                                 | `Caption \| string`                                             | `undefined`                                |
| `customOnBlur`         | `custom-on-blur`      | Used to add a custom function to the input onBlur event.                                                                                                                                                                                                                                                                                                                               | `((event: Event) => void) \| undefined`                         | `undefined`                                |
| `customOnChange`       | `custom-on-change`    | Used to add a custom function to the input onChange event.                                                                                                                                                                                                                                                                                                                             | `((event: Event) => void) \| undefined`                         | `undefined`                                |
| `customOnFocus`        | `custom-on-focus`     | Used to add a custom function to the input onFocus event.                                                                                                                                                                                                                                                                                                                              | `((event: Event) => void) \| undefined`                         | `undefined`                                |
| `customOnInput`        | `custom-on-input`     | Used to add a custom function to the input onInput event.                                                                                                                                                                                                                                                                                                                              | `((event: Event) => void) \| undefined`                         | `undefined`                                |
| `debounceMs`           | `debounce-ms`         | Debounce delay in milliseconds before `getSuggestions` is called.                                                                                                                                                                                                                                                                                                                      | `number \| undefined`                                           | `OntarioSearchBox.DEFAULT_DEBOUNCE_MS`     |
| `elementId`            | `element-id`          | The unique identifier of the search-box component. This is optional - if no ID is passed, one will be generated.                                                                                                                                                                                                                                                                       | `string \| undefined`                                           | `undefined`                                |
| `enableAutocomplete`   | `enable-autocomplete` | Enables autocomplete behaviour on the search input.                                                                                                                                                                                                                                                                                                                                    | `boolean \| undefined`                                          | `false`                                    |
| `getSuggestions`       | `get-suggestions`     | Async suggestion provider for autocomplete mode.                                                                                                                                                                                                                                                                                                                                       | `((query: string) => Promise<Suggestion[]>) \| undefined`       | `undefined`                                |
| `hintText`             | `hint-text`           | Used to include the ontario-hint-text component for the search-box. This is optional.                                                                                                                                                                                                                                                                                                  | `Hint \| string \| undefined`                                   | `undefined`                                |
| `language`             | `language`            | The language of the component. This is used for translations. If none is passed, it will default to English.                                                                                                                                                                                                                                                                           | `"en" \| "fr" \| undefined`                                     | `'en'`                                     |
| `maxSuggestions`       | `max-suggestions`     | Maximum number of suggestions rendered in async mode.                                                                                                                                                                                                                                                                                                                                  | `number \| undefined`                                           | `OntarioSearchBox.DEFAULT_MAX_SUGGESTIONS` |
| `minChars`             | `min-chars`           | Minimum number of characters required before suggestions are shown.                                                                                                                                                                                                                                                                                                                    | `number \| undefined`                                           | `OntarioSearchBox.DEFAULT_MIN_CHARS`       |
| `performSearch`        | `perform-search`      | This Function to perform a search operation. This function will be called when the search submit button is triggered. The value argument is used for as search term to use for the search operation. This parameter is optional. The performSearch prop can be set dynamically using JavaScript, allowing you to define custom search functionality when the search form is submitted. | `((value?: string \| undefined) => Promise<void>) \| undefined` | `undefined`                                |
| `required`             | `required`            | This is used to determine whether the dropdown list is required or not. This prop gets passed to the InputCaption utility to display either an optional or required flag in the label. If no prop is set, it will default to false (optional).                                                                                                                                         | `boolean \| undefined`                                          | `false`                                    |
| `value`                | `value`               | The value of the search term. This is optional.                                                                                                                                                                                                                                                                                                                                        | `string \| undefined`                                           | `undefined`                                |

## Events

| Event                            | Description                                                                                                       | Type                                                                        |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| `autocompleteQueryUpdated`       | Emitted when the autocomplete query changes.                                                                      | `CustomEvent<{ query: string; }>`                                           |
| `autocompleteSuggestionSelected` | Emitted when a suggestion is selected.                                                                            | `CustomEvent<AutocompleteSuggestionSelectedEvent>`                          |
| `autocompleteSuggestionsUpdated` | Emitted after asynchronous suggestions are updated.                                                               | `CustomEvent<{ query: string; count: number; }>`                            |
| `inputOnBlur`                    | Emitted when a keyboard input event occurs when an input has lost focus.                                          | `CustomEvent<InputInteractionEvent & { focused: boolean; }>`                |
| `inputOnChange`                  | Emitted when a keyboard input or mouse event occurs when an input has been changed.                               | `CustomEvent<{ id?: string \| undefined; value?: string \| undefined; }>`   |
| `inputOnFocus`                   | Emitted when a keyboard input event occurs when an input has gained focus.                                        | `CustomEvent<InputInteractionEvent & { focused: boolean; }>`                |
| `inputOnInput`                   | Emitted when a input  occurs when an input has been changed.                                                      | `CustomEvent<InputInteractionEvent & { inputType?: string \| undefined; }>` |
| `searchOnSubmit`                 | Emitted when the search is submitted. Below is an example on how to hook into the event to get the event details. | `CustomEvent<string>`                                                       |

## Dependencies

### Depends on

- [ontario-hint-text](../ontario-hint-text)
- [ontario-search-result-item](../ontario-search-result-item)

### Graph

```mermaid
graph TD;
  ontario-search-box --> ontario-hint-text
  ontario-search-box --> ontario-search-result-item
  style ontario-search-box fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
