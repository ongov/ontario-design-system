# ontario-in-page-navigation

<!-- Auto Generated Below -->

## Properties

| Property     | Attribute     | Description                                                                                                                                                                                                                                   | Type                                      | Default          |
| ------------ | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- | ---------------- |
| `heading`    | `heading`     | The string for the inpage navigation heading. If a string is passed, the h2 tag will be populated with the passed string. Else, the default string "On this page" will be used for the heading.                                               | `string \| undefined`                     | `'On this page'` |
| `items`      | `items`       | The 2d array for navigation links, link text to display and the linked section id href. If the array items are passed, the navigation list will populate with the passed link text and href. Else, the default navigation items will be used. | `NavigationItem[] \| string \| undefined` | `undefined`      |
| `twoColumns` | `two-columns` | The boolean value for changing the list from one column to two. By default the links will appear in one column, in case the user passes the value `true`, the list items will appear in two columns.                                          | `boolean \| undefined`                    | `false`          |

---

_Built with [StencilJS](https://stenciljs.com/)_
