import { OntarioCard } from '@ongov/ontario-design-system-component-library-react';

# ontario-card

Use a card to provide an entry point to information on a different page.

## Usage guidance

Please refer to the [Ontario Design System](https://designsystem.ontario.ca/components/detail/cards.html) for current documentation guidance. This component needs to be used in conjunction with the `ontario-card-collection` component. Please reference the [`ontario-card-collection`](../ontario-card-collection/) readme for further details.

## Configuration

Once the component package has been installed (see Ontario Design System Component Library for installation instructions), the `ontario-card` component can be added directly into the project's code, and can be customized by updating the properties outlined [here](#properties). Please see the [examples](#examples) below for how to configure the component.

## Examples

Example of a bare-bones `ontario-card` component where the `label` and `description` for the card is provided.

```html
<ontario-card label="Card Title" description="Lorem Ipsum Lorem Ipsum"></ontario-card>
```

<OntarioCard label="Card Title" description="Lorem Ipsum Lorem Ipsum"></OntarioCard>

Example of an `ontario-card` component with an image, which includes the `headerColour`, `image`, `imageAltText`, `label` and `description` properties.

```html
<ontario-card
	label="Card Title"
	header-colour="sky"
	image="https://picsum.photos/300/225"
	image-alt-text="Randomly generated image from picsum."
	description="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
>
</ontario-card>
```

<div>
	<OntarioCard
		label="Card Title"
		headerColour="sky"
		image="https://picsum.photos/300/225"
		imageAltText="Randomly generated image from picsum."
		description="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
	></OntarioCard>
</div>

This is another example of an `ontario-card` component with a horizontal layout containing an image. This will require more properties, including the `horizontalImagePositionType` and the `horizontalImageSizeType`.

```html
<ontario-card
	layout-direction="horizontal"
	label="Card Title"
	image="https://picsum.photos/300/225"
	horizontal-image-position-type="left"
	horizontal-image-size-type="one-fourth"
	description="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
>
</ontario-card>
```

<div>
	<OntarioCard
		layoutDirection="horizontal"
		label="Card Title"
		image="https://picsum.photos/300/225"
		horizontalImagePositionType="left"
		horizontalImageSizeType="one-fourth"
		description="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
	></OntarioCard>
</div>

## Custom property types

### headerColour

The `header-colour` property supports a wide range of values, including:

- `dark-accent`
- `light-accent`
- `light-gold`
- `light-yellow`
- `light-taupe`
- `light-green`
- `light-lime`
- `light-teal`
- `light-sky`
- `light-blue`
- `light-purple`
- `light-orange`
- `light-red`
- `light-magenta`
- `gold`
- `yellow`
- `taupe`
- `green`
- `lime`
- `teal`
- `sky`
- `blue`
- `purple`
- `orange`
- `red`
- `magenta`

<!-- Auto Generated Below -->

## Properties

| Property                      | Attribute                        | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Type                                                                                                                                                                                                                                                                                                                                                                                     | Default       |
| ----------------------------- | -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `ariaLabelText`               | `aria-label-text`                | Provides more context as to what the card interaction is doing. This should only be used for accessibility purposes, if the card interaction requires more \* \* description than what the text provides. This is optional.                                                                                                                                                                                                                                                                                                  | `string \| undefined`                                                                                                                                                                                                                                                                                                                                                                    | `undefined`   |
| `cardLink`                    | `card-link`                      | Action link for when the card is clicked. This is optional.                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | `string \| undefined`                                                                                                                                                                                                                                                                                                                                                                    | `undefined`   |
| `description`                 | `description`                    | Text to be displayed within the card description container. This is optional.                                                                                                                                                                                                                                                                                                                                                                                                                                                | `string \| undefined`                                                                                                                                                                                                                                                                                                                                                                    | `undefined`   |
| `headerColour`                | `header-colour`                  | Set the card's header colour. This is optional.                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | `"teal" \| "gold" \| "yellow" \| "taupe" \| "green" \| "lime" \| "sky" \| "blue" \| "purple" \| "dark-accent" \| "light-accent" \| "light-gold" \| "light-yellow" \| "light-taupe" \| "light-green" \| "light-lime" \| "light-teal" \| "light-sky" \| "light-blue" \| "light-purple" \| "light-orange" \| "light-red" \| "light-magenta" \| "orange" \| "red" \| "magenta" \| undefined` | `undefined`   |
| `headingLevel`                | `heading-level`                  | The heading level that the label will be rendered as.                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | `"h2" \| "h3" \| "h4" \| "h5" \| "h6"`                                                                                                                                                                                                                                                                                                                                                   | `'h2'`        |
| `horizontalImagePositionType` | `horizontal-image-position-type` | The position of the image when the card-type is set to 'horizontal'. This prop is only necessry when the card-type is set to 'horizontal'.                                                                                                                                                                                                                                                                                                                                                                                   | `"left" \| "right" \| undefined`                                                                                                                                                                                                                                                                                                                                                         | `'left'`      |
| `horizontalImageSizeType`     | `horizontal-image-size-type`     | The size of the image when the card-type is set to 'horizontal'. This prop is only necessry when the card-type is set to 'horizontal'.                                                                                                                                                                                                                                                                                                                                                                                       | `"one-fourth" \| "one-third" \| undefined`                                                                                                                                                                                                                                                                                                                                               | `'one-third'` |
| `image`                       | `image`                          | Image to be displayed within the card image container. This is optional.                                                                                                                                                                                                                                                                                                                                                                                                                                                     | `string \| undefined`                                                                                                                                                                                                                                                                                                                                                                    | `undefined`   |
| `imageAltText`                | `image-alt-text`                 | Alt text for the card's image. This is optional prop, but may be required for an image due to accessibility requirements. You can find guidance on when to add alt text to an image on the Ontario.ca web content editing guide. https://www.ontario.ca/page/ontario-ca-web-content-editing-guide#alt-text-image-accessibility Note: This should default to an empty string ('') to ensure the alt attribute appears in the markup for decorative images. If left as undefined, the alt attribute will not render in markup. | `string \| undefined`                                                                                                                                                                                                                                                                                                                                                                    | `''`          |
| `label`                       | `label`                          | Text to be displayed within the header.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | `string`                                                                                                                                                                                                                                                                                                                                                                                 | `undefined`   |
| `layoutDirection`             | `layout-direction`               | The layout direction/orientation of the card. If no type is passed, it will default to 'vertical'.                                                                                                                                                                                                                                                                                                                                                                                                                           | `"horizontal" \| "vertical" \| undefined`                                                                                                                                                                                                                                                                                                                                                | `'vertical'`  |

---

_Built with [StencilJS](https://stenciljs.com/)_
