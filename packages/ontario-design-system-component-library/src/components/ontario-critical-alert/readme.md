import { OntarioCriticalAlert } from '@ongov/ontario-design-system-component-library-react';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# ontario-critical-alert

Use a critical alert banner to bring a user’s attention to a significant situation, such as a site-wide service disruption or other critical information that will impact most users.

## Usage guidance

Please refer to the [Ontario Design System](https://designsystem.ontario.ca/components/detail/critical-alerts.html) for current documentation guidance.

## Configuration

Once the component package has been installed (see Ontario Design System Component Library for installation instructions), the input component can be added directly into the project's code, and can be customized by updating the properties outlined [here](#properties). Please see the [examples](#examples) below for how to configure the component.

## Examples

One way to use the critical alert component is by explicitly passing in the content through the `content` property - this will override any HTML content passed as a child of the critical alert component (see the next example), and the resulting content text passed into the `content` property will be displayed.

```mdx-code-block
<Tabs
	defaultValue="html"
	values={[
		{label: 'HTML', value: 'html'},
		{label: 'React', value: 'react'},
		{label: 'Angular', value: 'angular'},
	]}
	groupId="framework"
	queryString="framework">
<TabItem value="html">
```

```html
<ontario-critical-alert content="This is the content for the critical alert"> </ontario-critical-alert>
```

```mdx-code-block
</TabItem>
<TabItem value="react">
```

```tsx
<OntarioCriticalAlert content="This is the content for the critical alert"> </OntarioCriticalAlert>
```

```mdx-code-block
</TabItem>
<TabItem value="angular">
```

```html
<ontario-critical-alert [content]="'This is the content for the critical alert'"> </ontario-critical-alert>
```

```mdx-code-block
</TabItem>
</Tabs>
```

<div>
	<OntarioCriticalAlert content="This is the content for the critical alert"> </OntarioCriticalAlert>
</div>

Alternatively, HTML content can be supplied as the child of the critical alert rather than through the `content` property. Note that no paragraph tag is passed as the first child of the HTML content, as it is already included in the components render method.

```mdx-code-block
<Tabs
	defaultValue="html"
	values={[
		{label: 'HTML', value: 'html'},
		{label: 'React', value: 'react'},
		{label: 'Angular', value: 'angular'},
	]}
	groupId="framework"
	queryString="framework">
<TabItem value="html">
```

```html
<ontario-critical-alert>
	<a href="https://designsystem.ontario.ca/">Ontario Design System</a> web components now available!!!
</ontario-critical-alert>
```

```mdx-code-block
</TabItem>
<TabItem value="react">
```

```tsx
<OntarioCriticalAlert>
	<a href="https://designsystem.ontario.ca/">Ontario Design System</a> web components now available!!!
</OntarioCriticalAlert>
```

```mdx-code-block
</TabItem>
<TabItem value="angular">
```

```html
<ontario-critical-alert>
	<a href="https://designsystem.ontario.ca/">Ontario Design System</a> web components now available!!!
</ontario-critical-alert>
```

```mdx-code-block
</TabItem>
</Tabs>
```

<div>
	<OntarioCriticalAlert>
		<a href="https://designsystem.ontario.ca/">Ontario Design System</a> web components now available!!!
	</OntarioCriticalAlert>
</div>

## Technical Note: SSR (Server-Side Rendering) Considerations

The Ontario Critical Alert component supports two ways of defining content:

- Via the `content` prop (as a string)
- Via slotted children placed between the component's opening and closing tags

While both approaches work in the browser, only the `content` prop is reliably rendered during Server-Side Rendering (SSR).

### SSR-safe example:

During SSR, fallback content using `host.textContent` is not reliably available. This is why it is recommended to pass the critical alert content through the `content` prop. Eg:

```tsx
<OntarioCriticalAlert content="Emergency alert message."></OntarioCriticalAlert>
```

<!-- Auto Generated Below -->

## Properties

| Property  | Attribute | Description                                                                                                                                                                                  | Type                    | Default     |
| --------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- | ----------- |
| `content` | `content` | Content for critical alert message. It can be either string or HTML content. The content is already wrapped in a paragraph tag, so if using HTML content, the paragraph tag can be ommitted. | `HTMLElement \| string` | `undefined` |

---

_Built with [StencilJS](https://stenciljs.com/)_
