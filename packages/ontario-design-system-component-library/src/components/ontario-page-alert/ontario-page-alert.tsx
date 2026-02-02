import { Component, h, Prop, Watch, State } from '@stencil/core';
import { PageAlert, PageAlertType } from './ontario-page-alert.interface';
import { validateValueAgainstArray } from '../../utils/validation/validation-functions';
import { ConsoleMessageClass } from '../../utils/console-message/console-message';

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
	 */
	@Prop() content: string;

	/**
	 * Internal, sanitized type used for rendering.
	 * (So invalid values fall back to informational.)
	 */
	@State() private typeState: PageAlertType = 'informational';

	private readonly validTypes: PageAlertType[] = ['informational', 'warning', 'success', 'error'];

	private sanitizeType(value: PageAlertType): PageAlertType {
		return validateValueAgainstArray(value, this.validTypes) ? value : 'informational';
	}

	@Watch('type')
	validateType() {
		const sanitized = this.sanitizeType(this.type);

		if (sanitized !== this.type) {
			const message = new ConsoleMessageClass();
			message
				.addDesignSystemTag()
				.addMonospaceText(` type "${this.type}" `)
				.addRegularText('for')
				.addMonospaceText(' <ontario-page-alert> ')
				.addRegularText('is not a valid type. Defaulting to "informational".')
				.printMessage();
		}

		// Always render from sanitized value
		this.typeState = sanitized;
	}

	/**
	 * @returns the classes of the page alert container based on the alert `type`.
	 */
	private getClass() {
		return `ontario-alert ontario-alert--${this.typeState}`;
	}

	private renderIcon() {
		const iconProps = { 'icon-width': 36 };

		switch (this.typeState) {
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

	private renderContent() {
		if (this.content) {
			return <p>{this.content}</p>;
		}
		return <slot />;
	}

	componentWillLoad() {
		// Ensure initial render uses the sanitized type
		this.typeState = this.sanitizeType(this.type);
		this.validateType();
	}

	render() {
		return (
			<div class={this.getClass()}>
				<div class="ontario-alert__header">
					<div class="ontario-alert__header-icon" aria-hidden="true">
						{this.renderIcon()}
					</div>
					<h2 class="ontario-alert__header-title ontario-h4">{this.heading}</h2>
				</div>
				<div class="ontario-alert__body">{this.renderContent()}</div>
			</div>
		);
	}
}
