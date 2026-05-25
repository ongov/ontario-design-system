# ontario-summary-list-item

<!-- Auto Generated Below -->

## Overview

Ontario Summary List Item renders a single key/value row inside an ontario-summary-list.

For component guidance, see:

- https://designsystem.ontario.ca/components/detail/summary-list.html

## Properties

| Property                   | Attribute     | Description                                                                                                                                                                                                                                                                                                                                                                                                              | Type                                           | Default     |
| -------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------- | ----------- |
| `actionLink`               | `action-link` | Renders a row-level change link. Accepts a JSON string (for plain HTML) or an object (for JSX/framework use). `href` is required; `label` overrides the visible link text (defaults to the i18n "Change" / "Modifier" label). Screen-reader text is always auto-generated from `name`. Use the `action` slot instead when a router-aware link is needed. The slot takes precedence over this prop when both are present. | `SummaryListActionLink \| string \| undefined` | `undefined` |
| `compact`                  | `compact`     | When `true`, applies reduced row padding via the `.compact` modifier class.                                                                                                                                                                                                                                                                                                                                              | `boolean \| undefined`                         | `undefined` |
| `description` _(required)_ | `description` | The value/response rendered as `<dd>`. This prop is required.                                                                                                                                                                                                                                                                                                                                                            | `string`                                       | `undefined` |
| `language`                 | `language`    | The language of the component. Defaults to English via `validateLanguage`. Set automatically through event listeners from the header by default.                                                                                                                                                                                                                                                                         | `"en" \| "fr" \| undefined`                    | `undefined` |
| `name` _(required)_        | `name`        | The key/question label rendered as `<dt>`. This prop is required.                                                                                                                                                                                                                                                                                                                                                        | `string`                                       | `undefined` |

---

_Built with [StencilJS](https://stenciljs.com/)_
