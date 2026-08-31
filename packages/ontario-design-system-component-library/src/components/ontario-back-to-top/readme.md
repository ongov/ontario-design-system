import { OntarioBackToTop } from '@ongov/ontario-design-system-component-library-react';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# ontario-back-to-top

Use a Back to Top button to help users quickly navigate to the top of a long page.

## Usage guidance

Please refer to the [Ontario Design System](https://designsystem.ontario.ca/components/detail/back-to-top.html) for current documentation guidance.

## Configuration

Once the component package has been installed (see Ontario Design System Component Library for installation instructions), the Back to Top component can be added directly into the project's code, and can be customized by updating the properties outlined [here](#properties). Please see the [examples](#examples) below for how to configure the component.

## Examples

By default, the Back to Top button will have its language set to English ('en'). However, a property can be passed to set the language to French by default. For example:

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
<ontario-back-to-top language="fr"> </ontario-back-to-top>
```

```mdx-code-block
</TabItem>
<TabItem value="react">
```

```tsx
<OntarioBackToTop language="fr"> </OntarioBackToTop>
```

```mdx-code-block
</TabItem>
<TabItem value="angular">
```

```html
<ontario-back-to-top [language]="'fr'"> </ontario-back-to-top>
```

```mdx-code-block
</TabItem>
</Tabs>
```

<div style={{height: '75px'}}>
    <div class="ontario-back-to-top">
       <OntarioBackToTop language="fr" style={{position: 'inherit', bottom: '50%', right:'65%'}}> </OntarioBackToTop>
    </div>
</div>

Otherwise, a default Back to Top button can be used as follows:

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
<ontario-back-to-top> </ontario-back-to-top>
```

```mdx-code-block
</TabItem>
<TabItem value="react">
```

```tsx
<OntarioBackToTop> </OntarioBackToTop>
```

```mdx-code-block
</TabItem>
<TabItem value="angular">
```

```html
<ontario-back-to-top> </ontario-back-to-top>
```

```mdx-code-block
</TabItem>
</Tabs>
```

<div class="ontario-back-to-top'">
    <div>
        <OntarioBackToTop style={{position: 'inherit', bottom: '50%', right:'65%', visbility:'visible'}}> </OntarioBackToTop>
    </div>
</div>

### Reserving space for other fixed/sticky elements

If another fixed or sticky element (for example, a feedback button or live chat launcher) is stacked below the Back to Top button, use the `bottomOffset` property to reserve additional vertical space so the two elements don't overlap as the viewport is resized. The value should be a valid CSS length (for example `"63px"`, `"4rem"`, or `var(--my-offset)`), and is added on top of the button's default `bottom: 5%` position, rather than replacing it. Pass a plain CSS length or CSS variable; avoid arbitrary CSS declarations.

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
<ontario-back-to-top bottom-offset="63px"> </ontario-back-to-top>
```

```mdx-code-block
</TabItem>
<TabItem value="react">
```

```tsx
<OntarioBackToTop bottomOffset="63px"> </OntarioBackToTop>
```

```mdx-code-block
</TabItem>
<TabItem value="angular">
```

```html
<ontario-back-to-top [bottomOffset]="'63px'"> </ontario-back-to-top>
```

```mdx-code-block
</TabItem>
</Tabs>
```

If more advanced positioning is needed than `bottomOffset` supports, overriding the component's positioning with custom CSS is also a supported pattern.

## Technical Note: SSR (Server-Side Rendering) Considerations

The Ontario Back to Top component supports server-side rendering, with a few considerations:

- **Scroll behaviour and visibility toggling:** These rely on window and scroll position, which are only available in the browser. These features activate after hydration.
- **Language prop:** Pass `language` explicitly during SSR.
- **Hydrated-only language events:** Language change events only fire after hydration.

<!-- Auto Generated Below -->

## Overview

Ontario Back to Top helps users quickly return to the top of long pages.

For component guidance, see:

- https://designsystem.ontario.ca/components/detail/back-to-top.html
- https://designsystem.ontario.ca/developer-docs/components/ontario-back-to-top/

## Properties

| Property       | Attribute       | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Type                        | Default     |
| -------------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- | ----------- |
| `bottomOffset` | `bottom-offset` | An additional distance to add to the button's default `bottom: 5%` positioning, expressed as a valid CSS length (for example `"63px"`, `"4rem"`). This is useful when other fixed/sticky elements (for example, a feedback button or live chat launcher) are stacked below the Back to Top button, and space needs to be reserved so the two don't overlap as the viewport is resized. The value is added on top of the existing `5%` offset (that is, `bottom: calc(5% + <bottomOffset>)`), rather than replacing it. | `string \| undefined`       | `undefined` |
| `language`     | `language`      | The language of the component. This is used for translations, and is by default set through event listeners checking for a language property from the header. If no language prop is passed, it will default to English.                                                                                                                                                                                                                                                                                               | `"en" \| "fr" \| undefined` | `undefined` |

---

_Built with [StencilJS](https://stenciljs.com/)_
