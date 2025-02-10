export const TaskStatuses = ['notStarted', 'inProgress', 'completed', 'cannotStartYet', 'error', 'optional'] as const;
export type TaskStatus = (typeof TaskStatuses)[number];

export const TaskToBadgeColour = {
	notStarted: 'light-teal',
	inProgress: 'teal',
	completed: 'white',
	cannotStartYet: 'dark-grey',
	error: 'red',
	optional: 'grey',
} as const;

export type TaskBadgeColour = (typeof TaskToBadgeColour)[keyof typeof TaskToBadgeColour];
