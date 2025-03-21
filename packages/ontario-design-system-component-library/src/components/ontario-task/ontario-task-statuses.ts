export const TaskStatuses = ['notStarted', 'inProgress', 'completed'] as const;
export type TaskStatus = (typeof TaskStatuses)[number];

export const BadgeColors: Record<TaskStatus, 'black' | 'light-teal' | 'grey'> = {
	notStarted: 'grey',
	inProgress: 'light-teal',
	completed: 'black',
};
