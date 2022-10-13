export type PageAlertType = 'informational' | 'warning' | 'success' | 'error';

export interface PageAlert {
	type?: PageAlertType;
	heading: string;
	content: string | HTMLElement;
}
