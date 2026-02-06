import { OntarioIconAccessibility } from '@ongov/ontario-design-system-component-library-react';
import { OntarioIconBookmarkOff } from '@ongov/ontario-design-system-component-library-react';
import { OntarioIconBookmarkOn } from '@ongov/ontario-design-system-component-library-react';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# ontario-icon

Use simple, easy-to-understand icons from Material Design to help guide users.

Icons are a visual representation of a single and simple object, action or idea. If you need to communicate more complicated concepts, consider an illustration or infographic.

## Usage guidance

Please refer to the [Ontario Design System primary icons](https://designsystem.ontario.ca/components/detail/icons-primary.html) and [Ontario Design System secondary icons](https://designsystem.ontario.ca/components/detail/icons-secondary.html) for current documentation guidance.

## Configuration

Once the component package has been installed (see Ontario Design System Component Library for installation instructions), the icon component can be added directly into the project's code, and can be customized by updating the properties outlined [here](#properties). Please see the [examples](#examples) below for how to configure the component. Check [here](https://designsystem.ontario.ca/components/detail/icons-primary.html) to see the list of all available primary icons. Check [here](https://designsystem.ontario.ca/components/detail/icons-secondary.html) to see the list of all available secondary icons.

## Examples

Example of a bare-bones icon component, the user is referencing the Ontario Design System's accessibility icon. The default colour will display as black.

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
<ontario-icon-accessibility></ontario-icon-accessibility>
```

```mdx-code-block
</TabItem>
<TabItem value="react">
```

```tsx
<OntarioIconAccessibility></OntarioIconAccessibility>
```

```mdx-code-block
</TabItem>
<TabItem value="angular">
```

```html
<ontario-icon-accessibility></ontario-icon-accessibility>
```

```mdx-code-block
</TabItem>
</Tabs>
```

<div>
	<OntarioIconAccessibility></OntarioIconAccessibility>
</div>

Example of a bookmark icon, where the user is is passing a colour property of 'Grey'.

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
<ontario-icon-bookmark-off colour="grey" icon-width="32"></ontario-icon-bookmark-off>
<ontario-icon-bookmark-on colour="grey" icon-width="32"></ontario-icon-bookmark-on>
```

```mdx-code-block
</TabItem>
<TabItem value="react">
```

```tsx
<OntarioIconBookmarkOff colour="grey" iconWidth={32}></OntarioIconBookmarkOff>
<OntarioIconBookmarkOn colour="grey" iconWidth={32}></OntarioIconBookmarkOn>
```

```mdx-code-block
</TabItem>
<TabItem value="angular">
```

```html
<ontario-icon-bookmark-off [colour]="'grey'" [iconWidth]="32"></ontario-icon-bookmark-off>
<ontario-icon-bookmark-on [colour]="'grey'" [iconWidth]="32"></ontario-icon-bookmark-on>
```

```mdx-code-block
</TabItem>
</Tabs>
```

<div>
	<OntarioIconBookmarkOff colour="grey" iconWidth={32}></OntarioIconBookmarkOff>
	<OntarioIconBookmarkOn colour="grey" iconWidth={32}></OntarioIconBookmarkOn>
</div>

<!-- Auto Generated Below -->

## Properties

| Property     | Attribute     | Description                                                                                                                                  | Type                                                  | Default   |
| ------------ | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- | --------- |
| `ariaHidden` | `aria-hidden` | Whether the icon should be hidden from assistive technologies. When set to "true", the icon will have aria-hidden="true" on the SVG element. | `null \| string`                                      | `null`    |
| `colour`     | `colour`      | Set the icon's colour.                                                                                                                       | `"black" \| "blue" \| "grey" \| "inherit" \| "white"` | `'black'` |
| `iconWidth`  | `icon-width`  | The icon width will autogenerate the height since the icons are in square format, thus preserving the aspect ratio.                          | `16 \| 24 \| 32 \| 48`                                | `24`      |

---

_Built with [StencilJS](https://stenciljs.com/)_
