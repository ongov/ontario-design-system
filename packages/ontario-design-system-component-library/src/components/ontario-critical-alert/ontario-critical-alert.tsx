import { Component, h, Prop, Watch } from '@stencil/core';
import { CriticalAlert } from './ontario-critical-alert.interface';
import { validatePropExists } from '../../utils/validation/validation-functions';
import { ConsoleMessageClass } from '../../utils/console-message/console-message';

@Component({
	tag: 'ontario-critical-alert',
	styleUrl: 'ontario-critical-alert.scss',
	shadow: true,
})
export class OntarioCriticalAlert implements CriticalAlert {
	/**
	 * Content for critical alert message. It can be either a string or HTML content. The content is already wrapped in a paragraph tag, so if using HTML content, the paragraph tag can be ommitted.
	 *
	 * @example
	 * <ontario-critical-alert content="COVID-19 State of emergency extended until May 12, 2020."></ontario-critical-alert>
	 *
	 * or
	 *
	 * <ontario-critical-alert>
	 *  <a href="#">COVID-19 State of emergency</a> extended until May 12, 2020.
	 * </ontario-critical-alert>
	 */
	@Prop() content: string | HTMLElement;

	@Watch('content')
	validateCriticalAlertContent(newValue: string | HTMLElement) {
		if (validatePropExists(newValue)) {
			/**
			 * Print the quote warning message
			 */
			const message = new ConsoleMessageClass();
			message
				.addDesignSystemTag()
				.addMonospaceText(' content ')
				.addRegularText('for')
				.addMonospaceText(' <ontario-critical-alert> ')
				.addRegularText('was not provided.')
				.printMessage();
		}
	}

	private renderContent() {
		const content = this.content;

		if (typeof content === 'string') {
			return content;
		}

		return <slot />;
	}

	componentWillLoad() {
		this.validateCriticalAlertContent(this.content);
	}

	render() {
		return (
			<div class="ontario-critical-alert">
				<div class="ontario-row">
					<div class="ontario-column ontario-small-12">
						<div class="ontario-critical-alert__body">
							<div class="ontario-critical-alert__icon">
								<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M1 21H23L12 2L1 21ZM13 18H11V16H13V18ZM13 14H11V10H13V14Z" fill="white" />
									<rect x="11" y="10" width="2" height="4" fill="black" />
									<rect x="11" y="16" width="2" height="2" fill="black" />
								</svg>
							</div>
							<p>{this.renderContent()}</p>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
