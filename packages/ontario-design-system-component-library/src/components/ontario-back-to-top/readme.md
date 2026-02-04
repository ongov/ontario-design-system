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

## Technical Note: SSR (Server-Side Rendering) Considerations

The Ontario Back to Top component is SSR-compatible and renders static markup during server-side rendering. For full functionality, client-side hydration is required. To ensure consistency:

- **Scroll behavior and visibility toggling** rely on window and scroll position, which are only available in the browser. These features activate after hydration.
- **Language Prop**: Language change events only fire in the browser after hydration. To ensure the correct language is rendered during SSR, it's recommended to pass the desired language explicitly as a prop (e.g., `<ontario-back-to-top language="fr"></ontario-back-to-top>`).

<!-- Auto Generated Below -->

## Properties

| Property   | Attribute  | Description                                                                                                                                                                                                              | Type                        | Default     |
| ---------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------- | ----------- |
| `language` | `language` | The language of the component. This is used for translations, and is by default set through event listeners checking for a language property from the header. If no language prop is passed, it will default to English. | `"en" \| "fr" \| undefined` | `undefined` |

---

_Built with [StencilJS](https://stenciljs.com/)_
