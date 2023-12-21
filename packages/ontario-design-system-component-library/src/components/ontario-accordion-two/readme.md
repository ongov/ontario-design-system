# ontario-accordion-two

<!-- Auto Generated Below -->

## Properties

| Property               | Attribute                | Description                                                                                                                                                                                                                                                                    | Type                                                 | Default     |
| ---------------------- | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------- | ----------- |
| `accordionData`        | `accordion-data`         | Used to include individual accordion data for the accordion component. This is passed in as an array of objects with key-value pairs. The `content` is expecting a string, that can either be written as HTML or a just a plain string, depending on the accordionContentType. | `Accordion[] \| string`                              | `undefined` |
| `expandCollapseButton` | `expand-collapse-button` | Custom Expand/Collapse button text.                                                                                                                                                                                                                                            | `ExpandCollapseButtonDetails \| string \| undefined` | `undefined` |
| `isOpen`               | `is-open`                | Used to show whether the accordion is opened or closed.                                                                                                                                                                                                                        | `boolean`                                            | `false`     |
| `language`             | `language`               | The language of the component. This is used for translations, and is by default set through event listeners checking for a language property from the header. If none are passed, it will default to English.                                                                  | `"en" \| "fr" \| undefined`                          | `'en'`      |
| `name`                 | `name`                   | The name of the accordion component. This is not optional.                                                                                                                                                                                                                     | `string`                                             | `undefined` |

---

_Built with [StencilJS](https://stenciljs.com/)_
