import { Component, h, Prop } from '@stencil/core';
import { PageAlert, PageAlertType } from './ontario-page-alert.interface';

@Component({
	tag: 'ontario-page-alert',
	styleUrl: 'ontario-page-alert.scss',
	shadow: true,
})
export class OntarioPageAlert implements PageAlert {
	/**
	 * The type of page alert to render. If no value is provided, the `informational` type alert would be rendered.
	 *
	 * There are four possible values for page alert: `informational`, `warning`, `success` or `error`.
	 *
	 * @example
	 * <ontario-page-alert type="error">
	 * </ontario-page-alert>
	 */
	@Prop() type: PageAlertType = 'informational';

	/**
	 * The heading for the page alert.
	 *
	 * @example
	 * <ontario-page-alert heading="Licence plates">
	 * </ontario-page-alert>
	 */
	@Prop() heading: string;

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
	@Prop() content: string;

	/**
	 * @returns the classes of the page alert container based on the alert `type`.
	 */
	private getClass() {
		return `ontario-alert ontario-alert--${this.type}`;
	}

	renderIcon() {
		const iconProps = { 'icon-width': 36 };

		switch (this.type) {
			case 'informational':
				return <ontario-icon-alert-information {...iconProps} />;

			case 'success':
				return <ontario-icon-alert-success {...iconProps} />;

			case 'warning':
				return <ontario-icon-alert-warning {...iconProps} />;

			case 'error':
				return <ontario-icon-alert-error {...iconProps} />;
		}
	}

	renderContent() {
		const body = this.content;

		if (typeof body === 'string') {
			return <p>{body}</p>;
		}

		return <slot />;
	}

	render() {
		return (
			<div class={this.getClass()}>
				<div class="ontario-alert__header">
					<div class="ontario-alert__header-icon">{this.renderIcon()}</div>
					<h2 class="ontario-alert__header-title ontario-h4">{this.heading}</h2>
				</div>
				<div class="ontario-alert__body">{this.renderContent()}</div>
			</div>
		);
	}
}
