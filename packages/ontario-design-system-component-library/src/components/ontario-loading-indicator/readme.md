# ontario-loading-indicator

<!-- Auto Generated Below -->

## Properties

| Property            | Attribute             | Description                                                                                                                                                                                                                                                                                                                                                 | Type                        | Default     |
| ------------------- | --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- | ----------- |
| `fullScreenOverlay` | `full-screen-overlay` | A boolean value to determine whether the loading indicator overlay covers the full page or not. By default, this is set to true. If set to false, the loading indicator overlay will be positioned absoltely relative to its container. Note that this will only work if the containing element has a style rule specifying it to be positioned relatively. | `boolean \| undefined`      | `true`      |
| `isLoading`         | `is-loading`          | A boolean value to determine whether or not the loading indicator is loading (i.e: is visible) or not.                                                                                                                                                                                                                                                      | `boolean`                   | `false`     |
| `language`          | `language`            | The language of the component. This is used for translations, and is by default set through event listeners checking for a language property from the header. If none are passed, it will default to English.                                                                                                                                               | `"en" \| "fr" \| undefined` | `'en'`      |
| `message`           | `message`             | The message that tells the user what is happening or why the user is waiting. If no message prop is passed, it will default to "Loading". Translations for this default message are included.                                                                                                                                                               | `string \| undefined`       | `undefined` |
| `type`              | `type`                | The type of loading indicator to render.                                                                                                                                                                                                                                                                                                                    | `"large" \| "small"`        | `'large'`   |

---

_Built with [StencilJS](https://stenciljs.com/)_
