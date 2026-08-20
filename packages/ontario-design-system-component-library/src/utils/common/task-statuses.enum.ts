export const TaskStatus = {
	NotStarted: 'notStarted',
	InProgress: 'inProgress',
	Completed: 'completed',
	CannotStartYet: 'cannotStartYet',
	Error: 'error',
	Optional: 'optional',
} as const;

export type TaskStatus = (typeof TaskStatus)[keyof typeof TaskStatus];

export const TaskStatusValues = Object.values(TaskStatus) as ReadonlyArray<TaskStatus>;

export const DefaultTaskStatus: TaskStatus = TaskStatus.NotStarted;
export const CompletedTaskStatus: TaskStatus = TaskStatus.Completed;

export const TaskToBadgeColour = {
	notStarted: 'light-teal',
	inProgress: 'teal',
	completed: 'white',
	cannotStartYet: 'dark-grey',
	error: 'red',
	optional: 'grey',
} as const satisfies Record<TaskStatus, string>;

export type TaskBadgeColour = (typeof TaskToBadgeColour)[TaskStatus];
