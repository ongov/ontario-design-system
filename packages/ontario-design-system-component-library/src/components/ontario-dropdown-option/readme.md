# ontario-dropdown-option

<!-- Auto Generated Below -->

## Overview

Ontario Dropdown Option represents a single, pre-defined option to be consumed by an
`ontario-dropdown-list`.

This component does not render any visible UI of its own. Native `<option>` elements cannot be
slotted into a `<select>` that is rendered inside a shadow root, so `ontario-dropdown-list`
instead reads its `ontario-dropdown-option` light DOM children directly (their `value`,
`selected`, and text content) and re-renders them as native `<option>` elements inside its own
shadow root.

As an alternative to `ontario-dropdown-option` children, options can also be passed to
`ontario-dropdown-list` using its `options` prop, as an array of objects (or a JSON string).
If both are provided, the `options` prop takes precedence.

For component guidance, see:

- https://designsystem.ontario.ca/components/detail/dropdown-lists.html
- https://designsystem.ontario.ca/developer-docs/components/ontario-dropdown-list/

## Properties

| Property   | Attribute  | Description                                                                                                                                                                                                                                                             | Type                   | Default     |
| ---------- | ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- | ----------- |
| `selected` | `selected` | A boolean value to determine whether or not the dropdown option is pre-selected. If no option is marked as selected, the first available option (or the empty start option, if `isEmptyStartOption` is enabled on the parent `ontario-dropdown-list`) will be selected. | `boolean \| undefined` | `false`     |
| `value`    | `value`    | The value for the dropdown option. Each value must be unique to the option within the parent `ontario-dropdown-list`.                                                                                                                                                   | `string`               | `undefined` |

---

_Built with [StencilJS](https://stenciljs.com/)_
