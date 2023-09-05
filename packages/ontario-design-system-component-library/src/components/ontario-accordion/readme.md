# ontario-accordion

<!-- Auto Generated Below -->

## Properties

| Property        | Attribute         | Description | Type                        | Default                              |
| --------------- | ----------------- | ----------- | --------------------------- | ------------------------------------ |
| `accordionData` | `accordion-data`  |             | `Accordion[] \| string`     | `undefined`                          |
| `ariaLabelText` | `aria-label-text` |             | `string`                    | `'Expand or collapse the accordion'` |
| `caption`       | `caption`         |             | `Caption \| string`         | `undefined`                          |
| `elementId`     | `element-id`      |             | `string`                    | `'accordion'`                        |
| `label`         | `label`           |             | `string`                    | `'Expand/Collapse'`                  |
| `language`      | `language`        |             | `"en" \| "fr" \| undefined` | `'en'`                               |
| `name`          | `name`            |             | `string`                    | `'Accordion Title'`                  |

## Dependencies

### Depends on

- [ontario-icon-chevron-up](../ontario-icon)
- [ontario-icon-chevron-down](../ontario-icon)

### Graph

```mermaid
graph TD;
  ontario-accordion --> ontario-icon-chevron-up
  ontario-accordion --> ontario-icon-chevron-down
  style ontario-accordion fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
