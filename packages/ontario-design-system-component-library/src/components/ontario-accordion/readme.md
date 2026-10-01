import { OntarioAccordion } from '@ongov/ontario-design-system-component-library-react';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# ontario-accordion

Use accordions to provide a show/hide option for sections of content on complex pages.

## Usage guidance

Please refer to the [Ontario Design System](https://designsystem.ontario.ca/components/detail/accordions.html) for current documentation guidance for accordions.

## Configuration

Once the component package has been installed (see Ontario Design System Component Library for installation instructions), the accordion component can be added directly into the project's code, and can be customized by updating the properties outlined [here](#properties). Please see the [examples](#examples) below for how to configure the component.

## Examples

Example of an accordion component, where the user is explicitly passing in content through the `accordionData` property.

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
<ontario-accordion
	title="My Accordion"
	expand-collapse-button='{
		"expandAllSectionsLabel": "Expand All",
		"collapseAllSectionsLabel": "Collapse All"
	}'
	accordion-data='[
	    {"label": "Accordion 1", "content": "This is a string"},
		{"label": "Accordion 2", "accordionContentType": "html", "content": "<ul><li>List A</li><li>List B</li><li>List C</li></ul>"}
	]'
></ontario-accordion>
```

```mdx-code-block
</TabItem>
<TabItem value="react">
```

```tsx
<OntarioAccordion
	title="My Accordion"
	expandCollapseButton={{
		expandAllSectionsLabel: 'Expand All',
		collapseAllSectionsLabel: 'Collapse All',
	}}
	accordionData={[
		{ label: 'Accordion 1', content: 'This is a string' },
		{
			label: 'Accordion 2',
			accordionContentType: 'html',
			content: '<ul><li>List A</li><li>List B</li><li>List C</li></ul>',
		},
	]}
/>
```

```mdx-code-block
</TabItem>
<TabItem value="angular">
```

```html
<ontario-accordion
	[title]="'My Accordion'"
	[expandCollapseButton]="{
		expandAllSectionsLabel: 'Expand All',
		collapseAllSectionsLabel: 'Collapse All'
	}"
	[accordionData]="[
		{ label: 'Accordion 1', content: 'This is a string' },
		{ label: 'Accordion 2', accordionContentType: 'html', content: '<ul><li>List A</li><li>List B</li><li>List C</li></ul>' }
	]"
></ontario-accordion>
```

```mdx-code-block
</TabItem>
</Tabs>
```

<div>
	<OntarioAccordion
		title="My Accordion"
		expand-collapse-button='{
			"expandAllSectionsLabel": "Expand All",
			"collapseAllSectionsLabel": "Collapse All"
		}'
		accordion-data='[
			{"label": "Accordion 1", "content": "This is a string"},
			{"label": "Accordion 2", "accordionContentType": "html", "content": "<ul><li>List A</li><li>List B</li><li>List C</li></ul>"}
		]'
	></OntarioAccordion>
</div>

## Custom property types

### Accordion

```typescript
accordion-data='[ {"label": "Accordion 1", "content": "Text Context"}, {"label": "Accordion 2", "content": "Text Content"}]'
```

| Property               | Description                                                                                                                                   | Type                 | Default  |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- | -------- |
| `label`                | The label for the individual accordion button.                                                                                                | `string`             |          |
| `accordionContentType` | The content type of the accordion. If the accordion requires multiple lines or HTML, the `accordionContentType` prop should be set to `html`. | `'string' \| 'html'` | `string` |
| `content`              | The content that is passed into each accordion.                                                                                               | `string`             |
| `isOpen`               | A boolean to track whether the accordion is expanded or collapsed.                                                                            | `string`             |
| `ariaLabelText`        | Custom Aria Label text for the section.                                                                                                       | `string`             |

### ExpandCollapseButtonDetails

By default, the component uses our recommended values for the Expand/Collapse button label, which will automatically match the language the component is in. However, if custom values for this button are required they can be set via the `expandCollapseButton` property.

```typescript
expand-collapse-button='{ "expandAllSectionsLabel": "Expand All", "collapseAllSectionsLabel": "Collapse All" }'
```

| Property                   | Description                              | Type     |
| -------------------------- | ---------------------------------------- | -------- |
| `expandAllSectionsLabel`   | The label for the 'Expand all' button.   | `string` |
| `collapseAllSectionsLabel` | The label for the 'Collapse all' button. | `string` |
| `ariaLabelText`            | Alt text for the expand/close button.    | `string` |

### AccordionChangeDetail

This event detail type is emitted by the `accordionChange` event whenever an individual accordion item's open state changes. It provides context about what changed, which indexes are open, and why the event occurred.

| Property       | Description                                                   | Type                                                               |
| -------------- | ------------------------------------------------------------- | ------------------------------------------------------------------ | ----------- |
| `openIndexes`  | Array of indexes currently open.                              | `number[]`                                                         |
| `changedIndex` | The index that was just toggled (if applicable).              | `number`                                                           | `undefined` |
| `isBulk`       | True if triggered by a “Expand All” or “Collapse All” action. | `boolean`                                                          | `undefined` |
| `reason`       | Describes what triggered the event.                           | [`AccordionChangeDetailReason`](#accordionchangedetailreason-enum) |

### AccordionChangeDetailReason (enum)

This enum defines the possible values for the reason property in the event payload.

| Enum Member     | Value              | Description                                                                                           |
| --------------- | ------------------ | ----------------------------------------------------------------------------------------------------- |
| `Init`          | `'init'`           | Emitted when the component first initializes.                                                         |
| `ToggleOne`     | `'toggle-one'`     | Emitted when a single accordion item is toggled.                                                      |
| `ToggleAll`     | `'toggle-all'`     | Emitted when all accordion items are expanded or collapsed.                                           |
| `BrowserSearch` | `'browser-search'` | Emitted when the browser's find-in-page (Ctrl+F/Cmd+F) search automatically expands a closed section. |

## Technical Note: Browser find-in-page (Ctrl+F/Cmd+F) support

Collapsed accordion content stays in the DOM using the `hidden="until-found"` attribute instead of `display: none`, so the browser's built-in find-in-page search can locate text inside collapsed sections. When a match is found, the browser automatically reveals the section and fires a `beforematch` event, which the component listens for to keep its own open/closed state (icons, `aria-expanded`, `aria-hidden`, and the `accordionChange` event) in sync with the browser-triggered reveal.

- On browsers that don't support `hidden="until-found"` (detected via feature-detection on `beforematch`), the component falls back to a standard `hidden` attribute, matching prior behaviour.
- This does not change screen reader behaviour; `aria-hidden` continues to reflect the section's open/closed state as before.

## Technical Note: SSR (Server-Side Rendering) Considerations

The Ontario Accordion component supports server-side rendering, with a few considerations:

- **Language prop:** Pass `language` explicitly during SSR. If not provided, the component defaults to English (`'en'`).
- **Hydrated-only language events:** Global language events such as `setAppLanguage` and `headerLanguageToggled` only fire after hydration.
- **Framework guidance:** For deterministic SSR output, set `language` directly in markup (for example, `<ontario-accordion language="fr"></ontario-accordion>`).

<!-- Auto Generated Below -->

## Overview

Ontario Accordion presents collapsible sections of content.

For component guidance, see:

- https://designsystem.ontario.ca/components/detail/accordions.html
- https://designsystem.ontario.ca/developer-docs/components/ontario-accordion/

## Properties

| Property               | Attribute                | Description                                                                                                                                                                                                                                             | Type                                                 | Default     |
| ---------------------- | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- | ----------- |
| `accordionData`        | `accordion-data`         | Used to include individual accordion data for the accordion component. Accepts an array of Accordion (@see Accordion) items or a JSON string of that array. The `content` is rendered either as plain text or HTML depending on `accordionContentType`. | `Accordion[] \| string`                              | `undefined` |
| `expandCollapseButton` | `expand-collapse-button` | Custom Expand/Collapse button text.                                                                                                                                                                                                                     | `ExpandCollapseButtonDetails \| string \| undefined` | `undefined` |
| `language`             | `language`               | The language of the component. This is used for translations, and is by default set through event listeners checking for a language property from the header. If none are passed, it will default to English.                                           | `"en" \| "fr" \| undefined`                          | `undefined` |
| `name`                 | `name`                   | The name of the accordion component. This is not optional.                                                                                                                                                                                              | `string`                                             | `undefined` |

## Events

| Event             | Description                    | Type                                 |
| ----------------- | ------------------------------ | ------------------------------------ |
| `accordionChange` | Emits when open indexes change | `CustomEvent<AccordionChangeDetail>` |

## Dependencies

### Depends on

- [ontario-icon-chevron-up](../ontario-icon)
- [ontario-icon-chevron-down](../ontario-icon)

### Graph

```mermaid
graph TD;
  ontario-accordion --> ontario-icon-chevron-up
  ontario-accordion --> ontario-icon-chevron-down
  style ontario-accordion fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
