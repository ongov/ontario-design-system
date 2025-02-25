import { OntarioTaskList } from '@ongov/ontario-design-system-component-library-react';

# ontario-task-list

Use a task list to show the user activities they have completed and what they have left to do.

## Usage guidance

Please refer to the [Ontario Design System](https://designsystem.ontario.ca/components/detail/task-list.html) for current documentation guidance for tables.

## Configuration

Once the component package has been installed (see Ontario Design System Component Library for installation instructions), the task component can be added directly into the project's code, and can be customized by updating the properties outlined [here](#properties). Additional information on custom types for header properties are outlined [here](#custom-property-types). Please see the [examples](#examples) below for how to configure the component.

## Examples

Example of a task-list component with tasks inside.

```html
<ontario-task-list language="en">
	<ontario-task
		label="Task 1"
		task-id="Task-1-unique-id"
		hint-text="A hint for task 1"
		hint-text-id="task-hint-1"
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

## Custom property types

<!-- Auto Generated Below -->

## Properties

| Property   | Attribute  | Description                                                                                                                                                                                                   | Type                        | Default     |
| ---------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- | ----------- |
| `label`    | `label`    | The label prop used for the task list heading.                                                                                                                                                                | `string`                    | `undefined` |
| `language` | `language` | The language of the component. This is used for translations, and is by default set through event listeners checking for a language property from the header. If none are passed, it will default to English. | `"en" \| "fr" \| undefined` | `'en'`      |

---

_Built with [StencilJS](https://stenciljs.com/)_
