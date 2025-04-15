import { OntarioTaskList } from '@ongov/ontario-design-system-component-library-react';

# ontario-task-list

Use a task list to show the user activities they have completed and what they have left to do.

## Usage guidance

Please refer to the [Ontario Design System](https://designsystem.ontario.ca/components/detail/task-list.html) for current documentation guidance for task list.

## Prerequisites

Before using the `ontario-task-list` component, ensure the following:

1. The Ontario Design System Component Library is installed in your project. Refer to the [installation instructions](https://designsystem.ontario.ca/getting-started/installation.html) for guidance.
2. The component library is properly configured in your project (e.g., included in your build process if using a framework like React or Angular).

## Examples

Example of a task-list component with tasks inside.

```html
<ontario-task-list language="en">
	<ontario-task
		label="Task 1"
		task-id="Task-1-unique-id"
		hint-text="A hint for task 1"
		task-status="completed"
		link="https://example.com"
	></ontario-task>
	<ontario-task
		label="Task 2"
		task-id="Task-2-unique-id"
		hint-text="A hint for task 2"
		task-status="inProgress"
		link="https://example.com"
		deactivate-link="true"
	>
</ontario-task-list>
```

<div>
	<ontario-task-list language="en">
		<ontario-task
			label="Task 1"
			task-id="Task-1-unique-id"
			hint-text="A hint for task 1"
			task-status="completed"
			link="https://example.com"
		></ontario-task>
		<ontario-task
			label="Task 2"
			task-id="Task-2-unique-id"
			hint-text="A hint for task 2"
			task-status="inProgress"
			link="https://example.com"
			deactivate-link="true"
		>
	</ontario-task-list>
</div>

<!-- Auto Generated Below -->

## Properties

| Property   | Attribute  | Description                                                                                                                                                                                                   | Type                        | Default     |
| ---------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- | ----------- |
| `label`    | `label`    | The label prop used for the task list heading.                                                                                                                                                                | `string`                    | `undefined` |
| `language` | `language` | The language of the component. This is used for translations, and is by default set through event listeners checking for a language property from the header. If none are passed, it will default to English. | `"en" \| "fr" \| undefined` | `'en'`      |

---

_Built with [StencilJS](https://stenciljs.com/)_
