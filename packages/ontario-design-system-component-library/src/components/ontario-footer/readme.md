# ontario-footer



<!-- Auto Generated Below -->


## Properties

| Property                     | Attribute                       | Description                                                          | Type                                                                                                                                                                           | Default     |
| ---------------------------- | ------------------------------- | -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------- |
| `defaultOptions`             | `default-options`               | Stores the required links for all footers                            | `defaultOptions \| string`                                                                                                                                                     | `undefined` |
| `expandedThreeColumnOptions` | `expanded-three-column-options` | Stores the titles and content for the expanded three column footer   | `expandedThreeColumnOptions \| string \| undefined`                                                                                                                            | `undefined` |
| `expandedTwoColumnOptions`   | `expanded-two-column-options`   | Stores the titles and content for the expanded two column footer     | `expandedTwoColumnOptions \| string \| undefined`                                                                                                                              | `undefined` |
| `partnershipConnection`      | `partnership-connection`        | Stores the page's connection with Ontario for the partnership footer | `"Funded by Government of Ontario" \| "In partnership with Government of Ontario" \| "Licensed by Government of Ontario" \| "Sponsored by Government of Ontario" \| undefined` | `undefined` |
| `type`                       | `type`                          | Type of footer to be rendered                                        | `"default" \| "expandedThreeColumn" \| "expandedTwoColumn" \| "partnership"`                                                                                                   | `'default'` |


## Dependencies

### Depends on

- [ontario-icon-facebook](../ontario-icon)
- [ontario-icon-twitter](../ontario-icon)
- [ontario-icon-instagram](../ontario-icon)
- [ontario-icon-youtube](../ontario-icon)

### Graph
```mermaid
graph TD;
  ontario-footer --> ontario-icon-facebook
  ontario-footer --> ontario-icon-twitter
  ontario-footer --> ontario-icon-instagram
  ontario-footer --> ontario-icon-youtube
  style ontario-footer fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
