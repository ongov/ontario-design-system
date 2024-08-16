# ontario-in-page-navigation

<!-- Auto Generated Below -->

## Properties

| Property     | Attribute     | Description                                                                                                                                                                                                                                   | Type                                      | Default          |
| ------------ | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- | ---------------- |
| `heading`    | `heading`     | The string for the inpage navigation heading. If a string is passed, the h2 tag will be populated with the passed string. Else, the default string "On this page" will be used.                                                               | `string \| undefined`                     | `'On this page'` |
| `items`      | `items`       | The array of objects for navigation links, link text to display and the linked section id href. If the array items are passed, the navigation list will populate with the passed link text and href.                                          | `NavigationItem[] \| string \| undefined` | `undefined`      |
| `twoColumns` | `two-columns` | The boolean value for changing the list from one column to two. By default the links will appear in one column. In case the user passes the value `true` AND if the number of links is 13 or more, the list items will appear in two columns. | `boolean \| undefined`                    | `undefined`      |

---

_Built with [StencilJS](https://stenciljs.com/)_
