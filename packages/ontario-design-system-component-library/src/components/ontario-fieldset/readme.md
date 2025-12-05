import { OntarioFieldset} from '@ongov/ontario-design-system-component-library-react';
import { OntarioTextarea} from '@ongov/ontario-design-system-component-library-react';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# ontario-fieldset

Use the fieldset element to group related form elements.

## Usage guidance

Please refer to the [Ontario Design System](https://designsystem.ontario.ca/components/detail/fieldsets.html) for current documentation guidance for fieldsets.

## Configuration

Once the component package has been installed (see Ontario Design System Component Library for installation instructions), the fieldset component can be added directly into the project's code, and can be customized by updating the properties outlined [here](#properties). Please see the [examples](#examples) below for how to configure the component.

## Examples

Example of a fieldset component.

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
<ontario-fieldset legend="What is your delivery address?" level-size="heading">
	<!-- Other form web components can be added as children to group related form elements together -->
	<ontario-textarea ...></ontario-textarea>
	<ontario-radio-buttons ...></ontario-radio-buttons>
</ontario-fieldset>
```

```mdx-code-block
</TabItem>
<TabItem value="react">
```

```tsx
<OntarioFieldset legend="What is your delivery address?" legendSize="heading">
	{/* Other form web components can be added as children to group related form elements together */}
	{/* <OntarioTextarea ...></OntarioTextarea> */}
	{/* <OntarioRadioButtons ...></OntarioRadioButtons> */}
</OntarioFieldset>
```

```mdx-code-block
</TabItem>
<TabItem value="angular">
```

```html
<ontario-fieldset [legend]="'What is your delivery address?'" [legendSize]="'heading'">
	<!-- Other form web components can be added as children to group related form elements together -->
	<!-- <ontario-textarea ...></ontario-textarea> -->
	<!-- <ontario-radio-buttons ...></ontario-radio-buttons> -->
</ontario-fieldset>
```

```mdx-code-block
</TabItem>
</Tabs>
```

<OntarioFieldset
	legend="What is your delivery address?"
	level-size="heading">
<OntarioTextarea>...</OntarioTextarea>
</OntarioFieldset>

<!-- Auto Generated Below -->

## Properties

| Property     | Attribute     | Description                                                                  | Type                                | Default     |
| ------------ | ------------- | ---------------------------------------------------------------------------- | ----------------------------------- | ----------- |
| `legend`     | `legend`      | The text value used for the legend of the fieldset.                          | `string`                            | `undefined` |
| `legendSize` | `legend-size` | The size of the fieldset legend. If no prop is passed, it will be `default`. | `"default" \| "heading" \| "large"` | `'default'` |

---

_Built with [StencilJS](https://stenciljs.com/)_
