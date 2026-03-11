export const PageAlertTypes = ['informational', 'warning', 'success', 'error'] as const;

export type PageAlertType = (typeof PageAlertTypes)[number];
