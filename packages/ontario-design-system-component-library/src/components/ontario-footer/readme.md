# ontario-footer

Use the simple (`default` type) footer for most applications and subsites. It includes links to accessibility, privacy, contact us and copyright information.

Use the expanded (`twoColumn` and `threeColumn` type) footer if you need an expanded version of the simple footer. It includes links to additional site-specific information.

## Usage guidance

Please refer to the [Ontario Design System Ontario.ca simple footer](https://designsystem.ontario.ca/components/detail/simple-footer.html) for current documentation guidance for the simple (default) footer.

Please refer to the [Ontario Design System Application expanded footer](https://designsystem.ontario.ca/components/detail/expanded-footer.html) for current documentation guidance for expanded footers (both two and three column variations).

## Configuration

Once the component package has been installed (see Ontario Design System Component Library for installation instructions), the footer component can be added directly into the project's code, and can be customized by updating the properties outlined [here](#properties). Additional information on custom types for header properties are outlined [here](#custom-property-types). Please see the [examples](#examples) below for how to configure the component.

## Examples

Note that the sample `footer-links` for the following examples are the same. Users should be mindful to update links (most notably, the `contactLink`) based on the application that is being developed.

Example of a simple (`default` type) footer component.

```html
<ontario-footer
	type="default"
	footer-links='{
		"accessibilityLink": "https://www.ontario.ca/page/accessibility",
		"privacyLink": "https://www.ontario.ca/page/privacy-statement",
		"contactLink": "https://www.ontario.ca/feedback/contact-us",
		"printerLink": "https://www.ontario.ca/page/copyright-information"
	}'
></ontario-footer>
```

Example of an expanded footer with two columns (`twoColumn` type).

```html
<ontario-footer
	type="twoColumn"
	footer-links='{
		"accessibilityLink": "https://www.ontario.ca/page/accessibility",
		"privacyLink": "https://www.ontario.ca/page/privacy-statement",
		"contactLink": "https://www.ontario.ca/feedback/contact-us",
		"printerLink": "https://www.ontario.ca/page/copyright-information"
	}'
	two-column-options='{
		"col1": {
			"title": "Ontario Design System",
			"content": [
				{
					"type": "text",
					"text": "The Ontario Design System provides principles, guidance and code to help teams design and build accessible, mobile-friendly government websites and digital services."
				},
				{
					"type": "list",
					"heading": "Latest release",
					"list": ["Built on: June 3, 2022", "Distribution package version 0.12.10"]
				}
			]
		},
		"col2": {
			"title": "Help us improve the design system",
			"content": [
				{
					"type": "html",
					"html": "You can check our <a href=#>help and feedback page</a> if you don&#8217;t see the component you need."
				}
			],
			"button": {
				"text": "Send us an email",
				"link": "#"
			}
		}
	}'
></ontario-footer>
```

Example of an expanded footer with three columns (`threeColumn` type).

```html
<ontario-footer
	type="expandedThreeColumn"
	footer-links='{
		"accessibilityLink": "https://www.ontario.ca/page/accessibility",
		"privacyLink": "https://www.ontario.ca/page/privacy-statement",
		"contactLink": "https://www.ontario.ca/feedback/contact-us",
		"printerLink": "https://www.ontario.ca/page/copyright-information"
	}'
	three-column-options='{
		"col1": {
			"title": "Ontario Design System",
			"content": [
				{
					"type": "text",
					"text": "The Ontario Design System provides principles, guidance and code to help teams design and build accessible, mobile-friendly government websites and digital services."
				}
			]
		},
		"col2": {
			"title": "Latest release",
			"content": [
				{
					"type": "list",
					"list": ["Built on: June 3, 2022", "Distribution package version 0.12.10"]
				}
			]
		},
		"col3": {
			"title": "Help us improve the design system",
			"content": [
				{
					"type": "html",
					"html": "You can check our <a href=#>help and feedback page</a> if you don&#8217;t see the component you need."
				}
			]
		}
	}'
></ontario-footer>
```

Example of footer with social media links, only `twoColumn` and `threeColumn` footer types support social media link.

```html
<ontario-footer
	type="expandedThreeColumn"
	footer-links='{
		"accessibilityLink": "https://www.ontario.ca/page/accessibility",
		"privacyLink": "https://www.ontario.ca/page/privacy-statement",
		"contactLink": "https://www.ontario.ca/feedback/contact-us",
		"printerLink": "https://www.ontario.ca/page/copyright-information"
	}'
	social-links='{
		"facebook": "https://www.facebook.com/ONgov",
		"instagram": "https://www.instagram.com/ongov",
		"twitter": "https://twitter.com/ONgov",
		"youtube": "https://www.youtube.com/ongov"
	}'
	three-column-options='{
		"col1": {
			"title": "Ontario Design System",
			"content": [
				{
					"type": "text",
					"text": "The Ontario Design System provides principles, guidance and code to help teams design and build accessible, mobile-friendly government websites and digital services."
				}
			]
		},
		"col2": {
			"title": "Latest release",
			"content": [
				{
					"type": "list",
					"list": ["Built on: June 3, 2022", "Distribution package version 0.12.10"]
				}
			]
		},
		"col3": {
			"title": "Help us improve the design system",
			"content": [
				{
					"type": "html",
					"html": "You can check our <a href=#>help and feedback page</a> if you don&#8217;t see the component you need."
				}
			],
			"button": {
				"text": "Send us an email",
				"link": "#"
			}
		}
	}'
></ontario-footer>
```

## Custom property types

### footerLinks

In most cases, the example default footer links displayed below will apply to both Ontario.ca and Ontario.ca subsites. However, developers should be mindful to update the `contactLink` to reflect the correct "Contact Us" page when using this component on a subsite.

<!-- prettier-ignore -->
```html
	footer-links='{
		"accessibilityLink": "https://www.ontario.ca/page/accessibility",
		"privacyLink": "https://www.ontario.ca/page/privacy-statement",
		"contactLink": "https://www.ontario.ca/feedback/contact-us",
		"printerLink": "https://www.ontario.ca/page/copyright-information"
	}'
```

| **Property name**   | **Type** | **Description**                                                 |
| ------------------- | -------- | --------------------------------------------------------------- |
| `accessibilityLink` | `string` | The URL for the accessibility footer link                       |
| `privacyLink`       | `string` | The URL for the privacy footer link                             |
| `contactLink`       | `string` | The URL for the contact us footer link                          |
| `printerLink`       | `string` | The URL for the printer footer link. This property is optional. |

### twoColumnOptions

The columns in the twoColumn type (i.e., col1 and col2) and in the threeColumn type (i.e., col1, col2, and col3) share the same structure (i.e [FooterColumnData](#FooterColumnData)) and can be configured according to website requirments.

<!-- prettier-ignore -->
```html
two-column-options='{
	"col1": {
		"title": "Ontario Design System",
		"content": [
			{
				"type": "text",
				"text": "The Ontario Design System provides principles, guidance and code to help teams design and build accessible, mobile-friendly government websites and digital services."
			},
			{
				"type": "list",
				"heading": "Latest release",
				"list": ["Built on: June 3, 2022", "Distribution package version 0.12.10"]
			}
		]
	},
	"col2": {
		"title": "Help us improve the design system",
		"content": [
			{
				"type": "html",
				"html": "You can check our <a href=#>help and feedback page</a> if you don&#8217;t see the component you need."
			}
		],
		"button": {
			"text": "Send us an email",
			"link": "#"
		}
	}
}'
```

#### twoColumn object

| **Property name** | **Type**           | **Description**                                            |
| ----------------- | ------------------ | ---------------------------------------------------------- |
| `col1`            | `FooterColumnData` | Title, body, links or button for the first footer column.  |
| `col2`            | `FooterColumnData` | Title, body, links or button for the second footer column. |

### threeColumnOptions

<!-- prettier-ignore -->
```html
	three-column-options='{
		"col1": {
			"title": "Ontario Design System",
			"content": [
				{
					"type": "text",
					"text": "The Ontario Design System provides principles, guidance and code to help teams design and build accessible, mobile-friendly government websites and digital services."
				}
			]
		},
		"col2": {
			"title": "Latest release",
			"content": [
				{
					"type": "list",
					"list": ["Built on: June 3, 2022", "Distribution package version 0.12.10"]
				}
			]
		},
		"col3": {
			"title": "Help us improve the design system",
			"content": [
				{
					"type": "html",
					"html": "You can check our <a href=#>help and feedback page</a> if you don&#8217;t see the component you need."
				}
			],
			"button": {
				"text": "Send us an email",
				"link": "#"
			}
		}
	}'
```

#### threeColumn object

| **Property name** | **Type**                               | **Description**                                            |
| ----------------- | -------------------------------------- | ---------------------------------------------------------- |
| `col1`            | `[FooterColumnData](FooterColumnData)` | Title, body, links or button for the first footer column.  |
| `col2`            | `[FooterColumnData](FooterColumnData)` | Title, body, links or button for the second footer column. |
| `col3`            | `[FooterColumnData](FooterColumnData)` | Title, body, links or button for the third footer column.  |

## Interfaces

#### FooterColumnData

| Property          | Type                                                    | Description                                                                                                                                                                                                                                                           |
| ----------------- | ------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| title             | string                                                  | A string that specifies the title for the footer column.                                                                                                                                                                                                              |
| content           | Array&lt;[FooterColumnContent](FooterColumnContent)&gt; | An array of FooterColumnContent objects that specifies the content for the footer column.                                                                                                                                                                             |
| button (optional) | { text: string, link: string }                          | An object that specifies the button for the footer column. It has the following properties: &lt;ul&gt;&lt;li&gt;text: a string that specifies the text for the button&lt;/li&gt;&lt;li&gt;link: a string that specifies the link for the button&lt;/li&gt;&lt;/ul&gt; |

#### FooterColumnContent

| Property | Type                | Description                                    |
| -------- | ------------------- | ---------------------------------------------- |
| heading  | string (optional)   | The heading of the content.                    |
| type     | FooterContentType   | The type of content.                           |
| text     | string (optional)   | It holds the text content if the type is text. |
| html     | string (optional)   | It holds the HTML content if the type is html. |
| list     | string[] (optional) | It holds the list content if the type is list. |

### FooterContentType

| Value | Description                            |
| ----- | -------------------------------------- |
| text  | Indicates that the content is a text.  |
| list  | Indicates that the content is a list.  |
| html  | Indicates that the content is an HTML. |

<!-- Auto Generated Below -->

## Properties

| Property             | Attribute              | Description                                                                                                                         | Type                                                                                                                                           | Default     |
| -------------------- | ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `footerLinks`        | `footer-links`         | Stores the required links for all footers Available options are 'accessibilityLink', 'privacyLink', 'contactLink' and 'printerLink' | `FooterLinks \| string`                                                                                                                        | `undefined` |
| `socialLinks`        | `social-links`         | Social media links to render in the footer Available options are 'facebook', 'twitter', 'instagram' and 'youtube'                   | `string \| { facebook?: string \| undefined; twitter?: string \| undefined; instagram?: string \| undefined; youtube?: string \| undefined; }` | `undefined` |
| `threeColumnOptions` | `three-column-options` | Stores the titles and content for the expanded three column footer                                                                  | `ThreeColumnOptions \| string \| undefined`                                                                                                    | `undefined` |
| `twoColumnOptions`   | `two-column-options`   | Stores the titles and content for the expanded two column footer                                                                    | `TwoColumnOptions \| string \| undefined`                                                                                                      | `undefined` |
| `type`               | `type`                 | Type of footer to be rendered Default: 'default'                                                                                    | `"default" \| "threeColumn" \| "twoColumn"`                                                                                                    | `'default'` |

---

_Built with [StencilJS](https://stenciljs.com/)_
