# ontario-card

<!-- Auto Generated Below -->

## Properties

| Property                      | Attribute                        | Description                                                                                                                                                                                                                 | Type                                            | Default       |
| ----------------------------- | -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- | ------------- |
| `ariaLabelText`               | `aria-label-text`                | Provides more context as to what the card interaction is doing. This should only be used for accessibility purposes, if the card interaction requires more \* \* description than what the text provides. This is optional. | `string \| undefined`                           | `undefined`   |
| `cardLink`                    | `card-link`                      | Action link for when the card is clicked. This is optional.                                                                                                                                                                 | `string \| undefined`                           | `undefined`   |
| `cardType`                    | `card-type`                      | The type of card to render. If no type is passed, it will default to 'basic'.                                                                                                                                               | `"basic" \| "horizontal" \| "image" \| "title"` | `'basic'`     |
| `description`                 | `description`                    | Text to be displayed within the card description container. This is optional.                                                                                                                                               | `string \| undefined`                           | `undefined`   |
| `headerType`                  | `header-type`                    | The type of header to render. If no type is passed, it will default to 'default'.                                                                                                                                           | `"dark" \| "default" \| "light"`                | `'default'`   |
| `horizontalImagePositionType` | `horizontal-image-position-type` | The position of the image when the card-type is set to 'horizontal'. This prop is only necessry when the card-type is set to 'horizontal'.                                                                                  | `"left" \| "right" \| undefined`                | `'left'`      |
| `horizontalImageSizeType`     | `horizontal-image-size-type`     | The size of the image when the card-type is set to 'horizontal'. This prop is only necessry when the card-type is set to 'horizontal'.                                                                                      | `"one-fourth" \| "one-third" \| undefined`      | `'one-third'` |
| `image`                       | `image`                          | Image to be displayed within the card image container. This is optional.                                                                                                                                                    | `string \| undefined`                           | `undefined`   |
| `label`                       | `label`                          | Text to be displayed within the header.                                                                                                                                                                                     | `string`                                        | `undefined`   |

---

_Built with [StencilJS](https://stenciljs.com/)_
