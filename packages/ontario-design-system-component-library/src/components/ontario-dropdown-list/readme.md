# ontario-dropdown-list



<!-- Auto Generated Below -->


## Properties

| Property             | Attribute               | Description                                                                                                                                                                                                                                                                                                  | Type                             | Default     |
| -------------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------- | ----------- |
| `caption`            | `caption`               | The text to display as the label                                                                                                                                                                                                                                                                             | `InputCaption \| string`         | `undefined` |
| `elementId`          | `element-id`            | The ID for the dropdown list.                                                                                                                                                                                                                                                                                | `string \| undefined`            | `undefined` |
| `isEmptyStartOption` | `is-empty-start-option` | Whether or not the initial option displayed is empty. If set to true, it will render the default “select” text. If set to a string, it will render the string value.                                                                                                                                         | `boolean \| string \| undefined` | `false`     |
| `isRequired`         | `is-required`           | Determine whether the dropdown list is required. If required, add `is-required` attribute. Otherwise, the `optional` flag will appear.                                                                                                                                                                       | `boolean \| undefined`           | `false`     |
| `language`           | `language`              | The language of the component. This is used for translations, and is by default set through event listeners checking for a language property from the header. If none is passed, it will default to English.                                                                                                 | `string \| undefined`            | `'en'`      |
| `name`               | `name`                  | The name for the dropdown list.                                                                                                                                                                                                                                                                              | `string`                         | `undefined` |
| `options`            | `options`               | Each property will be passed in through an object in the options array. This can either be passed in as an object directly (if using react), or as a string in HTML. In the example below, the options are being passed in as a string and there are three dropdown options to be displayed in the fieldset. | `DropdownOption[] \| string`     | `undefined` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
