import { OntarioBlockquote } from '@ongov/ontario-design-system-component-library-react';

# ontario-blockquote

Use a blockquote to draw attention to a speaker quote or excerpt.

## Usage guidance

Please refer to the [Ontario Design System](https://designsystem.ontario.ca/components/detail/blockquote.html) for current documentation guidance for blockquotes.

## Configuration

Once the component package has been installed (see Ontario Design System Component Library for installation instructions), the blockquote component can be added directly into the project's code, and can be customized by updating the properties outlined [here](#properties). Please see the [examples](#examples) below for how to configure the component.

## Examples

Example of a blockquote component where the user is explicitly passing in a quote through the `quote` property - this will override the `Quote Content` value, and the resulting quote text passed into the `quote` property will be displayed.

```html
<ontario-blockquote
	attribution="Survey respondent"
	quote="Access to high-quality child care is an issue that impacts our entire society."
>
	Quote Content
</ontario-blockquote>
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

```html
<ontario-blockquote attribution="Academic partners" byline="Ontario's Pedagogy for the Early Years">
	In the past few years, Ontario has gained a high level of respect for its visionary work in early education. The
	changes have been profound, and thoughtfully introduced. The views that guide the work are articulated clearly, and
	express great respect for children, families, and educators. We now have a solid foundation upon which to build a more
	coherent system.
</ontario-blockquote>
```

<div>
	<OntarioBlockquote attribution="Academic partners" byline="Ontario's Pedagogy for the Early Years">
		In the past few years, Ontario has gained a high level of respect for its visionary work in early education. The
		changes have been profound, and thoughtfully introduced. The views that guide the work are articulated clearly, and
		express great respect for children, families, and educators. We now have a solid foundation upon which to build a more
		coherent system.
	</OntarioBlockquote>
</div>

<!-- Auto Generated Below -->

## Properties

| Property      | Attribute     | Description                                                                                                                                 | Type                  | Default     |
| ------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- | ----------- |
| `attribution` | `attribution` | Optional text to be displayed as the attribution (the author) of the quote.                                                                 | `string \| undefined` | `undefined` |
| `byline`      | `byline`      | Optional text to be displayed for additional information about the attribution/author.                                                      | `string \| undefined` | `undefined` |
| `quote`       | `quote`       | Text to be displayed as the quote. Note that wrapping the quotes in quotations is not needed - this is handled through the component styles | `string`              | `undefined` |

---

_Built with [StencilJS](https://stenciljs.com/)_
