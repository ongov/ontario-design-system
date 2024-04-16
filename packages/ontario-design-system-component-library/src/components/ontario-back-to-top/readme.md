import { OntarioBackToTop } from '@ongov/ontario-design-system-component-library-react';

# ontario-back-to-top

Use a Back to Top button to help users quickly navigate to the top of a long page.

## Usage guidance

Please refer to the [Ontario Design System](https://designsystem.ontario.ca/components/detail/back-to-top.html) for current documentation guidance.

## Configuration

Once the component package has been installed (see Ontario Design System Component Library for installation instructions), the Back to Top component can be added directly into the project's code, and can be customized by updating the properties outlined [here](#properties). Please see the [examples](#examples) below for how to configure the component.

## Examples

By default, the Back to Top button will have its language set to English ('en'). However, a property can be passed to set the language to French by default. For example:

```html
<ontario-back-to-top language="fr"> </ontario-back-to-top>
```

<div style={{height: '75px'}}>
    <div class="ontario-back-to-top">
       <OntarioBackToTop language="fr" style={{position: 'inherit', bottom: '50%', right:'65%'}}> </OntarioBackToTop>
    </div>
</div>

Otherwise, a default Back to Top button can be used as follows:

```html
<ontario-back-to-top> </ontario-back-to-top>
```

<div class="ontario-back-to-top'">
    <div>
        <OntarioBackToTop style={{position: 'inherit', bottom: '50%', right:'65%', visbility:'visible'}}> </OntarioBackToTop>
    </div>
</div>

<!-- Auto Generated Below -->

## Properties

| Property   | Attribute  | Description                                                                                                                                                                                                              | Type                        | Default     |
| ---------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------- | ----------- |
| `language` | `language` | The language of the component. This is used for translations, and is by default set through event listeners checking for a language property from the header. If no language prop is passed, it will default to English. | `"en" \| "fr" \| undefined` | `undefined` |

---

_Built with [StencilJS](https://stenciljs.com/)_
