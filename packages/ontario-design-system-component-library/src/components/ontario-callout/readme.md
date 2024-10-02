import { OntarioCallout } from '@ongov/ontario-design-system-component-library-react';

# ontario-callout

Use callouts to highlight in-page content.

## Usage guidance

Please refer to the [Ontario Design System](https://designsystem.ontario.ca/components/detail/callouts-asides.html) for current documentation guidance for callouts.

## Configuration

Once the component package has been installed (see Ontario Design System Component Library for installation instructions), the callout component can be added directly into the project's code, and can be customized by updating the properties outlined [here](#properties). Please see the [examples](#examples) below for how to configure the component.

## Examples

Example of a callout component, where the user is explicitly passing in content through the `content` property.

```html
<ontario-callout
	heading-type="h2"
	heading-content-type="html"
	heading-content="<a href='#'>This is a callout heading that is a link</a>"
	content="This is the content for the callout component."
></ontario-callout>
```

<div>
	<OntarioCallout
		heading-type="h2"
		heading-content-type="html"
		heading-content="<a href='#'>This is a callout heading that is a link</a>"
		content="This is the content for the callout component."
	></OntarioCallout>
</div>

This is another example of an callout. This time, the content is passed as a child of the `ontario-callout` component, which allows for HTML content to be passed. A `highlightColour` option is also passed.

```html
<ontario-callout
	heading-type="h4"
	heading-content-type="string"
	heading-content="This is a callout heading"
	highlight-colour="gold"
>
	<p><a href="#">Sign up for email reminders</a> and we’ll notify you 60 and 30 days before your licence expires.</p>
</ontario-callout>
```

<div>
	<OntarioCallout 
		heading-type="h4" 
		heading-content-type="string" 
		heading-content="This is a callout heading" 
		highlight-colour="gold"
	>
		<p><a href="#">Sign up for email reminders</a> and we’ll notify you 60 and 30 days before your licence expires.</p>
	</OntarioCallout>
</div>

<!-- Auto Generated Below -->

## Properties

| Property             | Attribute              | Description                                                                                                                                                                                                                                                                                    | Type                                                                                                       | Default     |
| -------------------- | ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ----------- |
| `content`            | `content`              | Optional text to be displayed as the content for the callout component. If a string is passed, it will automatically be nested in a paragraph tag. HTML content can also be passed as the child/children of the callout component if additional/different elements for the content are needed. | `string \| undefined`                                                                                      | `undefined` |
| `headingContent`     | `heading-content`      | Text or HTML to be displayed as the heading of the callout. If the heading content should be displayed as HTML, the `headingContentType` needs to be set to `html`.                                                                                                                            | `string \| undefined`                                                                                      | `undefined` |
| `headingContentType` | `heading-content-type` | The type of the heading content. If no prop is passed, it will default to `string`.                                                                                                                                                                                                            | `"html" \| "string"`                                                                                       | `'string'`  |
| `headingType`        | `heading-type`         | The heading level of the callout heading.                                                                                                                                                                                                                                                      | `"h2" \| "h3" \| "h4" \| "h5" \| "h6" \| undefined`                                                        | `undefined` |
| `highlightColour`    | `highlight-colour`     | Optional prop to choose the border colour of the callout. If none is passed, the default colour will be teal.                                                                                                                                                                                  | `"blue" \| "gold" \| "green" \| "lime" \| "purple" \| "sky" \| "taupe" \| "teal" \| "yellow" \| undefined` | `'teal'`    |

---

_Built with [StencilJS](https://stenciljs.com/)_
