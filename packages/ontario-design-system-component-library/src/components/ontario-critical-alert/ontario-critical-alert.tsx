import { Component, h, Prop, Watch, Element } from '@stencil/core';

import { CriticalAlert } from './ontario-critical-alert.interface';
import OntarioIconCriticalAlertWarning from '../ontario-icon/assets/ontario-icon-critical-alert-warning.svg';

import { validatePropExists } from '../../utils/validation/validation-functions';
import { ConsoleMessageClass } from '../../utils/console-message/console-message';

@Component({
	tag: 'ontario-critical-alert',
	styleUrl: 'ontario-critical-alert.scss',
	shadow: true,
})
export class OntarioCriticalAlert implements CriticalAlert {
	@Element() host: HTMLElement;

	/**
	 * Content for critical alert message. It can be either string or HTML content. The content is already wrapped in a paragraph tag, so if using HTML content, the paragraph tag can be ommitted.
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

	/**
	 * Watch for changes to the `content` prop value.
	 *
	 * If no `content` prop was passed, or no host element textContent exists, a warning message will be printed.
	 *
	 * @param newValue string | HTMLElement
	 */
	@Watch('content')
	validateCriticalAlertContent(newValue: string | HTMLElement) {
		// if no slot is passed, run the `validatePropExists` function
		if (!this.host.textContent) {
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
							<div class="ontario-critical-alert__icon" innerHTML={OntarioIconCriticalAlertWarning}></div>
							<p>{this.renderContent()}</p>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
