import { OntarioInPageNavigation } from '@ongov/ontario-design-system-component-library-react';
import { OntarioInPageNavigationItem } from '@ongov/ontario-design-system-component-library-react';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# ontario-in-page-navigation-item

Use in-page navigation items to create the individual links inside an in-page navigation list.

This component is designed to be used as a child of [ontario-in-page-navigation](../ontario-in-page-navigation/). It renders a single in-page anchor link and keeps the item styling consistent with the Ontario Design System.

If you need router-specific link markup, you can provide custom content through the default slot. When slot content is supplied, it takes precedence over the `label` and `href` props.

## Usage guidance

Please refer to the [Ontario Design System in-page navigation guidance](https://designsystem.ontario.ca/components/detail/in-page-navigation.html) for the latest documentation.

## Configuration

Once the component package has been installed (see Ontario Design System Component Library for installation instructions), the item component can be added directly into the project's code, and can be customized by updating the properties outlined [here](#properties). Pass both `label` and `href` for the standard pattern. The component warns if either value is missing.

## Examples

1. Standard item

Demonstrates the basic required configuration.

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
<ontario-in-page-navigation-item label="Eligibility" href="#eligibility"></ontario-in-page-navigation-item>
```

```mdx-code-block
</TabItem>
<TabItem value="react">
```

```tsx
<OntarioInPageNavigationItem label="Eligibility" href="#eligibility"></OntarioInPageNavigationItem>
```

```mdx-code-block
</TabItem>
<TabItem value="angular">
```

```html
<ontario-in-page-navigation-item [label]="'Eligibility'" [href]="'#eligibility'"></ontario-in-page-navigation-item>
```

```mdx-code-block
</TabItem>
</Tabs>
```

<div>
	<OntarioInPageNavigationItem label="Eligibility" href="#eligibility"></OntarioInPageNavigationItem>
</div>

1. Item with long label

Demonstrates wrapping behaviour.

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
<ontario-in-page-navigation-item
	label="What to include in your contract before completing your purchase"
	href="#contract"
></ontario-in-page-navigation-item>
```

```mdx-code-block
</TabItem>
<TabItem value="react">
```

```tsx
<OntarioInPageNavigationItem
	label="What to include in your contract before completing your purchase"
	href="#contract"
></OntarioInPageNavigationItem>
```

```mdx-code-block
</TabItem>
<TabItem value="angular">
```

```html
<ontario-in-page-navigation-item
	[label]="'What to include in your contract before completing your purchase'"
	[href]="'#contract'"
></ontario-in-page-navigation-item>
```

```mdx-code-block
</TabItem>
</Tabs>
```

1. Current (active) item

Demonstrates the current section state.

```html
<ontario-in-page-navigation-item
	label="Eligibility"
	href="#eligibility"
	isCurrent="true"
></ontario-in-page-navigation-item>
```

When implemented, this should apply `aria-current="true"`.

1. Slot override pattern

When a router link is needed, use the default slot and supply the full anchor/link element.

```html
<ontario-in-page-navigation-item>
	<a class="ontario-in-page-navigation-item__link" href="#eligibility">Eligibility</a>
</ontario-in-page-navigation-item>
```

## Accessibility guidance

- Match the item label text to the destination section heading text as closely as possible.
- Ensure the `href` points to an in-page anchor that exists on the page.
- Keep the item inside the in-page navigation host so list semantics and styling stay consistent.

If the default slot is used, the consumer is responsible for providing a valid anchor element, correct `href` behavior, and accessible link text.

## Technical Note: SSR (Server-Side Rendering) Considerations

The Ontario In-Page Navigation Item component supports server-side rendering, with a few considerations:

- Pass `label` and `href` explicitly for deterministic output.
- Use a hash link such as `#eligibility` so the component can render the anchor correctly on first load.

### SSR-safe example:

```html
<ontario-in-page-navigation-item label="Eligibility" href="#eligibility"></ontario-in-page-navigation-item>
```

<!-- Auto Generated Below -->

## Properties

| Property    | Attribute    | Description                                                | Type                        | Default     |
| ----------- | ------------ | ---------------------------------------------------------- | --------------------------- | ----------- |
| `href`      | `href`       | In-page anchor target, for example #eligibility.           | `string \| undefined`       | `undefined` |
| `isCurrent` | `is-current` | Marks the current/active section.                          | `boolean \| undefined`      | `false`     |
| `label`     | `label`      | Link label for the in-page navigation item.                | `string \| undefined`       | `undefined` |
| `language`  | `language`   | Language used if localized text is required in the future. | `"en" \| "fr" \| undefined` | `undefined` |

---

_Built with [StencilJS](https://stenciljs.com/)_
