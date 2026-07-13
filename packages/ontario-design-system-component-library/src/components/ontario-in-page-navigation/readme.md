import { OntarioInPageNavigation } from '@ongov/ontario-design-system-component-library-react';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# ontario-in-page-navigation

Use in-page navigation (table of contents) to help users understand and navigate long, single-page content.

## Usage guidance

Please refer to the [Ontario Design System](https://designsystem.ontario.ca/components/detail/in-page-navigation.html) for current documentation guidance.

If no list item content is provided in the default slot, the component renders the heading and skip link without navigation links and logs a console warning to help authors catch the missing items.

## Accessibility guidance

- Match each navigation link label to the destination section heading text.
- Ensure each link `href` hash matches an existing section `id`.
- Place the component before the main section content it references.
- Select `headingLevel` (`h2`/`h3`/`h4`) based on surrounding heading hierarchy.

## Examples

Default usage with slotted list items:

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
<ontario-in-page-navigation heading="On this page">
	<li><a href="#overview">Overview</a></li>
	<li><a href="#eligibility">Eligibility</a></li>
	<li><a href="#apply">Apply</a></li>
</ontario-in-page-navigation>
```

```mdx-code-block
</TabItem>
<TabItem value="react">
```

```tsx
<OntarioInPageNavigation heading="On this page">
	<li>
		<a href="#overview">Overview</a>
	</li>
	<li>
		<a href="#eligibility">Eligibility</a>
	</li>
	<li>
		<a href="#apply">Apply</a>
	</li>
</OntarioInPageNavigation>
```

```mdx-code-block
</TabItem>
<TabItem value="angular">
```

```html
<ontario-in-page-navigation heading="On this page">
	<li><a href="#overview">Overview</a></li>
	<li><a href="#eligibility">Eligibility</a></li>
	<li><a href="#apply">Apply</a></li>
</ontario-in-page-navigation>
```

```mdx-code-block
</TabItem>
</Tabs>
```

The canonical authoring pattern in this branch is standard slotted `<li><a></a></li>` items. Once `ontario-in-page-navigation-item` is merged, this documentation will include both patterns and recommend component items for consistency.

Smooth scroll enabled (default):

```html
<ontario-in-page-navigation smooth-scroll="true"></ontario-in-page-navigation>
```

Smooth scroll disabled:

```html
<ontario-in-page-navigation smooth-scroll="false"></ontario-in-page-navigation>
```

Skip-link target customization:

```html
<ontario-in-page-navigation skip-link-target="main-content"></ontario-in-page-navigation>

<main id="main-content"></main>
```

Slot-based composition:

```html
<ontario-in-page-navigation>
	<li><a href="#overview">Overview</a></li>
	<li><a href="#eligibility">Eligibility</a></li>
</ontario-in-page-navigation>
```

<!-- Auto Generated Below -->

## Properties

| Property         | Attribute          | Description                                                           | Type                        | Default          |
| ---------------- | ------------------ | --------------------------------------------------------------------- | --------------------------- | ---------------- |
| `heading`        | `heading`          | Optional heading text. If omitted, the heading is resolved from i18n. | `string \| undefined`       | `undefined`      |
| `headingLevel`   | `heading-level`    | Heading level used for the component heading.                         | `"h2" \| "h3" \| "h4"`      | `'h2'`           |
| `language`       | `language`         | Language used for translated defaults.                                | `"en" \| "fr" \| undefined` | `undefined`      |
| `noTopBorder`    | `no-top-border`    | Removes the top border from the navigation container.                 | `boolean \| undefined`      | `false`          |
| `skipLinkTarget` | `skip-link-target` | Skip link target id (without #) or anchor (with #).                   | `string \| undefined`       | `'skip-to-main'` |
| `smoothScroll`   | `smooth-scroll`    | Enables smooth scrolling and hash updates for in-page links.          | `boolean \| undefined`      | `true`           |

---

_Built with [StencilJS](https://stenciljs.com/)_
