import { OntarioInPageNavigation } from '@ongov/ontario-design-system-component-library-react';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# ontario-in-page-navigation

Use in-page navigation (table of contents) to help users understand and navigate long, single-page content.

## Usage guidance

Please refer to the [Ontario Design System](https://designsystem.ontario.ca/components/detail/in-page-navigation.html) for current documentation guidance.

## Accessibility guidance

- Match each navigation link label to the destination section heading text.
- Ensure each link `href` hash matches an existing section `id`.
- Place the component before the main section content it references.
- Select `headingLevel` (`h2`/`h3`/`h4`) based on surrounding heading hierarchy.

## Examples

Default usage with child items:

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
	<ontario-in-page-navigation-item label="Overview" href="#overview"></ontario-in-page-navigation-item>
	<ontario-in-page-navigation-item label="Eligibility" href="#eligibility"></ontario-in-page-navigation-item>
	<ontario-in-page-navigation-item label="Apply" href="#apply"></ontario-in-page-navigation-item>
</ontario-in-page-navigation>
```

```mdx-code-block
</TabItem>
<TabItem value="react">
```

```tsx
<OntarioInPageNavigation heading="On this page">
	<ontario-in-page-navigation-item label="Overview" href="#overview" />
	<ontario-in-page-navigation-item label="Eligibility" href="#eligibility" />
	<ontario-in-page-navigation-item label="Apply" href="#apply" />
</OntarioInPageNavigation>
```

```mdx-code-block
</TabItem>
<TabItem value="angular">
```

```html
<ontario-in-page-navigation heading="On this page">
	<ontario-in-page-navigation-item label="Overview" href="#overview"></ontario-in-page-navigation-item>
	<ontario-in-page-navigation-item label="Eligibility" href="#eligibility"></ontario-in-page-navigation-item>
	<ontario-in-page-navigation-item label="Apply" href="#apply"></ontario-in-page-navigation-item>
</ontario-in-page-navigation>
```

```mdx-code-block
</TabItem>
</Tabs>
```

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

Slot-based composition with item children:

```html
<ontario-in-page-navigation>
	<ontario-in-page-navigation-item label="Overview" href="#overview"></ontario-in-page-navigation-item>
	<ontario-in-page-navigation-item label="Eligibility" href="#eligibility"></ontario-in-page-navigation-item>
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
