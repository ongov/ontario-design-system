import { OntarioSearchResultItem } from '@ongov/ontario-design-system-component-library-react';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# ontario-search-result-item

Use `ontario-search-result-item` to render a semantic option row for search suggestions.

## User guidance

Please refer to the [Ontario Design System](https://designsystem.ontario.ca/components/detail/autocomplete.html) for current documentation guidance.

## Example

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
<ontario-search-result-item label="Toronto" description="City in Ontario" value="Toronto"></ontario-search-result-item>
```

```mdx-code-block
</TabItem>
<TabItem value="react">
```

```tsx
<OntarioSearchResultItem label="Toronto" description="City in Ontario" value="Toronto"></OntarioSearchResultItem>
```

```mdx-code-block
</TabItem>
<TabItem value="angular">
```

```html
<ontario-search-result-item
	[label]="'Toronto'"
	[description]="'City in Ontario'"
	[value]="'Toronto'"
></ontario-search-result-item>
```

```mdx-code-block
</TabItem>
</Tabs>
```

## Example with custom slotted content

```html
<ontario-search-result-item value="Toronto">
	<div>
		<strong>Toronto</strong>
		<p>Population: 2.9M</p>
	</div>
</ontario-search-result-item>
```

<!-- Auto Generated Below -->
