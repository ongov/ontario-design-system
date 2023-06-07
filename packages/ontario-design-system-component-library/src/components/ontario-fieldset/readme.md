# ontario-fieldset

Use the fieldset element to group related form elements.

## Usage guidance

Please refer to the [Ontario Design System](https://designsystem.ontario.ca/components/detail/fieldsets.html) for current documentation guidance for fieldsets.

## Configuration

Once the component package has been installed (see Ontario Design System Component Library for installation instructions), the fieldset component can be added directly into the project's code, and can be customized by updating the properties outlined [here](#properties). Please see the [examples](#examples) below for how to configure the component.

## Examples

Example of a fieldset component.

```html
<ontario-fieldset
	legend="What is your delivery address?"
	level-size="heading"
>
    <!-- Other form web components can be added as children to group related form elements together -->
    <ontario-textarea ...></ontario-textarea>
    <ontario-radio-buttons ...></ontario-radio-buttons>
</ontario-aside>
```

<!-- Auto Generated Below -->

## Properties

| Property     | Attribute     | Description                                                                  | Type                                | Default     |
| ------------ | ------------- | ---------------------------------------------------------------------------- | ----------------------------------- | ----------- |
| `legend`     | `legend`      | The text value used for the legend of the fieldset.                          | `string`                            | `undefined` |
| `legendSize` | `legend-size` | The size of the fieldset legend. If no prop is passed, it will be `default`. | `"default" \| "heading" \| "large"` | `'default'` |

---

_Built with [StencilJS](https://stenciljs.com/)_
