# ontario-task

<!-- Auto Generated Below -->

## Properties

| Property         | Attribute         | Description | Type                                          | Default     |
| ---------------- | ----------------- | ----------- | --------------------------------------------- | ----------- |
| `deactivateLink` | `deactivate-link` |             | `boolean`                                     | `false`     |
| `hintText`       | `hint-text`       |             | `Hint \| string \| undefined`                 | `undefined` |
| `label`          | `label`           |             | `string`                                      | `undefined` |
| `language`       | `language`        |             | `"en" \| "fr" \| undefined`                   | `undefined` |
| `link`           | `link`            |             | `string \| undefined`                         | `undefined` |
| `taskStatus`     | `task-status`     |             | `"completed" \| "inProgress" \| "notStarted"` | `undefined` |

## Dependencies

### Depends on

- [ontario-hint-text](../ontario-hint-text)
- [ontario-badge](../ontario-badge)

### Graph

```mermaid
graph TD;
  ontario-task --> ontario-hint-text
  ontario-task --> ontario-badge
  style ontario-task fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
