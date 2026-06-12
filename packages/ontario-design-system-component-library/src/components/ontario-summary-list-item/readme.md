import { OntarioSummaryListItem } from '@ongov/ontario-design-system-component-library-react';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# ontario-summary-list-item

Use `ontario-summary-list-item` as a child inside `ontario-summary-list` to render a single key/value row.

## Usage guidance

Please refer to the [Ontario Design System](https://designsystem.ontario.ca/components/detail/summary-list.html) for current documentation guidance for summary lists.

## Configuration

After installing the component package, nest `ontario-summary-list-item` directly inside an `ontario-summary-list`. Each item renders a labelled key (`name`) and its corresponding value (`description`).

To add a row-level change link, either:

- pass `actionLink` with at least an `href` to have the component generate the visible label and screen-reader text, or
- use the `action` slot when a router-aware link is required, such as Next.js `Link` or Angular `routerLink`.

Use the `compact` prop to apply reduced row padding when a denser layout is needed.

## Examples

Basic usage with `name` and `description`.

```mdx-code-block
<Tabs
	defaultValue="html"
	values={[
		{ label: 'HTML', value: 'html' },
		{ label: 'React', value: 'react' },
		{ label: 'Angular', value: 'angular' },
	]}
	groupId="framework"
	queryString="framework">
<TabItem value="html">
```

```html
<ontario-summary-list caption="Personal information" heading-level="h3">
	<ontario-summary-list-item name="Last name" description="Smith"></ontario-summary-list-item>
	<ontario-summary-list-item name="First name" description="George"></ontario-summary-list-item>
</ontario-summary-list>
```

```mdx-code-block
</TabItem>
<TabItem value="react">
```

```tsx
<OntarioSummaryList caption="Personal information" headingLevel="h3">
	<OntarioSummaryListItem name="Last name" description="Smith" />
	<OntarioSummaryListItem name="First name" description="George" />
</OntarioSummaryList>
```

```mdx-code-block
</TabItem>
<TabItem value="angular">
```

```html
<ontario-summary-list [caption]="'Personal information'" [headingLevel]="'h3'">
	<ontario-summary-list-item [name]="'Last name'" [description]="'Smith'"></ontario-summary-list-item>
	<ontario-summary-list-item [name]="'First name'" [description]="'George'"></ontario-summary-list-item>
</ontario-summary-list>
```

```mdx-code-block
</TabItem>
</Tabs>
```

Row-level change link using `actionLink`.

```mdx-code-block
<Tabs
	defaultValue="html"
	values={[
		{ label: 'HTML', value: 'html' },
		{ label: 'React', value: 'react' },
		{ label: 'Angular', value: 'angular' },
	]}
	groupId="framework"
	queryString="framework">
<TabItem value="html">
```

```html
<ontario-summary-list caption="Personal information" heading-level="h3">
	<ontario-summary-list-item
		name="Last name"
		description="Smith"
		action-link='{"href":"/step/personal-info"}'
	></ontario-summary-list-item>
</ontario-summary-list>
```

```mdx-code-block
</TabItem>
<TabItem value="react">
```

```tsx
<OntarioSummaryList caption="Personal information" headingLevel="h3">
	<OntarioSummaryListItem name="Last name" description="Smith" actionLink={{ href: '/step/personal-info' }} />
</OntarioSummaryList>
```

```mdx-code-block
</TabItem>
<TabItem value="angular">
```

```html
<ontario-summary-list [caption]="'Personal information'" [headingLevel]="'h3'">
	<ontario-summary-list-item
		[name]="'Last name'"
		[description]="'Smith'"
		[actionLink]="{ href: '/step/personal-info' }"
	></ontario-summary-list-item>
</ontario-summary-list>
```

```mdx-code-block
</TabItem>
</Tabs>
```

Slot override pattern. Use the `action` slot when a router-aware link is required. Supply screen-reader text manually inside the slotted element.

```mdx-code-block
<Tabs
	defaultValue="react"
	values={[
		{ label: 'React', value: 'react' },
		{ label: 'Angular', value: 'angular' },
	]}
	groupId="framework"
	queryString="framework">
<TabItem value="react">
```

```tsx
<OntarioSummaryList caption="Personal information" headingLevel="h3">
	<OntarioSummaryListItem name="Last name" description="Smith">
		<Link slot="action" href="/step/personal-info">
			Change
			<span className="ontario-show-for-sr">
				your answer for: <q>Last name</q>
			</span>
		</Link>
	</OntarioSummaryListItem>
</OntarioSummaryList>
```

```mdx-code-block
</TabItem>
<TabItem value="angular">
```

```html
<ontario-summary-list [caption]="'Personal information'" [headingLevel]="'h3'">
	<ontario-summary-list-item [name]="'Last name'" [description]="'Smith'">
		<a slot="action" routerLink="/step/personal-info">
			Change
			<span class="ontario-show-for-sr">your answer for: <q>Last name</q></span>
		</a>
	</ontario-summary-list-item>
</ontario-summary-list>
```

```mdx-code-block
</TabItem>
</Tabs>
```

<!-- Auto Generated Below -->

## Overview

Ontario Summary List Item renders a single key/value row inside an ontario-summary-list.

For component guidance, see:

- https://designsystem.ontario.ca/components/detail/summary-list.html

## Properties

| Property                   | Attribute     | Description                                                                                                                                                                                                                                                                                                                                                                                                              | Type                                           | Default     |
| -------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------- | ----------- |
| `actionLink`               | `action-link` | Renders a row-level change link. Accepts a JSON string (for plain HTML) or an object (for JSX/framework use). `href` is required; `label` overrides the visible link text (defaults to the i18n "Change" / "Modifier" label). Screen-reader text is always auto-generated from `name`. Use the `action` slot instead when a router-aware link is needed. The slot takes precedence over this prop when both are present. | `SummaryListActionLink \| string \| undefined` | `undefined` |
| `compact`                  | `compact`     | When `true`, applies reduced row padding via the `.compact` modifier class.                                                                                                                                                                                                                                                                                                                                              | `boolean \| undefined`                         | `undefined` |
| `description` _(required)_ | `description` | The value/response rendered as `<dd>`. This prop is required.                                                                                                                                                                                                                                                                                                                                                            | `string`                                       | `undefined` |
| `language`                 | `language`    | The language of the component. Defaults to English via `validateLanguage`. Set automatically through event listeners from the header by default.                                                                                                                                                                                                                                                                         | `"en" \| "fr" \| undefined`                    | `undefined` |
| `name` _(required)_        | `name`        | The key/question label rendered as `<dt>`. This prop is required.                                                                                                                                                                                                                                                                                                                                                        | `string`                                       | `undefined` |

---

_Built with [StencilJS](https://stenciljs.com/)_
