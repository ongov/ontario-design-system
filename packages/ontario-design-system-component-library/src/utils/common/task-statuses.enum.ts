// Define an enum for task statuses
export enum TaskStatuses {
	NotStarted = 'notStarted',
	InProgress = 'inProgress',
	Completed = 'completed',
	CannotStartYet = 'cannotStartYet',
	Error = 'error',
	Optional = 'optional',
}

// Map task statuses to badge colours
export const TaskToBadgeColour = {
	[TaskStatuses.NotStarted]: 'light-teal',
	[TaskStatuses.InProgress]: 'teal',
	[TaskStatuses.Completed]: 'white',
	[TaskStatuses.CannotStartYet]: 'dark-grey',
	[TaskStatuses.Error]: 'red',
	[TaskStatuses.Optional]: 'grey',
} as const;

// Define the type for task statuses
export type TaskStatus = keyof typeof TaskStatuses;

// Define the type for badge colours
export type TaskBadgeColour = (typeof TaskToBadgeColour)[TaskStatuses];
