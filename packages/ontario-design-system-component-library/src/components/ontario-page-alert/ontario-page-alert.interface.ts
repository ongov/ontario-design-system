export type PageAlertType = 'informational' | 'warning' | 'success' | 'error';

export interface PageAlert {
	/**
	 * The type of page alert to render. If no value is provided, the `informational` type alert would be rendered.
	 *
	 * There are four possible values for page alert: `informational`, `warning`, `success` or `error`.
	 *
	 * @example
	 * <ontario-page-alert type="error">
	 * </ontario-page-alert>
	 */
	type?: PageAlertType;

	/**
	 * The heading for the page alert
	 *
	 * @example
	 * <ontario-page-alert heading="Licence plates">
	 * </ontario-page-alert>
	 */
	heading: string;

	/**
	 * The main content for the page alert. This can be rendered as either string or HTML content.
	 *
	 * @example
	 * <ontario-page-alert content="Please look out for an email confirmation with your receipt and order number.">
	 * </ontario-page-alert>
	 *
	 * or
	 *
	 * <ontario-page-alert>
	 *  <p>This is a sample page alert component using slots. <a href="#">Learn more</a>.</p>
	 * </ontario-page-alert>
	 */
	content: string | HTMLElement;
}
