export const summaryListHeadingLevelDefinitions = ['h2', 'h3', 'h4'] as const;
export type SummaryListHeadingLevel = (typeof summaryListHeadingLevelDefinitions)[number];

export const summaryListColumnRatioDefinitions = ['1-1', '1-2', '1-3', '2-1', '2-3'] as const;
export type SummaryListColumnRatio = (typeof summaryListColumnRatioDefinitions)[number];

export const summaryListRatioMap: Record<SummaryListColumnRatio | 'default', { key: string; value: string }> = {
	'default': { key: '1', value: '1' },
	'1-1': { key: '1', value: '1' },
	'1-2': { key: '1', value: '2' },
	'1-3': { key: '1', value: '3' },
	'2-1': { key: '2', value: '1' },
	'2-3': { key: '2', value: '3' },
};

export interface SummaryListActionLink {
	href: string;
	label?: string;
}
