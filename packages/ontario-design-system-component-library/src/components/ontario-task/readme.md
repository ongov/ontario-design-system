import { OntarioTask } from '@ongov/ontario-design-system-component-library-react';

# ontario-task

Use a task to show the user activities they have completed and what they have left to do.

## Usage guidance

Please refer to the [Ontario Design System](https://designsystem.ontario.ca/components/detail/task-list.html) for current documentation guidance for tables.

## Configuration

Once the component package has been installed (see Ontario Design System Component Library for installation instructions), the task component can be added directly into the project's code, and can be customized by updating the properties outlined [here](#properties). Additional information on custom types for header properties are outlined [here](#custom-property-types). Please see the [examples](#examples) below for how to configure the component.

## Examples

Example of a bare-bones task.

```html
<ontario-task label="Task" task-id="Task-id" task-status="notStarted" link="https://example.com"></ontario-task>
```

<div>
	<OntarioTask 
		label="Task" 
		task-id="Task-id" 
		task-status="notStarted" 
		link="https://example.com">
	</OntarioTask>
</div>

Example of a task with a hint.

```html
<ontario-task
	label="Task"
	task-id="Task-id"
	hint-text="A hint for task"
	hint-text-id="task-hint"
	task-status="completed"
	link="https://example.com"
></ontario-task>
```

<div>
	<OntarioTask
		label="Task"
		task-id="Task-id"
		hint-text="A hint for task"
		hint-text-id="task-hint"
		task-status="completed"
		link="https://example.com"
	></OntarioTask>
</div>

<!-- Auto Generated Below -->

## Properties

| Property         | Attribute         | Description                                                                                                                                                                                                         | Type                                                                                                                                                         | Default                   |
| ---------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------- |
| `deactivateLink` | `deactivate-link` | Disables the task link when set to `true`. Default is `false`, meaning the link will be active if provided.                                                                                                         | `boolean`                                                                                                                                                    | `false`                   |
| `headingLevel`   | `heading-level`   | Allows consumers to define the heading level for the task label. Accepts 'h2', 'h3' or 'h4'. Default is 'h3'.                                                                                                       | `"h2" \| "h3" \| "h4"`                                                                                                                                       | `'h3'`                    |
| `hintText`       | `hint-text`       | Used to include the ontario-hint-text component for the task. This is optional.                                                                                                                                     | `Hint \| string \| undefined`                                                                                                                                | `undefined`               |
| `label`          | `label`           | Specifies the label of the task. This is required to provide the name of the task.                                                                                                                                  | `string`                                                                                                                                                     | `undefined`               |
| `language`       | `language`        | The language of the component. This is used for translations, and is by default set through event listeners checking for a language property from the header. If no language is passed, it will default to English. | `"en" \| "fr" \| undefined`                                                                                                                                  | `undefined`               |
| `link`           | `link`            | Specifies an optional link associated with the task. If provided, clicking the task will navigate to this URL.                                                                                                      | `string \| undefined`                                                                                                                                        | `undefined`               |
| `taskId`         | `task-id`         | A unique id for the task. This is required.                                                                                                                                                                         | `string`                                                                                                                                                     | `undefined`               |
| `taskStatus`     | `task-status`     | Defines the status of the task, with default set to 'NotStarted'. Accepts values from `TaskStatuses` enum: `NotStarted`, `InProgress`, `Completed`, etc.                                                            | `TaskStatuses.CannotStartYet \| TaskStatuses.Completed \| TaskStatuses.Error \| TaskStatuses.InProgress \| TaskStatuses.NotStarted \| TaskStatuses.Optional` | `TaskStatuses.NotStarted` |

## Dependencies

### Depends on

- [ontario-hint-text](../ontario-hint-text)
- [ontario-badge](../ontario-badge)

### Graph

```mermaid
graph TD;
  ontario-task --> ontario-hint-text
  ontario-task --> ontario-badge
  style ontario-task fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
