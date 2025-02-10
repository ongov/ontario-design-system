// Define a single map for task statuses and their corresponding badge colours
export const TaskToBadgeColour = {
	notStarted: 'lightTeal',
	inProgress: 'teal',
	completed: 'white',
	cannotStartYet: 'darkGrey',
	error: 'red',
	optional: 'grey',
} as const;

// Derive the TaskStatuses from the keys of TaskToBadgeColour
export type TaskStatus = keyof typeof TaskToBadgeColour;
export const TaskStatuses = Object.keys(TaskToBadgeColour) as TaskStatus[];

// Define the type for badge colours
export type TaskBadgeColour = (typeof TaskToBadgeColour)[TaskStatus];
