import { OntarioBlockquote } from '@ongov/ontario-design-system-component-library-react';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# ontario-blockquote

Use a blockquote to draw attention to a speaker quote or excerpt.

## Usage guidance

Please refer to the [Ontario Design System](https://designsystem.ontario.ca/components/detail/blockquote.html) for current documentation guidance for blockquotes.

## Configuration

Once the component package has been installed (see Ontario Design System Component Library for installation instructions), the blockquote component can be added directly into the project's code, and can be customized by updating the properties outlined [here](#properties). Please see the [examples](#examples) below for how to configure the component.

## Examples

Example of a blockquote component where the user is explicitly passing in a quote through the `quote` property - this will override the `Quote Content` value, and the resulting quote text passed into the `quote` property will be displayed.

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
<ontario-blockquote
	attribution="Survey respondent"
	quote="Access to high-quality child care is an issue that impacts our entire society."
>
	Quote Content
</ontario-blockquote>
```

```mdx-code-block
</TabItem>
<TabItem value="react">
```

```tsx
<OntarioBlockquote
	attribution="Survey respondent"
	quote="Access to high-quality child care is an issue that impacts our entire society."
>
	Quote Content
</OntarioBlockquote>
```

```mdx-code-block
</TabItem>
<TabItem value="angular">
```

```html
<ontario-blockquote
	[attribution]="'Survey respondent'"
	[quote]="'Access to high-quality child care is an issue that impacts our entire society.'"
>
	Quote Content
</ontario-blockquote>
```

```mdx-code-block
</TabItem>
</Tabs>
```

<div>
	<OntarioBlockquote
		attribution="Survey respondent"
		quote="Access to high-quality child care is an issue that impacts our entire society."
	>
		Quote Content
	</OntarioBlockquote>
</div>

This is another example of a long blockquote. The component calculates the length of the quote passed in through either the `quote` property or the blockquote content, and applies the appropriate classes and styles to display either a short or long blockquote appearance.

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
<ontario-blockquote attribution="Academic partners" byline="Ontario's Pedagogy for the Early Years">
	In the past few years, Ontario has gained a high level of respect for its visionary work in early education. The
	changes have been profound, and thoughtfully introduced. The views that guide the work are articulated clearly, and
	express great respect for children, families, and educators. We now have a solid foundation upon which to build a more
	coherent system.
</ontario-blockquote>
```

```mdx-code-block
</TabItem>
<TabItem value="react">
```

```tsx
<OntarioBlockquote attribution="Academic partners" byline="Ontario's Pedagogy for the Early Years">
	In the past few years, Ontario has gained a high level of respect for its visionary work in early education. The
	changes have been profound, and thoughtfully introduced. The views that guide the work are articulated clearly, and
	express great respect for children, families, and educators. We now have a solid foundation upon which to build a more
	coherent system.
</OntarioBlockquote>
```

```mdx-code-block
</TabItem>
<TabItem value="angular">
```

```html
<ontario-blockquote [attribution]="'Academic partners'" [byline]="'Ontario\\'s Pedagogy for the Early Years'">
	In the past few years, Ontario has gained a high level of respect for its visionary work in early education. The
	changes have been profound, and thoughtfully introduced. The views that guide the work are articulated clearly, and
	express great respect for children, families, and educators. We now have a solid foundation upon which to build a more
	coherent system.
</ontario-blockquote>
```

```mdx-code-block
</TabItem>
</Tabs>
```

<div>
	<OntarioBlockquote attribution="Academic partners" byline="Ontario's Pedagogy for the Early Years">
		In the past few years, Ontario has gained a high level of respect for its visionary work in early education. The
		changes have been profound, and thoughtfully introduced. The views that guide the work are articulated clearly, and
		express great respect for children, families, and educators. We now have a solid foundation upon which to build a more
		coherent system.
	</OntarioBlockquote>
</div>

## Technical Note: SSR (Server-Side Rendering) Considerations

The Ontario Blockquote component supports two ways of defining quotes:

- Via the `quote` prop (as a string)
- Via slotted children placed between the component's opening and closing tags

While both approaches work in the browser, only the `quote` prop is reliably rendered during Server-Side Rendering (SSR).

### SSR-safe example

During SSR, fallback content using `host.textContent` is not reliably available, which can result in empty quotes in the rendered output. This is why it is recommended to pass the blockquote quote through the `quote` prop. Eg:

```tsx
<OntarioBlockquote quote="Courage is resistance to fear, mastery of fear—not absence of fear."></OntarioBlockquote>
```

<!-- Auto Generated Below -->

## Properties

| Property      | Attribute     | Description                                                                                                                                 | Type                  | Default     |
| ------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- | ----------- |
| `attribution` | `attribution` | Optional text to be displayed as the attribution (the author) of the quote.                                                                 | `string \| undefined` | `undefined` |
| `byline`      | `byline`      | Optional text to be displayed for additional information about the attribution/author.                                                      | `string \| undefined` | `undefined` |
| `quote`       | `quote`       | Text to be displayed as the quote. Note that wrapping the quotes in quotations is not needed - this is handled through the component styles | `string`              | `undefined` |

---

_Built with [StencilJS](https://stenciljs.com/)_
