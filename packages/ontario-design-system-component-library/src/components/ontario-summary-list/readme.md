import { OntarioSummaryList } from '@ongov/ontario-design-system-component-library-react';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# ontario-summary-list

Use a summary list to group labelled answers for review before a user submits or confirms their information.

## Usage guidance

Please refer to the [Ontario Design System](https://designsystem.ontario.ca/components/detail/summary-list.html) for current documentation guidance for summary lists.

## Configuration

After installing the component package, add the summary list directly to your project and configure it using the properties below.

`ontario-summary-list` provides the structural shell for the summary list and row content is supplied through the default slot, typically using `ontario-summary-list-item` children.

For a section-level change link, either:

- pass `captionActionLink` and let the component generate the visible label and screen-reader text, or
- use the `caption-action` slot when a router-aware link is required, such as Next.js `Link` or Angular `routerLink`.

## Examples

Minimal `captionActionLink` usage. Passing only `href` uses the default localized link label and auto-generated screen-reader text.

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
<ontario-summary-list caption="Contact details" heading-level="h3" caption-action-link='{"href":"/step/contact"}'>
	<ontario-summary-list-item name="Email" description="gsmith@gmail.com"></ontario-summary-list-item>
	<ontario-summary-list-item name="Phone number" description="123-456-7890"></ontario-summary-list-item>
</ontario-summary-list>
```

```mdx-code-block
</TabItem>
<TabItem value="react">
```

```tsx
<OntarioSummaryList caption="Contact details" headingLevel="h3" captionActionLink={{ href: '/step/contact' }}>
	<OntarioSummaryListItem name="Email" description="gsmith@gmail.com" />
	<OntarioSummaryListItem name="Phone number" description="123-456-7890" />
</OntarioSummaryList>
```

```mdx-code-block
</TabItem>
<TabItem value="angular">
```

```html
<ontario-summary-list
	[caption]="'Contact details'"
	[headingLevel]="'h3'"
	[captionActionLink]="{ href: '/step/contact' }"
>
	<ontario-summary-list-item [name]="'Email'" [description]="'gsmith@gmail.com'"></ontario-summary-list-item>
	<ontario-summary-list-item [name]="'Phone number'" [description]="'123-456-7890'"></ontario-summary-list-item>
</ontario-summary-list>
```

```mdx-code-block
</TabItem>
</Tabs>
```

<div>
	<OntarioSummaryList
		caption="Contact details"
		headingLevel="h3"
		captionActionLink={{ href: '/step/contact' }}
	>
	</OntarioSummaryList>
</div>

Full `captionActionLink` usage. Passing `{ href, label }` overrides the visible text; the component still auto-generates localized screen-reader text from `caption`.

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
<ontario-summary-list
	caption="Personal information"
	heading-level="h3"
	caption-action-link='{"href":"/step/personal-info","label":"Update"}'
>
	<ontario-summary-list-item name="Last name" description="Smith"></ontario-summary-list-item>
	<ontario-summary-list-item name="First name" description="George"></ontario-summary-list-item>
</ontario-summary-list>
```

```mdx-code-block
</TabItem>
<TabItem value="react">
```

```tsx
<OntarioSummaryList
	caption="Personal information"
	headingLevel="h3"
	captionActionLink={{ href: '/step/personal-info', label: 'Update' }}
>
	<OntarioSummaryListItem name="Last name" description="Smith" />
	<OntarioSummaryListItem name="First name" description="George" />
</OntarioSummaryList>
```

```mdx-code-block
</TabItem>
<TabItem value="angular">
```

```html
<ontario-summary-list
	[caption]="'Personal information'"
	[headingLevel]="'h3'"
	[captionActionLink]="{ href: '/step/personal-info', label: 'Update' }"
>
	<ontario-summary-list-item [name]="'Last name'" [description]="'Smith'"></ontario-summary-list-item>
	<ontario-summary-list-item [name]="'First name'" [description]="'George'"></ontario-summary-list-item>
</ontario-summary-list>
```

```mdx-code-block
</TabItem>
</Tabs>
```

<div>
	<OntarioSummaryList
		caption="Personal information"
		headingLevel="h3"
		captionActionLink={{ href: '/step/personal-info', label: 'Update' }}
	>
	</OntarioSummaryList>
</div>

Slot override pattern. Use the `caption-action` slot when a router-aware link is required. Supply screen-reader text manually inside the slotted element.

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
<OntarioSummaryList caption="Contact details" headingLevel="h3">
	<Link slot="caption-action" href="/step/contact">
		Change
		<span className="ontario-show-for-sr">
			your answer for: <q>Contact details</q>
		</span>
	</Link>
	<OntarioSummaryListItem name="Email" description="gsmith@gmail.com" />
	<OntarioSummaryListItem name="Phone number" description="123-456-7890" />
</OntarioSummaryList>
```

```mdx-code-block
</TabItem>
<TabItem value="angular">
```

```html
<ontario-summary-list caption="Contact details" heading-level="h3">
	<a slot="caption-action" routerLink="/step/contact">
		Change
		<span class="ontario-show-for-sr">your answer for: <q>Contact details</q></span>
	</a>
	<ontario-summary-list-item name="Email" description="gsmith@gmail.com"></ontario-summary-list-item>
	<ontario-summary-list-item name="Phone number" description="123-456-7890"></ontario-summary-list-item>
</ontario-summary-list>
```

```mdx-code-block
</TabItem>
</Tabs>
```

Row-level action links are consumer-authored through slotted children. Each `ontario-summary-list-item` accepts its own `action` slot.

```mdx-code-block
<Tabs
	defaultValue="html"
	values={[
		{ label: 'HTML', value: 'html' },
		{ label: 'React', value: 'react' },
	]}
	groupId="framework"
	queryString="framework">
<TabItem value="html">
```

```html
<ontario-summary-list caption="Personal information" heading-level="h3">
	<ontario-summary-list-item name="Last name" description="Smith">
		<a slot="action" href="/step/personal-info">
			Change
			<span class="ontario-show-for-sr">your answer for: <q>Last name</q></span>
		</a>
	</ontario-summary-list-item>
	<ontario-summary-list-item name="First name" description="George">
		<a slot="action" href="/step/personal-info">
			Change
			<span class="ontario-show-for-sr">your answer for: <q>First name</q></span>
		</a>
	</ontario-summary-list-item>
</ontario-summary-list>
```

```mdx-code-block
</TabItem>
<TabItem value="react">
```

```tsx
<OntarioSummaryList caption="Personal information" headingLevel="h3">
	<OntarioSummaryListItem name="Last name" description="Smith">
		<a slot="action" href="/step/personal-info">
			Change
			<span className="ontario-show-for-sr">
				your answer for: <q>Last name</q>
			</span>
		</a>
	</OntarioSummaryListItem>
	<OntarioSummaryListItem name="First name" description="George">
		<a slot="action" href="/step/personal-info">
			Change
			<span className="ontario-show-for-sr">
				your answer for: <q>First name</q>
			</span>
		</a>
	</OntarioSummaryListItem>
</OntarioSummaryList>
```

```mdx-code-block
</TabItem>
</Tabs>
```

## Custom property types

### SummaryListActionLink

Accepted as a JSON string (for plain HTML) or an object (for JSX/framework use).

```typescript
caption-action-link='{ "href": "/step/contact" }'
```

| Property | Description                                                                             | Type     | Required |
| -------- | --------------------------------------------------------------------------------------- | -------- | -------- |
| `href`   | The URL for the change link.                                                            | `string` | Yes      |
| `label`  | Overrides the visible link text. Defaults to the localized "Change" / "Modifier" label. | `string` | No       |

## Technical Note: SSR (Server-Side Rendering) Considerations

The Ontario Summary List component supports server-side rendering, with a few considerations:

- **Language prop:** Pass `language` explicitly during SSR for deterministic localized output for the generated change link.
- **Slot precedence:** The `caption-action` slot takes precedence over `captionActionLink` after hydration.
- **Hydrated-only language events:** Language toggle events (`setAppLanguage`, `headerLanguageToggled`) only update the component after hydration.
- **Framework guidance:** For deterministic SSR output, set `language` directly in markup (for example, `<ontario-summary-list language="fr"></ontario-summary-list>`).

<!-- Auto Generated Below -->

## Overview

Ontario Summary List groups labelled answers for review before a user submits or confirms information.

For component guidance, see:

- https://designsystem.ontario.ca/components/detail/summary-list.html
- https://designsystem.ontario.ca/developer-docs/components/ontario-summary-list/

## Properties

| Property               | Attribute             | Description                                                                                                                                                                                                                                                                                                                                                                                                                                    | Type                                                     | Default     |
| ---------------------- | --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- | ----------- |
| `caption` _(required)_ | `caption`             | The section heading text for this summary list group. This prop is required.                                                                                                                                                                                                                                                                                                                                                                   | `string`                                                 | `undefined` |
| `captionActionLink`    | `caption-action-link` | Renders a section-level change link in the heading row. Accepts a JSON string (for plain HTML) or an object (for JSX/framework use). The `href` property is required. An optional `label` overrides the visible link text; if omitted, the component uses the localized default ("Change" / "Modifier"). Screen-reader text is always auto-generated from `caption`. Use the `caption-action` slot instead when a router-aware link is needed. | `SummaryListActionLink \| string \| undefined`           | `undefined` |
| `columnRatio`          | `column-ratio`        | Adjusts the flex ratio between the key and value columns. Recommended when questions are short. If omitted, columns share equal width.                                                                                                                                                                                                                                                                                                         | `"1-1" \| "1-2" \| "1-3" \| "2-1" \| "2-3" \| undefined` | `undefined` |
| `fullWidth`            | `full-width`          | When `true`, the summary list expands to the full available width. Recommended when the list contains text area responses.                                                                                                                                                                                                                                                                                                                     | `boolean`                                                | `false`     |
| `headingLevel`         | `heading-level`       | The heading element to use for the section caption. Defaults to `h3`. The heading level should match the document hierarchy of the consuming page.                                                                                                                                                                                                                                                                                             | `"h2" \| "h3" \| "h4"`                                   | `'h3'`      |
| `language`             | `language`            | The language of the component. This is used for translations, and is by default set through event listeners checking for a language property from the header. If none are passed, it will default to English.                                                                                                                                                                                                                                  | `"en" \| "fr" \| undefined`                              | `undefined` |

---

_Built with [StencilJS](https://stenciljs.com/)_
