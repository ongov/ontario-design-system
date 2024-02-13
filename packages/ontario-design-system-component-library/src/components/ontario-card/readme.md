import { OntarioCard } from '@ontario-digital-service/ontario-design-system-component-library-react';

# ontario-card

Use a card to provide an entry point to information on a different page.

## Usage guidance

Please refer to the [Ontario Design System](https://designsystem.ontario.ca/components/detail/cards.html) for current documentation guidance. This component needs to be used in conjunction with the `ontario-card-collection` component. Please reference the [`ontario-card-collection`](../ontario-card-collection/) readme for further details.

## Configuration

Once the component package has been installed (see Ontario Design System Component Library for installation instructions), the `ontario-card` component can be added directly into the project's code, and can be customized by updating the properties outlined [here](#properties). Please see the [examples](#examples) below for how to configure the component.

## Examples

Example of a bare-bones `ontario-card` component where the `label` and `description` for the card is provided. The default card type will be `basic`, and default header type will be `default`.

```html
<ontario-card label="Card Title" description="Lorem Ipsum Lorem Ipsum"></ontario-card>
```

<OntarioCard label="Card Title" description="Lorem Ipsum Lorem Ipsum"></OntarioCard>

Example of an `ontario-card` component with an image, which includes the `cardType`, `headerType`, `image`, `label` and `description` properties.

```html
<ontario-card
	card-type="image"
	header-type="light"
	label="Card Title"
	image="https://picsum.photos/200/300"
	description="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
>
</ontario-card>
```

<div>
	<OntarioCard
		card-type="image"
		header-type="light"
		label="Card Title"
		image="https://picsum.photos/200/300"
		description="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
	></OntarioCard>
</div>

This is another example of an `ontario-card` component, where the user is passing in the horizontal card-type. This will
require more properties, including the `horizontalImagePositionType` and the `horizontalImageSizeType`.

```html
<ontario-card
	card-type="horizontal"
	label="Card Title"
	image="https://picsum.photos/200/300"
	horizontal-image-position-type="left"
	horizontal-image-size-type="one-fourth"
	description="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
>
</ontario-card>
```

<div>
	<OntarioCard
		card-type="horizontal"
		label="Card Title"
		image="https://picsum.photos/200/300"
		horizontal-image-position-type="left"
		horizontal-image-size-type="one-fourth"
		description="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
	></OntarioCard>
</div>

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
