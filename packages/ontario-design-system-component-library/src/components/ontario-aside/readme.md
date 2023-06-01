# ontario-aside

Use asides to highlight in-page content.

## Usage guidance

Please refer to the [Ontario Design System](https://designsystem.ontario.ca/components/detail/callouts-asides.html) for current documentation guidance for asides.

## Configuration

Once the component package has been installed (see Ontario Design System Component Library for installation instructions), the aside component can be added directly into the project's code, and can be customized by updating the properties outlined [here](#properties). Please see the [examples](#examples) below for how to configure the component.

## Examples

Example of an aside component, where the user is explicitly passing in content through the `content` property.

```html
<ontario-aside
	heading-type="h2"
	heading-content-type="html"
	heading-content="<a href='#'>This is an aside heading that is a link</a>"
	content="This is the content for the aside component."
></ontario-aside>
```

This is another example of an aside. This time, the content is passed as a child of the `ontario-aside` component, which allows for HTML content to be passed. A `highlightColour` option is also passed.

```html
<ontario-aside
	heading-type="h4"
	heading-content-type="string"
	heading-content="This is an aside heading"
	highlight-colour="purple"
>
	<p>
		As of 2013, Canada is responsible for 1.6% of global emissions, with Ontario responsible for less than 0.4% of
		global emissions.
	</p>
	<p><a href="#">Learn more about Canada's globale missions.</a></p>
</ontario-aside>
```

<!-- Auto Generated Below -->

## Properties

| Property             | Attribute              | Description                                                                                                                                                                                                                                                                                | Type                                                                                                       | Default     |
| -------------------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------- | ----------- |
| `content`            | `content`              | Optional text to be displayed as the content for the aside component. If a string is passed, it will automatically be nested in a paragraph tag. HTML content can also be passed as the child/children of the aside component if additional/different elements for the content are needed. | `string \| undefined`                                                                                      | `undefined` |
| `headingContent`     | `heading-content`      | Text or HTML to be displayed as the heading of the aside. If the heading content should be displayed as HTML, the `headingContentType` needs to be set to `html`.                                                                                                                          | `string`                                                                                                   | `undefined` |
| `headingContentType` | `heading-content-type` | The type of the heading content. If no prop is passed, it will default to string.                                                                                                                                                                                                          | `"html" \| "string"`                                                                                       | `undefined` |
| `headingType`        | `heading-type`         | The heading level of the aside heading.                                                                                                                                                                                                                                                    | `"h2" \| "h3" \| "h4" \| "h5" \| "h6"`                                                                     | `undefined` |
| `highlightColour`    | `highlight-colour`     | Optional prop to choose the border colour of the aside. If none is passed, the default colour will be teal.                                                                                                                                                                                | `"blue" \| "gold" \| "green" \| "lime" \| "purple" \| "sky" \| "taupe" \| "teal" \| "yellow" \| undefined` | `'teal'`    |

---

_Built with [StencilJS](https://stenciljs.com/)_
