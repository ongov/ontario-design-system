import { OntarioLoadingIndicator } from '@ongov/ontario-design-system-component-library-react';

# ontario-loading-indicator

Use a loading indicator to let users know when an application or page element needs more time to process an action.

## Usage guidance

Please refer to the [Ontario Design System](https://designsystem.ontario.ca/components/detail/loading-indicator.html) for current documentation guidance.

## Configuration

Once the component package has been installed (see Ontario Design System Component Library for installation instructions), the loading component can be added directly into the project's code, and can be customized by updating the properties outlined [here](#properties). Please see the [examples](#examples) below for how to configure the component.

## Examples

Example of a bare-bones loading indicator, where the default message of "Loading" will be applied, and the indicator will take up the whole screen.

```html
<ontario-loading-indicator is-loading="true"></ontario-loading-indicator>
```

<div class="ontario-row">
    <div class="ontario-columns ontario-small-12">
        <div style={{position: 'relative', height: '25vh', zIndex:'1'}}>
            <OntarioLoadingIndicator is-loading="true" full-screen-overlay="false"></OntarioLoadingIndicator>
        </div>
    </div>
</div>

Example of a loading indicator that does not have a full screen overlay. The containing element is positioned relatively.
There is also a custom message passed to display as the loading content.

```html
<div class="ontario-row">
	<div class="ontario-columns ontario-small-12">
		<div style="position: relative; height: 25vh">
			<ontario-loading-indicator is-loading="true" full-screen-overlay="false" message="Calculating" />
		</div>
	</div>
</div>
```

<div class="ontario-row">
    <div class="ontario-columns ontario-small-12">
        <div style={{position: 'relative', height: '25vh', zIndex:'1'}}>
            <OntarioLoadingIndicator is-loading="true" full-screen-overlay="false" message="Calculating" />
        </div>
    </div>
</div>

<!-- Auto Generated Below -->

## Properties

| Property            | Attribute             | Description                                                                                                                                                                                                                                                                                                                                                      | Type                        | Default     |
| ------------------- | --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- | ----------- |
| `fullScreenOverlay` | `full-screen-overlay` | A boolean value to determine whether the loading indicator overlay covers the full page or not. By default, this is set to `true`. If set to `false`, the loading indicator overlay will be positioned absolutely relative to its container. Note that this will only work if the containing element has a style rule specifying it to be positioned relatively. | `boolean \| undefined`      | `true`      |
| `isLoading`         | `is-loading`          | A boolean value to determine whether or not the loading indicator is loading (i.e: is visible) or not.                                                                                                                                                                                                                                                           | `boolean`                   | `false`     |
| `language`          | `language`            | The language of the component. This is used for translations, and is by default set through event listeners checking for a language property from the header. If no language is passed, it will default to English.                                                                                                                                              | `"en" \| "fr" \| undefined` | `undefined` |
| `message`           | `message`             | The message that tells the user what is happening or why the user is waiting. If no message prop is passed, it will default to "Loading". Translations for this default message are included. This is optional.                                                                                                                                                  | `string \| undefined`       | `undefined` |
| `type`              | `type`                | The type of loading indicator to render.                                                                                                                                                                                                                                                                                                                         | `"large" \| "small"`        | `'large'`   |

---

_Built with [StencilJS](https://stenciljs.com/)_
