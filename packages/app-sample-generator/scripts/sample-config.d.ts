export interface ComponentSample {
	/**
	 * Component tag name used to resolve the Stencil component class.
	 */
	component: string;
	/**
	 * HTML snippet that represents the component in the docs.
	 */
	html: string;
	/**
	 * Output filename for the generated sample document.
	 */
	outputFile: string;
	/**
	 * Optional short description that will be included in the generated page.
	 */
	description?: string;
	/**
	 * Whether to include component CSS inline (default: true)
	 */
	includeStyles?: boolean;
}
export declare const samples: ComponentSample[];
